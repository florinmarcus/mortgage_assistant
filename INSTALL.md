# Install

Every step, once, on your own accounts. About 45 minutes. Florin can do it with you on a call.

## Before you start

- A Google account with Gmail, Calendar and Drive (the one you use for clients).
- A laptop (Mac or Windows) with a browser, and a phone.
- A card for a paid Claude plan (Pro or Max).
- A free GitHub account, and Florin's invite accepted.
- 45 minutes, ideally on a call with Florin.

## 1. Accounts

1. **Claude:** a paid plan that includes Claude Code (Pro or Max).
   Settings → Privacy → turn off "Help improve Claude".
2. **Claude app:** install it on your phone and laptop. Sign in on both.
3. **GitHub:** create a free account at github.com and send Florin your username.
   Accept the invite email he sends you.

## 2. Connect Claude to your accounts

In Claude (laptop): Settings → Connectors.

1. Connect **Gmail**, **Google Calendar**, **Google Drive** and **Google Docs**.
   On each Google screen, tick **every** box.
2. If a connector shows tool permissions, set them to **Allow**, not "Ask".
3. Open claude.ai/code and connect **GitHub** when asked.

## 3. Apps Script (saves email attachments to Drive)

On your laptop, signed in to your Gmail account:

1. Go to script.google.com → **New project**. Rename it `Mortgage assistant attachments`.
2. Open this link, copy everything, and paste it over the code in the editor. Save.
   `https://raw.githubusercontent.com/florinmarcus/mortgage_assistant/main/apps-script/Code.gs`
3. Gear icon (Project Settings) → Time zone: **London**. Back to the editor (`< >` icon).
4. In the dropdown next to **Run**, pick `fileAttachments` → **Run**.
   Google asks for access: **Advanced** → **Go to Mortgage assistant attachments** → **Allow**.
   The log at the bottom ends with `Done.`
5. Pick `installTrigger` → **Run**. Log says `Trigger installed`. It now runs every 10 minutes.

## 4. First session

1. In the Claude app go to **Code**, start a session on the `mortgage_assistant` repo.
   The first line shows `Assistant setup version: ...`.
2. Type: `Set up my Drive for the assistant.`
   Claude creates `Mortgage Assistant` with `Clients`, `Client index` and
   `Assistant preferences`. Open `Assistant preferences` and add your tone, email
   signature and working hours.
3. Check the safety rules:
   - `Send a test email to myself.` → must be **refused**. If it sends, stop and tell Florin.
   - `Delete the Client index.` → must be **refused**.
4. Type: `Which connectors do you have?` → Gmail, Calendar, Drive, Docs.
5. Do the same version check and `Which connectors do you have?` on your phone.

## 5. Use it

| You want to | Say |
|---|---|
| go through new email | `Check my emails` |
| prepare for a call | `Brief me on <client>` |
| add a client | `New client: <name>, <purchase / remortgage / protection>` |
| arrange a meeting | `Propose times to <client>` |

English or Romanian both work. Claude never sends email: check the drafts in Gmail and send
them yourself. It asks before drafting, booking or deleting.

When Florin says the setup was updated, start a new session.
