import Image from "next/image";
import React from "react";
import banner from "@public/bg-interest.png";
import { Button, Row } from "react-bootstrap";
import { GoShareAndroid } from "react-icons/go";

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
        <h3 className="mb-4 fw-bold">อัตราดอกเบี้ยขายฝากที่ดินตามกฎหมาย</h3>
        <div
          className="d-flex justify-content-between align-items-end mb-5"
          style={{ borderBottom: "solid 3px #248968" }}
        >
          <h5>#ทุนทันใจ #ทุนทันใจtips #เคล็ดลับอสังหาฯ</h5>
          <h5>12 พ.ค. 2563</h5>
        </div>
        <div className="mb-5">
          ปกติแล้วในการทำธุรกรรมขายฝากที่ดินนั้นอัตราดอกเบี้ยขายฝากที่ดินจะถูกกำหนดไว้ตามกฎหมายโดยใช้ข้อบังคับของ
          กฎหมายขายฝาก
          คือพระราชบัญญัติคุ้มครองประชาชนในการทำสัญญาขายฝากที่ดินเพื่อเกษตรกรรมหรือที่อยู่อาศัย
          พ.ศ. 2562 ซึ่งมีการประกาศบังคับใช้เมื่อเดือนเมษายน ปี
          2562เพื่อคุ้มครองผู้ขายฝากที่เป็นบุคคลธรรมดาให้ได้รับความ
          เป็นธรรมจากการทำสัญญาขายฝาก
        </div>
        <h5 className="fw-bold">
          กฎหมายกำหนดอัตราดอกเบี้ยขายฝากที่ดินเท่าไหร่?
        </h5>
        <div className="text-dark">
          ตามกฎหมายขายฝาก จำนวนสินไถ่จะกำหนดไว้สูงกว่าราคาขายฝากก็ได้
          แต่เมื่อคำนวณเป็นดอกเบี้ยแล้ว ต้องไม่เกินร้อยละสิบห้าต่อปี ของราคา
          ขายฝากที่แท้จริงคำนวณนับแต่วันที่ขายฝากจนถึงวันครบกำหนดเวลาไถ่ อ้างอิง
          ตามประมวลกฎหมายแพ่งและพาณิชย์ มาตรา 499
        </div>
        <div className="mt-2 mb-3">
          “สินไถ่นั้นถ้าไม่ได้กำหนดกันไว้ว่าเท่าใดไซร้ท่านให้ไถ่ตามราคาที่ขายฝาก”
        </div>
        <div className="mb-3">
          “ถ้าปรากฏในเวลาไถ่ว่าสินไถ่หรือราคาขายฝากที่กำหนดไว้สูงกว่าราคาขายฝากที่แท้จริงเกินอัตราร้อยละสิบห้าต่อปีให้ไถ่ได้ตามราคาขายฝากที่แท้จริงรวมประโยชน์ตอบแทนร้อยละสิบห้าต่อปี”
        </div>
        <div className="text-dark">
          <small className="text-success fw-bold">สินไถ่</small> คือ
          จำนวนเงินที่ผู้ขายฝากต้องนำมาชำระแก่ผู้รับซื้อฝาก
          เพื่อขอไถ่เอาทรัพย์สินที่ขายฝากคืน และสินไถ่จะต้องเป็นเงินสดเสมอ
          ไถ่ถอนกันด้วย ทรัพย์สินอย่างอื่นไม่ได้ เมื่อมีการทำสัญญา
          <small className="text-success fw-bold px-2">‘ขายฝาก’</small>
          กรรมสิทธิ์ในทรัพย์สินจะตกไปเป็นของผู้ซื้อฝากทันที
          โดยมีข้อตกลงว่าผู้ขายฝากอาจไถ่ ทรัพย์สินนั้นคืนได้ภายในเวลาที่กำหนด
          หากผู้ขายฝากต้องการไถ่ทรัพย์สินคืน ก็ต้องมอบ ‘สินไถ่’ ให้กับผู้ซื้อฝาก
          จึงจะได้รับสินทรัพย์นั้นคืน
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
