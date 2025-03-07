"use client";

import { ConsignParam } from "@models/asset";
import { Button, Modal } from "react-bootstrap/";
import Image from "next/image";
import checkImage from "@/assets/img/check.png";
import pencilImage from "@/assets/img/pencil.png";
import ModalDialog from "react-bootstrap/ModalDialog";

function ConModal({
  consignModal,
  ConModalClose,
}: {
  consignModal: ConsignParam;
  ConModalClose: () => void;
}) {
  return (
    <Modal
      show={consignModal.status}
      onHide={() => ConModalClose()}
      id="modal-estimate"
      size="lg"
    >
      <ModalDialog>
      <Button variant="close"></Button>

        <h3 className="mb-3">ข้อมูลจากการประเมินราคา</h3>
        <div className="row mb-3">
          <div className="col-lg-5">
            <input
              type="text"
              className="form-control"
              placeholder="ราคาขายฝากจากการประเมิน"
            />
          </div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="มูลค่าทรัพย์สินค้ำระกัน"
            />
          </div>
          <div className="col-lg-3">
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                placeholder="ระยะเวลาขายฝาก"
              />
              <span className="mx-1">ปี</span>
            </div>
          </div>
        </div>

        <h4 className="mt-1 mb-3">
          เลือกรูปภาพให้แสดง<span className="text-secondary">(3 รูป)</span>
        </h4>

        <div className="row mb-3">
          <div className="col-lg-4 col-sm-4 mb-1 nopad text-center">
            <label className="image-checkbox" htmlFor="c-1">
              <input name="image[]" value="" id="c-1" className="select-image d-none" type="checkbox" />
              <img
                className="img-responsive w-100"
                src="https://dummyimage.com/600x400/000/fff"
                width={100}
              />
              <Image className="img-check" src={checkImage} alt="" />
            </label>
          </div>
          <div className="col-lg-4 col-sm-4 mb-1 nopad text-center">
            <label className="image-checkbox" htmlFor="c-2">
              <input name="image[]" value="" id="c-2" className="select-image d-none" type="checkbox" />
              <img
                className="img-responsive w-100"
                src="https://dummyimage.com/600x400/000/fff"
              />
              <Image className="img-check" src={checkImage} alt="" />
            </label>
          </div>
        </div>

        <h4 className="mt-1 mb-3">
          อัพโหลดภาพจากการประเมิน<span className="text-secondary">(3 รูป)</span>
        </h4>
        <div className="row">
          <div className="col-lg-6">
            <input className="form-control mb-3" type="file" id="formFile" />
          </div>
        </div>

        <h4 className="mb-3">การมองเห็นโพสต์</h4>

        <div className="form-check mb-3">
          <div className="d-flex">
            <input
              className="form-check-input"
              type="radio"
              value=""
              id="check1"
            />
            <label className="form-check-label cs mx-2">สมาชิกเท่านั้น</label>

            <input
              className="form-check-input ms-1 mx-2"
              type="radio"
              value=""
              id="check2"
            />
            <label className="form-check-label">สาธารณะ</label>
          </div>
        </div>

        <div className="edit mb-3">
          <h4 className="m-0">สถานที่สำคัญบริเวณพื้นที่</h4>

          <div className="edit">
            <Image src={pencilImage} className="" alt="" />
            <p data-bs-toggle="modal" data-bs-target="#modal-tag">
              แก้ไข
            </p>
          </div>
        </div>

        <div className="area-check mb-3">
          <input type="checkbox" className="btn-check" id="btn-c12" />
          <label className="btn btn-primary" htmlFor="btn-c12">
            ใกล้แหล่งชุมชน
          </label>

          <input type="checkbox" className="btn-check" id="btn-c2" />
          <label className="btn btn-primary" htmlFor="btn-c2">
            ใกล้ร้านค้า
          </label>

          <input type="checkbox" className="btn-check" id="btn-c3" />
          <label className="btn btn-primary" htmlFor="btn-c3">
            ใกล้สวนสาธารณะ
          </label>

          <input type="checkbox" className="btn-check" id="btn-c4" />
          <label className="btn btn-primary" htmlFor="btn-c4">
            ใกล้ห้างสรรพสินค้า
          </label>

          <input type="checkbox" className="btn-check" id="btn-c5" />
          <label className="btn btn-primary" htmlFor="btn-c5">
            ใกล้โรงเรียน
          </label>

          <input type="checkbox" className="btn-check" id="btn-c6" />
          <label className="btn btn-primary" htmlFor="btn-c6">
            ใกล้วัด
          </label>

          <input type="checkbox" className="btn-check" id="btn-c7" />
          <label className="btn btn-primary" htmlFor="btn-c7">
            ใกล้ทางด่วน
          </label>

          <input type="checkbox" className="btn-check" id="btn-c8" />
          <label className="btn btn-primary" htmlFor="btn-c8">
            ใกล้รถไฟฟ้า
          </label>

          <input type="checkbox" className="btn-check" id="btn-c9" />
          <label className="btn btn-primary" htmlFor="btn-c9">
            ใกล้โรงพยาบาล
          </label>

          <input type="checkbox" className="btn-check" id="btn-c10" />
          <label className="btn btn-primary" htmlFor="btn-c10">
            แหล่งท่องเที่ยวสำคัญ
          </label>

          <h4 className="mb-3">สถานะ</h4>
          <div className="form-check mb-3">
            <div className="d-flex">
              <input
                className="form-check-input"
                name="asset_status"
                type="radio"
                value="wait_assessment"
                id="wait_assessment"
              />
              <label
                className="form-check-label cs mx-2"
                htmlFor="wait_assessment"
              >
                รอการประเมินราคา
              </label>

              <input
                className="form-check-input ms-1 mx-2"
                name="asset_status"
                type="radio"
                value="wait_maching"
                id="wait_maching"
              />
              <label className="form-check-label" htmlFor="wait_maching">
                รอ Maching
              </label>

              <input
                className="form-check-input ms-1 mx-2"
                name="asset_status"
                type="radio"
                value="join_invest"
                id="join_invest"
              />
              <label className="form-check-label" htmlFor="join_invest">
                ร่วมลงทุน
              </label>
            </div>
          </div>
        </div>
      </ModalDialog>
      <Modal.Footer className="d-flex justify-content-center">
        <button type="button" className="btn btn-primary mx-1">
          บันทึก
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default ConModal;
