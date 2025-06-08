"use client";

import { Row } from "react-bootstrap";
import ImageApi from "./ImageApi";
import checkImage from "@/public/check.png";
import Image from "next/image";

export const ImageGallery = ({
  images,
  onChange,
}: {
  images: any[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
}) => {
  return (
    <Row className="mb-3">
      {images?.map((item, index) => (
        <div
          className="col-lg-4 col-sm-5 mb-1 d-flex justify-content-center justify-content-lg-start nopad mb-3"
          style={{ minHeight: "150px" }}
          key={index}
        >
          <label
            className="image-checkbox text-center"
            htmlFor={`images-${index}`}
          >
            <input
              onChange={(e) => onChange(e, item.id)}
              name="images[]"
              value={item.id}
              id={`images-${index}`}
              className="select-image d-none"
              type="checkbox"
              checked={item.is_display}
            />
            <ImageApi
              className="img-responsive w-100 object-fit"
              src={item.name}
              style={{ aspectRatio: 1.58 }}
            />

            <Image className="img-check" src={checkImage} alt="" />
          </label>
        </div>
      ))}
    </Row>
  );
};
