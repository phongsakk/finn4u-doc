import React from "react";
import { FormCheck, Row } from "react-bootstrap";
import imagePro from "@public/user3.png";
import Image from "next/image";

function page() {
  return (
    <div className="rounded bg-white overflow-hidden">
      <div className="py-3 px-4 text-white bg-primary">ข้อมูลส่วนตัว</div>
      <div className="py-3 px-4">
        <div className="d-flex flex-column align-items-center">
          <Image
            src={imagePro}
            alt=""
            className="col-3 object-fit-cover mb-3"
            width={100}
            height={100}
            style={{
              width: "150px",
              height: "auto",
            }}
            sizes="100vm"
          />
          <div className="text-secondary">เปลี่ยนรูปโปรไฟล์</div>
        </div>
        <label className="mb-3">คำนำหน้า</label>
        <div className="checklogin px-0">
          <div className="mb-3 form-check px-0">
            <FormCheck
              className="group gap-0 gap-ms-1 gap-lg-2 ms-1 ms-md-2 ms-lg-3"
              value="0"
              id="0"
              name="user_prefix_id"
              type="radio"
              label="ไม่ระบุ"
            />
            <FormCheck
              className="group gap-0 gap-ms-1 gap-lg-2 ms-1 ms-md-2 ms-lg-3"
              value="1"
              id="1"
              name="user_prefix_id"
              type="radio"
              label="นาย"
            />
            <FormCheck
              className="group gap-0 gap-ms-1 gap-lg-2 ms-1 ms-md-2 ms-lg-3"
              value="2"
              id="2"
              name="user_prefix_id"
              type="radio"
              label="นาง"
            />
            <FormCheck
              className="group gap-0 gap-ms-1 gap-lg-2 ms-1 ms-md-2 ms-lg-3"
              value="3"
              id="3"
              name="user_prefix_id"
              type="radio"
              label="นางสาว"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
