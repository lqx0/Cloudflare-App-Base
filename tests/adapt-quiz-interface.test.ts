import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { QuizResults } from "../src/react-app/features/quiz/components/QuizResults";

Object.assign(globalThis, { React });

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

test("Quiz results clearly distinguish an incorrect objective answer from the correct answer", () => {
	const markup = renderToStaticMarkup(
		React.createElement(QuizResults, {
			results: [
				{
					id: "question-1",
					type: "multiple_choice",
					prompt: "Which answer is correct?",
					options: ["A", "B"],
					userAnswer: "A",
					correctAnswer: "B",
				},
			],
		}),
	);

	assert.match(markup, /border-destructive\/40 bg-destructive\/5/);
	assert.match(markup, /border-emerald-500\/40 bg-emerald-500\/10/);
});

test("Question bank uses a responsive creation and list workspace", async () => {
	const page = await readFile("src/react-app/pages/admin/QuestionBankPage.tsx", "utf8");
	assert.match(page, /lg:grid-cols-\[minmax\(0,0\.85fr\)_minmax\(0,1\.15fr\)\]/);
	assert.match(page, /Create question/);
});

test("Question type selector uses the shared Select with all existing types", async () => {
	const selector = await readFile("src/react-app/features/admin/components/QuestionTypeSelector.tsx", "utf8");
	assert.match(selector, /@\/components\/ui\/select/);
	assert.match(selector, /<Select/);
	assert.match(selector, /<SelectTrigger/);
	assert.match(selector, /<SelectContent/);
	assert.match(selector, /<SelectItem/);
	assert.match(selector, /Multiple choice/);
	assert.match(selector, /True \/ false/);
	assert.match(selector, /Written response/);
});

test("Question form uses the shared Select for a true-false answer", async () => {
	const form = await readFile("src/react-app/features/admin/components/QuestionForm.tsx", "utf8");
	assert.match(form, /@\/components\/ui\/select/);
	assert.doesNotMatch(form, /<select/);
	assert.match(form, /<SelectItem value="true">True<\/SelectItem>/);
	assert.match(form, /<SelectItem value="false">False<\/SelectItem>/);
});

test("Question form gives only written responses a larger answer textarea", async () => {
	const form = await readFile("src/react-app/features/admin/components/QuestionForm.tsx", "utf8");
	assert.match(form, /type === "free_text"/);
	assert.match(form, /<Textarea id="correct-answer".*className="min-h-32"/);
	assert.match(form, /<Input id="correct-answer"/);
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
