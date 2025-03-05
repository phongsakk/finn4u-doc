"use client";
import CustomImage from "@components/CustomImage";
import Link from "next/link";
import { useState } from "react";

function page() {
  const [terms, setTerms] = useState<boolean>();
  return (
    <div className="consignment-warning">
      <div className="container register-seller">
        <div className="card-form-main">
          <div className="wrap">
            <h4 className="title-main ">ขายฝากกับ Finn4U</h4>

            <div className="step">
              <div className="child">
                <CustomImage
                  src="/consig-stp1.png"
                  alt="consig-stp1"
                  style={{
                    width: "50%",
                    height: "auto",
                  }}
                />
                <p>ศึกษาข้อมูลตัดสินใจขายฝาก</p>
              </div>
              <div className="polygon">
                <CustomImage
                  src="/Polygon2.png"
                  alt="Polygon2"
                  style={{
                    width: "20px",
                    height: "auto",
                  }}
                />
              </div>
              <div className="child">
                <CustomImage
                  src="/consig-stp2.png"
                  alt="consig-stp2"
                  style={{
                    width: "50%",
                    height: "auto",
                  }}
                />

                <p className="text-secondary">
                  ระบบทำการ Matchingผู้ขายฝากและนักลงทุนน
                </p>
              </div>
              <div className="polygon">
                <CustomImage
                  src="/Polygon2.png"
                  alt="Polygon2"
                  style={{
                    width: "20px",
                    height: "auto",
                  }}
                />
              </div>
              <div className="child">
                <CustomImage
                  src="/consig-stp3.png"
                  alt="consig-stp3"
                  style={{
                    width: "50%",
                    height: "auto",
                  }}
                />
                <p className="text-secondary">ตกลงทำสัญญาที่สำนักงานที่ดิน</p>
              </div>
            </div>
          </div>

          <div className="detail">
            <p className="fw-bold">ในกรณีบุคคลธรรมดา:</p>
            <p>
              ค่าภาษีเงินได้หัก ณ ที่จ่าย คิดตามเกณฑ์ของกรมสรรพากร
              ค่าธรรมเนียมการโอน 2% คิดจากราคาประเมินของทางราชการ ค่าอากรแสตมป์
              0.5% หรือภาษีธุรกิจเฉพาะ 3.3% (คิดอย่างใดอย่างหนึ่ง)
              คิดจากราคาซื้อ-ขายฝาก แต่ถ้าราคาซื้อ-ขายฝากต่ำกว่า ราคาประเมิน
              ให้ใช้ราคาประเมินราชการ ค่าคำขอ ค่าพยาน ตามเกณฑ์ของกรมที่ดิน
            </p>
            <p className="fw-bold">ในกรณีนิติบุคคล:</p>
            <p>
              ค่าภาษีเงินได้หัก ณ ที่จ่าย 1%
              ของราคาซื้อ-ขายหรือราคาประเมินราชการ
              (อย่างใดอย่างหนึ่งที่มูลค่าสูงกว่า) ค่าธรรมเนียมการโอน 2%
              คิดจากราคาประเมินของทางราชการ ค่าอากรแสตมป์ 0.5%
              หรือภาษีธุรกิจเฉพาะ 3.3% (คิดอย่างใดอย่างหนึ่ง)
              คิดจากราคาซื้อ-ขายฝาก แต่ถ้าราคา ซื้อ-ขายฝากต่ำกว่าราคาประเมิน
              ให้ใช้ราคาประเมินราชการ ค่าคำขอ ค่าพยาน ตามเกณฑ์ของกรมที่ดิน
            </p>
            <p className="fw-bold">ค่านิติกรรมอื่นๆ:</p>
            <p>
              ค่าต่อสัญญาขายฝาก แปลงละ 50 บาท ค่าไถ่ถอนการขายฝาก
              ต้องเสียค่าใช้จ่ายที่สำนักงานที่ดินอีกครั้ง
              ทั้งในกรณีบุคคลธรรมดาและนิติบุคคล โดยต้องเสียภาษีเงินได้หัก ณ
              ที่จ่าย ตามเกณฑ์ของกรมสรรพากร ค่าอากร 0.50% ค่าคำขอและค่าพยาน
              เสมือนการซื้อกลับมา โดยได้รับยกเว้นค่าภาษีธุรกิจเฉพาะ
              และค่าธรรมเนียม (โดยจะคิดค่าธรรมเนียมเหลือ 50 บาทต่อแปลง)
            </p>
          </div>

          <div className="mb-3 form-check mt-5">
            <input
              onChange={() => setTerms(true)}
              type="checkbox"
              className="form-check-input"
              name="terms"
              id="accept-terms"
            />
            <label className="form-check-label" htmlFor="accept-terms">
              ยอมรับเงื่อนไขและข้อตกลงทั้งหมด
            </label>
          </div>

          <div className="text-center">
            <Link
              href={terms === true ? "/consignment/add-form" : "#"}
              className="btn-icon  mt-5 mb-5"
            >
              <span>ยืนยันการขายฝาก</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default page;
