export async function handleSendConfirmation(onSend: () => Promise<void>, onSuccess: () => void): Promise<void> {
	try {
		await onSend();
		onSuccess();
	} catch {
		// QuizPage presents the error; keep the dialog open so the user can retry.
	}
}
