"use client";

import React, { useRef, useEffect, useState } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { Button, Modal } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

interface ImageCropperProps {
  show: boolean;
  close: () => void;
  onCrop: (croppedImage: string) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  show = false,
  close,
  onCrop,
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

  useEffect(() => {
    if (imageRef.current) {
      cropperRef.current = new Cropper(imageRef.current, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 1,
      });
    }

    return () => {
      cropperRef.current?.destroy();
      cropperRef.current = null;
    };
  }, [imageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCroppedCanvas();
      if (canvas) {
        const croppedImage = canvas.toDataURL("image/png");
        onCrop(croppedImage);
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setImageUrl("");
    close();
  };
  return (
    <Modal fullscreen show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="d-flex h-100 align-items-center justify-content-center">
          <input
            type="file"
            accept="image/*"
            id="profile-change"
            className="d-none"
            onChange={handleFileChange}
          />
          {imageUrl ? (
            <img
              ref={imageRef}
              src={imageUrl}
              alt="To crop"
              style={{ maxWidth: "100%" }}
            />
          ) : (
            <div>
              <label
                htmlFor="profile-change"
                className="d-flex align-items-center text-primary m-5 border px-2 rounded"
              >
                <FaPlus size={15} /> <span className="ps-2">อัพโหลดรูปภาพ</span>
              </label>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" onClick={handleClose} className="text-primary">
          ยกเลิก
        </Button>
        <Button variant="primary" onClick={handleCrop}>
          บันทึก
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageCropper;
