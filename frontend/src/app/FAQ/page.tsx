"use client";
import Image from "next/image";
import React, { useState } from "react";
import banner from "@public/bg-interest.png";
import { Button, Collapse, Row } from "react-bootstrap";
import { GoShareAndroid } from "react-icons/go";
import { RiArrowDownSLine } from "react-icons/ri";

function page() {
  return (
    <div className="bg-success pb-5 position-relative">
      <Image
        src={banner}
        alt=""
        width={100}
        height={100}
        style={{ width: "100%", height: "100%" }}
        sizes="100vm"
        priority
      />
      <div
        className="text-success container position-relative bg-white py-4 px-1 px-sm-2 px-md-3 px-lg-4"
        style={{ marginTop: "-100px", borderRadius: "25px" }}
      >
        <h3 className="mb-4 fw-bold">คำถามที่พบบ่อย</h3>
        <div
          className="d-flex justify-content-between align-items-end mb-5"
          style={{ borderBottom: "solid 3px #248968" }}
        ></div>
        <div className="container">
          {[...Array(5)].map((_, index) => (
            <FAQItem key={index} />
          ))}
        </div>
        <Button className="rounded-circle border mt-5" variant="">
          <GoShareAndroid size={15} />
        </Button>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Row className="w-100">
          <div className="col-6 text-center">
            <Button className="bg-white rounded-pill" variant="outline-success">
              ลงทะเบียนเป็น ผู้ขายฝาก
            </Button>
          </div>
          <div className="col-6 text-center">
            <Button className="bg-white rounded-pill" variant="outline-success">
              ลงทะเบียนเป็น นักลงทุน
            </Button>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default page;

const FAQItem = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="border-bottom py-3 ">
      <div
        className="d-flex justify-content-between text-primary"
        onClick={handleOpen}
        style={{ cursor: "pointer" }}
      >
        <span>เกี่ยวกับ ทุนทันใจ</span>
        <RiArrowDownSLine size={20} />
      </div>
      <Collapse in={open}>
        <div className="text-secondary px-3 py-3">
          ทุนทันใจ เป็น Matching Platform
          โดยการรวบรวมพื้นที่ทรัพย์สินขายฝากจากผู้ขายฝากและ นักลงทุนไว้ด้วยกัน
          เพื่อเพิ่มประสิทธิภาพการขายฝากที่ดินที่มีอัตราดอกเบี้ยใกล้เคียงกับสถาบัน
          การเงิน โดยจะควบคุมดอกเบี้ย และระยะเวลาขายฝากที่เหมาะสม
          อีกทั้งยังสามารถช่วยเพิ่ม อัตราผลตอบแทนของฝั่งนักลงทุนมากถึง 9 – 12 %
          ต่อปีโดยมีหลักทรัพย์ค้ำประกันที่ประเมิน
          คุณภาพและมูลค่าตามหลักเกณฑ์ของบริษัทพันธมิตรในการกำกับของ
          คณะกรรมการกำกับ หลักทรัพย์และตลาดหลักทรัพย์ (กลต.)
        </div>
      </Collapse>
    </div>
  );
};
