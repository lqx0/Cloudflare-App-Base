# aDaptQuiz Quiz and Question Bank Interface Refinement

## Status

Approved design direction: restrained minimalist cards. This document refines presentation only; it does not change product behavior, data, authorization, or privacy boundaries.

## Goals

- Make the Quiz flow easier to scan from introduction through answering and results.
- Make question creation and question-bank review efficient without looking visually dense.
- Keep the existing shared `SiteLayout`, responsive behavior, English-only UI, and monochrome-first visual language.
- Preserve all current features, production-version notices, and accessibility contracts.

## Visual language

- Use black, white, and neutral grays as the primary palette.
- Reserve the existing primary color for the main action, selected answers, and small status accents.
- Use restrained borders, modest radii, and little or no shadow.
- Rely on spacing, typography, and dividers rather than gradients, illustrations, or decorative animation.
- Keep content widths comfortable on desktop and fully usable on mobile.

## Quiz interface

### Page structure

- Add a compact page header with `Quiz`, a short supporting line, and current round context such as `3 questions`.
- Present introduction, answering, and results as one clear primary panel instead of unrelated text blocks.
- Keep error, loading, incomplete-bank, and email-unavailable states visually close to the action they affect.

### Introduction

- Group the three-question format, in-memory privacy notice, and production-history notice into a concise overview.
- Use three small question-type labels to explain the round composition.
- Make `Start quiz` the single dominant action.

### Answering

- Number questions `01`, `02`, and `03` and show a compact type label.
- Make multiple-choice and true/false options full-width selectable rows with a clear selected state.
- Keep the written-response input spacious and visibly associated with its prompt.
- Show a simple answered-question indicator and place `Submit answers` at the end of the panel.
- Preserve the existing rule that all three answers are required and answers lock after submission.

### Results

- Retain the question number and type label for orientation.
- Separate `Your answer` from `Correct answer` or `Reference answer / Evaluation guidance` using two quiet neutral sections.
- Keep `Start a new quiz` prominent and `Send a copy` secondary.
- Preserve active confirmation, unavailable configuration, retry, and one-round send-lock behavior.

## Question bank interface

### Page structure

- Use a two-column desktop layout: question creation on the left and the existing bank on the right.
- Stack the same sections vertically on smaller screens.
- Keep the page header compact and show a question count near the bank title.

### Question form

- Place the form in a restrained bordered panel.
- Replace the native question-type dropdown with three compact, keyboard-accessible type selectors.
- Show only fields relevant to the selected type.
- Add concise helper text for option entry and reference guidance.
- Keep validation errors close to the form and make `Add question` the only primary form action.
- Clear appropriate fields after successful creation while retaining a sensible selected type.

### Question list

- Display each question as a compact bordered row/card with type label, prompt, and relevant answer summary.
- Show multiple-choice options without adding edit controls.
- Provide an explicit empty state explaining that questions added with the form will appear here.
- Retain the approved production-version notice for editing, deletion, and availability controls.

## Accessibility and responsive behavior

- Preserve semantic `fieldset`, `legend`, labels, live regions, alerts, and dialog description.
- Selected option rows must remain usable by keyboard and expose native radio semantics.
- Text and borders must maintain readable contrast in both light and dark themes.
- The two-column question-bank layout collapses without horizontal scrolling.
- Primary actions remain easy to reach and do not depend on hover-only information.

## Scope boundaries

This refinement does not add question editing, deletion, deactivation, quiz history, scoring, timers, AI evaluation, an in-app submission list, or recipient settings. It does not change Worker APIs, D1 schema, email delivery rules, or administrator authorization.

## Verification

- Add failure-first UI contract tests for the refined hierarchy, question type controls, selectable option rows, result separation, question count, and empty state.
- Run all aDaptQuiz focused tests and the complete test suite.
- Run ESLint, App and Worker TypeScript checks, production build, and `git diff --check`.
- Inspect the running local pages at desktop and narrow viewport widths before completion.
