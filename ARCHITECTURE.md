# Cloudflare-App-Base Architecture

## 1. High-level design

```text
Browser
  |
  v
Cloudflare Worker + Static Assets
  |-- React/Vite frontend
  |-- Hono /api/*
        |-- Better Auth
        |-- Auth middleware
        |-- Kysely
        |-- D1
        `-- Optional email adapter
```

Frontend and backend use one development server and same-origin deployment. Frontend code must not access D1 directly; all database access goes through Worker APIs.

## 2. Reusable boundaries

- `src/react-app`: shared layout, authentication UI, account pages, and replaceable public pages.
- `src/worker`: Hono, Better Auth, APIs, database, and email integration.
- `migrations`: reusable account migrations; business migrations belong to project branches.
- `bin` and `src/cli`: environment, database, and user administration tooling.
- `tests`: behavior, configuration, security, and documentation contracts.

## 3. Extension rules

Project branches should reuse existing modules and interfaces. Extract routes, services, repositories, or features only when real complexity requires it. Do not prebuild speculative business abstractions on `main`.

Reusable fixes may return to `main`; changes containing client names, domains, business tables, page copy, or project-specific deployment resources remain in the project branch.

## 4. Environment boundaries

Preserve local, preview, and production environments. Local must not connect to remote resources by default. Worker, D1, secret, OAuth, DNS, and email configuration must use project-owned names and require explicit target-environment authorization before modification.

Legacy remote resource identifiers in `wrangler.toml` remain temporarily to prevent a documentation rename from accidentally modifying deployed resources. A new project must define its migration plan on its own branch.

## 5. Documentation and branches

`main` maintains the base vision, specification, architecture, and tasks. `project/<name>` maintains business specifications and implementation plans. `archive/<name>-<date>` preserves historical snapshots and is not an active development branch.
