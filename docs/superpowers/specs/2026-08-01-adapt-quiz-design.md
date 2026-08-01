# aDaptQuiz Design Specification

Date: 1 August 2026

Branch: `project/recruit-quiz`

Baseline: `1b094d6`

## 1. Design goal

Build the English-language `aDaptQuiz` prototype on Cloudflare App Base. An administrator maintains three question types. A signed-in user completes three random questions per round, immediately sees authoritative answers, and may actively send the round to the administrator through Resend. Self-test answers are not persisted and remain invisible to the administrator unless actively sent.

The [project specification](../../../project/recruit-quiz/SPEC.md) is the detailed requirements authority.

## 2. Approaches considered

### Approach A: D1 question bank plus React in-memory quiz state (selected)

D1 stores only questions. The Worker selects questions and returns authoritative answers, while React holds the current round only in page memory. On an active send, the Worker reloads questions and session identity.

Advantages: directly matches the privacy requirement, minimizes change, creates clear boundaries, and is easy to test. Trade-offs: refresh loses the round, and network retries cannot guarantee exactly-once email. Both are accepted and disclosed in the UI.

### Approach B: signed stateless attempt token (not selected)

A signed token binds questions, user, and expiry. It improves request tamper resistance but adds a signing secret, expiration, and error paths that are excessive for a three-question self-test prototype.

### Approach C: D1 attempt and answer persistence (not selected)

This helps future history and in-app submissions but directly conflicts with the current non-persistence boundary and adds retention, deletion, and authorization complexity.

## 3. Requirements matrix

| Current version | Production notice only | Explicitly excluded |
|---|---|---|
| English home, job source, prototype statement | User quiz history | Separate account system |
| Better Auth email auth and conditional Google OAuth | In-app view of actively sent copies | Automatic self-test sending |
| Administrator add/list for three question types | Question editing, deletion, deactivation | AI or automatic manual scoring |
| Exactly one of each type per round | Recipient settings UI | Attempt/answer/history tables |
| Immediate answers and a real new round | — | Complex examination, anti-cheating, speculation |
| Active Resend delivery after confirmation | — | Remote configuration or deployment in this task |
| Administrator mailbox-guidance page | — | Current in-app submissions list |

## 4. Pages and flow

Preserve the shared `SiteLayout` and primary visual design. Public navigation contains Home and Quiz. Administrators additionally see Question Bank and Submitted Copies.

`/quiz` uses local states: Introduction → Loading → Answering → Submitting → Results → Sending/Success/Error. Submission locks answers. Results show no overall score and provide only `Send a copy` and `Start a new quiz` as primary actions.

`/admin/questions` contains a creation form and read-only list, with no edit, delete, or deactivate control. `/admin/submissions` only directs the administrator to the configured mailbox for actively sent copies and explains the production-version in-app list.

## 5. Data and API

The only business table is `quiz_questions(id, type, prompt, optionsJson, correctAnswer, createdByUserId, createdAt)`.

Endpoints:

- `GET /api/quiz/status`
- `POST /api/quiz/round`
- `POST /api/quiz/submit`
- `POST /api/quiz/send-copy`
- `GET /api/admin/questions`
- `POST /api/admin/questions`

The round endpoint never returns answers. Submit and send reload D1 rows by ID. The client cannot choose identity, recipient, sender, or answer keys.

## 6. Module boundaries

Frontend units are `QuizPage`, `QuizIntroduction`, `QuizQuestionCard`, `QuizResults`, `SendQuizCopyDialog`, `QuestionBankPage`, `QuestionForm`, `QuestionList`, `AdminSubmissionsNotice`, and two API clients.

Worker units are quiz routes, administrator routes, schema, repository, service, email, and administrator middleware. The repository is the only question-bank D1 boundary. The email unit owns escaped HTML/plain-text construction and provider calls.

## 7. Email

Prefer the existing Resend provider with recommended sender `aDaptQuiz <quiz@mail.fitoa.net>` and recipient from `RECRUIT_QUIZ_RECIPIENT_EMAIL`. Delivery is available only when the provider, API key, non-placeholder sender, and recipient are all configured.

The confirmation lists disclosed data. The email contains session identity, send time with an explicit/NZ timezone, all three questions, user answers, authoritative answers, and an active-send statement. Logs contain no content.

GoDaddy DNS, a Resend API key, secrets, and real delivery require separate later authorization.

## 8. Security, privacy, and errors

Quiz endpoints require a session. Administrator endpoints additionally query `users.role`. The server validates question type, count, string lengths, and choices. Every dynamic HTML-email value is escaped.

An incomplete bank blocks starting. An expired session prevents submission or sending. Missing questions prompt a restart. Missing mail configuration disables sending. Provider failure preserves results and permits retry. No failure reports false success.

## 9. TDD and acceptance

Each behavior starts with a failing test, verified expected failure, minimal implementation, passing test, and focused commit. Coverage includes identity copy, OAuth conditions, migration and schemas, administrator authorization, all question types, random rounds, no early answer leakage, non-persistence, a real new round, active-send gating, server-authoritative data, escaped mail, configuration degradation, production notices, and existing regressions.

Final verification runs focused tests, the full suite, lint, type checking, build, and `git diff --check`. Without real DNS/secret/deployment authorization, do not claim real email or remote-environment verification.

## 10. Scope and authorization

Do not modify `main`, `legacy/cloudflare-ankit`, or any remote Worker/D1. Preserve the Cloudflare Email binding and all base operational capabilities. Deployment, remote migrations, secrets, OAuth, DNS, email, paid resources, and pushing require separate explicit authorization.
