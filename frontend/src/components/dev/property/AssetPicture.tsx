"use client";
import CustomImage from "@components/CustomImage";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function AssetPicture({ images }: { images: any[] }) {
  const [modalImage, setModalImage] = useState<string>("");
  const [galleryOpen, setGallery] = useState(false);

  const handleGallery = (e: React.FormEvent) => {
    e.preventDefault();
    const clickedImage = e.target as HTMLImageElement;
    setModalImage(clickedImage.src);

    setGallery(true);
  };

  return (
    <>
      {images.map((item: any, index: number) => (
        <Link
          className="gallery-item"
          href="#"
          onClick={handleGallery}
          key={index}
        >
          <img src={item.image} alt="" className="img-fluid object-fit-cover" />
        </Link>
      ))}
      <Modal
        className="modal-image-gallery"
        show={galleryOpen}
        onHide={() => setGallery(false)}
        size="xl"
        centered
      >
        <Modal.Body>
          <div className="position-absolute top-0 end-0 p-2 bg-danger rounded-circle">
            <Button variant="close" onClick={() => setGallery(false)}></Button>
          </div>
          <div className="show-image">
            <CustomImage src={modalImage} alt="Modal Image" style={{}} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AssetPicture;
