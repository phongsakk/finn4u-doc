import Navbar from "@component/layout/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
<<<<<<< HEAD
      {children}
      {/* <Navbar title="Matching" />
      <main className="content">
        <div className="container-fluid p-0 overflow-x-auto">
        </div>
      </main> */}
=======
      <Navbar title="นักลงทุน" />
      <main className="content">
        <div className="container-fluid p-0 overflow-x-auto ">
          <div className="card flex-fill px-3 py-3 overflow-x-auto">
            {children}
          </div>
        </div>
      </main>
>>>>>>> 8e623a6e4ab919a4e72cf27a128f6a1c61f39f3e
    </>
  );
}