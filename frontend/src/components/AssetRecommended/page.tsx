"use client";
import CustomImage from "@components/CustomImage";
import { formatNumber, ToDateThai } from "@components/helpers";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AssetModel } from "@models/AssetModel";
import { api } from "@utils/api/index";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoBanOutline } from "react-icons/io5";
dayjs.extend(customParseFormat);
dayjs.locale("th");

const fetchAssetRecom = async () => {
  try {
    const { data: res } = await axios.get(
      api.internal("/api/consignor/asset/recommended")
    );
    if (res.status) {
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

function RecommendedPage() {
  const [assetRecom, setAssetRecom] = useState([]);

  useEffect(() => {
    try {
      const boot = async () => {
        setAssetRecom(await fetchAssetRecom());
      };
      boot();
    } catch (error) { }
  }, []);
  return (
    <>
      {assetRecom?.map((item: any, i: number) => (
        <div className="col-lg-4 mb-" key={i}>
          <div className="card overflow-hidden">
            <div className="head">
              <div className="not-hover">
                {item?.asset_image ? (
                  <CustomImage
                    src={item?.asset_image ?? ""}
                  />
                ) : (
                  <div className="property-recom bg-light d-flex justify-content-center align-items-center">
                    <IoBanOutline className="text-white w-50 h-50" />
                  </div>
                )}

                <span className="badge bg-primary font2">แนะนำ</span>
              </div>
              <div className="hover">
                <div className="d-none">
                  <div className="wrap">
                    <Link
                      href={`/property/detail/${item.id}`}
                      className="btn btn-primary  font2"
                    >
                      ลงทุน
                    </Link>
                    <Link
                      href={`/property/detail/${item.id}`}
                      className="btn btn-white  font2"
                    >
                      ข้อมูลเพิ่มเติม
                    </Link>
                    <div className="view-eye">
                      <i className="fa-solid fa-eye fs-1"></i>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="list">
                <FontAwesomeIcon icon={faCheck} className="fs-4" />
                <span className="font2">{item.province_name}</span>
              </div>
              <div className="list">
                <FontAwesomeIcon icon={faCheck} className="fs-4" />
                <span className="font2">
                  เลขที่ประกาศขาย {item.id.toString().padStart(6, "0")}
                </span>
              </div>
              <div className="list">
                <FontAwesomeIcon icon={faCheck} className="fs-4" />
                <span className="font2">{item.aria_size}</span>
              </div>
              {/* <div className="list">
                      <FontAwesomeIcon icon={faCheck} className="fs-4" />
                      <span className="font2">มูลค่าสินทรัพย์ค้ำประกัน</span>
                      <span className="text-primary font2">{item.mock_c_price}</span>
                    </div> */}
              <div className="list">
                <FontAwesomeIcon icon={faCheck} className="fs-4" />
                <span className="font2">
                  ราคาขาย
                  <span className="text-primary font2 px-1">
                    {formatNumber(Number(item.consignment_price))}
                  </span>
                  บาท
                </span>
              </div>
              <div className="list">
                <FontAwesomeIcon icon={faCheck} className="fs-4" />
                <span className="font2">{item.sell_date}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default RecommendedPage;
