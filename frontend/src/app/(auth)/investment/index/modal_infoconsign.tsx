"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { modalParam } from "@app/consignment/index/page";
import { FaRegCalendarAlt } from "react-icons/fa";

function Modal_infoconsign({
  detailOpen,
  handleConHide,
}: {
  detailOpen: modalParam;
  handleConHide: () => void;
}) {
  return (
    <Modal
      className="modal-main modal-100w"
      size="xl"
      show={detailOpen.Status}
      onHide={() => handleConHide()}
      centered
    >
      <Modal.Header closeButton>
        <h5 className="modal-title font2">ข้อมูลการขายฝาก</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-3">
          <div className="col-lg-2">
            <label className="form-label">ชื่อนักลงทุน</label>
          </div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              aria-describedby="text"
              value={"สมคิด"}
              readOnly
            />
          </div>
          <div className="col-lg-2">
            <label className="form-label">นามสกุล</label>
          </div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              aria-describedby="text"
              value={"จิตชื่นบาน"}
              readOnly
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <label className="form-label">ชื่อผู้ขายฝาก</label>
          </div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              aria-describedby="text"
              value={"ปิยะ"}
              readOnly
            />
          </div>
          <div className="col-lg-2">
            <label className="form-label">นามสกุล</label>
          </div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              aria-describedby="text"
              value={"ศรีสุข"}
              readOnly
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <label className="form-label">เลขที่ฝากขาย</label>
          </div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              aria-describedby="text"
              value={"000023"}
              readOnly
            />
          </div>
          <div className="col-lg-2">
            <label className="form-label">ประเภท</label>
          </div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              aria-describedby="text"
              value={"ที่ดินพร้อมสิ่งปลูกสร้าง"}
              readOnly
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <label className="form-label">พื้นที่ขายฝาก</label>
          </div>
          <div className="col-lg-2">
            <label className="form-label">บ้านเลขที่</label>
          </div>
          <div className="col-lg-8">
            <input
              type="text"
              className="form-control"
              aria-describedby="text"
              value={"23/3"}
              readOnly
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <label className="form-label">
              <span></span>
            </label>
          </div>
          <div className="col-lg-2">
            <label className="form-label">อำเภอ/เขต</label>
          </div>
          <div className="col-lg-2">
            <input
              type="text"
              className="form-control"
              aria-describedby="text"
              value={"ลาดกระบัง"}
              readOnly
            />
          </div>
          <div className="col-lg-2">
            <label className="form-label">ตำบล/แขวง</label>
          </div>
          <div className="col-lg-2">
            <input
              type="text"
              className="form-control"
              aria-describedby="text"
              value={"ขุมทอง"}
              readOnly
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <label className="form-label">
              <span></span>
            </label>
          </div>
          <div className="col-lg-2">
            <label className="form-label">รหัสไปรษณีย์</label>
          </div>
          <div className="col-lg-2">
            <input
              type="text"
              className="form-control"
              aria-describedby="text"
              value={"10520"}
              readOnly
            />
          </div>
          <div className="col-lg-2">
            <label className="form-label">จังหวัด</label>
          </div>
          <div className="col-lg-2">
            <input
              type="text"
              className="form-control"
              aria-describedby="text"
              value={"กรุงเทพฯ"}
              readOnly
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <label className="form-label">
              <span></span>
            </label>
          </div>
          <div className="col-lg-2">
            <label className="form-label">พื้นที่</label>
          </div>
          <div className="col-lg-2 wrap">
            <input
              type="text"
              className="form-control"
              aria-describedby="text"
              value={"20"}
              readOnly
            />
            <p className="text-secondary">ตารางวา</p>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <label className="form-label">
              <span></span>
            </label>
          </div>
          <div className="col-lg-2">
            <label className="form-label">ราคาขายฝาก</label>
          </div>
          <div className="col-lg-1 wrap">
            <input
              type="text"
              className="form-control"
              aria-describedby="text"
              value={"1"}
              readOnly
            />
          </div>
          <div className="col-lg-1">
            <span className="text-secondary">ปี</span>
          </div>
          <div className="col-lg-2">
            <label className="form-label">มูลค่าทรัพย์สิน</label>
          </div>
          <div className="col-lg-2 wrap">
            <input
              type="text"
              className="form-control"
              aria-describedby="text"
              value={"1,450,000"}
              readOnly
            />
          </div>
          <div className="col-lg-2">
            <span className="text-secondary">บาท</span>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-2">
            <label className="form-label">วันที่ลงขายฝาก</label>
          </div>
          <div className="col-lg-2">
            <input
              type="text"
              className="form-control"
              aria-describedby="text"
              value={"20 เมษายน 2565"}
              readOnly
            />
          </div>
          <div className="col-lg-2">
            <FaRegCalendarAlt size={30} />
          </div>
          <div className="col-lg-2">
            <label className="form-label">จนถึงวันที่</label>
          </div>
          <div className="col-lg-2">
            <input
              type="text"
              className="form-control"
              aria-describedby="text"
              value={"20 เมษายน 2565"}
              readOnly
            />
          </div>
          <div className="col-lg-2">
            <FaRegCalendarAlt size={30} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Modal_infoconsign;
