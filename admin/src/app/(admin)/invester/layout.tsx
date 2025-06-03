import Navbar from "@component/layout/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar title="นักลงทุน" />
      <main className="content">
        <div className="container-fluid p-0 overflow-x-auto ">
          <div className="card flex-fill px-3 py-3 overflow-x-auto">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}