"use client"
import { FormImage } from '@components/dev/FormImage'
import { selectDistrict, selectProvince } from "@components/helpers";
import { SelectProvince, SelectDistrict } from '@components/dev/SelectMasterData'
import { FormInput } from '@components/FormCustom/FormInput'
import { FormSelectCustom } from '@components/FormCustom/FormSelectCustom'
import { AnnouncementModel } from '@models/AnnouncementModel'
import { api } from '@utils/api/index'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, FormCheck, Row, Spinner } from 'react-bootstrap'
import { AlertPrimary } from '@components/alert/SwalAlert';
import { LoadPage } from '@components/dev/LoadPage';

function page() {
  const [master, setMaster] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(AnnouncementModel)
  const [provinces, setProvinces] = useState<any[]>();
  const [districts, setDistricts] = useState<any[]>();
  const [subDistricts, setSubDistricts] = useState<any[]>();
  const [submit, setSubmit] = useState(false);
  const [validated, setValidated] = useState(false);


  const handleForm = (e: any) => {
    setForm((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const handleNum = (e: any) => {
    const { name, value } = e.target;
    const regex = /^(\d+(\.\d*)?|\.\d+)$/;

    if (regex.test(value) || value === "") {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    const fetchMaster = async () => {
      try {
        setLoading(true)
        const { data: res_master } = await axios.get(api.internal(`/api/announcement/master`))
        if (res_master.status) {
          setMaster(res_master.data)
        } else {
          console.error(res_master)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchMaster()
  }, [])

  SelectProvince({
    form,
    setForm,
    personal: null,
    masterData: master,
    setDistricts,
    setSubDistricts,
    selectProvince,
  });

  SelectDistrict({
    form,
    setForm,
    personal: null,
    masterData: master,
    setSubDistricts,
    selectDistrict,
  });


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmit(true);
      const event = e.currentTarget;

      if (form.images.length < 3) {
        AlertPrimary("กรุณาอัพโหลดรูปภาพ (อย่างน้อย 3 รูป)", "error");
        return false;
      }

      if (event.checkValidity() === false) {
        e.stopPropagation();
        setValidated(true);
        return false;
      }
      const marker = form.google_map_location?.split(/,|\s+/).filter(Boolean);

      const model = {
        ...form,
        locataion_x:
          marker && (!isNaN(Number(marker[0])) ? Number(marker[0]) : null),
        locataion_y:
          marker && (!isNaN(Number(marker[1])) ? Number(marker[1]) : null),
      };

      const { data: res_asset } = await axios.post(
        api.internal("/api/announcement/new"),
        model,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res_asset.status) {
        AlertPrimary("เพิ่มประกาศสินสำเร็จ", "success").then(() => {
            window.location.href = api.internal(`/profile/announcement`)
        });
      } else {
        AlertPrimary("เพิ่มประกาศไม่สินสำเร็จ - Please try again!", "error");
      }
    } catch (error) {
      AlertPrimary("เพิ่มประกาศไม่สินสำเร็จ - Please try again!", "error");
    } finally {
      setSubmit(false);
    }
  }
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="rounded bg-white overflow-hidden">
        <div className="py-3 px-4 text-white bg-primary">ลงประกาศ</div>
        <div className="py-3 px-4">
          {loading ? <LoadPage /> : <>
            <Row className='mb-3'>
              <FormSelectCustom
                groupClass='col-lg-6'
                data={master?.sell_type as []}
                onChange={handleForm}
                name='sell_type_id'
                label='ประเภทประกาศ'
                choose='ประเภทประกาศ'
                value={form?.sell_type_id}
                required
              />
              <FormSelectCustom
                groupClass='col-lg-6'
                data={master?.asset_type as []}
                onChange={handleForm}
                name='asset_type_id'
                label='ประเภทอสังหาฯ'
                choose='ประเภทอสังหาฯ'
                value={form?.asset_type_id}
                required
              />
            </Row>
            <Row className='mb-3'>
              <FormInput groupClass='col-lg-12' label='หัวข้อประกาศ' value={form?.title} name='title' onChange={handleForm} placeholder='โปรดระบุหัวข้อประกาศ' required />
            </Row>
            <Row className='mb-4'>
              <FormInput groupClass='col-lg-12' label='ชื่อโครงการ' value={form?.project_name} name='project_name' onChange={handleForm} placeholder='โปรดระบุชื่อโครงการ' required />
            </Row>
            <label className='mb-3'>ทำเลที่ตั้ง</label>
            <Row className='mb-3'>
              <FormInput groupClass='col-lg-6' label='เลขที่' value={form?.address} name='address' onChange={handleForm} placeholder='เลขที่' required />
              <FormInput groupClass='col-lg-6' label='ถนน' value={form?.street} name='street' onChange={handleForm} placeholder='ถนน' />
            </Row>
            <Row className='mb-3'>
              <FormInput groupClass='col-lg-6' label='ซอย' value={form?.soi} name='soi' onChange={handleForm} placeholder='ซอย' />
              <FormSelectCustom
                groupClass='col-lg-6'
                data={master?.province as []}
                onChange={handleForm}
                name='province_id'
                label='จังหวัด'
                value={form?.province_id}
              />
            </Row>
            <Row className='mb-3'>
              <FormSelectCustom
                groupClass='col-lg-6'
                data={districts as []}
                onChange={handleForm}
                name='district_id'
                label='อำเภอ/เขต'
                value={form?.district_id}
              />
              <FormSelectCustom
                groupClass='col-lg-6'
                data={subDistricts as []}
                onChange={handleForm}
                name='sub_district_id'
                label='ตำบล/แขวง'
                value={form?.sub_district_id}
              />
            </Row>
            <Row className='mb-3'>
              <FormInput groupClass='col-lg-6' label='รหัสไปรษณีย์' value={form?.postal_code} name='postal_code' onChange={handleForm} placeholder='รหัสไปรษณีย์' required />
            </Row>
            <Row className='mb-4'>
              <FormInput groupClass='col-lg-6' label='Location on Google Maps' value={form?.google_map_location} name='google_map_location' onChange={handleForm} placeholder='Location on Google Maps' required />
            </Row>
            <label className='mb-3'>รายละเอียดประกาศ</label>
            <Row className='mb-3'>
              <FormInput groupClass='col-lg-6' label='พื้นที่ใช้สอย (ตารางเมตร)' value={form?.square_meter} name='square_meter' onChange={handleNum} placeholder='พื้นที่ใช้สอย (ตร.ม.)' required />
            </Row>
            <Row className='mb-3'>
              <FormInput groupClass='col-lg-4' label='ห้องนอน' value={form?.bedroom_count} name='bedroom_count' onChange={handleNum} placeholder='จำนวนห้องนอน' required />
              <FormInput groupClass='col-lg-4' label='ห้องน้ำ' value={form?.bathroom_count} name='bathroom_count' onChange={handleNum} placeholder='จำนวนห้องน้ำ' required />
              <FormInput groupClass='col-lg-4' label='ชั้นที่' value={form?.floor_level} name='floor_level' onChange={handleNum} placeholder='ชั้นที่' required />
            </Row>
            <Row className='mb-3'>
              <FormInput groupClass='col-lg-5' label='ราคา' value={form?.price} name='price' onChange={handleNum} placeholder='ราคา (บาท)' required />
            </Row>
            <Row className="mb-3">
              <Form.Group className="col-lg-12">
                <Form.Label>รายละเอียด<span className='text-danger'>*</span></Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={form.description}
                  placeholder='กรุณากรอกรายละเอียด'
                  onChange={handleForm}
                />
              </Form.Group>
            </Row>
            <label className='mb-3'>เพิ่มรูปภาพ <span className='text-danger'>*</span></label>
            <div className='text-secondary'>*กรุณาอัพโหลดรูปภาพ (อย่างน้อย 3 รูป)</div>
            <div className='text-secondary'>*ประเภทไฟล์ที่รองรับ PNG, JPG</div>
            <div className='text-secondary'>*รองรับการอัปโหลดไฟล์ภาพ ขนาดไม่เกิน 7MB</div>
            <FormImage
              name="images"
              className='ms-0'
              multiple
              onChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  images: value,
                }));
              }}
              required
            />

            <label className='mt-3'>รับ Agency ช่วยทำการตลาด</label>
            <p>เราพร้อมช่วยคุณ วางกลยุทธ์ที่เหมาะสมที่สุดในการทำการตลาด ครบทุกความต้องการ ด้วยทีมงานมืออาชีพ</p>
            <Row className='mb-3 checklogin'>
              <div className='form-check'>
                <FormCheck
                  className="group gap-0 gap-ms-1 gap-lg-2 ms-1 ms-md-2 ms-lg-3"
                  value="0"
                  id="0"
                  name="wanted_agency"
                  type="radio"
                  label="ต้องการ Agency"
                />
                <FormCheck
                  className="group gap-0 gap-ms-1 gap-lg-2 ms-1 ms-md-2 ms-lg-3"
                  value="1"
                  id="1"
                  name="wanted_agency"
                  type="radio"
                  label="ไม่ต้องการ"
                />
              </div>
            </Row>
          </>
          }
        </div>
      </div>
      <div className='mt-3 d-flex justify-content-end'>
        <div>
          <Button disabled={loading || submit} type='submit' className='me-2' variant='success'> {submit ? (<><Spinner animation='border' size='sm' className='me-2' />กำลังบันทึกข้อมูล...</>) : "แบบร่าง"} </Button>
          <Button disabled={loading || submit} type='submit' variant='primary'> {submit ? (<><Spinner animation='border' size='sm' className='me-2' />กำลังบันทึกข้อมูล...</>) : "ลงประกาศ"} </Button>
        </div>
      </div>
    </Form>
  )
}

export default page