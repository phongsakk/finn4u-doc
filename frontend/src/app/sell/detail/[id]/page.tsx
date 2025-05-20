import AssetPicture from "@components/dev/property/AssetPicture";
import { ToDateThai } from "@components/helpers";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, Row } from "react-bootstrap";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLine } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";


const images = [
  {
    id: 1,
    image: "test.jpg",
  },
  {
    id: 2,
    image: "test.jpg",
  },
  {
    id: 3,
    image: "test.jpg",
  },
  {
    id: 4,
    image: "test.jpg",
  },
];

function page() {
  return (
    <div className="container mt-3 py-2 p-lg-4 bg-white">
      <AssetPicture images={images} />
      <label className=" my-4 h2">
        🔥ขายบ้านเดี่ยว 39 ตร.วา 3 ห้องนอน 3 ห้องน้ำ จอดรถ 2 คัน โครงการ Casa
        Ville Bangyai🔥
      </label>
      <Link
        href="https://www.google.co.th/maps/place/กรุงเทพมหานคร"
        target="_blank"
        className="text-primary h4 font2 d-flex"
        style={{ textDecoration: "" }}
      >
        <IconCusttom src="/mdi_location.svg" /> <ins>กรุงเทพมหานคร</ins>
      </Link>
      <Row className="mb-3 justify-content-between">
        <div className="col-auto">
          <label className="btn btn-primary">ทาวน์เฮ้าส์</label>
        </div>
        <div className="col-auto d-flex align-items-center">
          <h3 className="text-primary px-2">฿ 5,199,000</h3>
          <small>บาท</small>
        </div>
      </Row>
      <hr />
      <div className="d-flex mb-4">
        <IconCusttom src="/ic-lo1.svg" />
        <span className="font2">
          <span>เลขที่ฝากขาย</span>
          <span className="px-2">{String(12).padStart(5, "0")}</span>
        </span>
      </div>
      <div className="d-flex mb-4">
        <IconCusttom src="/ic-lo2.svg" />
        <span className="font2">20 ตารางวา</span>
      </div>
      <div className="d-flex mb-4">
        <IconCusttom src="/bed.svg" />
        <span className="font2">3 ห้องนอน, 3 ห้องน้ำ, 2 ชั้น </span>
      </div>
      <div className="d-flex mb-4">
        <IconCusttom src="/ic_calendar.svg" />
        <span className="font2">{ToDateThai(dayjs(), "D MMMM BBBB")}</span>
      </div>
      <hr />
      <Row className="mb-3">
        <div className="col-auto btn btn-secondary">ใกล้ห้างสรรพสินค้า</div>
      </Row>
      <h3>ชื่อโครงการ</h3>
      <div className="d-flex mb-4">
        <IconCusttom src="/ph_building.svg" />
        <span className="font2">Casa Ville Bangyai</span>
      </div>
      <Row>
        <div className="col-lg-8 mb-3">
          <h3>รายละเอียด</h3>
          <div>ข้อมูลเพิ่มเติม</div>
          <div>-- บ้านเดี่ยว 2 ชั้น จอดรถในบ้านได้ 2 คัน พื้นที่รอบตัวบ้าน</div>
          <div>-- เนื้อที่ 39 ตารางวา พื้นที่ใช้สอย 140 ตารางเมตร</div>
          <div>
            -- 3 ห้องนอน 3 ห้องน้ำ 1 ห้องโถง 1 ห้องครัว พร้อมสวนสวยหน้าบ้าน
          </div>
          <div className="mt-3">สิ่งอำนวยความสะดวกในบ้าน</div>
          <div>-- เครื่องปรับอากาศ</div>
          <div>-- เฟอร์นิเจอร์ให้บางส่วน</div>
          <div>-- เคาท์เตอร์ครัวบิ้วท์อิน</div>
          <div>-- ห้องน้ำสุขภัณฑ์ครบ</div>
          <div className="mt-3">สิ่งอำนวยความสะดวกในโครงการ</div>
          <div>-- คลับเฮ้าส์หรู พร้อมห้องรับรอง</div>
          <div>-- สระว่ายน้ำ ระบบเกลือ</div>
          <div>-- ห้องฟิตเนส</div>
          <div>-- ส่วนธรรมชาติร่มรื่น</div>
          <div className="mt-3">สถานที่ใกล้เคียง</div>
          <div>-- รถไฟฟ้าสีม่วง คลองบางไผ่</div>
          <div>-- เซ็นทรัล เวสต์เกต</div>
          <div>-- ตลาดกลางบางใหญ่</div>
          <div>-- ไปรษณีย์บางใหญ่</div>
          <div>-- โรงพยาบาลบางใหญ่</div>
          <div className="mt-6">
            ----- ราคาขาย : 5.19 ล้านบาท (ค่าโอนคนละครึ่ง) -----
          </div>
          <div className="mt-3">@@ สนใจนัดดูบ้าน โปรดโทรนัดหมายล่วงหน้า</div>
        </div>
        <div className="col-lg-3">
          <div className="border">
            <div className="info-header border-bottom p-3 d-flex flex-column">
              <div className="d-flex justify-content-center mb-3">
                <Image
                  alt=""
                  src="/user3.png"
                  width={100}
                  height={100}
                  style={{
                    width: "70px",
                    height: "auto"
                  }}
                  className="rounded-circle"
                  sizes="100vm"
                  priority
                />
              </div>
              <div className="text-center">ลงประกาศโดย : อาเนีย ฟอร์เจอร์ <FaCheckCircle className="text-success" /></div>
            </div>
            <div className="info-body p-3 d-flex flex-column gap-3">
              <div className="btn btn-light text-start px-3"><FaPhoneAlt size={20} /> 080-123-45678</div>
              <div className="btn btn-light text-start px-3"><FaLine size={20} /> 0811721930</div>
              <div className="btn btn-light text-start px-3"><TbMailFilled size={20} /> Anya_forger@gmail.com</div>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
}

export default page;

const IconCusttom = ({
  src,
  width = 25,
  height = 25,
}: {
  src: string;
  width?: number;
  height?: number;
}) => {
  return (
    <div className="pe-1">
      <Image
        src={src}
        width={width}
        height={height}
        sizes="100vm"
        alt=""
        style={{ aspectRatio: 1 }}
        priority
      />
    </div>
  );
};
