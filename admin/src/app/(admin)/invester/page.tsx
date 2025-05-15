<<<<<<< HEAD
import Navbar from '@component/layout/Navbar'
import React from 'react'

const investor = () => {
  return (
    <>
      <Navbar title="นักลงทุน" />
      <main className="content">
        <div className="container-fluid p-0 overflow-x-auto">
          <div className="row mb-3">
            <div className="col-md-3 col-lg-3 col-12 col-sm-6">
              <select name="order-by" id="order-by" defaultValue={""} className="form-select" aria-placeholder='sss'>
                <option value="" disabled>เรียงตาม</option>
                <option value="created_at">วันที่</option>
                <option value="asset_type_id">ประเภททรัพย์สิน</option>
              </select>
            </div>
          </div>

          <div className="container-fluid p-0">
            <div className="card flex-fill px-3 py-3">
              <table className="table table-hover my-0">
                <thead className="table-success">
                  <tr>
                    <th className="text-bold">วัน/เดือน/ปี</th>
                    <th>ชื่อ - สกุล</th>
                    <th>
                      <div className="dropdown drop-2">
                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          ที่ตั้งทรัพย์สิน
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li><a className="dropdown-item" href="#">ทั่วประเทศ</a></li>
                          <li><a className="dropdown-item" href="#">กรุงเทพฯและปริมณฑล</a></li>
                          <li><a className="dropdown-item" href="#">ภาคกลาง</a></li>
                          <li><a className="dropdown-item" href="#">ภาคเหนือ</a></li>
                          <li><a className="dropdown-item" href="#">ภาคอีสาน</a></li>
                          <li><a className="dropdown-item" href="#">ภาคใต้</a></li>
                          <li><a className="dropdown-item" href="#">ภาคตะวันออก</a></li>
                        </ul>
                      </div>
                    </th>
                    <th></th>
                    <th>จำนวนเงินที่ต้องการลงทุน</th>
                    <th>
                      <div className="dropdown drop-2">
                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          สถานะ
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li><a className="dropdown-item" href="#">รอยืนยันตัวตน</a></li>
                          <li><a className="dropdown-item" href="#">ยืนยันตัวตนแล้ว</a></li>
                        </ul>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>16/10/2022 15:33:47</td>
                    <td><span className="text-primary">Serena Franklin</span></td>
                    <td>กรุงเทพฯ</td>
                    <td>คอนโด</td>
                    <td>
                      &lt; 1,000,000</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">2</a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

          </div>
        </div>
      </main>
    </>
  )
}

export default investor
=======
"use client";
import { LoadPage } from "@component/dev/LoadPage";
import Pagination from "@component/dev/pagination";
import { Page } from "@models/common";
import { api } from "@utils/api";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaPenSquare } from "react-icons/fa";

const page = () => {
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
                const { data: res_data } = await axios.get(
                    api.internal(`/api/invester`)
                    , {
                        params: {
                            page: page.page,
                        },
                    });

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
                                <th>วันที่</th>
                                <th>ชื่อ - สกุล</th>
                                <th>ที่ตั้งทรัพย์สิน</th>
                                <th>ประเภท</th>
                                <th className="text-center">จำนวนเงินที่ต้องการลงทุน</th>
                                <th className="text-center">สถานะ</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData?.map((item: any, index: number) => (
                                <tr key={index}>
                                    <td >{item?.datetime}</td>
                                    <td >{item.fullname}</td>
                                    <td >{item.location}</td>
                                    <td >{item.asset_type}</td>
                                    <td className="text-center">{item.investment_amount}</td>
                                    <td className={`text-center fw-bold ${item.verified ? "text-success" : "text-warning"}`}>{item.verified ? "ยืนยันตัวตนแล้ว" : "รอดำเนินการ"}</td>
                                    <td className="text-center">
                                        <Link
                                            href={`/invester/${item.id}`}
                                            role="button"
                                            className="btn btn-light text-success"
                                        >
                                            <FaPenSquare size={20} />
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

export default page;
>>>>>>> 8e623a6e4ab919a4e72cf27a128f6a1c61f39f3e
