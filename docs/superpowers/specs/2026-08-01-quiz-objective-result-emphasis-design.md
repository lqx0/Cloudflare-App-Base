# Objective Quiz Result Emphasis Design

## Goal

Make incorrect objective-question results immediately noticeable without making the result screen visually busy.

## Design

- Applies only to multiple-choice and true/false results.
- Compare trimmed, case-normalized user and correct answers.
- A wrong user answer uses a restrained red border/background and keeps the label `Your answer`.
- The correct answer uses a restrained green border/background and keeps the label `Correct answer`.
- A correct user answer uses the restrained green treatment; the duplicate reference block remains available for clarity.
- Written-response results remain neutral because they provide evaluation guidance rather than automatic scoring.
- No animation, modal, icon system, scoring, or persistence changes.

## Verification

Add a focused regression test for the objective-result state classes and run the complete existing test suite, lint, type checks, build, and diff check.
