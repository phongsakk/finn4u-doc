import Navbar from "@component/layout/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar title="Dashboard" />
      <main className="content">
        <div className="container-fluid p-0">
          <div className="card flex-fill px-3 py-3 overflow-x-auto">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}