import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { SeoMetadata } from "@/components/SeoMetadata";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AuthOverlay } from "@/components/auth/AuthOverlay";
import { Home } from "@/pages/Home";
import { PublicLayout } from "@/components/PublicLayout";
import { About, Contact, NotFound, Privacy, PublicHome, Services, Terms } from "@/pages/public/Pages";
import { Profile } from "@/pages/Profile";
import { SignUp } from "@/pages/auth/SignUp";
import { VerifyEmail } from "@/pages/auth/VerifyEmail";
import { ForgotPassword } from "@/pages/auth/ForgotPassword";
import { ResetPassword } from "@/pages/auth/ResetPassword";
import { authClient } from "@/lib/auth/client";
import { config } from "../config";
import "./App.css";

function AppContent() {
	const location = useLocation();
	const { data: session } = authClient.useSession();

	// Auth pages don't use the TopBar layout
	const authPages = [
		...(config.auth.enableSignups ? ["/signup"] : []),
		"/verify-email",
		"/forgot-password",
		"/reset-password",
	];
	const isAuthPage = authPages.some(page => location.pathname.startsWith(page));

	// Only show TopBar if not on an auth page AND user is authenticated
	// This prevents flash of TopBar while checking auth
	const shouldShowTopBar = !isAuthPage && !!session;

	return (
		<>
			<SeoMetadata />
		<Routes>
			<Route path="/" element={<PublicLayout><PublicHome /></PublicLayout>} />
			<Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
			<Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
			<Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
			<Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
			<Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
			<Route path="/login" element={<AuthOverlay />} />
			{/* Public auth routes - no TopBar */}
			{config.auth.enableSignups && <Route path="/signup" element={<SignUp />} />}
			<Route path="/verify-email" element={<VerifyEmail />} />
			<Route path="/verify-email/:token" element={<VerifyEmail />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/reset-password" element={<ResetPassword />} />
			<Route path="/reset-password/:token" element={<ResetPassword />} />

			{/* Protected routes with TopBar */}
			<Route
				path="/account"
				element={
					<ProtectedRoute>
						{shouldShowTopBar ? (
							<TopBar>
								<Home />
							</TopBar>
						) : (
							<Home />
						)}
					</ProtectedRoute>
				}
			/>
			<Route
				path="/profile"
				element={
					<ProtectedRoute>
						{shouldShowTopBar ? (
							<TopBar>
								<Profile />
							</TopBar>
						) : (
							<Profile />
						)}
					</ProtectedRoute>
				}
			/>
			<Route
				path="*"
				element={<PublicLayout><NotFound /></PublicLayout>}
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
