"use client";
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
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <div className="w-100 pb-5 bg-light">
        <Form>
          <div className="py-3 shadow mb-5 bg-white">
            <Row className="justify-content-center mx-0">
              <FormSelectCustom
                groupClass="mb-3 col-8 col-sm-4 col-md-3 col-lg-2"
                choose="ประเภทประกาศ"
                onChange={handleForm}
                name="status"
                value={form?.status}
              />
              <FormSelectCustom
                groupClass="mb-3 col-8 col-sm-4 col-md-3 col-lg-2"
                choose="ทั้งหมด"
                onChange={handleForm}
                name="asset_type"
                value={form?.asset_type}
              />
              <FormSelectCustom
                groupClass="mb-3 col-8 col-sm-4 col-md-3 col-lg-2"
                choose="ช่วงราคา"
                onChange={handleForm}
                name="price_range"
                value={form?.price_range}
              />
              <Form.Group className="row col-8 col-sm-6 col-md-4 col-lg-4 col-10 justify-content-center justify-content-lg-start">
                <div className="col-7 col-sm-9 col-md-9 col-lg-6">
                  <Form.Control
                  className="rounded-pill"
                    onChange={handleForm}
                    placeholder="ค้นหาด้วยทำเล"
                    name="seach"
                    value={form?.seach}
                  />
                </div>
                <div className="col-3 px-2">
                  <Button className="" variant="outline-secondary">
                    <FaMagnifyingGlass size={19} />
                  </Button>
                </div>
              </Form.Group>
            </Row>
          </div>
          <div className="container">
            <SellAndRent />
          </div>
        </Form>
      </div>
    </>
  );
}

export default page;
