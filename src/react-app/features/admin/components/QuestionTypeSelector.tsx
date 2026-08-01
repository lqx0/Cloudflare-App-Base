import { cn } from "@/lib/utils";
import type { AdminQuestionInput } from "../admin-questions-api";

type QuestionTypeSelectorProps = {
	value: AdminQuestionInput["type"];
	onChange(type: AdminQuestionInput["type"]): void;
	disabled?: boolean;
};

const questionTypes: Array<{ type: AdminQuestionInput["type"]; label: string }> = [
	{ type: "multiple_choice", label: "Multiple choice" },
	{ type: "true_false", label: "True / false" },
	{ type: "free_text", label: "Written response" },
];

export function QuestionTypeSelector({ value, onChange, disabled }: QuestionTypeSelectorProps) {
	return (
		<div role="radiogroup" aria-label="Question type" className="grid gap-2 sm:grid-cols-3">
			{questionTypes.map(({ type, label }) => (
				<button
					key={type}
					type="button"
					role="radio"
					aria-checked={value === type}
					disabled={disabled}
					onClick={() => onChange(type)}
					className={cn(
						"rounded-lg border px-3 py-2 text-left text-sm transition-colors",
						value === type ? "border-primary bg-primary/5 text-foreground" : "text-muted-foreground hover:bg-muted/40",
					)}
				>
					{label}
				</button>
			))}
		</div>
	);
}
