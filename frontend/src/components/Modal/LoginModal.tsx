"use client";

import {
  Button,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import Link from "next/link";
import CustomImage from "@components/CustomImage";
import { LoginModel } from "@models/LoginModel";
import { FormInput } from "@components/FormCustom/FormInput";
import { AlertPrimary } from "@components/alert/SwalAlert";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoaderContext } from "@components/context/LoaderContext";

export default function LoginModal() {
  const [form, setForm] = useState(LoginModel);
  const router  = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";
  const { modalType, closeModal, openModal } = useLoaderContext();
  const [submit, setSubmit] = useState(false);
  if (modalType !== "login") return null;

  const handleForm = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmit(true);
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        userType: form.userType,
        redirect: false,
      });
      if (res?.url) {
        if (redirectUrl) {
          router.push(redirectUrl)
          closeModal();
        } else {
          window.location.reload();
        }
      } else {
        AlertPrimary("Invalid email or password.", "error");
      }
    } catch (error) {
      AlertPrimary("Invalid email or password.", "error");
    } finally {
      setSubmit(false);
    }
  };

  return (
    <Modal
      className="font2 modallogin"
      size="lg"
      show
      onHide={closeModal}
      centered
    >
      <div className="position-absolute top-0 end-0 p-2">
        <Button
          variant="close"
          className="handleLogin"
          onClick={closeModal}
        ></Button>
      </div>
      <Row>
        <div className="col-lg-4 d-none d-lg-block">
          <div className="left">
            <h2 className="font2">เข้าใช้งาน</h2>
            <h2 className="font2">อย่างไร้กังวล</h2>
            <div className="list">
              <CustomImage
                src="/log1.svg"
                alt="log1"
                style={{
                  height: "auto",
                }}
              />
              <span className="font2">
                เรารักษาข้อมูลของคุณเป็นความลับสูงสุด
              </span>
            </div>
            <div className="list">
              <CustomImage
                src="/safe.svg"
                alt="safe"
                style={{
                  height: "auto",
                }}
              />
              <span>ระบบรักษาความปลอดภัยที่ธนาคารยอมรับ</span>
            </div>

            <div className="text-center">
              <CustomImage
                src="/office.png"
                alt="office"
                style={{
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <Form className="right" onSubmit={handleSubmit}>
            <h4 className="title">เข้าสู่ระบบ</h4>
            <div className="checklogin">
              <div className="form-check gap-1">
                <FormCheck
                  className="group gap-0 gap-ms-1 gap-lg-2 ms-1 ms-md-2 ms-lg-3"
                  value="general"
                  checked={form.userType === "general"}
                  id="general"
                  name="userType"
                  type="radio"
                  onChange={handleForm}
                  label="ผู้ใช้ทั่วไป"
                />
                <FormCheck
                  className="group gap-0 gap-ms-1 gap-lg-2 ms-1 ms-md-2 ms-lg-3"
                  value="consignor"
                  checked={form.userType === "consignor"}
                  id="consignor"
                  name="userType"
                  type="radio"
                  onChange={handleForm}
                  label="ผู้ขายฝาก"
                />
                <FormCheck
                  className="group gap-0 gap-ms-1 gap-lg-2 ms-1 ms-md-2 ms-lg-3"
                  value="investor"
                  checked={form.userType === "investor"}
                  id="investor"
                  name="userType"
                  type="radio"
                  onChange={handleForm}
                  label="นักลงทุน"
                />
              </div>
            </div>
            <Row className="mb-3">
              <FormInput
                groupClass="col"
                value={form.email}
                onChange={handleForm}
                type="email"
                name="email"
                label="อีเมล"
              />
            </Row>
            <Row>
              <div className="forgotpass">
                <FormLabel>รหัสผ่าน</FormLabel>
                <span> ลืมรหัสผ่าน?</span>
              </div>
              <FormInput
                groupClass="col"
                value={form.password}
                onChange={handleForm}
                type="password"
                name="password"
              />
            </Row>
            <div className="mb-1">
              <span className="text-danger h6"></span>
            </div>
            <Button
              variant="primary"
              className="font2"
              type="submit"
              disabled={submit}
            >
              {submit ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}{" "}
            </Button>
            {form.userType === "general" && (
              <>
                <div className="or">
                  <span></span>
                  <small className="text-center">Or log in with</small>
                  <span></span>
                </div>

                <div className="link">
                  <a href="#" className="btn btn-secondary">
                    <CustomImage
                      src="/googleee.svg"
                      alt="googleee"
                      style={{
                        height: "auto",
                      }}
                    />
                    <span>Facebook</span>
                  </a>
                  <a href="#" className="btn btn-secondary">
                    <CustomImage
                      src="/faceeee.svg"
                      alt="faceeee"
                      style={{
                        height: "auto",
                      }}
                    />
                    <span>Google</span>
                  </a>
                </div>
              </>
            )}

            <div className="line"></div>

            <div className="regis">
              <span className="text-secondary">ยังไม่เคยใช้บริการ ?</span>
              <Link
                href="#"
                className="text-primary"
                onClick={() => openModal("register")}
              >
                สมัครที่นี่
              </Link>
            </div>
          </Form>
        </div>
      </Row>
    </Modal>
  );
}
