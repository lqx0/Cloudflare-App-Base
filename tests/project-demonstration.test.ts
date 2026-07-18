import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("homepage links safely to the SJS demonstration brief", async () => {
  const page = await readFile("src/react-app/pages/public/Pages.tsx", "utf8");
  assert.match(page, /https:\/\/www\.sjs\.co\.nz\/job-details\/27276\/website-developer-7842/);
  assert.match(page, /target="_blank"/);
  assert.match(page, /rel="noreferrer"/);
  assert.match(page, /lqixv@hotmail\.com/);
});
