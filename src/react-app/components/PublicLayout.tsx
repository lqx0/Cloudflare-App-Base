import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { publicNavigation } from "@/lib/public-navigation";

export function PublicLayout({ children }: { children: ReactNode }) {
	return <div className="min-h-screen bg-background text-foreground"><header className="border-b"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"><Link className="font-semibold" to="/">Cloudflare-Ankit</Link><nav className="hidden gap-4 text-sm md:flex">{publicNavigation.map((item) => <Link key={item.href} to={item.href}>{item.label}</Link>)}</nav><div className="flex items-center gap-2"><ModeToggle /><Button asChild variant="outline" size="sm"><Link to="/login">Log in</Link></Button><Button asChild size="sm"><Link to="/signup">Register</Link></Button></div></div></header><main>{children}</main><footer className="border-t"><div className="mx-auto flex max-w-6xl flex-wrap gap-4 px-6 py-6 text-sm text-muted-foreground"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><span>Cloudflare-Ankit · provisional information</span></div></footer></div>;
}
