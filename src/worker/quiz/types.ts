export const QUESTION_TYPES = ["multiple_choice", "true_false", "free_text"] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];

export type QuestionInput = {
	type: QuestionType;
	prompt: string;
	options: string[] | null;
	correctAnswer: string;
};

export type QuizQuestion = QuestionInput & {
	id: string;
	createdByUserId: string;
	createdAt: number;
};

export type PublicQuizQuestion = Omit<QuizQuestion, "correctAnswer" | "createdByUserId" | "createdAt">;
export type RoundAnswer = { questionId: string; type: QuestionType; answer: string };
export type QuizResult = PublicQuizQuestion & { userAnswer: string; correctAnswer: string };
export type QuestionCounts = Record<QuestionType, number>;

export type QuestionRepository = {
	list(): Promise<QuizQuestion[]>;
	create(input: QuestionInput, userId: string): Promise<QuizQuestion>;
	getByIds(ids: string[]): Promise<QuizQuestion[]>;
	countByType(): Promise<QuestionCounts>;
	getRandomByType(type: QuestionType): Promise<QuizQuestion | undefined>;
};
