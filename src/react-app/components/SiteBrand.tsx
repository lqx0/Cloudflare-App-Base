import { Link } from "react-router-dom";
import { config } from "../../config";
import { Logo } from "./Logo";

export function SiteBrand() {
	return (
		<Link to="/" className="flex shrink-0 items-center gap-2 font-semibold transition-opacity hover:opacity-80">
			<Logo className="h-8 w-auto" />
			<span className="text-lg tracking-tight">{config.appName}</span>
		</Link>
	);
}
