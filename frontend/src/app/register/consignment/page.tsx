"use client";
import Image from "next/image";
import ImageBannerregis1 from "@public/banner_regis1.png";
import ImagePolygon2 from "@public/Polygon2.png";
import ImagerRegstep1 from "@public/reg-step1.png";
import ImagerRegstep2 from "@public/reg-step2.png";
import ImagerRegstep3 from "@public/reg-step3.png";
import PersonalForm from "./components/PersonalForm";
import { useState } from "react";
import { redirect } from "next/navigation";

function ReConsignmentPage() {
  const [phone, setPhone] = useState<string>();
  if (phone != undefined) {
    alert("สมัครามาชิคสำเร็จ");
    redirect(process.env.NEXT_PUBLIC_AUTH_URL as string);
  }
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
      <div className="register-seller">
        <div className="container">
          <div className="card-form-main">
            <div className="wrap">
              <h4 className="title-main font2">
                ลงทะเบียนเป็นผู้ขายฝากกับ Finn4U
              </h4>
              <div className="step">
                <div className="child">
                  <Image src={ImagerRegstep1} alt="" priority />
                  <p className="font2 fw-bold">ลงทะเบียน</p>
                </div>
                <div className="polygon">
                  <Image src={ImagePolygon2} alt="" priority />
                </div>
                <div className="child">
                  <Image src={ImagerRegstep2} alt="" priority />
                  <p className="font2">ยืนยันตัวตน</p>
                </div>
                <div className="polygon">
                  <Image src={ImagePolygon2} alt="" priority />
                </div>
                <div className="child">
                  <Image src={ImagerRegstep3} alt="" priority />
                  <p className="font2">อัพโหลดเอกสาร</p>
                </div>
              </div>
            </div>
            <PersonalForm setPhone={setPhone} />
          </div>
        </div>
      </div>
    </>
  );
}
export default ReConsignmentPage;
