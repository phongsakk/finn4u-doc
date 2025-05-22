"use client";
import { FormInput } from "@components/FormCustom/FormInput";
import { ChangePassModel } from "@models/ProfileModel";
import React, { useState } from "react";
import { Button, Row } from "react-bootstrap";

function page() {
  const [form, setForm] = useState(ChangePassModel);
  const handleForm = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.targat.name]: e.target.value,
    }));
  };
  return (
    <>
      <div className="rounded bg-white overflow-hidden">
        <div className="py-3 px-4 text-white bg-primary">เปลี่ยนรหัสผ่าน</div>
        <div className="py-3 px-4">
          <Row className="mb-3">
            <FormInput
              groupClass="col-lg-6"
              value={form?.old_password}
              name="old_password"
              label="รหัสผ่านเดิม"
              placeholder="รหัสผ่านเดิม"
              onChange={handleForm}
              required
            />
          </Row>
          <Row className="mb-3">
            <FormInput
              groupClass="col-lg-6"
              value={form?.new_password}
              name="new_password"
              label="รหัสผ่านใหม่"
              placeholder="รหัสผ่านใหม่"
              onChange={handleForm}
              required
            />
          </Row>
          <div className="text-secondary">
            *รหัสผ่านต้องมีความยาว 8 ตัวอักษรขึ้นไป
          </div>
          <div className="text-secondary">*1 ตัวอักษรพิมพ์ใหญ่ (A-Z)</div>
          <div className="text-secondary">*1 ตัวอักษรพิมพ์เล็ก (a-z)</div>
          <div className="text-secondary">
            *1 สัญลักษณ์พิเศษ (@ # $ % & * ( ) _ !)
          </div>
          <div className="text-secondary">*1 ตัวเลข (0-9)</div>
          <Row className="mb-3 mt-3">
            <FormInput
              groupClass="col-lg-6"
              value={form?.confirm_password}
              name="confirm_password"
              label="ยืนยันรหัสผ่าน"
              placeholder="ยืนยันรหัสผ่าน"
              onChange={handleForm}
              required
            />
          </Row>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <Button variant="primary">บันทึกการเปลี่ยนแปลง</Button>
      </div>
    </>
  );
}

export default page;
