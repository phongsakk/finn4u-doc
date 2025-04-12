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
import { regis_personal } from "@models/register/consignor";
import { AlertPrimary } from "@components/alert/SwalAlert";

type masterData = {
  prefix: [];
  province: [];
  district: [];
  subDistrict: [];
};

function PersonalForm({
  personal,
  setPersonal,
  setStep,
}: {
  personal: regis_personal | undefined;
  setPersonal: (regis_persona: regis_personal) => void;
  setStep: (num: number) => void;
}) {
  const [prefix_id, setPrefixId] = useState<number>(1);
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLanstname] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [online_range, setOnlineRange] = useState<string>("");
  const [career_id, setCareerId] = useState<number>(1);
  const [salary, setSalary] = useState<string>("");
  const [addressNum, setAddressNum] = useState<string>("");
  const [streetNum, setStreetNum] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm_password, setConfirmPassword] = useState<string>("");

  const [masterData, setMasterData] = useState<masterData>();
  const [provinces, setProvinces] = useState<any[]>();
  const [province_id, setProvinceId] = useState<string>();

  const [districts, setDistricts] = useState<any[]>();
  const [district_id, setDistrictId] = useState<string>();

  const [subDistricts, setSubDistricts] = useState<any[]>();
  const [subDistrict_id, setSubDistrictId] = useState<string>();
  const [submit, setSubmit] = useState<boolean>(false);

  const handlePro = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectProvince(
      e.target.value,
      setProvinceId,
      setDistricts,
      masterData?.district || []
    );
    setDistrictId("");
    setSubDistrictId("");
    setSubDistricts([]);
  };
  const handleDis = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectDistrict(
      e.target.value,
      setDistrictId,
      setSubDistricts,
      masterData?.subDistrict || []
    );
    setSubDistrictId("");
  };

  useEffect(() => {
    const boot = async () => {
      try {
        const { data: res_masterdata } = await axios.get(
          api.internal("/api/address_master")
        );

        setMasterData(res_masterdata);
        setProvinces(res_masterdata.province);
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
      const model = {
        email: email,
        password: password,
        confirm_password: confirm_password,
        user_prefix_id: prefix_id,
        firstname: firstname,
        lastname: lastname,
        phone_number: phoneNo,
        online_range: online_range,
        career_id: career_id,
        address_number: addressNum,
        street_number: streetNum,
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
        };
        setPersonal(PersonalModel);
        AlertPrimary("บันทึกข้อมูลสำเร็จ", "success").then(() => {
          setStep(2);
        });
      } else {
        AlertPrimary("ไม่สามารถบันทึกข้อมูลได้", "error");
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
              value={prefix_id}
              onChange={(e) => setPrefixId(Number(e.target.value))}
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
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
              type="text"
              className="form-control font2"
              id="firstname"
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
              onChange={(e) => setLanstname(e.target.value)}
              value={lastname}
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
              onChange={(e) => {
                if (e.target.value.length <= 10) {
                  setPhoneNo(e.target.value);
                }
              }}
              value={phoneNo}
              type="text"
              className="form-control font2"
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
              onChange={(e) => setOnlineRange(e.target.value)}
              value={online_range}
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
              onChange={(e) => setCareerId(Number(e.target.value))}
              name="career"
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
              onChange={(e) => handleNumberChange(e, setSalary)}
              value={salary}
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
              onChange={(e) => setAddressNum(e.target.value)}
              value={addressNum}
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
              onChange={(e) => setStreetNum(e.target.value)}
              value={streetNum}
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
              value={province_id}
              onChange={(e) => handlePro(e)}
              name="province"
              id="province"
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
              value={district_id}
              onChange={(e) => handleDis(e)}
              name="district"
              id="district"
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
              value={subDistrict_id}
              onChange={(e) => setSubDistrictId(e.target.value)}
              name="sub-district"
              id="sub-district"
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setConfirmPassword(e.target.value)}
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
        {!personal ? (
          <Button variant="primary" type="submit" disabled={submit}>
            {submit ? (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                กำลังตรวจสอบข้อมูล
              </>
            ) : (
              "ถัดไป"
            )}
          </Button>
        ) : (
          <Button variant="primary" onClick={() => setStep(2)}>
            ถัดไป
          </Button>
        )}
      </div>
    </form>
  );
}

export default PersonalForm;
