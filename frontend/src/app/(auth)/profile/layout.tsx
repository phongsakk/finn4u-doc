import ProfileSide from "@components/ProfileSide";
import { Row } from "react-bootstrap";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container py-5">
      <Row>
        <div className="col-lg-4 mb-3">
          <ProfileSide />
        </div>
        <div className="col-lg-8">{children}</div>
      </Row>
    </div>
  );
}
