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
  assert.match(card, /peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2/);
  assert.match(card, /Question \{String\(index \+ 1\)/);
});

test("Quiz results separate user and reference answers", async () => {
	const results = await readFile("src/react-app/features/quiz/components/QuizResults.tsx", "utf8");
	assert.match(results, /bg-muted\/40/);
	assert.match(results, /Your answer/);
	assert.match(results, /Reference answer \/ Evaluation guidance/);
});

test("Question bank uses a responsive creation and list workspace", async () => {
	const page = await readFile("src/react-app/pages/admin/QuestionBankPage.tsx", "utf8");
	assert.match(page, /lg:grid-cols-\[minmax\(0,0\.85fr\)_minmax\(0,1\.15fr\)\]/);
	assert.match(page, /Create question/);
});

test("Question form exposes three accessible type selectors", async () => {
	const selector = await readFile("src/react-app/features/admin/components/QuestionTypeSelector.tsx", "utf8");
	assert.match(selector, /role="radiogroup"/);
	assert.match(selector, /aria-checked/);
	assert.match(selector, /Multiple choice/);
	assert.match(selector, /Written response/);
});

test("Question type selector follows the radio-group keyboard model", async () => {
	const selector = await readFile("src/react-app/features/admin/components/QuestionTypeSelector.tsx", "utf8");
	assert.match(selector, /tabIndex=\{disabled \? -1 : value === type \? 0 : -1\}/);
	assert.match(selector, /onKeyDown=/);
	assert.match(selector, /ArrowLeft/);
	assert.match(selector, /ArrowRight/);
	assert.match(selector, /ArrowUp/);
	assert.match(selector, /ArrowDown/);
	assert.match(selector, /Home/);
	assert.match(selector, /End/);
	assert.match(selector, /buttonRefs\.current\[nextType\]\?\.focus\(\)/);
	assert.match(selector, /if \(disabled\) return/);
});

test("Question list shows count and an explicit empty state", async () => {
	const list = await readFile("src/react-app/features/admin/components/QuestionList.tsx", "utf8");
	assert.match(list, /questions\.length/);
	assert.match(list, /No questions yet/);
	assert.match(list, /Add your first question/);
});

test("Question list explains that production will provide management controls", async () => {
	const list = await readFile("src/react-app/features/admin/components/QuestionList.tsx", "utf8");
	assert.match(list, /Question editing, deletion, and availability controls will be implemented in the production version\./);
});
