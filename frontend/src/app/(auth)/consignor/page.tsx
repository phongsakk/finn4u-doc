import CustomImage from "@components/CustomImage";
import Link from "next/link";

function Consignment() {
  return (
    <>
      <div className="ragister-content">
        <div className="container">
          <h4>
            ขายฝากได้ง่ายกับ <span className="text-primary h2">ทุนทันใจ</span>
          </h4>

          <div className="row">
            <div className="col-lg-4">
              <div className="group">
                <CustomImage src="/menuregis1.png" alt="menuregis1" />
                <p>ทุนทันใจ กับการลดภาระดอกเบี้ย</p>
                <p>ลดภาระดอกเบี้ยขายฝากที่สูง</p>
                <p>เหลือเพียง 0.75% ต่อเดือน</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="group">
                <CustomImage src="/menuregis2.png" alt="menuregis2" />
                <p>ทุนทันใจ กับการลดภาระดอกเบี้ย</p>
                <p>ราคารับขายฝากสูงสุดถึง 70%</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="group">
                <CustomImage src="/menuregis3.png" alt="menuregis3" />
                <p>ทุนทันใจ กับการลดภาระดอกเบี้ย</p>
                <p>เพราะเรารักษาข้อมูลของคุณ</p>
                <p>เป็นความลับสูงสุด</p>
              </div>
            </div>
          </div>

          <div className="btn-wrap">
            <Link className="btn btn-primary" href="/consignor/index">
              ลงขายฝากกับ ทุนทันใจ
            </Link>
          </div>
        </div>
      </div>

      <div className="register-seller">
        <div className="container">
          <div className="wrap">
            <h4 className="title-main">ขั้นตอนง่ายๆสำหรับขายฝาก</h4>
            <div className="step">
              <div className="child">
                <CustomImage
                  src="/consignment-stp1.png"
                  alt="consignment-stp1"
                  style={{
                    height: "auto",
                  }}
                />
                <p>เพิ่มพื้นที่ทรัพย์สินที่ต้องการขายฝาก</p>
              </div>
              <div className="polygon">
                <CustomImage
                  src="/Polygon2.png"
                  alt="Polygon2"
                  style={{
                    height: "auto",
                  }}
                />
              </div>
              <div className="child">
                <CustomImage
                  src="/consignment-stp2.png"
                  alt="consignment-stp2"
                  style={{
                    height: "auto",
                  }}
                />
                <p>เจ้าหน้าที่ประเมินราคาทรัพย์สิน</p>
              </div>
              <div className="polygon">
                <CustomImage
                  src="/Polygon2.png"
                  alt="Polygon2"
                  style={{
                    height: "auto",
                  }}
                />
              </div>
              <div className="child">
                <CustomImage
                  src="/consignment-stp3.png"
                  alt="consignment-stp3"
                  style={{
                    height: "auto",
                  }}
                />
                <p>รับข้อเสนอจากนักลงทุน</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-fin4u">
        <div className="container">
          <p className="title-content">เกี่ยวกับ ทุนทันใจ</p>

          <div className="wrap">
            <div className="row">
              <div className="col-lg-6">
                <CustomImage src="/video1.png" alt="video1" />
                <button className="btn btn-primary w-100 rounded-0">
                  PLAY VIDEO
                </button>
              </div>
              <div className="col-lg-6">
                <CustomImage src="/aboutfin2.png" alt="aboutfin2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Consignment;
