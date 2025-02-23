import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/app.css"
import "@/assets/css/custom.css"
import Sidebar from "@/component/layout/Sidebar";

export const metadata: Metadata = {
  title: "Finn4U Admin",
  description: "ระบบจัดการหลังบ้าน Finn4U",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="wrapper">
          <Sidebar />
          <div className="main">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
