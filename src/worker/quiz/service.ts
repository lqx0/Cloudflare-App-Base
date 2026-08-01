import { QUESTION_TYPES, type PublicQuizQuestion, type QuestionRepository, type QuizResult, type RoundAnswer } from "./types";

export async function getBankStatus(repository: QuestionRepository) {
	const counts = await repository.countByType();
	const missingTypes = QUESTION_TYPES.filter((type) => counts[type] < 1);
	return { ready: missingTypes.length === 0, missingTypes };
}

function publicQuestion(question: NonNullable<Awaited<ReturnType<QuestionRepository["getRandomByType"]>>>): PublicQuizQuestion {
	return { id: question.id, type: question.type, prompt: question.prompt, options: question.options };
}

export async function createRound(repository: QuestionRepository): Promise<PublicQuizQuestion[]> {
	const questions = await Promise.all(QUESTION_TYPES.map((type) => repository.getRandomByType(type)));
	if (questions.some((question) => !question)) throw new Error("Question bank is incomplete");
	return questions.map((question) => publicQuestion(question!));
}

export async function submitRound(repository: QuestionRepository, answers: RoundAnswer[]): Promise<QuizResult[]> {
	const stored = await repository.getByIds(answers.map((answer) => answer.questionId));
	if (stored.length !== 3) throw new Error("One or more questions no longer exist");
	return answers.map((answer) => {
		const question = stored.find((row) => row.id === answer.questionId && row.type === answer.type);
		if (!question) throw new Error("Question type mismatch");
		return { ...publicQuestion(question), userAnswer: answer.answer, correctAnswer: question.correctAnswer };
	});
}
