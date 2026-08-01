export type AdminQuestionInput = { type: "multiple_choice" | "true_false" | "free_text"; prompt: string; options: string[] | null; correctAnswer: string };
export type AdminQuestion = AdminQuestionInput & { id: string; createdAt: number };
async function request<T>(url: string, init?: RequestInit) { const response = await fetch(url, { ...init, headers: { "content-type": "application/json" } }); const body = await response.json() as T & { error?: string }; if (!response.ok) throw new Error(body.error || "Request failed"); return body; }
export async function listQuestions() { return (await request<{ questions: AdminQuestion[] }>("/api/admin/questions")).questions; }
export async function createQuestion(input: AdminQuestionInput) { return (await request<{ question: AdminQuestion }>("/api/admin/questions", { method: "POST", body: JSON.stringify(input) })).question; }
