"use client";
import Image from "next/image";
import React, { useState } from "react";
import EditImage from "@/public/edit.svg";
import { Button } from "react-bootstrap";
import FAQModal from "@component/modals/faq/FAQModal";
type FaqType = {
  id?: number;
  show?: boolean;
};

const faq = {
  id: 0,
  show: false,
};

function page() {
  const [faqModal, setFaqModal] = useState<FaqType>(faq);

  const OpenFAQ = (num?: number) => {
    setFaqModal({ id: num, show: true });
  };

  const CloseFAQ = () => {
    setFaqModal({ id: 0, show: false });
  };
  return (
    <>
      <FAQModal faqModal={faqModal} CloseFAQ={CloseFAQ} />
      <table>
        <thead>
          <tr className="border-bottom fw-bold">
            <th className="py-2" style={{ width: "20%" }}>
              คำถาม
            </th>
            <th className="py-2" style={{ width: "70%" }}>
              คำตอบ
            </th>
            <th className="py-2" style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="border-bottom">
              <td className="py-2 align-top">เกี่ยวกับ ทุนทันใจ</td>
              <td className="py-2 align-top">
                ทุนทันใจ เป็น Matching Platform
                โดยการรวบรวมพื้นที่ทรัพย์สินขายฝากจากผู้ขายฝากและ
                นักลงทุนไว้ด้วยกัน
                เพื่อเพิ่มประสิทธิภาพการขายฝากที่ดินที่มีอัตราดอกเบี้ยใกล้เคียงกับสถาบัน
                การเงิน โดยจะควบคุมดอกเบี้ย และระยะเวลาขายฝากที่เหมาะสม
                อีกทั้งยังสามารถช่วยเพิ่ม อัตราผลตอบแทนของฝั่งนักลงทุนมากถึง 9 –
                12 % ต่อปีโดยมีหลักทรัพย์ค้ำประกันที่ประเมิน
                คุณภาพและมูลค่าตามหลักเกณฑ์ของบริษัทพันธมิตรในการกำกับของ
                คณะกรรมการกำกับ หลักทรัพย์และตลาดหลักทรัพย์ (กลต.)
              </td>
              <td className="text-center">
                <Button
                  variant=""
                  className="border"
                  onClick={() => OpenFAQ(index+1)}
                >
                  <Image src={EditImage} className="" alt="" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default page;
