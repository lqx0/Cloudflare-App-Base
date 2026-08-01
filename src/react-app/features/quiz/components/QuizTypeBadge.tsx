import type { QuestionType } from "../types";

const labels: Record<QuestionType, string> = {
	multiple_choice: "Multiple choice",
	true_false: "True / false",
	free_text: "Written response",
};

export function formatQuestionType(type: QuestionType) {
	return labels[type];
}

export function QuizTypeBadge({ type }: { type: QuestionType }) {
	return (
		<span className="inline-flex rounded-full border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
			{formatQuestionType(type)}
		</span>
	);
}
