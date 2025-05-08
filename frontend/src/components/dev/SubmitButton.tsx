import React from "react";
import { Button, Spinner } from "react-bootstrap";
type SubmitButtonType = {
  submit: boolean;
};
function SubmitButton({ submit }: SubmitButtonType) {
  return (
    <div className="submit-group mt-5">
      <Button variant="primary" type="submit" disabled={submit}>
        {submit ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-1"
            />
            กำลังตรวจสอบข้อมูล
          </>
        ) : (
          "ส่งข้อมูล"
        )}
      </Button>
    </div>
  );
}

export default SubmitButton;
