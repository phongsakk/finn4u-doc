"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import imagePro from "@public/user3.png";
import { Button, Modal } from "react-bootstrap";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { ProfileType } from "@models/ProfileModel";
import { FaPlus } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import ImageApi from "@components/ImageApi";

function CropImage({
  image,
  setForm,
}: {
  image: string;
  setForm: React.Dispatch<React.SetStateAction<ProfileType>>;
}) {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const imgRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);
  const [showCrop, setCrop] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imgRef.current) {
      cropperRef.current = new Cropper(imgRef.current, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 1,
        zoomable: false, // Disable zooming
        scalable: false, // (Optional) Disable scaling
        background: false, // (Optional) remove gray background
      });
    }

    return () => {
      cropperRef.current?.destroy();
      cropperRef.current = null;
    };
  }, [imgUrl]);

  const CloseCrop = () => {
    setCrop(false);
  };

  const OpenCrop = () => {
    setImgUrl("");
    setCrop(true);
  };

  const Discard = () => {
    setImgUrl("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleCropped = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCroppedCanvas();
      if (canvas) {
        const dataUrl = canvas.toDataURL("image/png");
        setCroppedImage(dataUrl);
        const file = dataURLtoFile(dataUrl, "profile.png");
        setForm((prev) => ({
          ...prev,
          new_image: file,
        }));
        CloseCrop();
      }
    }
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center" onClick={OpenCrop}>
        <div className="col-3 pofile-picture-frame">
          <div className="hover-profile">
            <LuPencil size={35} />
          </div>
          {croppedImage ? (
            <img
              className=""
              src={croppedImage}
              alt="Cropped"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <ImageApi
              src={image}
            />
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          id="profile-change"
          className="d-none"
          onChange={handleChange}
        />
      </div>
      <div className="text-secondary mt-3 text-center">เปลี่ยนรูปโปรไฟล์</div>

      <Modal size="lg" show={showCrop} onHide={CloseCrop}>
        <Modal.Header className="py-3 border-0">
          {!imgUrl && (
            <label
              htmlFor="profile-change"
              className="btn d-flex align-items-center text-primary px-2 rounded"
              style={{
                backgroundColor: "#60ff824f",
              }}
            >
              <FaPlus size={10} className="me-2" />
              <span>อัพโหลดรูปภาพ</span>{" "}
            </label>
          )}
          <Button variant="close" onClick={CloseCrop}></Button>
        </Modal.Header>
        <Modal.Body>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ maxHeight: "400px", minHeight: "400px" }}
          >
            {imgUrl && (
                <img
                  ref={imgRef}
                  src={imgUrl}
                  alt="To crop"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "400px",
                  }}
                />
            )}
          </div>
        </Modal.Body>
        {imgUrl && (
          <Modal.Footer>
            <Button variant="" className="text-primary" onClick={Discard}>
              ละทิ้ง
            </Button>
            <Button variant="primary" onClick={handleCropped}>
              บันทึก
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

export default CropImage;

function dataURLtoFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
