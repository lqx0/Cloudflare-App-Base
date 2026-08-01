import assert from "node:assert/strict";
import test from "node:test";
import { validateQuestionInput, validateRoundAnswers } from "../src/worker/quiz/schema";

test("normalizes a valid multiple-choice question", () => {
	assert.deepEqual(validateQuestionInput({
		type: "multiple_choice",
		prompt: " Which option is correct? ",
		options: [" A ", "B"],
		correctAnswer: "B",
	}), {
		type: "multiple_choice",
		prompt: "Which option is correct?",
		options: ["A", "B"],
		correctAnswer: "B",
	});
});

test("rejects invalid question definitions", () => {
	assert.throws(() => validateQuestionInput({ type: "multiple_choice", prompt: "x", options: ["A", "A"], correctAnswer: "A" }));
	assert.throws(() => validateQuestionInput({ type: "true_false", prompt: "x", correctAnswer: "maybe" }));
	assert.throws(() => validateQuestionInput({ type: "free_text", prompt: "x", correctAnswer: "" }));
});

test("requires exactly one answered question of each type", () => {
	const answers = validateRoundAnswers({ answers: [
		{ questionId: "m", type: "multiple_choice", answer: "A" },
		{ questionId: "t", type: "true_false", answer: "true" },
		{ questionId: "f", type: "free_text", answer: "My response" },
	] });
	assert.equal(answers.length, 3);
	assert.throws(() => validateRoundAnswers({ answers: answers.slice(0, 2) }));
});
