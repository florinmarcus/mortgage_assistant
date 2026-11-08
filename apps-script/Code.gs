/**
 * Mortgage assistant: save email attachments into client folders in Google Drive.
 *
 * Runs in the adviser's own Google account, every 10 minutes.
 * For every Gmail label "Client/<ID> <Surname> <First name>" (e.g. "Client/C001 Smith Anna"):
 *   - makes sure Drive has "Mortgage Assistant/Clients/<ID> <Surname> <First name>/Incoming/"
 *   - saves new attachments from those emails into Incoming/, named
 *     "yyyy-MM-dd <original name>"
 *   - remembers each processed message, so nothing is saved twice
 *     (this also works for new replies in an old thread, and for emails labelled later)
 *
 * No client data and no IDs are stored in this code. It only uses label and folder names.
 */

const CONFIG = {
  ROOT_PATH: 'Mortgage Assistant/Clients', // inside My Drive
  INCOMING_FOLDER: 'Incoming',
  LABEL_PREFIX: 'Client/',
  THREADS_PER_LABEL: 100,
  MAX_RUN_MS: 4.5 * 60 * 1000, // stop early, Apps Script limit is 6 minutes
  SKIP_SMALL_IMAGES_BYTES: 20 * 1024, // signature logos and icons
};

/** Main job. The 10-minute trigger calls this. */
function fileAttachments() {
  const started = Date.now();
  const props = PropertiesService.getScriptProperties();
  const timeZone = Session.getScriptTimeZone();
  const root = CONFIG.ROOT_PATH.split('/')
    .reduce((parent, name) => getOrCreateFolder_(parent, name), DriveApp.getRootFolder());
  const summary = { saved: 0, skipped: 0, messages: 0 };

  const labels = GmailApp.getUserLabels().filter(isClientLabel_);
  for (const label of labels) {
    const clientName = label.getName().slice(CONFIG.LABEL_PREFIX.length).trim();
    const clientFolder = getOrCreateFolder_(root, clientName);
    const incoming = getOrCreateFolder_(clientFolder, CONFIG.INCOMING_FOLDER);

    for (const thread of label.getThreads(0, CONFIG.THREADS_PER_LABEL)) {
      for (const message of thread.getMessages()) {
        if (Date.now() - started > CONFIG.MAX_RUN_MS) {
          console.log('Stopping early, will continue next run. ' + JSON.stringify(summary));
          writeHeartbeat_(root, summary, timeZone);
          return summary;
        }
        const key = 'done_' + message.getId();
        if (props.getProperty(key)) continue;

        summary.messages++;
        const datePrefix = Utilities.formatDate(message.getDate(), timeZone, 'yyyy-MM-dd');
        for (const attachment of message.getAttachments({ includeInlineImages: false })) {
          if (isSignatureImage_(attachment)) {
            summary.skipped++;
            continue;
          }
          const name = uniqueName_(incoming, datePrefix + ' ' + attachment.getName());
          incoming.createFile(attachment.copyBlob()).setName(name);
          summary.saved++;
        }
        props.setProperty(key, '1');
      }
    }
  }
  writeHeartbeat_(root, summary, timeZone);
  console.log('Done. ' + JSON.stringify(summary));
  return summary;
}

/**
 * Proof that the script runs: the Clients folder's description shows the last run.
 * Claude reads it to tell "not saved yet" from "the script isn't running".
 */
function writeHeartbeat_(root, summary, timeZone) {
  const when = Utilities.formatDate(new Date(), timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX");
  root.setDescription('Apps Script last run: ' + when + ' | saved ' + summary.saved +
    ' file(s) from ' + summary.messages + ' new email(s)');
}

/** Only labels like "Client/C001 Smith Anna". Not "Client" itself, not deeper levels. */
function isClientLabel_(label) {
  const name = label.getName();
  if (!name.startsWith(CONFIG.LABEL_PREFIX)) return false;
  const rest = name.slice(CONFIG.LABEL_PREFIX.length).trim();
  return rest.length > 0 && rest.indexOf('/') === -1;
}

/** Small images are usually logos in email signatures, not client documents. */
function isSignatureImage_(attachment) {
  const type = String(attachment.getContentType() || '');
  return type.startsWith('image/') && attachment.getSize() < CONFIG.SKIP_SMALL_IMAGES_BYTES;
}

/** If the name is taken (same file name, same day), add " (2)", " (3)", ... */
function uniqueName_(folder, name) {
  if (!folder.getFilesByName(name).hasNext()) return name;
  const dot = name.lastIndexOf('.');
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot) : '';
  for (let i = 2; ; i++) {
    const candidate = base + ' (' + i + ')' + ext;
    if (!folder.getFilesByName(candidate).hasNext()) return candidate;
  }
}

function getOrCreateFolder_(parent, name) {
  const found = parent.getFoldersByName(name);
  return found.hasNext() ? found.next() : parent.createFolder(name);
}

/** Run once by hand to start the 10-minute timer. Safe to run again. */
function installTrigger() {
  const exists = ScriptApp.getProjectTriggers()
    .some(t => t.getHandlerFunction() === 'fileAttachments');
  if (exists) {
    console.log('Trigger already installed.');
    return;
  }
  ScriptApp.newTrigger('fileAttachments').timeBased().everyMinutes(10).create();
  console.log('Trigger installed: fileAttachments every 10 minutes.');
}

/** Run by hand to stop the timer. */
function removeTrigger() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'fileAttachments')
    .forEach(t => ScriptApp.deleteTrigger(t));
  console.log('Trigger removed.');
}

/**
 * Run by hand to forget which emails were processed, so the next run saves
 * everything again. Use only in testing: it can create duplicates.
 */
function resetProcessedForTesting() {
  const props = PropertiesService.getScriptProperties();
  Object.keys(props.getProperties())
    .filter(k => k.startsWith('done_'))
    .forEach(k => props.deleteProperty(k));
  console.log('Processed list cleared.');
}

// Lets the local tests in tests/ load this file in Node. Ignored by Apps Script.
if (typeof module !== 'undefined') {
  module.exports = { fileAttachments, isClientLabel_, uniqueName_, CONFIG };
}
