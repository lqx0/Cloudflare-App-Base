# Security Quality Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` task by task.

**Goal:** Add environment-aware response headers and complete local security-quality checks.

**Architecture:** Worker middleware owns response headers; focused tests assert policy behavior. Review findings are documented without remote changes.

**Tech Stack:** Hono, TypeScript, Node `tsx --test`, npm audit.

## Global Constraints

- No remote configuration, deployment, or secrets exposure.
- Development CSP permits Vite WebSocket; production CSP is same-origin by default.
- Each verified task is committed locally before the next task.

### Task 1: Security headers

**Files:** Create `src/worker/middleware/security.ts`; modify `src/worker/index.ts`; create `tests/security-headers.test.ts`.

- [ ] Write a failing test for `buildSecurityHeaders("local")` and `buildSecurityHeaders("production")`.
- [ ] Run `npx tsx --test tests/security-headers.test.ts` and confirm module-not-found failure.
- [ ] Implement `buildSecurityHeaders(environment)` returning CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and Permissions-Policy values; mount as Hono middleware.
- [ ] Run focused test and lint; commit `feat: add security response headers`.

### Task 2: Review and verification

**Files:** Modify `TASKS.md`, `TASKS.zh-CN.md`, `README.md`, `README.zh-CN.md`.

- [ ] Run `npm audit`, inspect tracked environment files and CLI/auth logging, and record factual local findings.
- [ ] Add concise security-review notes and mark Milestone 6 items only when evidenced.
- [ ] Run all tests, lint, build, local header check, and `git diff --check`; commit `docs: record security quality review`.
