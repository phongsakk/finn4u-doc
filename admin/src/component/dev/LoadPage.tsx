import { Spinner } from "react-bootstrap";

export const LoadPage = () => {
  return (
    <div className="loader-page">
      <Spinner animation="border" variant="success" />
    </div>
  );
};
