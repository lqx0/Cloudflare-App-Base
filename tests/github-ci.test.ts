import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("GitHub CI validates the local build without deployment", async () => {
  const workflow = await readFile(".github/workflows/ci.yml", "utf8");
  assert.match(workflow, /node-version-file: "\.nvmrc"/);
  assert.match(workflow, /npm ci/);
  assert.match(workflow, /tsx --test/);
  assert.match(workflow, /npm run lint/);
  assert.match(workflow, /npm run build/);
  assert.doesNotMatch(workflow, /wrangler deploy/);
});
