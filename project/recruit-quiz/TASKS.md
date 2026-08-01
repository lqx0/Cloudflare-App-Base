# aDaptQuiz Tasks

Status: `[ ]` not started, `[-]` in progress, `[x]` completed, `[!]` blocked.

## Requirements and design

- [x] Create an isolated project branch from `main` baseline `1b094d6`.
- [x] Read AGENTS and all five paired base-document sets completely.
- [x] Confirm English UI, product name, question types, privacy, administrator, and email boundaries.
- [x] Compare architectures and select a D1 question bank with React in-memory quiz state.
- [x] Approve page, API, data, email, security, and testing design.
- [x] Complete paired project documents and the formal design specification.
- [x] Obtain user approval of the written specification.
- [x] Write and approve the TDD implementation plan.

## Current-version implementation

- [ ] Define aDaptQuiz identity, job content, and production notices with failing tests.
- [ ] Add the local `quiz_questions` migration and Kysely type.
- [ ] Implement question schemas and length validation.
- [ ] Implement server-side administrator-role middleware.
- [ ] Implement administrator question creation and list APIs.
- [ ] Implement the administrator question-bank page and production notice.
- [ ] Implement question-bank status and three-type random-round API.
- [ ] Implement the English quiz introduction and answering page.
- [ ] Implement immediate submission, authoritative answers, and free-text guidance.
- [ ] Implement a genuinely functional new round.
- [ ] Extend the email adapter for generic HTML and plain-text sending.
- [ ] Implement the Resend quiz-copy template and send API.
- [ ] Implement send confirmation, success, failure, and unavailable states.
- [ ] Implement the administrator mailbox notice page.
- [ ] Update Privacy, navigation, SEO, and conditional authentication presentation.

## Verification

- [ ] Run every focused test.
- [ ] Run the full TypeScript test suite.
- [ ] Run lint.
- [ ] Run TypeScript type checking.
- [ ] Run the build.
- [ ] Run `git diff --check` and review the Git diff.
- [ ] Report unperformed remote operations and the real-email verification boundary.

## Production-version notices, not implemented now

- [ ] Save and display a user's own quiz history.
- [ ] Let administrators view copies actively sent by users in the app.
- [ ] Edit, delete, and deactivate questions.
- [ ] Configure the recipient through an administrator UI.

## Remote enablement, separately authorized

- [ ] Create or configure a Resend account and restricted API key.
- [ ] Add Resend DNS records for `mail.fitoa.net` in GoDaddy.
- [ ] Configure the target environment's sender, recipient, and secrets.
- [ ] Deploy project-specific Worker/D1 resources and apply project migrations.
- [ ] Verify real delivery with a test account.
- [ ] Push the remote branch.
