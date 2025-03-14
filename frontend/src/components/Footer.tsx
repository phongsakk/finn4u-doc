import Image from "next/image";
import CustomImage from "./CustomImage";
import imageFaceBook from "@public/facebook.svg";
import imageline from "@public/line.svg";
import imageYoutube from "@public//youtube.svg";
import imageAdtel from "@public/ad-tel.svg";
import imageAdemail from "@public/ad-email.svg";
function Footer() {
  return (
    <div className="footer-main">
      <div className="wrap">
        <div className="row">
          <div className="col-sm-6 row">
            <div className="col">
              <div className="mb-3">
                <p>ผู้ขายฝาก</p>
                <p>ทรัพย์สินขายฝาก</p>
                <p>นักลงทุน</p>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <p>Finn Tips</p>
                <p>ขายฝากที่นี่</p>
                <p>คำถามที่พบบ่อย</p>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="row">
              <div className="col-lg-10">
                <div className="row mb-3">
                  <div className="col-lg-12">
                    <p className="head">บริษัท อารักษ์มิตร จำกัด</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-lg-12">
                    <p>
                      9/8 หมู่ 5 บางกรวย ซอย 10 ตำบลบางกรวย อำเภอบางกรวย
                      จังหวัดนนทบุรี 11130
                    </p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-lg-12">
                    <div className="group-ad row gap-3">
                      <div className="d-flex col-sm-auto">
                        <Image src={imageAdtel} alt="ad-tel" />
                        <span>02-0777481</span>
                      </div>
                      <div className="d-flex col-sm-auto">
                        <Image src={imageAdemail} alt="ad-email" />
                        <span className="text-break">info@arrakmit.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-2">
                <div className="row gap-3 justify-content-center align-items-center">
                  <Image src={imageFaceBook} alt="facebook" className="col" />
                  <Image src={imageline} alt="line" className="col" />
                  <Image
                    src={imageYoutube}
                    alt="imageYoutube"
                    className="col"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
