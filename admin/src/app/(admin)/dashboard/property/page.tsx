import LineChart from "@component/chart/LineChart";
import React from "react";
import { Row } from "react-bootstrap";
import { GrDocumentDownload } from "react-icons/gr";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidDownArrow } from "react-icons/bi";
import { MdAutoGraph } from "react-icons/md";

function page() {
  const test_location = [
    "ดอนเมือง, ปทุมธานี",
    "ลาดกระบัง, กรุงเทพฯ",
    "บางละมุง, ชลบุรี",
    "ไทรน้อย, อยุธยา",
    "อ่อนนุช, กรุงเทพฯ",
  ];
  return (
    <>
      <Row className="mb-5 justify-content-between px-4">
        <div className="col-lg-3 shadow-lg b-1 rounded bg-green p-2">
          <Row className="mb-3">
            <div className="col-lg-10">
              <h3 className="fw-bold text-white">
                <span>นักลงทุน</span> <MdAutoGraph className="ps-2" size={30} />
              </h3>
              <div>มีผู้เข้าใช้งานเพิ่มขึ้น 15%</div>
              <div>เมื่อเทียบกับผู้ใช้งานเดือนที่แล้ว</div>
            </div>
            <GrDocumentDownload
              size={20}
              className="col-lg-2 align-self-center"
            />
          </Row>
        </div>
        <div className="col-lg-3 shadow-lg border rounded  p-2">
          <Row className="text-success">
            <div className="col-lg-10">
              <h3 className="fw-bold text-success">
                <span>ผู้ขายฝาก</span>{" "}
                <MdAutoGraph className="ps-2" size={30} />
              </h3>

              <div>มีผู้เข้าใช้งานเพิ่มขึ้น 25%</div>
              <div>เมื่อเทียบกับผู้ใช้งานเดือนที่แล้ว</div>
            </div>
            <GrDocumentDownload
              size={20}
              className="col-lg-2 justify-self-end"
            />
          </Row>
        </div>
        <div className="col-lg-3 shadow-lg rounded border p-2">
          <Row className="text-success">
            <div className="col-lg-10">
              <h3 className="fw-bold text-success">
                <span>นักลงทุน</span> <MdAutoGraph className="ps-2" size={30} />
              </h3>
              <div>มีผู้เข้าใช้งานเพิ่มขึ้น 15%</div>
              <div>เมื่อเทียบกับผู้ใช้งานเดือนที่แล้ว</div>
            </div>
            <GrDocumentDownload
              size={20}
              className="col-lg-2 justify-self-end"
            />
          </Row>
        </div>
      </Row>
      <Row>
        <div className="col-lg-8">
          <div className="text-end px-3">
            <span className="pe-2">1 May- 30 May , 2025</span>
            <BiSolidDownArrow size={10} />
          </div>
          <LineChart
            set={{
              label: ["1 เดือน", "7 วัน", "3 วัน", "เมื่อวาน", "วันนี้"],
              data: [1, 22, 333, 4444, 5555],
            }}
          />
        </div>
        <div className="col-lg-4 rounded border shadow d-flex flex-column text-success align-items-center">
          <label className="p-2 h3 fw-bold text-success">
            ทรัพย์สินขายฝากน่าสนใจ
          </label>
          {test_location?.map((item: string, index: number) => (
            <div
              key={index}
              className="border shadow w-100 rounded-pill text-center py-2 px-3 row mb-3"
            >
              <div className="col-2 text-center">
                <FaMapMarkerAlt size={20} />
              </div>
              <div className="col-9 text-start">{item}</div>
            </div>
          ))}
        </div>
      </Row>
    </>
  );
}

export default page;
