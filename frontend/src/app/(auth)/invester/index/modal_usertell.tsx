"use client";
import React from "react";
import { Modal } from "react-bootstrap";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillMail } from "react-icons/ai";
import { modalParam } from "@models/modalParam";
import { PromptModal } from "@models/promptmodal";
function Modal_usertell({
  model,
  Close,
}: {
  model: PromptModal;
  Close: () => void;
}) {
  return (
    <Modal show={model.show} onHide={Close} size="lg" centered>
      <Modal.Header closeButton>
        <div className="h2 text-center text-primary w-100">
          ติดต่อเจ้าหน้าที่เพื่อสอบถามข้อมูล
        </div>
      </Modal.Header>

      <Modal.Body className="text-center">
        <h2 className="font-weight-bold mb-4">บริษัท ฟินน์โฟร์ยู จำกัด</h2>
        <h4>เลขที่ 89 ถนนงามวงศ์วาน</h4>
        <h4>แขวงลาดยาว เขตจตุจักร</h4>
        <h4>กรุงเทพมหานคร 10900</h4>
      </Modal.Body>
      <Modal.Footer>
        <div className="h2 text-primary text-center w-100">
          <div className="row justify-content-center">
            <div className="col-md-auto">
              <BsFillTelephoneFill />
              094-646-4625
            </div>
            <div className="col-md-auto">
              <AiFillMail /> finn4uoffice@gmail.com
            </div>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default Modal_usertell;
