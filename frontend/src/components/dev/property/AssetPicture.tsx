"use client";
import CustomImage from "@components/CustomImage";
import ImageApi from "@components/ImageApi";
import { api } from "@utils/api/index";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { GrPrevious, GrNext } from "react-icons/gr";

const galleryModel = {
  src: "",
  index: 0,
  imgPrev: 0,
  imgNext: 0,
};

function AssetPicture({ images }: { images: any[] }) {
  const [modalImage, setModalImage] = useState(galleryModel);
  const [galleryOpen, setGallery] = useState(false);

  const handleGallery = (index: number) => {
    setModalImage({
      src: api.internal(`api/uploads/property/${images[index].image}`),
      index: index,
      imgPrev: index === 0 ? images.length - 1 : index - 1,
      imgNext: index === images.length - 1 ? 0 : index + 1,
    });
    setGallery(true);
  };

  return (
    <Row className="justify-content-center px-0">
      <div className="col-12 col-lg-9 col-sm-12 col-xs-12 px-2 px-lg-3 py-1">
        <div onClick={() => handleGallery(0)}>
          <ImageApi
            src={`property/${images[0]?.image ?? ""}`}
            className="img-fluid object-fit-cover"
            style={{
              width: "100%",
              aspectRatio: 1.75
            }}
          />
        </div>
      </div>
      <div className="col-12 col-lg-3 col-sm-12 col-xs-12 row align-content-between px-2 px-lg-3 py-1">
        {images?.map((item: any, index: number) => {
          if (index < 3) {
            return (
              <div
                className="gallery-frame px-0 pb-2 pb-lg-0"
                key={index}
                onClick={() => handleGallery(index)}
              >
                {images.length > 3 && index === 2 && (
                  <div className="gallery-filter pb-2 pb-lg-0">{images.length - 3}+</div>
                )}
                <ImageApi
                  src={`property/${item.image}`}
                  className="img-fluid object-fit-cover"
                />
              </div>
            );
          }
          return null;
        })}
      </div>

      <Modal
        className="modal-image-gallery"
        show={galleryOpen}
        onHide={() => setGallery(false)}
        size="xl"
        centered
      >
        <Modal.Body>
          <div className="show-image">
            <div className="position-absolute top-0 end-0 p-1 bg-danger rounded-circle">
              <Button
                variant="close"
                onClick={() => setGallery(false)}
              ></Button>
            </div>
            <GrPrevious
              className="previous-img"
              onClick={() => handleGallery(modalImage.imgPrev)}
            />
            <GrNext
              className="next-img"
              onClick={() => handleGallery(modalImage.imgNext)}
            />
            <CustomImage src={modalImage.src} alt="Modal Image" style={{}} />
          </div>
        </Modal.Body>
      </Modal>
    </Row>
  );
}

export default AssetPicture;
