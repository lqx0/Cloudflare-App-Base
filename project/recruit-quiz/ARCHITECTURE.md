# aDaptQuiz Architecture

## 1. High-level design

```text
React/Vite browser
  |-- public home and Better Auth pages
  |-- /quiz in-memory state
  |-- /admin/questions
  `-- /admin/submissions notice
          |
          v
Hono Worker /api/*
  |-- Better Auth session
  |-- admin-role middleware
  |-- quiz routes and service
  |-- question repository --> D1 quiz_questions
  `-- quiz email service --> Resend
```

The frontend never accesses D1 directly. Question-bank, answer review, authorization, and email behavior all pass through same-origin Worker APIs.

## 2. Data boundary

D1 adds only `quiz_questions`:

- `id`
- `type`: `multiple_choice | true_false | free_text`
- `prompt`
- `optionsJson`: multiple-choice only
- `correctAnswer`: correct answer or free-text reference guidance
- `createdByUserId`
- `createdAt`

The current version creates no attempt, answer, history, or email-submission table. React page state holds current questions, user answers, submitted results, and send state. Refreshing or leaving loses that state.

## 3. Frontend units

- `QuizPage`: state machine and flow container.
- `QuizIntroduction`: quiz, privacy, and production-version explanation.
- `QuizQuestionCard`: inputs for all three types.
- `QuizResults`: user and authoritative answers.
- `SendQuizCopyDialog`: disclosure confirmation and send state.
- `QuestionBankPage`: administrator page container.
- `QuestionForm`: type-specific creation form.
- `QuestionList`: read-only question list.
- `AdminSubmissionsNotice`: mailbox guidance and production-version notice.
- `quiz-api.ts` and `admin-questions-api.ts`: frontend API boundaries.

No global state library is added. The page uses local React state.

## 4. Worker units

- `quiz/routes.ts`: status, round, submit, and send endpoints.
- `quiz/admin-routes.ts`: administrator question-bank endpoints.
- `quiz/schema.ts`: input, question-type, and length validation.
- `quiz/repository.ts`: sole D1 question-bank access layer.
- `quiz/service.ts`: random round and result assembly.
- `quiz/email.ts`: escaped HTML/plain-text templates and provider call.
- `middleware/admin.ts`: loads `users.role` using the session user ID.

## 5. API

- `GET /api/quiz/status`: question-bank completeness and delivery availability.
- `POST /api/quiz/round`: randomly returns one question of each type without answers.
- `POST /api/quiz/submit`: reloads all three questions and returns authoritative answers without persistence.
- `POST /api/quiz/send-copy`: reloads questions and session identity, then actively sends without persistence.
- `GET /api/admin/questions`: administrator-only list.
- `POST /api/admin/questions`: administrator-only validated creation.

## 6. Data flow

Start: session → check all three types → independently select one random D1 row per type → return three questions without answers → React memory.

Submit: question IDs plus user answers → session → reload D1 rows → verify exactly one of each type → return authoritative answers → no D1 write.

Send: explicit confirmation → session identity → authoritative D1 questions and answers → escaped HTML plus plain text → Resend → return real outcome → no D1 write.

## 7. Email

Prefer the existing Resend provider:

- `EMAIL_PROVIDER=resend`
- `EMAIL_API_KEY` secret
- recommended sender `aDaptQuiz <quiz@mail.fitoa.net>`
- `RECRUIT_QUIZ_RECIPIENT_EMAIL`

The status endpoint reports delivery available only when all configuration is usable. The frontend receives neither addresses nor secrets. Preserve the Cloudflare Email binding.

## 8. Security and privacy

- Every quiz endpoint requires a Better Auth session.
- Every administrator endpoint additionally enforces the `admin` role on the server.
- The server ignores client-supplied identity, recipient, sender, and answer keys.
- Escape user and question text before inserting it into HTML email.
- Logs contain no identities, questions, or answers.
- Provider failures map to generic responses.
- This is a self-test product; do not add signed attempts, focus monitoring, timers, or complex anti-cheating controls.

## 9. Failure handling

- Incomplete question bank: block starting and list missing types.
- Expired session: do not submit or send; require sign-in.
- Missing question or invalid type combination: preserve page input and prompt a restart.
- Email unavailable: disable sending but permit a new round.
- Provider failure: preserve results and permit retry or a new round.
- Non-administrator request to an administrator API: `403`.

## 10. Environment boundary

Local implementation and tests do not connect to remote resources by default. DNS, Resend, remote secrets, and deployment require separate authorization. Do not modify legacy Workers or D1 databases.

The only remote environment is a non-production test environment. Repository scripts continue to call it `preview`, but no separate Production resource will be created:

- Worker name: `adaptquiz`;
- D1 name: `adaptquiz`;
- email provider: `resend`;
- D1 ID: `62af6701-0b32-48b8-a176-c8112de967f7`;
- application URL: `https://quiz.fitoa.net`;
- Workers.dev diagnostic endpoint: `https://adaptquiz.tom0.workers.dev`.

Cloudflare hosts the authoritative DNS for `fitoa.net`, and a Worker custom-domain route maps `quiz.fitoa.net` to `adaptquiz`. Google OAuth uses a Web Client with the application URL as its allowed origin and `/api/auth/callback/google` as its callback. The client exposes the entry point only when both the Client ID and Client Secret exist. The OAuth consent screen remains in Testing and is limited to explicitly added test users. Secrets live only in Cloudflare and are never written to the repository or documentation. Preview email authentication remains disabled.

Better Auth's `accounts` table includes nullable `idToken` and `refreshTokenExpiresAt` fields written by Google OAuth; email/password accounts may leave them empty. Remote migrations require a D1 backup first.

`bin/preview-remote-config.ts` remains a fail-closed preflight. Remote-test deployment, secret synchronization, and D1 commands stop before invoking Wrangler when the D1 ID is not a real UUID, when the application URL or custom-domain route is not `https://quiz.fitoa.net`, or when shared base resource names reappear. The checked-in Production placeholders are intentionally unused; Production commands remain outside the project scope.
