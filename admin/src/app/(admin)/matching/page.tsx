"use client";
import { LoadPage } from "@component/dev/LoadPage";
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
  useEffect(() => {
    const boot = async () => {
      try {
        const { data: res_data } = await axios.get(
          api.internal(`/api/matching`)
        );

        if (res_data.status) {
          setTableData(res_data.data);
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
  }, []);
  return (
    <div className="card flex-fill px-3 py-3">
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
                  <td className="text-center">{item.date_sell}</td>
                  <td className="text-center">{item.gen_id}</td>
                  <td className="text-center">{item.consignor_name}</td>
                  <td className="text-center">{item.phone_number}</td>
                  <td className="text-center">{item.province_name}</td>
                  <td className="text-center">{item.asset_type}</td>
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
        </>
      )}
    </div>
  );
};

export default matching;
