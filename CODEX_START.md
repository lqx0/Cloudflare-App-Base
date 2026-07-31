# Codex Start Instruction

Use this after creating your own project repository from:

```text
https://github.com/lqx0/cloudflare-fullstack-starter
```

Do not work directly in the upstream starter repository unless it is intentionally the project repository.

## Prompt for Codex

You are starting Cloudflare-App-Base or one of its project branches.

Read these files first:

1. `AGENTS.zh-CN.md`
2. `AGENTS.md`
3. `SPEC.zh-CN.md`
4. `SPEC.md`
5. `ARCHITECTURE.zh-CN.md`
6. `ARCHITECTURE.md`
7. `TASKS.zh-CN.md`
8. `TASKS.md`
9. `README.zh-CN.md`
10. `README.md`
11. The starter's original setup, README, and agent documentation

Rules:

- Preserve the starter's working behavior unless there is a major conflict, security/privacy issue, delivery blocker, or explicit instruction.
- Do not remove remote features merely because you may not execute them yet.
- This first session is local-only.
- Do not deploy or modify remote Cloudflare resources.
- Do not run preview/production migrations or sync remote secrets.
- Do not create Google OAuth credentials.
- Do not modify GoDaddy or Cloudflare DNS.
- Do not configure domain email.
- Do not create paid resources.
- Do not implement Phase 2 or e-commerce.
- Maintain English and Chinese document pairs together.
- Confirm decisions in Chinese meaning first, then synchronize English.

Complete only Milestone 0 and Milestone 1.

Before modifying code:

1. Print the repository tree, excluding dependencies and build output.
2. Show Git status, active branch, and remotes.
3. Determine whether this is a clean starter, template-generated repository, or modified repository.
4. Read package scripts, Node requirement, lockfile, Cloudflare config, migrations, Better Auth, email adapter, CLI, and existing documents.
5. Identify differences between the repository and project documents.
6. Merge carefully; do not overwrite blindly.

Allowed local work:

- Install dependencies
- Review and run local initialization
- Create local-only environment files and secrets
- Apply local D1 migrations
- Start the local app
- Verify email/password registration, login, logout, protected routes, and profile editing
- Confirm Google OAuth is optional without credentials
- Confirm email verification is conditional on email-provider configuration
- Run `npm run lint`, `npm run build`, and `npm run check`
- Update paired documents with verified facts

Stop after Milestone 1 and report:

- Repository condition
- Files read and changed
- Starter features confirmed
- Package manager and Node version
- Commands run
- Migration, dev server, authentication, lint, build, and check results
- Confirmation that no remote operation occurred
- Conflicts or deviations
- Next incomplete task

Do not continue until explicitly instructed.
