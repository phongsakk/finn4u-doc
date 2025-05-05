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

dayjs.extend(customParseFormat);
dayjs.locale("th");

function PropertyPage() {
  const params = useParams();

  if (isNaN(Number(params.id))) {
    redirect("/property");
  }
  const [asset, setAsset] = useState<any>();
  const [endTime, setEndTime] = useState<Date>();
  const [bidPercent, setBidPercent] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const boot = async () => {
      try {
        setLoading(true);

        const { data: res_asset } = await axios.get(
          api.internal(`/api/general/asset/${params.id}`)
        );
        if (res_asset.status) {
          setAsset(res_asset.data);
          setEndTime(
            dayjs(
              res_asset.data?.asset_auction?.to_date,
              "DD/MM/YYYY HH:mm:ss"
            ).toDate()
          );
        }
      } catch (err) {
        console.error("get asset:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      boot();
    }
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
          bid: Number(bidPercent),
        }
      );
      if (res_bid.status) {
        AlertPrimary("คุณได้ทำการ Bid สำเร็จแล้ว", "success");
      } else {
        AlertPrimary("Bid ไม่สำเร็จ", "success");
      }
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
                <div className="row gallery-grid">
                  <div className="col col-12 col-lg-9 mb-md-3 mb-sm-3 col-sm-12 col-xs-12 mb-lg-0 mb-sm-0 mb-3">
                    <div className="gallery-item">
                      <Map
                        position={{
                          lat: Number(asset?.location_x),
                          lng: Number(asset?.locataion_y),
                        }}
                        style={{
                          width: "100%",
                          height: "541.88px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col col-lg-3 col-sm-12 col-12 col-xs-12">
                    <AssetPicture images={asset?.images} />
                  </div>
                </div>
                <div className="time">
                  <div className="row">
                    <div className="col-lg-9">
                      <div className="d-flex">
                        {/* <!-- ใส่ Class bg-red ต่อจาก Class icon จะเปลี่ยนพื้นหลังสีเเดง --> */}
                        <div className="icon">
                          <FontAwesomeIcon icon={faClock} />
                          <i className="fa-solid fa-clock"></i>
                        </div>
                        <span className="font2">
                          รอการลงทุน
                          <span className="text-danger font2">
                            1 วัน 3.50 ชั่วโมง
                          </span>
                        </span>
                        <span className="date-sale font2">
                          ประกาศขายเมื่อ 11 เมษายน 2565
                        </span>
                      </div>
                    </div>
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
                      <Link
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="btn btn-primary font2"
                      >
                        ประมูล
                      </Link>
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
                          <span className="mx-2 font2">123</span>
                          <FontAwesomeIcon icon={faHammer} className="mx-2" />
                          <span className="font2">5</span>
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
                      <li>
                        <CustomImage
                          src="/ic-lo3.svg"
                          alt="ic-lo3"
                          style={{
                            width: "30px",
                            height: "auto",
                          }}
                        />
                        <span className="font2">มูลค่าสินทรัพย์ค้ำประกัน</span>
                        {formatCurrency(Number(asset?.collateral))}
                      </li>
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
                        {formatNumber(Number(asset?.consignment_price))} บาท
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
              {status !== "loading" &&
                status === "authenticated" &&
                asset?.asset_auction && (
                  <>
                    <div className="mt-3 fw-bold">
                      <h5>จะสิ้นสุดการประมูลในอีก :</h5>
                      {endTime && <Countdown toDate={endTime} />}

                      <div className="row mt-3">
                        <div className="col-sm-auto h5">ระยะเวลาการประมูล:</div>
                        <div className=" row col-lg-6 text-secondary">
                          <div className="col-auto">
                            {asset.asset_auction.from_date}
                          </div>
                          <div className="col-auto px-2">-</div>
                          <div className="col-auto">
                            {asset.asset_auction.to_date}
                          </div>
                        </div>
                        <div className="row h5 mt-3">
                          <label className="col-auto">
                            เปิดประมูลดอกเบี้ยสูงสุดที่:
                          </label>
                          <label className="col-auto">
                            {formatNumber(asset.asset_auction.max_tax)} %
                          </label>
                        </div>
                        <h5 className="mt-3">ใส่ดอกเบี้ยของคุณ (%):</h5>
                        <div className="row justify-content-start gap-2">
                          <div className="col-auto">
                            <Input
                              onChange={(e) => {
                                handleNumberChange(e, setBidPercent);
                              }}
                              value={bidPercent ?? ""}
                              name="bid-percent"
                              className="form-control front2"
                              placeholder="กรุณาใส่ดอกเบี้ย"
                            />
                          </div>
                          <div className="col-sm-4">
                            <Button
                              variant="success"
                              onClick={handleBid}
                              className="px-5 text-nowrap"
                              disabled={submit}
                            >
                              {!submit ? "Bid Now" : "กำลัง Bid"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
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
