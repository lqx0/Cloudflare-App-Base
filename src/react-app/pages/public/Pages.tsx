import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  draftLegalNotice,
  privacySections,
  termsSections,
} from "@/content/legal";
import { Button } from "@/components/ui/button";

function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <div className="mt-6 max-w-2xl space-y-4 text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function LegalSample({ sections }: { sections: typeof privacySections }) {
  return (
    <>
      <p className="rounded-md border border-amber-400/50 bg-amber-50 px-4 py-3 text-sm text-foreground dark:bg-amber-950/30">
        {draftLegalNotice}
      </p>
      {sections.map(({ title, body }) => (
        <section key={title}>
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <p>{body}</p>
        </section>
      ))}
    </>
  );
}

export function PublicHome() {
  return (
    <Page title="A reusable Cloudflare application foundation.">
      <p className="text-sm font-medium text-primary">Cloudflare-App-Base</p>
      <p className="text-lg">
        Start new full-stack projects with authentication, D1, email adapters,
        environment tooling, and a tested shared layout already in place.
      </p>
      <div className="flex gap-3 pt-2">
        <Button asChild>
          <Link to="/services">Explore capabilities</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/about">About the base</Link>
        </Button>
      </div>
      <section className="mt-12 max-w-2xl rounded-xl border border-primary/30 bg-primary/5 p-6 text-sm text-muted-foreground shadow-sm">
        <p className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">REUSABLE FOUNDATION</p>
        <h2 className="mt-3 text-2xl font-semibold text-foreground">Build project requirements on a stable base</h2>
        <p className="mt-3">Create a <strong className="font-semibold text-foreground">project/&lt;name&gt;</strong> branch for client branding, business pages, data models, privacy rules, and isolated Cloudflare resources.</p>
        <p className="mt-3">Keep reusable security, authentication, database, email, CLI, testing, and deployment-readiness improvements on <strong className="font-semibold text-foreground">main</strong>.</p>
      </section>
    </Page>
  );
}

export function About() {
  return (
    <Page title="About">
      <p>
        Cloudflare-App-Base is a reusable starting point. Each project branch
        supplies its own confirmed identity, scope, data policy, and resources.
      </p>
    </Page>
  );
}

export function Services() {
  return (
    <Page title="Services">
      <p>
        The base provides authentication, account pages, D1 integration, email
        adapters, environment tooling, CLI administration, and quality checks.
      </p>
    </Page>
  );
}

export function Contact() {
  return (
    <Page title="Contact">
      <p>
        This base does not publish client contact details. Each project branch
        must provide its own verified contact information before delivery.
      </p>
    </Page>
  );
}

export function Privacy() {
  return (
    <Page title="Privacy">
      <LegalSample sections={privacySections} />
    </Page>
  );
}

export function Terms() {
  return (
    <Page title="Terms">
      <LegalSample sections={termsSections} />
    </Page>
  );
}

export function NotFound() {
  return (
    <Page title="Page not found">
      <p>The page you requested does not exist.</p>
      <Button asChild>
        <Link to="/">Return home</Link>
      </Button>
    </Page>
  );
}
