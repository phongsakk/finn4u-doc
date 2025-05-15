"use client";
import { LoadPage } from "@component/dev/LoadPage";
import Pagination from "@component/dev/pagination";
import { api } from "@utils/api";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaPenSquare } from "react-icons/fa";
import { Page } from "@models/common";
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
                    api.internal(`/api/consignor`)
                    , {
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
                                <th>วันที่</th>
                                <th>ชื่อ - สกุล</th>
                                <th>เบอร์โทรศัพท์</th>
                                <th>อาชีพ</th>
                                <th>รายได้ต่อเดือน</th>
                                <th>อีเมล</th>
                                <th>ที่อยู่ปัจจุบัน</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData?.map((item: any, index: number) => (
                                <tr key={index}>
                                    <td >{item?.datetime}</td>
                                    <td >{item?.fullname}</td>
                                    <td >{item?.phone_number}</td>
                                    <td >{item?.career}</td>
                                    <td >{item?.salary}</td>
                                    <td >{item?.email}</td>
                                    <td >{item?.province_name}</td>
                                    <td className="text-center">
                                        <Link
                                            href={`/consignor/${item.id}`}
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
