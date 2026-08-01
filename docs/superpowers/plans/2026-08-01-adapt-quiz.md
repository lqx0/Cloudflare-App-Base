# aDaptQuiz Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the local, English-language aDaptQuiz prototype with an administrator-managed three-type question bank, in-memory self-test rounds, immediate answer review, a functional new round, and actively confirmed Resend delivery.

**Architecture:** D1 persists only `quiz_questions`; focused Worker modules own validation, D1 access, round assembly, authorization, and email construction. React local state owns the current round and results, while Better Auth sessions protect all quiz APIs and the existing `users.role` protects administrator APIs.

**Tech Stack:** React 19, TypeScript 6, React Router, Tailwind/shadcn, Hono, Cloudflare Workers, D1, Kysely, Better Auth, Resend, Node test runner through `tsx`.

## Global Constraints

- Work only on `project/recruit-quiz`, based on `1b094d6`.
- Preserve the existing `SiteLayout`, Better Auth account model, Google OAuth capability, Cloudflare Email binding, CLI, and remote-operation tooling.
- All UI copy is English; project documents remain paired English/Chinese.
- D1 stores questions only. Do not create attempt, answer, history, or email-submission tables.
- Never send or persist self-test answers unless the signed-in user actively confirms `Send a copy`.
- Do not implement question editing, deletion, deactivation, in-app submission history, recipient settings UI, scoring, AI evaluation, timers, focus monitoring, or anti-cheating features.
- Do not deploy, change remote Worker/D1/secrets/OAuth/DNS/email/paid resources, or push.
- Every implementation task follows RED → verify expected failure → GREEN → verify pass → commit.

---

## File Map

- `migrations/0003_add_quiz_questions.sql`: question-bank schema and indexes.
- `src/worker/quiz/types.ts`: shared Worker quiz types.
- `src/worker/quiz/schema.ts`: validation and normalization.
- `src/worker/quiz/repository.ts`: sole D1 question access.
- `src/worker/quiz/service.ts`: bank status, round assembly, and submitted-result assembly.
- `src/worker/quiz/email.ts`: escaped HTML/plain-text copy construction and delivery readiness.
- `src/worker/quiz/routes.ts`: authenticated quiz endpoints.
- `src/worker/quiz/admin-routes.ts`: administrator question endpoints.
- `src/worker/middleware/admin.ts`: database-backed administrator authorization.
- `src/react-app/features/quiz/types.ts`: browser quiz DTOs.
- `src/react-app/features/quiz/quiz-api.ts`: quiz API client.
- `src/react-app/features/quiz/components/*`: focused quiz components.
- `src/react-app/pages/QuizPage.tsx`: local quiz state machine.
- `src/react-app/features/admin/admin-questions-api.ts`: administrator API client.
- `src/react-app/features/admin/components/*`: question form/list and submissions notice.
- `src/react-app/pages/admin/QuestionBankPage.tsx`: administrator question page.
- `src/react-app/pages/admin/AdminSubmissionsPage.tsx`: administrator mailbox notice page.
- `src/react-app/pages/public/Pages.tsx`: aDaptQuiz home and privacy content.
- `src/react-app/App.tsx`: new routes.
- `src/react-app/lib/public-navigation.ts`: Home and Quiz navigation.
- `src/react-app/components/PrimaryNavigation.tsx`: session-aware administrator navigation.
- `src/config.ts`, `src/worker/types/env.ts`, `.env.example`, `env/*.env.template`: project email configuration contract.
- `tests/adapt-quiz-*.test.ts`: focused behavior and contract tests.

---

### Task 1: Project identity, public content, navigation, and route contracts

**Files:**
- Create: `tests/adapt-quiz-content.test.ts`
- Modify: `src/config.ts`
- Modify: `src/react-app/pages/public/Pages.tsx`
- Modify: `src/react-app/lib/public-navigation.ts`
- Modify: `src/react-app/App.tsx`
- Modify: `src/react-app/lib/seo.ts`
- Modify: existing base-identity/navigation/SEO tests whose main-branch assumptions are intentionally replaced on this project branch

**Interfaces:**
- Produces routes `/`, `/quiz`, `/admin/questions`, and `/admin/submissions`.
- Produces `config.appName === "aDaptQuiz"` and public navigation `Home`, `Quiz`.

- [ ] **Step 1: Write failing content and route tests**

```ts
test("presents the approved aDaptQuiz prototype and SJS source", async () => {
  const page = await readFile("src/react-app/pages/public/Pages.tsx", "utf8");
  assert.match(page, /aDaptQuiz/);
  assert.match(page, /Prototype prepared in response/);
  assert.match(page, /aDapt Family Solutions Ltd/);
  assert.match(page, /sjs\.co\.nz\/job-details\/2304\/computer-tech-online-forms-3628/);
});
```

