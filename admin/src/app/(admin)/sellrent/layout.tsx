import Navbar from "@component/layout/Navbar";
import { Button, Row } from "react-bootstrap";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar title="ขาย/เช่า" />
      <main className="content">
        <div className="container-fluid p-0">
          <div className="top-search">
            <Button className="active">ทั้งหมด</Button>
            <Button>ระงับ</Button>
          </div>
          <div className="card flex-fill px-3 py-3 overflow-x-auto">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}