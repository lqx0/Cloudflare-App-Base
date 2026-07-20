export function Home() {
	return (
		<section className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-6 py-16">
			<div className="space-y-3 text-center">
				<p className="text-sm text-muted-foreground">
					Preview environment: all data is test data and may be cleared at any time. Do not rely on it for storage.
				</p>
				<p className="text-lg font-semibold text-muted-foreground">Welcome to Your App</p>
			</div>
		</section>
	);
}
