import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<SiteHeader />
			<main className="flex w-full flex-1 flex-col">{children}</main>
			<SiteFooter />
		</div>
	);
}
