"use client";

import { regis_personal } from "@models/register/consignor";
import { useAlert } from "@providers/AlertContext";
import { api } from "@utils/api/index";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";

function OTPForm({
  personal,
  setStep,
}: {
  personal: regis_personal;
  setStep: (num: number) => void;
}) {
  const { showAlert } = useAlert();
  const [submit, setSubmit] = useState<boolean>(false);
  const [refCode, setRefCode] = useState<string>();
  const [resendLoad, setResendLoad] = useState<boolean>(false);
  const [errorResend, setErrorResend] = useState<boolean>(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setRefCode(personal.Ref);
  }, [personal.Ref]);

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

  const handlePaste = (
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otp.length);
    const newOtp = [...otp];

    for (let i = 0; i < paste.length && index + i < otp.length; i++) {
      newOtp[index + i] = paste[i];
    }

    setOtp(newOtp);

    const nextIndex = Math.min(index + paste.length, otp.length - 1);
    inputRefs.current[nextIndex]?.focus();
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

    const sendOtp = async () => {
      try {
        const mergeOtp = otp.join("");
        const { data: res_send } = await axios.post(
          api.internal(`/api/register/consignment/verifyotp`),
          {
            email: personal.Email,
            code: otp.join(""),
          }
        );
        if (res_send.status) {
          showAlert("verified successfully", "success");
          setTimeout(() => {
            setStep(3);
          }, 1000);
        } else {
          showAlert(res_send.data.message, "error");
        }
      } catch (error) {
        console.error(error);
      }
    };

    sendOtp();
  };

  const handleResendOTP = async () => {
    try {
      setResendLoad(true);
      setErrorResend(false);
      const { data: res_resend } = await axios.post(
        api.internal(`/api/register/consignment/resendotp`),
        {
          email: personal.Email,
        }
      );
      if (res_resend.status) {
        setRefCode(res_resend.data.ref);
      } else {
        setErrorResend(true);
      }
    } catch (error) {
      setTimeout(() => {
        setErrorResend(true);
      }, 1000);
    } finally {
      setTimeout(() => {
        setResendLoad(false);
      }, 1000);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="sec-pass">
          {!errorResend ? (
            <h2 className="text-center text-primary font2">
              {!resendLoad
                ? "รหัสยืนยันถูกส่งไปเรียบร้อยแล้ว"
                : "กำลังส่งรหัส OTP อีกครั้ง..."}
            </h2>
          ) : (
            <>
              <h2 className="text-center text-danger font2">
                ส่งรหัส OTP ไม่สำเร็จ
                <h4 className="text-center text-danger font2">
                  กรุณาลองอีกครั้ง
                </h4>
              </h2>
            </>
          )}

          <div className="tell">
            <p className="font2">กรุณากรอกรหัสยืนยันที่ถูกส่งไปยัง</p>
            <span className="text-primary font2 px-2">{personal.Email}</span>
            <span className="font2">เพื่อดำเนินการต่อ</span>
            <h6 className="font2">Ref: {refCode}</h6>
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
                  onPaste={(e) => handlePaste(index, e)}
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
          <Button
            onClick={handleResendOTP}
            variant="clean"
            className="font2"
            disabled={resendLoad}
          >
            ส่งรหัส OTP อีกครั้ง
          </Button>
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
    </>
  );
}

export default OTPForm;
