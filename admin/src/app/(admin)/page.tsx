import Image from "next/image";
import grupic1 from "@/assets/img/grupic-1.png"
import grupic2 from "@/assets/img/grupic-2.png"
import grupic3 from "@/assets/img/grupic-3.png"
import Navbar from "@/component/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
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
                      <h3 className="text-primary">26 รายการ</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <a href="consigment.php">
                    <div className="d-flex">
                      <Image src={grupic2} className="" alt="" />
                      <div>
                        <p>พื้นที่ทรัพย์สินคงเหลือในระบบ</p>
                        <h3 className="text-danger">3 รายการ</h3>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-4">
                  <a href="invester.php">
                    <div className="d-flex">
                      <Image src={grupic3} className="" alt="" />
                      <div>
                        <p>ผู้ใช้งานลงทะเบียน</p>
                        <h3 className="text-blue">100 รายการ</h3>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-3 ">
            <div className="col-lg-8">
              <div className="card radius-top">
                <p className="card-title">พื้นที่ขายฝากที่มีคนเข้ามาดูมากที่สุด</p>
                <div className="card-body">
                  <table className="table table-hover my-0">
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th className="d-none d-xl-table-cell text-secondary text-center">ราคาขายฝาก</th>
                        <th className="d-none d-xl-table-cell text-secondary text-center">มูลค่าทรัพย์สิน</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <h3 className="text-green">1</h3>
                        </td>
                        <td>
                          <h3 className="text-green">ดอนเมือง, ปทุมธานี</h3>
                        </td>
                        <td className="d-xl-table-cell text-center">
                          <div className="badge">
                            <span className="badge bg-success">2,500,000</span>
                          </div>
                        </td>
                        <td className="d-xl-table-cell text-center">
                          <span className="badge bg-danger ">5,500,000</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4 className="text-green">2</h4>
                        </td>
                        <td>
                          <h4 className="text-green">บางละมุง, ชลบุรี</h4>
                        </td>
                        <td className="d-xl-table-cell text-center">
                          <div className="badge">
                            <span className="badge bg-success">2,500,000</span>
                          </div>
                        </td>
                        <td className="d-xl-table-cell text-center">
                          <span className="badge bg-danger ">5,500,000</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4 className="text-green">3</h4>
                        </td>
                        <td>
                          <h4 className="text-green">ลาดกระบัง, กรุงเทพฯ</h4>
                        </td>
                        <td className="d-xl-table-cell text-center">
                          <div className="badge">
                            <span className="badge bg-success">2,500,000</span>
                          </div>
                        </td>
                        <td className="d-xl-table-cell text-center">
                          <span className="badge bg-danger ">5,500,000</span>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <p className="card-title">มูลค่าขายฝากกับ Finn4U</p>
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
                  {/* style="display: block; width: 696px; height: 252px;" */}
                  <canvas id="chartjs-dashboard-line" width="696" height="252" style={{ display: "block", width: 696, height: 252 }} className="chartjs-render-monitor"></canvas>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-3 ">
            <div className="col-lg-8">
              <div className="card radius-top">
                <p className="card-title">นักลงทุนที่มีจำนวนเงินลงทุนสูงที่สุด</p>
                <div className="card-body">
                  <table className="table table-hover my-0">
                    <tbody>
                      <tr>
                        <td>
                          <h3 className="text-secondary">1</h3>
                        </td>
                        <td>
                          <h3 className="text-secondary">สมคิด จิตชื่นบาน</h3>
                        </td>
                        <td className="d-xl-table-cell text-end">
                          <div className="badge">
                            <span className="badge badge2">10,000,000+</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4 className="text-secondary">2</h4>
                        </td>
                        <td>
                          <h4 className="text-secondary">สมหมาย ใจดี</h4>
                        </td>
                        <td className="d-xl-table-cell text-end">
                          <div className="badge">
                            <span className="badge badge2">5,000,000-10,000,000</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4 className="text-secondary">3</h4>
                        </td>
                        <td>
                          <h4 className="text-secondary">สมพร มั่นทอง</h4>
                        </td>
                        <td className="d-xl-table-cell text-end">
                          <div className="badge">
                            <span className="badge badge2">1,000,000-5,000,000</span>
                          </div>
                        </td>
                      </tr>


                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <p className="card-title">จำนวนผู้ลงทะเบียนกับ Finn4U</p>
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
                  <canvas
                    id="chartjs-dashboard-line2"
                    width="696"
                    height="252"
                    style={{ display: "block", width: "696px", height: "252px" }}
                    className="chartjs-render-monitor"
                  ></canvas>
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
                <a className="text-muted" href="https://adminkit.io/" target="_blank"><strong>AdminKit</strong></a> &copy;
              </p>
            </div>
            <div className="col-6 text-end">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a className="text-muted" href="https://adminkit.io/" target="_blank">Support</a>
                </li>
                <li className="list-inline-item">
                  <a className="text-muted" href="https://adminkit.io/" target="_blank">Help Center</a>
                </li>
                <li className="list-inline-item">
                  <a className="text-muted" href="https://adminkit.io/" target="_blank">Privacy</a>
                </li>
                <li className="list-inline-item">
                  <a className="text-muted" href="https://adminkit.io/" target="_blank">Terms</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
