import CustomImage from "@components/CustomImage";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="add-investment">
      <div className="justify-content-center">
        <CustomImage
          src="/banner4.png"
          alt="chechhand-bg"
          style={{ aspectRatio: 2.5, height: "auto" }}
        />
      </div>
      {children}
    </div>
  );
}
