"use client";
import ImageIdCard from "@public/id-card.png";
import ImageCamera from "@public/camera.svg";
import ImageUpload from "@public/upload.svg";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { convertImage } from "@components/helpers";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

function VerifyForm({
  setStep,
  checkStep,
}: {
  setStep: (num: number) => void;
  checkStep: boolean;
}) {
  const [licenseFont, setLicenseFont] = useState<string>();
  const [licenseBack, setLicenseBack] = useState<string>();
  const [photoWithID, setPhotoWithID] = useState<string>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!licenseFont || !licenseBack || !photoWithID) {
      alert(
        [
          !licenseFont && "ถ่ายรูปหน้าบัตร",
          !licenseBack && "ถ่ายรูปหลังบัตร",
          !photoWithID && "ถ่ายรูปเซลฟี่ผู้ขายฝากคู่กับบัตรประชาชน",
        ]
          .filter(Boolean)
          .join("\n")
      );

      return false;
    }
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
          <p className="font2">
            1. ถ่ายรูปหน้าบัตร {licenseFont && CheckImage()}
          </p>
          <div className="row gap-3 px-3 mb-5">
            <input
              onChange={(e) => imgChange(e, setLicenseFont)}
              type="file"
              className="d-none"
              name="license-font"
              id="license-font"
            />
            <label
              htmlFor="license-font"
              className="col-auto btn btn-primary font2 px-3"
            >
              <Image src={ImageCamera} alt="" />
              ถ่ายภาพ
            </label>
            <label
              htmlFor="license-font"
              className="col-auto btn btn-light font2 px-3"
            >
              <Image className="me-2" src={ImageUpload} alt="" />
              อัพโหลด
            </label>
          </div>
          <p className="font2">
            2. ถ่ายรูปหลังบัตร {licenseBack && CheckImage()}
          </p>
          <div className="row gap-3 px-3 mb-5">
            <input
              type="file"
              onChange={(e) => imgChange(e, setLicenseBack)}
              className="d-none"
              name="license-back"
              id="license-back"
            />
            <label
              htmlFor="license-back"
              className="col-auto btn btn-primary font2 px-3"
            >
              <Image src={ImageCamera} alt="" />
              ถ่ายภาพ
            </label>
            <label
              htmlFor="license-back"
              className="col-auto btn btn-light font2 px-3"
            >
              <Image className="me-2" src={ImageUpload} alt="" />
              อัพโหลด
            </label>
          </div>
          <p className="font2">
            3. ถ่ายรูปเซลฟี่ผู้ขายฝากคู่กับบัตรประชาชน{" "}
            {photoWithID && CheckImage()}
          </p>
          <div className="row gap-3 px-3 mb-5">
            <input
              onChange={(e) => imgChange(e, setPhotoWithID)}
              type="file"
              className="d-none"
              name="photoId"
              id="photoId"
            />
            <label
              htmlFor="photoId"
              className="col-auto btn btn-primary font2 px-3"
            >
              <Image src={ImageCamera} alt="" />
              ถ่ายภาพ
            </label>
            <label
              htmlFor="photoId"
              className="col-auto btn btn-light font2 px-3"
            >
              <Image className="me-2" src={ImageUpload} alt="" />
              อัพโหลด
            </label>
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

const imgChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setImage: (txt: string) => void
) => {
  const selectedFile = event.target.files?.[0];
  if (!selectedFile) return;

  const convertedImage = (await convertImage(selectedFile)) as string;
  setImage(convertedImage);
};

const CheckImage = () => {
  return <FaCheck className="text-primary" />;
};
