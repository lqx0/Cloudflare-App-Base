# Site Content Width Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align top-level site pages to one `max-w-6xl` boundary and rebalance the desktop Quiz hierarchy.

**Architecture:** Apply the existing header/footer container classes directly to the small set of top-level pages. Keep narrower inner regions as page-local layout choices; remove only the redundant Quiz outer card.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Node test runner.

## Global Constraints

- Outer page boundary is `mx-auto w-full max-w-6xl px-6`.
- Quiz workflow inner width is `max-w-4xl` and left-aligned within that boundary.
- Preserve all business behavior and mobile single-column flow.
- Do not redesign authentication pages, Question bank, Header, Footer, or Home.

---

### Task 1: Align page containers and simplify Quiz hierarchy

**Files:**
- Modify: `tests/adapt-quiz-interface.test.ts`
- Modify: `tests/site-layout.test.ts`
- Modify: `src/react-app/pages/QuizPage.tsx`
- Modify: `src/react-app/pages/public/Pages.tsx`
- Modify: `src/react-app/pages/admin/AdminSubmissionsPage.tsx`

**Interfaces:**
- Produces unchanged page components, routes, API calls, and form behavior.

- [ ] Add failing tests for the shared `max-w-6xl` outer boundary, Quiz `max-w-4xl` inner workflow, and absence of the redundant Quiz outer card.
- [ ] Run the focused tests and confirm expected RED failures.
- [ ] Apply minimal container-class and Quiz wrapper changes.
- [ ] Run focused tests, all tests, lint, App/Worker type checks, build, and `git diff --check`.
- [ ] Commit with `refactor: align site content widths`.
