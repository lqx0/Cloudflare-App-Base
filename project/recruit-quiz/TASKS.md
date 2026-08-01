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

- [x] Define aDaptQuiz identity, job content, and production notices with failing tests.
- [x] Add the local `quiz_questions` migration and Kysely type.
- [x] Implement question schemas and length validation.
- [x] Implement server-side administrator-role middleware.
- [x] Implement administrator question creation and list APIs.
- [x] Implement the administrator question-bank page and production notice.
- [x] Implement question-bank status and three-type random-round API.
- [x] Implement the English quiz introduction and answering page.
- [x] Implement immediate submission, authoritative answers, and free-text guidance.
- [x] Implement a genuinely functional new round.
- [x] Extend the email adapter for generic HTML and plain-text sending.
- [x] Implement the Resend quiz-copy template and send API.
- [x] Implement send confirmation, success, failure, and unavailable states.
- [x] Implement the administrator mailbox notice page.
- [x] Update Privacy, navigation, SEO, and conditional authentication presentation.

## Verification

- [x] Run every focused test.
- [x] Run the full TypeScript test suite.
- [x] Run lint.
- [x] Run TypeScript type checking.
- [x] Run the build.
- [x] Run `git diff --check` and review the Git diff.
- [x] Record local and remote verification results and the remaining unperformed boundaries.

## Production-version notices, not implemented now

- [ ] Save and display a user's own quiz history.
- [ ] Let administrators view copies actively sent by users in the app.
- [ ] Edit, delete, and deactivate questions.
- [ ] Configure the recipient through an administrator UI.

## Remote enablement, separately authorized

- [x] Configure the single remote test target as `adaptquiz`, record its D1 ID, select Resend, and retain the fail-closed remote preflight.
- [x] Create the remote `adaptquiz` D1 and apply all project migrations after taking a backup.
- [x] Create or configure a Resend account and a send-only restricted API key.
- [x] Configure Resend DNS for `mail.fitoa.net` and verify the domain mail path through successful delivery from `quiz@mail.fitoa.net`.
- [x] Configure the target environment's sender, `daxuyouran@gmail.com` recipient, and required secrets.
- [x] Deploy the single `adaptquiz` test Worker to `https://adaptquiz.tom0.workers.dev`.
- [x] Set `lqixv@hotmail.com` as the remote administrator, enter all three question types, and complete browser end-to-end verification of sign-in, answering, submission, new round, and actively sending a copy.
- [x] Confirm delivery of a real quiz copy and correct the email's quiz-taker label to `Quiz taker's answer`.
- [x] Push `project/adapt-quiz` and retire the remote `project/recruit-quiz` branch.
- [!] Roll the accidentally deployed `cloudflare-app-base` Worker back from version `bddedbcc-d2f8-422a-bbe6-cc4fcab8167c` to its prior version `bcd57414-5aee-4144-8c73-911ccffc73b1`; awaiting separate authorization for this destructive remote operation.

Current remote configuration boundaries:

- `.env.preview` uses `https://adaptquiz.tom0.workers.dev` for `APP_BASE_URL`/`CLI_API_URL_PREVIEW` and remains Git-ignored;
- `EMAIL_API_KEY`, `RECRUIT_QUIZ_RECIPIENT_EMAIL`, `CLI_API_KEY`, and `BETTER_AUTH_SECRET` are synchronized to `adaptquiz`;
- Google OAuth credentials remain unconfigured, and Preview authentication emails remain disabled.
