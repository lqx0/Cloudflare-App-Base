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
- [x] Report unperformed remote operations and the real-email verification boundary.

## Production-version notices, not implemented now

- [ ] Save and display a user's own quiz history.
- [ ] Let administrators view copies actively sent by users in the app.
- [ ] Edit, delete, and deactivate questions.
- [ ] Configure the recipient through an administrator UI.

## Remote enablement, separately authorized

- [x] Configure the single remote test target as `adaptquiz`, record its D1 ID, select Resend, and retain the fail-closed remote preflight.
- [x] Create the remote `adaptquiz` D1 and apply all project migrations after taking a backup.
- [ ] Create or configure a Resend account and restricted API key.
- [ ] Add Resend DNS records for `mail.fitoa.net` in GoDaddy.
- [ ] Configure the target environment's sender, recipient, and secrets.
- [ ] Deploy the `adaptquiz` test Worker.
- [ ] Verify real delivery with a test account.
- [x] Push `project/adapt-quiz` and retire the remote `project/recruit-quiz` branch.

Values still requiring separate approval and provider configuration:

- `.env.preview` `APP_BASE_URL`/`CLI_API_URL_PREVIEW` using `https://adaptquiz.lqixv.workers.dev`;
- Preview `EMAIL_API_KEY`, `RECRUIT_QUIZ_RECIPIENT_EMAIL`, `CLI_API_KEY`, and any OAuth credentials, only after their respective configuration is authorized.
