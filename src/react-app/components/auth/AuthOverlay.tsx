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
		<div className="flex w-full flex-1 items-center justify-center px-4 py-8">
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
