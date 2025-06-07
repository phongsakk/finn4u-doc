import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@assets/css/app.css"
import "@assets/css/custom.css"
import { SessionProvider } from "next-auth/react";
import { LoaderProvider } from "@component/context/LoaderContext";
// import SessionDisplay from "@component/dev/SessionDisplay";

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
          <LoaderProvider>
            {children}
          </LoaderProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
