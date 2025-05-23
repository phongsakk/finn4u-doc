"use client";
import React, { useEffect, useState } from "react";
import { useConsignorModal } from "@components/context/ConsignorContext";
import { Modal } from "react-bootstrap";
import BarChart from "./Chart/BarChart";
import axios from "axios";
import { formatNumber } from "@components/helpers";
import { api } from "@utils/api/index";

function AssetGraph() {
  const { assetGraph } = useConsignorModal();
  const [form, setForm] = useState<any>();
  const [sumResult, setSumResult] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [fetchFail, setFetchFail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: res } = await axios.get(
          api.internal(`/api/consignor/asset/${assetGraph.id}`)
        );
        if (res.status) {
          setForm(res.data);
          setSumResult(form?.price_appraisal * 0.1 * form?.duration);
        } else {
          setFetchFail(true);
        }
      } catch (error) {
        setFetchFail(true);
      } finally {
        setLoading(false);
      }
    };
    if (assetGraph.id) {
      fetchData();
    }
  }, [assetGraph.id]);
  return (
    <Modal
      className="font2 modal-main"
      show={assetGraph.isOpen}
      size="xl"
      onHide={assetGraph.closeModal}
      centered
    >
      <Modal.Header closeButton>
        <h5 className="modal-title font2">การคำนวณดอกเบี้ย</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-lg-4">
            <h4 className="font2">ดอกเบี้ยของคุณ</h4>
            <div className="mb-3">
              <label className="form-label">จำนวนเงินขายฝาก (บาท)</label>
              <input
                type="text"
                className="form-control text-center"
                id="form1"
                aria-describedby="text"
                value={formatNumber(form?.price_appraisal)}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">ระยะเวลาขายฝาก (ปี)</label>
              <input
                type="text"
                className="form-control text-center"
                id="form1"
                aria-describedby="text"
                value={formatNumber(form?.duration)}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">ดอกเบี้ย (บาท/ปี)</label>
              <input
                type="text"
                className="form-control text-center bg-primary color-white"
                id="form1"
                aria-describedby="text"
                value={formatNumber(sumResult)}
                readOnly
              />
            </div>
          </div>
          <div className="col-lg-8">
            <BarChart result={sumResult} />
          </div>
        </div>
        <div className="text-center">
          <small className="text-primary">
            อัตราดอกเบี้ยที่คำนวณได้จะถูกนำไปพิจารณากับเงื่อนไขการขายฝาก
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AssetGraph;
