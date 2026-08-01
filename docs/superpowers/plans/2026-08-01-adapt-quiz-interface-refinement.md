# aDaptQuiz Interface Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the Quiz and Question bank into restrained, minimalist, responsive interfaces without changing their data flow or feature scope.

**Architecture:** Keep `QuizPage` and `QuestionBankPage` as the existing state-owning containers. Presentation remains split across focused quiz and administrator components; the refinement adds only semantic layout, type labels, selection styling, count/empty states, and clearer action hierarchy. Worker APIs, D1, authorization, and email behavior remain unchanged.

**Tech Stack:** React 19, TypeScript 6, Tailwind CSS, existing shadcn/ui components, Lucide React, Node test runner through `tsx`.

## Global Constraints

- Use black, white, and neutral grays as the primary palette; reserve the existing primary color for main actions, selected answers, and small status accents.
- Keep the existing shared `SiteLayout`, English-only UI, responsive behavior, light/dark themes, and all privacy and production-version notices.
- Do not add gradients, illustrations, decorative animation, a new component library, or global state.
- Do not change Worker APIs, D1 schema, authorization, email rules, or existing Quiz state transitions.
- Do not add editing, deletion, deactivation, history, scoring, timers, AI evaluation, submissions lists, or recipient settings.
- Every implementation task follows RED → verify expected failure → GREEN → verify pass → commit.
- Do not deploy, change remote resources, send real email, or push.

---

## File Map

- `src/react-app/features/quiz/components/QuizTypeBadge.tsx`: shared compact type label and readable type names.
- `src/react-app/features/quiz/components/QuizIntroduction.tsx`: minimalist round overview and privacy notes.
- `src/react-app/features/quiz/components/QuizQuestionCard.tsx`: numbered questions and full-row answer controls.
- `src/react-app/features/quiz/components/QuizResults.tsx`: visually separated user and authoritative answers.
- `src/react-app/features/quiz/components/SendQuizCopyDialog.tsx`: secondary send action consistent with results hierarchy.
- `src/react-app/pages/QuizPage.tsx`: page header, answered progress, main panel, and action layout.
- `src/react-app/features/admin/components/QuestionTypeSelector.tsx`: accessible three-button question type selector.
- `src/react-app/features/admin/components/QuestionForm.tsx`: focused, type-dependent creation panel.
- `src/react-app/features/admin/components/QuestionList.tsx`: count, empty state, and compact question summaries.
- `src/react-app/pages/admin/QuestionBankPage.tsx`: responsive two-column administrator layout.
- `tests/adapt-quiz-interface.test.ts`: refined Quiz and Question bank presentation contracts.

---

### Task 1: Minimalist Quiz hierarchy and answer controls

**Files:**
- Create: `src/react-app/features/quiz/components/QuizTypeBadge.tsx`
- Create: `tests/adapt-quiz-interface.test.ts`
- Modify: `src/react-app/features/quiz/components/QuizIntroduction.tsx`
- Modify: `src/react-app/features/quiz/components/QuizQuestionCard.tsx`
- Modify: `src/react-app/features/quiz/components/QuizResults.tsx`
- Modify: `src/react-app/features/quiz/components/SendQuizCopyDialog.tsx`
- Modify: `src/react-app/pages/QuizPage.tsx`

**Interfaces:**
- Produces `formatQuestionType(type: QuestionType): string`.
- Produces `QuizTypeBadge({ type }: { type: QuestionType })`.
- Preserves existing `QuizIntroduction`, `QuizQuestionCard`, `QuizResults`, and `SendQuizCopyDialog` props.
- Preserves all existing `QuizPage` API calls and local state.

- [ ] **Step 1: Write failing Quiz interface tests**

Add source-contract assertions that name observable presentation behavior:

```ts
test("Quiz presents round context and answered progress", async () => {
  const page = await readFile("src/react-app/pages/QuizPage.tsx", "utf8");
  assert.match(page, /3 questions/);
  assert.match(page, /answeredCount/);
  assert.match(page, /answered/);
});

test("Quiz answer choices are full-row native radio controls", async () => {
  const card = await readFile("src/react-app/features/quiz/components/QuizQuestionCard.tsx", "utf8");
  assert.match(card, /peer\/sr-only/);
  assert.match(card, /peer-checked:border-primary/);
  assert.match(card, /Question \{String\(index \+ 1\)/);
});

test("Quiz results separate user and reference answers", async () => {
  const results = await readFile("src/react-app/features/quiz/components/QuizResults.tsx", "utf8");
  assert.match(results, /bg-muted\/40/);
  assert.match(results, /Your answer/);
  assert.match(results, /Reference answer \/ Evaluation guidance/);
});
```

- [ ] **Step 2: Run the Quiz interface tests and verify RED**

Run:

