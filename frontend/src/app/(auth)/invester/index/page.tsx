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
import { Button, Row } from "react-bootstrap";
import i1 from "@public/cos-ic1.svg";
import i2 from "@public/cos-ic2.svg";
import i3 from "@public/cos-ic3.svg";
import igraph from "@public/graph-ic.svg";
import iInfo from "@public/info.svg";
import iUsertell from "@public/usertell.svg";
import Image from "next/image";
import { PromptModal } from "@models/promptmodal";
import Loading from "@components/dev/loading";

const promptModal = {
  id: 0,
  show: false,
};

function page() {
  const [form, setForm] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [interestModel, setInterest] = useState<PromptModal>(promptModal);
  const [infoModel, setInfo] = useState<PromptModal>(promptModal);
  const [tellModel, setTell] = useState<PromptModal>(promptModal);

  useEffect(() => {
    const boot = async () => {
      try {
        setLoading(true);
        const { data: res } = await axios.get(api.internal(`/api/investor`));
        if (res?.status) {
          setForm(res?.data || []);
        }
      } finally {
        setLoading(false);
      }
    };
    boot();
  }, []);

  const OpenInterest = (ID: number) => {
    setInterest({ id: ID, show: true });
  };
  const CloseInterest = () => {
    setInterest(promptModal);
  };

  const OpenInfo = (ID: number) => {
    setInfo({ id: ID, show: true });
  };
  const CloseInfo = () => {
    setInfo(promptModal);
  };

  const OpenTell = (ID: number) => {
    setTell({ id: ID, show: true });
  };
  const CloseTell = () => {
    setTell(promptModal);
  };

  return (
    <>
      <Modal_interest model={interestModel} Close={CloseInterest} />
      <Modal_infoconsign model={infoModel} Close={CloseInfo} />
      <Modal_usertell model={tellModel} Close={CloseTell} />

      <div className="consignment-form2 investment-form2">
        <div className="container">
          <div className="card-form-main px-1 px-sm-2 px-md-3 px-lg-4">
            <h4 className="title-main mb-5 mt-5 font2">ข้อมูลการลงทุน</h4>

            <div className="container">
              <div className="land-sale-2">
                {loading ? (
                  <Loading />
                ) : (
                  <Row className="not-sale mb-3 mx-0">
                    {form?.map((item: any, index: number) => (
                      <Row
                        className="mx-0 col-12 p-1 p-sm-2 p-md-3 p-lg-4 border shadow"
                        key={index}
                      >
                        <div className="col-lg-4 px-0 border">
                          <div className="relative">
                            <ImageApi src={item?.asset_image} />
                          </div>
                        </div>
                        <Row className="col-lg-8 mx-0 my-0 px-1 px-sm-1 px-md-2 px-lg-3 py-3 mb-3">
                          <Row className="col-lg-10 mx-0 my-0 mb-3 mb-sm-0 mb-md-0 mb-lg-0 align-items-center">
                            <Detail icon={i1} el={item?.province_name} />
                            <Detail
                              icon={i2}
                              el={
                                <>
                                  เลขที่ฝากขาย{" "}
                                  {String(item.id).padStart(5, "0")}
                                </>
                              }
                            />
                            <Detail icon={i3} el={item?.aria_size} />
                            <Detail
                              icon={i3}
                              el={
                                <>
                                  <span>มูลค่าสินทรัพย์ค้ำประกัน</span>
                                  <span className="text-primary">
                                    {item?.collateral_price}
                                  </span>
                                </>
                              }
                            />
                            <Detail
                              icon={i1}
                              el={
                                <>
                                  <span className="w-100">ราคาขายฝาก</span>
                                  <span className="text-primary">
                                    {item?.price_appraisal}
                                  </span>
                                  <span>บาท</span>
                                </>
                              }
                            />
                            <Detail
                              icon={i3}
                              el={<>ลงทุนวันที่ {item?.bid_date}</>}
                            />
                          </Row>
                          <Row className="col-lg-2 mx-0 my-0 justify-content-center align-content-center">
                            <EventButton
                              icon={igraph}
                              onClick={() => OpenInterest(item?.id)}
                            />
                            <EventButton
                              icon={iInfo}
                              onClick={() => OpenInfo(item?.id)}
                            />
                            <EventButton
                              icon={iUsertell}
                              onClick={() => OpenTell(item?.id)}
                            />
                          </Row>
                        </Row>
                      </Row>
                    ))}
                  </Row>
                )}

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

const Detail = ({ icon, el }: { icon: any; el: React.JSX.Element }) => {
  return (
    <Row className="mx-0 mb-2 col-12 col-sm-12 col-md-12 col-lg-8">
      <div className="col-2 px-1 px-sm-1 px-md-1 px-lg-1">
        <Image src={icon} alt="" />
      </div>
      <div className="col-10">
        <span className="w-100">{el}</span>
      </div>
    </Row>
  );
};

const EventButton = ({ icon, onClick }: { icon: any; onClick: () => void }) => {
  return (
    <div className="col-4 col-sm-4 col-md-4 col-lg-12 mb-2 text-center">
      <Button variant="" className="border shadow-sm" onClick={onClick}>
        <Image src={icon} alt="" />
      </Button>
    </div>
  );
};
