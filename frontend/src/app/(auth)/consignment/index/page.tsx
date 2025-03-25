"use client";
import CustomImage from "@components/CustomImage";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { formatCurrency, formatNumber } from "@components/helpers";
import imagecosic1 from "@public/cos-ic1.svg";
import imagecosic2 from "@public/cos-ic2.svg";
import imagecosic3 from "@public/cos-ic3.svg";
import imageinfo from "@public/info.svg";
import imageusertell from "@public/usertell.svg";
import imagegraphic from "@public/graph-ic.svg";
import imageeyecolor from "@public/eye-color.svg";
import imagebanner from "@public/banner.svg";
import Image from "next/image";
import { Map } from "@components/dev/map";
import Loading from "@components/dev/loading";
import axios from "axios";
import { api } from "@utils/api/index";
import Modal_interest, { InterestType } from "../components/modal_interest";
import Modal_infoconsign, { InfoConType } from "../components/modal_infoconsign";

function Index() {
  const [assets, setAssets] = useState([]);
  const [interestOpen, setInterestOpen] = useState<InterestType>({
    open: false,
  });
  const [detailOpen, setDtilOpen] = useState<InfoConType>({ open: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const boot = async () => {
      setLoading(true);
      try {
        const { data: res_assets } = await axios.get(
          api.internal("/api/consignor/asset")
        );
        if (res_assets.status === true) {
          setAssets(res_assets.data);
        }
      } catch (error) {
        setAssets([]);
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };
    boot();
  }, []);

  return (
    <>
      <Modal_interest
        open={interestOpen.open}
        close={() => setInterestOpen({ open: false })}
      />

      <Modal_infoconsign
        open={detailOpen.open}
        close={() => setDtilOpen({ open: false })}
      />

      <div className="consignment-form2">
        <div className="container">
          <div className="card-form-main">
            <h4 className="title-main mb-5 mt-5">ข้อมูลทรัพย์สินของคุณ</h4>

            <div className="container">
              <div className="land-sale-2">
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    {assets?.map((item: any, index) => (
                      <div className="row not-sale mb-3 shadow p-3" key={index}>
                        <div className="col-lg-4">
                          <div className="relative">
                            <Map
                              position={{
                                lat: item.location_x,
                                lng: item.location_y,
                              }}
                              style={{
                                width: "100%",
                                height: "377px",
                              }}
                            />
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
                              <p className="col-auto">{item.asset_type_name}</p>
                            </div>
                            <div className="row">
                              <div className="col-lg-7">
                                <div className="d-flex gap-2 row">
                                  <div className="col-1 col-sm-2 col-lg-2 mx-1 text-center">
                                    <Image src={imagecosic1} alt="" />
                                  </div>
                                  <span className="col-auto p-0">
                                    {item.province_name}
                                  </span>
                                </div>

                                <div className="d-flex gap-2 row">
                                  <div className="col-1 col-sm-2 col-lg-2 mx-1 text-center">
                                    <Image src={imagecosic2} alt="" />
                                  </div>
                                  <span className="col-auto p-0 d-flex">
                                    <span>เลขที่ฝากขาย</span>
                                    <span className="px-2">
                                      {String(item.id).padStart(5, "0")}
                                    </span>
                                  </span>
                                </div>

                                <div className="d-flex gap-2 row">
                                  <div className="col-1 col-sm-2 col-lg-2 mx-1 text-center">
                                    <Image src={imagecosic3} alt="" />
                                  </div>
                                  <span className="col-auto p-0">
                                    {item.aria_size}
                                  </span>
                                </div>
                                {item.collateral ? (
                                  <div className="d-flex gap-2 row">
                                    <div className="col-1 col-sm-2 col-lg-2 mx-1 text-center">
                                      <Image src={imagecosic3} alt="" />
                                    </div>
                                    <div className="col-auto d-flex gap-2 p-0 text-wrap">
                                      <span className="col-auto">
                                        มูลค่าสินทรัพย์ค้ำประกัน
                                      </span>
                                      <span className="text-primary col-auto">
                                        {formatCurrency(item.collateral)}
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <></>
                                )}

                                <div className="d-flex gap-2 row">
                                  <div className="col-1 col-sm-2 col-lg-2 mx-1 text-center">
                                    <Image src={imagecosic1} alt="" />
                                  </div>
                                  <div className="col-auto d-flex gap-2 p-0">
                                    <span>ราคาขายฝาก</span>
                                    <span className="text-primary">
                                      {formatNumber(item.consignment_price)}
                                    </span>
                                    <span>บาท</span>
                                  </div>
                                </div>
                              </div>
                              <div className="row col-lg-5 col-sm-12 justify-content-lg-end gap-2 align-items-center">
                                <div className="col-lg-auto d-flex align-self-lg-start justify-content-center">
                                  <div className="group-menu">
                                    <div className="text-center">
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
                                </div>
                                <div className="group-menu-2 col-lg-auto align-self-lg-end justify-content-center">
                                  <div
                                    className="group col-auto"
                                    onClick={() =>
                                      setInterestOpen({
                                        open: true,
                                      })
                                    }
                                  >
                                    <Image src={imagegraphic} alt="" />
                                  </div>
                                  <div
                                    className="group col-auto"
                                    onClick={() => {
                                      setDtilOpen({
                                        open: true,
                                      });
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
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
