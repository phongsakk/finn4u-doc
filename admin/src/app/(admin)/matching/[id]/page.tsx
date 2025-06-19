"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button, FormCheck } from "react-bootstrap";
import axios from "axios";
import { api } from "@utils/api";
import { AlertPrimary } from "@component/alert/SwalAlert";
import { LoadPage } from "@component/dev/LoadPage";
import CheckBox from "@component/dev/CheckBox";
import EvidenceModal from "@component/modals/matching/EvidenceModal";

type winnerType = {
  bidder_id: number,
  asset_bid_offer_id: number
}

const Evidence = {
  show: false,
  id: 0,
}

function page() {
  const { id } = useParams();
  const [loadPage, setLoadPage] = useState(true);
  const [FatchFail, setFatchFail] = useState(false);
  const [Model, setModel] = useState<any>({});
  const [winner, setWinner] = useState<winnerType | undefined>(undefined);
  const [submit, setSubmit] = useState(false);

  const [evidenceModal, setEvidenceModal] = useState(Evidence);
  const OpenEvidence = (Id: number) => {
    setEvidenceModal({ show: true, id: Id })
  }

  const CloseEvidence = () => {
    setEvidenceModal({ show: false, id: 0 })
  }
  useEffect(() => {
    const boot = async () => {
      try {
        const { data: res } = await axios.get(
          api.internal(`/api/matching/${id}`)
        );
        if (res.status) {
          setModel(res.data);
        } else {
          setFatchFail(true);
        }
      } catch (error) {
        setFatchFail(false);
        console.log(error);
      } finally {
        setLoadPage(false);
      }
    };
    boot();
  }, [id]);


  const handleSubmit = async () => {
    try {
      setSubmit(true);
      if (!winner) return AlertPrimary("กรุณาเลือกผู้ชนะ", "error");
      const { data: res } = await axios.post(api.internal(`/api/matching`), {
        asset_id: Model?.asset.id,
        bidder_id: winner?.bidder_id,
        asset_bid_offer_id: winner?.asset_bid_offer_id,
      });
      if (res.status) {
        AlertPrimary("Matching สำเร็จ", "success").then(() => {
          window.location.reload();
        });
      } else {
        AlertPrimary(res?.data?.message, "error");
      }
    } catch (error) {
      AlertPrimary("ไม่สามารถบันทึกข้อมูลได้ - Please try again!", "error");
    } finally {
      setSubmit(false);
    }
  };

  return (
    <>
      {loadPage ? (
        <LoadPage />
      ) : (
        <>
          <EvidenceModal prompt={evidenceModal} Close={CloseEvidence} />
          {FatchFail === true ? (
            <span className="text-danger">ไม่สามารถโหลดข้อมูลได้..</span>
          ) : null}
          <div className="row fw-bold">
            <h3 className="col-auto text-success fw-bold">ทรัพย์สินขายฝาก</h3>
            <h3 className="col-auto px-1 fw-bold">
              เลขที่ฝากขาย {Model?.gen_id}
            </h3>
          </div>
          <table className="table table-hover my-0 mb-5">
            <thead className="table-success">
              <tr>
                <th className="text-center">วันที่ลงขายฝาก</th>
                <th className="text-center">ผู้ขายฝาก</th>
                <th className="text-center">เบอร์โทรศัพท์</th>
                <th className="text-center">จังหวัดที่ตั้งทรัพย์สิน</th>
                <th className="text-center">ประเภททรัพย์สิน</th>
                <th className="text-center">ราคาขายฝากจากการประเมิน</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">{Model?.asset?.date_sell}</td>
                <td className="text-center">{Model?.asset?.consignor_name}</td>
                <td className="text-center">{Model?.asset?.phone_number}</td>
                <td className="text-center">{Model?.asset?.province_name}</td>
                <td className="text-center">{Model?.asset?.asset_type}</td>
                <td className="text-center">
                  {Model?.asset?.collateral_price}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="row fw-bold">
            <h3 className="col-auto text-success fw-bold">
              นักลงทุนที่เหมาะกับพื้นที่ขายฝากนี้
            </h3>
          </div>
          <table className="table table-hover my-0 mb-5 mb-5">
            <thead className="table-success">
              <tr>
                <th></th>
                <th>หมายเลขนักลงทุน</th>
                <th>ชื่อนักลงทุน</th>
                <th className="text-center">เบอร์โทรศัพท์</th>
                <th className="text-center">บริเวณที่ต้องการลงทุน</th>
                <th className="text-center">ประเภททรัพย์สิน</th>
                <th className="text-center">bid</th>
                <th className="text-center">เอกสาร</th>
              </tr>
            </thead>
            <tbody>
              {Model?.bidder_offer?.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="text-center">
                    <CheckWinner item={item} index={index} winner={winner} setWinner={setWinner} />
                  </td>
                  <td>{item.number_consignor}</td>
                  <td>{item.fullname}</td>
                  <td className="text-center">{item.phone_number}</td>
                  <td className="text-center">{item.tag}</td>
                  <td className="text-center">{Model?.asset.asset_type}</td>
                  <td className="text-center">{item?.offer}</td>
                  <td className="text-center user-select-none" onClick={() => OpenEvidence(item.bidder_id)} ><u>ดาวโหลดเอกสาร</u></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center mt-4">
            <Button
              disabled={submit}
              variant="success px-6"
              onClick={handleSubmit}
            >
              MATCHING
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default page;

const CheckWinner = ({ item, index, winner, setWinner }: { item: any, index: number, winner: any, setWinner: React.Dispatch<any> }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!winner) {
      setChecked(item.is_winner)
    } else {
      setChecked(item.id === winner?.asset_bid_offer_id)
    }
  }, [winner])

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWinner({
      bidder_id: item.bidder_id,
      asset_bid_offer_id: item.id,
    })
  }
  return <><FormCheck
    onChange={handleCheck}
    checked={checked}
    name="bidder"
    id={`bidder-${index}`}
    type="radio"
  /></>
}