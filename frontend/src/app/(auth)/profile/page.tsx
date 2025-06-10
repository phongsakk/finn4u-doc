"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, FormCheck, Row } from "react-bootstrap";
import { FormInput } from "@components/FormCustom/FormInput";
import { ProfileModel, ProfileType } from "@models/ProfileModel";
import { useLoaderContext } from "@components/context/LoaderContext";
import CheckRadio from "@components/FormCustom/CheckRadio";
import axios from "axios";
import { api } from "@utils/api/index";
import CropImage from "@components/dev/CropImage";

function page() {
  const [form, setForm] = useState<ProfileType>(ProfileModel);
  const [master, setMaster] = useState<any>([]);
  const { user } = useLoaderContext();
  const [validated, setValidated] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const fetchMaster = async () => {
      try {
        const { data: res } = await axios.get(
          api.internal(`/api/master/prefix`)
        );
        if (res.status) {
          setMaster(res.data);
        }
      } catch (error) {
        console.error(`Api error`);
      }
    };
    fetchMaster();
    setForm({
      image: user?.image || "/",
      user_prefix_id: user?.user_prefix_id || "",
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
      line: user?.line || "",
      birthday: user?.birthday || "",
      license_id: user?.license_card || "",
    } as ProfileType);
  }, [user]);

  const handleForm = (e: any) => {
    setForm((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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

      const model = {
        body: JSON.stringify(form),
        new_image: form.new_image,
      };

      const { data: res } = await axios.post(
        api.internal(`/api/profile`),
        model,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
    } finally {
      setSubmit(true);
    }
  };
  return (
    <div className="rounded bg-white overflow-hidden">
      <div className="py-3 px-4 text-white bg-primary">ข้อมูลส่วนตัว</div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="py-3 px-4">
          <CropImage image={form?.image} setForm={setForm} />
          <label className="mb-3">คำนำหน้า</label>
          <div className="checklogin px-0">
            <div className="mb-3 form-check px-0">
              <CheckRadio
                data={master as []}
                setForm={setForm}
                name="user_prefix_id"
                value={form?.user_prefix_id}
              />
            </div>
            <Row className="mb-3">
              <FormInput
                groupClass="col-lg-6"
                value={form?.firstname}
                label="ชื่อ"
                placeholder="ชื่อ"
                name="firstname"
                onChange={handleForm}
                required
              />
              <FormInput
                groupClass="col-lg-6"
                value={form?.lastname}
                label="นามสกุล"
                placeholder="นามสกุล"
                name="lastname"
                onChange={handleForm}
                required
              />
            </Row>
            <Row className="mb-3">
              <FormInput
                groupClass="col-lg-6"
                value={form?.email}
                label="อีเมล"
                placeholder="อีเมล"
                name="email"
                onChange={handleForm}
                required
                disabled
              />
              <FormInput
                groupClass="col-lg-6"
                value={form?.phone_number}
                label="เบอร์โทรศัพท์"
                placeholder="เบอร์โทรศัพท์"
                name="phone_number"
                onChange={handleForm}
                required
              />
            </Row>
            <Row className="mb-3">
              <FormInput
                groupClass="col-lg-6"
                value={form?.line}
                label="Line ID"
                placeholder="Line ID"
                name="line"
                onChange={handleForm}
                required
              />
            </Row>
            <Row className="mb-3">
              <FormInput
                groupClass="col-lg-6"
                value={form?.birthday}
                label="วันเกิด"
                placeholder="วัน/เดือน/ปี"
                name="birthday"
                onChange={handleForm}
              />
            </Row>
            <Row className="mb-3">
              <FormInput
                groupClass="col-lg-6"
                value={form?.license_id}
                label="เลขบัตรประชาชน"
                placeholder="กรุณากรอกหมายเลขบัตรประชาชน"
                name="license_id"
                onChange={handleForm}
                required
              />
            </Row>
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="primary">
                บันทึกการเปลี่ยนแปลง
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default page;
