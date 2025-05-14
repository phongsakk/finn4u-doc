import Navbar from "@component/layout/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {/* <Navbar title="Matching" />
      <main className="content">
        <div className="container-fluid p-0 overflow-x-auto">
        </div>
      </main> */}
    </>
  );
}