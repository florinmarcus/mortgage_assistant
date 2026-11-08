# Mortgage assistant

An AI assistant for a self-employed UK mortgage and protection adviser, built on Claude Code
and Google Workspace.

It reads her email, keeps one case file per client, drafts replies, proposes meeting times
and gives a short brief on any case, for example while a client is on the phone:

> Smith Anna, remortgage with a high street lender. Stage: Valuation, booked 12 Nov.
> Missing: 2 payslips. Next: chase payslips by 10 Nov. Last contact: 3 Nov.

Mortgages take months and documents arrive in stages, so the case file, not the inbox, is
the source of truth.

## How it works

```
 Claude app (desktop / phone)
        │  starts a cloud session, clones this repo
        ▼
 Claude Code ── CLAUDE.md + docs/ (rules, stages, checklists)
        │
        │  connectors (her account)
        ├──► Gmail ............ read, label, draft (never send)
        ├──► Google Calendar .. check free time, book on approval
        └──► Google Docs ...... case files

 Google Apps Script (her account, every 10 min)
        └──► saves attachments from labelled emails into Drive
```

Design choices:

- **Human in the loop.** The assistant drafts; she sends. Sending is blocked.
- **Data stays in her accounts.** This repo holds instructions only. No client data, no keys.
- **Structured case files** instead of searching email history, so a brief is fast and
  consistent.
- **Context engineering.** `CLAUDE.md` is a short index with the hard rules. Detailed rules
  live in `docs/` and are read only when the task needs them.

## Repo layout

```
CLAUDE.md                     entry point: hard rules, where things live, what to read when
docs/
  architecture.md             parts, flow, known limits
  workflow/case-stages.md     mortgage and protection stages
  workflow/document-checklists.md
  workflow/case-file.md       naming, new client, updating case files
  rules/email.md              triage and drafting
  rules/calendar.md           proposing and booking times
  rules/data-protection.md    UK GDPR and FCA boundaries
templates/case-file.md        case file template
apps-script/                  saves email attachments into client folders (runs in her Google account)
tests/                        logic tests for the Apps Script (node --test tests/apps-script.test.js)
.claude/skills/               brief, triage-inbox, new-client, propose-times
.claude/settings.json         guardrails: sending and trashing email blocked, calendar
                              changes need approval, auto-compact at 200K tokens,
                              version shown at session start
.claude/hooks/show-version.sh
```

## Setup (adviser)

Step-by-step guide with checks: `docs/onboarding.md`. Short version:

1. Claude paid plan, with model training turned off in privacy settings.
2. In Claude settings, connect Gmail, Google Calendar, Google Docs and Google Drive.
3. In her Google Drive: create a `Clients` folder and an `Assistant preferences` Doc
   (tone, email signature, working hours).
4. Install the Apps Script: `apps-script/README.md`.
5. Start a Claude Code session on this repo and ask: "Triage my inbox."

## Development

- Never commit client data. Use made-up clients only.
- Test plan: `docs/testing/test-scenarios.md` (run on a developer account with mock data first).
- Changes go through pull requests to `main`.
- After a change to the instructions, the adviser opens a new session to pick it up.

## Status

Early version. Built by Florin Marcus as a personal project.
