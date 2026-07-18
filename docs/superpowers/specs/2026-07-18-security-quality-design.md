# Milestone 6: Security and quality design

## Purpose

Complete a verifiable security and quality baseline review for the current local Cloudflare-Ankit application without deployment or remote changes.

## Security response headers

- Add a security-header middleware in the Worker.
- Production CSP uses a same-origin default policy, blocks object embedding, and constrains frame, form, and base URLs.
- Local-development CSP allows the `ws:` and `wss:` connections required by Vite hot reload.
- Do not pre-authorize unconfigured Google, email, or third-party domains; extend the allowlist only when confirmed.

## Review scope

- Retain generalized authentication errors and constant-time CLI API-key comparison; do not log keys, passwords, sessions, or emails.
- Check that `.gitignore` and environment files are untracked; run a dependency vulnerability check and report results accurately.
- Add focused tests for security headers and protected CLI rejection behavior.
- Check public-page semantic headings, keyboard-reachable links, and narrow-screen layout without unrelated UI refactoring.

## Limits and verification

- Do not change Cloudflare, D1, DNS, OAuth, email, or remote repositories.
- Run tests, lint, build, `npm audit`, and local HTTP header checks.
- Commit each independently verified task locally.
