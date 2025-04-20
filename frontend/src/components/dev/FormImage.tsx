"use client";
import CustomImage from "@components/CustomImage";
import { convertImage_arr } from "@components/helpers";
import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";

type FormImageType = {
  name: string;
  id?: string;
  label: string;
  onChange: (e: any) => void;
  multiple?: boolean;
  required?: boolean;
};

export const FormImage = ({
  name,
  id,
  label,
  onChange,
  multiple = false,
  required = false,
}: FormImageType) => {
  const InputId = id ?? name;
  const [image, setImage] = useState<string[]>([]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files;
    if (!selectedFile) return;

    const convertedImage = await convertImage_arr(selectedFile);
    setImage(convertedImage);
    onChange(multiple ? convertedImage : convertedImage[0]);
  };

  return (
    <>
      <Row>
        <Form.Label htmlFor={InputId}>
          {label} {required && <span className="text-require font2">*</span>}
        </Form.Label>
        <Form.Group className="upload-btn-group">
          <Form.Control
            name={name}
            id={InputId}
            onChange={handleChange}
            type="file"
            multiple={multiple}
            required={required}
            className="d-none"
          />
          <Form.Label className="btn btn-light csbtn1" htmlFor={InputId}>
            <CustomImage src="/upload.svg" alt="upload" />
            อัพโหลด
          </Form.Label>
        </Form.Group>
      </Row>
      <Row className="show-image-upload">
        {image?.map((image, index) => (
          <div className="col-auto" key={index}>
            <img src={image} alt={`Preview ${index}`} />
          </div>
        ))}
      </Row>
    </>
  );
};
