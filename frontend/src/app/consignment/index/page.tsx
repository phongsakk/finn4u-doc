"use client";
import CustomImage from "@components/CustomImage";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { apiInternalGet } from "@components/helpers";
import Modal_interest from "./modal_interest";
import Modal_infoconsign from "./modal_infoconsign";
import imagecosic1 from "@public/cos-ic1.svg";
import imagecosic2 from "@public/cos-ic2.svg";
import imagecosic3 from "@public/cos-ic3.svg";
import imageinfo from "@public/info.svg";
import imageusertell from "@public/usertell.svg";
import imagegraphic from "@public/graph-ic.svg";
import imageeyecolor from "@public/eye-color.svg";
import imagebanner from "@public/banner.svg";
import Image from "next/image";

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
                  <div className="row not-sale mb-3 shadow p-3" key={index}>
                    <div className="col-lg-4">
                      <div className="relative">
                        {item.land_title_deed_image &&
                          item.land_title_deed_image != "" && (
                            <CustomImage
                              className="item-image"
                              src={item.land_title_deed_image}
                              alt="land-img1"
                            />
                          )}

                        <span className="badge shadow-sm">รอนักลงทุน</span>
                      </div>
                    </div>
                    <div className="col-lg-8 pt-2">
                      <div className="locataion">
                        <div className="date row gap-2 justify-content-between">
                        <p className="col-auto">
                              {item.published_at ? (
                                <>
                                  วันที่ประกาศขายฝาก<span>12 พ.ค. 2565</span>
                                </>
                              ) : (
                                "ยังไม่ประกาศขาย"
                              )}
                            </p>
                          <p className="col-auto">ที่ดินพร้อมสิ่งปลูกสร้าง</p>
                        </div>
                        <ul>
                          <li className="custom">
                            <div className="d-flex">
                              <Image src={imagecosic1} alt="" />
                              <span className="w-100">
                                {item.province && item.province.name}
                              </span>
                            </div>

                            <div className="group-menu">
                              <div>
                                <span>
                                  <Image src={imageeyecolor} alt="" />
                                </span>
                                <span className="mx-2">123</span>
                              </div>
                              <div>
                                <span>
                                  <Image src={imagebanner} alt="" />
                                </span>
                                <span className="mx-2">5</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <Image src={imagecosic2} alt="" />
                            <span>
                              เลขที่ฝากขาย {String(item.id).padStart(5, "0")}
                            </span>
                          </li>
                          <li>
                            <Image src={imagecosic3} alt="" />
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
                            <Image src={imagecosic3} alt="" />
                            <span>มูลค่าสินทรัพย์ค้ำประกัน</span>
                            <span className="text-primary">6.2 ล้านบาท</span>
                          </li>
                          <li className="custom">
                            <div className="d-flex">
                              <Image src={imagecosic1} alt="" />
                              <span className="w-100">ราคาขายฝาก</span>
                              <span className="text-primary">2,000,000</span>
                              <span>บาท</span>
                            </div>

                            <div className="group-menu-2 row">
                              <div
                                className="group col-auto"
                                onClick={() =>
                                  setInterestOpen({ Status: true })
                                }
                              >
                                <Image src={imagegraphic} alt="" />
                              </div>
                              <div
                                className="group col-auto"
                                onClick={() => {
                                  setDtilOpen({ Status: true });
                                }}
                              >
                                <Image src={imageinfo} alt="" />
                              </div>
                              <div className="group col-auto">
                                <Link href="/consignment/detail">
                                  <Image src={imageusertell} alt="" />
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
