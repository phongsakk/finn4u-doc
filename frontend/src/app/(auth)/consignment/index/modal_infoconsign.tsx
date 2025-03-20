"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
export type InfoConType = {
  open: boolean;
  close?: () => void;
};

function Modal_infoconsign(InfoConType: InfoConType) {
  return (
    <Modal
      className="modal-main modal-100w"
      size="xl"
      show={InfoConType.open}
      onHide={() => InfoConType.close?.()}
      centered
    >
      <Modal.Header closeButton>
        <h5 className="modal-title font2">ข้อมูลการขายฝาก</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-3">
          <div className="col-lg-2">
            <label className="form-label">ชื่อผู้ขายฝาก</label>
          </div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              id="form1"
              aria-describedby="text"
            />
          </div>
          <div className="col-lg-2">
            <label className="form-label">นามสกุล</label>
          </div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              id="form1"
              aria-describedby="text"
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
              id="form1"
              aria-describedby="text"
            />
          </div>
          <div className="col-lg-2">
            <label className="form-label">ประเภท</label>
          </div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              id="form1"
              aria-describedby="text"
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
              id="form1"
              aria-describedby="text"
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
              id="form1"
              aria-describedby="text"
            />
          </div>
          <div className="col-lg-2">
            <label className="form-label">ตำบล/แขวง</label>
          </div>
          <div className="col-lg-2">
            <input
              type="text"
              className="form-control"
              id="form1"
              aria-describedby="text"
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
              id="form1"
              aria-describedby="text"
            />
          </div>
          <div className="col-lg-2">
            <label className="form-label">จังหวัด</label>
          </div>
          <div className="col-lg-2">
            <input
              type="text"
              className="form-control"
              id="form1"
              aria-describedby="text"
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
              id="form1"
              aria-describedby="text"
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
          <div className="col-lg-2 wrap">
            <input
              type="text"
              className="form-control"
              id="form1"
              aria-describedby="text"
            />
            <span className="text-secondary">บาท</span>
          </div>
          <div className="col-lg-2">
            <label className="form-label">มูลค่าทรัพย์สิน</label>
          </div>
          <div className="col-lg-2 wrap">
            <input
              type="text"
              className="form-control"
              id="form1"
              aria-describedby="text"
            />
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
              id="form1"
              aria-describedby="text"
              placeholder="20 เมษายน 2565"
            />
          </div>
          <div className="col-lg-2">
            <input id="endDate" className="form-control" type="date" />
          </div>
          <div className="col-lg-2">
            <label className="form-label">ระเวลาขายฝาก</label>
          </div>
          <div className="col-lg-2 wrap">
            <input
              type="text"
              className="form-control"
              id="form1"
              aria-describedby="text"
            />
            <span className="text-secondary">ปี</span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Modal_infoconsign;
