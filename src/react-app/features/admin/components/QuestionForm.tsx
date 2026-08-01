import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createQuestion, type AdminQuestion, type AdminQuestionInput } from "../admin-questions-api";
import { QuestionTypeSelector } from "./QuestionTypeSelector";

export function QuestionForm({ onCreated }: { onCreated(question: AdminQuestion): void }) {
	const [type, setType] = useState<AdminQuestionInput["type"]>("multiple_choice");
	const [prompt, setPrompt] = useState("");
	const [options, setOptions] = useState("Option A\nOption B");
	const [correctAnswer, setCorrect] = useState("");
	const [error, setError] = useState("");

	async function submit(event: FormEvent) {
		event.preventDefault();
		setError("");

		try {
			const parsedOptions = type === "multiple_choice"
				? options.split("\n").map((option) => option.trim()).filter(Boolean)
				: null;
			const question = await createQuestion({ type, prompt, options: parsedOptions, correctAnswer });
			onCreated(question);
			setPrompt("");
			setCorrect("");
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Unable to add question");
		}
	}

	return (
		<section className="rounded-xl border bg-card p-6 shadow-sm">
			<div className="space-y-1">
				<h2 className="text-xl font-semibold">Create question</h2>
				<p className="text-sm text-muted-foreground">Add a clear prompt and the answer reference for this quiz type.</p>
			</div>
			<form onSubmit={(event) => void submit(event)} className="mt-6 space-y-5">
				<div className="space-y-2">
					<label htmlFor="question-type" className="text-sm font-medium">Question type</label>
					<QuestionTypeSelector value={type} onChange={setType} />
				</div>

				<div className="space-y-2">
					<label htmlFor="question-prompt" className="text-sm font-medium">Prompt</label>
					<Textarea id="question-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} required />
				</div>

				{type === "multiple_choice" && (
					<div className="space-y-2">
						<label htmlFor="question-options" className="text-sm font-medium">Options</label>
						<Textarea id="question-options" value={options} onChange={(event) => setOptions(event.target.value)} required />
						<p className="text-sm text-muted-foreground">Enter one option per line.</p>
					</div>
				)}

				{type === "true_false" ? (
					<div className="space-y-2">
						<label htmlFor="correct-answer" className="text-sm font-medium">Correct answer</label>
						<Select value={correctAnswer} onValueChange={setCorrect} required>
							<SelectTrigger id="correct-answer">
								<SelectValue placeholder="Select an answer" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="true">True</SelectItem>
								<SelectItem value="false">False</SelectItem>
							</SelectContent>
						</Select>
					</div>
				) : (
					<div className="space-y-2">
						<label htmlFor="correct-answer" className="text-sm font-medium">{type === "free_text" ? "Reference answer / Evaluation guidance" : "Correct answer"}</label>
						<Input id="correct-answer" value={correctAnswer} onChange={(event) => setCorrect(event.target.value)} required />
						{type === "free_text" && <p className="text-sm text-muted-foreground">Provide a reference answer or evaluation guidance; this prototype does not score written responses.</p>}
					</div>
				)}

				{error && <p role="alert" className="text-sm text-destructive">{error}</p>}
				<Button type="submit">Add question</Button>
			</form>
		</section>
	);
}
