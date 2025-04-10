import type { Metadata } from "next";
import Footer from "@components/Footer";
import Navbar from "@components/Header/page";
import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@splidejs/splide/dist/css/splide.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

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
            <Navbar /> {children}
            {/* <Footer /> */}
        </SessionProvider>
      </body>
    </html>
  );
}
