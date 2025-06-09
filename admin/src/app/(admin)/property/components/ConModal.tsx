"use client";
import { Button, Form, Modal, Row, Spinner } from "react-bootstrap/";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@utils/api";
import dayjs from "dayjs";
import { PropertyModel } from "@models/property";
import { loaderModel, loaderType } from "@models/common";
import ApiError from "@component/dev/ApiStatus";
import { FormInput } from "@component/FormCustom/FormInput";
import { ImageGallery } from "@component/dev/ImageGallery";
import { FormImage } from "@component/FormCustom/FormImage";
import { FormCheck } from "@component/FormCustom/FormCheck";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePickerCustom,
  TimePickerCustom,
} from "@component/FormCustom/DatePickerCustom";
import { LoadPage } from "@component/dev/LoadPage";
import TageForm from "./TageForm";
import { usePropertyContext } from "@component/context/PropertyContext";

dayjs().locale("th");

export type PropertyModal = {
  id?: number;
  open: boolean;
  close?: () => void;
};

function ConModal() {
  const { Con, CloseCon, SetReloadCon, ReloadProperty } = usePropertyContext();
  const [form, setForm] = useState(PropertyModel);
  const [submit, setSubmit] = useState(false);
  const [validated, setValidated] = useState(false);

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

  useEffect(() => {
    const boot = async () => {
      try {
        const { data: ass_res } = await axios.get(
          api.internal(`/api/asset/${Con.id}`)
        );
        if (ass_res?.status) {
          setForm(ass_res?.data);
        }
      } catch (error) {
        console.error("API assets error!", error);
      } finally {
        SetReloadCon(false);
      }
    };

    if (Con.id != 0 && Con.reload) {
      boot();
    }
  }, [Con.id, Con.reload]);

  const handleCheckboxImages = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { checked, value } = e.target;
    setForm((prev: any) => ({
      ...prev,
      display_images: prev?.display_images?.map((item: any) =>
        item.id === id ? { ...item, is_display: checked } : item
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const event = e.currentTarget;
    if (event.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return false;
    }

    if (
      form?.display_images?.filter((x: any) => x.is_display === true).length < 3
    ) {
      return alert("กรุณากรอก: เลือกรูปภาพ 3 รูปขึ้นไป");
    }

    try {
      setSubmit(true);
      const { data: ass_res } = await axios.post(
        api.internal(`/api/asset/appraisal/${Con.id}`),
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (ass_res.status) {
        alert("บันทึกข้อมูลสำเร็จ");
        ReloadProperty(true);
        SetReloadCon(true);
      } else {
        alert("ไม่สามารบันทึก กรุณาลองใหม่อีกครั้ง");
      }
    } catch (error) {
      alert("ไม่สามารบันทึก กรุณาลองใหม่อีกครั้ง");
      console.error("API save appraisal error!", error);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <>
      <Modal
        show={Con.show ?? false}
        onHide={CloseCon}
        id="modal-estimate"
        size="lg"
      >
        {Con.reload ? (
          <>
            <LoadPage />
          </>
        ) : (
          <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Modal.Body>
                <Button variant="close" onClick={CloseCon}></Button>
                <h3 className="mb-3">ข้อมูลจากการประเมินราคา</h3>

                <Row className="mb-3">
                  <FormInput
                    groupClass="col-lg-5"
                    name="price_appraisal"
                    value={form.price_appraisal}
                    onChange={handleNum}
                    placeholder="ราคาขายฝากจากการประเมิน"
                    required
                  />
                  <FormInput
                    groupClass="col-lg-4"
                    name="collateral_price"
                    value={form.collateral_price}
                    onChange={handleNum}
                    placeholder="มูลค่าทรัพย์สินค้ำระกัน"
                    required
                  />
                  <FormInput
                    groupClass="col-lg-3 d-flex align-items-center"
                    name="duration"
                    value={form.duration}
                    onChange={handleNum}
                    placeholder="ระยะเวลาขายฝาก"
                    labelEnd="ปี"
                    required
                  />
                </Row>

                <h4 className="mt-1 mb-3">
                  เลือกรูปภาพให้แสดง
                  <span className="text-secondary">(3 รูป)</span>
                </h4>
                <ImageGallery
                  images={form.display_images}
                  onChange={handleCheckboxImages}
                />
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
                  <FormCheck
                    name="is_published"
                    id="member_only"
                    checked={!form.is_published ? true : false}
                    value="false"
                    onChange={() =>
                      setForm((prev) => ({
                        ...prev,
                        is_published: false,
                      }))
                    }
                    labelEnd="สมาชิกเท่านั้น"
                  />
                  <FormCheck
                    name="is_published"
                    id="general"
                    checked={form.is_published ? true : false}
                    value="true"
                    onChange={() =>
                      setForm((prev) => ({
                        ...prev,
                        is_published: true,
                      }))
                    }
                    labelEnd="สาธารณะ"
                  />
                </Row>
                <Row className="mb-3">
                  <h4 className="col-auto">การมองเห็นโพสต์</h4>
                  <span className="col-auto text-seccondary">
                    (กรณีต้องการหาผู้ร่วมลงทุน)
                  </span>
                </Row>
                <Row className="form-check mb-3">
                  <FormCheck
                    name="find_invester"
                    id="find_invester"
                    type="checkbox"
                    checked={form.find_invester}
                    value="true"
                    onChange={() =>
                      setForm((prev) => ({
                        ...prev,
                        find_invester: form.find_invester ? false : true,
                      }))
                    }
                    labelEnd="หาผู้ร่วมลงทุน"
                  />
                </Row>

                <TageForm data={form?.tags as []} setForm={setForm} />
                <Row>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Form.Group className="col-lg-6">
                      <DatePickerCustom
                        group="auction"
                        label="ตั้งแต่วันที่"
                        name="from_date"
                        onChange={setForm}
                        value={form?.auction?.from_date}
                      />
                      <TimePickerCustom
                        group="auction"
                        label="ตั้งแต่เวลา"
                        name="from_time"
                        onChange={setForm}
                        value={form?.auction?.from_time}
                      />
                    </Form.Group>
                    <Form.Group className="col-lg-6">
                      <DatePickerCustom
                        group="auction"
                        label="ถึงวันที่"
                        name="to_date"
                        onChange={setForm}
                        value={form?.auction?.to_date}
                      />
                      <TimePickerCustom
                        group="auction"
                        label="ถึงเวลา"
                        name="to_time"
                        onChange={setForm}
                        value={form?.auction?.to_time}
                      />
                    </Form.Group>
                  </LocalizationProvider>
                </Row>
                <Row className="mb-3">
                  <FormInput
                    name="max_tax"
                    groupClass="col-lg-6"
                    label="ระบุดอกเบี้ยสูงสุด (%)"
                    value={form?.auction?.max_tax}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        auction: {
                          ...prev.auction,
                          [e.target.name]: e.target.value,
                        },
                      }))
                    }
                  />
                </Row>

                <h4 className="mb-3">สถานะ</h4>
                <Row className="form-check mb-3 d-flex">
                  <FormCheck
                    name="status"
                    groupClass="col-auto"
                    id="wait_assessment"
                    checked={form.status === "0" ? true : false}
                    value="0"
                    onChange={handleForm}
                    labelEnd="รอการประเมินราคา"
                  />
                  <FormCheck
                    name="status"
                    groupClass="col-auto"
                    id="wait_maching"
                    checked={form.status === "2" ? true : false}
                    value="2"
                    onChange={handleForm}
                    labelEnd="รอ Maching"
                  />
                  <FormCheck
                    name="status"
                    groupClass="col-auto"
                    id="join_invest"
                    checked={form.status === "1" ? true : false}
                    value="1"
                    onChange={handleForm}
                    labelEnd="ร่วมลงทุน"
                  />
                </Row>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <Button
                  type="submit"
                  disabled={submit}
                  variant="primary"
                  className="mx-1"
                >
                  {submit ? (
                    <>
                      <Spinner size="sm" /> กำลังบันทึกข้อมูล...
                    </>
                  ) : (
                    "บันทึก"
                  )}
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
