import ImageIdCard from "@public/id-card.png";
import ImageCamera from "@public/camera.svg";
import ImageUpload from "@public/upload.svg";
import Image from "next/image";
import { Button } from "react-bootstrap";

function VerifyForm({ setStep }: { setStep: (num: number) => void }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(5);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="insert-id-card">
        <div className="idcard">
          <div className="row align-items-center">
            <div className="col-lg-6 p-5">
              <Image src={ImageIdCard} alt="" style={{ height: "auto" }} />
            </div>
            <div className="col-lg-6">
              <ul>
                <li className="font2">วันหมดอายุของบัตรต้องมากกว่า 6 เดือน</li>
                <li className="font2">ถ่ายรูปหน้าบัตร</li>
                <li className="font2">ถ่ายรูปหลังบัตร</li>
                <li className="font2">
                  ถ่ายรูปเซลฟี่ผู้ขายฝากคู่กับบัตรประชาชน
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="import">
          <p className="font2">1. ถ่ายรูปหน้าบัตร</p>
          <div className="d-flex">
            <button type="submit" className="btn btn-primary font2">
              <Image src={ImageCamera} alt="" />
              ถ่ายภาพ
            </button>
            <button type="submit" className="btn btn-light font2">
              <Image src={ImageUpload} alt="" />
              อัพโหลด
            </button>
          </div>
          <p className="font2">2. ถ่ายรูปหลังบัตร</p>
          <div className="d-flex">
            <button type="submit" className="btn btn-primary">
              <Image src={ImageCamera} alt="" />
              ถ่ายภาพ
            </button>
            <button type="submit" className="btn btn-light">
              <Image src={ImageUpload} alt="" />
              อัพโหลด
            </button>
          </div>
          <p className="font2">3. ถ่ายรูปเซลฟี่ผู้ขายฝากคู่กับบัตรประชาชน</p>
          <div className="d-flex">
            <button type="submit" className="btn btn-primary font2">
              <Image src={ImageCamera} alt="" />
              ถ่ายภาพ
            </button>
            <button type="submit" className="btn btn-light font2">
              <Image src={ImageUpload} alt="" />
              อัพโหลด
            </button>
          </div>
        </div>
      </div>
      <div className="submit-group">
        <Button variant="white" onClick={() => setStep(3)}>
          ย้อนกลับ
        </Button>
        <Button variant="primary" type="submit">
          ถัดไป
        </Button>
      </div>
    </form>
  );
}
export default VerifyForm;
