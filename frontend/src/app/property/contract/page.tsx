import stepnotice1 from "@public/step-notice1.png";
import stepnotice2 from "@public/step-notice2.png";
import stepnotice3 from "@public/step-notice3.png";
import Polygon2 from "@public/Polygon2.png";
import Image from "next/image";
import Banner from "../banner";
import Link from "next/link";
function Warning() {
  return (
    <>
      <div className="register-seller invest-notice">
        <div className="container">
          <div className="card-form-main ">
            <div className="wrap">
              <h4 className="title-main font2">
                ลงทะเบียนเป็นผู้ขายฝากกับ Finn4U
              </h4>

              <div className="step">
                <div className="child">
                  <Image src={stepnotice1} alt="" />
                  <p className="font2">ศึกษาข้อมูลตัดสินใจลงทุน</p>
                </div>
                <div className="polygon">
                  <Image src={Polygon2} alt="" />
                </div>
                <div className="child pt-4">
                  <Image src={stepnotice2} alt="" />
                  <p className="text-secondary font2">ระบบทำการ Matching</p>
                  <p className="text-secondary font2"> ผู้ขายฝากและนักลงทุน</p>
                </div>
                <div className="polygon">
                  <Image src={Polygon2} alt="" />
                </div>
                <div className="child">
                  <Image src={stepnotice3} alt="" />

                  <p className="text-secondary font2">
                    ตกลงทำสัญญาที่สำนักงานที่ดิน
                  </p>
                </div>
              </div>

              <div className="detail">
                <p className="fw-bold font2">ในกรณีบุคคลธรรมดา</p>
                <p className="mb-4 font2">
                  ค่าภาษีเงินได้หัก ณ ที่จ่าย คิดตามเกณฑ์ของกรมสรรพากร
                  ค่าธรรมเนียมการโอน 2% คิดจากราคาประเมินของทางราชการ
                  ค่าอากรแสตมป์ 0.5% หรือภาษีธุรกิจเฉพาะ 3.3%
                  (คิดอย่างใดอย่างหนึ่ง) คิดจากราคาซื้อ-ขายฝาก
                  แต่ถ้าราคาซื้อ-ขายฝากต่ำกว่า ราคาประเมิน
                  ให้ใช้ราคาประเมินราชการ ค่าคำขอ ค่าพยาน ตามเกณฑ์ของกรมที่ดิน
                </p>
                <p className="fw-bold font2">ในกรณีนิติบุคคล:</p>
                <p className="mb-4 font2">
                  ค่าภาษีเงินได้หัก ณ ที่จ่าย 1%
                  ของราคาซื้อ-ขายหรือราคาประเมินราชการ
                  (อย่างใดอย่างหนึ่งที่มูลค่าสูงกว่า) ค่าธรรมเนียมการโอน 2%
                  คิดจากราคาประเมินของทางราชการ ค่าอากรแสตมป์ 0.5%
                  หรือภาษีธุรกิจเฉพาะ 3.3% (คิดอย่างใดอย่างหนึ่ง)
                  คิดจากราคาซื้อ-ขายฝาก แต่ถ้าราคา ซื้อ-ขายฝากต่ำกว่าราคาประเมิน
                  ให้ใช้ราคาประเมินราชการ ค่าคำขอ ค่าพยาน ตามเกณฑ์ของกรมที่ดิน
                </p>
                <p className="fw-bold font2">ค่านิติกรรมอื่นๆ:</p>
                <p className="font2">
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
                  type="checkbox"
                  className="form-check-input mx-3"
                  id="exampleCheck1"
                />
                <label
                  className="form-check-label font2"
                  htmlFor="exampleCheck1"
                >
                  ยอมรับเงื่อนไขและข้อตกลงทั้งหมด
                </label>
              </div>

              <div className="submit-group">
                <Link
                  href="/property/contract/upload-doc"
                  className="btn btn-primary font2"
                >
                  ยืนยันการลงทุน
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Warning;
