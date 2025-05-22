"use client"
import { AnnouncementItem } from "@components/AnnouncementItem";
import { useSplButton } from "@components/context/LoaderContext";
import { LoadPage } from "@components/dev/LoadPage";
import { api } from "@utils/api/index";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
function page() {
  const [asset, setAsset] = useState<any[]>()
  const [loading, setLoading] = useState(true);
  const { setSplButton } = useSplButton();
  useEffect(() => {
    setSplButton({ name: "ลงประกาศ", href: "/", status: true })

    const fetchItem = async () => {
      try {
        setLoading(true)
        const { data: res } = await axios.get(api.internal(`/api/announcement`))
        if (res.status) {
          setAsset(res.data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [])



  return (
    <div className="rounded bg-white overflow-hidden">
      <div className="py-3 px-4 text-white bg-primary">ประกาศของฉัน</div>
      <div className="py-3 px-4">
        {loading ? <LoadPage /> : <>
          <Row className="border ps-3 pt-3 pe-3 profile-menu-search gap-0 gap-lg-2 align-items-center mb-4">
            <Link className="col pb-3 text-center" href="#">
              ทั้งหมด (24)
            </Link>
            <Link className="col pb-3 text-center" href="#">
              ออนไลน์ (15)
            </Link>
            <Link className="col pb-3 text-center" href="#">
              ออฟไลน์ (3)
            </Link>
            <Link className="col pb-3 text-center" href="#">
              แบบร่าง (3)
            </Link>
            <Link className="col pb-3 text-center" href="#">
              ถูกระงับ (3)
            </Link>
          </Row>
          {asset?.map((item: any, index) => (
            <div key={index} className="mb-4">
              <AnnouncementItem prompt={item} />
              <div className="d-flex justify-content-end gap-2">
                <Button variant="primary">แก้ไข</Button>
                <Button variant="success">ปิดประกาศ</Button>
              </div>
            </div>
          ))}
        </>}

      </div>
    </div>
  );
}

export default page;