- [ ] **Step 2: Run `npx tsx --test tests/adapt-quiz-content.test.ts` and verify failure because project copy/routes do not exist**
- [ ] **Step 3: Implement the approved English home, job facts, product name, route shells, navigation, and noindex rules for protected routes**
- [ ] **Step 4: Update base tests only where project-branch identity intentionally replaces neutral-main expectations**
- [ ] **Step 5: Run the focused content/navigation/SEO tests and verify pass**
- [ ] **Step 6: Commit with `git commit -m "feat: establish aDaptQuiz project identity"`**

---

### Task 2: Question schema, migration, and pure validation

**Files:**
- Create: `migrations/0003_add_quiz_questions.sql`
- Create: `src/worker/quiz/types.ts`
- Create: `src/worker/quiz/schema.ts`
- Create: `tests/adapt-quiz-schema.test.ts`
- Modify: `src/worker/types/database.ts`

**Interfaces:**
- Produces `QuestionType = "multiple_choice" | "true_false" | "free_text"`.
- Produces `validateQuestionInput(input: unknown): QuestionInput`.
- Produces `validateRoundAnswers(input: unknown): RoundAnswerInput` requiring exactly one answer per type.

- [ ] **Step 1: Write failing validation tests**

```ts
assert.deepEqual(validateQuestionInput({
  type: "multiple_choice",
  prompt: "Which option is correct?",
  options: ["A", "B"],
  correctAnswer: "B",
}), {
  type: "multiple_choice",
  prompt: "Which option is correct?",
  options: ["A", "B"],
  correctAnswer: "B",
});
assert.throws(() => validateQuestionInput({ type: "multiple_choice", prompt: "x", options: ["A", "A"], correctAnswer: "A" }));
assert.throws(() => validateQuestionInput({ type: "free_text", prompt: "x", correctAnswer: "" }));
```

- [ ] **Step 2: Run the focused schema test and verify module-not-found failure**
- [ ] **Step 3: Add the migration with a type CHECK, nullable `optionsJson`, required answer, creator foreign key, timestamp, and type index**
- [ ] **Step 4: Add matching Kysely and DTO types**
- [ ] **Step 5: Implement trim, uniqueness, membership, boolean, exactly-three-types, and maximum-length validation using explicit constants**
- [ ] **Step 6: Run schema tests and `npx tsc -p tsconfig.worker.json --noEmit`; verify pass**
- [ ] **Step 7: Commit with `git commit -m "feat: define quiz question schema"`**

---

### Task 3: Repository, administrator authorization, and question-bank APIs

**Files:**
- Create: `src/worker/quiz/repository.ts`
- Create: `src/worker/middleware/admin.ts`
- Create: `src/worker/quiz/admin-routes.ts`
- Create: `tests/adapt-quiz-admin.test.ts`
- Modify: `src/worker/index.ts`
- Modify: `src/worker/types/context.ts`

**Interfaces:**
- Produces `createQuestionRepository(db)` with `list()`, `create(input, userId)`, `getByIds(ids)`, `countByType()`, and `getRandomByType(type)`.
- Produces `adminMiddleware(c, next)` returning `401` without a session and `403` unless the persisted user role is `admin`.
- Produces `GET/POST /api/admin/questions`.

- [ ] **Step 1: Write failing tests for role enforcement, allowed administrator creation, validation errors, and read-only list contract**

```ts
test("administrator APIs reject a signed-in non-admin", async () => {
  const response = await app.request("/api/admin/questions", {}, testUserEnv);
  assert.equal(response.status, 403);
});
```

- [ ] **Step 2: Run the focused administrator tests and verify route/module failures**
- [ ] **Step 3: Implement repository queries with Kysely and parse `optionsJson` only at the repository boundary**
- [ ] **Step 4: Extend `AppUser` with optional persisted `role`, but always query D1 in administrator middleware rather than trusting client/session presentation**
- [ ] **Step 5: Implement and mount list/create routes with `validateQuestionInput`**
- [ ] **Step 6: Run administrator tests and Worker type check; verify pass**
- [ ] **Step 7: Commit with `git commit -m "feat: add administrator question APIs"`**

---

### Task 4: Bank status, random round, and authoritative submission APIs

**Files:**
- Create: `src/worker/quiz/service.ts`
- Create: `src/worker/quiz/routes.ts`
- Create: `tests/adapt-quiz-round.test.ts`
- Modify: `src/worker/index.ts`

**Interfaces:**
- Produces `getBankStatus(repository): { ready: boolean; missingTypes: QuestionType[] }`.
- Produces `createRound(repository): PublicQuizQuestion[]` with no `correctAnswer` property.
- Produces `submitRound(repository, answers): QuizResult[]` with authoritative answers.
- Produces `GET /api/quiz/status`, `POST /api/quiz/round`, and `POST /api/quiz/submit`.

