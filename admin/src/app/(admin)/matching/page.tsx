"use client";
import { LoadPage } from "@component/dev/LoadPage";
import Pagination from "@component/dev/pagination";
import { Page } from "@models/common";
import { api } from "@utils/api";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdPersonSearch } from "react-icons/md";

const matching = () => {
  const [tableData, setTableData] = useState([]);
  const [loadPage, setLoadPage] = useState(true);
  const [FatchFail, setFatchFail] = useState(false);
  const [page, setPage] = useState(Page);
  const changePage = (num: number) => {
    setPage((prev) => ({ ...prev, page: num }));
  };

  useEffect(() => {
    const boot = async () => {
      try {
        setLoadPage(true)
        const { data: res_data } = await axios.get(
          api.internal(`/api/matching`), {
          params: {
            page: page.page
          }
        }
        );

        if (res_data.status) {
          setTableData(res_data.data);
          setPage({ page: res_data.page, total: res_data.total })
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
                <th>เลขที่ฝากขาย</th>
                <th>ผู้ขายฝาก</th>
                <th>เบอร์โทรศัพท์</th>
                <th>จังหวัดที่ตั้งทรัพย์สิน</th>
                <th>ประเภททรัพย์สิน</th>
                <th>ราคาขายฝาก</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{item.date_sell}</td>
                  <td>{item.gen_id}</td>
                  <td>{item.consignor_name}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.province_name}</td>
                  <td>{item.asset_type}</td>
                  <td>{item.collateral_price}</td>
                  <td className="text-center">
                    <Link
                      href={`/matching/${item.id}`}
                      role="button"
                      className="btn btn-light text-success"
                    >
                      <MdPersonSearch />
                    </Link>
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

export default matching;
