import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { AdminQuestionInput } from "../admin-questions-api";

type QuestionType = AdminQuestionInput["type"];

type QuestionTypeSelectorProps = {
	value: QuestionType;
	onChange(type: QuestionType): void;
	disabled?: boolean;
};

const questionTypes: Array<{ type: QuestionType; label: string }> = [
	{ type: "multiple_choice", label: "Multiple choice" },
	{ type: "true_false", label: "True / false" },
	{ type: "free_text", label: "Written response" },
];

export function QuestionTypeSelector({ value, onChange, disabled }: QuestionTypeSelectorProps) {
	return (
		<Select value={value} onValueChange={(nextValue) => onChange(nextValue as QuestionType)} disabled={disabled}>
			<SelectTrigger id="question-type" aria-label="Question type">
				<SelectValue placeholder="Select a question type" />
			</SelectTrigger>
			<SelectContent>
				{questionTypes.map(({ type, label }) => (
					<SelectItem key={type} value={type}>{label}</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
