import Image from 'next/image'
import React from 'react'

import InfoImage from "@/assets/img/info.svg"
import EditImage from "@/assets/img/edit.svg"
import Link from 'next/link'
import Navbar from '@component/layout/Navbar'
import axios from 'axios'
import { api } from '@utils/api'

const matching = async () => {
  const response = await axios.get(api.internal("api/asset"))
  /// add more logic
  return (
    <>
      <Navbar />

      <main className="content">
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            เรียงตาม
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><Link className="dropdown-item" href="#">Action</Link></li>
            <li><Link className="dropdown-item" href="#">Another action</Link></li>
            <li><Link className="dropdown-item" href="#">Something else here</Link></li>
          </ul>
        </div>

        <div className="container-fluid p-0">
          <div className="card flex-fill px-3 py-3">
            <table className="table table-hover my-0">
              <thead className="table-success">
                <tr>
                  <th className="text-bold">วัน/เดือน/ปี</th>
                  <th>
                    <div className="dropdown drop-2">
                      <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        ที่ตั้งทรัพย์สิน
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link className="dropdown-item" href="#">ทั่วประเทศ</Link></li>
                        <li><Link className="dropdown-item" href="#">กรุงเทพฯและปริมณฑล</Link></li>
                        <li><Link className="dropdown-item" href="#">ภาคกลาง</Link></li>
                        <li><Link className="dropdown-item" href="#">ภาคเหนือ</Link></li>
                        <li><Link className="dropdown-item" href="#">ภาคอีสาน</Link></li>
                        <li><Link className="dropdown-item" href="#">ภาคใต้</Link></li>
                        <li><Link className="dropdown-item" href="#">ภาคตะวันออก</Link></li>
                      </ul>
                    </div>
                  </th>
                  <th>
                    <div className="dropdown drop-2">
                      <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        ประเภททรัพย์สิน
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link className="dropdown-item" href="#">ทั่วประเทศ</Link></li>
                        <li><Link className="dropdown-item" href="#">กรุงเทพฯและปริมณฑล</Link></li>
                        <li><Link className="dropdown-item" href="#">ภาคกลาง</Link></li>
                        <li><Link className="dropdown-item" href="#">ภาคเหนือ</Link></li>
                        <li><Link className="dropdown-item" href="#">ภาคอีสาน</Link></li>
                        <li><Link className="dropdown-item" href="#">ภาคใต้</Link></li>
                        <li><Link className="dropdown-item" href="#">ภาคตะวันออก</Link></li>
                      </ul>
                    </div>
                  </th>
                  <th>เลขที่ฝากขาย</th>
                  <th>ราคาขายฝาก</th>
                  <th>
                    <div className="dropdown drop-2">
                      <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        ระยะเวลาขายฝาก
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link className="dropdown-item" href="#">รอยืนยันตัวตน</Link></li>
                        <li><Link className="dropdown-item" href="#">ยืนยันตัวตนแล้ว</Link></li>
                      </ul>
                    </div>
                  </th>
                  <th>
                    <div className="dropdown drop-2">
                      <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        สถานะ
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link className="dropdown-item" href="#">รอยืนยันตัวตน</Link></li>
                        <li><Link className="dropdown-item" href="#">ยืนยันตัวตนแล้ว</Link></li>
                      </ul>
                    </div>
                  </th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {["", "", ""].map((data, index) => (
                  <tr key={index}>
                    <td>16/10/2022 15:33:47</td>
                    <td>กรุงเทพฯ</td>
                    <td>คอนโด</td>
                    <td>0000101</td>
                    <td>800000</td>
                    <td>3 ปี</td>
                    <td><span className="text-success">ขายฝากแล้ว</span></td>
                    <td>
                      <button className="btn btn-see">
                        <Image src={InfoImage} className="" alt="" />
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-see">
                        <Image src={EditImage} className="" alt="" />
                      </button>
                    </td>

                  </tr>

                ))}
              </tbody>
            </table>
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item">
                  <Link className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </Link>
                </li>
                <li className="page-item"><Link className="page-link" href="#">1</Link></li>
                <li className="page-item active" aria-current="page">
                  <Link className="page-link" href="#">2</Link>
                </li>
                <li className="page-item"><Link className="page-link" href="#">3</Link></li>
                <li className="page-item">
                  <Link className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

        </div>
      </main>
    </>
  )
}

export default matching