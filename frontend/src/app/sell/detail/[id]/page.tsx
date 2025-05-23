"use client";
import AssetPicture from "@components/dev/property/AssetPicture";
import { ToDateThai } from "@components/helpers";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLine } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { useLoaderContext } from "@components/context/LoaderContext";
import axios from "axios";
import { api } from "@utils/api/index";
import { LoadPage } from "@components/dev/LoadPage";

function page() {
  const { id } = useLoaderContext();
  const [asset, setAsset] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setLoading(true);

        const { data: res } = await axios.get(api.internal(`/api/sell/${id}`));
        if (res.status) {
          setAsset(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (Number(id)) {
      fetchAsset();
    }
  }, [id]);
  return (
    <>
      <div className="container mt-3 py-2 p-lg-4 bg-white">
        {loading ? (
          <LoadPage />
        ) : (
          <>
            <AssetPicture images={asset?.images} />
            <label className=" my-4 h2">{asset?.title}</label>
            <Link
              href={`https://www.google.co.th/maps/place/${asset?.google_map_location}`}
              target="_blank"
              className="text-primary h4 font2 d-flex"
              style={{ textDecoration: "" }}
            >
              <IconCusttom src="/mdi_location.svg" />{" "}
              <ins>{asset?.location}</ins>
            </Link>
            <Row className="mb-3 justify-content-between">
              <div className="col-auto">
                <label className="btn btn-primary">{asset?.asset_type_name}</label>
              </div>
              <div className="col-auto d-flex align-items-center">
                <h3 className="text-primary px-2">฿ {asset?.price}</h3>
                <small>บาท</small>
              </div>
            </Row>
            <hr />
            <div className="d-flex mb-4">
              <IconCusttom src="/ic-lo1.svg" />
              <span className="font2">
                <span>เลขที่ฝากขาย</span>
                <span className="px-2">
                  {String(asset?.id).padStart(5, "0")}
                </span>
              </span>
            </div>
            <div className="d-flex mb-4">
              <IconCusttom src="/ic-lo2.svg" />
              <span className="font2">
                {Number(asset?.square_meter)} ตารางวา
              </span>
            </div>
            <div className="d-flex mb-4">
              <IconCusttom src="/bed.svg" />
              <span className="font2">{asset?.unit}</span>
            </div>
            <div className="d-flex mb-4">
              <IconCusttom src="/ic_calendar.svg" />
              <span className="font2">{asset?.created_at}</span>
            </div>
            <hr />
            <Row className="mb-3">
              {/* <div className="col-auto btn btn-secondary">ใกล้ห้างสรรพสินค้า</div> */}
            </Row>
            <h3>ชื่อโครงการ</h3>
            <div className="d-flex mb-4">
              <IconCusttom src="/ph_building.svg" />
              <span className="font2">{asset?.project_name}</span>
            </div>
            <Row>
              <div className="col-lg-8 mb-3 description">
                {asset?.description && <h3>รายละเอียด</h3>}
                {asset?.description}
              </div>
              <div className="col-lg-3">
                <div className="border">
                  <div className="info-header border-bottom p-3 d-flex flex-column">
                    <div className="d-flex justify-content-center mb-3">
                      <Image
                        alt=""
                        src="/user3.png"
                        width={100}
                        height={100}
                        style={{
                          width: "70px",
                          height: "auto",
                        }}
                        className="rounded-circle"
                        sizes="100vm"
                        priority
                      />
                    </div>
                    <div className="text-center">
                      ลงประกาศโดย : {asset?.owner?.fullname}{" "}
                      <FaCheckCircle className="text-success" />
                    </div>
                  </div>
                  <div className="info-body p-3 d-flex flex-column gap-3">
                    <div className="btn btn-light text-start px-3">
                      <FaPhoneAlt size={20} className="me-2" />
                      {asset?.owner?.phone_number}
                    </div>
                    <div className="btn btn-light text-start px-3">
                      <FaLine size={20} className="me-2" />
                      {asset?.owner?.line}
                    </div>
                    <div className="btn btn-light text-start px-3">
                      <TbMailFilled size={20} className="me-2" />
                      {asset?.owner?.email}
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </>
        )}
      </div>
    </>
  );
}

export default page;

const IconCusttom = ({
  src,
  width = 25,
  height = 25,
}: {
  src: string;
  width?: number;
  height?: number;
}) => {
  return (
    <div className="pe-1">
      <Image
        src={src}
        width={width}
        height={height}
        sizes="100vm"
        alt=""
        style={{ aspectRatio: 1 }}
        priority
      />
    </div>
  );
};
