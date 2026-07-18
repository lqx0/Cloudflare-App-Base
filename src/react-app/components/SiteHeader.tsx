import { PrimaryNavigation } from "./PrimaryNavigation";
import { SiteBrand } from "./SiteBrand";
import { SiteHeaderActions } from "./SiteHeaderActions";

export function SiteHeader() {
	return (
		<header className="border-b bg-background">
			<div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-3">
				<SiteBrand />
				<PrimaryNavigation />
				<SiteHeaderActions />
			</div>
		</header>
	);
}
