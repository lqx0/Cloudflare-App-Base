# Cloudflare-App-Base Tasks

Status: `[ ]` not started, `[-]` in progress, `[x]` completed, `[!]` blocked.

## Foundation established

- [x] Verify the React/Vite + Hono single-server architecture.
- [x] Verify Better Auth email/password, sessions, and protected account pages.
- [x] Preserve Google OAuth, verification-link, and password-reset capability.
- [x] Verify D1, migration, backup, restore, seed, time-travel, and CLI tooling.
- [x] Establish local, preview, and production configuration.
- [x] Establish a shared site layout, basic SEO, security headers, and focused tests.

## Cloudflare-App-Base positioning

- [x] Preserve the former Cloudflare-Ankit snapshot on `archive/cloudflare-ankit-20260801`.
- [x] Safely fast-forward local `main` to `origin/main`.
- [x] Define the reusable foundation's purpose, vision, and principles.
- [x] Define responsibilities for `main`, `project/<name>`, and `archive/<name>-<date>`.
- [x] Convert README, SPEC, ARCHITECTURE, and TASKS into neutral base documentation.
- [x] Rename the local application and package identity to Cloudflare-App-Base.
- [x] Establish an independent `cloudflare-app-base` Preview Worker and D1 while leaving the legacy Worker/D1 unchanged.
- [x] Run tests, lint, and build, review the diff, then commit and push.

## Future base tasks

- [x] Rename the GitHub repository to `Cloudflare-App-Base`.
- [ ] Provide a checklist or script for creating a project from `main`.
- [ ] Replace public demonstration pages with fully neutral base examples.
- [ ] Document remote-resource renaming and isolation for project branches.
- [ ] Define the process for moving mature projects into independent repositories.
- [ ] Configure the legacy Worker deployment for the `legacy/cloudflare-ankit` branch.

## Required for every project branch

- [ ] Create project vision, specification, architecture, tasks, and implementation plan.
- [ ] Replace branding, domain, legal content, and contact details.
- [ ] Define business data, privacy, retention, roles, and authorization.
- [ ] Define Worker, D1, secret, OAuth, DNS, and email resources.
- [ ] Validate locally before requesting authorization for specific remote operations.
