import { QuizTypeBadge } from "@/features/quiz/components/QuizTypeBadge";
import type { AdminQuestion } from "../admin-questions-api";

export function QuestionList({ questions }: { questions: AdminQuestion[] }) {
	return (
		<section>
			<div className="flex flex-wrap items-baseline justify-between gap-2">
				<h2 className="text-2xl font-semibold">Question bank</h2>
				<p className="text-sm text-muted-foreground">{questions.length} questions</p>
			</div>

			{questions.length === 0 ? (
				<div className="mt-4 rounded-xl border border-dashed p-8 text-center">
					<p className="font-medium">No questions yet</p>
					<p className="mt-1 text-sm text-muted-foreground">Add your first question with the form.</p>
				</div>
			) : (
				<ul className="mt-4 space-y-3">
					{questions.map((question) => (
						<li key={question.id} className="space-y-3 rounded-xl border p-4">
							<QuizTypeBadge type={question.type} />
							<p className="font-medium">{question.prompt}</p>
							{question.type === "multiple_choice" && question.options && (
								<ul className="space-y-1 text-sm text-muted-foreground">
									{question.options.map((option) => <li key={option}>{option}</li>)}
								</ul>
							)}
							<p className="text-sm text-muted-foreground">
								<span className="font-medium text-foreground">{question.type === "free_text" ? "Reference answer" : "Correct answer"}:</span>{" "}
								{question.correctAnswer}
							</p>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
