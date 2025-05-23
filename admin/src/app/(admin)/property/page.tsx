"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import InfoImage from "@/public/info.svg";
import EditImage from "@/public/edit.svg";
import Link from "next/link";
import Navbar from "@component/layout/Navbar";
import axios from "axios";
import { api } from "@utils/api";
import { Button } from "react-bootstrap";
import { ConsignParam } from "@models/asset";
import ConModal, { PropertyModal } from "./components/ConModal";
import { formatNumber, statusColor, statusText } from "@component/dev/Helpers";
import Pagination from "@component/dev/pagination";
import { LoadPage } from "@component/dev/LoadPage";
dayjs.locale("th");
const PropertyPage = () => {
  const [assets, setAssets] = useState([]);
  const [consignModal, setConModal] = useState<PropertyModal>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({
    page: 1,
    total: 1,
  });
  const changePage = (num: number) => {
    setPage((prev) => ({ ...prev, page: num }));
  };

  const handleConOpen = (pro_id: number) => {
    setConModal({ id: pro_id, open: true });
  };

  useEffect(() => {
    const boot = async () => {
      try {
        setLoading(true)
        const { data: res } = await axios.get(api.internal("/api/asset"), { params: { page: page.page } });

        if (res.status) {
          setAssets(res.data || []);
          setPage({ page: res.page, total: res.total })
        }
      } catch (error) {
        console.error("api assets error!");
      } finally {
        setLoading(false)
      }
    };
    boot();
  }, [page.page]);

  return (
    <>
      <Navbar title="ทรัพย์สินขายฝาก" />
      {consignModal !== undefined && consignModal.id !== undefined && (
        <ConModal
          id={consignModal.id}
          open={consignModal.open}
          close={() => setConModal({ open: false })}
        />
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
            {loading ? <LoadPage /> :
              <>
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
                    {assets?.map((item: any, index) => (
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
                            onClick={() => handleConOpen(item.id)}
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
                <Pagination Page={page} change={changePage} />
              </>
            }


          </div>
        </div>
      </main>
    </>
  );
};

export default PropertyPage;
