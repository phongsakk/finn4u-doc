"use client";
import Image from "next/image";
import ImageBannerregis1 from "@public/banner4.png";
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
import { AddressProvider } from "@components/context/AddressContext";

function ReConsignmentPage() {
  const [personal, setPersonal] = useState<regisPersonalInvester>();
  // {
  //   "UserID": 35,
  //   "Phone": "0666666664",
  //   "Email": "kengker1144+test38@gmail.com",
  //   "Ref": "JBLGKH",
  //   "info": {
  //     "email": "kengker1144+test38@gmail.com",
  //     "password": "12345678",
  //     "confirm_password": "12345678",
  //     "user_prefix_id": 1,
  //     "firstname": "1",
  //     "lastname": "lastname",
  //     "phone_number": "0666666664",
  //     "online_range": "15:00",
  //     "career_id": 2,
  //     "salary": "90000",
  //     "address_number": "addd",
  //     "street_number": "112",
  //     "province_id": 17,
  //     "district_id": 2601,
  //     "sub_district_id": 260111,
  //     "beneficiary": "เมีย",
  //     "relation": "เมีย",
  //     "interest_district_id": null,
  //     "asset_type_id": 3,
  //     "investment_amount": 500000
  //   }
  // }

  console.log(personal);
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
                    ลงทะเบียนเป็นนักลงทุนกับ ทุนทันใจ
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
                  <AddressProvider>
                    <PersonalForm
                      personal={personal}
                      checkStep={checkstep >= 1}
                      setPersonal={setPersonal}
                      setStep={setStep}
                    />
                  </AddressProvider>
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
