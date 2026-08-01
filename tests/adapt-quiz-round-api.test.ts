import assert from "node:assert/strict";
import test from "node:test";
import { createQuizHandlers } from "../src/worker/quiz/routes";
import type { QuestionRepository } from "../src/worker/quiz/types";

function repository(): QuestionRepository {
	const rows = [
		{ id: "m", type: "multiple_choice" as const, prompt: "Pick", options: ["A", "B"], correctAnswer: "B", createdByUserId: "a", createdAt: 1 },
		{ id: "t", type: "true_false" as const, prompt: "True?", options: null, correctAnswer: "true", createdByUserId: "a", createdAt: 1 },
		{ id: "f", type: "free_text" as const, prompt: "Explain", options: null, correctAnswer: "Guide", createdByUserId: "a", createdAt: 1 },
	];
	return {
		async list() { return rows; }, async create() { throw new Error("not used"); },
		async getByIds(ids) { return rows.filter((row) => ids.includes(row.id)); },
		async countByType() { return { multiple_choice: 1, true_false: 1, free_text: 1 }; },
		async getRandomByType(type) { return rows.find((row) => row.type === type); },
	};
}

test("quiz handlers return public rounds and authoritative results without writes", async () => {
	const handlers = createQuizHandlers(repository());
	const round = await handlers.start();
	assert.equal(round.length, 3);
	assert.ok(round.every((question) => !("correctAnswer" in question)));
	const results = await handlers.submit({ answers: [
		{ questionId: "m", type: "multiple_choice", answer: "A" },
		{ questionId: "t", type: "true_false", answer: "false" },
		{ questionId: "f", type: "free_text", answer: "Mine" },
	] });
	assert.deepEqual(results.map((result) => result.correctAnswer), ["B", "true", "Guide"]);
});

test("quiz handlers reject malformed and incomplete rounds", async () => {
	const handlers = createQuizHandlers(repository());
	assert.throws(() => handlers.submit({ answers: [] }), /Exactly one answer/);
	const incomplete = repository();
	incomplete.countByType = async () => ({ multiple_choice: 1, true_false: 0, free_text: 1 });
	assert.deepEqual(await createQuizHandlers(incomplete).status(), { ready: false, missingTypes: ["true_false"] });
	await assert.rejects(() => createQuizHandlers(incomplete).start(), /incomplete/);
});
