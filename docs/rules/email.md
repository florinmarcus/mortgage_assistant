# Email rules

## Forwarded emails (how client email arrives)

Her client email lives in a work account the assistant can't connect to. She forwards
client emails from her work address to this Gmail account. So most client emails arrive
**from her**, as forwards.

- Her forwarding address(es) are listed in `Assistant preferences` ("Forwarding
  addresses"). An email from one of them is a forward, never a client.
- Read the **original message** inside the forward: its `From:` (the client), `Date:`,
  `Subject:` and text. Match the client, log the date and summarise from that, not from
  the forward.
- Attachments on the forward belong to the original message.
- If she wrote a note above the forwarded part ("please add to Smith's file"), follow it.
- A forward with several messages (a whole thread): handle each original message, newest
  last.
- If you can't find the original sender, say so and ask her. Never guess the client.
- Replies: she answers from her work account. Draft the reply as usual (To: the client's
  address from the original, Subject `Re: <original subject>`), and tell her it's for her
  to copy into her work email.


## Triage ("triage my inbox")

1. Look at unread emails since the last triage (or the last 24 hours).
2. For each email, decide what it is:
   - new enquiry
   - documents from a client
   - lender or insurer update
   - meeting request or change
   - other (newsletters, marketing: skip, don't list)
3. Match it to a client by the original sender (for forwards, the `From:` inside the
   forward). If that matches a client, apply the client's label. If it's a new person,
   list it as a possible new client and ask her.
4. Update the case file (see `../workflow/case-file.md`). Then mark the email as read.
5. Where a reply is needed, don't draft it yet. List it as a proposal (see below).
6. Finish with a short list: what you did, replies you propose to draft, what needs her decision,
   and any stuck cases.

## Drafting replies

- **Confirm first.** Before creating a draft, tell her in one or two lines who it's to and
  what it would say, then wait. She can say yes, change it, or skip it. "Yes to all" covers
  every proposal in that list.
- Drafts only. Never send.
- Read `Assistant preferences` in her Drive first for tone and signature.
- Short and friendly. Say what you received and what's still needed, with a list if more
  than two items.
- Don't give advice on products, rates or affordability in a draft. That's her job and
  it's regulated. Write "I'll come back to you on this" and flag it to her.
- Don't promise dates that depend on a lender.
- Never paste a client's personal details into a reply to someone else.

## Attachments

You can see attachment names, not their content. The Apps Script saves the files to Drive.
Use the names and the email text to tick documents (see
`../workflow/document-checklists.md`).
