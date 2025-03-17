"use client";

import { useState, useRef } from "react";
import { Button, Spinner } from "react-bootstrap";

function OTPForm({
  phone,
  setStep,
}: {
  phone: string;
  setStep: (num: number) => void;
}) {
  const [submit, setSubmit] = useState<boolean>(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    const newOtp = [...otp];

    if (value) {
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="sec-pass">
        <h2 className="text-center text-primary font2">
          รหัสยืนยันถูกส่งไปเรียบร้อยแล้ว
        </h2>

        <div className="tell">
          <p className="font2">กรุณากรอกรหัสยืนยันที่ถูกส่งไปยัง</p>
          <span className="text-primary font2 px-2">{phone}</span>
          <span className="font2">เพื่อดำเนินการต่อ</span>
        </div>

        <fieldset className="otp-password">
          <div className="d-flex">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                id={`otp-${index}`}
                type="text"
                className="form-control form-control--otp js-otp-input"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="one-time-code"
                maxLength={1}
                required
              />
            ))}
          </div>
        </fieldset>

        <button className="btn-clean font2">ส่งรหัส OTP อีกครั้ง</button>
      </div>
      <div className="submit-group">
        <Button variant="white" disabled={submit} onClick={() => setStep(1)}>
          ย้อนกลับ
        </Button>
        <Button variant="primary" type="submit" disabled={submit}>
          {submit ? (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              กำลังตรวจสอบข้อมูล
            </>
          ) : (
            "ถัดไป"
          )}
        </Button>
      </div>
    </form>
  );
}

export default OTPForm;
