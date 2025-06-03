"use client";
import { Button, Form, Modal, Row } from "react-bootstrap/";
import Image from "next/image";
import pencilImage from "@/public/pencil.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@utils/api";
import dayjs, { Dayjs } from "dayjs";
import { handleNumberChange, numberChange } from "@component/dev/Helpers";
import ImportTagsModal, { TagModalType } from "./TagsModal";
import LoadingModal from "./LoadingModal";
import { PropertyModel } from "@models/property";
import { loaderModel, loaderType } from "@models/common";
import ApiError from "@component/dev/ApiStatus";
import { FormInput } from "@component/FormCustom/FormInput";
import { ImageGallery } from "@component/dev/ImageGallery";
import { FormImage } from "@component/FormCustom/FormImage";
import { FormCheck } from "@component/FormCustom/FormCheck";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePickerCustom, TimePickerCustom } from "@component/FormCustom/DatePickerCustom";

dayjs().locale("th");

export type PropertyModal = {
  id?: number;
  open: boolean;
  close?: () => void;
};

function ConModal(ModalOpen: PropertyModal) {
  const [form, setForm] = useState(PropertyModel);
  const [loader, setLoaderModel] = useState<loaderType>(loaderModel);
  const [validated, setValidated] = useState(false);

  const [editTags, setEditTags] = useState<TagModalType>();

  const [tags, setTags] = useState<any[]>([]);
  const [tagsSeclect, setTagsSelect] = useState<{ [key: number]: number }>([]);

  const handleForm = (e: any) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleNum = (e: any) => {
    const { name, value } = e.target;
    const regex = /^(\d+(\.\d*)?|\.\d+)$/;

    if (regex.test(value) || value === "") {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleModalClose = () => {
    ModalOpen.close?.();
    setLoaderModel({ onload: false });
  };

  const handleTagClose = () => {
    setEditTags({ open: false });
  };

  useEffect(() => {
    const boot = async () => {
      setLoaderModel({ onload: true, loaderr: false });

      try {
        const { data: ass_res } = await axios.get(
          api.internal(`/api/asset/${ModalOpen.id}`)
        );
        if (ass_res.status) {
          const ass_data = ass_res.data;
          setForm((prev) => ({
            ...prev,
            ...ass_data
          }))
        }
      } catch (error) {
        console.error("API assets error!", error);
        setLoaderModel({ loaderr: true });
      } finally {
        setLoaderModel((prev) => ({
          ...prev,
          onload: false,
        }));
      }
    };

    if (ModalOpen.id != undefined) {
      boot();
    }
  }, [ModalOpen.id]);

  const handleChecktag = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { checked, value } = e.target;

    setForm((prev: any) => ({
      ...prev,
      tags: prev?.tags?.map((item: any) =>
        item.id === id ? { ...item, is_check: checked } : item
      )
    })
    );
  };

  const handleCheckboxImages = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { checked, value } = e.target;
    setForm((prev: any) =>
    ({
      ...prev,
      display_images: prev?.display_images?.map((item: any) =>
        item.id === id ? { ...item, is_display: checked } : item
      )
    })
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const event = e.currentTarget;
    if (event.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return false;
    }

    if (form?.display_images?.filter((x: any) => x.is_display === true).length < 3) {
      return alert("กรุณากรอก: เลือกรูปภาพ 3 รูปขึ้นไป");
    }

    try {
      const { data: ass_res } = await axios.post(
        api.internal(`/api/asset/appraisal/${ModalOpen.id}`),
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (ass_res.status) {
        alert("บันทึกข้อมูลสำเร็จ");
        window.location.reload();
      } else {
        alert("ไม่สามารบันทึก กรุณาลองใหม่อีกครั้ง");
      }
    } catch (error) {
      alert("ไม่สามารบันทึก กรุณาลองใหม่อีกครั้ง");
      console.error("API save appraisal error!", error);
    }
  };

  return (
    <>

      {editTags != undefined && editTags.open == true ? (
        <ImportTagsModal open={editTags.open} close={handleTagClose} />
      ) : null}

      <Modal
        show={ModalOpen.open}
        onHide={handleModalClose}
        id="modal-estimate"
        size="lg"
      >
        {loader.loaderr ? (
          <>
            <ApiError number={500} />
          </>
        ) : loader.onload ? (
          <>
            <LoadingModal />
          </>
        ) : (
          <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Modal.Body>
                <Button variant="close" onClick={handleModalClose}></Button>
                <h3 className="mb-3">ข้อมูลจากการประเมินราคา</h3>

                <Row className="mb-3">
                  <FormInput groupClass="col-lg-5" name="price_appraisal" value={form.price_appraisal} onChange={handleNum} placeholder="ราคาขายฝากจากการประเมิน" required />
                  <FormInput groupClass="col-lg-4" name="collateral_price" value={form.collateral_price} onChange={handleNum} placeholder="มูลค่าทรัพย์สินค้ำระกัน" required />
                  <FormInput groupClass="col-lg-3 d-flex align-items-center" name="duration" value={form.duration} onChange={handleNum} placeholder="ระยะเวลาขายฝาก" labelEnd="ปี" required />
                </Row>

                <h4 className="mt-1 mb-3">
                  เลือกรูปภาพให้แสดง
                  <span className="text-secondary">(3 รูป)</span>
                </h4>
                <ImageGallery images={form.display_images} onChange={handleCheckboxImages} />
                <h4 className="mt-1 mb-3">อัพโหลดภาพจากการประเมิน</h4>
                <Row className="mb-3">
                  <FormImage
                    name="new_images"
                    onChange={(value) => {
                      setForm((prev) => ({
                        ...prev,
                        new_images: value,
                      }));
                    }}
                    multiple
                  />
                </Row>
                <h4 className="mb-3">การมองเห็นโพสต์</h4>
                <Row className="form-check mb-3 d-flex">
                  <FormCheck name="is_published" id="member_only" checked={!form.is_published ? true : false} value="false" onChange={() => setForm((prev) => ({
                    ...prev,
                    is_published: false
                  }))} labelEnd="สมาชิกเท่านั้น" />
                  <FormCheck name="is_published" id="general" checked={form.is_published ? true : false} value="true" onChange={() => setForm((prev) => ({
                    ...prev,
                    is_published: true
                  }))} labelEnd="สาธารณะ" />
                </Row>
                <Row className="mb-3" >
                  <h4 className="col-auto">การมองเห็นโพสต์</h4>
                  <span className="col-auto text-seccondary">
                    (กรณีต้องการหาผู้ร่วมลงทุน)
                  </span>
                </Row>
                <Row className="form-check mb-3">
                  <FormCheck name="find_invester" id="find_invester" type="checkbox" checked={form.find_invester} value="true" onChange={() => setForm((prev) => ({
                    ...prev,
                    find_invester: form.find_invester ? false : true
                  }))} labelEnd="หาผู้ร่วมลงทุน" />
                </Row>

                <div className="edit mb-3">
                  <h4 className="m-0">สถานที่สำคัญบริเวณพื้นที่</h4>
                  <div
                    className="edit"
                    onClick={() =>
                      setEditTags({ open: true, close: handleTagClose })
                    }
                  >
                    <Image src={pencilImage} className="" alt="" />
                    <p>แก้ไข</p>
                  </div>
                </div>

                <div className="area-check mb-5">
                  {form.tags?.map((item: any, index: number) => (
                    <label
                      className="col-sm-auto btn btn-light btn-primary"
                      htmlFor={`check_${index}`}
                      key={index}
                      tabIndex={0}
                    >
                      <input
                        name={`tags[${item.id}]`}
                        value={item.id}
                        type="checkbox"
                        id={`check_${index}`}
                        className="btn-check"
                        onChange={(e) => {
                          handleChecktag(e, item.id);
                        }}
                        checked={item.is_check}
                      />
                      {item.name}
                    </label>
                  ))}
                </div>
                <Row>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Form.Group className="col-lg-6">
                      <DatePickerCustom group="auction" label="ตั้งแต่วันที่" name="from_date" onChange={setForm} value={form?.auction?.from_date} />
                      <TimePickerCustom group="auction" label="ตั้งแต่เวลา" name="from_time" onChange={setForm} value={form?.auction?.from_time} />
                    </Form.Group>
                    <Form.Group className="col-lg-6">
                      <DatePickerCustom group="auction" label="ถึงวันที่" name="to_date" onChange={setForm} value={form?.auction?.to_date} />
                      <TimePickerCustom group="auction" label="ถึงเวลา" name="to_time" onChange={setForm} value={form?.auction?.to_time} />
                    </Form.Group>
                  </LocalizationProvider>
                </Row>
                <Row className="mb-3">
                  <FormInput name="max_tax" groupClass="col-lg-6" label="ระบุดอกเบี้ยสูงสุด (%)" value={form?.auction?.max_tax} onChange={(e) => setForm((prev) =>
                  ({
                    ...prev,
                    auction: {
                      ...prev.auction,
                      [e.target.name]: e.target.value
                    }
                  }))} />
                </Row>

                <h4 className="mb-3">สถานะ</h4>
                <Row className="form-check mb-3 d-flex">
                  <FormCheck name="status" groupClass="col-auto" id="wait_assessment" checked={form.status === "0" ? true : false} value="0" onChange={handleForm} labelEnd="รอการประเมินราคา" />
                  <FormCheck name="status" groupClass="col-auto" id="wait_maching" checked={form.status === "2" ? true : false} value="2" onChange={handleForm} labelEnd="รอ Maching" />
                  <FormCheck name="status" groupClass="col-auto" id="join_invest" checked={form.status === "1" ? true : false} value="1" onChange={handleForm} labelEnd="ร่วมลงทุน" />
                </Row>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <Button type="submit" variant="primary" className="mx-1">
                  บันทึก
                </Button>
              </Modal.Footer>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
}
export default ConModal;

