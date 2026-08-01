import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getQuizStatus, startQuizRound, submitQuizRound } from "@/features/quiz/quiz-api";
import type { PublicQuizQuestion, QuizResult, QuizStatus } from "@/features/quiz/types";
import { QuizIntroduction } from "@/features/quiz/components/QuizIntroduction";
import { QuizQuestionCard } from "@/features/quiz/components/QuizQuestionCard";
import { QuizResults } from "@/features/quiz/components/QuizResults";
import { SendQuizCopyDialog } from "@/features/quiz/components/SendQuizCopyDialog";
import { sendQuizCopy } from "@/features/quiz/quiz-api";

export function QuizPage() {
	const [status, setStatus] = useState<QuizStatus>({ ready: false, missingTypes: [] });
	const [questions, setQuestions] = useState<PublicQuizQuestion[]>([]);
	const [answers, setAnswers] = useState<Record<string, string>>({});
	const [results, setResults] = useState<QuizResult[] | null>(null);
	const [busy, setBusy] = useState(false); const [error, setError] = useState("");
	const [sent, setSent] = useState(false);
	useEffect(() => { void getQuizStatus().then(setStatus).catch((e: unknown) => setError(e instanceof Error ? e.message : "Unable to load quiz")); }, []);
	async function start() { setBusy(true); setError(""); setAnswers({}); setResults(null); setSent(false); try { setQuestions(await startQuizRound()); } catch (e) { setError(e instanceof Error ? e.message : "Unable to start quiz"); } finally { setBusy(false); } }
	async function submit() { if (questions.some((q) => !answers[q.id]?.trim())) { setError("Please answer all three questions."); return; } setBusy(true); try { setResults(await submitQuizRound(questions.map((q) => ({ questionId: q.id, type: q.type, answer: answers[q.id] })))); } catch (e) { setError(e instanceof Error ? e.message : "Unable to submit quiz"); } finally { setBusy(false); } }
	async function send(){setBusy(true);setError("");try{await sendQuizCopy(questions.map(q=>({questionId:q.id,type:q.type,answer:answers[q.id]})));setSent(true);}catch(e){setError(e instanceof Error?e.message:"The copy could not be sent. Please try again.");throw e;}finally{setBusy(false);}}
	return <main className="mx-auto max-w-3xl space-y-6 px-6 py-16"><h1 className="text-4xl font-bold">Quiz</h1>{error && <p role="alert">{error}</p>}{questions.length === 0 ? <QuizIntroduction onStart={() => void start()} disabled={busy || !status.ready} missing={status.missingTypes} /> : <>{results ? <QuizResults results={results} /> : <section className="space-y-4">{questions.map((q) => <QuizQuestionCard key={q.id} question={q} value={answers[q.id] || ""} onChange={(value) => setAnswers((current) => ({ ...current, [q.id]: value }))} disabled={busy} />)}<Button onClick={() => void submit()} disabled={busy}>Submit answers</Button></section>}{results && <div className="space-y-3"><SendQuizCopyDialog available={Boolean(status.emailAvailable)} sent={sent} busy={busy} onSend={send}/><Button onClick={() => void start()} disabled={busy}>Start a new quiz</Button></div>}</>}</main>;
}
