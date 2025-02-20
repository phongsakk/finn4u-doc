import type { Metadata } from "next";
import Navbar from '@components/Navbar';
import Footer from "@components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@splidejs/splide/dist/css/splide.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css'
import "./globals.css";

export const metadata: Metadata = {
  title: "Finn4U",
  description: "Property Rental Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
