"use client";
import CustomImage from "@components/CustomImage";
import { FormInput } from "@components/FormCustom/FormInput";
import { formatNumber, Num, PercentageCal } from "@components/helpers";
import BarChart from "@components/Modal/Chart/BarChart";
import Link from "next/link";
import { useState } from "react";
const CustomForm = {
  price: "0",
  duration: "0"
}

function page() {
  const [form, setForm] = useState(CustomForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    const regex = /^(\d+(\.\d*)?|\.\d+)$/;

    if (regex.test(value) || value === "") {
      const lastChar = value.charAt(value.length - 1);

      setForm((prev) => ({
        ...prev,
        [e.target.name]: `${formatNumber(Number(value))}${lastChar == "." ? "." : ""
          }`,
      }));
    }
  };

  const result = PercentageCal(Num(form.price),9)

  return (
    <>
      <div className="ragister-content">
        <div className="container">
          <h4>
            ขายฝากได้ง่ายกับ
            <span className="text-primary h3">ทุนทันใจ</span>
          </h4>

          <div className="row">
            <div className="col-lg-4">
              <div className="group mt-3">
                <CustomImage
                  src="/menuregis4.png"
                  alt="/menuregis4"
                  style={{
                    width: "50%",
                    height: "auto",
                  }}
                />
                <p>ทุนทันใจ มีอสังหาฯมูลค่าสูง</p>
                <p>อสังหาริมทรัพย์มูลค่าสูงค้ำประกันง</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="group">
                <CustomImage
                  src="/menuregis5.png"
                  alt="/menuregis5"
                  style={{
                    width: "50%",
                    height: "auto",
                  }}
                />
                <p>ทุนทันใจ กับอัตราตอบแทน</p>
                <p>ด้วยอัตราผลตอบแทนสูง 9-12% ต่อปี</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="group mt-2">
                <CustomImage
                  src="/menuregis6.png"
                  alt="/menuregis6"
                  style={{
                    width: "50%",
                    height: "auto",
                  }}
                />
                <p>ทุนทันใจ หายห่วง</p>
                <p>ประเมินทรัพย์สินโดยบริษัทประเมิน</p>
                <p>ที่ได้รับความเห็นชอบจาก ก.ล.ต.</p>
              </div>
            </div>
          </div>

          <div className="btn-wrap">
            <Link className="btn btn-primary" href="/invester/form">
              เพิ่มข้อมูลสำหรับการลงทุน
            </Link>
          </div>
        </div>
      </div>

      <div className="calculate">
        <h2 className="text-center font2 m-3">
          ขายฝากได้ง่ายกับ
          <span className="text-primary font2 h4">ทุนทันใจ</span>
        </h2>

        <div className="container">
          <div className="group">
            <div className="row">
              <div className="col-lg-6">
                <h4 className="text-center font2">
                  คำนวณผลตอบแทนกับ
                  <span className="text-primary font2 i h4">ทุนทันใจ</span>
                </h4>
                <FormInput groupClass="col-12 mb-3" className="p-3 text-center" value={form.price == "0" || form.price == "-" ? "" : form.price} name="price" label="จำนวนเงินลงทุน (บาท)" placeholder="จำนวนเงินลงทุน (บาท)" onChange={handleChange} />
                <FormInput groupClass="col-12 mb-3" className="p-3 text-center" value={form.duration == "0" || form.duration == "-" ? "" : form.duration} name="duration" label="ระยะเวลาลงทุน (ปี)" placeholder="ระยะเวลาลงทุน (ปี)" onChange={handleChange} />
                <div className=" mb-3 font2">
                  <Link
                    onClick={(e) => e.preventDefault()}
                    href="#"
                    type="submit"
                    className="btn btn-primary p-3 w-100"
                  >
                    ผลตอบแทน (บาท/ปี)
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <BarChart price={Num(form.price)} result={result} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="register-seller">
        <div className="container">
          <div className="wrap">
            <div className="step">
              <div className="child">
                <CustomImage
                  src="/reg-step1.png"
                  alt="reg-step1"
                  style={{ height: "auto" }}
                />
                <p className="font2">ลงทะเบียน</p>
              </div>
              <div className="polygon">
                <CustomImage src="/Polygon2.png" alt="Polygon2" />
              </div>
              <div className="child">
                <CustomImage
                  src="/reg-step2.png"
                  alt="reg-step2"
                  style={{ height: "auto" }}
                />
                <p className="font2">ยืนยันตัวตน</p>
              </div>
              <div className="polygon">
                <CustomImage src="/Polygon2.png" alt="Polygon2" />
              </div>
              <div className="child">
                <CustomImage
                  src="/reg-step3.png"
                  alt="reg-step3"
                  style={{ height: "auto" }}
                />
                <p className="font2">อัพโหลดเอกสาร</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default page;
