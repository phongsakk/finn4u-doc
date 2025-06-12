"use client";
import FinanceModal from "@component/modals/finance/FinanceModal";
import { financeType } from "@models/finance";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ImHome3 } from "react-icons/im";
import { RiInformationFill } from "react-icons/ri";

function page() {
  const [modal, setModal] = useState<financeType>({ id: 0, show: false });
  const OpenModal = (num: number) => {
    setModal({ id: num, show: true });
  };

  const CloseModal = () => {
    setModal({ id: 0, show: false });
  };
  return (
    <>
      <FinanceModal model={modal} CloseModel={CloseModal} />
      <table>
        <thead>
          <tr className="fw-bold border-bottom">
            <th className="text-center py-2">เลขที่ฝากขาย</th>
            <th className="text-center py-2">หมายเลขผู้ขายฝาก</th>
            <th className="text-center py-2">หมายเลขนักลงทุน</th>
            <th className="text-center py-2">วันที่ขายฝาก</th>
            <th className="text-center py-2">วันที่สิ้นสุด การขายฝาก</th>
            <th className="text-center py-2">ระยะเวลาขายฝาก</th>
            <th className="text-center py-2"></th>
            <th className="text-center py-2">สถานะ</th>
            <th className="text-center py-2"></th>
            <th className="text-center py-2"></th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr className="border-bottom" key={index}>
              <td className="text-center py-2">0000102</td>
              <td className="text-center py-2">SE20220007</td>
              <td className="text-center py-2">IN20220007</td>
              <td className="text-center py-2">20/05/2022</td>
              <td className="text-center py-2">20/05/2023</td>
              <td className="text-center py-2">1</td>
              <td className="text-center py-2">1,365,900</td>
              <td className="text-center py-2">ขายฝากสำเร็จ</td>
              <td className="text-center py-2 ">
                <Button
                  variant="light"
                  className="text-success"
                  onClick={() => OpenModal(index + 1)}
                >
                  <ImHome3 size={15} />
                </Button>
              </td>
              <td className="text-center py-2">
                <Link href="/setting/finance/document"  className="btn btn-light text-success">
                  <RiInformationFill size={15} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default page;
