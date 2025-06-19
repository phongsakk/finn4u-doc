"use client";
import { useLoaderContext } from "@components/context/LoaderContext";
import { LoadPage } from "@components/dev/LoadPage";
import { formatNumber, ToDateThai } from "@components/helpers";
import { FinanceForm } from "@models/finance";
import { api } from "@utils/api/index";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

function page() {
    const { id } = useLoaderContext();
    const [form, setForm] = useState<any>(FinanceForm);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const boot = async () => {
            try {
                setLoading(true);
                const { data: res } = await axios.get(
                    api.internal(`/api/consignor/finance/${id}`)
                );
                if (res.status) {
                    setForm(res.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        if (id != undefined) {
            boot();
        } else {
            setForm(undefined)
        }
    }, [id]);

    return (
        <div className="consignment-form3">
            <div className="container">
                {loading ? (
                    <LoadPage />
                ) : (<>
                    <h3 className="bg-primary text-white p-4 text-center mb-0 mt-5">ข้อมูลการขายฝาก</h3>
                    <div className="bg-white p-1 p-sm-3 p-md-4 p-lg-5">
                        <div className="form p-1 p-sm-3 p-md-4 p-lg-5">
                            <ul className="row1">
                                <li>
                                    <span>วันที่ขายฝาก</span>
                                    <p>{form?.date_sell}</p>
                                </li>
                                <li>
                                    <span>วันที่สิ้นสุดการขายฝาก</span>
                                    <p>{form?.end_sell}</p>
                                </li>
                                <li>
                                    <span>ระยะเวลา</span>
                                    <p>{form?.duration} ปี</p>
                                </li>
                            </ul>

                            <ul className="row2">
                                <li>
                                    <p>ราคาประเมินทรัพย์สิน</p>
                                    <p>{form?.appraisal_price} บาท</p>
                                </li>
                            </ul>

                            <p className="title">ค่าใช้จ่ายในการฝากขายสินทรัพย์</p>
                            <RowBox label="อัตราดอกเบี้ย/ปี" value={form?.interest_rate} />
                            <RowBox label="ค่าคำขอโอนที่ดิน" value={form?.land_transfer} />
                            <RowBox label="ค่าอากร" value={form?.duty} />
                            <RowBox label="ค่าพยาน" value={form?.witness} />
                            <RowBox label="ค่าธรรมเนียมโอนที่ดิน" value={form?.land_transfer_tax} />
                            <RowBox label="ค่าอากรแสตมป์" value={form?.stamp} />
                            <RowBox label="ค่าภาษีธุกิจเฉพาะ" value={form?.specific_business_tax} className="mb-3" />
                            <RowBox label="รวม" value={form?.total} className="fw-bold mb-5" />
                            <ul className="row5">
                                <li>
                                    <p>จำนวนเงินที่ได้รับ</p>
                                    <div>
                                        <span className="bg-promary">{form?.price_received} </span>
                                        <span className="text-dark">บาท</span>
                                    </div>
                                </li>
                            </ul>

                            <div className="doc align-items-baseline">
                                <p className="text-dark">สัญญาการขายฝากกับ ทุนทันใจ</p>
                                <Link href="#">
                                    <span>เอกสาร</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
                )}
            </div>
        </div>
    );
}
export default page;

const RowBox = ({ label, value, className="mb-2" }: { label: string, value: string, className?: string }) => {
    return (<Row className={`ps-1 ps-sm-2 ps-md-3 ps-lg-4 ${className}`}>
        <div className="col-6 ps-2 ps-sm-3 ps-md-4 ps-lg-5" style={{ color: "#a4a4a4", fontSize: "18px" }}>{label}</div>
        <div className="col-6 text-end">{value} บาท</div>
    </Row>)
}