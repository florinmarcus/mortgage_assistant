// Local tests for apps-script/Code.gs, using fake Gmail and Drive objects.
// Run: node --test tests/apps-script.test.js
// These check the logic only. The real test on a Google account is in
// docs/testing/test-scenarios.md (group 2).

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const CODE = fs.readFileSync(path.join(__dirname, '..', 'apps-script', 'Code.gs'), 'utf8');

// ---------- fakes ----------

class FakeFolder {
  constructor(name, parent) { this.name = name; this.parent = parent; this.folders = []; this.files = []; }
  getParents() { return iter(this.parent ? [this.parent] : []); }
  getFoldersByName(n) { return iter(this.folders.filter(f => f.name === n)); }
  getFilesByName(n) { return iter(this.files.filter(f => f.name === n)); }
  createFolder(n) { const f = new FakeFolder(n, this); this.folders.push(f); return f; }
  createFile(blob, content) {
    if (typeof blob === 'string') blob = { name: blob, content };
    const file = { name: blob.name, content: blob.content,
      setName(n) { this.name = n; return this; }, setContent(c) { this.content = c; return this; } };
    this.files.push(file);
    return file;
  }
  path(p) { return p.split('/').reduce((f, n) => f && f.folders.find(x => x.name === n), this); }
}

function iter(items) {
  let i = 0;
  return { hasNext: () => i < items.length, next: () => items[i++] };
}

function attachment(name, type = 'application/pdf', size = 100000) {
  return {
    getName: () => name, getContentType: () => type, getSize: () => size,
    copyBlob: () => ({ name }),
  };
}

let nextId = 1;
function message(date, attachments, inline = []) {
  const id = 'm' + nextId++;
  return {
    getId: () => id,
    getDate: () => new Date(date),
    getAttachments: opts => (opts && opts.includeInlineImages === false)
      ? attachments : attachments.concat(inline),
  };
}

function label(name, threads) {
  return { getName: () => name, getThreads: () => threads.map(msgs => ({ getMessages: () => msgs })) };
}

function setup(labels) {
  const root = new FakeFolder('My Drive');
  const store = {};
  const ctx = {
    console: { log() {} },
    module: { exports: {} },
    DriveApp: { getRootFolder: () => root },
    GmailApp: { getUserLabels: () => labels },
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: k => store[k] || null,
        setProperty: (k, v) => { store[k] = v; },
        getProperties: () => ({ ...store }),
        deleteProperty: k => { delete store[k]; },
      }),
    },
    Session: { getScriptTimeZone: () => 'Europe/London' },
    Utilities: { formatDate: d => d.toISOString().slice(0, 10) },
    Date,
  };
  vm.createContext(ctx);
  vm.runInContext(CODE, ctx);
  return { root, run: () => ctx.module.exports.fileAttachments(), exports: ctx.module.exports };
}

const names = folder => folder.files.map(f => f.name).sort();

// ---------- tests ----------

test('saves a PDF into Mortgage Assistant/Clients/<name>/Incoming with a date prefix', () => {
  const { root, run } = setup([
    label('Client/Testwell Quentin', [[message('2026-11-08T10:00:00Z', [attachment('payslip-oct.pdf')])]]),
  ]);
  run();
  assert.deepStrictEqual(names(root.path('Mortgage Assistant/Clients/Testwell Quentin/Incoming')), ['2026-11-08 payslip-oct.pdf']);
});

test('saves several attachments from one email', () => {
  const { root, run } = setup([
    label('Client/Dummy Daisy', [[message('2026-11-08T10:00:00Z', [
      attachment('passport.jpg', 'image/jpeg', 2000000), attachment('statement.pdf'), attachment('p60.docx', 'application/msword'),
    ])]]),
  ]);
  run();
  assert.strictEqual(root.path('Mortgage Assistant/Clients/Dummy Daisy/Incoming').files.length, 3);
});

test('running twice saves nothing twice', () => {
  const { root, run } = setup([
    label('Client/Testwell Quentin', [[message('2026-11-08T10:00:00Z', [attachment('a.pdf')])]]),
  ]);
  run();
  run();
  assert.strictEqual(root.path('Mortgage Assistant/Clients/Testwell Quentin/Incoming').files.length, 1);
});

