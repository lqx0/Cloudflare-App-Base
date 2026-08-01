import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SendQuizCopyDialog({ available, sent, busy, onSend }: { available: boolean; sent: boolean; busy: boolean; onSend(): Promise<void> }) {
	const [open, setOpen] = useState(false);

	if (!available) return <p className="text-sm text-muted-foreground">Email delivery is not configured in this prototype. You can still start a new quiz.</p>;

	return (
		<div>
			{sent ? <Button variant="outline" disabled>Copy sent</Button> : <Button variant="outline" onClick={() => setOpen(true)}>Send a copy</Button>}
			{open && <section role="dialog" aria-modal="true" aria-labelledby="send-copy-title" className="mt-3 space-y-3 rounded-xl border p-4"><h2 id="send-copy-title" className="font-semibold">Send a copy?</h2><p className="text-sm leading-6 text-muted-foreground">This will send your name, account email, the three questions, your answers, and the correct or reference answers to the configured administrator through Resend. Nothing is sent unless you confirm.</p><div className="flex gap-2"><Button disabled={busy} onClick={() => void onSend().then(() => setOpen(false))}>Confirm and send</Button><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button></div></section>}
		</div>
	);
}
