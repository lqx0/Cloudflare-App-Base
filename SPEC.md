# Cloudflare-App-Base Product Specification

## 1. Purpose

This document defines the reusable `main` baseline, not a specific client product. Each business application must define its own specification on a `project/<name>` branch.

## 2. Required capabilities

1. A React/Vite single-page application and Hono Worker running on the same origin.
2. Better Auth email/password registration, sign-in, sessions, and protected routes.
3. Google OAuth integration capability, enabled only when a project supplies valid credentials.
4. D1, Kysely, migrations, and local data tooling.
5. Conditional email providers, verification links, and password-reset capability.
6. Local, preview, and production configuration with deployment readiness.
7. Database backup, restore, seed, time travel, and authentication CLI tooling.
8. A responsive shared layout, themes, basic error pages, and accessibility foundations.
9. Focused tests, lint, builds, type checks, and security headers.
10. Paired English and Chinese documentation.

## 3. Base data

The main branch maintains only the starter account models: users, accounts, sessions, and verification data. Email is the unique account identity. Do not add product, order, payment, address, recruitment, quiz, or other business models to `main`.

## 4. Project branch responsibilities

Every `project/<name>` must define its own branding and domain, user roles, business pages, business data, privacy and retention policy, email purposes, remote resource names, acceptance criteria, and future-feature notices.

## 5. Security and authorization

The base repository must not track secrets. Remote Workers/D1, migrations, secrets, OAuth, DNS, email, paid resources, and deletion require explicit authorization for the target environment. Preserving tooling is not permission to execute it.

## 6. Non-goals

The main branch does not provide client copy, final legal text, a generic admin generator, a multi-tenant platform, e-commerce, or speculative abstractions for every future project.

## 7. Acceptance

Main-branch changes must keep paired documents aligned, pass focused and full tests, lint, and build, and report the Git branch, commit, push, and any remote operations that were not executed.
