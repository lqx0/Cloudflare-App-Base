import { useEffect, useState } from "react";

export function useGoogleAuthAvailable() {
	const [available, setAvailable] = useState(false);
	useEffect(() => { fetch("/api/auth/capabilities").then((r) => r.ok ? r.json() : { google: false }).then((data) => setAvailable(Boolean(data.google))).catch(() => setAvailable(false)); }, []);
	return available;
}
