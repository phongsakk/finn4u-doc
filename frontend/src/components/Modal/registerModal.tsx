"use client";

import { Button, Modal } from "react-bootstrap";
import { useModal } from "../context/ModalContext";
import Image from "next/image";
import { FaCheckSquare } from "react-icons/fa";
import imagedeal from "@public/deal.png";
import Link from "next/link";
import CustomImage from "@components/CustomImage";

export default function RegisterModal() {
  const { modalType, closeModal, openModal } = useModal();

  // Only show this modal if the active modal type is 'login'
  if (modalType !== "register") return null;

  return (
    <Modal
      className="modallogin"
      id="modalregister"
      show
      onHide={() => openModal("login")}
      size="lg"
      centered
    >
      <div className="position-absolute top-0 end-0 p-2">
        <Button
          variant="close"
          className="handleLogin"
          onClick={() => openModal("login")}
        ></Button>
      </div>
      <div className="w-100 justify-content-center d-flex mb-3">
        <label className="title">สนใจลงทะเบียนเป็น</label>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="text-center">
              <Image src={imagedeal} alt="" />
            </div>
            <div className="form-check">
              <FaCheckSquare className="form-check-input" />
              <label className="form-check-label">
                ราคารับขายฝากสูงสุดถึง 70%
              </label>
            </div>
            <div className="form-check">
              <FaCheckSquare className="form-check-input" />
              <label className="form-check-label">
                อัตราผลตอบแทนสูง 9-12% ต่อป
              </label>
            </div>
            <div className="form-check ms">
              <FaCheckSquare className="form-check-input" />
              <label className="form-check-label">
                ลดภาระดอกเบี้ยขายฝาก 0.75% /เดือน
              </label>
            </div>

            <div className="text-center">
              <Link
                href="/register/consignor"
                onClick={closeModal}
                className="btn btn-primary"
              >
                ผู้ขายฝาก
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="text-center">
              <CustomImage
                src="/homecare.png"
                alt="homecare"
                style={{
                  height: "auto",
                }}
              />
            </div>

            <div className="form-check">
              <FaCheckSquare className="form-check-input" />
              <label className="form-check-label">
                อัตราผลตอบแทนสูง 9-12% ต่อปี
              </label>
            </div>
            <div className="form-check">
              <FaCheckSquare className="form-check-input" />

              <label className="form-check-label">
                อสังหาริมทรัพย์มูลค่าสูงค้ำประกัน
              </label>
            </div>
            <div className="form-check">
              <FaCheckSquare className="form-check-input" />
              <label className="form-check-label">
                ประเมินทรัพย์สินโดยบริษัทประเมิน ที่ได้รับความเห็นชอบจาก ก.ล.ต.
              </label>

              <div className="text-center">
                <Link
                  href="/register/invester"
                  onClick={closeModal}
                  className="btn btn-primary"
                >
                  นักลงทุน
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
