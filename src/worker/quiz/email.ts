import type { QuizResult } from "./types";
import type { EmailSender } from "../utils/email";

type ReadinessEnv = { EMAIL_PROVIDER?: string; EMAIL_API_KEY?: string; RECRUIT_QUIZ_RECIPIENT_EMAIL?: string; fromAddress?: string };

export function getQuizEmailReadiness(env: ReadinessEnv): boolean {
	const usable = (value?: string) => Boolean(value?.trim() && !/^(placeholder|change-me|your-|example)/i.test(value.trim()));
	return env.EMAIL_PROVIDER === "resend"
		&& usable(env.EMAIL_API_KEY)
		&& usable(env.RECRUIT_QUIZ_RECIPIENT_EMAIL)
		&& Boolean(env.fromAddress?.trim() && !env.fromAddress.endsWith("@example.com"));
}

function escapeHtml(value: string): string {
	return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

export function buildQuizCopyEmail(input: { user: { name?: string | null; email: string }; results: QuizResult[]; sentAt: Date }) {
	const name = input.user.name?.trim() || "User";
	const time = input.sentAt.toISOString();
	const textRows = input.results.map((result, index) => `Question ${index + 1}: ${result.prompt}\nYour answer: ${result.userAnswer}\nCorrect / reference answer: ${result.correctAnswer}`).join("\n\n");
	const htmlRows = input.results.map((result, index) => `<section><h2>Question ${index + 1}</h2><p>${escapeHtml(result.prompt)}</p><p><strong>Your answer:</strong> ${escapeHtml(result.userAnswer)}</p><p><strong>Correct / reference answer:</strong> ${escapeHtml(result.correctAnswer)}</p></section>`).join("");
	return {
		subject: `aDaptQuiz response - ${name} - ${time}`,
		text: `This copy was actively sent by the user.\n\nName: ${name}\nEmail: ${input.user.email}\nSent: ${time}\n\n${textRows}`,
		html: `<p>This copy was actively sent by the user.</p><p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(input.user.email)}<br><strong>Sent:</strong> ${escapeHtml(time)}</p>${htmlRows}`,
	};
}

export async function sendQuizCopy(input: { to: string; user: { name?: string | null; email: string }; results: QuizResult[]; sentAt: Date; sender: EmailSender }) {
	return input.sender.sendEmail({ to: input.to, ...buildQuizCopyEmail(input) });
}
