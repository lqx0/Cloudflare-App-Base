import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("homepage presents the approved aDaptQuiz prototype", async () => {
  const page = await readFile("src/react-app/pages/public/Pages.tsx", "utf8");
  const content = await readFile("src/react-app/content/adapt-quiz.ts", "utf8");
  assert.match(content, /aDaptQuiz/);
  assert.match(content, /Prototype prepared in response/);
  assert.match(content, /sjs\.co\.nz/);
  assert.match(page, /rounded-full/);
  assert.match(page, /font-semibold/);
});
