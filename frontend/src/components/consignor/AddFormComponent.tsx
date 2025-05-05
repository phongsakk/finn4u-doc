"use client";
import { AssetImageModel, AssetModel } from "@models/consignor/AssetModel";
import React, { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { FormImage } from "@components/dev/FormImage";
import axios from "axios";
import { api } from "@utils/api/index";
import { AlertPrimary } from "@components/alert/SwalAlert";
import { LoadPage } from "@components/dev/LoadPage";
import { useRouter } from "next/navigation";
import { FormInput } from "@components/FormCustom/FormInput";
import SubmitButton from "@components/dev/SubmitButton";
import StepButton from "@components/FormCustom/StepButton";

type masterData = {
  province: [];
  asset_type: [];
};

type AddFormType = {
  typeform: "register" | "auth";
  setStep?: (num: number) => void;
  checkStep?: boolean;
};

function AddFormComponent({ typeform, setStep, checkStep }: AddFormType) {
  const NextStep = 6;

  const router = useRouter();

  const [masterData, setMasterData] = useState<masterData>();
  const [form, setForm] = useState(AssetModel);
  const [formImage, setFormImage] = useState(AssetImageModel);
  const [loadingPage, setLoadingPage] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    try {
      const boot = async () => {
        const { data: res_master } = await axios.get(
          api.internal("/api/asset-master")
        );
        if (res_master.status) {
          setMasterData({
            province: res_master.data.province,
            asset_type: res_master.data.asset_type,
          });
        } else {
          AlertPrimary("โหลดข้อมูลไม่สำเร็จ - Please try again!", "error");
        }
      };
      boot();
    } catch (error) {
      AlertPrimary("โหลดข้อมูลไม่สำเร็จ - Please try again!", "error");
    } finally {
      setLoadingPage(false);
    }
  }, []);

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
      const event = e.currentTarget;

      if (!form.land_title_deed_image) {
        AlertPrimary("กรุณาอัพโหลดโฉนดที่ดิน", "error");
        return false;
      }

      if (form.asset_images.length < 3) {
        AlertPrimary("กรุณาอัพโหลดรูปภาพทรัพย์สิน (อย่างน้อย 3 รูป)", "error");
        return false;
      }

      if (event.checkValidity() === false) {
        e.stopPropagation();
        setValidated(true);
        return false;
      }
      const marker = form.locataion?.split(/,|\s+/).filter(Boolean);

      const model = {
        ...form,
        locataion_x:
          marker && (!isNaN(Number(marker[0])) ? Number(marker[0]) : null),
        locataion_y:
          marker && (!isNaN(Number(marker[1])) ? Number(marker[1]) : null),
      };

      const { data: res_asset } = await axios.post(
        api.internal("/api/asset"),
        model,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res_asset.status) {
        AlertPrimary("เพิ่มทรัพย์สินสำเร็จ", "success").then(() => {
          if (typeform === "auth") {
            router.push("/consignor/index");
          } else if (typeform === "register" && setStep) {
            setStep(NextStep);
          }
        });
      } else {
        AlertPrimary("เพิ่มทรัพย์ไม่สินสำเร็จ - Please try again!", "error");
      }
    } catch (error) {
      AlertPrimary("เพิ่มทรัพย์ไม่สินสำเร็จ - Please try again!", "error");
    } finally {
      setSubmit(false);
    }
  };

  return (
    <>
      {!loadingPage ? (
        <div className="container-wrap">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group className="col-lg-6">
                <Form.Label htmlFor="province_id">
                  จังหวัดที่ตั้งทรัพย์สิน
                  <span className="text-require">*</span>
                </Form.Label>
                <Form.Select
                  name="province_id"
                  id="province_id"
                  value={form.province_id}
                  onChange={handleForm}
                  required
                >
                  <option value="">เลือกจังหวัด</option>
                  {masterData?.province?.map((item: any, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="col-lg-6">
                <Form.Label htmlFor="asset_type_id">
                  ประเภททรัพย์สิน<span className="text-require">*</span>
                </Form.Label>
                <Form.Select
                  name="asset_type_id"
                  id="asset_type_id"
                  value={form.asset_type_id}
                  onChange={handleForm}
                  required
                >
                  <option value="">เลือกประเภท</option>
                  {masterData?.asset_type?.map((item: any, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <div className="col-lg-12 text-center mb-2">
              ขนาดพื้นที่ทรัพย์สิน
            </div>
            <Row className="mb-3">
              <FormInput
                groupClass="col-lg-6"
                onChange={handleForm}
                value={form.aria_size_rai}
                label="ไร่"
                placeholder="ไร่"
                name="aria_size_rai"
              />
              <FormInput
                groupClass="col-lg-6"
                onChange={handleForm}
                value={form.aria_size_Ngan}
                label="งาน"
                placeholder="งาน"
                name="aria_size_Ngan"
              />
            </Row>
            <Row className="mb-3">
              <FormInput
                groupClass="col-lg-6"
                onChange={handleForm}
                value={form.aria_size_square_wa}
                label="ตารางวา"
                placeholder="ตารางวา"
                name="aria_size_square_wa"
              />
              <FormInput
                groupClass={`col-lg-6 ${
                  form.asset_type_id !== "7" && "d-none"
                }`}
                onChange={handleForm}
                value={form.aria_size_meter}
                label="ตารางเมตร"
                placeholder="ตารางเมตร"
                name="aria_size_meter"
              />
            </Row>
            <Row className="mb-3">
              <FormInput
                groupClass="col-lg-6"
                onChange={handleForm}
                value={form.land_title_deed_number}
                label="กรุณากรอกหมายเลขโฉนดที่ดิน"
                placeholder="หมายเลขโฉนดที่ดิน"
                name="land_title_deed_number"
                required
              />
              <FormInput
                groupClass="col-lg-6"
                onChange={handleForm}
                value={form.land_plot_number}
                label="กรุณากรอกหมายเลขระวางที่ดิน"
                placeholder="หมายเลขระวางที่ดิน"
                name="land_plot_number"
                required
              />
            </Row>
            <FormImage
              name="land_title_deed_image"
              label="กรุณาอัพโหลดโฉนดที่ดิน"
              onChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  land_title_deed_image: value,
                }));
              }}
              required
            />
            <FormImage
              name="asset_images"
              label="กรุณาอัพโหลดรูปภาพทรัพย์สิน (อย่างน้อย 3 รูป)"
              multiple
              onChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  asset_images: value,
                }));
              }}
              required
            />
            <Row className="mb-3">
              <FormInput
                groupClass="col-lg-6"
                onChange={handleForm}
                value={form.locataion}
                label="Location on Google Maps"
                placeholder="ตัวอย่าง: 13.806xx, 100.5516xxx"
                name="locataion"
                required
              />
            </Row>
            <Row className="mb-3">
              <Form.Group className="col-lg-6 d-flex ">
                <Form.Check
                  label="มีผู้ถือกรรมสิทธิ์มากกว่า 1 คน"
                  name="is_multiple_holder"
                  checked={form.is_multiple_holder}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      is_multiple_holder: e.target.checked,
                    }));
                  }}
                  id="is_multiple_holder"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group className="col-lg-6">
                <Form.Control
                  as="textarea"
                  name="description"
                  value={form.description}
                  onChange={handleForm}
                />
              </Form.Group>
            </Row>
            {typeform === "auth" && <SubmitButton submit={submit} />}
            {typeform === "register" && setStep && (
              <div className="submit-group">
                <Button
                  variant="white"
                  onClick={() => setStep(NextStep - 2)}
                  disabled={submit}
                >
                  ย้อนกลับ
                </Button>
                <StepButton
                  checkStep={checkStep}
                  submit={submit}
                  NextStep={NextStep}
                  setStep={setStep}
                />
              </div>
            )}
          </Form>
        </div>
      ) : (
        <LoadPage />
      )}
    </>
  );
}
export default AddFormComponent;
