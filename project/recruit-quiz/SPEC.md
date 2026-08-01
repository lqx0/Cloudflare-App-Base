# aDaptQuiz Product Specification

Status: confirmed requirements draft. This document records only the product requirements approved as of 1 August 2026. Page-level visual details, the final architecture document, and the implementation plan still require later approval.

## 1. Product purpose

`aDaptQuiz` is an English-language prototype prepared in response to the aDapt Family Solutions Ltd `Computer Tech (online forms)` role advertised on SJS. The site must identify its source and prototype status clearly. It must not imply that aDapt Family Solutions Ltd has formally released or endorsed the product.

Source: [SJS job listing](https://www.sjs.co.nz/job-details/2304/computer-tech-online-forms-3628)

Job context:

- Company: aDapt Family Solutions Ltd
- Role: Computer Tech (online forms)
- Location: Karioitahi, Auckland
- Pay: $30/hour
- Engagement: one-off
- Start date: 28 Jul 2026
- Hours: 18 hours/week
- Work arrangement: work from home
- Follow-on work: possible; completion date is negotiable
- Reference: TECH001
- Category: ICT
- Posted: 28 Jul 2026
- Expires: 27 Aug 2026

## 2. Product and language

- Product name: `aDaptQuiz`.
- All user-interface copy is English only.
- Project documentation continues to follow the repository's paired English/Chinese rule.
- Preserve the primary Cloudflare App Base visual design, shared layout, and React/Vite plus Hono Worker architecture.

## 3. Users and authentication

- Continue using the existing Better Auth account model, email registration, email sign-in, sessions, and protected routes.
- Do not create a separate account system or registrations table.
- Preserve Google OAuth2 registration and sign-in capability. Show and enable it only when the server confirms that both the Google Client ID and Secret are configured.
- Every signed-in user, including an administrator, may take a quiz.
- Only the existing `admin` role may access question management and administrator notice pages.

## 4. Current-version core features

### 4.1 Question-bank management

- An administrator can add multiple-choice, true/false, and free-text questions.
- An administrator can view the existing question list.
- The current version does not provide editing, deletion, or deactivation.
- The management page must state that editing, deletion, and deactivation will be implemented in the production version.

Question validation:

- Every trimmed prompt must be non-empty.
- A multiple-choice question has at least two distinct, non-empty options, and its correct answer must be one of those options.
- A true/false answer must be either `true` or `false`.
- A free-text question must have non-empty `Reference answer / Evaluation guidance`.
- Free-text answers are not scored automatically and do not call AI. The user compares their answer with the reference answer or guidance after submission.
- Prompts, options, and answers have reasonable length limits to prevent abnormal requests and oversized emails.

### 4.2 Starting a quiz

- A signed-in user can start a quiz.
- Each round randomly selects exactly three questions: one multiple-choice, one true/false, and one free-text question.
- If any question type is unavailable, starting is blocked and the missing types are listed in English.
- The system does not use placeholder or automatically generated questions.
- A later round may randomly select a question seen in an earlier round.

### 4.3 Answering and results

- The three questions appear in one quiz flow.
- Every question must be answered before submission.
- Answers can be changed before submission and are locked after submission.
- Submission immediately displays the user's answer and the correct answer for every question.
- A free-text question displays the administrator-provided reference answer or evaluation guidance and no automated score.
- The current version has no overall score, AI evaluation, live manual marking, timer, focus monitoring, or anti-cheating controls.

### 4.4 Actions after completion

Only two primary actions are offered after submission:

1. `Send a copy`: after explicit user confirmation, send a copy of the round to the configured administrator email address.
2. `Start a new quiz`: clear the current in-memory state and immediately request a new random round. This action must be functional.

After a successful send, the button becomes a non-repeatable success state for that round. A failed send preserves the results and permits a retry or a new round.

## 5. Answer data and privacy

- D1 persists only the question bank.
- The current version creates no attempts, answers, history, or email-submissions tables.
- Quiz progress and results exist only in the current React page memory.
- Refreshing, closing, or leaving the page ends the round and loses its progress and results.
- The quiz start page states this behavior in English and also says that the production version will retain test records and provide history.
- Self-test answers are not sent or persisted and are not visible to administrators.
- Answer content is given to the email provider and administrator only after the user selects and confirms `Send a copy`.
- Worker logs must not contain names, email addresses, questions, or answers.

The send confirmation identifies the data being disclosed:

- user name;
- signed-in email address;
- send time;
- the three questions;
- the user's answers;
- correct or reference answers;
- the fact that Resend will transmit the content to the administrator.

The Privacy page must describe these boundaries consistently.

## 6. Email delivery

### 6.1 Selected approach

- Use the repository's existing Resend provider as the lowest-effort path to real delivery.
- Use a dedicated sending subdomain, preferably `mail.fitoa.net`.
- Recommended sender: `aDaptQuiz <quiz@mail.fitoa.net>`.
- Configure the administrator recipient through server-side `RECRUIT_QUIZ_RECIPIENT_EMAIL`.
- The frontend receives only whether delivery is available. It never receives the API key, sender address, or administrator address.
- Preserve the Cloudflare Email binding capability, but do not use it as this project's preferred real-delivery path.

### 6.2 Availability conditions

Real delivery is enabled only when all conditions are satisfied:

- `EMAIL_PROVIDER=resend`;
- a valid `EMAIL_API_KEY`;
- a non-placeholder project sender address;
- `RECRUIT_QUIZ_RECIPIENT_EMAIL` is configured;
- `mail.fitoa.net` has passed Resend verification using the required GoDaddy DNS records.

When local or target-environment configuration is incomplete, disable sending and display `Email delivery is not configured in this prototype.` Never display a false success state.

### 6.3 Email content and failures

- Provide both HTML and plain-text bodies.
- The subject contains `aDaptQuiz`, the user's name, and send time.
- The body contains user identity, send time, all three questions, user answers, correct/reference answers, and a statement that the user actively sent the copy.
- The server obtains identity from the Better Auth session and reloads authoritative questions and answers from D1 by ID. It does not trust client-supplied identity or answer keys.
- Convert provider failures into a generic user-facing message without exposing secrets or internal responses.
- Preserve results and permit retry after failure.
- Because the current version does not persist an email submission ID, the UI prevents ordinary duplicate clicks but does not promise strict exactly-once delivery across network retries.

### 6.4 Remote-configuration boundary

Creating a Resend account or API key, changing GoDaddy DNS, synchronizing secrets, deploying the Worker, and performing a real send test are separately authorized future operations. Do not perform them in the current task without explicit approval.

## 7. Administrator submissions notice

- `/admin/submissions` is an English notice page accessible only to administrators.
- The current version does not store or display a submissions list in the application.
- The page tells administrators to view actively sent copies in the configured administrator mailbox.
- The page states that the production version will provide an in-app view of actively submitted copies.
- The page states that self-test results are not visible to administrators.

## 8. Page scope

- `/`: public product explanation, prototype status, job context, and SJS source.
- `/login`, `/signup`, and existing authentication pages: continue using Better Auth.
- `/quiz`: start, answer, submit, review results, actively send, and start a new round.
- `/admin/questions`: administrator question creation and list.
- `/admin/submissions`: current mailbox guidance and production-version notice.
- `/account` and `/profile`: preserve existing account capability.
- `/privacy`: explain non-persistence, active sending, and Resend transfer boundaries.

## 9. Server API requirements

- `GET /api/quiz/status`: after sign-in, return question-bank completeness and delivery availability without returning the administrator address.
- `POST /api/quiz/round`: after sign-in, randomly return one question of each type without correct answers.
- `POST /api/quiz/submit`: after sign-in, accept question IDs and user answers, reload D1, and return authoritative correct/reference answers without persistence.
- `POST /api/quiz/send-copy`: after sign-in, reload authoritative questions, answers, and session identity, then send through Resend without persisting the answers.
- `GET /api/admin/questions`: administrator-only question list.
- `POST /api/admin/questions`: administrator-only validated question creation.

The Worker enforces administrator access using the current user ID and `users.role`. Hiding frontend navigation is not authorization. A non-administrator receives `403` from administrator APIs.

## 10. Requirements matrix

| Area | Current version | Production-version notice | Explicitly excluded |
|---|---|---|---|
| Public home | English product, source, and prototype explanation | — | No claim of an official product |
| Authentication | Better Auth email auth; Google OAuth when credentials are complete | — | No separate account system |
| Quiz | Exactly one of each question type and immediate answer review | — | No complex exam or AI scoring |
| Question bank | Administrator add and list | Editing, deletion, and deactivation | These operations are absent now |
| History | Temporary page-memory state | Retained records and history view | No history table now |
| Email copy | Active confirmation and Resend delivery | In-app view of actively sent copies | No automatic sending or self-test disclosure |
| Admin submissions | Guidance to use the administrator mailbox | In-app submissions list | No stored or displayed list now |
| Recipient | Server-side environment configuration | Administrator settings UI | No settings UI now |
| Email unavailable | Disabled action with an explicit notice | — | No false success state |
| Beyond RecruitQuiz | — | Only approved notices | No speculative features |

## 11. Explicit non-goals

- Do not work on `legacy/cloudflare-ankit`.
- Do not modify `main`.
- Do not implement history, an in-app submissions list, question editing/deletion/deactivation, or recipient settings UI.
- Do not implement e-commerce, payments, orders, inventory, multi-tenancy, or any feature outside RecruitQuiz.
- Do not remove existing deployment, remote database, backup/restore, email, or CLI capability.
- Without separate explicit authorization, do not deploy Cloudflare, modify remote Workers/D1/secrets/OAuth/DNS/email/paid resources, or push remotely.

## 12. Acceptance summary

- The English UI and paired project documents remain consistent.
- When all three types exist, every round returns exactly three questions; when any type is absent, starting is blocked.
- Submission immediately reveals authoritative answers without writing answer content to D1.
- Starting a new round works.
- Before active sending, neither administrators nor the email provider receive answer content.
- Sending is allowed only when configuration is complete, and success or failure follows the real provider result.
- Every administrator endpoint has server-side role enforcement.
- Implementation starts with failing tests and minimal code, then finishes with the full test suite, lint, type checking, and build.
- Preview configuration uses the independent `adaptquiz-preview` Worker and D1 and fails before any remote action until their real D1 UUID and workers.dev URL replace the checked-in markers.

## 13. Approved English page copy

Home prototype statement:

> Prototype prepared in response to the aDapt Family Solutions Ltd SJS job listing.

Quiz explanation:

> Each quiz contains one multiple-choice question, one true-or-false question, and one written-response question.

> Your answers are not saved in this prototype. Refreshing or leaving this page will end the current quiz.

> The production version will retain completed quizzes and provide access to your quiz history.

Send confirmation:

> This will send your name, account email, the three questions, your answers, and the correct or reference answers to the configured administrator through Resend. Nothing is sent unless you confirm.

Question-bank notice:

> Question editing, deletion, and availability controls will be implemented in the production version.

Administrator submissions notice:

> Submitted copies are currently delivered to the configured administrator mailbox. Please check that mailbox to review copies actively sent by users.

> An in-app submissions view will be implemented in the production version. Self-test results that users do not send are never available to administrators.

Email unavailable:

> Email delivery is not configured in this prototype. You can still start a new quiz.
