import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@assets/css/app.css"
import "@assets/css/custom.css"

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
        {children}
      </body>
    </html>
  );
}
