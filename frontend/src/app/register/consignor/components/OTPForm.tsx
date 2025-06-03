"use client";

import { AlertPrimary } from "@components/alert/SwalAlert";
import { regis_personal } from "@models/register/consignor";
import { api } from "@utils/api/index";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import Image from "next/image";
import iConSuccess from "@public/icon-park-solid_success.png";
import { signIn } from "next-auth/react";
import StepButton from "@components/FormCustom/StepButton";

function OTPForm({
  personal,
  setStep,
  checkStep,
}: {
  personal: regis_personal;
  setStep: (num: number) => void;
  checkStep: boolean;
}) {
  const NextStep = 3;
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
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const value = e.key.replace(/\D/g, "");
    const newOtp = [...otp];

    if (value) {
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else {
        inputRefs.current[0]?.focus();
      }
    }

    if (e.key === "Backspace") {
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        inputRefs.current[otp.length - 1]?.focus();
      }
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
    for (let i = 0; i < paste.length && i < otp.length; i++) {
      newOtp[i] = paste[i];
    }
    setOtp(newOtp);

    const nextIndex = Math.min(index + paste.length, otp.length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sendOtp = async () => {
      try {
        setSubmit(true);
        const mergeOtp = otp.join("");
        const { data: res_send } = await axios.post(
          api.internal(`/api/register/consignor/verifyotp`),
          {
            email: personal.Email,
            code: otp.join(""),
          }
        );
        
        if (res_send.status) {
          const login = await signIn("credentialsRegister", {
            email: res_send.data.email,
            accessToken: res_send.data.accessToken,
            refreshToken: res_send.data.refreshToken,
            userType: "consignment",
            redirect: false,
          });
          if (login?.url) {
            AlertPrimary("verified successfully", "success").then(() => {
              setStep(NextStep);
            });
          } else {
            AlertPrimary("please try again.", "error");
          }
        } else {
          AlertPrimary(res_send.data.message, "error");
        }
      } catch (error) {
        AlertPrimary("please try again.", "error");
      } finally {
        setSubmit(false);
      }
    };

    sendOtp();
  };

  const handleResendOTP = async () => {
    try {
      setResendLoad(true);
      setErrorResend(false);
      const { data: res_resend } = await axios.post(
        api.internal(`/api/register/consignor/resendotp`),
        {
          email: personal.Email,
        }
      );
      if (res_resend.status) {
        setRefCode(res_resend.data.ref);
      } else {
        setTimeout(() => {
          setErrorResend(true);
        }, 1000);
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
        {checkStep ? (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: 400, width: "auto" }}
          >
            <div className="mb-3">
              <Image
                src={iConSuccess}
                alt=""
                width={150}
                height={150}
                priority
              />
            </div>
            <h3 className="text-success">ยืนยัน OTP สำเร็จ</h3>
          </div>
        ) : (
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
              <div className="d-flex gap-1 gap-md-2 gap-lg-3 gap-sx-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    id={`otp-${index}`}
                    type="text"
                    className="form-control form-control--otp js-otp-input"
                    value={digit !== undefined && digit !== null ? digit : "9"}
                    onChange={(e) => e.preventDefault()}
                    onKeyUp={(e) => handleChange(index, e)}
                    onPaste={(e) => handlePaste(index, e)}
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
        )}
        <div className="submit-group">
          <Button variant="white" disabled={submit} onClick={() => setStep(1)}>
            ย้อนกลับ
          </Button>
          <StepButton
            checkStep={checkStep}
            submit={submit}
            NextStep={NextStep}
            setStep={setStep}
          />
        </div>
      </form>
    </>
  );
}

export default OTPForm;
