"use client";
import CustomImage from "@components/CustomImage";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import BarChart from "./BarChart";
import axios from "axios";
import { apiInternalGet } from "@components/helpers";
import Modal_interest from "./modal_interest";
import Modal_infoconsign from "./modal_infoconsign";

export type modalParam = {
  Status: boolean;
  id?: number;
};

function Index() {
  const [interestOpen, setInterestOpen] = useState<modalParam>({
    Status: false,
  });

  const [detailOpen, setDtilOpen] = useState<modalParam>({ Status: false });
  const [assets, setAssets] = useState([]);

  const handleHide = () => {
    setInterestOpen({ Status: false });
  };

  const handleConHide = () => {
    setDtilOpen({ Status: false });
  };

  useEffect(() => {
    const boot = async () => {
      const res = await apiInternalGet("/api/asset");
      if (res != "unknow error") {
        setAssets(res || []);
      }
    };
    boot();
  }, []);

  return (
    <>
      <Modal_interest investCalOpen={interestOpen} handleHide={handleHide} />

      <Modal_infoconsign
        detailOpen={detailOpen}
        handleConHide={handleConHide}
      />

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
                        {item.land_title_deed_image &&
                          item.land_title_deed_image != "" && (
                            <CustomImage
                              src={item.land_title_deed_image}
                              alt="land-img1"
                            />
                          )}

                        <span className="badge">รอนักลงทุน</span>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="locataion">
                        <div className="date">
                          <div className="d-flex">
                            <span>
                              {item.published_at ? (
                                <>
                                  วันที่ประกาศขายฝาก<span>12 พ.ค. 2565</span>
                                </>
                              ) : (
                                "ยังไม่ประกาศขาย"
                              )}
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
                              <span className="w-100">
                                {item.province && item.province.name}
                              </span>
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
                            <span>
                              เลขที่ฝากขาย {String(item.id).padStart(5, "0")}
                            </span>
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
                            <span>
                              {item.aria_size_rai &&
                                item.aria_size_rai + " ไร่ "}
                              {item.aria_size_ngan &&
                                item.aria_size_ngan + " งาน "}
                              {item.aria_size_square_wa &&
                                item.aria_size_square_wa + " ตารางวา "}
                            </span>
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
