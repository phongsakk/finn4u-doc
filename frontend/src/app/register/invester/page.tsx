"use client";
import Image from "next/image";
import ImageBannerregis1 from "@public/banner_regis1.png";
import ImagePolygon2 from "@public/Polygon2.png";
import ImagerRegstep1 from "@public/reg-step1.png";
import ImagerRegstep2 from "@public/reg-step2.png";
import ImagerRegstep3 from "@public/reg-step3.png";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import SuccessForm from "./conponents/SuccessForm";
import PersonalForm from "./conponents/PersonalForm";
import { regisPersonalInvester } from "@models/register/invester";
import OTPForm from "./conponents/OTPForm";
import TermsAndCon from "./conponents/TermsAndCon";
import VerifyForm from "./conponents/VerifyForm";
import AddDoc from "./conponents/AddDoc";

function ReConsignmentPage() {
  const [personal, setPersonal] = useState<regisPersonalInvester>();
  //   {
  //   UserID: 1,
  //   Phone: "0666666664",
  //   Email: "kengker1144+test17@gmail.com",
  //   Ref: "VSGCV",
  //   info: {
  //     email: "kengker1144+test17@gmail.com",
  //     password: "12345678",
  //     confirm_password: "12345678",
  //     user_prefix_id: 1,
  //     firstname: "test02",
  //     lastname: "test-1",
  //     phone_number: "0666666664",
  //     online_range: "15:00",
  //     career_id: 1,
  //     salary: "30000",
  //     address_number: "1",
  //     street_number: "2",
  //     province_id: 11,
  //     district_id: 2009,
  //     sub_district_id: 200902,
  //     beneficialy: "ชื่ออออ",
  //     relation: "เมีย",
  //     interest_district_id: 1,
  //     asset_type_id: 7,
  //     investment_amount: 12312345,
  //     beneficiary: "ก",
  //   },
  // }
  const [step, setStep] = useState<number>(1); // defult 1
  const [checkstep, setCheckStep] = useState<number>(0); //defult 0

  useEffect(() => {
    if (step > checkstep) {
      setCheckStep(step - 1);
    }
  }, [step]);
  return (
    <>
      <div className="banner-regis">
        <Image
          src={ImageBannerregis1}
          alt=""
          style={{ height: "auto" }}
          priority
        />
      </div>
      {step < 6 ? (
        <>
          <div className="register-seller">
            <div className="container">
              <div className="card-form-main">
                <div className="wrap">
                  <h4 className="title-main font2">
                    ลงทะเบียนเป็นนักลงทุนกับ Finn4U
                  </h4>
                  <div className="step justify-content-lg-between justify-content-center">
                    <div
                      className={`child ${
                        ![1, 2, 3].includes(step) ? "d-none d-lg-block" : ""
                      }`}
                    >
                      <Image src={ImagerRegstep1} alt="" priority />
                      <p
                        className={`font2 ${
                          [1, 2, 3].includes(step) ? "fw-bold" : ""
                        }`}
                      >
                        ลงทะเบียน
                      </p>
                    </div>
                    <div className="polygon d-none d-lg-block">
                      <Image src={ImagePolygon2} alt="" priority />
                    </div>
                    <div
                      className={`child ${
                        ![4].includes(step) ? "d-none d-lg-block" : ""
                      }`}
                    >
                      <Image src={ImagerRegstep2} alt="" priority />
                      <p
                        className={`font2 ${
                          [4].includes(step) ? "fw-bold" : ""
                        }`}
                      >
                        ยืนยันตัวตน
                      </p>
                    </div>
                    <div className="polygon d-none d-lg-block">
                      <Image src={ImagePolygon2} alt="" priority />
                    </div>
                    <div
                      className={`child ${
                        ![5].includes(step) ? "d-none d-lg-block" : ""
                      }`}
                    >
                      <Image src={ImagerRegstep3} alt="" priority />
                      <p
                        className={`font2 ${
                          [5].includes(step) ? "fw-bold" : ""
                        }`}
                      >
                        อัพโหลดเอกสาร
                      </p>
                    </div>
                  </div>
                </div>
                {step === 1 && (
                  <PersonalForm
                    personal={personal}
                    checkStep={checkstep >= 1}
                    setPersonal={setPersonal}
                    setStep={setStep}
                  />
                )}
                {personal !== undefined && (
                  <>
                    {step === 2 && (
                      <OTPForm
                        checkStep={checkstep >= 2}
                        personal={personal}
                        setStep={setStep}
                      />
                    )}
                    {step === 3 && (
                      <TermsAndCon
                        checkStep={checkstep >= 3}
                        setStep={setStep}
                      />
                    )}
                    {step === 4 && (
                      <VerifyForm
                        checkStep={checkstep >= 4}
                        setStep={setStep}
                      />
                    )}
                    {step === 5 && (
                      <AddDoc checkStep={checkstep >= 5} setStep={setStep} />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="register-seller">
          <div className="container">
            <div className="card-form-main">
              <div className="wrap">
                <h4 className="title-main font2">
                  ลงทะเบียนเป็นผู้ขายฝากกับ Finn4U
                </h4>
                <SuccessForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ReConsignmentPage;
