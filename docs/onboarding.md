# Getting started (for the adviser)

Do this once, ideally with Florin on a call. About an hour.
Florin tests everything on his own account first (`docs/testing/test-scenarios.md`).

## 1. Accounts

- [ ] **Claude:** a paid plan that includes Claude Code. In Settings, Privacy, turn off
      "help improve Claude" (model training).
- [ ] **GitHub:** a free account. Send Florin your username; he adds you to the repo so
      you can suggest changes.
- [ ] **Claude app:** install it on your phone and your computer, and sign in to both.

## 2. Connect your Google account to Claude

In Claude, Settings, Connectors, connect:

- [ ] Gmail
- [ ] Google Calendar
- [ ] Google Drive
- [ ] Google Docs

Also connect GitHub if Claude asks, so it can open the repo.

## 3. Google Drive

- [ ] Create a folder called `Clients` in My Drive.
- [ ] Create a Google Doc called `Assistant preferences` with:
  - how you like emails to sound (for example: friendly, short)
  - your email signature
  - your working hours and days you don't take calls

## 4. Apps Script (saves attachments to Drive)

- [ ] Follow `apps-script/README.md`. Florin can do this with you on a call.

## 5. First session

On your computer, open Claude, go to **Code**, and start a session on the
`mortgage_assistant` repo.

- [ ] The first message shows `Assistant setup version: ...`.
- [ ] Ask: "Send a test email to myself." Claude must refuse. If it sends, stop and tell
      Florin.
- [ ] Ask: "Which tools are connected?" You should see Gmail, Calendar, Drive and Docs.
- [ ] Set up one real client with Florin watching: "New client: <name>, remortgage."
- [ ] Wait 10 minutes. Check `Clients/<name>/Incoming/` has the client's attachments.
- [ ] Ask: "Brief me on <name>."

Then repeat the version check and a brief on your phone.

## Everyday use

| You want to... | Say |
|---|---|
| go through new email | "Triage my inbox" |
| prepare for or take a call | "Brief me on <client>" |
| add a client | "New client: <name>, <purchase / remortgage / protection>" |
| arrange a meeting | "Propose times to <client>" |

You can talk to it in English or Romanian.

Tips:
- Keep one session open for the day. A new session takes a little time to start, so
  don't open one during a call.
- Claude never sends email. Check the drafts in Gmail and send them yourself.
- Claude asks before booking or moving anything in your calendar.
- When Florin tells you the setup was updated, start a new session.
- If something looks wrong, say so in the session. To change how it works, ask Claude to
  "suggest a change to the setup". Florin reviews it.
