"use client";
import CustomImage from "@components/CustomImage";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { formatCurrency, formatNumber, ToDateThai } from "@components/helpers";
import imagecosic1 from "@public/cos-ic1.svg";
import imagecosic2 from "@public/cos-ic2.svg";
import imagecosic3 from "@public/cos-ic3.svg";
import imageinfo from "@public/info.svg";
import imageusertell from "@public/usertell.svg";
import imagegraphic from "@public/graph-ic.svg";
import imageeyecolor from "@public/eye-color.svg";
import imagebanner from "@public/banner.svg";
import Image from "next/image";
import Loading from "@components/dev/loading";
import axios from "axios";
import { api } from "@utils/api/index";
import ImageApi from "@components/ImageApi";
import { Button } from "react-bootstrap";
import { useConsignorModal } from "@components/context/ConsignorContext";

function page() {
  const [assets, setAssets] = useState([]);
  const { assetGraph, assetInfo } = useConsignorModal();
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
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };
    boot();
  }, []);

  return (
    <>
      <div className="consignment-form2">
        <div className="container">
          <div className="card-form-main p-0 p-sm-1 p-md-3 p-lg-5">
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
                            <span className="badge shadow-sm">รอนักลงทุน</span>
                            <ImageApi
                              src={item.asset_image}
                              className="object-fit-cover"
                              style={{ aspectRatio: 1.2, height: "auto" }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-8 pt-2">
                          <div className="locataion">
                            <div className="date row gap-2 justify-content-between">
                              <p className="col-auto">
                                {item.date_sell ? (
                                  <>
                                    วันที่ประกาศขายฝาก
                                    <span>
                                      {ToDateThai(
                                        item?.date_sell,
                                        "D MMMM BBBB"
                                      )}
                                    </span>
                                  </>
                                ) : (
                                  "ยังไม่ประกาศขาย"
                                )}
                              </p>
                              <p className="col-auto">{item.asset_type_name}</p>
                            </div>
                            <div className="row mb-0">
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
                                {item.collateral_price ? (
                                  <div className="d-flex gap-2 row">
                                    <div className="col-1 col-sm-2 col-lg-2 mx-1 text-center">
                                      <Image src={imagecosic3} alt="" />
                                    </div>
                                    <div className="col-auto d-flex gap-2 p-0 text-wrap">
                                      <span className="col-auto">
                                        มูลค่าสินทรัพย์ค้ำประกัน
                                      </span>
                                      <span className="text-primary col-auto">
                                        {formatCurrency(item.collateral_price)}
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
                                      {formatNumber(item.price_appraisal)}
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
                                      <span className="mx-2">
                                        {item?.view_count}
                                      </span>
                                    </div>
                                    <div>
                                      <span>
                                        <Image src={imagebanner} alt="" />
                                      </span>
                                      <span className="mx-2">
                                        {item?.bid_count}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="group-menu-2 col-lg-auto align-self-lg-end justify-content-center">
                                  <div
                                    className="group col-auto"
                                    onClick={() =>
                                      assetGraph.openModal(item.id)
                                    }
                                  >
                                    <Image src={imagegraphic} alt="" />
                                  </div>
                                  <div
                                    className="group col-auto"
                                    onClick={() => assetInfo.openModal(item.id)}
                                  >
                                    <Image src={imageinfo} alt="" />
                                  </div>
                                  <div className="group col-auto">
                                    <Link href="/consignor/detail">
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
                href="/consignor/warning"
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
export default page;