test('a new reply in an old thread is picked up on the next run', () => {
  const thread = [message('2026-11-01T10:00:00Z', [attachment('a.pdf')])];
  const { root, run } = setup([label('Client/Testwell Quentin', [thread])]);
  run();
  thread.push(message('2026-11-08T10:00:00Z', [attachment('b.pdf')]));
  run();
  assert.deepStrictEqual(names(root.path('Mortgage Assistant/Clients/Testwell Quentin/Incoming')),
    ['2026-11-01 a.pdf', '2026-11-08 b.pdf']);
});

test('same file name on the same day gets (2)', () => {
  const { root, run } = setup([
    label('Client/Testwell Quentin', [[
      message('2026-11-08T09:00:00Z', [attachment('payslip.pdf')]),
      message('2026-11-08T15:00:00Z', [attachment('payslip.pdf')]),
    ]]),
  ]);
  run();
  assert.deepStrictEqual(names(root.path('Mortgage Assistant/Clients/Testwell Quentin/Incoming')),
    ['2026-11-08 payslip (2).pdf', '2026-11-08 payslip.pdf']);
});

test('inline images and small signature logos are skipped', () => {
  const { root, run } = setup([
    label('Client/Testwell Quentin', [[message('2026-11-08T10:00:00Z',
      [attachment('logo.png', 'image/png', 5000), attachment('doc.pdf')],
      [attachment('inline.png', 'image/png', 300000)])]]),
  ]);
  run();
  assert.deepStrictEqual(names(root.path('Mortgage Assistant/Clients/Testwell Quentin/Incoming')), ['2026-11-08 doc.pdf']);
});

test('clients do not mix, and other labels are ignored', () => {
  const { root, run } = setup([
    label('Client/Testwell Quentin', [[message('2026-11-08T10:00:00Z', [attachment('q.pdf')])]]),
    label('Client/Dummy Daisy', [[message('2026-11-08T10:00:00Z', [attachment('d.pdf')])]]),
    label('Newsletters', [[message('2026-11-08T10:00:00Z', [attachment('news.pdf')])]]),
    label('Client/Sub/Deeper', [[message('2026-11-08T10:00:00Z', [attachment('x.pdf')])]]),
  ]);
  run();
  assert.deepStrictEqual(names(root.path('Mortgage Assistant/Clients/Testwell Quentin/Incoming')), ['2026-11-08 q.pdf']);
  assert.deepStrictEqual(names(root.path('Mortgage Assistant/Clients/Dummy Daisy/Incoming')), ['2026-11-08 d.pdf']);
  assert.deepStrictEqual(root.path('Mortgage Assistant/Clients').folders.map(f => f.name).sort(), ['Dummy Daisy', 'Testwell Quentin']);
});

test('a new label creates the client folder even with no attachments', () => {
  const { root, run } = setup([
    label('Client/Sample Otto', [[message('2026-11-08T10:00:00Z', [])]]),
  ]);
  run();
  assert.ok(root.path('Mortgage Assistant/Clients/Sample Otto/Incoming'));
});

test('existing folders are reused, not duplicated', () => {
  const { root, run } = setup([
    label('Client/Testwell Quentin', [[message('2026-11-08T10:00:00Z', [attachment('a.pdf')])]]),
  ]);
  root.createFolder('Mortgage Assistant').createFolder('Clients').createFolder('Testwell Quentin').createFolder('Remortgage 2026');
  run();
  assert.strictEqual(root.path('Mortgage Assistant').folders.filter(f => f.name === 'Clients').length, 1);
  const client = root.path('Mortgage Assistant/Clients/Testwell Quentin');
  assert.deepStrictEqual(client.folders.map(f => f.name).sort(), ['Incoming', 'Remortgage 2026']);
});

test('each run writes a heartbeat on the Clients folder', () => {
  const { root, run } = setup([
    label('Client/C001 Testwell Quentin', [[message('2026-11-08T10:00:00Z', [attachment('a.pdf')])]]),
  ]);
  run();
  const status = () => root.path('Mortgage Assistant').files.filter(f => f.name === 'Apps Script status.txt');
  assert.strictEqual(status().length, 1);
  assert.match(status()[0].content, /^Apps Script last run: \d{4}-\d{2}-\d{2}/);
  assert.match(status()[0].content, /saved 1 file\(s\) from 1 new email\(s\)/);
  run();
  assert.strictEqual(status().length, 1, 'status file is updated, not duplicated');
  assert.match(status()[0].content, /saved 0 file\(s\) from 0 new email\(s\)/);
});
