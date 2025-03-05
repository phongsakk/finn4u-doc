"use client";
import CustomImage from "@components/CustomImage";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import BarChart from "./BarChart";
import axios from "axios";
import { apiInternalGet } from "@components/helpers";

type modalParam = {
  Status: boolean;
  id?: number;
};

function Index() {
  const [interestOpen, setInterestOpen] = useState<modalParam>({
    Status: false,
  });

  const [detailOpen, setDtilOpen] = useState<modalParam>({ Status: false });
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const boot = async () => {
      const res = await apiInternalGet("/api/asset");
      if (res != "unknow error") {
        setAssets(res.data || []);
      }
    };
    boot();
  }, []);

  return (
    <>
      <Modal
        className="font2 modal-main"
        show={interestOpen.Status}
        size="xl"
        onHide={() => setInterestOpen({ Status: false })}
        centered
      >
        <Modal.Header closeButton>
          <h5 className="modal-title font2">การคำนวณดอกเบี้ย</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4">
              <h4 className="font2">ดอกเบี้ยของคุณ</h4>
              <div className="mb-3">
                <label className="form-label">จำนวนเงินขายฝาก (บาท)</label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="form1"
                  aria-describedby="text"
                  value={"1,450,000"}
                  onChange={() => {}}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ระยะเวลาขายฝาก (ปี)</label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="form1"
                  aria-describedby="text"
                  value={"1"}
                  onChange={() => {}}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ดอกเบี้ย (บาท/ปี)</label>
                <input
                  type="text"
                  className="form-control text-center bg-primary color-white"
                  id="form1"
                  aria-describedby="text"
                  value={"130,500"}
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="col-lg-8">
              <BarChart />
            </div>
          </div>
          <div className="text-center">
            <small className="text-primary">
              อัตราดอกเบี้ยที่คำนวณได้จะถูกนำไปพิจารณากับเงื่อนไขการขายฝาก
            </small>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        className="modal-main modal-100w"
        size="xl"
        show={detailOpen.Status}
        onHide={() => setDtilOpen({ Status: false })}
        centered
      >
        <Modal.Header closeButton>
          <h5 className="modal-title font2">ข้อมูลการขายฝาก</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-3">
            <div className="col-lg-2">
              <label className="form-label">ชื่อผู้ขายฝาก</label>
            </div>
            <div className="col-lg-4">
              <input
                type="text"
                className="form-control"
                id="form1"
                aria-describedby="text"
              />
            </div>
            <div className="col-lg-2">
              <label className="form-label">นามสกุล</label>
            </div>
            <div className="col-lg-4">
              <input
                type="text"
                className="form-control"
                id="form1"
                aria-describedby="text"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-2">
              <label className="form-label">เลขที่ฝากขาย</label>
            </div>
            <div className="col-lg-4">
              <input
                type="text"
                className="form-control"
                id="form1"
                aria-describedby="text"
              />
            </div>
            <div className="col-lg-2">
              <label className="form-label">ประเภท</label>
            </div>
            <div className="col-lg-4">
              <input
                type="text"
                className="form-control"
                id="form1"
                aria-describedby="text"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-2">
              <label className="form-label">พื้นที่ขายฝาก</label>
            </div>
            <div className="col-lg-2">
              <label className="form-label">บ้านเลขที่</label>
            </div>
            <div className="col-lg-8">
              <input
                type="text"
                className="form-control"
                id="form1"
                aria-describedby="text"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-2">
              <label className="form-label">
                <span></span>
              </label>
            </div>
            <div className="col-lg-2">
              <label className="form-label">อำเภอ/เขต</label>
            </div>
            <div className="col-lg-2">
              <input
                type="text"
                className="form-control"
                id="form1"
                aria-describedby="text"
              />
            </div>
            <div className="col-lg-2">
              <label className="form-label">ตำบล/แขวง</label>
            </div>
            <div className="col-lg-2">
              <input
                type="text"
                className="form-control"
                id="form1"
                aria-describedby="text"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-2">
              <label className="form-label">
                <span></span>
              </label>
            </div>
            <div className="col-lg-2">
              <label className="form-label">รหัสไปรษณีย์</label>
            </div>
            <div className="col-lg-2">
              <input
                type="text"
                className="form-control"
                id="form1"
                aria-describedby="text"
              />
            </div>
            <div className="col-lg-2">
              <label className="form-label">จังหวัด</label>
            </div>
            <div className="col-lg-2">
              <input
                type="text"
                className="form-control"
                id="form1"
                aria-describedby="text"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-2">
              <label className="form-label">
                <span></span>
              </label>
            </div>
            <div className="col-lg-2">
              <label className="form-label">พื้นที่</label>
            </div>
            <div className="col-lg-2 wrap">
              <input
                type="text"
                className="form-control"
                id="form1"
                aria-describedby="text"
              />
              <p className="text-secondary">ตารางวา</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-2">
              <label className="form-label">
                <span></span>
              </label>
            </div>
            <div className="col-lg-2">
              <label className="form-label">ราคาขายฝาก</label>
            </div>
            <div className="col-lg-2 wrap">
              <input
                type="text"
                className="form-control"
                id="form1"
                aria-describedby="text"
              />
              <span className="text-secondary">บาท</span>
            </div>
            <div className="col-lg-2">
              <label className="form-label">มูลค่าทรัพย์สิน</label>
            </div>
            <div className="col-lg-2 wrap">
              <input
                type="text"
                className="form-control"
                id="form1"
                aria-describedby="text"
              />
              <span className="text-secondary">บาท</span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-2">
              <label className="form-label">วันที่ลงขายฝาก</label>
            </div>
            <div className="col-lg-2">
              <input
                type="text"
                className="form-control"
                id="form1"
                aria-describedby="text"
                placeholder="20 เมษายน 2565"
              />
            </div>
            <div className="col-lg-2">
              <input id="endDate" className="form-control" type="date" />
            </div>
            <div className="col-lg-2">
              <label className="form-label">ระเวลาขายฝาก</label>
            </div>
            <div className="col-lg-2 wrap">
              <input
                type="text"
                className="form-control"
                id="form1"
                aria-describedby="text"
              />
              <span className="text-secondary">ปี</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="consignment-form2">
        <div className="container">
          <div className="card-form-main">
            <h4 className="title-main mb-5 mt-5">ข้อมูลทรัพย์สินของคุณ</h4>

            <div className="container">
              <div className="land-sale-2">
                {assets.map((item: any, index) => (
                  <div className="row not-sale mb-3" key={index}>
                    <div className="col-lg-4">
                      <div className="relative">
                        <CustomImage src="/land-img1.png" alt="land-img1" />
                        <span className="badge">รอนักลงทุน</span>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="locataion">
                        <div className="date">
                          <div className="d-flex">
                            <span>
                              วันที่ประกาศขายฝาก<span>12 พ.ค. 2565</span>
                            </span>
                          </div>
                          <p>ที่ดินพร้อมสิ่งปลูกสร้าง</p>
                        </div>
                        <ul>
                          <li className="custom">
                            <div className="d-flex">
                              <CustomImage
                                src="/cos-ic1.svg"
                                alt="cos-ic1"
                                style={{
                                  width: "15%",
                                  height: "auto",
                                }}
                              />
                              <span className="w-100">ดอนเมือง, ปทุมธานี</span>
                            </div>

                            <div className="group-menu">
                              <div>
                                <span>
                                  <CustomImage
                                    src="/eye-color.svg"
                                    alt="eye-color"
                                    style={{
                                      width: "35%",
                                      height: "auto",
                                    }}
                                  />
                                </span>
                                <span className="mx-2">123</span>
                              </div>
                              <div>
                                <span>
                                  <CustomImage
                                    src="/banner.svg"
                                    alt="banner"
                                    style={{
                                      width: "33%",
                                      height: "auto",
                                    }}
                                  />
                                </span>
                                <span className="mx-2">5</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <CustomImage
                              src="/cos-ic2.svg"
                              alt="cos-ic2"
                              style={{
                                width: "5%",
                                height: "auto",
                              }}
                            />
                            <span>เลขที่ฝากขาย 000012</span>
                          </li>
                          <li>
                            <CustomImage
                              src="/cos-ic3.svg"
                              alt="cos-ic3"
                              style={{
                                width: "5%",
                                height: "auto",
                              }}
                            />
                            <span>1 ไร่ 2 งาน 26 ตารางวา</span>
                          </li>
                          <li>
                            <CustomImage
                              src="/cos-ic3.svg"
                              alt="cos-ic3"
                              style={{
                                width: "5%",
                                height: "auto",
                              }}
                            />
                            <span>มูลค่าสินทรัพย์ค้ำประกัน</span>
                            <span className="text-primary">6.2 ล้านบาท</span>
                          </li>
                          <li className="custom">
                            <div className="d-flex">
                              <CustomImage
                                src="/cos-ic1.svg"
                                alt="cos-ic1"
                                style={{
                                  width: "10%",
                                  height: "auto",
                                }}
                              />
                              <span className="w-100">ราคาขายฝาก</span>
                              <span className="text-primary">2,000,000</span>
                              <span>บาท</span>
                            </div>

                            <div className="group-menu-2">
                              <div
                                className="group"
                                onClick={() =>
                                  setInterestOpen({ Status: true })
                                }
                              >
                                <CustomImage
                                  width={22}
                                  height={22}
                                  src="/graph-ic.svg"
                                  alt="graph-ic"
                                  style={{}}
                                />
                              </div>
                              <div
                                className="group"
                                onClick={() => {
                                  setDtilOpen({ Status: true });
                                }}
                              >
                                <CustomImage
                                  width={22}
                                  height={22}
                                  src="/info.svg"
                                  alt="info"
                                  style={{}}
                                />
                              </div>
                              <div className="group">
                                <Link href="/consignment/detail">
                                  <CustomImage
                                    width={22}
                                    height={22}
                                    src="/usertell.svg"
                                    alt="usertell"
                                    style={{}}
                                  />
                                </Link>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div className="d-flex">
              <Link
                href="/consignment/warning"
                className="btn-icon d-flex align-items-center"
              >
                <CustomImage
                  className="mx-1"
                  src="/add-conseg.svg"
                  alt="add-conseg"
                  style={{
                    width: "10%",
                    height: "auto",
                  }}
                />
                <span>เพิ่มทรัพย์สินขายฝาก</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Index;
