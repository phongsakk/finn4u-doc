"use client";
import { formatNumber } from "@component/dev/Helpers";
import { LoadPage } from "@component/dev/LoadPage";
import { FormInput } from "@component/FormCustom/FormInput";
import { FormSelectCustom } from "@component/FormCustom/FormSelectCustom";
import { financeForm } from "@models/finance";
import { api } from "@utils/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";

const percentItem = [
  { id: 9, name: "9%" },
  { id: 10, name: "10%" },
  { id: 11, name: "11%" },
  { id: 12, name: "12%" },
  { id: 13, name: "13%" },
  { id: 14, name: "14%" },
  { id: 15, name: "15%" },
];

function FinanceModal({
  model,
  CloseModel,
}: {
  model: any;
  CloseModel: () => void;
}) {
  const [form, setForm] = useState(financeForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    const regex = /^(\d+(\.\d*)?|\.\d+)$/;

    if (regex.test(value) || value === "") {
      const lastChar = value.charAt(value.length - 1);

      setForm((prev) => ({
        ...prev,
        [e.target.name]: `${formatNumber(Number(value))}${
          lastChar == "." ? "." : ""
        }`,
      }));
    }
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const boot = async () => {
      try {
        setLoading(true);
        const { data: res } = await axios.get(
          api.internal(`/api/finance/${model.id}`)
        );
        if (res.status) {
          setForm(res?.data);
        }
      } finally {
        setLoading(false);
      }
    };
    if (model.id != 0) {
      boot();
    } else {
      setForm(financeForm);
    }
  }, [model.id]);

  const total =
    Num(form?.land_transfer) +
    Num(form?.duty) +
    Num(form?.witness) +
    PercentTo(form?.appraisal_price, form?.land_transfer_tax) +
    PercentTo(form?.appraisal_price, form?.stamp) +
    PercentTo(form?.appraisal_price, form?.specific_business_tax) +
    PercentTo(form?.appraisal_price, form?.percent);

  const interest_rate = PercentTo(form?.appraisal_price, form?.percent);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      total: String(total),
      interest_rate: String(interest_rate),
      price_received: String(Num(form?.appraisal_price) - total),
    }));
  }, [total, interest_rate]);

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
        {loading ? (
          <LoadPage />
        ) : (
          <Row className="justify-content-center">
            <InputCustom
              label="ราคาขายฝากจากการประเมิน"
              name="appraisal_price"
              className="mb-5"
              value={form?.appraisal_price}
              onChange={handleChange}
              disabled
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
              isPercent
            />
            <InputCustom
              label="ค่าอากรแสตมป์"
              labelEnd="(ของราคาประเมิน)"
              name="stamp"
              value={form?.stamp}
              isPercent
              onChange={handleChange}
            />
            <InputCustom
              label="ค่าภาษีธุกิจเฉพาะ"
              labelEnd="(ของราคาประเมิน)"
              name="specific_business_tax"
              value={form?.specific_business_tax}
              isPercent
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
                  groupClass="col-lg-5"
                  onChange={handleSelect}
                  required
                />
              }
              value={formatNumber(Num(form?.interest_rate))}
              onChange={handleChange}
              disabled
            />
            <InputCustom
              className="mb-5"
              label="รวม"
              name="total"
              value={formatNumber(Num(form?.total))}
              onChange={handleChange}
              disabled
            />
            <InputCustom
              label="ราคาที่ได้รับ"
              name="price_received"
              value={formatNumber(Num(form?.price_received))}
              onChange={handleChange}
              disabled
            />
            <Row className="justify-content-center mt-4">
              <Button className="col-2 me-1" variant="success">
                บันทึก
              </Button>
              <Button
                className="col-2 ms-1"
                variant="light"
                onClick={CloseModel}
              >
                ปิด
              </Button>
            </Row>
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default FinanceModal;

const InputCustom = ({
  name = "",
  label = "",
  labelClass = "",
  labelEnd = "บาท",
  afterLabel,
  className = "mb-3",
  value = "",
  isPercent = false,
  disabled = false,
  onChange,
}: {
  name: string;
  label?: string;
  labelClass?: string;
  labelEnd?: string;
  className?: string;
  afterLabel?: React.JSX.Element;
  value: any;
  isPercent?: boolean;
  disabled?: boolean;
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
        value={`${value}${isPercent ? " %" : ""}`}
        onChange={onChange}
        disabled={disabled}
      />
      <div className="col-lg-3">{labelEnd}</div>
    </Row>
  );
};

const Num = (input: string | undefined | null): number => {
  const str = String(input ?? "");
  const cleaned = str.replace(/,/g, "");
  const parsed = Number(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

const PercentTo = (
  input1: string | undefined,
  input2: string | undefined
): number => {
  const result = (Num(input1) * Num(input2)) / 100;
  return isNaN(result) ? 0 : result;
};
