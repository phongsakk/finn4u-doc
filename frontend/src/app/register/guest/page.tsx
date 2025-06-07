"use client";
import React, { useEffect, useState } from "react";
import CustomImage from "@components/CustomImage";
import { Button, Form, Row } from "react-bootstrap";
import { FormInput } from "@components/FormCustom/FormInput";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaLine } from "react-icons/fa";
import { AlertPrimary } from "@components/alert/SwalAlert";
import axios from "axios";
import { api } from "@utils/api/index";
import { redirect } from "next/navigation";

const RegisguestModel = {
  firstname: "",
  lastname: "",
  phone_number: "",
  email: "",
  password: "",
  confirm_password: "",
};

function page() {
  const [form, setForm] = useState(RegisguestModel);
  const [PasswordValidated, setPasswordValidated] = useState("");
  const [ConfirmValidated, setConfirmValidated] = useState("");
  const [validated, setValidated] = useState(false);
  const [submit, setSubmit] = useState<boolean>(false);

  const handleForm = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (form.password.length < 8) {
      setPasswordValidated("Then more 8 characters!");
    } else {
      setPasswordValidated("");
    }

    if (form.password !== form.confirm_password) {
      setConfirmValidated("Passwords do not match!");
    } else {
      setConfirmValidated("");
    }
  }, [form.password, form.confirm_password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmit(true);
      const event = e.currentTarget;
      if (event.checkValidity() === false) {
        e.stopPropagation();
        setValidated(true);
        return false;
      }
      if (form?.password !== form?.confirm_password) {
       return AlertPrimary("Password not match - Please try again!", "error")
      }

      const { data: res } = await axios.post(api.internal(`/api/register/guest`), form)
      if (res.status) {
        AlertPrimary("บันทึกข้อมูลสำเร็จ", "success").then(() => {
          redirect("/")
        });
      } else {
        AlertPrimary(`ไม่สามารถบันทึกข้อมูลได้ - Please try again`, "error");
      }
    } catch (error) {
      AlertPrimary(`ไม่สามารถบันทึกข้อมูลได้ - Please try again`, "error");
    } finally {
      setSubmit(false);
    }
  }

  return (
    <div className="">
      <div className="justify-content-center">
        <CustomImage
          src="/consigment-banner.png"
          alt="consigment-banner"
          style={{ aspectRatio: 2.5, height: "auto" }}
        />
      </div>
      <div className="register-seller">
        <div className="container-sm">
          <div className="card-form-main p-1 p-sm-3 p-mb-4 p-lg-5">
            <h4 className="title-main font2 mb-5">
              ลงทะเบียนฝากขายกับ ทุนทันใจ
            </h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <FormInput
                  groupClass="col-lg-6"
                  onChange={handleForm}
                  name="firstname"
                  value={form?.firstname}
                  label="ชื่อ"
                  placeholder="ชื่อ"
                  required
                />
                <FormInput
                  groupClass="col-lg-6"
                  onChange={handleForm}
                  name="lastname"
                  value={form?.lastname}
                  label="นามสกุล"
                  placeholder="นามสกุล"
                  required
                />
              </Row>
              <Row className="mb-3">
                <FormInput
                  groupClass="col-lg-12"
                  onChange={(e) => {
                    if (e.target.value.length <= 10) {
                      handleForm(e);
                    }
                  }}
                  name="phone_number"
                  value={form?.phone_number}
                  label="เบอร์โทรศัพท์"
                  placeholder="เบอร์โทรศัพท์"
                  required
                />
                <FormInput
                  groupClass="col-lg-12"
                  onChange={handleForm}
                  name="email"
                  type="email"
                  value={form?.email}
                  label="อีเมล"
                  placeholder="อีเมล"
                  required
                />
                <FormInput
                  groupClass="col-lg-12"
                  onChange={handleForm}
                  name="password"
                  type="password"
                  value={form?.password}
                  invalid={PasswordValidated}
                  label="รหัสผ่าน"
                  placeholder="รหัสผ่าน"
                  required
                />
                <FormInput
                  groupClass="col-lg-12"
                  onChange={handleForm}
                  name="confirm_password"
                  type="password"
                  value={form?.confirm_password}
                  invalid={ConfirmValidated}
                  label="ยืนยันรหัสผ่าน"
                  placeholder="ยืนยันรหัสผ่าน"
                  required
                />
              </Row>
              <div className="d-flex flex-column align-items-center px-5">
                <Button
                  type="submit"
                  className="rounded-pill w-100 text-center py-2"
                  variant="primary"
                  disabled={submit}
                >
                  {submit ? "กำลังตรวจสอบข้อมูล..." : "สมัครสมาชิก"}
                </Button>
              </div>
              <div className="Separator my-4">
                <div className="text-center w-100 position-absolute">
                  <small className="text-center bg-white px-3 ">
                    หรือ สมัครสมาชิกด้วย
                  </small>
                </div>
                <div className="line border w-100"></div>
              </div>
              <div className="group-guest-btn px-5">
                <Button
                  className="mb-3 text-white"
                  variant="feacbook"
                >
                  <FaFacebook size={20} />
                  <span className="px-2">เข้าสู่ระบบด้วย Facebook</span>
                </Button>
                <Button
                  className="mb-3"
                  variant="google"
                >
                  <FcGoogle size={20} />
                  <span className="px-2">เข้าสู่ระบบด้วย Google</span>
                </Button>
                <Button
                  className="text-white"
                  variant="line"
                >
                  <FaLine size={20} />
                  <span className="px-2">เข้าสู่ระบบด้วย Google</span>
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
