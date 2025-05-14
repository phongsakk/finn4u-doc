"use client";
import { LoadPage } from "@components/dev/LoadPage";
import { formatNumber, ToDateThai } from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function page() {
  const params = useParams();
  const [form, setForm] = useState<any>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const boot = async () => {
      try {
        setLoading(true);
        const { data: res } = await axios.get(
          api.internal(`/api/consignor/asset/${params.id}`)
        );
        if (res.status) {
          setForm(res.data);
        } else {
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    boot();
  }, [params.id]);
  return (
    <div className="consignment-form3">
      <div className="container">
        {loading ? (
          <LoadPage />
        ) : (
          <div className="card-form-main">
            <h4 className="title-main mb-5 mt-5">ข้อมูลการขายฝาก</h4>
            <div className="form">
              <ul className="row1">
                <li>
                  <span>วันที่ขายฝาก</span>
                  <p>{ToDateThai(form?.date_sell || null, "DD/MM/BBBB")}</p>
                </li>
                <li>
                  <span>วันที่สิ้นสุดการขายฝาก</span>
                  <p>{ToDateThai(form?.end_sell || null, "DD/MM/BBBB")}</p>
                </li>
                <li>
                  <span>ระยะเวลา</span>
                  <p>{form?.duration} ปี</p>
                </li>
              </ul>

              <ul className="row2">
                <li>
                  <p>ราคาประเมินทรัพย์สิน</p>
                  <p>{formatNumber(form?.price_appraisal)} บาท</p>
                </li>
              </ul>

              <p className="title">ค่าใช้จ่ายในการฝากขายสินทรัพย์</p>

              <ul className="row4">
                <li>
                  <span>อัตราดอกเบี้ย/ปี</span>
                  <p>
                    {formatNumber(form?.price_appraisal * 0.1 * form?.duration)}{" "}
                    บาท
                  </p>
                </li>
                <li>
                  <span>ค่าคำขอโอนที่ดิน</span>
                  <p>5 บาท</p>
                </li>
                <li>
                  <span>ค่าอากร</span>
                  <p>5 บาท</p>
                </li>
                <li>
                  <span>ค่าพยาน</span>
                  <p>20 บาท</p>
                </li>
                <li>
                  <span>ค่าธรรมเนียมโอนที่ดิน</span>
                  <p>29,000 บาท</p>
                </li>
                <li>
                  <span>ค่าอากรแสตมป์</span>
                  <p>7,250 บาท</p>
                </li>
                <li>
                  <span>ค่าภาษีธุกิจเฉพาะ</span>
                  <p>47,850 บาท</p>
                </li>
                <li>
                  <span>รวม</span>
                  <p>214,630 บาท</p>
                </li>
                <li>
                  <span>อัตราดอกเบี้ย/ปี</span>
                  <p>130,500 บาท</p>
                </li>
              </ul>

              <ul className="row5">
                <li>
                  <p>จำนวนเงินที่ได้รับ</p>
                  <div>
                    <span className="bg-promary">1,365,900 </span>
                    <span className="text-dark">บาท</span>
                  </div>
                </li>
              </ul>

              <div className="doc align-items-baseline">
                <p className="text-dark">สัญญาการขายฝากกับ Finn4U</p>
                <Link href="#">
                  <span>เอกสาร</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default page;
