"use client";
import { AlertPrimary } from "@component/alert/SwalAlert";
import CheckBox from "@component/dev/CheckBox";
import { LoadPage } from "@component/dev/LoadPage";
import Pagination from "@component/dev/pagination";
import { Page } from "@models/common";
import { api } from "@utils/api";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";

const page = () => {
  const [tableData, setTableData] = useState([]);
  const [loadPage, setLoadPage] = useState(true);
  const [FatchFail, setFatchFail] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [page, setPage] = useState(Page);
  const changePage = (num: number) => {
    setPage((prev) => ({ ...prev, page: num }));
  };

  useEffect(() => {
    const boot = async () => {
      try {
        setLoadPage(true);
        const { data: res_data } = await axios.get(
          api.internal(`/api/sellrent`),
          {
            params: {
              page: page.page,
            },
          }
        );

        if (res_data.status) {
          setTableData(res_data.data);
          setPage({ page: res_data.page, total: res_data.total });
        } else {
          setFatchFail(true);
        }
      } catch (error) {
        setFatchFail(true);
      } finally {
        setLoadPage(false);
      }
    };
    boot();
  }, [page.page]);

  const handleRec = async (status: boolean, itemID: number) => {
    if (status) {
      try {
        const { data: res } = await axios.post(api.internal(`/api/sellrent/${itemID}/recommend`));
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleBlock = async (title: string, num: number) => {
    try {
      setSubmit(true);
      const { data: res } = await axios.post(
        api.internal(`/api/sellrent/block`),
        {
          sell_id: num,
        }
      );
      if (res.status) {
        AlertPrimary(`ระงับโพส "${title}" สำเร็จ`, "success").then(() => {
          window.location.reload();
        });
      } else {
        AlertPrimary(`ระงับโพส "${title}" ไม่สำเร็จ`, "error");
      }
    } catch (error) {
      AlertPrimary(`ระงับโพส "${title}" ไม่สำเร็จ`, "error");
    } finally {
      setSubmit(false);
    }
  };
  return (
    <>
      {loadPage ? (
        <LoadPage />
      ) : (
        <>
          {FatchFail === true ? (
            <span className="text-danger">ไม่สามารถโหลดข้อมูลได้..</span>
          ) : null}
          <table className="table table-hover my-0">
            <thead className="table-success">
              <tr>
                <th>วันที่ลงขายฝาก</th>
                <th>ชื่อบัญชี</th>
                <th>รายการประกาศ</th>
                <th>Agency</th>
                <th>ประเภทประกาศ</th>
                <th>ประเภททรัพย์สิน</th>
                <th className="text-center">แนะนำ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{item?.created_at}</td>
                  <td>{item?.fullname}</td>
                  <td className="truncate max-w-[200px] whitespace-nowrap overflow-hidden">{item?.title}</td>
                  <td className={item?.agency_required ? "text-success" : ""}>
                    {item?.agency_required ? "ต้องการ" : "ไม่ต้องการ"}
                  </td>
                  <td>{item?.sell_type}</td>
                  <td>{item?.asset_type}</td>
                  <td className="text-center"><CheckBox status={item?.recommended_at} itemId={item?.id} handleChange={handleRec} /></td>
                  <td className="text-center">
                    <Link href={item?.view_front ?? "#"} className="btn btn-ligt me-2">
                      <FaEye className="text-success" />
                    </Link>
                    <Button
                      variant={item?.is_disabled ? "secondary" : "success"}
                      onClick={() => handleBlock(item?.title, item.id)}
                    >
                      ระงับ
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination Page={page} change={changePage} />
        </>
      )}
    </>
  );
};

export default page;
