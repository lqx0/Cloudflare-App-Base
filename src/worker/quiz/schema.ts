import { QUESTION_TYPES, type QuestionInput, type QuestionType, type RoundAnswer } from "./types";

const MAX_PROMPT = 2000;
const MAX_ANSWER = 5000;
const MAX_OPTION = 500;

function text(value: unknown, name: string, max: number): string {
	if (typeof value !== "string" || !value.trim()) throw new Error(`${name} is required`);
	const normalized = value.trim();
	if (normalized.length > max) throw new Error(`${name} is too long`);
	return normalized;
}

function questionType(value: unknown): QuestionType {
	if (!QUESTION_TYPES.includes(value as QuestionType)) throw new Error("Invalid question type");
	return value as QuestionType;
}

export function validateQuestionInput(value: unknown): QuestionInput {
	if (!value || typeof value !== "object") throw new Error("Question is required");
	const input = value as Record<string, unknown>;
	const type = questionType(input.type);
	const prompt = text(input.prompt, "Prompt", MAX_PROMPT);
	const correctAnswer = text(input.correctAnswer, "Correct answer", MAX_ANSWER);
	if (type === "multiple_choice") {
		if (!Array.isArray(input.options) || input.options.length < 2 || input.options.length > 10) throw new Error("Multiple-choice questions require 2 to 10 options");
		const options = input.options.map((option) => text(option, "Option", MAX_OPTION));
		if (new Set(options).size !== options.length) throw new Error("Options must be unique");
		if (!options.includes(correctAnswer)) throw new Error("Correct answer must be an option");
		return { type, prompt, options, correctAnswer };
	}
	if (type === "true_false" && !["true", "false"].includes(correctAnswer)) throw new Error("True/false answer must be true or false");
	return { type, prompt, options: null, correctAnswer };
}

export function validateRoundAnswers(value: unknown): RoundAnswer[] {
	if (!value || typeof value !== "object" || !Array.isArray((value as { answers?: unknown }).answers)) throw new Error("Answers are required");
	const answers = (value as { answers: unknown[] }).answers.map((item) => {
		if (!item || typeof item !== "object") throw new Error("Invalid answer");
		const answer = item as Record<string, unknown>;
		return { questionId: text(answer.questionId, "Question ID", 100), type: questionType(answer.type), answer: text(answer.answer, "Answer", MAX_ANSWER) };
	});
	if (answers.length !== 3 || new Set(answers.map((answer) => answer.type)).size !== 3) throw new Error("Exactly one answer of each type is required");
	return answers;
}
