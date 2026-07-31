# Cloudflare-App-Base Vision

## Purpose

Cloudflare-App-Base is a reusable foundation for full-stack applications on Cloudflare. It centralizes the engineering capabilities that new projects repeatedly need so project work starts from a reliable baseline instead of rebuilding authentication, data, email, environment, and deployment tooling.

## Vision

Future applications running on Cloudflare can branch from the stable `main` baseline, add their own business requirements, and continue to inherit verified security, quality, and operational capabilities.

## Main branch responsibilities

`main` contains only reusable capabilities:

- React, TypeScript, Vite, Tailwind CSS, and shadcn/ui;
- Hono on Cloudflare Workers;
- Cloudflare D1, Kysely, and migration tooling;
- Better Auth email/password authentication, Google OAuth capability, and protected routes;
- email provider adapters;
- local, preview, and production environment tooling;
- database backup, restore, seed, time travel, and CLI administration;
- tests, lint, builds, security baselines, and paired English/Chinese documentation rules.

`main` does not contain a specific client's branding, domain, business copy, data model, or delivery promises.

## Branch strategy

- `main`: stable reusable foundation.
- `project/<name>`: requirements and implementation for a specific project.
- `archive/<name>-<date>`: historical snapshots that must remain available.

Every project branch must document its own scope, data policy, remote resources, and acceptance criteria. A mature project intended for independent delivery should move to its own repository to avoid long-lived branch divergence and mixed access controls.

## Principles

1. Preserve verified starter capabilities by default.
2. Return reusable improvements to `main`; keep client-specific changes in project branches.
3. Do not invent client identity, domains, legal copy, or product facts on the base branch.
4. Remote deployments, secrets, databases, DNS, OAuth, email, paid resources, and destructive operations require separate authorization.
5. Base changes require focused tests and reproducible verification.
