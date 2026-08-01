import { Hono } from "hono";
import type { AppBindings } from "../types/context";
import { validateRoundAnswers } from "./schema";
import { createRound, getBankStatus, submitRound } from "./service";
import type { QuestionRepository } from "./types";

export function createQuizHandlers(repository: QuestionRepository) {
	return {
		status: () => getBankStatus(repository),
		async start() {
			if (!(await getBankStatus(repository)).ready) throw new Error("Question bank is incomplete");
			return createRound(repository);
		},
		submit: (input: unknown) => submitRound(repository, validateRoundAnswers(input)),
	};
}

export function createQuizRoutes(resolveRepository: (bindings: AppBindings["Bindings"]) => QuestionRepository) {
	const routes = new Hono<AppBindings>();
	routes.get("/status", async (c) => c.json(await createQuizHandlers(resolveRepository(c.env)).status()));
	routes.post("/round", async (c) => {
		try { return c.json({ questions: await createQuizHandlers(resolveRepository(c.env)).start() }); }
		catch (error) { return c.json({ error: error instanceof Error ? error.message : "Unable to start quiz" }, 409); }
	});
	routes.post("/submit", async (c) => {
		try { return c.json({ results: await createQuizHandlers(resolveRepository(c.env)).submit(await c.req.json()) }); }
		catch (error) { return c.json({ error: error instanceof Error ? error.message : "Invalid answers" }, 400); }
	});
	return routes;
}
