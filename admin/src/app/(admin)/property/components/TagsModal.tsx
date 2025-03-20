"use client";
import { api } from "@utils/api";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { BsTrash3 } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { SlArrowLeft } from "react-icons/sl";

export type TagModalType = {
  open: boolean;
  close?: () => void;
}

type EditTag = {
  editID?: number;
  value?: string;
  tags?: []
};

type AddTag = {
  open: boolean;
  value?: string;
  loading?: boolean;
}

function ImportTagsModal(TagModal: TagModalType) {
  const [tags, setTags] = useState<EditTag>();
  const [addTag, setAddTag] = useState<AddTag>({ open: false, value: "", loading: false });
  const [reload, setReload] = useState<boolean>(false);

  const handleClose = () => {
    TagModal.close?.();
  }

  useEffect(() => {
    const boot = async () => {
      try {
        const { data: tag_res } = await axios.get(api.internal(`/api/tag`));
        setTags({ tags: tag_res.data });
      } catch (error) {
        setTags({ tags: [] })
        console.error("API tags error!", error);
      }
    };
    boot();
  }, [TagModal?.open, reload]);

  const addOpen = (x: boolean) => {
    setAddTag({ open: x })
  }
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddTag((prev) => ({ ...prev, loading: true }))
    if (addTag.value === "" || addTag.value === undefined) return alert("กรุณากรอกข้อมูลพื้นที่")
    try {
      const { data: res_addtag } = await axios.post(api.internal("/api/tag"), {
        new_tag: addTag.value
      })
      if (res_addtag.status === true) {
        setAddTag({ open: false });
        setReload((prev) => !prev)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setAddTag((prev) => ({ ...prev, loading: false }))
    }
  }

  return (
    <Modal show={TagModal.open} onHide={handleClose} centered>
      <Modal.Body>
        <Button onClick={handleClose} variant="close"></Button>
        <h3>สถานที่สำคัญบริเวณพื้นที่</h3>
        {addTag?.open === false ? (
          <>
            <div className="row justify-content-between">
              <Button
                onClick={() => addOpen(true)}
                variant="link"
                className="col-auto text-success pe-auto"
              >
                + เพิ่มสถานที่
              </Button>
              <div className="col-auto">

              </div>
              {tags?.editID != undefined && tags?.editID != 0 ? (
                <div className="col text-end">
                  <Link
                    href="#"
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
              ) : (<></>)}
            </div>

            <div className="row gap-2 mt-3 area-check">
              {tags?.tags?.map((item: any, index) => (
                <label
                  className="col-sm-auto btn btn-light btn-primary"
                  htmlFor={`tag_${item.id}`}
                  key={index}
                >
                  <input
                    onChange={(e) => setTags((prev) => ({ ...prev, editID: Number(e.target.value), value: item.name }))}
                    name="tags"
                    value={item.id}
                    type="radio"
                    id={`tag_${item.id}`}
                    className="btn-check"
                  />
                  {item.name}
                </label>
              ))}
            </div>
          </>
        ) : (
          <form onSubmit={handleAdd}>
            <div className="row">
              <Button
                onClick={() => addOpen(false)}
                variant="link"
                className="col-auto text-success"
              >
                <SlArrowLeft /> กลับ
              </Button>
            </div>

            <div className="form-group mt-2">
              <label className="form-label h2">เพิ่มสถานที่</label>
              <input
                className="form-control"
                name="addplace"
                value={addTag?.value ?? ""}
                onChange={(e) =>
                  setAddTag((prev) => ({
                    ...prev,
                    value: e.target.value as string,
                  }))
                }
                required
              />
            </div>
            <div className="w-100 d-flex justify-content-end pt-3">
              <Button type="submit" variant="success" disabled={addTag.loading} className="mx-1">
                {addTag.loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    กำลังบันทึกข้อมูล
                  </>
                ) : "บันทึก"}
              </Button>
            </div>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ImportTagsModal;
