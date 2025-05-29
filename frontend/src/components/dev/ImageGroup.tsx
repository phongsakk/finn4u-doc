import ImageApi from "@components/ImageApi";
import React from "react";
import { Row } from "react-bootstrap";

function ImageGroup({ image }: { image: any[] }) {
  return (
    <Row className="show-image-upload">
      {image?.map((image, index) => (
        <div className="col-auto" key={index}>
          <ImageApi
            src={image.image}
            alt={`Preview ${index}`}
            style={{ aspectRatio: 1.5, height: "auto" }}
          />
        </div>
      ))}
    </Row>
  );
}

export default ImageGroup;
