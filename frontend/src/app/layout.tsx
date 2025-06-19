import type { Metadata } from "next";
import Footer from "@components/Footer";
import Navbar from "@components/Header/page";
import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@splidejs/splide/dist/css/splide.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import LoginModal from "@components/Modal/LoginModal";
import RegisterModal from "@components/Modal/registerModal";
import ModalController from "@components/Modal/ModalController";
import { LoaderProvider } from "@components/context/LoaderContext";

export const metadata: Metadata = {
  title: "รับจำนอง ขายฝาก บ้าน ที่ดิน คอนโด ดอกเบี้ยถูก อนุมัติไว ไม่เช็คเครดิต | ทุนทันใจ",
  icons: "/logo-icon.svg",
  description: "Property Rental Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <LoaderProvider>
            <LoginModal />
            <RegisterModal />
            <Navbar /> <div className="body-frame">{children}</div>
            <Footer />
          </LoaderProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
