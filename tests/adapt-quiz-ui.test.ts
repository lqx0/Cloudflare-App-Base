import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("quiz page keeps answers in memory and requests a new round", async () => {
	const page = await readFile("src/react-app/pages/QuizPage.tsx", "utf8");
	const introduction = await readFile("src/react-app/features/quiz/components/QuizIntroduction.tsx", "utf8");
	assert.match(introduction, /Your answers are not saved in this prototype/);
	assert.match(page, /Start a new quiz/);
	assert.match(page, /startQuizRound\(\)/);
	assert.doesNotMatch(page, /localStorage|sessionStorage/);
});

test("quiz results show user and reference answers", async () => {
	const results = await readFile("src/react-app/features/quiz/components/QuizResults.tsx", "utf8");
	assert.match(results, /Your answer/);
	assert.match(results, /Reference answer \/ Evaluation guidance/);
});
