import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { SeoMetadata } from "@/components/SeoMetadata";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AuthOverlay } from "@/components/auth/AuthOverlay";
import { Home } from "@/pages/Home";
import { SiteLayout } from "@/components/SiteLayout";
import { About, Contact, NotFound, Privacy, PublicHome, Services, Terms } from "@/pages/public/Pages";
import { Profile } from "@/pages/Profile";
import { SignUp } from "@/pages/auth/SignUp";
import { VerifyEmail } from "@/pages/auth/VerifyEmail";
import { ForgotPassword } from "@/pages/auth/ForgotPassword";
import { ResetPassword } from "@/pages/auth/ResetPassword";
import { config } from "../config";
import "./App.css";

function AppContent() {
	return (
		<>
			<SeoMetadata />
		<Routes>
			<Route path="/" element={<SiteLayout><PublicHome /></SiteLayout>} />
			<Route path="/about" element={<SiteLayout><About /></SiteLayout>} />
			<Route path="/services" element={<SiteLayout><Services /></SiteLayout>} />
			<Route path="/contact" element={<SiteLayout><Contact /></SiteLayout>} />
			<Route path="/privacy" element={<SiteLayout><Privacy /></SiteLayout>} />
			<Route path="/terms" element={<SiteLayout><Terms /></SiteLayout>} />
			<Route path="/login" element={<SiteLayout><AuthOverlay /></SiteLayout>} />
			{config.auth.enableSignups && <Route path="/signup" element={<SiteLayout><SignUp /></SiteLayout>} />}
			<Route path="/verify-email" element={<SiteLayout><VerifyEmail /></SiteLayout>} />
			<Route path="/verify-email/:token" element={<SiteLayout><VerifyEmail /></SiteLayout>} />
			<Route path="/forgot-password" element={<SiteLayout><ForgotPassword /></SiteLayout>} />
			<Route path="/reset-password" element={<SiteLayout><ResetPassword /></SiteLayout>} />
			<Route path="/reset-password/:token" element={<SiteLayout><ResetPassword /></SiteLayout>} />
			<Route
				path="/account"
				element={
					<SiteLayout><ProtectedRoute><Home /></ProtectedRoute></SiteLayout>
				}
			/>
			<Route
				path="/profile"
				element={
					<SiteLayout><ProtectedRoute><Profile /></ProtectedRoute></SiteLayout>
				}
			/>
			<Route
				path="*"
				element={<SiteLayout><NotFound /></SiteLayout>}
			/>
		</Routes>
		</>
	);
}

function App() {
	// Set document title from config
	useEffect(() => {
		document.title = config.appName;
	}, []);

	return <AppContent />;
}

export default App;
