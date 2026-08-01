import assert from "node:assert/strict";
import test from "node:test";
import { createQuizHandlers } from "../src/worker/quiz/routes";
import { createQuizRoutes } from "../src/worker/quiz/routes";
import { Hono } from "hono";
import type { AppBindings } from "../src/worker/types/context";
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

function sendCopyApp(repo = repository()) {
	const app = new Hono<AppBindings>();
	app.use("*", async (c, next) => {
		c.set("user", { id: "user-1", name: "Test User", email: "user@example.com" });
		await next();
	});
	app.route("/", createQuizRoutes(() => repo));
	return app;
}

const emailReadyEnv = {
	EMAIL_PROVIDER: "resend" as const,
	EMAIL_API_KEY: "test-key",
	RECRUIT_QUIZ_RECIPIENT_EMAIL: "admin@example.com",
};

test("send-copy returns 400 for malformed answer input instead of a provider error", async () => {
	const response = await sendCopyApp().request("/send-copy", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ answers: [] }),
	}, emailReadyEnv as never);
	assert.equal(response.status, 400);
	assert.match((await response.json() as { error: string }).error, /Exactly one answer/);
});

test("send-copy returns 409 when the submitted round is stale", async () => {
	const stale = repository();
	stale.getByIds = async () => [];
	const response = await sendCopyApp(stale).request("/send-copy", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ answers: [
			{ questionId: "m", type: "multiple_choice", answer: "A" },
			{ questionId: "t", type: "true_false", answer: "false" },
			{ questionId: "f", type: "free_text", answer: "Mine" },
		] }),
	}, emailReadyEnv as never);
	assert.equal(response.status, 409);
	assert.match((await response.json() as { error: string }).error, /no longer exist/);
});

test("send-copy reserves 502 for a real email provider failure", async () => {
	const originalFetch = globalThis.fetch;
	globalThis.fetch = async () => new Response(JSON.stringify({ message: "provider unavailable" }), {
		status: 500,
		headers: { "content-type": "application/json" },
	});
	try {
		const response = await sendCopyApp().request("/send-copy", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ answers: [
				{ questionId: "m", type: "multiple_choice", answer: "A" },
				{ questionId: "t", type: "true_false", answer: "false" },
				{ questionId: "f", type: "free_text", answer: "Mine" },
			] }),
		}, emailReadyEnv as never);
		assert.equal(response.status, 502);
		assert.deepEqual(await response.json(), { error: "The copy could not be sent. Please try again." });
	} finally {
		globalThis.fetch = originalFetch;
	}
});
