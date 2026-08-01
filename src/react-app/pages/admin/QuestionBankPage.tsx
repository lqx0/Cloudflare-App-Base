import { useEffect, useState } from "react";
import { QuestionForm } from "@/features/admin/components/QuestionForm";
import { QuestionList } from "@/features/admin/components/QuestionList";
import { listQuestions, type AdminQuestion } from "@/features/admin/admin-questions-api";

export function QuestionBankPage() {
	const [questions, setQuestions] = useState<AdminQuestion[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		void listQuestions()
			.then(setQuestions)
			.catch((caught) => setError(caught instanceof Error ? caught.message : "Unable to load questions"));
	}, []);

	return (
		<main className="mx-auto max-w-6xl space-y-8 px-6 py-16">
			<div className="space-y-2">
				<h1 className="text-4xl font-bold">Question management</h1>
				<p className="text-muted-foreground">Build the question bank for future quiz rounds.</p>
			</div>
			{error && <p role="alert">{error}</p>}
			<div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
				<section aria-label="Create question">
					<QuestionForm onCreated={(question) => setQuestions((current) => [question, ...current])} />
				</section>
				<QuestionList questions={questions} />
			</div>
		</main>
	);
}
