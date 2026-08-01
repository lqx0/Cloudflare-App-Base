# aDaptQuiz Vision

## Purpose

`aDaptQuiz` is an English-language prototype prepared in response to the aDapt Family Solutions Ltd `Computer Tech (online forms)` role advertised on SJS. It demonstrates a small, clear, and verifiable online question-bank and self-test workflow while preserving the authentication, database, email, and deployment-readiness capabilities of Cloudflare App Base.

The project must identify its prototype status and [SJS source](https://www.sjs.co.nz/job-details/2304/computer-tech-online-forms-3628). It must not imply that aDapt Family Solutions Ltd has formally released or endorsed it.

## Current-version vision

The current version lets an administrator maintain a simple question bank and lets a signed-in user complete three random questions per round, then immediately compare their answers with correct answers or reference guidance. Pure self-test content is not stored and is not visible to administrators. The system emails a round to the administrator only after the user actively confirms sending it.

## Product principles

1. Keep it simple: every round contains exactly one multiple-choice, one true/false, and one free-text question.
2. Prefer privacy: self-test answers exist only in current browser-page memory.
3. Require active disclosure: an email copy is never sent automatically.
4. Show real state: incomplete configuration, an incomplete question bank, and provider failures degrade explicitly and never report false success.
5. Reuse the foundation: retain Better Auth, Hono, D1, Kysely, the shared layout, and existing email providers.
6. Do not build ahead: do not scaffold empty modules for production history, in-app submissions, or question lifecycle controls.

## Production-version direction

Pages may state that the production version will provide:

- saved user quiz history;
- an administrator view of copies actively sent by users;
- question editing, deletion, and availability controls;
- an administrator UI for the recipient address.

The production version must still prevent administrators from seeing self-test results that users did not actively send.

## Success criteria

- The English UI accurately explains the job source, prototype status, and privacy boundary.
- An administrator can add and view all three question types.
- Every round randomly selects exactly one question of each type.
- Submission immediately displays user and authoritative answers without persisting answer content.
- A user can start a genuinely new round.
- When fully configured, a user can actively send a copy through Resend.
- Permissions, failures, and unimplemented features are represented honestly and clearly.

## Delivery boundary

This project lives on `project/recruit-quiz`. Without separate explicit authorization, do not perform a Cloudflare deployment, remote D1 operation, secret synchronization, OAuth configuration, GoDaddy DNS change, Resend configuration, real email test, paid-resource operation, or remote push.
