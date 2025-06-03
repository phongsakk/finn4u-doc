import { ConsignorModalProvider } from "@components/context/ConsignorContext";
import CustomImage from "@components/CustomImage";
import AssetGraph from "@components/Modal/AssetGraph";
import AssetInfo from "@components/Modal/AssetInfo";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="consignment-index">
      <div className="justify-content-center">
        <CustomImage
          src="/consigment-banner.png"
          alt="consigment-banner"
          style={{ aspectRatio: 2.5, height: "auto" }}
        />
      </div>
      <ConsignorModalProvider>
        <AssetGraph />
        <AssetInfo />
        {children}
      </ConsignorModalProvider>
    </div>
  );
}
export default Layout;
