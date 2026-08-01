import type { QuizResult } from "../types";
import { QuizTypeBadge } from "./QuizTypeBadge";

export function QuizResults({ results }: { results: QuizResult[] }) {
	return (
		<section className="space-y-4" aria-live="polite">
			{results.map((result, index) => (
				<article key={result.id} className="space-y-4 rounded-xl border p-5">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<p className="text-sm font-medium text-muted-foreground">Question {String(index + 1).padStart(2, "0")}</p>
						<QuizTypeBadge type={result.type} />
					</div>
					<h2 className="font-semibold">{result.prompt}</h2>
					<div className="rounded-xl bg-muted/40 p-4">
						<p className="text-sm font-medium">Your answer</p>
						<p className="mt-1 text-sm text-muted-foreground">{result.userAnswer}</p>
					</div>
					<div className="rounded-xl bg-muted/40 p-4">
						<p className="text-sm font-medium">{result.type === "free_text" ? "Reference answer / Evaluation guidance" : "Correct answer"}</p>
						<p className="mt-1 text-sm text-muted-foreground">{result.correctAnswer}</p>
					</div>
				</article>
			))}
		</section>
	);
}
