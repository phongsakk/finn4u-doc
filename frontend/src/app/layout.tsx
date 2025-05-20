import type { Metadata } from "next";
import Footer from "@components/Footer";
import Navbar from "@components/Header/page";
import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@splidejs/splide/dist/css/splide.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import { ModalProvider } from "@components/context/ModalContext";
import LoginModal from "@components/Modal/LoginModal";
import RegisterModal from "@components/Modal/registerModal";
import ModalController from "@components/Modal/ModalController";
import { LoaderProvider } from "@components/context/LoaderContext";

export const metadata: Metadata = {
  title: "Finn4U",
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
            <ModalProvider>
              <ModalController />
              <LoginModal />
              <RegisterModal />
              <Navbar /> {children}
              <Footer />
            </ModalProvider>
          </LoaderProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
