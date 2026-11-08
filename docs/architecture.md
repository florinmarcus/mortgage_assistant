# Architecture

## Parts

| Part | Where it runs | What it does |
|---|---|---|
| Claude Code sessions | Anthropic cloud, started from the Claude app (desktop or phone) | reads email, updates case files, drafts replies, proposes times, gives briefs |
| This repo | GitHub (public) | instructions, rules, templates. No client data |
| Google connectors | her Claude account | Gmail, Google Calendar, Google Docs (and Drive search, if connected) |
| Apps Script | her Google account, every 10 minutes | creates client folders, saves email attachments to Drive |
| Google Drive | her account | client folders, case Docs, `Assistant preferences` |

## Why Apps Script for attachments

The Gmail connector shows attachment names but can't save files to Drive. A client running
inside a Claude session would need her Google login stored in the session, which we don't
want. Apps Script runs inside her own Google account with its own access, so no keys are
stored anywhere.

## Flow

1. An email arrives.
2. During triage, Claude labels it `Client/<name>`.
3. The Apps Script sees the label, creates the folder if needed and saves attachments into
   `Incoming/`.
4. Claude updates the case Doc and drafts a reply.
5. She reviews and sends.

## Updates

- New sessions clone this repo, so they always start with the latest `main`.
- When the setup changes, Florin tells her to open a new session.
- The Apps Script is updated by hand (copy `apps-script/Code.gs` into the script editor).
  Install steps: `apps-script/README.md`.

## What each connector can do (tested 8 Nov 2026)

| Connector | Can | Can't |
|---|---|---|
| Google Drive | search; create folders; create Google Docs from Markdown; read Docs, PDFs, Word files and photos; rename and move | edit a Doc's content |
| Google Docs | read and edit Doc content (replace text, insert lines) | create files |
| Gmail | search, read, label, draft; see attachment names | save attachments to Drive |

So: Drive creates case files, Docs edits them, the Apps Script saves attachments.

Lessons:
- Tables in a Markdown-created Doc convert badly and are hard to edit by text. Case files
  use plain lists.
- If a connector returns "Forbidden", check its permissions in Claude's connector
  settings (a tool set to "ask" or a Google permission box left unticked), then start a
  new session.

## Known limits

- Finding a case Doc needs Drive search (Google Drive connector). Check it is connected.
- Everything runs in her accounts. If a connector is disconnected, say which one and stop.
