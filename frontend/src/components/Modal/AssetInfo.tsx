"use client";
import { useConsignorModal } from "@components/context/ConsignorContext";
import Loading from "@components/dev/loading";
import { formatNumber, ToDateThai } from "@components/helpers";
import { AssetInfoForm } from "@models/AssetInfoForm";
import { api } from "@utils/api/index";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Modal, Row } from "react-bootstrap";
import { LuCalendarDays } from "react-icons/lu";


function AssetInfo() {
  const { assetInfo } = useConsignorModal();
  const [form, setForm] = useState(AssetInfoForm);
  const [loading, setLoading] = useState(true);
  const [fetchFail, setFetchFail] = useState(false);
  console.log(loading);
  const handleForm = (e: any) => {
    setForm((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    const boot = async () => {
      try {
        setLoading(true);
        const { data: res } = await axios.get(api.internal(
          `/api/consignor/asset/${assetInfo.id}/info`
        ));
        if (res.status) {
          setForm(res.data);
        } else {
          setFetchFail(true);
        }
      } catch (error) {
        setFetchFail(true);
      } finally {
        setLoading(false);
      }
    };

    if (assetInfo.id) {
      boot();
    } else {
      setForm(AssetInfoForm)
    }
  }, [assetInfo.id]);
  return (
    <Modal
      className="modal-main modal-100w"
      size="xl"
      show={assetInfo.isOpen}
      onHide={assetInfo.closeModal}
      centered
    >
      <Modal.Header closeButton>
        <h5 className="modal-title font2">ข้อมูลการขายฝาก</h5>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Row className="mb-3">
              <ShowInput
                name="firstname"
                onChange={handleForm}
                groupClass="col-lg-4"
                startLabel="ชื่อผู้ขายฝาก"
                value={form?.firstname}
              />
              <ShowInput
                name="lastname"
                onChange={handleForm}
                slClass="col-lg-1 px-3 px-sm-3 px-md-0 px-lg-0 text-lg-end align-self-center"
                groupClass="col-lg-4"
                startLabel="นามสกุล"
                value={form?.lastname}
              />
            </Row>
            <Row className="mb-3">
              <ShowInput
                name="asset_id"
                onChange={handleForm}
                groupClass="col-lg-4"
                startLabel="เลขที่ฝากขาย"
                value={form?.asset_id}
              />
              <ShowInput
                name="asset_type_name"
                onChange={handleForm}
                groupClass="col-lg-4"
                slClass="col-lg-1 px-3 px-sm-3 px-md-0 px-lg-0 text-lg-end align-self-center"
                startLabel="ประเภท"
                value={form?.asset_type_name}
              />
            </Row>
            <Row className="mb-3">
              <div className="col-lg-2 text-lg-end align-self-center">
                <label className="form-label">พื้นที่ขายฝาก</label>
              </div>
              <ShowInput
                name="address"
                onChange={handleForm}
                groupClass="col-lg-7"
                slClass="col-lg-2 text-lg-end align-self-center"
                startLabel="บ้านเลขที่"
                value={form?.address}
              />
            </Row>
            <Row className="mb-3">
              <div className="col-lg-2 text-lg-end align-self-center">
                <label className="form-label"></label>
              </div>
              <ShowInput
                name="district_name"
                slClass="col-lg-2 text-lg-end align-self-center"
                groupClass="col-lg-2"
                value={form?.district_name}
                onChange={handleForm}
                startLabel="อำเภอ/เขต"
              />
              <ShowInput
                name="sub_district_name"
                slClass="col-lg-1 px-3 px-sm-3 px-md-0 px-lg-0 text-lg-end align-self-center"
                groupClass="col-lg-2"
                value={form?.sub_district_name}
                onChange={handleForm}
                startLabel="ตำบล/แขวง"
              />
            </Row>
            <Row className="mb-3">
              <div className="col-lg-2 text-lg-end align-self-center">
                <label className="form-label"></label>
              </div>
              <ShowInput
                name="zipcode"
                slClass="col-lg-2 text-lg-end align-self-center"
                groupClass="col-lg-2"
                value={form?.zipcode}
                onChange={handleForm}
                startLabel="รหัสไปรษณีย์"
              />
              <ShowInput
                name="province_name"
                slClass="col-lg-1 px-3 px-sm-3 px-md-0 px-lg-0 text-lg-end align-self-center"
                groupClass="col-lg-2"
                value={form?.province_name}
                onChange={handleForm}
                startLabel="จังหวัด"
              />
            </Row>
            <Row className="mb-3">
              <div className="col-lg-2 text-lg-end align-self-center">
                <label className="form-label"></label>
              </div>
              <ShowInput
                name="aria_size"
                slClass="col-lg-2 text-lg-end align-self-center"
                groupClass="col-lg-2"
                value={form?.aria_size}
                onChange={handleForm}
                startLabel="พื้นที่"
              />
            </Row>
            <Row className="mb-3">
              <div className="col-lg-2 text-lg-end align-self-center">
                <label className="form-label"></label>
              </div>
              <ShowInput
                name="price_appraisal"
                slClass="col-lg-2 text-lg-end align-self-center"
                groupClass="col-lg-2"
                value={form?.price_appraisal}
                onChange={handleForm}
                startLabel="ราคาขายฝาก"
                endLabel="บาท"
              />

              <ShowInput
                name="collateral_price"
                slClass="col-lg-2 px-3 px-sm-3 px-md-0 px-lg-0 text-lg-end align-self-center"
                groupClass="col-lg-2"
                value={form?.collateral_price}
                onChange={handleForm}
                startLabel="มูลค่าทรัพย์สิน"
                endLabel="บาท"
              />
            </Row>
            <Row className="mb-3">
              <div className="col-lg-2 text-lg-end align-self-center">
                <label className="form-label"></label>
              </div>
              <ShowInput
                name="date_sell"
                value={form?.date_sell}
                onChange={handleForm}
                startLabel={
                  form?.status == 2 ? "ตั้งแต่วันที่" : "วันที่ลงขายฝาก"
                }
              />
              <div className="col-lg-1 px-1 align-self-center">
                <LuCalendarDays size={25} className="border" />
              </div>
              <ShowInput
                name="duration"
                value={form?.duration}
                startLabel="ระเวลาขายฝาก"
                endLabel="ปี"
              />
            </Row>
            <Row className="mb-3">
              <div className="col-lg-2 text-lg-end align-self-center">
                <label className="form-label"></label>
              </div>
              {form?.status == 2 && (
                <>
                  <ShowInput
                    name="end_sell"
                    value={form?.end_sell}
                    onChange={handleForm}
                    startLabel="จนถึงวันที่"
                  />
                  <div className="col-lg-1 px-1 align-self-center">
                    <LuCalendarDays size={25} className="border" />
                  </div>
                </>
              )}
            </Row>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default AssetInfo;
type GroupType = {
  onChange?: (e: any) => void;
  groupClass?: string;
  slClass?: string;
  elClass?: string;
  className?: string;
  startLabel?: string;
  endLabel?: string;
  name: string;
  id?: string;
  value?: any;
  readOnly?: boolean;
};

const ShowInput = ({
  onChange,
  groupClass = "col-lg-2 wrap",
  slClass = "col-lg-2 text-lg-end align-self-center",
  elClass = "col-lg-1 align-self-center px-1 ",
  className = "form-control",
  startLabel,
  endLabel,
  name,
  id,
  value,
  readOnly = true,
}: GroupType) => {
  const inputID = id ?? name;
  return (
    <>
      {startLabel && (
        <div className={slClass}>
          <label className="form-label">{startLabel}</label>
        </div>
      )}

      <div className={groupClass}>
        <Form.Control
          type="text"
          onChange={onChange}
          className={className}
          id={inputID}
          value={value}
          aria-describedby="text"
          readOnly={readOnly}
        />
      </div>
      {endLabel && (
        <div className={elClass}>
          <label className="form-label text-secondary">{endLabel}</label>
        </div>
      )}
    </>
  );
};
