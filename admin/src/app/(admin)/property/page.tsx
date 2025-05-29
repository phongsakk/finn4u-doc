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
import { Button, FormCheck } from "react-bootstrap";
import { ConsignParam } from "@models/asset";
import ConModal, { PropertyModal } from "./components/ConModal";
import { formatNumber, statusColor, statusText } from "@component/dev/Helpers";
import Pagination from "@component/dev/pagination";
import { LoadPage } from "@component/dev/LoadPage";
import CheckBox from "@component/dev/CheckBox";
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

  const handleRec = async (status: boolean, itemID: number) => {
    if (status) {
      try {
        const { data: res } = await axios.post(api.internal(`/api/asset/${itemID}/recommend`));
      } catch (error) {
        console.error(error)
      }
    }
  }

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
                      <th className="text-center">
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
                      <th className="text-center">แนะนำ</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets?.map((item: any, index) => (
                      <tr key={index}>
                        <td>
                          {item?.created_at}
                        </td>
                        <td>{item?.province}</td>
                        <td>{item?.asset_type}</td>
                        <td>{String(item?.id).padStart(5, "0")}</td>
                        <td className="text-center">{item?.price_appraisal}</td>
                        <td className="text-center">{item?.duration}
                        </td>
                        <td className="text-center">
                          <span
                            className=" fw-bold"
                            style={{ color: statusColor(item.status) }}
                          >
                            {statusText(item.status)}
                          </span>
                        </td>
                        <td className="text-center">
                          {item.status !== 0 && <CheckBox status={item?.recommended_at} itemId={item?.id} handleChange={handleRec} />}
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
