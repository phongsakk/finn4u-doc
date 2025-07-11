"use client";
import { AlertConfirm, AlertPrimary } from "@components/alert/SwalAlert";
import { AnnouncementItem } from "@components/AnnouncementItem";
import { useLoaderContext } from "@components/context/LoaderContext";
import { LoadPage } from "@components/dev/LoadPage";
import Pagination from "@components/dev/pagination";
import { api } from "@utils/api/index";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
function page() {
  const [asset, setAsset] = useState<any[]>();
  const [loading, setLoading] = useState(true);
  const { path, setSplButton } = useLoaderContext();
  const [page, setPage] = useState({
    page: 1,
    total: 1,
  });

  const changePage = (num: number) => {
    setPage((prev) => ({ ...prev, page: num }));
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const { data: res } = await axios.get(
          api.internal(`/api/announcement`),
          {
            params: {
              page: page.page,
            },
          }
        );
        if (res.status) {
          setAsset(res.data);
          setPage(res.page);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [page.page]);

  useEffect(() => {
    setSplButton({ name: "ลงประกาศ", href: "/", status: true });
  }, [path]);

  const handlePubilsh = async (itemID: number) => {
    AlertConfirm("ลงประกาศหรือไม่", "info", async () => {
      try {
        const { data: res } = await axios.post(
          api.internal(`/api/announcement/publish`),
          {
            sell_id: itemID,
          }
        );
        if (res.status) {
          AlertPrimary("ลงประกาศสำเร็จ", "error");
        } else {
          AlertPrimary("ลงประกาศสำเร็จ", "error");
        }
      } catch (error) {
        AlertPrimary("ลงประกาศไม่สำเร็จ", "error");
      }
    });
  };

  return (
    <div className="rounded bg-white overflow-hidden">
      <div className="py-3 px-4 text-white bg-primary">ประกาศของฉัน</div>
      <div className="py-3 px-4">
        {loading ? (
          <LoadPage />
        ) : (
          <>
            <Row className="border ps-3 pt-3 pe-3 profile-menu-search gap-0 gap-lg-2 align-items-center mb-4">
              <Link className="col pb-3 text-center" href="#">
                ทั้งหมด
              </Link>
              <Link className="col pb-3 text-center" href="#">
                ออนไลน์
              </Link>
              <Link className="col pb-3 text-center" href="#">
                ออฟไลน์
              </Link>
              <Link className="col pb-3 text-center" href="#">
                แบบร่าง
              </Link>
              <Link className="col pb-3 text-center" href="#">
                ถูกระงับ
              </Link>
            </Row>
            {asset?.map((item: any, index) => (
              <div key={index} className="mb-5">
                <AnnouncementItem prompt={item} />
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <Link
                    href={`/profile/announcement/${item.id}`}
                    className="btn btn-primary"
                  >
                    แก้ไข
                  </Link>
                  {item?.is_published ? (
                    <Button variant="success">ปิดประกาศ</Button>
                  ) : (
                    <Button
                      onClick={() => handlePubilsh(item.id)}
                      variant="success"
                    >
                      เปิดประกาศ
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
        <Pagination Page={page} change={changePage} />
      </div>
    </div>
  );
}

export default page;
