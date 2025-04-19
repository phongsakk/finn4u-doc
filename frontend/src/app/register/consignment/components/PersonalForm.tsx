"use client";
import { selectDistrict, selectProvince } from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, FormSelect, Row, Spinner } from "react-bootstrap";
import { formRegisterCon, regis_personal } from "@models/register/consignor";
import { AlertPrimary } from "@components/alert/SwalAlert";
import StepButton from "./button/StepButton";
import { FormInput } from "./button/FormInput";

type masterData = {
  prefix: [];
  province: [];
  district: [];
  subDistrict: [];
};

const fetchMaster = async () => {
  const { data: res_masterdata } = await axios.get(
    api.internal("/api/address_master")
  );
  return res_masterdata;
};

function PersonalForm({
  personal,
  setPersonal,
  setStep,
  checkStep,
}: {
  personal: regis_personal | undefined;
  setPersonal: (regis_persona: regis_personal) => void;
  setStep: (num: number) => void;
  checkStep: boolean;
}) {
  const NextStep = 2;
  const [form, setForm] = useState(formRegisterCon);
  const [loadingPage, setLoadingPage] = useState(true);
  const [PasswordValidated, setPasswordValidated] = useState("");
  const [ConfirmValidated, setConfirmValidated] = useState("");
  const [validated, setValidated] = useState(false);
  const [masterData, setMasterData] = useState<masterData>();
  const [provinces, setProvinces] = useState<any[]>();
  const [districts, setDistricts] = useState<any[]>();
  const [subDistricts, setSubDistricts] = useState<any[]>();
  const [submit, setSubmit] = useState<boolean>(false);

  const handleForm = (e: any) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const boot = async () => {
      try {
        setLoadingPage(true);
        const master = await fetchMaster();
        setMasterData(master);
        setProvinces(master.province);
      } catch (error) {
        AlertPrimary("ไม่สามารถโหลดข้อมูลได้ - Please try again!", "error");
      } finally {
        setLoadingPage(false);
      }
    };
    boot();
  }, []);

  useEffect(() => {
    if (!loadingPage && personal !== undefined) {
      setForm({
        ...personal.info,
        user_prefix_id: String(personal.info.user_prefix_id),
        career_id: String(personal.info.career_id),
        province_id: String(personal.info.province_id),
        district_id: String(personal.info.district_id),
        sub_district_id: String(personal.info.sub_district_id),
      });
    }
  }, [loadingPage]);

  const handleNum = (e: any) => {
    const { name, value } = e.target;
    const regex = /^(\d+(\.\d*)?|\.\d+)$/;

    if (regex.test(value) || value === "") {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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

  useEffect(() => {
    if (!form.province_id) return;
    selectProvince(form.province_id, setDistricts, masterData?.district || []);

    // รีเซ็ตค่า district และ sub-district เฉพาะเมื่อ province_id เปลี่ยน
    setForm((prev) => ({
      ...prev,
      district_id: String(personal?.info?.district_id) || "",
      sub_district_id: "",
    }));

    setSubDistricts([]);
  }, [form.province_id]);

  useEffect(() => {
    if (!form.district_id) return;

    selectDistrict(
      form.district_id,
      setSubDistricts,
      masterData?.subDistrict || []
    );

    // รีเซ็ตค่า sub-district เฉพาะเมื่อ district_id เปลี่ยน
    setForm((prev) => ({
      ...prev,
      sub_district_id: String(personal?.info?.sub_district_id) || "",
    }));
  }, [form.district_id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const event = e.currentTarget;
    if (event.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return false;
    }

    setSubmit(true);
    try {
      const model = {
        ...form,
        user_prefix_id: Number(form.user_prefix_id),
        career_id: Number(form.career_id),
        province_id: Number(form.province_id),
        district_id: Number(form.district_id),
        sub_district_id: Number(form.sub_district_id),
      };

      const { data: res } = await axios.post(
        api.internal("/api/register/consignment"),
        model
      );
      if (res.status) {
        var PersonalModel = {
          UserID: res.data.user.id,
          Phone: res.data.user.PhoneNumber,
          Email: res.data.user.email,
          Ref: res.data.ref,
          info: model,
        };
        setPersonal(PersonalModel);
        AlertPrimary("บันทึกข้อมูลสำเร็จ", "success").then(() => {
          setStep(NextStep);
        });
      } else {
        AlertPrimary(`ไม่สามารถบันทึกข้อมูลได้ - ${res.data.error}`, "error");
      }
    } catch (error) {
      AlertPrimary("ไม่สามารถบันทึกข้อมูลได้", "error");
    } finally {
      setSubmit(false);
    }
  };

  return (
    <>
      {!loadingPage ? (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <div className="col-lg-4">
              <Form.Group className="mb-3">
                <Form.Label className="form-label font2" htmlFor="prefix">
                  คำนำหน้า<span className="text-require font2">*</span>
                </Form.Label>
                <Form.Select
                  value={form.user_prefix_id}
                  onChange={handleForm}
                  id="prefix"
                  name="user_prefix_id"
                  required
                >
                  {masterData?.prefix.map((x: any, index) => (
                    <option value={x.id} key={index}>
                      {x.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            <FormInput
              label="ชื่อ"
              name="firstname"
              value={form.firstname}
              onChange={handleForm}
              required
            />
            <FormInput
              label="นามสกุล"
              name="lastname"
              value={form.lastname}
              onChange={handleForm}
              required
            />
            <FormInput
              label="เบอร์โทรศัพท์"
              name="phone_number"
              value={form.phone_number}
              onChange={(e) => {
                if (e.target.value.length <= 10) {
                  handleForm(e);
                }
              }}
              required
            />
            <FormInput
              label="เวลาที่สะดวกให้ติดต่อกลับ"
              name="online_range"
              value={form.online_range}
              onChange={handleForm}
              required
            />
          </Row>

          <Row className="mt-5 mb-3">
            <div className="col-lg-4">
              <div className="mb-3">
                <label className="form-label font2" htmlFor="career">
                  อาชีพ<span className="text-require font2">*</span>
                </label>
                <FormSelect
                  value={form.career_id}
                  onChange={handleForm}
                  name="career_id"
                  required
                >
                  <option value="1">พนักงาน</option>
                </FormSelect>
              </div>
            </div>
            <FormInput
              label="รายได้ต่อเดือน"
              name="salary"
              value={form.salary}
              onChange={handleNum}
              required
            />
          </Row>

          <Row className="mt-5">
            <FormInput
              label="ที่อยู่ปัจจุบัน"
              name="address"
              value={form.address}
              onChange={handleForm}
              required
            />
            <FormInput
              label="ถนน"
              name="street"
              value={form.street}
              onChange={handleForm}
              required
            />
          </Row>

          <Row className="mb-3">
            <div className="col-lg-4">
              <div className="mb-3">
                <label className="form-label font2" htmlFor="province">
                  จังหวัด<span className="text-require font2">*</span>
                </label>
                <FormSelect
                  value={form.province_id}
                  onChange={handleForm}
                  name="province_id"
                  id="province_id"
                  required
                >
                  <option value="" className="text-secondary">
                    เลือกจังหวัด
                  </option>
                  {provinces?.map((x: any, index) => (
                    <option value={x.id} key={index}>
                      {x.name}
                    </option>
                  ))}
                </FormSelect>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mb-3">
                <label className="form-label font2" htmlFor="district">
                  อำเภอ/เขต<span className="text-require font2">*</span>
                </label>
                <FormSelect
                  value={form.district_id}
                  onChange={handleForm}
                  name="district_id"
                  id="district_id"
                  required
                >
                  <option value="" className="text-secondary">
                    เลือกอำเภอ/เขต
                  </option>
                  {districts?.map((x: any, index) => (
                    <option value={x.id} key={index}>
                      {x.name}
                    </option>
                  ))}
                </FormSelect>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mb-3">
                <label className="form-label font2">
                  ตำบล/แขวง<span className="text-require font2">*</span>
                </label>
                <FormSelect
                  value={form.sub_district_id}
                  onChange={handleForm}
                  name="sub_district_id"
                  id="sub_district_id"
                  required
                >
                  <option value="" className="text-secondary">
                    เลือกตำบล/แขวง
                  </option>
                  {subDistricts?.map((x: any, index) => (
                    <option value={x.id} key={index}>
                      {x.name}
                    </option>
                  ))}
                </FormSelect>
              </div>
            </div>
          </Row>

          <Row className="mt-5 mb-3">
            <FormInput
              label="อีเมล"
              type="email"
              name="email"
              value={form.email}
              onChange={handleForm}
              required
            />
            <FormInput
              label="รหัสผ่าน"
              type="password"
              name="password"
              value={form.password}
              onChange={handleForm}
              invalid={PasswordValidated}
              placeholder="ต้องไม่ต่ำกว่า 8 ตัวอักษร"
              required
            />
            <FormInput
              label="ยืนยันรหัสผ่าน"
              type="password"
              name="confirm_password"
              value={form.confirm_password}
              onChange={handleForm}
              invalid={ConfirmValidated}
              placeholder="ต้องไม่ต่ำกว่า 8 ตัวอักษร"
              required
            />
          </Row>
          <div className="submit-group">
            <Button variant="white" disabled={submit}>
              ย้อนกลับ
            </Button>
            <StepButton
              checkStep={checkStep}
              submit={submit}
              NextStep={NextStep}
              setStep={setStep}
            />
          </div>
        </Form>
      ) : (
        <div className="register-loader-page">
          <Spinner animation="border" variant="success" />
        </div>
      )}
    </>
  );
}

export default PersonalForm;
