import Link from "next/link";
import Banner from "../components/Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBook } from "@fortawesome/free-solid-svg-icons";
import CustomImage from "../components/CustomImage";
import { auth } from "@libs/auth";

import { RecomGhost } from "@models/GhostModel";
import RecommendedPage from "@components/AssetRecommended/page";

export default async function Page() {
  const session = await auth();
  const pathinvest = session ? "/property/detail" : "/";

  return (
    <main>
      <div className="justify-content-center">
        <Banner />
      </div>

      <div className="invest">
        <div className="container">
          <p className="title-content font2">สินทรัพย์ขายฝากแนะนำ</p>

          <div className="row land-sale">
            {RecomGhost?.map((item, i) => (
              <div className="col-lg-4 mb-" key={i}>
                <div className="card overflow-hidden">
                  <div className="head">
                    <div className="not-hover">
                      <CustomImage src={item.mock_image} alt="map1" />

                      <span className="badge bg-primary font2">แนะนำ</span>
                    </div>
                    <div className="hover">
                      <div className="d-none">
                        <div className="wrap">
                          <Link
                            href={item.mock_det_link}
                            className="btn btn-primary  font2"
                          >
                            ลงทุน
                          </Link>
                          <Link
                            href={item.mock_det_link}
                            className="btn btn-white  font2"
                          >
                            ข้อมูลเพิ่มเติม
                          </Link>
                          <div className="view-eye">
                            <i className="fa-solid fa-eye fs-1"></i>
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="list">
                      <FontAwesomeIcon icon={faCheck} className="fs-4" />
                      <span className="font2">{item.mock_location}</span>
                    </div>
                    <div className="list">
                      <FontAwesomeIcon icon={faCheck} className="fs-4" />
                      <span className="font2">
                        เลขที่ประกาศขาย {item.id.toString().padStart(6, "0")}
                      </span>
                    </div>
                    <div className="list">
                      <FontAwesomeIcon icon={faCheck} className="fs-4" />
                      <span className="font2">{item.mock_size}</span>
                    </div>
                    {/* <div className="list">
                      <FontAwesomeIcon icon={faCheck} className="fs-4" />
                      <span className="font2">มูลค่าสินทรัพย์ค้ำประกัน</span>
                      <span className="text-primary font2">{item.mock_c_price}</span>
                    </div> */}
                    <div className="list">
                      <FontAwesomeIcon icon={faCheck} className="fs-4" />
                      <span className="font2">
                        ราคาขาย
                        <span className="text-primary font2">
                          {item.mock_c_price}
                        </span>
                        บาท
                      </span>
                    </div>
                    <div className="list">
                      <FontAwesomeIcon icon={faCheck} className="fs-4" />
                      <span className="font2">{item.mock_date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <RecommendedPage />
          </div>
        </div>
      </div>
      <div className="about-fin4u">
        <div className="container">
          <p className="title-content font2">เกี่ยวกับ Finn4U</p>

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

      <div className="story">
        <div className="container">
          <p className="title-content font2">
            เรื่องราวที่ผู้ใช้ไว้วางใจบริการ Finn4U
          </p>
          <div className="row justify-content-between">
            <div className="col-lg-3">
              <div className="card">
                <div className="user">
                  <CustomImage src="/user1.png" className="w-50" alt="user1" />
                </div>
                <p className="name font2">พีทส์</p>
                <p className="position font2">พีทส์</p>
                <p className="detail">
                  “Finn4U คือแพลตฟอร์ม Fintech
                  ที่ทำให้เกิดประโยชน์กับคนหลายๆฝ่าย”
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card">
                <div className="user">
                  <CustomImage src="/user2.png" className="w-50" alt="user2" />
                </div>
                <p className="name font2">วัตสัน</p>
                <p className="position font2">นักลงทุน</p>
                <p className="detail">
                  “เป็นแพลตฟอร์มที่สามารถตอบโจทย์ได้ดี
                  เพราะทำให้ผู้คนทั่วไปสามารถเข้าถึงแหล่งเงินทุนได้”
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card">
                <div className="user">
                  <CustomImage src="/user3.png" className="w-50" alt="user3" />
                </div>
                <p className="name font2">เทเลอร์</p>
                <p className="position font2">ผู้ขายฝาก</p>
                <p className="detail">
                  “ไม่คิดว่าจะได้ที่ดินกลับคืนมา ดีใจมากๆ เลยค่ะ ถ้าเราไม่เจอ
                  ไม่คิดว่าจะมีวันนี้เลยด้วยซ้ำ”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tips">
        <div className="container  fintips-detail">
          <p className="title-content ">Finn Tips เคล็ดลับเรื่องอสังหาฯ</p>
          <div className="row">
            <div className="col-lg-4">
              <div className="card">
                <CustomImage src="/fin-1.png" alt="fin-1" />
                <div className="card-body">
                  <div className="date">
                    <CustomImage
                      src="/book.svg"
                      alt="book"
                      style={{
                        width: "6%",
                        height: "auto",
                      }}
                    />
                    <span>12 พ.ค. 2565</span>
                  </div>
                  <p>อัตราดอกเบี้ยขายฝากที่ดินตามกฎหมาย</p>
                  <p>
                    ปกติแล้วในการทำธุรกรรมขายฝากที่ดินนั้นอัตราดอก
                    เบี้ยขายฝากที่ดินจะถูกกำหนดไว้ตามกฎหมายโดยใช้
                    ข้อบังคับของกฎหมายขายฝากคือพระราชบัญญัติ..
                  </p>
                  <a href="#" className="d-flex justify-content-end">
                    อ่านต่อ
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <CustomImage src="/fin-2.png" alt="fin-2" />
                <div className="card-body">
                  <div className="date">
                    <CustomImage
                      src="/book.svg"
                      alt="book"
                      style={{
                        width: "6%",
                        height: "auto",
                      }}
                    />
                    <span>12 พ.ค. 2565</span>
                  </div>
                  <p>อัตราดอกเบี้ยขายฝากที่ดินตามกฎหมาย</p>
                  <p>
                    ปกติแล้วในการทำธุรกรรมขายฝากที่ดินนั้นอัตราดอก
                    เบี้ยขายฝากที่ดินจะถูกกำหนดไว้ตามกฎหมายโดยใช้
                    ข้อบังคับของกฎหมายขายฝากคือพระราชบัญญัติ..
                  </p>
                  <a href="#" className="d-flex justify-content-end">
                    อ่านต่อ
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <CustomImage src="/fin-3.png" alt="fin-3" />
                <div className="card-body">
                  <div className="date">
                    <CustomImage
                      src="/book.svg"
                      alt="book"
                      style={{
                        width: "6%",
                        height: "auto",
                      }}
                    />
                    <span>12 พ.ค. 2565</span>
                  </div>
                  <p>อัตราดอกเบี้ยขายฝากที่ดินตามกฎหมาย</p>
                  <p>
                    ปกติแล้วในการทำธุรกรรมขายฝากที่ดินนั้นอัตราดอก
                    เบี้ยขายฝากที่ดินจะถูกกำหนดไว้ตามกฎหมายโดยใช้
                    ข้อบังคับของกฎหมายขายฝากคือพระราชบัญญัติ..
                  </p>
                  <a href="#" className="d-flex justify-content-end">
                    อ่านต่อ
                  </a>
                </div>
              </div>
            </div>
          </div>

          <a href="" className="btn btn-primary see-all">
            ดูทั้งหมด
          </a>
        </div>
      </div>
    </main>
  );
}
