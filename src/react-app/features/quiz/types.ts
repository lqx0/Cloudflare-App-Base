export type QuestionType = "multiple_choice" | "true_false" | "free_text";
export type PublicQuizQuestion = { id: string; type: QuestionType; prompt: string; options: string[] | null };
export type RoundAnswer = { questionId: string; type: QuestionType; answer: string };
export type QuizResult = PublicQuizQuestion & { userAnswer: string; correctAnswer: string };
export type QuizStatus = { ready: boolean; missingTypes: QuestionType[]; emailAvailable?: boolean };
