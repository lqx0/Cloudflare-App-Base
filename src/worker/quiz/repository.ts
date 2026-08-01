import type { Kysely } from "kysely";
import type { Database } from "../types/database";
import type { QuestionInput, QuestionRepository, QuizQuestion } from "./types";

function toQuestion(row: Database["quiz_questions"]): QuizQuestion {
	return { ...row, options: row.optionsJson ? JSON.parse(row.optionsJson) as string[] : null };
}

export function createQuestionRepository(db: Kysely<Database>): QuestionRepository {
	return {
		async list() {
			return (await db.selectFrom("quiz_questions").selectAll().orderBy("createdAt", "desc").execute()).map(toQuestion);
		},
		async create(input: QuestionInput, userId: string) {
			const row: Database["quiz_questions"] = { id: crypto.randomUUID(), type: input.type, prompt: input.prompt, optionsJson: input.options ? JSON.stringify(input.options) : null, correctAnswer: input.correctAnswer, createdByUserId: userId, createdAt: Date.now() };
			await db.insertInto("quiz_questions").values(row).execute();
			return toQuestion(row);
		},
		async getByIds(ids: string[]) {
			if (!ids.length) return [];
			return (await db.selectFrom("quiz_questions").selectAll().where("id", "in", ids).execute()).map(toQuestion);
		},
		async countByType() {
			const result = { multiple_choice: 0, true_false: 0, free_text: 0 };
			const rows = await db.selectFrom("quiz_questions").select("type").select((eb) => eb.fn.count<number>("id").as("count")).groupBy("type").execute();
			for (const row of rows) result[row.type] = Number(row.count);
			return result;
		},
		async getRandomByType(type) {
			const row = await db.selectFrom("quiz_questions").selectAll().where("type", "=", type).orderBy(db.fn("random", [])).limit(1).executeTakeFirst();
			return row ? toQuestion(row) : undefined;
		},
	};
}
