import { Hono } from "hono";
import type { AppBindings } from "../types/context";
import type { QuestionRepository } from "./types";
import { validateQuestionInput } from "./schema";

export function createAdminQuestionHandlers(repository: QuestionRepository) {
	return {
		list: () => repository.list(),
		create: (input: unknown, userId: string) => repository.create(validateQuestionInput(input), userId),
	};
}

export function createAdminQuestionRoutes(resolveRepository: (bindings: AppBindings["Bindings"]) => QuestionRepository) {
	const routes = new Hono<AppBindings>();
	routes.get("/questions", async (c) => c.json({ questions: await createAdminQuestionHandlers(resolveRepository(c.env)).list() }));
	routes.post("/questions", async (c) => {
		try {
			const question = await createAdminQuestionHandlers(resolveRepository(c.env)).create(await c.req.json(), c.get("user")!.id);
			return c.json({ question }, 201);
		} catch (error) {
			return c.json({ error: error instanceof Error ? error.message : "Invalid question" }, 400);
		}
	});
	return routes;
}
