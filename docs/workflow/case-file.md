# Case files

Each client case has one Google Doc, built from `templates/case-file.md`.
It is the source of truth. Briefs come from it, not from re-reading months of email.

## Naming

- Folder: `Clients/<Surname> <First name> - <Case type> <Year>/`
  for example `Clients/Smith Anna - Remortgage 2026/`
- Case Doc: same name, inside the folder.
- Gmail label: `Client/<Surname> <First name>`.

One client can have several cases (a mortgage and a protection case). Each case gets its
own folder and Doc; they share one Gmail label.

## New client

When she asks to set up a new client:

1. Check the client doesn't already exist (search Gmail labels and Drive).
2. Apply the Gmail label `Client/<Surname> <First name>` to the client's emails.
   The Apps Script then creates the folder and saves attachments.
3. Fill the case Doc from the template: details, case type, stage 1, first log entry.
4. Tell her in one line what you did.

## Updating a case file

- Add a log entry for every real event: email in or out, call notes she gives you,
  document received, stage change. Newest entry at the top.
- When a document arrives, tick it in the documents table with the date.
- Update the "Next step" and "Next date" lines every time.
- Keep entries short: `8 Nov: payslip Oct received (email)`.
- Don't copy email bodies into the case file. Summarise in one line.
