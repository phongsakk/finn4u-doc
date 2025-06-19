"use client";
import { modalParam } from "@models/modalParam";
import CustomImage from "@components/CustomImage";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Modal_interest from "./modal_interest";
import Modal_infoconsign from "./modal_infoconsign";
import Modal_usertell from "./modal_usertell";
import axios from "axios";
import { api } from "@utils/api/index";
import ImageApi from "@components/ImageApi";
import { formatCurrency, formatNumber } from "@components/helpers";
import { Row } from "react-bootstrap";
import i1 from "@public/cos-ic1.svg";
import i2 from "@public/cos-ic2.svg";
import i3 from "@public/cos-ic3.svg";
import Image from "next/image";

function page() {
  const [form, setForm] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const boot = async () => {
      try {
        setLoading(true);
        const { data: res } = await axios.get(api.internal(`/api/investor`))
        if (res?.status) {
          setForm(res?.data || [])
        }
      } finally {
        setLoading(false);
      }
    }
    boot();
  }, [])

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
                <Row className="not-sale mb-3">
                  {form?.map((item: any, index: number) => (
                    <Row className="col-12 p-1 p-sm-2 p-md-3 p-lg-4 border shadow" key={index}>
                      <div className="col-lg-4 px-0 border">
                        <div className="relative">
                          <ImageApi src={item?.asset_image} />
                        </div>
                      </div>
                      <Row className="col-lg-8 mx-0 my-0 px-3 py-3">
                        <Row className="mx-0 my-0 align-items-center">
                          <Detail icon={i1} el={item?.province_name} />
                          <Detail icon={i2} el={<>เลขที่ฝากขาย ${String(item.id).padStart(5, "0")}</>} />
                          <Detail icon={i3} el={item?.aria_size} />
                          <Detail icon={i3} el={<><span>มูลค่าสินทรัพย์ค้ำประกัน</span>
                            <span className="text-primary">{item?.collateral_price}</span></>} />
                          <Detail icon={i1} el={<><span className="w-100">ราคาขายฝาก</span>
                            <span className="text-primary">{item?.price_appraisal}</span>
                            <span>บาท</span></>} />
                          <Detail icon={i3} el={<>ลงทุนวันที่ {item?.bid_date}</>} />
                          <div className="col-4">
                          </div>
                        </Row>
                        {/* <div className="locataion row mx-0 mb-0 align-items-center">
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
                        </div> */}
                      </Row>
                    </Row>
                  ))}

                </Row>

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

export default page;


const Detail = ({ icon, el }: { icon: any, el: React.JSX.Element }) => {
  return (
    <Row className="mx-0 mb-2 col-8">
      <div className="col-2 px-1 px-sm-1 px-md-2 px-lg-3">
        <Image src={icon} alt="" />
      </div>
      <div className="col-10">
        <span className="w-100">{el}</span>
      </div>
    </Row>
  )
}