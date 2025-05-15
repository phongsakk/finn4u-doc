"use client";
import { LoadPage } from "@component/dev/LoadPage";
import { api } from "@utils/api";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdPersonSearch } from "react-icons/md";

const page = () => {
    const [tableData, setTableData] = useState([]);
    const [loadPage, setLoadPage] = useState(true);
    const [FatchFail, setFatchFail] = useState(false);
    useEffect(() => {
        const boot = async () => {
            try {
                const { data: res_data } = await axios.get(
                    api.internal(`/api/consignor`)
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
                                <th>วันที่</th>
                                <th>ชื่อ - สกุล</th>
                                <th>ที่ตั้งทรัพย์สิน</th>
                                <th>ประเภท</th>
                                <th>จำนวนเงินที่ต้องการลงทุน</th>
                                <th>ประเภททรัพย์สิน</th>
                                <th>สถานะ</th>
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
                                    <td >{item.investment_amount}</td>
                                    <td className={`text-center ${item.verified ? "text-success" : "text-warning"}`}>{item.verified ? "ยืนยันตัวตนแล้ว" : "รอดำเนินการ"}</td>
                                    <td className="text-center">
                                        <Link
                                            href={`/consignor/${item.id}`}
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

export default page;
