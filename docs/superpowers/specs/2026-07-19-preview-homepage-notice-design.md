# Preview homepage notice

## Goal

Set a clear expectation for friends using the Preview site: it is a test environment, and features or data may change or be reset.

## Scope

- Add one English notice above the existing homepage welcome message.
- Use this exact text: `Preview environment — shared for friends to test. Features and data may change or be reset during testing.`
- Keep the existing centered homepage layout and visual style.

## Non-goals

- No automated data deletion or reset process.
- No legal-policy replacement, customer-support workflow, account changes, or remote configuration.
- No claim that all data or backups will be deleted.

## Verification

- Add a focused test that asserts the homepage includes the agreed Preview notice.
- Run the focused test, the full test suite, lint, and build after implementation.
