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
    <section className="mx-auto max-w-4xl px-6 py-24">
      <p className="text-sm font-medium text-primary">Cloudflare-Ankit</p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight">
        A simple, secure starting point.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        This provisional site will evolve with confirmed client requirements.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link to="/services">Explore services</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/contact">Contact</Link>
        </Button>
      </div>
      <section className="mt-12 max-w-2xl rounded-xl border border-primary/30 bg-primary/5 p-6 text-sm text-muted-foreground shadow-sm">
        <p className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">PROJECT DEMONSTRATION</p>
        <h2 className="mt-3 text-2xl font-semibold text-foreground">Built for Ankit Kumar</h2>
        <p className="mt-3">A <strong className="font-semibold text-foreground">website-development demonstration</strong> covering <strong className="font-semibold text-foreground">Cloudflare hosting</strong>, <strong className="font-semibold text-foreground">SEO tagging</strong>, <strong className="font-semibold text-foreground">account signup</strong>, domain-email preparation, and future content expansion.</p>
        <p className="mt-3"><strong className="font-semibold text-foreground">Cloudflare-Ankit</strong> means a Cloudflare-deployable website developed for Ankit Kumar. <strong className="font-semibold text-foreground">Developer:</strong> Tom Lin · <a className="font-semibold text-primary underline" href="mailto:lqixv@hotmail.com">lqixv@hotmail.com</a></p>
        <p className="mt-3">Final business content, domain, and email configuration remain for Ankit Kumar to confirm.</p>
        <p className="mt-3">Because the client domain is not yet confirmed, this demonstration uses the <strong className="font-semibold text-foreground">developer domain: fitoa.net</strong>.</p>
        <a className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground" href="https://www.sjs.co.nz/job-details/27276/website-developer-7842" target="_blank" rel="noreferrer">View the SJS Website Developer brief</a>
      </section>
    </section>
  );
}

export function About() {
  return (
    <Page title="About">
      <p>
        Cloudflare-Ankit is a provisional project identity. Final business
        information will be supplied before delivery.
      </p>
    </Page>
  );
}

export function Services() {
  return (
    <Page title="Services">
      <p>
        Services and products have not yet been confirmed. This page is
        intentionally limited to provisional information.
      </p>
    </Page>
  );
}

export function Contact() {
  return (
    <Page title="Contact">
      <p>
        Contact details will be published after they are confirmed. The current
        development domain is fitoa.net.
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
