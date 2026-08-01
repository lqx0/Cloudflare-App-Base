import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizIntroduction } from "@/features/quiz/components/QuizIntroduction";
import { QuizQuestionCard } from "@/features/quiz/components/QuizQuestionCard";
import { QuizResults } from "@/features/quiz/components/QuizResults";
import { SendQuizCopyDialog } from "@/features/quiz/components/SendQuizCopyDialog";
import { getQuizStatus, sendQuizCopy, startQuizRound, submitQuizRound } from "@/features/quiz/quiz-api";
import type { PublicQuizQuestion, QuizResult, QuizStatus } from "@/features/quiz/types";

export function QuizPage() {
	const [status, setStatus] = useState<QuizStatus>({ ready: false, missingTypes: [] });
	const [questions, setQuestions] = useState<PublicQuizQuestion[]>([]);
	const [answers, setAnswers] = useState<Record<string, string>>({});
	const [results, setResults] = useState<QuizResult[] | null>(null);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const [sent, setSent] = useState(false);
	const answeredCount = questions.filter((question) => answers[question.id]?.trim()).length;

	useEffect(() => {
		void getQuizStatus().then(setStatus).catch((error: unknown) => setError(error instanceof Error ? error.message : "Unable to load quiz"));
	}, []);

	async function start() {
		setBusy(true);
		setError("");
		setAnswers({});
		setResults(null);
		setSent(false);
		try {
			setQuestions(await startQuizRound());
		} catch (error) {
			setError(error instanceof Error ? error.message : "Unable to start quiz");
		} finally {
			setBusy(false);
		}
	}

	async function submit() {
		if (questions.some((question) => !answers[question.id]?.trim())) {
			setError("Please answer all three questions.");
			return;
		}
		setBusy(true);
		try {
			setResults(await submitQuizRound(questions.map((question) => ({ questionId: question.id, type: question.type, answer: answers[question.id] }))));
		} catch (error) {
			setError(error instanceof Error ? error.message : "Unable to submit quiz");
		} finally {
			setBusy(false);
		}
	}

	async function send() {
		setBusy(true);
		setError("");
		try {
			await sendQuizCopy(questions.map((question) => ({ questionId: question.id, type: question.type, answer: answers[question.id] })));
			setSent(true);
		} catch (error) {
			setError(error instanceof Error ? error.message : "The copy could not be sent. Please try again.");
			throw error;
		} finally {
			setBusy(false);
		}
	}

	return (
		<main className="mx-auto w-full max-w-6xl px-6 py-16">
			<div className="max-w-4xl space-y-5">
				<header className="space-y-2">
					<p className="text-sm font-medium text-muted-foreground">Self-test</p>
					<h1 className="text-4xl font-bold">Quiz</h1>
					<p className="text-sm text-muted-foreground">3 questions</p>
				</header>
				{error && <p role="alert" className="rounded-xl border border-destructive/50 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}
				<section>
				{questions.length === 0 ? (
					<QuizIntroduction onStart={() => void start()} disabled={busy || !status.ready} missing={status.missingTypes} />
				) : (
					<>
						{results ? <QuizResults results={results} /> : <section className="space-y-4"><p className="text-sm text-muted-foreground">{answeredCount} of 3 answered</p>{questions.map((question, index) => <QuizQuestionCard key={question.id} question={question} index={index} value={answers[question.id] || ""} onChange={(value) => setAnswers((current) => ({ ...current, [question.id]: value }))} disabled={busy} />)}<Button onClick={() => void submit()} disabled={busy}>Submit answers</Button></section>}
						{results && <div className="mt-6 flex flex-wrap items-start gap-3"><Button onClick={() => void start()} disabled={busy}>Start a new quiz</Button><SendQuizCopyDialog available={Boolean(status.emailAvailable)} sent={sent} busy={busy} onSend={send} /></div>}
					</>
				)}
				</section>
			</div>
		</main>
	);
}
