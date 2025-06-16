"use client";
import { AlertPrimary } from "@components/alert/SwalAlert";
import {
  LoaderProvider,
  useLoaderContext,
} from "@components/context/LoaderContext";
import CardToggle from "@components/investor/CardToggle";
import { EvidenceForm, EvidenceFormType } from "@models/EvidenceForm";
import { api } from "@utils/api/index";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Collapse, Form } from "react-bootstrap";

const DownLoadForm = {
  lease_agreement: "หนังสือสัญญาเช่า",
  lease_agreement_href: "หนังสือสัญญาเช่า.pdf",
  spouse_consent_letter: "หนังสือยินยอมคู่สมรส",
  spouse_consent_letter_href: "หนังสือยินยอมคู่สมรส.pdf",
  real_estate_agent_appointment_agreement:
    "สัญญาแต่งตั้งนายหน้าขายอสังหาริมทรัพย์",
  real_estate_agent_appointment_agreement_href:
    "สัญญาแต่งตั้งนายหน้าขายอสังหาริมทรัพย์.pdf",
  purchase_and_sale_agreement: "สัญญาจะซื้อจะขาย",
  purchase_and_sale_agreement_href: "สัญญาจะซื้อจะขาย.pdf",
  property_detail_sheet: "ใบลงรายละเอียดทรัพย์",
  property_detail_sheet_href: "ใบลงรายละเอียดทรัพย์.pdf",
  power_of_attorney: "ใบมอบอำนาจ",
  power_of_attorney_href: "ใบมอบอำนาจ_ทด21.pdf",
  condo_power_of_attorney: "หนังสือมอบอำนาจอาคารชุด (อ.ช.๒๑)",
  condo_power_of_attorney_href: "แบบฟอร์มหนังสือมอบอำนาจอาคารชุด (อ.ช.๒๑).pdf",
};

function UploadDocPage() {
  const { id } = useLoaderContext();
  const [form, setForm] = useState<EvidenceFormType>(EvidenceForm);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [submit, setSubmit] = useState(false);

  const handleToggle = (id: string) => {
    setActiveKey(activeKey === id ? null : id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmit(true);
      const { data: res } = await axios.post(
        api.internal(`/api/upload-evidence/${id}`),
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status) {
        AlertPrimary("บันทึกข้อมูลสำเร็จ", "success").then(() => {
          redirect("/property/success");
        });
      } else {
        AlertPrimary("บันทึกข้อมูลไม่สำเร็จ! กรุณาลองใหม่อีกครั้ง", "error");
      }
    } catch (error) {
      AlertPrimary("บันทึกข้อมูลไม่สำเร็จ! กรุณาลองใหม่อีกครั้ง", "error");
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className="promise">
      <div className="container">
        <div className="card-form-main">
          <div className="wrap">
            <div className="text-center">
              <h3>เอกสารสัญญา</h3>
              <p>
                ดาวน์โหลดเอกสาร (PDF)
                กรอกรายละเอียดให้ครบถ้วนจากนั้นแนบไฟล์เพื่อรอการตรวจสอบ
              </p>
            </div>
            <Form onSubmit={handleSubmit}>
              <Accordion className="upload-doc" activeKey={activeKey}>
                <CardToggle
                  name="lease_agreement"
                  href={DownLoadForm.lease_agreement_href}
                  text={DownLoadForm.lease_agreement}
                  handleToggle={handleToggle}
                  setForm={setForm}
                />
                <CardToggle
                  name="spouse_consent_letter"
                  href={DownLoadForm.spouse_consent_letter_href}
                  text={DownLoadForm.spouse_consent_letter}
                  handleToggle={handleToggle}
                  setForm={setForm}
                />
                <CardToggle
                  name="real_estate_agent_appointment_agreement"
                  href={
                    DownLoadForm.real_estate_agent_appointment_agreement_href
                  }
                  text={DownLoadForm.real_estate_agent_appointment_agreement}
                  handleToggle={handleToggle}
                  setForm={setForm}
                />
                <CardToggle
                  name="purchase_and_sale_agreement"
                  href={DownLoadForm.purchase_and_sale_agreement_href}
                  text={DownLoadForm.purchase_and_sale_agreement}
                  handleToggle={handleToggle}
                  setForm={setForm}
                />
                <CardToggle
                  name="property_detail_sheet"
                  href={DownLoadForm.property_detail_sheet_href}
                  text={DownLoadForm.property_detail_sheet}
                  handleToggle={handleToggle}
                  setForm={setForm}
                />
                <CardToggle
                  name="power_of_attorney"
                  href={DownLoadForm.power_of_attorney_href}
                  text={DownLoadForm.power_of_attorney}
                  handleToggle={handleToggle}
                  setForm={setForm}
                />
                <CardToggle
                  name="condo_power_of_attorney"
                  href={DownLoadForm.condo_power_of_attorney_href}
                  text={DownLoadForm.condo_power_of_attorney}
                  handleToggle={handleToggle}
                  setForm={setForm}
                />
              </Accordion>
              <div className="submit-group">
                <Button type="submit" variant="primary" className="font2" disabled={submit}>
                  {submit ? "กำลังบันทึก.." :"ถัดไป" } 
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadDocPage;
