import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("homepage presents a neutral reusable foundation", async () => {
  const page = await readFile("src/react-app/pages/public/Pages.tsx", "utf8");
  assert.match(page, /Cloudflare-App-Base/);
  assert.match(page, /project\/&lt;name&gt;/);
  assert.doesNotMatch(page, /Ankit Kumar|fitoa\.net|sjs\.co\.nz|lqixv@hotmail\.com/);
  assert.match(page, /rounded-full/);
  assert.match(page, /font-semibold/);
});
