import { Link } from "react-router-dom";

export function SiteFooter() {
	return (
		<footer className="border-t">
			<div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-6 py-6 text-sm text-muted-foreground">
				<Link to="/privacy" className="hover:text-foreground">Privacy</Link>
				<Link to="/terms" className="hover:text-foreground">Terms</Link>
				<span>Cloudflare-Ankit · provisional information</span>
			</div>
		</footer>
	);
}
