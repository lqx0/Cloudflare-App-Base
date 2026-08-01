# Written Answer Textarea Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Use a larger textarea only for written-response reference answers.

**Architecture:** Keep the existing conditional field rendering in `QuestionForm`; split the non-true/false branch so `free_text` renders the shared `Textarea` and multiple choice continues rendering `Input`.

**Tech Stack:** React 19, TypeScript, shadcn/ui, Tailwind CSS, Node test runner.

## Global Constraints

- Change only the written-response answer field.
- Preserve validation, state, API payloads, and English copy.
- Do not change multiple-choice or true/false controls.

---

### Task 1: Enlarge the written-response answer field

**Files:**
- Modify: `tests/adapt-quiz-interface.test.ts`
- Modify: `src/react-app/features/admin/components/QuestionForm.tsx`

**Interfaces:**
- Consumes: existing `Textarea`, `correctAnswer`, and `setCorrect`.
- Produces: unchanged `QuestionForm({ onCreated })` interface and request payload.

- [ ] Write a failing test that requires a `free_text` Textarea with `min-h-32` while retaining the multiple-choice Input.
- [ ] Run `npx.cmd tsx --test tests/adapt-quiz-interface.test.ts` and confirm the expected RED failure.
- [ ] Implement the minimal conditional rendering change.
- [ ] Run focused tests, all tests, lint, App/Worker type checks, build, and `git diff --check`.
- [ ] Commit with `refactor: enlarge written answer field`.
