"use client";
import { FormInput } from "@component/FormCustom/FormInput";
import { FormSelectCustom } from "@component/FormCustom/FormSelectCustom";
import { financeForm } from "@models/finance";
import React, { useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";

const percentItem = [{ id: 1, name: "9%" }];

function FinanceModal({
  model,
  CloseModel,
}: {
  model: any;
  CloseModel: () => void;
}) {
  const [form, setForm] = useState(financeForm);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <Modal size="lg" show={model?.show} onHide={CloseModel}>
      <Modal.Body>
        <div className="text-end">
          <Button
            variant="close"
            className="rounded-circle bg-danger p-2 text-white"
            size="sm"
            onClick={CloseModel}
          ></Button>
        </div>
        <h2 className="text-success fw-bold border-bottom mb-3 text-center">
          ค่าธรรมเนียมโอนที่ดิน
        </h2>
        <Row className="justify-content-center">
          <InputCustom
            label="ราคาขายฝากจากการประเมิน"
            name="appraisal_price"
            className="mb-5"
            value={form?.appraisal_price}
            onChange={handleChange}
          />
          <InputCustom
            label="ค่าคำขอโอนที่ดิน"
            name="land_transfer"
            value={form?.land_transfer}
            onChange={handleChange}
          />
          <InputCustom
            label="ค่าอากร"
            name="duty"
            value={form?.duty}
            onChange={handleChange}
          />
          <InputCustom
            label="ค่าพยาน"
            name="witness"
            value={form?.witness}
            onChange={handleChange}
          />
          <InputCustom
            label="ค่าธรรมเนียมโอนที่ดิน"
            labelEnd="(ของราคาประเมิน)"
            name="land_transfer_tax"
            value={form?.land_transfer_tax}
            onChange={handleChange}
          />
          <InputCustom
            label="ค่าอากรแสตมป์"
            labelEnd="(ของราคาประเมิน)"
            name="stamp"
            value={form?.stamp}
            onChange={handleChange}
          />
          <InputCustom
            label="ค่าภาษีธุกิจเฉพาะ"
            labelEnd="(ของราคาประเมิน)"
            name="specific_business_tax"
            value={form?.specific_business_tax}
            onChange={handleChange}
          />
          <InputCustom
            label="อัตราดอกเบี้ย"
            labelEnd="บาท/ปี"
            labelClass="d-flex gap-2 align-items-center"
            name="interest_rate"
            afterLabel={
              <FormSelectCustom
                data={percentItem as []}
                value={form?.percent}
                name="percent"
                onChange={handleSelect}
              />
            }
            value={form?.interest_rate}
            onChange={handleChange}
          />
          <InputCustom
            className="mb-5"
            label="รวม"
            name="total"
            value={form?.total}
            onChange={handleChange}
          />
          <InputCustom
            label="ราคาที่ได้รับ"
            name="price_received"
            value={form?.price_received}
            onChange={handleChange}
          />
          <Row className="justify-content-center mt-4">
            <Button className="col-2 me-1" variant="success">
              บันทึก
            </Button>
            <Button className="col-2 ms-1" variant="light" onClick={CloseModel}>
              ปิด
            </Button>
          </Row>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default FinanceModal;

const InputCustom = ({
  name = "",
  label = "",
  labelClass="",
  labelEnd = "บาท",
  afterLabel,
  className = "mb-3",
  value = "",
  onChange,
}: {
  name: string;
  label?: string;
  labelClass?:string;
  labelEnd?: string;
  className?: string;
  afterLabel?: React.JSX.Element;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Row className={`col-11 align-items-center ${className}`}>
      <div className={`col-lg-5 ps-5 ${labelClass}`}>
        {label} {afterLabel ?? <></>}
      </div>
      <FormInput
        className="col-lg-4"
        name={name}
        value={value}
        onChange={onChange}
      />
      <div className="col-lg-3">{labelEnd}</div>
    </Row>
  );
};
