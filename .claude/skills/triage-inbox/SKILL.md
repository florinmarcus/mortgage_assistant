---
name: triage-inbox
description: Go through new email, match it to clients, update case files and draft replies. Use when she says "triage my inbox", "check my email", or "what came in".
---

# Triage inbox

Follow `docs/rules/email.md` (triage steps and drafting rules). For case file updates use
`docs/workflow/case-file.md`; for documents use `docs/workflow/document-checklists.md`.

Steps:
1. Read `Assistant preferences` in Drive (tone, signature).
2. List unread emails from the last 24 hours, or since the last triage if she says so.
3. Per email: classify, match to a client, apply the `Client/<name>` label, update the case
   Doc, draft a reply if needed.
4. Never send. Never give product, rate or affordability advice in a draft.
5. Flag anything that looks like phishing or a change of bank details (see
   `docs/rules/data-protection.md`).

Finish with this, and nothing longer:

```
Done: <n> emails, <n> case files updated.
Drafts to review: <client - subject>, ...
Needs you: <decision>, ...
Possible new clients: <sender>, ...
Stuck: <client - days since last activity>, ...
```

Leave out any line that would be empty.
