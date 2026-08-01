import type { QuizResult, QuizStatus, PublicQuizQuestion, RoundAnswer } from "./types";

async function api<T>(url: string, init?: RequestInit): Promise<T> {
	const response = await fetch(url, { ...init, headers: { "content-type": "application/json", ...init?.headers } });
	const body = await response.json() as T & { error?: string };
	if (!response.ok) throw new Error(body.error || "Request failed");
	return body;
}
export const getQuizStatus = () => api<QuizStatus>("/api/quiz/status");
export async function startQuizRound(): Promise<PublicQuizQuestion[]> { return (await api<{ questions: PublicQuizQuestion[] }>("/api/quiz/round", { method: "POST" })).questions; }
export async function submitQuizRound(answers: RoundAnswer[]): Promise<QuizResult[]> { return (await api<{ results: QuizResult[] }>("/api/quiz/submit", { method: "POST", body: JSON.stringify({ answers }) })).results; }
export async function sendQuizCopy(answers: RoundAnswer[]): Promise<void> { await api("/api/quiz/send-copy", { method: "POST", body: JSON.stringify({ answers }) }); }
