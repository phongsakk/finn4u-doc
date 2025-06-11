"use client";
import { FormInput } from "@component/FormCustom/FormInput";
import { financeDoc } from "@models/finance";
import React, { useState } from "react";
import { Button, Row } from "react-bootstrap";

function page() {
  const [form, setForm] = useState(financeDoc);
  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (<>
    <Row className="">
      <InputCustom name="test" label="โฉนดที่ดิน" onChange={handleForm} />
      <InputCustom name="test" label="น.ส.3" onChange={handleForm} />
      <InputCustom name="test" label="น.ส.3ก" onChange={handleForm} />
    </Row>
    <hr className="mb-3"/>
    <Row className="border-bottom mb-3">
      <InputCustom name="test" className="col-12 mb-3" label="บัตรประจำตัวประชาชนผู้ขายฝาก" labelEnd="เอกสาร" onChange={handleForm} />
      <InputCustom name="test" className="col-12 mb-3" label="บัตรประจำตัวประชาชนนักลงทุน" labelEnd="เอกสาร" onChange={handleForm} />
    </Row>
    <Row className="border-bottom mb-3">
      <InputCustom name="test" className="col-12 mb-3" label="สำเนาทะเบียนบ้านผู้ขายฝาก" labelEnd="เอกสาร" onChange={handleForm} />
      <InputCustom name="test" className="col-12 mb-3" label="สำเนาทะเบียนบ้านนักลงทุน" labelEnd="เอกสาร" onChange={handleForm} />
    </Row>
    <Row className="border-bottom mb-3">
      <InputCustom name="test" className="col-12 mb-3" label="หนังสือรับรองราคาประเมินทุนทรัพย์ที่ดิน" labelEnd="เอกสาร" onChange={handleForm} />
      <InputCustom name="test" className="col-12 mb-3" label="สัญญามอบอำนาจที่ดิน" labelEnd="เอกสาร" onChange={handleForm} />
      <InputCustom name="test" className="col-12 mb-3" label="สัญญาการขายฝากกับ ทุนทันใจ" labelEnd="เอกสาร" onChange={handleForm} />
    </Row>
    <Row className="justify-content-center gap-2">
        <Button variant="success" className="col-2">บันทึก</Button>
        <Button variant="light" className="col-2">ปิด</Button>
    </Row>
  </>
  );
}

export default page;

const InputCustom = ({
  name = "",
  label = "",
  labelClass = "",
  labelEnd = "ดูตัวอย่าง",
  afterLabel,
  className = "mb-3",
  onChange,
}: {
  name: string;
  label?: string;
  labelClass?: string;
  labelEnd?: string;
  className?: string;
  afterLabel?: React.JSX.Element;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Row className={`col-4 align-items-center ${className}`}>
      <div className={`col-lg-4 fw-bold ${labelClass}`}>
        {label} {afterLabel ?? <></>}
      </div>
      <label className="col-4 btn btn-light" htmlFor={label}>อัพโหลด</label>
      <input type="file" id={`${label}`} className="d-none" />
      <div className="col-lg-3 text-success"><u>{labelEnd}</u></div>
    </Row>
  );
};
