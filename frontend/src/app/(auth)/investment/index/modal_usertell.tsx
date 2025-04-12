"use client";
import React from "react";
import { Modal } from "react-bootstrap";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillMail } from "react-icons/ai";
import { modalParam } from "@models/modalParam";
function Modal_usertell({
  userTellOpen,
  handleUserTellHide,
}: {
  userTellOpen: modalParam;
  handleUserTellHide: () => void;
}) {
  return (
    <Modal
      show={userTellOpen.open}
      onHide={() => handleUserTellHide()}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <div className="h2 text-center text-primary w-100">
          ติดต่อเจ้าหน้าที่เพื่อสอบถามข้อมูล
        </div>
      </Modal.Header>

      <Modal.Body className="text-center">
        <h2 className="font-weight-bold mb-4">บริษัท อารักษ์มิตร</h2>
        <h4>จำกัด 9/8 หมู่ 5 บางกรวย ซอย 10</h4>
        <h4>ตำบลบางกรวย อำเภอบางกรวย</h4>
        <h4>จังหวัดนนทบุรี 11130</h4>
      </Modal.Body>
      <Modal.Footer>
        <div className="h2 text-primary text-center w-100">
          <div className="row justify-content-center">
            <div className="col-md-auto">
              <BsFillTelephoneFill />
              02-077-7481
            </div>
            <div className="col-md-auto">
              <AiFillMail /> info@arrakmit.com
            </div>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default Modal_usertell;
