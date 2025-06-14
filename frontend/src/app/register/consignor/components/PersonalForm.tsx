"use client";
import { api } from "@utils/api/index";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, FormSelect, Row, Spinner } from "react-bootstrap";
import { formRegisterCon, regis_personal } from "@models/register/consignor";
import { AlertPrimary } from "@components/alert/SwalAlert";
import { FormInput } from "@components/FormCustom/FormInput";
import { LoadPage } from "@components/dev/LoadPage";
import StepButton from "@components/FormCustom/StepButton";
import { CareerList } from "@models/MasterModel";
import { useAddress } from "@components/context/AddressContext";

type masterData = {
  prefix: [];
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
  const [submit, setSubmit] = useState<boolean>(false);
  const { Province, District, SubDistrict, setMaster, setFormEdit } = useAddress();

  const handleForm = (e: any) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const boot = async () => {
      try {
        setLoadingPage(true);
        const master = await fetchMaster();
        setMasterData({ prefix: master?.prefix })
        setMaster(master)
        if (personal !== undefined) {
          setForm({
            ...personal.info,
            user_prefix_id: String(personal.info.user_prefix_id),
            career_id: String(personal.info.career_id),
            province_id: String(personal.info.province_id),
            district_id: String(personal.info.district_id),
            sub_district_id: String(personal.info.sub_district_id),
          });
          
          setFormEdit({
            province_id: String(personal.info.province_id),
            district_id: String(personal.info.district_id),
            sub_district_id: String(personal.info.sub_district_id),
            setForm,
            handleForm,
          });
        }
      } catch (error) {
        AlertPrimary("ไม่สามารถโหลดข้อมูลได้ - Please try again!", "error");
      } finally {
        setLoadingPage(false);
      }
    };
    boot();
  }, []);

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
        ...form,
        user_prefix_id: Number(form.user_prefix_id),
        career_id: Number(form.career_id),
        province_id: Number(form.province_id),
        district_id: Number(form.district_id),
        sub_district_id: Number(form.sub_district_id),
      };

      const { data: res } = await axios.post(
        api.internal("/api/register/consignor"),
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
        AlertPrimary(`ไม่สามารถบันทึกข้อมูลได้ - Please try again`, "error");
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
                  disabled={checkStep}
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
              disabled={checkStep}
              label="ชื่อ"
              name="firstname"
              value={form.firstname}
              onChange={handleForm}
              required
            />
            <FormInput
              disabled={checkStep}
              label="นามสกุล"
              name="lastname"
              value={form.lastname}
              onChange={handleForm}
              required
            />
            <FormInput
              disabled={checkStep}
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
              disabled={checkStep}
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
                  disabled={checkStep}
                  value={form.career_id}
                  onChange={handleForm}
                  name="career_id"
                  required
                >
                  {CareerList?.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  ))}
                </FormSelect>
              </div>
            </div>
            <FormInput
              disabled={checkStep}
              label="รายได้ต่อเดือน"
              name="salary"
              value={form.salary}
              onChange={handleNum}
              required
            />
          </Row>

          <Row className="mt-5 mb-3">
            <FormInput
              disabled={checkStep}
              label="ที่อยู่ปัจจุบัน"
              name="address"
              value={form.address}
              onChange={handleForm}
              required
            />
            <FormInput
              disabled={checkStep}
              label="ถนน"
              name="street"
              value={form.street}
              onChange={handleForm}
              required
            />
          </Row>

          <Row className="mb-3">
            <Province label="จังหวัด" groupClass="mb-3 col-lg-4" name="province_id" value={form?.province_id} handleForm={handleForm} setForm={setForm} required />
            <District label="อำเภอ/เขต" groupClass="mb-3 col-lg-4" name="district_id" value={form?.district_id} handleForm={handleForm} setForm={setForm} required />
            <SubDistrict label="ตำบล/แขวง" groupClass="mb-3 col-lg-4" name="sub_district_id" value={form?.sub_district_id} handleForm={handleForm} setForm={setForm} required />
          </Row>

          <Row className="mt-5 mb-3">
            <FormInput
              disabled={checkStep}
              label="อีเมล"
              type="email"
              name="email"
              value={form.email}
              onChange={handleForm}
              required
            />
            <FormInput
              disabled={checkStep}
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
              disabled={checkStep}
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
