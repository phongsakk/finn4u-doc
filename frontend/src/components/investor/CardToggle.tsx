"use client";
import { EvidenceFormType } from "@models/EvidenceForm";
import Link from "next/link";
import React, { useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { LuDownload } from "react-icons/lu";

type fileDetail = {
  name: string;
  size: string;
};

function CardToggle({
  name,
  text,
  href,
  handleToggle,
  setForm,
}: {
  name: string;
  text: string;
  href?: string;
  handleToggle: (id: string) => void;
  setForm: React.Dispatch<React.SetStateAction<EvidenceFormType>>;
}) {
  const [fileDetail, setDetail] = useState<fileDetail>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const sizeInKB = (file.size / 1024).toFixed(0); // Size in KB
      setDetail({ name: file.name, size: `${sizeInKB}K` });
      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));
    }

    event.target.value = "";
  };

  const handleRemove = () => {
    setDetail(undefined);
    setForm((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  return (
    <Card className="mb-3">
      <Card.Header className="p-3 bg-light" onClick={() => handleToggle(name)}>
        <Link
          href={`/download/${href}`}
          className="underline-primary"
          target="_blank"
        >
          {text} <LuDownload />
        </Link>
      </Card.Header>
      <Accordion.Collapse eventKey={name}>
        <Card.Body className="bg-light">
          <div className="row align-items-center">
            <div className="col-auto">แนบไฟล์:</div>
            <div className="col-auto">
              <label className="btn btn-success" htmlFor={`file-input-${name}`}>
                อัปโหลด...
              </label>
            </div>
            <div className="w-100">
              {fileDetail && (
                <div className="mt-2 d-flex justify-content-between aling-items-center p-2 show-file-name  px-3">
                  <div>
                    <span className="text-success">{fileDetail.name}</span>
                    <span className="px-1 text-secondary">
                      ({fileDetail.size})
                    </span>
                  </div>
                  <Button
                    variant="link"
                    className="text-danger p-0"
                    onClick={handleRemove}
                  >
                    x
                  </Button>
                </div>
              )}
            </div>
            <input
              onChange={(e) => handleChange(e)}
              type="file"
              className="d-none"
              name={`fileinput[${name}]`}
              id={`file-input-${name}`}
            />
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default CardToggle;
