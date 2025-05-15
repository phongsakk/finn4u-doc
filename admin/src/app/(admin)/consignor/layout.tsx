import Navbar from "@component/layout/Navbar";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
      <Navbar title="ผู้ขายฝาก" />
      <main className="content">
        <div className="container-fluid p-0 overflow-x-auto">
        {children}
        </div>
        </main>
      </>
    );
  }