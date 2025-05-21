import { IconCusttom } from "@components/common";
import { ToDateThai } from "@components/helpers";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, Row } from "react-bootstrap";
function page() {
  return (
    <div className="rounded bg-white overflow-hidden">
      <div className="py-3 px-4 text-white bg-primary">ประกาศของฉัน</div>
      <div className="py-3 px-4">
        <Row className="border ps-3 pt-3 pe-3 profile-menu-search gap-0 gap-lg-2 align-items-center mb-4">
          <Link className="col pb-3 text-center" href="#">
            ทั้งหมด (24)
          </Link>
          <Link className="col pb-3 text-center" href="#">
            ออนไลน์ (15)
          </Link>
          <Link className="col pb-3 text-center" href="#">
            ออฟไลน์ (3)
          </Link>
          <Link className="col pb-3 text-center" href="#">
            แบบร่าง (3)
          </Link>
          <Link className="col pb-3 text-center" href="#">
            ถูกระงับ (3)
          </Link>
        </Row>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="mb-4">
            <div className="property-group  bg-white px-2 mb-3">
              <div className="row shadow">
                <div className="col-lg-7 px-0">
                  <div className="relative pe-none h-100">
                    <div className="bg-light d-flex justify-content-center align-items-center h-100">
                      <Image
                        src="/video1.png"
                        className="object-fit-cover"
                        width={100}
                        height={100}
                        style={{ height: "100%" }}
                        alt=""
                        sizes="100vm"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 p-1 p-lg-3">
                  <label className="bg-light rounded font2 p-3 border mb-4">
                    กรุงเทพมหานคร
                  </label>
                  <div className="d-flex mb-4">
                    <IconCusttom src="/ic-lo1.svg" />
                    <span className="font2">
                      <span>เลขที่ฝากขาย</span>
                      <span className="px-2">
                        {String(12).padStart(5, "0")}
                      </span>
                    </span>
                  </div>
                  <div className="d-flex mb-4">
                    <IconCusttom src="/ic-lo2.svg" />
                    <span className="font2">20 ตารางวา</span>
                  </div>
                  <div className="d-flex mb-4">
                    <IconCusttom src="/mdi_location.svg" />
                    <span className="font2">ห้วยขวาง กรุงเทพมหานคร </span>
                  </div>
                  <div className="d-flex mb-4">
                    <IconCusttom src="/ic_calendar.svg" />
                    <span className="font2">
                      {ToDateThai(dayjs(), "D MMMM BBBB")}
                    </span>
                  </div>
                  <div className="fw-bold text-end text-primary h2">
                    ฿ 1,490,000
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="primary">แก้ไข</Button>
              <Button variant="success">ปิดประกาศ</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
