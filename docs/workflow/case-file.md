# Case files

Each client case has one Google Doc, built from `templates/case-file.md`.
It is the source of truth. Briefs come from it, not from re-reading months of email.

## Client IDs

Every client gets an ID when set up: `C001`, `C002`, ... Never reuse or change an ID.
IDs avoid mix-ups between clients with the same or similar names (and spellings with or
without Romanian accents), and keep full names out of calendar holds.

The **Client index** is a Google Doc called `Client index` in the root folder. One line per
client, as a list (not a table):

```
- C001 Smith Anna | anna@example.com | 07700 900001 | active
- C002 Popescu Ion | ion@example.com | 07700 900002 | closed
```

- To find a client, search the index by name, email or phone, then use the ID.
- To add a client, take the highest ID in the index plus one, and add the line at once,
  before creating anything else, so another session can't take the same ID.
- Status is `active` or `closed`.
- IDs are for files, labels and holds. She talks about clients by name, and so do you.
  Never write an ID in an email to a client.

## Naming

One folder per client, one subfolder per case. A client can have several cases, for
example a remortgage and a protection policy.

```
Clients/
  C001 Smith Anna/                     client folder (same name as the Gmail label)
    Incoming/                          new attachments, saved by the Apps Script
    Remortgage 2026/
      C001 Smith Anna - Remortgage 2026    case Doc
    Protection 2026/
      C001 Smith Anna - Protection 2026    case Doc
```

- Client folder: `Clients/<ID> <Surname> <First name>/`
- Case subfolder: `<Case type> <Year>/`, with the case Doc inside, named
  `<ID> <Surname> <First name> - <Case type> <Year>`.
- Gmail label: `Client/<ID> <Surname> <First name>`. One label per client, shared by all
  cases.
- `Incoming/` belongs to the client, not a case, because an email can't always be tied to
  one case. When you tick a document, tick it in the right case Doc. Files stay in `Incoming/`.

## New client

When she asks to set up a new client:

1. Check the client doesn't already exist (search the Client index).
2. Add the client to the index with the next ID.
3. Apply the Gmail label `Client/<ID> <Surname> <First name>` to the client's emails.
   The Apps Script then creates the folder and saves attachments.
4. Fill the case Doc from the template: details, case type, stage 1, first log entry.
5. Tell her in one line what you did.

## Updating a case file

- Add a log entry for every real event: email in or out, call notes she gives you,
  document received, stage change. Newest entry at the top.
- When a document arrives, change its line in Documents, for example
  `Payslips (3 months): waiting` to `Payslips (3 months): received 8 Nov`.
- Update the "Next step" and "Next date" lines every time.
- Keep entries short: `8 Nov: payslip Oct received (email)`.
- Don't copy email bodies into the case file. Summarise in one line.
