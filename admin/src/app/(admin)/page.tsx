"use client";
import Image from "next/image";
import grupic1 from "@/public/grupic-1.png";
import grupic2 from "@/public/grupic-2.png";
import grupic3 from "@/public/grupic-3.png";
import Navbar from "@/component/layout/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@utils/api";
import LineChart from "@component/chart/LineChart";

export default function Home() {
  const [form, setForm] = useState<any>();
  const [loadPage, setLoadPage] = useState(true);
  useEffect(() => {
    const boot = async () => {
      try {
        setLoadPage(true);
        const { data: res } = await axios.get(api.internal(`/api/overview`));
        if (res?.status) {
          setForm(res?.data);
        }
      } finally {
        setLoadPage(false);
      }
    };
    boot();
  }, []);
  return (
    <>
      <Navbar
        title="Overview"
        description="Detailed information about  ทุนทันใจ"
      />
      <main className="content">
        <div className="container-fluid p-0">
          <div className="card overview-oa radius-pm">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-4">
                  <div className="d-flex">
                    <Image src={grupic1} className="" alt="" />
                    <div>
                      <p>ขายฝากสำเร็จ</p>
                      <h3 className="text-primary fw-bold">
                        {form?.consignment_total} รายการ
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="d-flex">
                    <Image src={grupic2} className="" alt="" />
                    <div>
                      <p>พื้นที่ทรัพย์สินคงเหลือในระบบ</p>
                      <h3 className="text-danger fw-bold">
                        {form?.stock_total} รายการ
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="d-flex">
                    <Image src={grupic3} className="" alt="" />
                    <div>
                      <p>ผู้ใช้งานลงทะเบียน</p>
                      <h3 className="text-blue fw-bold">
                        {form?.member} รายการ
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-3 ">
            <div className="col-lg-8">
              <div className="card radius-top h-100">
                <p className="card-title">
                  พื้นที่ขายฝากที่มีคนเข้ามาดูมากที่สุด
                </p>
                <div className="card-body">
                  <table className="table table-hover my-0">
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th className="d-none d-xl-table-cell text-secondary text-center">
                          ราคาขายฝาก
                        </th>
                        <th className="d-none d-xl-table-cell text-secondary text-center">
                          มูลค่าทรัพย์สิน
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {form?.most_viewers?.map((item: any, index: number) => (
                        <tr
                          key={index}
                          className={`${index === 0 && "fw-bold h3"}`}
                        >
                          <td className="text-center">
                            <span className="text-green">{index + 1}</span>
                          </td>
                          <td>
                            <span className="text-green">{item?.location}</span>
                          </td>
                          <td className="d-xl-table-cell text-center">
                            <span className="bg-optical-success">
                              {item?.price}
                            </span>
                          </td>
                          <td className="d-xl-table-cell text-center">
                            <span className="bg-optical-danger ">
                              {item?.property_value}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <p className="card-title">มูลค่าขายฝากกับ ทุนทันใจ</p>
              <div className="card-body  py-3">
                <div className="chart chart-sm">
                  <div className="chartjs-size-monitor">
                    <div className="chartjs-size-monitor-expand">
                      <div className=""></div>
                    </div>
                    <div className="chartjs-size-monitor-shrink">
                      <div className=""></div>
                    </div>
                  </div>
                  {form?.consignment_value && (
                    <LineChart set={form?.consignment_value} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-3 ">
            <div className="col-lg-8">
              <div className="card radius-top  h-100">
                <p className="card-title">
                  นักลงทุนที่มีจำนวนเงินลงทุนสูงที่สุด
                </p>
                <div className="card-body">
                  <table className="table table-hover my-0">
                    <tbody>
                      {form?.most_invester?.map((item: any, index: number) => (
                        <tr
                          key={index}
                          className={`${index === 0 && "fw-bold h3"}`}
                        >
                          <td className="text-center">
                            <span className="text-secondary">{index + 1}</span>
                          </td>
                          <td>
                            <span className="text-secondary">
                              {item?.fullname}
                            </span>
                          </td>
                          <td className="d-xl-table-cell text-end">
                            <span className="badge badge2">{item?.amount}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <p className="card-title">จำนวนผู้ลงทะเบียนกับ ทุนทันใจ</p>
              <div className="card-body  py-3">
                <div className="chart chart-sm">
                  {form?.member_value && <LineChart set={form?.member_value} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container-fluid">
          <div className="row text-muted">
            <div className="col-6 text-start">
              <p className="mb-0">
                <a
                  className="text-muted"
                  href="https://adminkit.io/"
                  target="_blank"
                >
                  <strong>AdminKit</strong>
                </a>
                &copy;
              </p>
            </div>
            <div className="col-6 text-end">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a
                    className="text-muted"
                    href="https://adminkit.io/"
                    target="_blank"
                  >
                    Support
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="text-muted"
                    href="https://adminkit.io/"
                    target="_blank"
                  >
                    Help Center
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="text-muted"
                    href="https://adminkit.io/"
                    target="_blank"
                  >
                    Privacy
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="text-muted"
                    href="https://adminkit.io/"
                    target="_blank"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
