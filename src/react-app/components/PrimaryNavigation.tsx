import { Link } from "react-router-dom";
import { publicNavigation } from "@/lib/public-navigation";
import { authClient } from "@/lib/auth/client";

export function PrimaryNavigation() {
	const { data: session } = authClient.useSession();
	const isAdmin = (session?.user as { role?: string } | undefined)?.role === "admin";
	return (
		<nav className="order-3 flex w-full flex-wrap gap-x-4 gap-y-2 text-sm md:order-none md:w-auto" aria-label="Primary navigation">
			{publicNavigation.map((item) => (
				<Link key={item.href} to={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
					{item.label}
				</Link>
			))}
			{isAdmin && <><Link to="/admin/questions" className="text-muted-foreground transition-colors hover:text-foreground">Question bank</Link><Link to="/admin/submissions" className="text-muted-foreground transition-colors hover:text-foreground">Submitted copies</Link></>}
		</nav>
	);
}
