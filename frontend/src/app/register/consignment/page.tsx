"use client";
import Image from "next/image";
import ImageBannerregis1 from "@public/banner_regis1.png";
import ImagePolygon2 from "@public/Polygon2.png";
import ImagerRegstep1 from "@public/reg-step1.png";
import ImagerRegstep2 from "@public/reg-step2.png";
import ImagerRegstep3 from "@public/reg-step3.png";
import PersonalForm from "./components/PersonalForm";
import { useState } from "react";
import OTPForm from "./components/OTPForm";
import TermsAndCon from "./components/TermsAndCon";
import UploadDocForm from "./components/UploadDocForm";
import VerifyForm from "./components/VerifyForm";
import SuccessForm from "./components/SuccessForm";
import { regis_personal } from "@models/register/consignor";

function ReConsignmentPage() {
  const [personal, setPersonal] = useState<regis_personal>(
    // {
    //   UserID: 17,
    //   Phone: "0321546",
    //   Email: "kengker1144+test3@gmail.com",
    //   Ref: "tset"
    // }
  );

  const [step, setStep] = useState<number>(1); // defult 1
  return (
    <>
      {step < 6 ? (
        <>
          <div className="banner-regis">
            <Image
              src={ImageBannerregis1}
              alt=""
              style={{ height: "auto" }}
              priority
            />
          </div>
          <div className="register-seller">
            <div className="container">
              <div className="card-form-main">
                <div className="wrap">
                  <h4 className="title-main font2">
                    ลงทะเบียนเป็นผู้ขายฝากกับ Finn4U
                  </h4>
                  <div className="step justify-content-lg-between justify-content-center">
                    <div
                      className={`child ${![1, 2, 3].includes(step) ? "d-none d-lg-block" : ""
                        }`}
                    >
                      <Image src={ImagerRegstep1} alt="" priority />
                      <p
                        className={`font2 ${[1, 2, 3].includes(step) ? "fw-bold" : ""
                          }`}
                      >
                        ลงทะเบียน
                      </p>
                    </div>
                    <div className="polygon d-none d-lg-block">
                      <Image src={ImagePolygon2} alt="" priority />
                    </div>
                    <div
                      className={`child ${![4].includes(step) ? "d-none d-lg-block" : ""
                        }`}
                    >
                      <Image src={ImagerRegstep2} alt="" priority />
                      <p
                        className={`font2 ${[4].includes(step) ? "fw-bold" : ""
                          }`}
                      >
                        ยืนยันตัวตน
                      </p>
                    </div>
                    <div className="polygon d-none d-lg-block">
                      <Image src={ImagePolygon2} alt="" priority />
                    </div>
                    <div
                      className={`child ${![5].includes(step) ? "d-none d-lg-block" : ""
                        }`}
                    >
                      <Image src={ImagerRegstep3} alt="" priority />
                      <p
                        className={`font2 ${[5].includes(step) ? "fw-bold" : ""
                          }`}
                      >
                        อัพโหลดเอกสาร
                      </p>
                    </div>
                  </div>
                </div>
                {step === 1 && (
                  <PersonalForm personal={personal} setPersonal={setPersonal} setStep={setStep} />
                )}

                {step === 2 && personal !== undefined && (
                  <OTPForm personal={personal} setStep={setStep} />
                )}
                {step === 3 && personal !== undefined && (
                  <TermsAndCon setStep={setStep} />
                )}
                {step === 4 && personal !== undefined && (
                  <VerifyForm setStep={setStep} />
                )}
                {step === 5 && personal !== undefined && (
                  <UploadDocForm setStep={setStep} />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <SuccessForm />
      )}
    </>
  );
}
export default ReConsignmentPage;
