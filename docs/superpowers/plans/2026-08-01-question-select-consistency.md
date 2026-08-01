# Question Select Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace question-form select controls with the shared shadcn Select implementation.

**Architecture:** Keep `QuestionTypeSelector` as the form-facing adapter around the shared Select. Use the same shared primitives directly for the conditional true/false correct-answer field, without changing state or API contracts.

**Tech Stack:** React 19, TypeScript, Radix Select through shadcn/ui, Node test runner.

## Global Constraints

- UI remains English.
- Existing question types and stored values remain unchanged.
- Do not change APIs, validation rules, database behavior, or shadcn internals.

---

### Task 1: Use shared Select controls in the question form

**Files:**
- Modify: `tests/adapt-quiz-interface.test.ts`
- Modify: `src/react-app/features/admin/components/QuestionTypeSelector.tsx`
- Modify: `src/react-app/features/admin/components/QuestionForm.tsx`

**Interfaces:**
- Consumes: shared `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, and `SelectItem` components.
- Produces: unchanged `QuestionTypeSelector({ value, onChange, disabled })` and `QuestionForm({ onCreated })` interfaces.

- [ ] **Step 1: Write failing focused tests**

Assert the type selector imports and renders shared Select primitives, exposes all three values, and the true/false answer field no longer renders a native select.

- [ ] **Step 2: Verify RED**

Run `npx.cmd tsx --test tests/adapt-quiz-interface.test.ts`; expect failure because the card radios and native select remain.

- [ ] **Step 3: Implement the minimal shared Select adapters**

Wire `onValueChange` to the existing typed state setters, preserve labels and disabled behavior, and remove only the obsolete radio keyboard code.

- [ ] **Step 4: Verify GREEN and all gates**

Run focused tests, all tests, lint, App/Worker type checks, build, and `git diff --check`.

- [ ] **Step 5: Commit**

Commit with `refactor: unify question select controls`.
