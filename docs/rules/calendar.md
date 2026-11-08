# Calendar rules

## Proposing times

1. Read her working hours in `Assistant preferences`.
2. Check her calendar and pick 3 free slots over the next 5 working days, spread over
   different days and times.
3. Default length: 30 minutes for a call, 60 minutes for a fact-find.
   Existing `HOLD` events count as busy: never offer a slot that overlaps one.
4. Show her the 3 slots first and wait for her yes (she may swap one).
5. Then create a hold for each slot and draft the email to the client.

## Holds (offered, not confirmed)

A hold keeps an offered slot free, so no other session offers it to someone else.

- Title: `HOLD <ID> - <purpose>`, for example `HOLD C007 - fact-find`. No names.
- Description: `Offered <date offered>. Client <ID>.`
- Show as busy.
- One hold per offered slot.

When the client picks a slot (and she says yes): turn that hold into the meeting (rename
it, see Booking) and delete the other holds for that client.

When the client declines, or offers other times: ask her, then delete the holds.

Stale holds: during triage, list holds offered more than 3 working days ago with no
answer, and ask her whether to clear them or chase the client. Never clear them without
her yes.

## Booking

- Only after the client confirms a slot, and only after she says yes.
- Event title: `<ID> <Client name> - <purpose>`, for example `C007 Smith Anna - fact-find`.
- Add the client as a guest only if she asks.
- Put the case folder name in the event description, nothing more. No personal details.

## Changing or cancelling

Always ask her first. Draft the email to the client offering new times.
