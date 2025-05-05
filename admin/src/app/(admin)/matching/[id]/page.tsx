"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button, FormCheck } from "react-bootstrap";
import AlertModal, { AlertType } from "@component/dev/AlertModal";

function page() {
  const [AlertOpen, setAlertOpen] = useState<AlertType>({ open: false });
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <AlertModal
        open={AlertOpen.open}
        close={() => setAlertOpen({ open: false })}
      />

      <div className="card flex-fill px-3 py-3 overflow-x-auto">
        <div className="row fw-bold">
          <h3 className="col-auto text-success fw-bold">ทรัพย์สินขายฝาก</h3>
          <h3 className="col-auto px-1 fw-bold">เลขที่ฝากขาย ASSET202200001</h3>
        </div>
        <table className="table table-hover my-0 mb-5">
          <thead className="table-success">
            <tr>
              <th>วันที่ลงขายฝาก</th>
              <th>ผู้ขายฝาก</th>
              <th>เบอร์โทรศัพท์</th>
              <th>จังหวัดที่ตั้งทรัพย์สิน</th>
              <th>ประเภททรัพย์สิน</th>
              <th>ราคาขายฝากจากการประเมิน</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>07/08/2565</td>
              <td>นายสมคิด จิตชื่นบาน</td>
              <td>080-123-4567</td>
              <td>นครปฐม</td>
              <td>ที่ดินพร้อมสิ่งปลูกสร้าง</td>
              <td>15,000,000</td>
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
              <th className="text-center">จำนวนเงินที่ต้องการลงทุน</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">
                <FormCheck name="test" id="test" />
              </td>
              <td>IN20220007</td>
              <td>นายสมคิด จิตชื่นบาน</td>
              <td className="text-center">080-123-4567</td>
              <td className="text-center">ทั่วประเทศ</td>
              <td className="text-center">ที่ดินพร้อมสิ่งปลูกสร้าง</td>
              <td className="text-center">10,000,000+</td>
            </tr>
          </tbody>
        </table>
        <div className="text-center mt-4">
          <Button
            variant="success px-6"
            onClick={() => setAlertOpen({ open: true })}
          >
            MATCHING
          </Button>
        </div>
      </div>
    </>
  );
}

export default page;
