"use client";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Collapse } from "react-bootstrap";
import { LuDownload } from "react-icons/lu";

function UploadDocPage() {
  const params = useParams();

  if (isNaN(Number(params.id))) {
    redirect("/property");
  }
  const sections = [
    {
      name:"หนังสือสัญญาเช่า",
      href:"หนังสือสัญญาเช่า.pdf",
    },  {
      name:"หนังสือยินยอมคู่สมรส",
      href:"หนังสือยินยอมคู่สมรส.pdf",
    },{
      name:"สัญญาแต่งตั้งนายหน้าขายอสังหาริมทรัพย์",
      href:"สัญญาแต่งตั้งนายหน้าขายอสังหาริมทรัพย์.pdf",
    },{
      name:"สัญญาจะซื้อจะขาย",
      href:"สัญญาจะซื้อจะขาย.pdf",
    },{
      name:"ใบลงรายละเอียดทรัพย์",
      href:"ใบลงรายละเอียดทรัพย์.pdf",
    },{
      name:"ใบมอบอำนาจ",
      href:"ใบมอบอำนาจ_ทด21.pdf",
    },{
      name:"หนังสือมอบอำนาจอาคารชุด (อ.ช.๒๑)",
      href:"แบบฟอร์มหนังสือมอบอำนาจอาคารชุด (อ.ช.๒๑).pdf",
    },
  ];

  const [activeKey, setActiveKey] = useState<string | null>(null); // Track the active section
  const [fileDetails, setFileDetails] = useState<
    { name: string; size: string }[]
  >(new Array(sections.length).fill({ name: "", size: "" }));

  const handleFileChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const sizeInKB = (file.size / 1024).toFixed(0); // Size in KB
      const newFileDetails = [...fileDetails];
      newFileDetails[index] = { name: file.name, size: `${sizeInKB}K` };
      setFileDetails(newFileDetails);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFileDetails = [...fileDetails];
    newFileDetails[index] = { name: "", size: "" }; // Remove the file details
    setFileDetails(newFileDetails);
  };

  const handleToggle = (id: string) => {
    setActiveKey(activeKey === id ? null : id); // Toggle the section open/closed
  };
  return (
    <div className="promise">
      <div className="container">
        <div className="card-form-main">
          <div className="wrap">
            <div className="text-center">
              <h3>เอกสารสัญญา</h3>
              <p>
                ดาวน์โหลดเอกสาร (PDF)
                กรอกรายละเอียดให้ครบถ้วนจากนั้นแนบไฟล์เพื่อรอการตรวจสอบ
              </p>
            </div>
            <Accordion className="upload-doc" activeKey={activeKey}>
              {sections.map((item, index) => (
                <Card className="mb-3" key={index}>
                  <Card.Header
                    className="p-3 bg-light"
                    onClick={() => handleToggle(String(index))}
                  >
                    <Link
                      href={`/download/${item.href}`}
                      className="underline-primary"
                      target="_blank"
                    >
                      {item.name} <LuDownload />
                    </Link>
                  </Card.Header>
                  <Accordion.Collapse eventKey={String(index)}>
                    <Card.Body className="bg-light">
                      <div className="row align-items-center">
                        <div className="col-auto">แนบไฟล์:</div>
                        <div className="col-auto">
                          <label
                            className="btn btn-success"
                            htmlFor={`file-input-${index}`}
                          >
                            อัปโหลด...
                          </label>
                        </div>
                        <div className="w-100">
                          {fileDetails[index].name && (
                            <div className="mt-2 d-flex justify-content-between aling-items-center p-2 show-file-name  px-3">
                              <div>
                                <span className="text-success">
                                  {fileDetails[index].name}
                                </span>
                                <span className="px-1 text-secondary">
                                  ({fileDetails[index].size})
                                </span>
                              </div>
                              <Button
                                variant="link"
                                className="text-danger p-0"
                                onClick={() => handleRemoveFile(index)}
                              >
                                x
                              </Button>
                            </div>
                          )}
                        </div>
                        <input
                          onChange={(e) => handleFileChange(index, e)}
                          type="file"
                          className="d-none"
                          name={`fileinput[${index}]`}
                          id={`file-input-${index}`}
                        />
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
            <div className="submit-group">
              <Link href="/property/success" className="btn btn-primary font2">
                ถัดไป
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadDocPage;
