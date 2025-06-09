import CheckBox from "@components/FormCustom/CheckBox";
import ImageApi from "@components/ImageApi";
import React from "react";
import { Row } from "react-bootstrap";

type SelectImageType = {
  image: any[];
  setForm: React.Dispatch<React.SetStateAction<any>>
}

function ImageGroup({ image, setForm }: SelectImageType) {

  const handleChange = (stt: boolean, itemId: number) => {
    setForm((prev: any) => ({
      ...prev,
      old_images: prev?.old_images?.map((item: any) => ({
        ...item,
        is_check: item?.id === itemId ? stt : item.is_check
      }))
    }))
  }

  return (
    <Row className="show-image-upload">
      {image?.map((image, index) => (
        <label htmlFor={`image-check-${index}`} className="col-5 col-sm-3 col-lg-3 px-0 border" key={index}>
          <div className="check-image">
            <CheckBox id={`image-check-${index}`} className="text-success position-absolute px-1 end-0" status={image?.is_check} handleChange={handleChange} itemId={image.id} />
            <ImageApi
              src={image.image}
              alt={`Preview ${image.id}`}
              style={{ aspectRatio: 1.5,width:"100%", height: "auto" }}
            />
          </div>
        </label>
      ))}
    </Row>
  );
}

export default ImageGroup;
