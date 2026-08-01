import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Quiz presents round context and answered progress", async () => {
  const page = await readFile("src/react-app/pages/QuizPage.tsx", "utf8");
  assert.match(page, /3 questions/);
  assert.match(page, /answeredCount/);
  assert.match(page, /answered/);
});

test("Quiz answer choices are full-row native radio controls", async () => {
  const card = await readFile("src/react-app/features/quiz/components/QuizQuestionCard.tsx", "utf8");
  assert.match(card, /peer\/sr-only/);
  assert.match(card, /peer-checked:border-primary/);
  assert.match(card, /Question \{String\(index \+ 1\)/);
});

test("Quiz results separate user and reference answers", async () => {
  const results = await readFile("src/react-app/features/quiz/components/QuizResults.tsx", "utf8");
  assert.match(results, /bg-muted\/40/);
  assert.match(results, /Your answer/);
  assert.match(results, /Reference answer \/ Evaluation guidance/);
});
