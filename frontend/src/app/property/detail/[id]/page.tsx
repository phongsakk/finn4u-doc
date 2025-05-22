"use client";
import CustomImage from "@components/CustomImage";
import Link from "next/link";
import Banner from "../../banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEye,
  faHammer,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import Countdown from "@components/Countdown";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { Input } from "antd";
import {
  formatCurrency,
  formatNumber,
  handleNumberChange,
  ToDateThai,
} from "@components/helpers";

import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSession } from "next-auth/react";
import { redirect, useParams, useRouter } from "next/navigation";
import { Map } from "@components/dev/map";
import axios from "axios";
import { api } from "@utils/api/index";
import { AlertPrimary } from "@components/alert/SwalAlert";
import { LoadPage } from "@components/dev/LoadPage";
import AssetPicture from "@components/dev/property/AssetPicture";
import Auction from "@components/consignor/Auction";

dayjs.extend(customParseFormat);
dayjs.locale("th");

type AuctionDate = {
  from_date?: Date;
  to_date?: Date;
}

function PropertyPage() {
  const params = useParams();

  if (isNaN(Number(params.id))) {
    redirect("/property");
  }
  const [asset, setAsset] = useState<any>();
  const [auctionDate, setAuctionDate] = useState<AuctionDate>();
  const [bidPercent, setBidPercent] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const boot = async () => {
      try {
        setLoading(true);

        const { data: res_asset } = await axios.get(
          api.internal(`/api/consignor/asset/public/${params.id}`)
        );
        if (res_asset.status) {
          setAsset(res_asset.data);
          setAuctionDate({
            from_date: dayjs(res_asset.data?.asset_auction?.from_date).toDate(),
            to_date: dayjs(res_asset.data?.asset_auction?.to_date).toDate()
          });
        } else {
          await AlertPrimary("Error 404 - Please try again!!", "error").then(
            () => {
              window.location.href = api.internal("/property");
            }
          );
        }
      } catch (err) {
        console.error("get asset:", err);
      } finally {
        setLoading(false);
      }
    };
    boot();
  }, [params.id]);

  const handleBid = async () => {
    if (!bidPercent) {
      return AlertPrimary("กรุณากรอกดอกเบี้ยของคุณ", "error");
    }

    try {
      setSubmit(true);
      const { data: res_bid } = await axios.post(
        api.internal(`/api/bid/${params.id}`),
        {
          offer: Number(bidPercent),
        }
      );

      var BidMessage = "";
      var status = false;
      switch (res_bid.data.message) {
        case "auction has ended":
          BidMessage = "หมดเวลาการประมูล";
          break;
        case "maximum bid limit reached":
          BidMessage = "ถึงขีดจำกัดการ Bid แล้ว";
          var status = false;
          break;
        case "auction has not started yet":
          BidMessage = "การประมูลยังไม่เริ่ม";
          var status = false;
          break;
        default:
          BidMessage = "Bid สำเร็จ";
          status = true;
          break;
      }

      AlertPrimary(BidMessage, status ? "success" : "error");
    } catch (error) {
      console.error(error);
      AlertPrimary("500 - Server disconnected. Please try again.", "error");
    } finally {
      setTimeout(() => {
        setSubmit(false);
      }, 1000);
    }
  };

  return (
    <>
      <div className="property-sale-detail">
        <Banner />

        {!loading ? (
          <div className="container bg-white pb-5">
            <p className="title-content font2">ทรัพย์สินขายฝาก</p>
            <section className="photo-gallery">
              <div className="container">
                <AssetPicture images={asset?.images} />
                <div className="time">
                  <div className="row">
                    <div className="col-lg-3">
                      {/* <!-- เอา class d-none ออกจะเเสดงสถานะ sold --> */}
                      <div className="sold d-none">
                        <span>SOLD</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="location">
                  <Link
                    href={`https://www.google.co.th/maps/place/${asset?.province_name}`}
                    target="_blank"
                    className="text-primary h4 font2"
                    style={{ textDecoration: "" }}
                  >
                    <ins>{asset?.province_name}</ins>
                  </Link>
                  <div className="row mt-3">
                    <div className="col">
                      <div className="font2 col-auto btn btn-primary">
                        {asset?.asset_type_name}
                      </div>
                    </div>
                    <div className="col-sm-4 col-auto text-end">
                      {asset?.asset_auction && (
                        <Link
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="btn btn-primary font2"
                        >
                          ประมูล
                        </Link>
                      )}

                      <Link
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="btn btn-primary font2 mx-2"
                      >
                        ลงทุน
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="detail">
                  <div className="locataion">
                    <ul>
                      <li>
                        <div className="cust">
                          <CustomImage
                            src="/ic-lo1.svg"
                            alt="ic-lo1"
                            style={{
                              width: "30px",
                              height: "auto",
                            }}
                          />
                          <span className="font2">
                            เลขที่ฝากขาย
                            {String(Number(asset?.id)).padStart(5, "0")}
                          </span>
                        </div>
                        <div className="manage">
                          <FontAwesomeIcon icon={faEye} />
                          <span className="mx-2 font2">
                            {asset?.view_count}
                          </span>
                          <FontAwesomeIcon icon={faHammer} className="mx-2" />
                          <span className="font2">{asset?.bid_count}</span>
                        </div>
                      </li>
                      <li>
                        <CustomImage
                          src="/ic-lo2.svg"
                          alt="ic-lo2"
                          style={{
                            width: "30px",
                            height: "auto",
                          }}
                        />

                        <span className="font2">{asset?.aria_size}</span>
                      </li>
                      {asset?.asset_appraisal.collateral_price && (
                        <li>
                          <CustomImage
                            src="/ic-lo3.svg"
                            alt="ic-lo3"
                            style={{
                              width: "30px",
                              height: "auto",
                            }}
                          />
                          <span className="font2">
                            มูลค่าสินทรัพย์ค้ำประกัน
                          </span>
                          {formatCurrency(
                            asset?.asset_appraisal.collateral_price
                          )}
                        </li>
                      )}

                      <li>
                        <CustomImage
                          src="/ic-lo4.svg"
                          alt="ic-lo4"
                          style={{
                            width: "30px",
                            height: "auto",
                          }}
                        />
                        <span className="font2">ราคาขายฝาก</span>
                        {formatNumber(
                          asset?.asset_appraisal.price_appraisal
                        )}{" "}
                        บาท
                      </li>
                      <li>
                        <CustomImage
                          src="/ic-lo5.svg"
                          alt="ic-lo5"
                          style={{
                            width: "30px",
                            height: "auto",
                          }}
                        />
                        <span className="font2">ระยะเวลาขายฝาก</span>
                        {formatNumber(Number(asset?.asset_appraisal?.duration))}
                        ปี
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="badegroup row gap-2">
                  {asset?.asset_tag?.map((item: any, index: number) => (
                    <span className="badge font2 col-auto" key={index}>
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
              {params?.id && asset?.asset_auction && <Auction id={String(params?.id)} auction={asset.asset_auction} />}
            </section>
          </div>
        ) : (
          <LoadPage />
        )}
      </div>
    </>
  );
}
export default PropertyPage;
