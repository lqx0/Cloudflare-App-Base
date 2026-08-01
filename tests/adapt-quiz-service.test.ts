import assert from "node:assert/strict";
import test from "node:test";
import { createRound, getBankStatus, submitRound } from "../src/worker/quiz/service";
import type { QuestionRepository, QuizQuestion } from "../src/worker/quiz/types";

const questions: QuizQuestion[] = [
	{ id: "m", type: "multiple_choice", prompt: "Pick B", options: ["A", "B"], correctAnswer: "B", createdByUserId: "admin", createdAt: 1 },
	{ id: "t", type: "true_false", prompt: "The sky is blue", options: null, correctAnswer: "true", createdByUserId: "admin", createdAt: 2 },
	{ id: "f", type: "free_text", prompt: "Explain", options: null, correctAnswer: "Reference", createdByUserId: "admin", createdAt: 3 },
];

function repository(rows = questions): QuestionRepository {
	return {
		list: async () => rows,
		create: async () => rows[0]!,
		getByIds: async (ids) => rows.filter((row) => ids.includes(row.id)),
		countByType: async () => ({
			multiple_choice: rows.filter((q) => q.type === "multiple_choice").length,
			true_false: rows.filter((q) => q.type === "true_false").length,
			free_text: rows.filter((q) => q.type === "free_text").length,
		}),
		getRandomByType: async (type) => rows.find((row) => row.type === type),
	};
}

test("reports missing types and creates a three-type public round", async () => {
	assert.deepEqual(await getBankStatus(repository(questions.slice(0, 2))), { ready: false, missingTypes: ["free_text"] });
	const round = await createRound(repository());
	assert.equal(round.length, 3);
	assert.deepEqual(round.map((q) => q.type).sort(), ["free_text", "multiple_choice", "true_false"]);
	assert.ok(round.every((q) => !("correctAnswer" in q)));
});

test("assembles results from authoritative stored answers", async () => {
	const results = await submitRound(repository(), [
		{ questionId: "m", type: "multiple_choice", answer: "A" },
		{ questionId: "t", type: "true_false", answer: "true" },
		{ questionId: "f", type: "free_text", answer: "Mine" },
	]);
	assert.equal(results[0]?.correctAnswer, "B");
	assert.equal(results[2]?.correctAnswer, "Reference");
});
