import { Textarea } from "@/components/ui/textarea";
import type { PublicQuizQuestion } from "../types";
import { QuizTypeBadge } from "./QuizTypeBadge";

type QuizQuestionCardProps = {
	question: PublicQuizQuestion;
	index: number;
	value: string;
	onChange(value: string): void;
	disabled?: boolean;
};

export function QuizQuestionCard({ question, index, value, onChange, disabled }: QuizQuestionCardProps) {
	const radioOptions = question.type === "true_false"
		? ["true", "false"]
		: question.options ?? [];

	return (
		<fieldset className="space-y-4 rounded-xl border p-5" disabled={disabled}>
			<legend className="w-full space-y-3">
				<span className="flex flex-wrap items-center justify-between gap-3 text-sm font-medium text-muted-foreground">
					<span>Question {String(index + 1).padStart(2, "0")}</span>
					<QuizTypeBadge type={question.type} />
				</span>
				<span className="block text-base font-semibold">{question.prompt}</span>
			</legend>
			{question.type === "free_text" ? (
				<div className="space-y-2">
					<label htmlFor={`answer-${question.id}`} className="text-sm font-medium">Your answer</label>
					<Textarea id={`answer-${question.id}`} value={value} onChange={(event) => onChange(event.target.value)} />
				</div>
			) : (
				<div className="space-y-2">
					{radioOptions.map((option) => {
						const optionId = `${question.id}-${option}`;
						const label = question.type === "true_false" ? (option === "true" ? "True" : "False") : option;
						return (
							<div key={option}>
								<input
									id={optionId}
									className="peer peer/sr-only sr-only"
									type="radio"
									name={question.id}
									value={option}
									checked={value === option}
									onChange={() => onChange(option)}
								/>
								<label htmlFor={optionId} className="flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors hover:bg-muted/40 peer-checked:border-primary peer-checked:bg-primary/5 peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2">
									{label}
								</label>
							</div>
						);
					})}
				</div>
			)}
		</fieldset>
	);
}
