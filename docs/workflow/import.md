# Importing existing clients (draft)

Status: plan only, not built or tested. Details depend on how her clients are stored today.

## First, find out (ask her)

- Where are client files now? (Drive folders, laptop, email only, a CRM, a spreadsheet)
- One folder per client? Per case? Named how?
- Is there a list of clients (spreadsheet, CRM export)?
- How many active clients and closed ones? Import closed ones at all?
- Are emails already in Gmail labels or folders?

## Plan

1. **Copy, never move.** Leave her old structure untouched until she is happy.
2. **One client first.** Import one active client together, check it, adjust the steps.
3. For each client:
   - add a line to the `Client index` with the next ID
   - create `Clients/<ID> <Surname> <First name>/` with `Incoming/` and a case subfolder
   - copy existing documents into the case subfolder
   - create the case Doc from the template: details, stage (her call), documents
     ticked from the files found, a first log line "imported from <old place>, <date>"
   - label the client's existing Gmail threads `Client/<ID> <name>`
   - run `case-reviewer` on the client
4. **Then in small batches** (5 clients), with a short report after each batch: done,
   unclear documents, anything that needs her.
5. **Never guess** a stage or a document type. Mark it "to check" and ask her.

## Open questions

- Can the Drive connector copy files between folders? (`copy_file` exists; to test.)
- Files on her laptop: upload to Drive first (her), then import.
- A CRM export: which format?
