"use client";
import React, { useState } from "react";
import { Button, FormCheck, Row } from "react-bootstrap";
import imagePro from "@public/user3.png";
import Image from "next/image";
import { FormInput } from "@components/FormCustom/FormInput";
import { ProfileModel } from "@models/ProfileModel";
import { useLoaderContext } from "@components/context/LoaderContext";

function page() {
  const [form, setForm] = useState(ProfileModel);
  const {session} = useLoaderContext();
  const handleForm = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
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
          <Row className="mb-3">
            <FormInput
              groupClass="col-lg-6"
              value={form?.firstname}
              label="ชื่อ"
              placeholder="ชื่อ"
              name="firstname"
              onChange={handleForm}
              required
            />
            <FormInput
              groupClass="col-lg-6"
              value={form?.lastname}
              label="นามสกุล"
              placeholder="นามสกุล"
              name="lastname"
              onChange={handleForm}
              required
            />
          </Row>
          <Row className="mb-3">
            <FormInput
              groupClass="col-lg-6"
              value={session?.user?.name}
              label="อีเมล"
              placeholder="อีเมล"
              disabled
              name="email"
              onChange={handleForm}
              required
            />
            <FormInput
              groupClass="col-lg-6"
              value={form?.phone_number}
              label="เบอร์โทรศัพท์"
              placeholder="เบอร์โทรศัพท์"
              name="phone_number"
              onChange={handleForm}
              required
            />
          </Row>
          <Row className="mb-3">
            <FormInput
              groupClass="col-lg-6"
              value={form?.line}
              label="Line ID"
              placeholder="Line ID"
              name="line"
              onChange={handleForm}
              required
            />
          </Row>
          <Row className="mb-3">
            <FormInput
              groupClass="col-lg-6"
              value={form?.license_id}
              label="เลขบัตรประชาชน"
              placeholder="กรุณากรอกหมายเลขบัตรประชาชน"
              name="license_id"
              onChange={handleForm}
              required
            />
          </Row>
          <div className="d-flex justify-content-end">
            <Button variant="primary">บันทึกการเปลี่ยนแปลง</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
