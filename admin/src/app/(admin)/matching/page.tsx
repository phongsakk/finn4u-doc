import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";
import { MdPersonSearch } from "react-icons/md";

const matching = () => {
  return (
    <>
      <div className="card flex-fill px-3 py-3">
        <table className="table table-hover my-0">
          <thead className="table-success">
            <tr>
              <th>วันที่ลงขายฝาก</th>
              <th>เลขที่ฝากขาย</th>
              <th>ผู้ขายฝาก</th>
              <th>เบอร์โทรศัพท์</th>
              <th>จังหวัดที่ตั้งทรัพย์สิน</th>
              <th>ประเภททรัพย์สิน</th>
              <th>ราคาขายฝาก</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>07/08/2565</td>
              <td>ASSET202200001</td>
              <td>นายสมคิด จิตชื่นบาน</td>
              <td>080-123-4567</td>
              <td>นครปฐม</td>
              <td>ที่ดินพร้อมสิ่งปลูกสร้าง</td>
              <td>15,000,000</td>
              <td>
                <Link
                  href={`/matching/1`}
                  role="button"
                  className="btn btn-light text-success"
                >
                  <MdPersonSearch />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default matching;
