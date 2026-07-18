# Cloudflare-Ankit Authentication Adaptation Plan

> English synchronization of `2026-07-18-auth-adaptation.zh-CN.md`; Chinese is the semantic review source.

**Goal:** Complete Milestone 3 while preserving Starter authentication and operations.

## Constraints

- Do not create Google OAuth credentials, deploy, or change remote resources.
- The frontend obtains authentication capability state only through an HTTP API; it never accesses D1.
- Hide ordinary user account deletion UI while retaining `/api/profile` and CLI deletion.

## Tasks

1. Add a read-only authentication-capabilities API that reports whether Google sign-in is enabled by valid credentials; conditionally render Google UI from it.
2. Remove ordinary user deletion UI and state from Profile while retaining Worker and CLI deletion code.
3. Return generic client authentication errors and log details only in the Worker.
4. Add focused capability/auth-route tests and run local auth regression, lint, build, and check.
5. Synchronize the bilingual TASKS files and mark only verified Milestone 3 items complete.
