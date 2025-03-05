import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import BarChart from "./BarChart";
import { modalParam } from "@app/consignment/index/page";

function Modal_interest({
  investCalOpen,
  handleHide,
}: {
  investCalOpen: modalParam;
  handleHide: () => void;
}) {

  return (
    <Modal
      className="font2 modal-main"
      show={investCalOpen.Status}
      size="xl"
      onHide={() => handleHide()}
      centered
    >
      <Modal.Header closeButton>
        <h5 className="modal-title font2">การคำนวณดอกเบี้ย</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-lg-4">
            <h4 className="font2">ดอกเบี้ยของคุณ</h4>
            <div className="mb-3">
              <label className="form-label">จำนวนเงินขายฝาก (บาท)</label>
              <input
                type="text"
                className="form-control text-center"
                id="form1"
                aria-describedby="text"
                value={"1,450,000"}
                onChange={() => {}}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">ระยะเวลาขายฝาก (ปี)</label>
              <input
                type="text"
                className="form-control text-center"
                id="form1"
                aria-describedby="text"
                value={"1"}
                onChange={() => {}}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">ดอกเบี้ย (บาท/ปี)</label>
              <input
                type="text"
                className="form-control text-center bg-primary color-white"
                id="form1"
                aria-describedby="text"
                value={"130,500"}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="col-lg-8">
            <BarChart />
          </div>
        </div>
        <div className="text-center">
          <small className="text-primary">
            อัตราดอกเบี้ยที่คำนวณได้จะถูกนำไปพิจารณากับเงื่อนไขการขายฝาก
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Modal_interest;
