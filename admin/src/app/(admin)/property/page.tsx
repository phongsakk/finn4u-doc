"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import InfoImage from "@/assets/img/info.svg";
import EditImage from "@/assets/img/edit.svg";
import Link from "next/link";
import Navbar from "@component/layout/Navbar";
import axios from "axios";
import { api } from "@utils/api";
import { Button } from "react-bootstrap";
import { ConsignParam } from "@models/asset";
import ConModal from "./ConModal";
import { formatNumber, statusColor, statusText } from "@component/dev/Helpers";
dayjs.locale("th");
const PropertyPage = () => {
  const [assets, setAssets] = useState([]);
  const [consignModal, setConModal] = useState<ConsignParam>({
    id: 0,
    status: false,
  });

  const ConModalClose = () => {
    setConModal({ id: 0, status: false });
  };

  useEffect(() => {
    const boot = async () => {
      try {
        const {
          data: { data: ass_res },
        } = await axios.get(api.internal("/api/asset"));

        if (ass_res) {
          setAssets(ass_res || []);
        }
      } catch (error) {
        console.error("api assets error!");
        setAssets([]);
      }
    };
    boot();
  }, []);

  return (
    <>
      <Navbar title="ทรัพย์สินขายฝาก" />
      {consignModal.id !== 0 && (
        <ConModal consignModal={consignModal} ConModalClose={ConModalClose} />
      )}

      <main className="content">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            เรียงตาม
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link className="dropdown-item" href="#">
                Action
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                Another action
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                Something else here
              </Link>
            </li>
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
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        ที่ตั้งทรัพย์สิน
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <Link className="dropdown-item" href="#">
                            ทั่วประเทศ
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            กรุงเทพฯและปริมณฑล
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            ภาคกลาง
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            ภาคเหนือ
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            ภาคอีสาน
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            ภาคใต้
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            ภาคตะวันออก
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </th>
                  <th>
                    <div className="dropdown drop-2">
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        ประเภททรัพย์สิน
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <Link className="dropdown-item" href="#">
                            ทั่วประเทศ
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            กรุงเทพฯและปริมณฑล
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            ภาคกลาง
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            ภาคเหนือ
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            ภาคอีสาน
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            ภาคใต้
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            ภาคตะวันออก
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </th>
                  <th>เลขที่ฝากขาย</th>
                  <th>ราคาขายฝาก</th>
                  <th>
                    <div className="dropdown drop-2">
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        ระยะเวลาขายฝาก
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <Link className="dropdown-item" href="#">
                            รอยืนยันตัวตน
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            ยืนยันตัวตนแล้ว
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </th>
                  <th>
                    <div className="dropdown drop-2">
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        สถานะ
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <Link className="dropdown-item" href="#">
                            รอยืนยันตัวตน
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            ยืนยันตัวตนแล้ว
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {assets.map((item: any, index) => (
                  <tr key={index}>
                    <td>
                      {dayjs(item.created_at).format("DD/MM/YYYY HH:mm:ss")}
                    </td>
                    <td>{item.province ? item.province.name : "-"}</td>
                    <td>{item.asset_type ? item.asset_type.name : "-"}</td>
                    <td>{String(item.id).padStart(5, "0")}</td>
                    <td className="text-center">
                      {formatNumber(item?.asset_appraisal?.price_appraisal)}
                    </td>
                    <td className="text-center">
                      {item?.asset_appraisal
                        ? item.asset_appraisal.duration + " ปี"
                        : "-"}
                    </td>
                    <td className="text-center">
                      <span
                        className=" fw-bold"
                        style={{ color: statusColor(item.status) }}
                      >
                        {statusText(item.status)}
                      </span>
                    </td>
                    <td>
                      <Button
                        onClick={(e) => e.preventDefault()}
                        className="btn btn-see"
                        variant="outline-success"
                        disabled
                      >
                        <Image src={InfoImage} alt="" />
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={() =>
                          setConModal({ id: item.id, status: true })
                        }
                        className="btn btn-see"
                        variant="outline-success"
                      >
                        <Image src={EditImage} className="" alt="" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item">
                  <Link className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" href="#">
                    1
                  </Link>
                </li>
                <li className="page-item active" aria-current="page">
                  <Link className="page-link" href="#">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" href="#">
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </Link>
                </li>
              </ul>
            </nav> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default PropertyPage;
