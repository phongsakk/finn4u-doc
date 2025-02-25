import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@assets/css/app.css"
import "@assets/css/custom.css"
import TokenRefresher from "@hooks/TokenRefresher";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Login - Finn4U",
  description: "เข้าใช้งานระบบจัดการหลังบ้าน Finn4U",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider >
          <TokenRefresher />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
