import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LoginForm } from "./LoginForm";
import { Logo } from "../Logo";
import { config } from "../../../config";
import { useNavigate } from "react-router-dom";

/**
 * AuthOverlay - Renders login form as an overlay and takes successful sign-ins to profile settings.
 */
export function AuthOverlay() {
	const navigate = useNavigate();

	return (
		<div className="fixed inset-0 z-50 flex flex-col items-center overflow-auto py-4 px-4">
			<div className="fixed inset-0 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 -z-10" />

			<Card className="relative w-full max-w-md shadow-2xl my-auto">
				<CardHeader className="space-y-6">
					<div className="flex justify-center">
						<Logo className="h-12 w-auto" showTitle={true} />
					</div>
					<CardTitle className="text-center">Authentication Required</CardTitle>
				</CardHeader>
				<CardContent>
					<LoginForm
						showSignupLink={config.auth.enableSignups}
						onSuccess={() => navigate("/profile")}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