- [ ] **Step 1: Write failing pure-service tests using an in-memory fake repository**

```ts
const round = await createRound(fakeRepository);
assert.deepEqual(round.map((q) => q.type).sort(), ["free_text", "multiple_choice", "true_false"]);
assert.equal(round.length, 3);
assert.ok(round.every((q) => !("correctAnswer" in q)));
```

- [ ] **Step 2: Add failing API tests for authentication, missing types, malformed submissions, and no persistence calls**
- [ ] **Step 3: Run focused round tests and verify expected missing implementations**
- [ ] **Step 4: Implement status, one-random-row-per-type round assembly, and authoritative result assembly**
- [ ] **Step 5: Mount authenticated routes and return explicit `409` for an incomplete bank and `400` for malformed rounds**
- [ ] **Step 6: Run round/API tests and Worker type check; verify pass**
- [ ] **Step 7: Commit with `git commit -m "feat: add quiz round and submission APIs"`**

---

### Task 5: Quiz browser flow and functional new round

**Files:**
- Create: `src/react-app/features/quiz/types.ts`
- Create: `src/react-app/features/quiz/quiz-api.ts`
- Create: `src/react-app/features/quiz/components/QuizIntroduction.tsx`
- Create: `src/react-app/features/quiz/components/QuizQuestionCard.tsx`
- Create: `src/react-app/features/quiz/components/QuizResults.tsx`
- Create: `src/react-app/pages/QuizPage.tsx`
- Create: `tests/adapt-quiz-ui.test.ts`
- Modify: `src/react-app/App.tsx`

**Interfaces:**
- Produces typed `getQuizStatus()`, `startQuizRound()`, and `submitQuizRound(answers)` clients.
- `QuizPage` owns `intro | loading | answering | submitting | results | error` state and no persistent storage.

- [ ] **Step 1: Write failing UI contract tests for approved privacy copy, required answers, result labels, and two result actions**

```ts
assert.match(page, /Your answers are not saved in this prototype/);
assert.match(results, /Your answer/);
assert.match(results, /Reference answer \/ Evaluation guidance/);
assert.match(page, /Start a new quiz/);
```

- [ ] **Step 2: Run the focused UI test and verify missing-file failure**
- [ ] **Step 3: Implement typed clients and focused components using existing shadcn controls**
- [ ] **Step 4: Implement `QuizPage` local state; require all three answers before submit and lock them afterward**
- [ ] **Step 5: Implement new-round behavior by clearing answers/results/send state and calling `startQuizRound()` again**
- [ ] **Step 6: Add the protected `/quiz` route and run UI tests plus app type check; verify pass**
- [ ] **Step 7: Commit with `git commit -m "feat: add in-memory quiz experience"`**

---

### Task 6: Administrator pages and session-aware navigation

**Files:**
- Create: `src/react-app/features/admin/admin-questions-api.ts`
- Create: `src/react-app/features/admin/components/QuestionForm.tsx`
- Create: `src/react-app/features/admin/components/QuestionList.tsx`
- Create: `src/react-app/features/admin/components/AdminSubmissionsNotice.tsx`
- Create: `src/react-app/pages/admin/QuestionBankPage.tsx`
- Create: `src/react-app/pages/admin/AdminSubmissionsPage.tsx`
- Create: `src/react-app/components/auth/AdminRoute.tsx`
- Create: `tests/adapt-quiz-admin-ui.test.ts`
- Modify: `src/react-app/App.tsx`
- Modify: `src/react-app/components/PrimaryNavigation.tsx`

**Interfaces:**
- Produces `listQuestions()` and `createQuestion(input)` clients.
- Produces protected administrator routes and English `403` presentation.

- [ ] **Step 1: Write failing tests for add/list-only controls, absence of edit/delete/deactivate buttons, approved production notice, and mailbox guidance**
- [ ] **Step 2: Run focused administrator UI tests and verify missing components/routes**
- [ ] **Step 3: Implement the typed form with type-dependent fields and client-side convenience validation matching server rules**
- [ ] **Step 4: Implement the read-only list and mailbox notice using the approved exact copy**
- [ ] **Step 5: Implement `AdminRoute` presentation and session-aware administrator navigation; the Worker remains the authorization authority**
- [ ] **Step 6: Run administrator UI tests and app type check; verify pass**
- [ ] **Step 7: Commit with `git commit -m "feat: add quiz administrator pages"`**

---

### Task 7: Generic email adapter, safe quiz-copy template, and send endpoint

