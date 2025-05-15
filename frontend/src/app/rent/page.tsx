"use client"
import { FormInput } from "@components/FormCustom/FormInput";
import { FormSelectCustom } from "@components/FormCustom/FormSelectCustom";
import { SellAndRent } from "@components/SellAndRent";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { FaMagnifyingGlass } from "react-icons/fa6";

function page() {
  const [form, setForm] = useState<any>();
  const handleForm = (e: any) => {
    setForm((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  return <>
    <div className="w-100 bg-white pb-5">
      <Form>
        <div className="py-3 shadow mb-5">
          <Row className="justify-content-center px-2 gap-2">
            <FormSelectCustom groupClass="col-lg-2" choose="ประเภทประกาศ" onChange={handleForm} name="status" value={form?.status} />
            <FormSelectCustom groupClass="col-lg-2" choose="ทั้งหมด" onChange={handleForm} name="asset_type" value={form?.asset_type} />
            <FormSelectCustom groupClass="col-lg-2" choose="ช่วงราคา" onChange={handleForm} name="price_range" value={form?.price_range} />
            <FormInput groupClass="col-lg-2 col-10" name="seach" placeholder="ค้นหาด้วยทำเล" className="rounded-pill" onChange={handleForm} value={form?.seach} />
            <div className="col-auto">
              <Button
                variant="outline-secondary"
              >
                <FaMagnifyingGlass size={19} />
              </Button>
            </div>
          </Row>
        </div>
        <div className="container">
          <SellAndRent />
        </div>
      </Form>
    </div>
  </>
}

export default page;
