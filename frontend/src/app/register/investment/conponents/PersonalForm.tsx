"use client";
import StepButton from "@app/register/consignment/components/button/StepButton";
import { AlertPrimary } from "@components/alert/SwalAlert";
import { LoadPage } from "@components/dev/LoadPage";
import { FormInput } from "@components/FormCustom/FormInput";
import { FormSelectCustom } from "@components/FormCustom/FormSelectCustom";
import { selectDistrict, selectProvince } from "@components/helpers";
import {
  formRegisterInvest,
  regisPersonalInvester,
} from "@models/register/invester";
import { api } from "@utils/api/index";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";

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
  personal: regisPersonalInvester | undefined;
  setPersonal: (regis_persona: regisPersonalInvester) => void;
  setStep: (num: number) => void;
  checkStep: boolean;
}) {
  const NextStep = 2;
  const [form, setForm] = useState(formRegisterInvest);
  const [loadingPage, setLoadingPage] = useState(true);
  const [validated, setValidated] = useState(false);
  const [PasswordValidated, setPasswordValidated] = useState("");
  const [ConfirmValidated, setConfirmValidated] = useState("");
  const [masterData, setMasterData] = useState<masterData>();
  const [provinces, setProvinces] = useState<any[]>();
  const [districts, setDistricts] = useState<any[]>();
  const [subDistricts, setSubDistricts] = useState<any[]>();
  const [submit, setSubmit] = useState<boolean>(false);
  const career = [
    {
      id: 1,
      name: "พนักงาน",
    },
  ];

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

  const handleForm = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    selectProvince(form.province_id, setDistricts, masterData?.district || []);

    // รีเซ็ตค่า district และ sub-district เฉพาะเมื่อ province_id เปลี่ยน
    setForm((prev) => ({
      ...prev,
      district_id: "",
      sub_district_id: "",
    }));

    setSubDistricts([]);
  }, [form.province_id]);

  useEffect(() => {
    selectDistrict(
      form.district_id,
      setSubDistricts,
      masterData?.subDistrict || []
    );

    // รีเซ็ตค่า sub-district เฉพาะเมื่อ district_id เปลี่ยน
    setForm((prev) => ({
      ...prev,
      sub_district_id: "",
    }));
  }, [form.district_id]);

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

      AlertPrimary("success", "success").then(() => {
        setStep(NextStep);
      });
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
            <FormSelectCustom
              value={form.user_prefix_id}
              data={masterData?.prefix}
              name="user_prefix_id"
              label="คำนำหน้า"
              onChange={handleForm}
              required
            />
            <FormInput
              value={form.firstname}
              name="firstname"
              label="ชื่อ"
              onChange={handleForm}
              required
            />
            <FormInput
              value={form.lastname}
              name="lastname"
              label="นามสกุล"
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
            <FormSelectCustom
              value={form.career_id}
              data={career as []}
              name="career_id"
              label="อาชีพ"
              onChange={handleForm}
              required
            />
            <FormInput
              label="รายได้ต่อเดือน"
              name="salary"
              value={form.salary}
              onChange={handleNum}
              required
            />
          </Row>
          <Row className="mt-5 mb-1">
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
            <FormSelectCustom
              data={provinces as []}
              value={form.province_id}
              onChange={handleForm}
              name="province_id"
              label="จังหวัด"
              required
            />
            <FormSelectCustom
              data={districts as []}
              value={form.district_id}
              onChange={handleForm}
              name="district_id"
              label="อำเภอ/เขต"
              required
            />
            <FormSelectCustom
              data={subDistricts as []}
              value={form.sub_district_id}
              onChange={handleForm}
              name="sub_district_id"
              label="ตำบล/แขวง"
              required
            />
          </Row>
          <Row className="mt-5 mb-3">
            <FormInput
              label="ชื่อผู้ได้รับผลประโยชน์"
              name="beneficiary"
              value={form.beneficiary}
              onChange={handleForm}
              required
            />
            <FormInput
              label="เกี่ยวข้องเป็น"
              name="relationship"
              value={form.relationship}
              onChange={handleForm}
              required
            />
          </Row>
          <Row className="mb-3">
            <FormSelectCustom
              data={[]}
              value={form.area}
              onChange={handleForm}
              name="area"
              label="บริเวณที่ต้องการลงทุน"
              required
            />
            <FormSelectCustom
              data={[]}
              value={form.asset_type_id}
              onChange={handleForm}
              name="asset_type_id"
              label="ประเภทสินทรัพย์"
              required
            />
            <FormSelectCustom
              data={[]}
              value={form.amount_id}
              onChange={handleForm}
              name="amount_id"
              label="จำนวนเงินที่ต้องการลงทุน"
              required
            />
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
        <LoadPage />
      )}
    </>
  );
}

export default PersonalForm;
