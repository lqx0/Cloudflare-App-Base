import { Link, useNavigate } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import { authClient } from "@/lib/auth/client";
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function getUserInitials(name?: string | null, email?: string): string {
	if (name) {
		return name
			.split(" ")
			.map((part) => part[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	}

	return email?.[0]?.toUpperCase() ?? "U";
}

function UserMenu() {
	const navigate = useNavigate();
	const { data: session } = authClient.useSession();
	const user = session?.user;

	if (!user) return null;

	const initials = getUserInitials(user.name, user.email);
	const handleSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => navigate("/", { replace: true }),
			},
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="h-9 w-9 rounded-full p-0" aria-label="Open user menu">
					<Avatar className="h-8 w-8">
						<AvatarFallback className="bg-primary text-sm text-primary-foreground">{initials}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel>
					<div className="flex items-start gap-3">
						<Avatar className="h-9 w-9 shrink-0">
							<AvatarFallback className="bg-primary text-sm text-primary-foreground">{initials}</AvatarFallback>
						</Avatar>
						<div className="min-w-0 space-y-1">
							<p className="truncate text-sm font-medium leading-none">{user.name || "User"}</p>
							<p className="truncate text-xs font-normal leading-none text-muted-foreground">{user.email}</p>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link to="/profile" className="cursor-pointer">
						<Settings className="mr-2 h-4 w-4" />
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
					<LogOut className="mr-2 h-4 w-4" />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function SiteHeaderActions() {
	const { data: session } = authClient.useSession();

	return (
		<div className="flex shrink-0 items-center gap-2">
			{session?.user ? (
				<>
					<ModeToggle />
					<UserMenu />
				</>
			) : (
				<>
					<Button asChild variant="outline" size="sm"><Link to="/login">Log in</Link></Button>
					<Button asChild size="sm"><Link to="/signup">Register</Link></Button>
				</>
			)}
		</div>
	);
}
