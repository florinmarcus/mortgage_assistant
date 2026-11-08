---
name: triage-inbox
description: Go through new email, match it to clients, update case files and draft replies. Use when she says "check my emails", "any new emails", "what came in", "go through my inbox", "triage", or in Romanian "verifică emailurile", "ce emailuri am".
---

# Triage inbox

Follow `docs/rules/email.md` (triage steps and drafting rules). For case file updates use
`docs/workflow/case-file.md`; for documents use `docs/workflow/document-checklists.md`.

Steps:
1. Read `Assistant preferences` in Drive (tone, signature).
2. List unread emails from the last 24 hours, or since the last triage if she says so.
3. Per email: classify, match to a client, apply the `Client/<name>` label, update the case
   Doc. If a reply is needed, note a one-line proposal. Don't draft yet.
4. Never send. Never give product, rate or affordability advice in a draft.
5. Flag anything that looks like phishing or a change of bank details (see
   `docs/rules/data-protection.md`).

6. Run the `case-reviewer` agent with a list of every change you made (client, email,
   what was written where). If it reports issues, fix what you can and include the rest
   under "Needs you". Don't skip this step, even for one email.

Finish with this, and nothing longer:

```
Done: <n> emails, <n> case files updated.
Replies to draft? 1) <client>: <one line of what it would say>  2) ...
Needs you: <decision, or a reviewer issue>, ...
Possible new clients: <sender>, ...
Stuck: <client - days since last activity>, ...
```

Leave out any line that would be empty.

Then wait. Draft only the replies she approves ("yes", "1 and 3", "yes to all"), with her
changes. Run `case-reviewer` on the drafts, then say "Drafts ready in Gmail".
