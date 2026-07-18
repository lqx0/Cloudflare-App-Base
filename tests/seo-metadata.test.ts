import assert from "node:assert/strict";
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