**Files:**
- Create: `tests/adapt-quiz-email.test.ts`
- Create: `src/react-app/features/quiz/components/SendQuizCopyDialog.tsx`
- Modify: `src/worker/utils/email.ts`
- Modify: `src/worker/quiz/email.ts`
- Modify: `src/worker/quiz/routes.ts`
- Modify: `src/worker/types/env.ts`
- Modify: `src/config.ts`
- Modify: `.env.example`
- Modify: `env/local.env.template`
- Modify: `env/preview.env.template`
- Modify: `env/production.env.template`
- Modify: `src/react-app/pages/QuizPage.tsx`

**Interfaces:**
- Extends `EmailSender` with `sendEmail({ to, subject, html, text }): Promise<{ messageId?: string }>` while retaining existing auth-email behavior.
- Produces `getQuizEmailReadiness(env): boolean`.
- Produces `buildQuizCopyEmail(input): { subject: string; html: string; text: string }`.
- Produces authenticated `POST /api/quiz/send-copy`.

- [ ] **Step 1: Write failing tests that prove HTML escaping, plain-text inclusion, server identity use, unavailable configuration, no provider call before confirmation, provider success, and provider failure**

```ts
const email = buildQuizCopyEmail({ user: { name: "<Admin>", email: "u@example.com" }, results, sentAt });
assert.doesNotMatch(email.html, /<Admin>/);
assert.match(email.html, /&lt;Admin&gt;/);
assert.match(email.text, /u@example\.com/);
```

- [ ] **Step 2: Run focused email tests and verify missing generic-send/template behavior**
- [ ] **Step 3: Add `config.email.fromAddress = "quiz@mail.fitoa.net"`, environment recipient typing/templates, and strict readiness that rejects blank/placeholder configuration**
- [ ] **Step 4: Extend both Resend and Cloudflare adapters with generic HTML/plain-text sending without removing verification/reset behavior**
- [ ] **Step 5: Implement escaped template construction and send route that reloads session identity and authoritative D1 questions**
- [ ] **Step 6: Implement the approved confirmation dialog, disabled unavailable state, retryable failure, and one-round success lock**
- [ ] **Step 7: Run email tests, app/Worker type checks, and existing auth-email tests; verify pass**
- [ ] **Step 8: Commit with `git commit -m "feat: send actively confirmed quiz copies"`**

---

### Task 8: Privacy, production notices, accessibility, and regression coverage

**Files:**
- Create: `tests/adapt-quiz-privacy.test.ts`
- Modify: `src/react-app/content/legal.ts`
- Modify: `src/react-app/pages/public/Pages.tsx`
- Modify: quiz and administrator components where accessibility findings require labels/status regions
- Modify: paired `project/recruit-quiz` documents only if implementation reveals a confirmed wording mismatch

**Interfaces:**
- Produces consistent Privacy copy for in-memory self-test data, active Resend transfer, administrator visibility, and production history.
- Produces accessible form labels, error summaries, dialog description, and `aria-live` send/result status.

- [ ] **Step 1: Write failing privacy and accessibility contract tests for all approved notices and form/dialog labels**
- [ ] **Step 2: Run focused privacy tests and verify current legal content lacks the project policy**
- [ ] **Step 3: Replace the neutral legal sample on this project branch with accurate aDaptQuiz privacy content while avoiding invented legal contact details**
- [ ] **Step 4: Add accessible status and labeling to changed UI components**
- [ ] **Step 5: Run privacy, legal, navigation, site-layout, and security-header tests; verify pass**
- [ ] **Step 6: Commit with `git commit -m "feat: document quiz privacy boundaries"`**

---

### Task 9: Full local verification and documentation status

**Files:**
- Modify: `project/recruit-quiz/TASKS.zh-CN.md`
- Modify: `project/recruit-quiz/TASKS.md`
- Modify: implementation files only if verification exposes a concrete defect

**Interfaces:**
- Produces a clean local branch whose implementation tasks accurately reflect verified state.

- [ ] **Step 1: Run all focused tests: `npx tsx --test tests/adapt-quiz-*.test.ts`**
- [ ] **Step 2: Run the full suite: `npx tsx --test tests/*.test.ts`**
- [ ] **Step 3: Run `npm run lint`**
- [ ] **Step 4: Run `npx tsc -p tsconfig.app.json --noEmit` and `npx tsc -p tsconfig.worker.json --noEmit`**
- [ ] **Step 5: Run `npm run build`**
- [ ] **Step 6: Run `git diff --check`, inspect `git diff HEAD^`, and verify the branch with `git status --short --branch`**
- [ ] **Step 7: Mark only locally verified task items complete in both task documents**
- [ ] **Step 8: Re-run the full suite, lint, both type checks, and build after documentation changes**
- [ ] **Step 9: Commit with `git commit -m "docs: record aDaptQuiz local verification"`**
- [ ] **Step 10: Report that GoDaddy DNS, Resend credentials, remote D1/Worker/secrets, deployment, real email delivery, and push were not performed**
