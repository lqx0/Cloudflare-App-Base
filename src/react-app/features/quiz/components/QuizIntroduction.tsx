import { Button } from "@/components/ui/button";

export function QuizIntroduction({ onStart, disabled, missing }: { onStart(): void; disabled: boolean; missing: string[] }) {
	return (
		<section className="space-y-5">
			<div className="space-y-3 text-sm leading-6 text-muted-foreground">
				<p>Each quiz contains one multiple-choice question, one true-or-false question, and one written-response question.</p>
				<p>Your answers are not saved in this prototype. Refreshing or leaving this page will end the current quiz.</p>
				<p>The production version will retain completed quizzes and provide access to your quiz history.</p>
			</div>
			{missing.length > 0 && <p role="alert">Missing question types: {missing.join(", ")}.</p>}
			<Button onClick={onStart} disabled={disabled}>Start quiz</Button>
		</section>
	);
}
