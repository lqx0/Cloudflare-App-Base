import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { getSeoMetadata } from "../src/react-app/lib/seo";

test("returns canonical metadata for the public home route", () => {
  const metadata = getSeoMetadata("/");

  assert.equal(metadata.canonicalPath, "/");
  assert.equal(metadata.indexable, true);
  assert.match(metadata.title, /Cloudflare-Ankit/);
});

test("marks account and unknown routes as noindex", () => {
  assert.equal(getSeoMetadata("/account").indexable, false);
  assert.equal(getSeoMetadata("/missing").indexable, false);
});

test("static crawler resources list the six public canonical URLs", async () => {
  const publicDirectory = path.resolve(import.meta.dirname, "../public");
  const [robots, sitemap] = await Promise.all([
    readFile(path.join(publicDirectory, "robots.txt"), "utf8"),
    readFile(path.join(publicDirectory, "sitemap.xml"), "utf8"),
  ]);

  assert.match(robots, /Sitemap: https:\/\/fitoa\.net\/sitemap\.xml/);
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, 6);
  assert.doesNotMatch(sitemap, /www\.fitoa\.net/);
});
