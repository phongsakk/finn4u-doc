import imagePromiseBanner from "@public/promise-success.png";
import imageRegStep1 from "@public/reg-step1.png";
import Image from "next/image";
import Link from "next/link";
function SuccessPage() {
  return (
    <>
      <div className="banner-regis">
        <Image src={imagePromiseBanner} alt="" />
      </div>

      <div className="register-seller">
        <div className="container">
          <div className="card-form-main">
            <div className="wrap">
              <h4 className="title-main ">ลงทะเบียนเป็นผู้ขายฝากกับ Finn4U</h4>

              <div className="text-center">
                <Image src={imageRegStep1} alt="" className="w-50 h-auto" />
                <h2 className="text-primary">ลงทุนกับ Finn4U</h2>
                <p>ระบบได้รับข้อมูลการลงทะเบียนของท่านเรียบร้อยแล้ว</p>
                <p>จะมีเจ้าหน้าที่ติดต่อกลับภายใน 3-5 วันทำการ</p>
              </div>

              <div className="submit-group">
                <Link href="/property/detail" className="btn btn-primary">
                  กลับสู่หน้าหลัก
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessPage;
