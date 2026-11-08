---
name: propose-times
description: Find free slots in her calendar and draft an email offering them to a client, or book a confirmed slot. Use when she says "propose times to <client>", "find a slot", "book <client>", or "move my meeting with <client>".
---

# Propose times

Follow `docs/rules/calendar.md`.

Proposing:
1. Read working hours in `Assistant preferences`.
2. Pick 3 free slots in the next 5 working days, on different days. 30 minutes for a call,
   60 for a fact-find, unless she says otherwise. `HOLD` events are busy: skip them.
3. Show her the 3 slots and wait for her yes. She may swap a slot or change the length.
4. Create one hold per slot: `HOLD <ID> - <purpose>`, description
   `Offered <today>. Client <ID>.`, shown as busy.
5. Draft the email to the client with the agreed slots.
6. Add a log line to the case Doc: `<date>: offered 3 slots for <purpose>`.
7. Run the `case-reviewer` agent on the holds, draft and log line.
8. Reply: "Held in your calendar, draft ready in Gmail".

Booking (only after the client confirms and she says yes):
- Rename the chosen hold to `<ID> <Client name> - <purpose>`. Description: case folder
  name only.
- Delete the client's other holds.
- Add a log line to the case Doc.
- Run the `case-reviewer` agent on the event and the log line.

Moving or cancelling: ask her first, then draft the email offering new times.
