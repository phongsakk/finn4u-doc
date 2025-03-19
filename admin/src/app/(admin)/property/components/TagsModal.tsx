"use client";
import { api } from "@utils/api";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsTrash3 } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { SlArrowLeft } from "react-icons/sl";

export type TagModalType = {
  open: boolean;
  close?: () => void;
}

type tags = {
  id: number;
  name: string;
};


function ImportTagsModal(TagModal: TagModalType) {
  const [addPlace, setAddPlace] = useState<boolean>(false);
  const [valuePlace, setValuePlace] = useState<string>();
  const [editTagPlace, setEditTagPlace] = useState<boolean>(false);
  const [tags, setTags] = useState<tags[]>([]);

  const handleClose = () => {
    TagModal.close?.();
  }

  // useEffect(() => {
  //   const boot = async () => {
  //     try {
  //       const { data: tag_res } = await axios.get(api.internal(`/api/tag`));

  //       if (Array.isArray(tag_res)) {
  //         setTags(tag_res);
  //       } else {
  //         setTags([]); 
  //       }
  //     } catch (error) {
  //       console.error("API assets error!", error);
  //     }
  //   };

  //   boot();
  // }, []);

  const test = [
    { name: "ใกล้แหล่งชุมชน" },
    { name: "ใกล้ร้านค้า" },
    { name: "ใกล้สวนสาธารณะ" },
    { name: "ใกล้ห้างสรรพสินค้า" },
    { name: "ใกล้โรงเรียน" },
    { name: "ใกล้วัด" },
    { name: "ใกล้ทางด่วน" },
    { name: "ใกล้รถไฟฟ้า" },
    { name: "ใกล้โรงพยาบาล" },
    { name: "แหล่งท่องเที่ยวสำคัญ" },
  ];

  return (
    <Modal show={TagModal.open} onHide={handleClose} centered>
      <Modal.Body>
        <Button onClick={handleClose} variant="close"></Button>
        <h3>สถานที่สำคัญบริเวณพื้นที่</h3>
        {!addPlace ? (
          <>
            <div className="row justify-content-between">
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setAddPlace(true);
                  setValuePlace("");
                  setEditTagPlace(false);
                }}
                className="col text-success pe-auto"
              >
                + เพิ่มสถานที่
              </Link>
              {editTagPlace && (
                <div className="col text-end">
                  <Link
                    href="#"
                    onClick={() => {
                      setAddPlace(true);
                    }}
                    className="text-success gap-2 mx-3"
                  >
                    <FaPen />
                    <span> แก้ไข</span>
                  </Link>

                  <Link className="text-success gap-2" href="#">
                    <BsTrash3 />
                    ลบ
                  </Link>
                </div>
              )}
            </div>

            <div className="row gap-2 mt-3 area-check">
              {test?.map((item, index) => (
                <label
                  className="col-sm-auto btn btn-light btn-primary"
                  htmlFor={`tag_${index}`}
                  key={index}
                >
                  <input
                    onChange={(e)=>setValuePlace(e.target.value)}
                    name="tags"
                    value={index}
                    type="radio"
                    id={`tag_${index}`}
                    className="btn-check"
                  />
                  {item.name}
                </label>
              ))}
            </div>
          </>
        ) : (
          <>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setAddPlace(false);
                setEditTagPlace(false);
              }}
              className="text-success"
            >
              <SlArrowLeft /> กลับ
            </Link>
            <div className="form-group mt-2">
              <label className="form-label h2">เพิ่มสถานที่</label>
              <input
                className="form-control"
                name="addplace"
                value={valuePlace}
                onChange={(e) => setValuePlace(e.target.value)}
              />
            </div>
            <div className="w-100 d-flex justify-content-end pt-3">
              <Button variant="success" className="mx-1">
                บันทึก
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ImportTagsModal;
