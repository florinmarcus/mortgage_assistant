---
name: new-client
description: Set up a new client (client ID, Client index line, Gmail label, Drive folder, case Doc). Use when she says "new client", "set up <name>", or confirms that an unknown sender is a new client.
---

# New client

Follow `docs/workflow/case-file.md` (naming and steps) and `templates/case-file.md`.

1. Get the essentials. Ask only for what you can't find in the email: full name,
   case type (purchase, remortgage, protection), email, phone.
2. Check the client doesn't exist already: search the `Client index` by name, email and
   phone.
3. Add a line to the Client index with the next ID (highest ID plus one), at once.
4. Create the client folder `Clients/<ID> <Surname> <First name>/` with `Incoming/` and the
   case subfolder.
5. Apply the Gmail label `Client/<ID> <Surname> <First name>` to their emails.
   The Apps Script creates the folder and saves attachments within about 10 minutes.
6. Fill the case Doc from the template: details, stage 1, documents list for the case type
   (`docs/workflow/document-checklists.md`), first log line.
   If you can't create the Doc, give her the filled text to paste and say why.
7. Offer a welcome email listing the documents needed, in one line. Draft it only if she
   says yes.
8. Run the `case-reviewer` agent on what you created (index line, folder, label, case Doc,
   draft).
   Fix any issue it reports before replying.

Reply in one or two lines: what you set up and what's next.
