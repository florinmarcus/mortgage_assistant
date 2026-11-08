---
name: new-client
description: Set up a new client case (Gmail label, Drive folder, case Doc). Use when she says "new client", "set up <name>", or confirms that an unknown sender is a new client.
---

# New client

Follow `docs/workflow/case-file.md` (naming and steps) and `templates/case-file.md`.

1. Get the essentials. Ask only for what you can't find in the email: full name,
   case type (purchase, remortgage, protection), email, phone.
2. Check the client doesn't exist already (Gmail labels, Drive `Clients/`).
3. Apply the Gmail label `Client/<Surname> <First name>` to their emails.
   The Apps Script creates the folder and saves attachments within about 10 minutes.
4. Fill the case Doc from the template: details, stage 1, documents list for the case type
   (`docs/workflow/document-checklists.md`), first log line.
   If you can't create the Doc, give her the filled text to paste and say why.
5. Offer to draft a welcome email listing the documents needed. Draft only.
6. Run the `case-reviewer` agent on what you created (folder, label, case Doc, draft).
   Fix any issue it reports before replying.

Reply in one or two lines: what you set up and what's next.
