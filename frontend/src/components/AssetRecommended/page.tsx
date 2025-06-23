"use client";
import ImageApi from "@components/ImageApi";
import LoadingBox from "@components/Loading/LoadingBox";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "@utils/api/index";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
dayjs.extend(customParseFormat);
dayjs.locale("th");

function RecommendedPage() {
  const [form, setForm] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({
    page: 1,
    total: 1,
  });

  console.log(page);
  useEffect(() => {
    const boot = async (controller: AbortController) => {
      try {
        setLoading(true);
        const { data: res } = await axios.get(
          api.internal(`/api/consignor/asset/recommended?page=${page.page}`),
          {
            signal: controller.signal,
          }
        );
        if (res?.status) {
          setForm((prev: any) => [...prev, ...res?.data]);
          setPage(res?.page);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };
    const controller = new AbortController();
    boot(controller);
    return () => {
      controller.abort();
    };
  }, [page.page]);

  const handleMore = () => {
    setPage((prev) => ({
      ...prev,
      page: page.page + 1,
    }));
  };

  return (
    <>
      {form.map((item: any, i: number) => (
        <div className="col-lg-4 mb-" key={i}>
          <div className="card overflow-hidden">
            <div className="head">
              <div className="not-hover position-relative">
                <div className="d-flex mx-0 px-3 pt-3 gap-2 position-absolute">
                  <div className="bg-primary text-white p-2 rounded font2">
                    {item?.asset_type}
                  </div>
                  <div className="bg-primary text-white p-2 rounded font2">
                    {item?.sell_type}
                  </div>
                </div>
                <ImageApi
                  src={item?.image ?? ""}
                  style={{ aspectRatio: 1.33, height: "auto" }}
                />
              </div>
              <div className="hover">
                <div className="d-none">
                  <div className="wrap">
                    {/* <Link
                      href={`/${item?.path}/detail/${item?.id}`}
                      className="btn btn-primary  font2"
                    >
                      ลงทุน
                    </Link> */}
                    <Link
                      href={`/${item?.path}/detail/${item?.id}`}
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
                <span className="font2">{item?.province_name}</span>
              </div>
              <div className="list">
                <FontAwesomeIcon icon={faCheck} className="fs-4" />
                <span className="font2">
                  เลขที่ประกาศขาย {item?.id.toString().padStart(6, "0")}
                </span>
              </div>
              <div className="list">
                <FontAwesomeIcon icon={faCheck} className="fs-4" />
                <span className="font2">{item?.aria_size}</span>
              </div>
              <div className="list">
                <FontAwesomeIcon icon={faCheck} className="fs-4" />
                <span className="font2">
                  ราคาขาย
                  <span className="text-primary font2 px-1">{item?.price}</span>
                  บาท
                </span>
              </div>
              <div className="list">
                <FontAwesomeIcon icon={faCheck} className="fs-4" />
                <span className="font2">{item?.recommended_at}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {loading && <LoadingBox />}
      {page.page != page.total && (
        <div className="text-center mb-5">
          <Button
            variant="outline-success rounded-pill px-5 py3"
            onClick={handleMore}
          >
            แสดงเพิ่มเติม
          </Button>
        </div>
      )}
    </>
  );
}

export default RecommendedPage;
