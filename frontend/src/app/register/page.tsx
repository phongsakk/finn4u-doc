import Banner from "@components/Banner";
import CustomImage from "@components/CustomImage";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function page() {
  return (
    <main>
      <div className="justify-content-center">
        <Banner />
      </div>
      <div className="ragister-content">
        <div className="container">
          <h4>
            ขายฝากได้ง่ายกับ&nbsp;
            <span className="text-primary h2">ทุนทันใจ</span>
          </h4>

          <div className="row">
            <div className="col-lg-4">
              <div className="group">
                {imageregis("/menuregis1.png")}
                <p>ทุนทันใจ กับการลดภาระดอกเบี้ย</p>
                <p>ลดภาระดอกเบี้ยขายฝากที่สูง</p>
                <p>เหลือเพียง 0.75% ต่อเดือน</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="group">
                {imageregis("/menuregis2.png")}
                <p>ทุนทันใจ กับราคารับฝากขาย</p>
                <p>ราคารับขายฝากสูงสุดถึง 70%</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="group">
                {imageregis("/menuregis3.png")}
                <p>ทุนทันใจ เพราะปลอดภัย</p>
                <p>เพราะเรารักษาข้อมูลของคุณ</p>
                <p>เป็นความลับสูงสุด</p>
              </div>
            </div>
          </div>

          <div className="btn-wrap">
            <Link className="btn btn-primary" href="/register/consignor">
              ลงทะเบียนเป็น ผู้ขายฝาก
            </Link>
          </div>
        </div>
      </div>

      <div className="ragister-content content2">
        <div className="container">
          <h4>
            ลงทุนกับ&nbsp;
            <span className="text-primary h2">ทุนทันใจ</span>
          </h4>

          <div className="row">
            <div className="col-lg-4">
              <div className="group">
                {imageregis("/menuregis4.png")}
                <p>ทุนทันใจ มีอสังหาฯมูลค่าสูง</p>
                <p>อสังหาริมทรัพย์มูลค่าสูงค้ำประกัน</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="group">
                {imageregis("/menuregis5.png")}
                <p>ทุนทันใจ กับราคารับฝากขาย</p>
                <p>ด้วยอัตราผลตอบแทนสูง 9-12% ต่อปี</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="group">
                {imageregis("/menuregis6.png")}
                <p>ทุนทันใจ หายห่วง</p>
                <p>ประเมินทรัพย์สินโดยบริษัทประเมิน</p>
                <p>ที่ได้รับความเห็นชอบจาก ก.ล.ต.</p>
              </div>
            </div>
          </div>

          <div className="btn-wrap">
            <Link className="btn btn-primary" href="/register/invester">
              ลงทะเบียนเป็น นักลงทุน
            </Link>
          </div>
        </div>
      </div>

      <div className="ragister-content content2">
        <div className="container">
          <h4 className="mb-1">
            ขายกับ&nbsp;
            <span className="text-primary h2">ทุนทันใจ</span>
          </h4>
          <h4>ไม่มีค่าธรรมเนียม</h4>

          <div className="row">
            <div className="col-lg-4">
              <div className="group">
                {imageregis("/Facebook-Ad.png")}
                <p>ทุนทันใจ กับการลงประกาศฟรี</p>
                <p>ฝากขายกับเรา เพิ่มโอกาสในการขายมากขึ้น</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="group">
                {imageregis("/Savings1.png")}
                <p>ทุนทันใจ กับค่าใช้จ่ายที่ลดลง</p>
                <p>ไม่มีค่าคอมมิชชั่น ไม่มีค่านายหน้ามาคอยกวนใจ</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="group">
                {imageregis("/menuregis3.png")}
                <p>ทุนทันใจ เพราะปลอดภัย</p>
                <p>เพราะเรารักษาข้อมูลของคุณ</p>
                <p>เป็นความลับสูงสุด</p>
              </div>
            </div>
          </div>

          <div className="btn-wrap">
            <Link className="btn btn-primary" href="/register/guest">
              ลงทะเบียน ฝากขาย
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
export default page;

const imageregis = (src: string) => {
  return (
    <CustomImage
      src={src}
      alt="menuregis3"
      style={{ aspectRatio: 1.3, height: "auto" }}
    />
  );
};
