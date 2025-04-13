import CustomImage from "@components/CustomImage";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="consignment-index">
      <div className="justify-content-center">
        <CustomImage src="/consigment-banner.png" alt="consigment-banner" />
      </div>
      {children}
    </div>
  );
}
export default Layout;
