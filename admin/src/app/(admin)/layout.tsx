import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "@/component/layout/Sidebar";
import "@/assets/css/app.css"
import "@/assets/css/custom.css"

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
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        {children}
      </div>
    </div>
  );
}
