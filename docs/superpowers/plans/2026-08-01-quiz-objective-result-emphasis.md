# Objective Quiz Result Emphasis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add restrained correct/incorrect visual emphasis to objective quiz results.

**Architecture:** Keep result classification local to `QuizResults`. Derive whether an objective answer is correct from the returned authoritative result and select neutral, red, or green Tailwind classes without changing APIs or persistence.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Node test runner.

## Global Constraints

- UI copy remains English.
- Only multiple-choice and true/false answers receive automatic correctness styling.
- Written responses remain neutral.
- No animation, scoring, persistence, or API changes.

---

### Task 1: Emphasize objective result correctness

**Files:**
- Modify: `tests/adapt-quiz-interface.test.ts`
- Modify: `src/react-app/features/quiz/components/QuizResults.tsx`

**Interfaces:**
- Consumes: `QuizResult` with `type`, `userAnswer`, and `correctAnswer`.
- Produces: Existing `QuizResults({ results }: { results: QuizResult[] })` with state-dependent presentation.

- [ ] **Step 1: Write the failing test**

Assert that `QuizResults.tsx` distinguishes objective answers, contains restrained destructive and green success classes, and preserves neutral written-response behavior.

- [ ] **Step 2: Run the focused test to verify RED**

Run: `npx.cmd tsx --test tests/adapt-quiz-interface.test.ts`

Expected: FAIL because objective correctness styling is absent.

- [ ] **Step 3: Write the minimal implementation**

Normalize answer strings, classify objective results, and apply `border-destructive/40 bg-destructive/5` or `border-emerald-500/40 bg-emerald-500/10` to the two existing answer blocks.

- [ ] **Step 4: Verify GREEN and regression gates**

Run the focused test, complete test suite, lint, App/Worker type checks, build, and `git diff --check`.

- [ ] **Step 5: Commit**

Commit the implementation and tests with `feat: emphasize objective quiz results`.
