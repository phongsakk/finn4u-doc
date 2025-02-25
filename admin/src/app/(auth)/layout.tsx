import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@assets/css/app.css"
import "@assets/css/custom.css"
import { auth } from "@setting/auth";

export const metadata: Metadata = {
	title: "Login - Finn4U",
	description: "เข้าใช้งานระบบจัดการหลังบ้าน Finn4U",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// const [session, setSession] = useState<Session | null>(null)

	const session = await auth();

	return (
		<div>
			<div>
				<div className="w-100vw">
					<p>
						{session?.user.accessToken}
					</p>
					<p>
						{session?.user.refreshToken}
					</p>
				</div>
			</div>
			{children}
		</div>
	);
}
