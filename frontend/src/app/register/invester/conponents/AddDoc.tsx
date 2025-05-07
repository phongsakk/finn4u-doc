"use client";
import CustomImage from "@components/CustomImage";
import StepButton from "@components/FormCustom/StepButton";
import React from "react";
import { Button, Form } from "react-bootstrap";

function AddDoc({
  setStep,
  checkStep,
}: {
  setStep: (num: number) => void;
  checkStep: boolean;
}) {
  const NextStep = 6;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setStep(NextStep);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <p>
        สมุดบัญชี<span className="text-require">*</span>
      </p>
      <div className="upload-btn-group">
        <button type="submit" className="btn btn-light csbtn1">
          <CustomImage
            src="/upload.svg"
            alt="upload"
            style={{ height: "auto" }}
          />
          อัพโหลด
        </button>
      </div>

      <p>
        เอกสารของผู้ที่จะได้รับผลประโยชน์ (สำเนาบัตรประชาชน)
        <span className="text-require">*</span>
      </p>
      <div className="upload-btn-group">
        <button type="submit" className="btn btn-light csbtn1">
          <CustomImage
            src="/upload.svg"
            alt="upload"
            style={{ height: "auto" }}
          />
          อัพโหลด
        </button>
      </div>
      <div className="submit-group">
        <Button variant="white" onClick={() => setStep(2)}>
          ย้อนกลับ
        </Button>
        <StepButton
          checkStep={checkStep}
          NextStep={NextStep}
          setStep={setStep}
        />
      </div>
    </Form>
  );
}

export default AddDoc;
