"use client";
import { modalParam } from "@models/modalParam";
import CustomImage from "@components/CustomImage";
import Link from "next/link";
import React, { useState } from "react";
import Modal_interest from "./modal_interest";
import Modal_infoconsign from "./modal_infoconsign";
import Modal_usertell from "./modal_usertell";

function IndexPage() {
  const [interestOpen, setInterestOpen] = useState<modalParam>({
    open: false,
  });
  const [detailOpen, setDtilOpen] = useState<modalParam>({ open: false });
  const [userTellOpen, setUserTallOpen] = useState<modalParam>({
    open: false,
  });

  const handleHide = () => {
    setInterestOpen({ open: false });
  };

  const handleConHide = () => {
    setDtilOpen({ open: false });
  };

  const handleUserTellHide = () => {
    setUserTallOpen({ open: false });
  };

  return (
    <>
      <Modal_interest investCalOpen={interestOpen} handleHide={handleHide} />

      <Modal_infoconsign
        detailOpen={detailOpen}
        handleConHide={handleConHide}
      />

      <Modal_usertell
        userTellOpen={userTellOpen}
        handleUserTellHide={handleUserTellHide}
      />

      <div className="consignment-form2 investment-form2">
        <div className="container">
          <div className="card-form-main">
            <h4 className="title-main mb-5 mt-5 font2">ข้อมูลการลงทุน</h4>

            <div className="container">
              <div className="land-sale-2">
                <div className="row not-sale mb-3">
                  <div className="col-lg-4">
                    <div className="relative">
                      <CustomImage src="/land-img1.png" alt="land-img1" />
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="locataion">
                      <ul>
                        <li className="custom">
                          <div className="d-flex">
                            <CustomImage
                              src="/cos-ic1.svg"
                              alt="cos-ic1"
                              style={{
                                width: "30%",
                                height: "auto",
                              }}
                            />
                            <span className="w-100">ดอนเมือง, ปทุมธานี</span>
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
                          <span>ลงทุนวันที่ 20 เมษายน 2565</span>
                        </li>
                        <div className="group-menu-2">
                          <div
                            className="group"
                            onClick={() => setInterestOpen({ open: true })}
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
                            onClick={() => setDtilOpen({ open: true })}
                          >
                            <CustomImage
                              width={22}
                              height={22}
                              src="/info.svg"
                              alt="info"
                              style={{}}
                            />
                          </div>
                          <div
                            className="group"
                            onClick={() => setUserTallOpen({ open: true })}
                          >
                            <CustomImage
                              width={22}
                              height={22}
                              src="/usertell.svg"
                              alt="usertell"
                              style={{}}
                            />
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="submit-group mt-5 font2">
                  <Link
                    href="/property"
                    type="submit"
                    className="btn btn-primary"
                  >
                    ยื่นข้อเสนอซื้อฝากทรัพย์สิน
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndexPage;
