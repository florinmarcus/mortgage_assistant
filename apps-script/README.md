# Apps Script: save attachments to Drive

`Code.gs` runs in the adviser's own Google account every 10 minutes. For every Gmail label
`Client/<ID> <Surname> <First name>` (for example `Client/C001 Smith Anna`) it saves new attachments into
`Mortgage Assistant/Clients/<ID> <Surname> <First name>/Incoming/` in Drive, named `yyyy-MM-dd <file name>`.

- Each email is processed once. New replies in old threads, and emails labelled later,
  are picked up on the next run.
- Same file name on the same day: the second one gets ` (2)`.
- Inline images and small images (under 20 KB, usually signature logos) are skipped.
- Labels deeper than `Client/<name>` are ignored.
- Each run writes `Apps Script last run: <time> | saved ...` to
  `Mortgage Assistant/Apps Script status.txt`. Claude and the reviewer use it to check the script is running.

## Install (about 10 minutes, in her Google account)

1. Signed in as her, open https://script.google.com and click **New project**.
   Name it `Mortgage assistant attachments`.
2. Replace the contents of `Code.gs` with `apps-script/Code.gs` from this repo.
3. Project settings (gear icon): set the time zone to London.
4. Select `fileAttachments` and click **Run**. Google asks for access to Gmail and Drive.
   It's her own script, so Google shows "unverified app": click **Advanced**, then
   **Go to Mortgage assistant attachments**, then **Allow**.
5. Select `installTrigger` and click **Run**. It now runs every 10 minutes.
6. Check **Executions** (left menu) after 10 minutes: each run logs what it saved.

The access asked for is wide (read Gmail, edit Drive). The code only reads emails under
`Client/...` labels and only writes inside `Mortgage Assistant/Clients`.

## Update

When `Code.gs` changes in GitHub: open the script, paste the new version, save. The timer
keeps running; no need to reinstall.

## Stop

Run `removeTrigger`.

## Testing

- Logic tests with fake Gmail and Drive: `node --test tests/apps-script.test.js`
- Real test on a developer account: `docs/testing/test-scenarios.md`, group 2.
- `resetProcessedForTesting` makes the next run save everything again. Testing only.
