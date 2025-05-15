"use client"
import { AlertPrimary } from "@component/alert/SwalAlert";
import { FormInput } from "@component/FormCustom/FormInput";
import { FormSelectCustom } from "@component/FormCustom/FormSelectCustom";
import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";

const page = () => {
    const [form, setForm] = useState<any>();
    const [validated, setValidated] = useState(false);
    const [submit, setSubmit] = useState(false);
    const handleForm = (e: any) => {
        setForm((prev: any) => ({
            ...prev,
            [e.target.value]: e.target.value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setSubmit(true)
            const event = e.currentTarget;
            if (event.checkValidity() === false) {
                e.stopPropagation();
                setValidated(true);
                return false;
            }
            AlertPrimary("บันทึกข้อมูลสำเร็จ", "success").then(() => {
                window.location.reload()
            })
        } catch (error) {
            AlertPrimary("บันทึกข้อมูลไม่สำเร็จ - Please try again","error")
        } finally {
            setSubmit(false)
        }

    }

    return <>
        <Form  noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <FormSelectCustom data={[]} onChange={handleForm} label="คำนำหน้า" placeholder="คำนำหน้า" value={form?.user_prefix_id} name="user_prefix_id" required />
                <FormInput value={form?.firstname} name="firstname" onChange={handleForm} label="ชื่อ" placeholder="ชื่อ" required />
                <FormInput value={form?.lastname} name="lastname" onChange={handleForm} label="นามสกุล" placeholder="นามสกุล" required />
            </Row>
            <Row className="mb-5">
                <FormInput value={form?.phone_number} name="phone_number" onChange={handleForm} label="เบอร์โทรศัพท์" placeholder="เบอร์โทรศัพท์" required />
                <FormSelectCustom data={[]} onChange={handleForm} label="เวลาที่สะดวกให้ติดต่อกลับ" placeholder="เวลาที่สะดวกให้ติดต่อกลับ" value={form?.online_range} name="online_range" required />
            </Row>
            <Row className="mb-5">
                <FormSelectCustom data={[]} onChange={handleForm} label="อาชีพ" placeholder="อาชีพ" value={form?.career_id} name="career_id" required />
                <FormInput value={form?.salary} name="salary" onChange={handleForm} label="รายได้ต่อเดือน" placeholder="รายได้ต่อเดือน" required />
            </Row>
            <Row className="mb-3">
                <FormInput value={form?.address} name="address" onChange={handleForm} label="ที่อยู่ปัจจุบัน" placeholder="เลขที่บ้าน" required />
                <FormInput value={form?.street_number} name="street_number" onChange={handleForm} label="ถนน" placeholder="ถนน" required />
            </Row>
            <Row className="mb-5">
                <FormSelectCustom data={[]} onChange={handleForm} label="จังหวัด" placeholder="จังหวัด" value={form?.province_id} name="province_id" required />
                <FormSelectCustom data={[]} onChange={handleForm} label="อำเภอ/เขต" placeholder="อำเภอ/เขต" value={form?.district_id} name="district_id" required />
                <FormSelectCustom data={[]} onChange={handleForm} label="ตำบล/แขวง" placeholder="ตำบล/แขวง" value={form?.sub_district_id} name="sub_district_id" required />
            </Row>
            <Row className="mb-3">
                <FormInput value={form?.email} name="email" onChange={handleForm} label="อีเมล" placeholder="อีเมล" required />
                <FormInput value={form?.password} name="password" type="password" onChange={handleForm} label="รหัสผ่าน" placeholder="รหัสผ่าน" required />
                <FormInput value={form?.confirm_password} name="confirm_password" type="password" onChange={handleForm} label="ยืนยันรหัสผ่าน" placeholder="ยืนยันรหัสผ่าน" required />
            </Row>
            <div className="d-flex w-100 justify-content-center">
                <Button type="submit" variant="success" disabled={submit} className="px-6">{submit ? "กำลังบันทึกข้อมูล..." : "บันทึก"}</Button>
            </div>
        </Form>
    </>
}
export default page;