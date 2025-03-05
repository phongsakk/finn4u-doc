"use client";
import CustomImage from "@components/CustomImage";
import { api } from "@utils/api/index";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { redirect } from "next/navigation";

function AddForm() {
  const [province, setProvince] = useState([]);
  const [province_id, setProvince_id] = useState<number>();
  const [asset_type, setAsset_type] = useState([]);
  const [asset_type_id, setAsset_type_id] = useState<number>();
  const [rai, setRai] = useState<number>();
  const [ngan, setNgan] = useState<number>();
  const [square_wa, setSquare_wa] = useState<number>();
  const [landNumber, setLandNumber] = useState<string>();
  const [landplotNumber, setLandplotNumber] = useState<string>();
  const [locataion, setLocation] = useState<string>();
  const [mto_ownership, setMTO_Ownership] = useState<boolean>();
  const [more_information, setMoreInformation] = useState<string>();

  const [imageLTD, setImageLTD] = useState<string | null>(null);
  const [fileLTD, setFileLTD] = useState<File | null>(null);

  useEffect(() => {
    const boot = async (control: AbortController) => {
      axios
        .get(api.external("/v1/master/province"), { signal: control.signal })
        .then(({ data: { data } }) => setProvince(data));
      axios
        .get(api.external("/v1/master/asset-type"), { signal: control.signal })
        .then(({ data: { data } }) => setAsset_type(data));
    };
    const control = new AbortController();
    boot(control);
    return () => {
      control.abort();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formJSON = {
      province_id: province_id,
      asset_type_id: asset_type_id,
      aria_size_rai: rai,
      aria_size_Ngan: ngan,
      aria_size_square_wa: square_wa,
      land_title_deed_number: landNumber,
      land_plot_number: landplotNumber,
      locataion: locataion,
      mto_ownership: mto_ownership,
      more_information: more_information,
    };

    try {
      const { data: messege } = await axios.post(
        api.internal("/api/asset"),
        formJSON
      );
      alert("บันทึกข้อมูลสำเร็จ");
      redirect("/consignment/index");
    } catch (error) {
      alert("ตรวจสอบข้อมูลอีกครั้ง");
    }
  };

  return (
    <div className="consignment-form">
      <div className="container register-seller">
        <div className="card-form-main">
          <h4 className="title-main mb-5">ข้อมูลทรัพย์สินที่ต้องการขายฝาก</h4>

          <div className="container-wrap">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">
                      จังหวัดที่ตั้งทรัพย์สิน
                      <span className="text-require">*</span>
                    </label>
                    <select
                      onChange={(e) => setProvince_id(Number(e.target.value))}
                      id="province_id"
                      name="province_id"
                      className="form-select"
                      required
                    >
                      <option value="">กรุณาเลือก</option>
                      {province.map((item: any, index: any) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">
                      ประเภททรัพย์สิน<span className="text-require">*</span>
                    </label>
                    <select
                      onChange={(e) => setAsset_type_id(Number(e.target.value))}
                      id="asset_type_id"
                      name="asset_type_id"
                      className="form-select"
                      required
                    >
                      <option value="">กรุณาเลือก</option>
                      {asset_type.map((item: any, index: any) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-12 text-center mb-2">
                  ขนาดพื้นที่ทรัพย์สิน
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">ไร่</label>
                    <input
                      onChange={(e) => setRai(Number(e.target.value))}
                      type="text"
                      name="aria_size_rai"
                      className="form-control"
                      aria-describedby="text"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">งาน</label>
                    <input
                      onChange={(e) => setNgan(Number(e.target.value))}
                      type="text"
                      name="aria_size_Ngan"
                      className="form-control"
                      aria-describedby="text"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">ตารางวา</label>
                    <input
                      onChange={(e) => setSquare_wa(Number(e.target.value))}
                      type="text"
                      name="aria_size_square_wa"
                      className="form-control"
                      aria-describedby="text"
                    />
                  </div>
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">
                      กรุณากรอกหมายเลขโฉนดที่ดิน
                      <span className="text-require">*</span>
                    </label>
                    <input
                      onChange={(e) => setLandNumber(e.target.value)}
                      type="text"
                      name="land_title_deed_number"
                      className="form-control"
                      aria-describedby="text"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">
                      กรุณากรอกหมายเลขระวางที่ดิน
                      <span className="text-require">*</span>
                    </label>
                    <input
                      onChange={(e) => setLandplotNumber(e.target.value)}
                      type="text"
                      name="land_plot_number"
                      className="form-control"
                      aria-describedby="text"
                      required
                    />
                  </div>
                </div>
              </div>

              <p>
                กรุณาอัพโหลดโฉนดที่ดิน<span className="text-require">*</span>
              </p>
              <div className="upload-btn-group">
                <button type="submit" className="btn btn-light csbtn1">
                  <CustomImage src="/upload.svg" alt="upload" />
                  อัพโหลด
                </button>
              </div>

              <p>
                กรุณาอัพโหลดรูปภาพทรัพย์สิน (อย่างน้อย 3 รูป)
                <span className="text-require">*</span>
              </p>
              <div className="upload-btn-group">
                <button type="submit" className="btn btn-light csbtn1">
                  <CustomImage src="/upload.svg" alt="upload" />
                  อัพโหลด
                </button>
              </div>

              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label text-secondary">
                    Location on Google Maps
                    <span className="text-require">*</span>
                  </label>
                  <input
                    onChange={(e) => setLocation(e.target.value)}
                    type="text"
                    className="form-control"
                    id="form1"
                    aria-describedby="text"
                  />
                </div>
              </div>

              <div className="mb-3 form-check mt-5 col-lg-6">
                <input
                  onChange={(e) => setMTO_Ownership(Boolean(e.target.value))}
                  type="checkbox"
                  name="mto_ownership"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label">
                  มีผู้ถือกรรมสิทธิ์มากกว่า 1 คน
                </label>
              </div>

              <div className="mb-3 col-lg-6 mb-5">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  ข้อมูลเพิ่มเติม
                </label>
                <textarea
                  onChange={(e) => setMoreInformation(e.target.value)}
                  className="form-control row-3"
                  id="exampleFormControlTextarea1"
                ></textarea>
              </div>

              <div className="submit-group mt-5">
                <Button type="submit" className="btn btn-primary">
                  ส่งข้อมูล
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddForm;
