# Question Select Consistency Design

## Goal

Make question-type selection scalable while keeping every select control in the question form visually and behaviorally consistent.

## Design

- Replace the three-card `QuestionTypeSelector` with the repository's existing shadcn `Select` components.
- Keep the same `value`, `onChange`, and optional `disabled` interface.
- Keep the existing three values and English labels; do not add question types.
- Replace the true/false correct-answer native select with the same shadcn `Select` components.
- Preserve default values, conditional fields, validation, API payloads, and database behavior.
- Do not modify shadcn component internals.

## Verification

Use TDD to verify both fields consume the shared Select components, then run focused and full project checks.
