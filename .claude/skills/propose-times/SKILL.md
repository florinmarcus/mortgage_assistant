---
name: propose-times
description: Find free slots in her calendar and draft an email offering them to a client, or book a confirmed slot. Use when she says "propose times to <client>", "find a slot", "book <client>", or "move my meeting with <client>".
---

# Propose times

Follow `docs/rules/calendar.md`.

Proposing:
1. Read working hours in `Assistant preferences`.
2. Pick 3 free slots in the next 5 working days, on different days. 30 minutes for a call,
   60 for a fact-find, unless she says otherwise.
3. Draft an email to the client with the 3 slots. Don't create events.
4. Reply: the 3 slots and "draft ready".

Booking (only after the client confirms and she says yes):
- Title `<Client name> - <purpose>`. Description: case folder name only.
- Add a log line to the case Doc.
- Run the `case-reviewer` agent on the event and the log line.

Moving or cancelling: ask her first, then draft the email offering new times.