```powershell
npx.cmd tsx --test tests/adapt-quiz-interface.test.ts
```

Expected: FAIL because `QuizTypeBadge`, round context, answered progress, and full-row selected styles do not exist.

- [ ] **Step 3: Add the compact type badge**

Implement readable labels and restrained styling:

```tsx
const labels: Record<QuestionType, string> = {
  multiple_choice: "Multiple choice",
  true_false: "True / false",
  free_text: "Written response",
};

export function formatQuestionType(type: QuestionType) {
  return labels[type];
}

export function QuizTypeBadge({ type }: { type: QuestionType }) {
  return (
    <span className="inline-flex rounded-full border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
      {formatQuestionType(type)}
    </span>
  );
}
```

- [ ] **Step 4: Refine the Quiz introduction and page container**

Keep all approved copy, but organize it into a bordered main panel. In `QuizPage`, calculate progress without new state:

```tsx
const answeredCount = questions.filter((question) => answers[question.id]?.trim()).length;
```

Render a compact header containing `Self-test`, `Quiz`, and `3 questions`, followed by one `rounded-2xl border bg-card` panel. During answering, show `{answeredCount} of 3 answered` above the cards. Keep errors in a bordered destructive alert adjacent to the panel.

- [ ] **Step 5: Refine question controls and results**

Add an `index: number` prop to `QuizQuestionCard`. In `QuizResults`, use the existing map index. Render `Question {String(index + 1).padStart(2, "0")}` plus `QuizTypeBadge`. For radio questions, retain native inputs as `peer sr-only` and use full-width labels with:

```tsx
className="flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors hover:bg-muted/40 peer-checked:border-primary peer-checked:bg-primary/5"
```

Render result answers in separate `rounded-xl bg-muted/40 p-4` sections. Preserve exact answer text and `aria-live="polite"`.

- [ ] **Step 6: Refine result actions**

Keep `Start a new quiz` as the primary button and `Send a copy` as the secondary outlined action. Preserve the dialog text, confirmation, unavailable state, retry behavior, and sent lock. Do not change API calls.

- [ ] **Step 7: Run focused Quiz tests and App type check**

Run:

```powershell
npx.cmd tsx --test tests/adapt-quiz-interface.test.ts tests/adapt-quiz-ui.test.ts tests/adapt-quiz-send-ui.test.ts
npx.cmd tsc -p tsconfig.app.json --noEmit
```

Expected: all pass with zero TypeScript errors.

- [ ] **Step 8: Commit the Quiz refinement**

```powershell
git add tests/adapt-quiz-interface.test.ts src/react-app/features/quiz src/react-app/pages/QuizPage.tsx
git commit -m "feat: refine minimalist quiz interface"
```

---

### Task 2: Minimalist Question bank workspace

**Files:**
- Create: `src/react-app/features/admin/components/QuestionTypeSelector.tsx`
- Modify: `tests/adapt-quiz-interface.test.ts`
- Modify: `src/react-app/features/admin/components/QuestionForm.tsx`
- Modify: `src/react-app/features/admin/components/QuestionList.tsx`
- Modify: `src/react-app/pages/admin/QuestionBankPage.tsx`

**Interfaces:**
- Produces `QuestionTypeSelector({ value, onChange, disabled? })` using `AdminQuestionInput["type"]`.
- Preserves `QuestionForm({ onCreated })` and `QuestionList({ questions })` public props.
- Preserves existing `listQuestions()` and `createQuestion(input)` calls.

- [ ] **Step 1: Add failing Question bank interface tests**

```ts
test("Question bank uses a responsive creation and list workspace", async () => {
  const page = await readFile("src/react-app/pages/admin/QuestionBankPage.tsx", "utf8");
  assert.match(page, /lg:grid-cols-\[minmax\(0,0\.85fr\)_minmax\(0,1\.15fr\)\]/);
  assert.match(page, /Create question/);
});

test("Question form exposes three accessible type selectors", async () => {
  const selector = await readFile("src/react-app/features/admin/components/QuestionTypeSelector.tsx", "utf8");
  assert.match(selector, /role="radiogroup"/);
  assert.match(selector, /aria-checked/);
  assert.match(selector, /Multiple choice/);
  assert.match(selector, /Written response/);
});

test("Question list shows count and an explicit empty state", async () => {
  const list = await readFile("src/react-app/features/admin/components/QuestionList.tsx", "utf8");
  assert.match(list, /questions\.length/);
  assert.match(list, /No questions yet/);
  assert.match(list, /Add your first question/);
});
```

- [ ] **Step 2: Run the Question bank tests and verify RED**

Run:

```powershell
npx.cmd tsx --test tests/adapt-quiz-interface.test.ts
```

Expected: FAIL because the two-column layout, type selector, count, and empty state do not exist.

- [ ] **Step 3: Implement the accessible question type selector**

