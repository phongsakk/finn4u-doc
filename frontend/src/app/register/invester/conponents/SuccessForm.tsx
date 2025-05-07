import ImagerRegstep1 from "@public/reg-step1.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function SuccessForm() {
  return (
    <div className="p-2">
      <div className="text-center">
        <Image
          src={ImagerRegstep1}
          alt=""
          style={{ width: "40%", height: "auto" }}
        />
        <h2 className="text-primary font2">ลงทะเบียนสำเร็จ</h2>
        <p className="font2">ลงทะเบียนเป็นนักลงทุนกับ Finn4U</p>
        <p className="font2">จะมีเจ้าหน้าที่ติดต่อกลับภายใน 3-5 วันทำการ</p>
      </div>

      <div className="submit-group">
        <Link
          href="/"
          className="btn btn-primary"
          role="buttom"
        >
          กลับสู่หน้าหลัก
        </Link>
      </div>
    </div>
  );
}
export default SuccessForm;
