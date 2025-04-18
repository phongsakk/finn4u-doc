"use client";
import {
  handleNumberChange,
  selectDistrict,
  selectProvince,
} from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, FormSelect, Spinner } from "react-bootstrap";
import { formRegisterCon, regis_personal, ConsignorSchema } from "@models/register/consignor";
import { AlertPrimary } from "@components/alert/SwalAlert";
import StepButton from "./button/StepButton";

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
}

function PersonalForm({
  setPersonal,
  setStep,
  checkStep,
}: {
  setPersonal: (regis_persona: regis_personal) => void;
  setStep: (num: number) => void;
  checkStep: boolean;
}) {
  const NextStep = 1;
  const [form, setForm] = useState(formRegisterCon);
  const [masterData, setMasterData] = useState<masterData>();
  const [provinces, setProvinces] = useState<any[]>();
  const [districts, setDistricts] = useState<any[]>();
  const [subDistricts, setSubDistricts] = useState<any[]>();
  const [submit, setSubmit] = useState<boolean>(false);

  const handleForm = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handlePro = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectProvince(
      e.target.value,
      setDistricts,
      masterData?.district || []
    );
    setForm({ ...form, province_id: e.target.value, district_id: "", sub_district_id: "" })
    setSubDistricts([]);
  };

  const handleDis = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectDistrict(
      e.target.value,
      setSubDistricts,
      masterData?.subDistrict || []
    );
    setForm({ ...form, district_id: e.target.value, sub_district_id: "" })
  };

  useEffect(() => {
    const boot = async () => {
      try {
        const master = await fetchMaster();
        setMasterData(master);
        setProvinces(master.province);
      } catch (error) {
        console.error(error);
      }
    };
    boot();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);
    try {
      const result = ConsignorSchema.safeParse(form);
      console.log(form)
      if (result.success) {
        const { data: res } = await axios.post(
          api.internal("/api/register/consignment"),
          form
        );
        if (res.status) {
          var PersonalModel = {
            UserID: res.data.user.id,
            Phone: res.data.user.PhoneNumber,
            Email: res.data.user.email,
            Ref: res.data.ref,
          };
          setPersonal(PersonalModel);
          AlertPrimary("บันทึกข้อมูลสำเร็จ", "success").then(() => {
            setStep(NextStep);
          });
        } else {
          AlertPrimary("ไม่สามารถบันทึกข้อมูลได้", "error");
        }
      } else {
        console.log(result.error.flatten())
      }
    } catch (error) {
      AlertPrimary("ไม่สามารถบันทึกข้อมูลได้", "error");
      console.error(error);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row mb-3">
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label font2" htmlFor="prefix">
              คำนำหน้า<span className="text-require font2">*</span>
            </label>
            <FormSelect
              value={form.prefix_id}
              onChange={handleForm}
              id="prefix"
              name="prefix_id"
              required
            >
              {masterData?.prefix.map((x: any, index) => (
                <option value={x.id} key={index}>
                  {x.name}
                </option>
              ))}
            </FormSelect>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label font2" htmlFor="firstname">
              ชื่อ<span className="text-require font2">*</span>
            </label>
            <input
              onChange={handleForm}
              value={form.firstname}
              type="text"
              className="form-control font2"
              id="firstname"
              name="firstname"
              aria-describedby="text"
              required
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label font2" htmlFor="lastname">
              นามสกุล<span className="text-require font2">*</span>
            </label>
            <input
              onChange={handleForm}
              value={form.lastname}
              type="text"
              className="form-control font2"
              name="lastname"
              id="lastname"
              aria-describedby="text"
              required
            />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label font2" htmlFor="phone_number">
              เบอร์โทรศัพท์<span className="text-require font2">*</span>
            </label>
            <input
              onChange={handleForm}
              value={form.phone_number}
              type="text"
              className="form-control font2"
              name="phone_number"
              id="phone_number"
              aria-describedby="text"
              required
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label font2" htmlFor="online_range">
              เวลาที่สะดวกให้ติดต่อกลับ
              <span className="text-require font2">*</span>
            </label>
            <input
              onChange={handleForm}
              value={form.online_range}
              name="online_range"
              type="text"
              className="form-control font2"
              required
            />
          </div>
        </div>
      </div>

      <div className="row mt-5 mb-3">
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
              <option value={1}>พนักงาน</option>
            </FormSelect>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label font2">
              รายได้ต่อเดือน<span className="text-require font2">*</span>
            </label>
            <input
              onChange={handleForm}
              value={form.salary}
              type="text"
              className="form-control font2"
              id="salary"
              name="salary"
              required
            />
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label font2" htmlFor="address">
              ที่อยู่ปัจจุบัน<span className="text-require font2">*</span>
            </label>
            <input
              onChange={handleForm}
              value={form.address}
              type="text"
              className="form-control font2"
              id="address"
              name="address"
              required
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label font2">
              ถนน<span className="text-require font2">*</span>
            </label>
            <input
              onChange={handleForm}
              value={form.street}
              type="text"
              className="form-control font2"
              id="street"
              name="street"
              required
            />
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label font2" htmlFor="province">
              จังหวัด<span className="text-require font2">*</span>
            </label>
            <FormSelect
              value={form.province_id}
              onChange={(e) => handlePro(e)}
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
              onChange={(e) => handleDis(e)}
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
      </div>

      <div className="row mt-5 mb-3">
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label font2" htmlFor="email">
              อีเมล<span className="text-require font2">*</span>
            </label>
            <input
              onChange={handleForm}
              value={form.email}
              type="email"
              className="form-control font2"
              id="email"
              name="email"
              required
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label font2" htmlFor="password">
              รหัสผ่าน<span className="text-require font2">*</span>
            </label>
            <input
              onChange={handleForm}
              value={form.password}
              type="password"
              placeholder="ต้องไม่ต่ำกว่า 9 ตัวอักษร"
              className="form-control font2"
              id="password"
              name="password"
              aria-describedby="text"
              required
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label font2" htmlFor="confirm_password">
              ยืนยันรหัสผ่าน<span className="text-require font2">*</span>
            </label>
            <input
              onChange={handleForm}
              value={form.confirm_password}
              type="password"
              placeholder="ต้องไม่ต่ำกว่า 9 ตัวอักษร"
              className="form-control font2"
              id="confirm_password"
              name="confirm_password"
              aria-describedby="text"
              required
            />
          </div>
        </div>
      </div>
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
    </form>
  );
}

export default PersonalForm;


const FormInput = ({ value = "", type = " text", name = "", id = "", className = "form-control font2", required = false }) => {
  return (
    <>
      <label className="form-label font2" htmlFor={id}>
        รหัสผ่าน {required && <span className="text-require font2">*</span>}
      </label>
      <input value={value} type={type} name={name} id={id} className={className} required={required} />
    </>
  )

}