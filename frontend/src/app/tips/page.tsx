import CustomImage from "@components/CustomImage";
import ComingSoon from "@components/errorpage/ComingSoon";
import Link from "next/link";
import React from "react";
import { Row } from "react-bootstrap";

function page() {
  const menu = [
    {
      name: "บทความทั้งหมด",
      href: "#",
    },
    {
      name: "ข่าวสารและประชาสัมพันธ์",
      href: "#",
    },
    {
      name: "ขายฝาก",
      href: "#",
    },
    {
      name: "อสังหาริมทรัพย์",
      href: "#",
    },
    {
      name: "ความรู้ทางการเงิน",
      href: "#",
    },
    {
      name: "ทั่วไป",
      href: "#",
    },
  ];

  return (
    <>
      <h3 className="my-4 fw-bold text-center text-success">
        ทุนทันใจ เคล็ดลับเรื่องอสังหาฯ
      </h3>
      <div className="px-1 px-sm-3 px-md-4 px-lg-5 mb-3">
        <Row className="py-3 px-2 px-sm-2 px-md-3 px-lg-5 bg-white justify-content-between shadow tips">
          {menu.map((Item, index) => (
            <Link
              href={Item.href}
              className="tips-btn-catagory col-6 col-sm-4 col-md-4 col-lg-2 text-start text-sm-start text-md-center text-lg-center text-secondary"
              key={index}
            >
              {Item.name}
            </Link>
          ))}
        </Row>
      </div>
      <div className="container my-5">
        <Row>
          {[...Array(15)].map((_, index) => (
            <div className="col-lg-4 mb-3" key={index}>
              <div className="card">
                <CustomImage src="/fin-1.png" alt="fin-1" />
                <div className="card-body">
                  <div className="date">
                    <CustomImage
                      src="/book.svg"
                      alt="book"
                      style={{
                        width: "6%",
                        height: "auto",
                      }}
                    />
                    <span>12 พ.ค. 2565</span>
                  </div>
                  <p>อัตราดอกเบี้ยขายฝากที่ดินตามกฎหมาย</p>
                  <p>
                    ปกติแล้วในการทำธุรกรรมขายฝากที่ดินนั้นอัตราดอก
                    เบี้ยขายฝากที่ดินจะถูกกำหนดไว้ตามกฎหมายโดยใช้
                    ข้อบังคับของกฎหมายขายฝากคือพระราชบัญญัติ..
                  </p>
                  <Link href="/tips/1" className="d-flex justify-content-end">
                    อ่านต่อ
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Row>
      </div>
    </>
  );
}

export default page;
