"use client";
import CheckRadio from "@component/FormCustom/CheckRadio";
import { FormInput } from "@component/FormCustom/FormInput";
import { FaqContentType, FaqForm } from "@models/faq";
import { api } from "@utils/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";

const FormStatus = [
  { label: "สาธารณะ", value: true },
  { label: "ปิดการมองเห็น", value: false },
];

function FAQModal({ faqModal, CloseFAQ }: FaqContentType) {
  const [form, setForm] = useState(FaqForm);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const boot = async (path: string) => {
      try {
        setLoading(true);
        const { data: res } = await axios.get(api.internal(path));
        if (res.status) {
        //   setForm(res?.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (faqModal.id !== 0) {
      console.log(faqModal.id);
      const path = `/api/faq/${faqModal.id}`;
      setUrl(path);
      boot(path);
    } else {
      setForm(FaqForm);
      setUrl(url);
    }
  }, [faqModal.id]);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal centered show={faqModal.show} onHide={CloseFAQ} className="rounded">
      <Modal.Body>
        <div className="text-end">
          <Button variant="close" onClick={CloseFAQ}></Button>
        </div>
        <Form>
          <Row>
            <FormInput
              value={form?.ask}
              name="ask"
              label="คำถาม"
              labelClass="h3 mb-3"
              groupClass="col-12 mb-3"
              placeholder="คำถาม"
              onChange={handleForm}
            />

            <Form.Group className="col-12">
              <Form.Label className="h3 my-3">คำตอบ</Form.Label>
              <Form.Control
                as="textarea"
                name="answer"
                value={form?.answer}
                onChange={handleForm}
                placeholder="คำตอบ"
              />
            </Form.Group>
            <h3 className="my-3">การมองเห็นโพสต์</h3>
            <CheckRadio
              clasNane="d-flex gap-2"
              name="status"
              value={form?.status}
              data={FormStatus}
              setForm={setForm}
            />
          </Row>
          <div className="d-flex justify-content-center gap-2 my-3">
            <Button variant="success">บันทึก</Button>
            <Button variant="light" onClick={CloseFAQ}>ยกเลิก</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default FAQModal;
