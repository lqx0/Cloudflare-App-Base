# Written Answer Textarea Design

## Goal

Give written-response reference answers enough space for longer content.

## Design

- Change only the `free_text` reference-answer field from `Input` to the existing shared `Textarea`.
- Give it a default minimum height of `min-h-32`; normal textarea resizing remains available.
- Preserve the field label, helper text, required validation, state, submitted value, and API payload.
- Do not change multiple-choice or true/false fields.

## Verification

Add a focused regression test, verify RED, implement the minimal conditional field change, and run full project gates.
