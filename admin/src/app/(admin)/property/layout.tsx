import { PropertyProvider } from "@component/context/PropertyContext";
import ConModal from "./components/ConModal";
import TagsModal from "./components/TagsModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PropertyProvider>
      <ConModal />
      <TagsModal />
      {children}
    </PropertyProvider>
  );
}
