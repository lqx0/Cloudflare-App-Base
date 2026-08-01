import { useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import type { AdminQuestionInput } from "../admin-questions-api";

type QuestionType = AdminQuestionInput["type"];

type QuestionTypeSelectorProps = {
	value: AdminQuestionInput["type"];
	onChange(type: AdminQuestionInput["type"]): void;
	disabled?: boolean;
};

const questionTypes: Array<{ type: QuestionType; label: string }> = [
	{ type: "multiple_choice", label: "Multiple choice" },
	{ type: "true_false", label: "True / false" },
	{ type: "free_text", label: "Written response" },
];

function getNextQuestionType(currentType: QuestionType, key: string) {
	const currentIndex = questionTypes.findIndex(({ type }) => type === currentType);
	const lastIndex = questionTypes.length - 1;

	switch (key) {
		case "ArrowLeft":
		case "ArrowUp":
			return questionTypes[(currentIndex + lastIndex) % questionTypes.length].type;
		case "ArrowRight":
		case "ArrowDown":
			return questionTypes[(currentIndex + 1) % questionTypes.length].type;
		case "Home":
			return questionTypes[0].type;
		case "End":
			return questionTypes[lastIndex].type;
		default:
			return undefined;
	}
}

export function QuestionTypeSelector({ value, onChange, disabled }: QuestionTypeSelectorProps) {
	const buttonRefs = useRef<Partial<Record<QuestionType, HTMLButtonElement | null>>>({});

	function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, type: QuestionType) {
		if (disabled) return;

		const nextType = getNextQuestionType(type, event.key);
		if (!nextType) return;

		event.preventDefault();
		onChange(nextType);
		buttonRefs.current[nextType]?.focus();
	}

	return (
		<div role="radiogroup" aria-label="Question type" className="grid gap-2 sm:grid-cols-3">
			{questionTypes.map(({ type, label }) => (
				<button
					key={type}
					type="button"
					role="radio"
					aria-checked={value === type}
					disabled={disabled}
					tabIndex={disabled ? -1 : value === type ? 0 : -1}
					ref={(button) => { buttonRefs.current[type] = button; }}
					onClick={() => onChange(type)}
					onKeyDown={(event) => handleKeyDown(event, type)}
					className={cn(
						"rounded-lg border px-3 py-2 text-left text-sm transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
						value === type ? "border-primary bg-primary/5 text-foreground" : "text-muted-foreground hover:bg-muted/40",
					)}
				>
					{label}
				</button>
			))}
		</div>
	);
}
