import { Link } from "react-router-dom";
import { publicNavigation } from "@/lib/public-navigation";

export function PrimaryNavigation() {
	return (
		<nav className="order-3 flex w-full flex-wrap gap-x-4 gap-y-2 text-sm md:order-none md:w-auto" aria-label="Primary navigation">
			{publicNavigation.map((item) => (
				<Link key={item.href} to={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
					{item.label}
				</Link>
			))}
		</nav>
	);
}
