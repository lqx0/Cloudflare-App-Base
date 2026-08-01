# Site Content Width Design

## Goal

Give the site one consistent desktop content boundary while preserving comfortable widths for each page's actual content.

## Layout Rule

- Top-level page containers align with the header and footer using `mx-auto w-full max-w-6xl px-6`.
- Page-specific inner regions may remain narrower for readability but align to the shared left edge rather than creating a separate centered page boundary.
- Existing responsive behavior remains single-column on small screens.

## Quiz

- Use the shared `max-w-6xl` outer page boundary.
- Keep the quiz workflow at `max-w-4xl` for readable prompts and answers.
- Remove the single outer card that wraps all quiz states.
- Keep individual question/result cards and existing answer behavior.
- Preserve introduction, errors, progress, submit, new-round, and send-copy flows.

## Other Pages

- Align public information pages and Submitted copies to the shared outer boundary while retaining their narrower text regions.
- Question bank, Home, Header, and Footer already use the shared boundary and should not be visually redesigned.
- Authentication cards retain their purpose-specific widths.

## Verification

Use TDD for shared outer-boundary and Quiz hierarchy expectations, then run all existing checks and confirm desktop/mobile-safe class behavior.
