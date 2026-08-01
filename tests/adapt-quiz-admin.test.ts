import assert from "node:assert/strict";
import test from "node:test";
import { authorizeAdministrator } from "../src/worker/middleware/admin";
import { createAdminQuestionHandlers } from "../src/worker/quiz/admin-routes";
import type { QuestionRepository } from "../src/worker/quiz/types";

test("administrator authorization reloads the persisted role", async () => {
	let loadedId = "";
	assert.equal(await authorizeAdministrator({ id: "user-1" }, async (id) => {
		loadedId = id;
		return "user";
	}), false);
	assert.equal(loadedId, "user-1");
	assert.equal(await authorizeAdministrator({ id: "admin-1" }, async () => "admin"), true);
	assert.equal(await authorizeAdministrator(null, async () => "admin"), false);
});

test("administrator handlers validate creation and expose a read-only list", async () => {
	const rows: Awaited<ReturnType<QuestionRepository["list"]>> = [];
	const repository: QuestionRepository = {
		async list() { return rows; },
		async create(input, userId) {
			const row = { ...input, id: "q-1", createdByUserId: userId, createdAt: 1 };
			rows.push(row);
			return row;
		},
		async getByIds() { return []; },
		async countByType() { return { multiple_choice: 0, true_false: 0, free_text: 0 }; },
		async getRandomByType() { return undefined; },
	};
	const handlers = createAdminQuestionHandlers(repository);
	assert.throws(() => handlers.create({ type: "free_text", prompt: " ", correctAnswer: "Guide" }, "admin-1"));
	const created = await handlers.create({ type: "free_text", prompt: " Explain it ", correctAnswer: " Guide " }, "admin-1");
	assert.equal(created.prompt, "Explain it");
	assert.deepEqual(await handlers.list(), [created]);
});