Create three native buttons inside a `role="radiogroup"`. Each button uses `role="radio"`, `aria-checked={value === type}`, and this restrained selected state:

```tsx
className={cn(
  "rounded-lg border px-3 py-2 text-left text-sm transition-colors",
  value === type ? "border-primary bg-primary/5 text-foreground" : "text-muted-foreground hover:bg-muted/40",
)}
```

Button clicks call `onChange(type)`. Keep all labels in English.

- [ ] **Step 4: Refine the creation form**

Wrap the form in a clean panel with title `Create question` and concise helper text. Use `QuestionTypeSelector`, associated labels, consistent vertical spacing, and type-dependent fields. For multiple choice, show `Enter one option per line.` For written response, show `Provide a reference answer or evaluation guidance; this prototype does not score written responses.` Preserve server validation and display errors with `role="alert"`.

- [ ] **Step 5: Refine the question list**

Show `{questions.length} questions` beside `Question bank`. When empty, render:

```tsx
<div className="rounded-xl border border-dashed p-8 text-center">
  <p className="font-medium">No questions yet</p>
  <p className="mt-1 text-sm text-muted-foreground">Add your first question with the form.</p>
</div>
```

For each question, show `QuizTypeBadge`, prompt, multiple-choice options when present, and a quiet correct/reference answer summary. Do not add edit, delete, or deactivate controls.

- [ ] **Step 6: Add the responsive workspace**

In `QuestionBankPage`, retain loading and error behavior and render:

```tsx
<div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
  <QuestionForm ... />
  <QuestionList questions={questions} />
</div>
```

Use a single-column layout below `lg`; do not add horizontal scrolling.

- [ ] **Step 7: Run administrator UI tests and App type check**

Run:

```powershell
npx.cmd tsx --test tests/adapt-quiz-interface.test.ts tests/adapt-quiz-admin-ui.test.ts
npx.cmd tsc -p tsconfig.app.json --noEmit
```

Expected: all pass with no edit/delete/deactivate controls and zero TypeScript errors.

- [ ] **Step 8: Commit the Question bank refinement**

```powershell
git add tests/adapt-quiz-interface.test.ts src/react-app/features/admin src/react-app/pages/admin/QuestionBankPage.tsx
git commit -m "feat: refine minimalist question bank"
```

---

### Task 3: Responsive visual QA and full regression verification

**Files:**
- Modify: Quiz or administrator presentation files only if visual inspection exposes a concrete defect.
- Test: `tests/adapt-quiz-interface.test.ts`

**Interfaces:**
- Produces a visually verified desktop and narrow-screen implementation.
- Does not change application behavior or public APIs.

- [ ] **Step 1: Run the complete automated verification gate**

```powershell
npx.cmd tsx --test tests/adapt-quiz-*.test.ts
npx.cmd tsx --test tests/*.test.ts
npm run lint
npx.cmd tsc -p tsconfig.app.json --noEmit
npx.cmd tsc -p tsconfig.worker.json --noEmit
npm run build
git diff --check
```

Expected: all commands exit `0`; Wrangler log-file EPERM is acceptable only when Build exits `0` and both Worker/client artifacts are generated.

- [ ] **Step 2: Inspect the running desktop pages**

Use the local single Vite + Hono server at `http://127.0.0.1:5173`. Inspect `/quiz` and `/admin/questions` at approximately 1440×900. Verify:

- one primary panel and clear action hierarchy on Quiz;
- full-width answer rows and visible selected state;
- clear separation between user and reference answers;
- stable two-column Question bank layout;
- no unapproved edit/delete/deactivate controls.

- [ ] **Step 3: Inspect narrow responsive pages**

Inspect both routes at approximately 390×844. Verify:

- no horizontal scroll;
- answer rows and buttons remain easy to tap;
- Question bank sections stack in creation-then-list order;
- labels, helper text, alerts, and production notices remain readable.

- [ ] **Step 4: Fix only evidenced visual defects using RED → GREEN**

For each defect, add one assertion to `tests/adapt-quiz-interface.test.ts` that would fail if the defect returns, run it to confirm RED, apply the smallest class/markup correction, and rerun the focused test to confirm GREEN.

- [ ] **Step 5: Re-run the final gate after visual corrections**

```powershell
npx.cmd tsx --test tests/*.test.ts
npm run lint
npx.cmd tsc -p tsconfig.app.json --noEmit
npx.cmd tsc -p tsconfig.worker.json --noEmit
npm run build
git diff --check
git status --short --branch
```

- [ ] **Step 6: Commit final evidenced corrections, if any**

If Step 4 changed files:

```powershell
git add tests/adapt-quiz-interface.test.ts src/react-app
git commit -m "fix: polish responsive quiz interfaces"
```

If Step 4 required no changes, do not create an empty commit.
