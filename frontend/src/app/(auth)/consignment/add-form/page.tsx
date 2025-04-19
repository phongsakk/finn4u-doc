"use client";
import CustomImage from "@components/CustomImage";
import { api } from "@utils/api/index";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { apiInternalGet, convertImage, convertImage_arr, handleNumberChange } from "@components/helpers";
import { resizeBase64Image } from "@components/helpers";
import { UploadFile } from "@components/dev/uploadfile";

function AddForm() {
  const router = useRouter();
  const [loadingSubmit, setLoadingSubmit] = useState<Boolean>(false);
  const [province, setProvince] = useState([]);
  const [province_id, setProvince_id] = useState<number>();
  const [asset_type, setAsset_type] = useState([]);
  const [asset_type_id, setAsset_type_id] = useState<number>();
  const [rai, setRai] = useState<string>();
  const [ngan, setNgan] = useState<string>();
  const [square_wa, setSquare_wa] = useState<string>();
  const [meter, setMeter] = useState<string>();

  const [landNumber, setLandNumber] = useState<string>();
  const [landplotNumber, setLandplotNumber] = useState<string>();
  const [locataion, setLocation] = useState<string>();
  const [mto_ownership, setMTO_Ownership] = useState<boolean>();
  const [description, setDescription] = useState<string>();

  const [imageLTD, setImageLTD] = useState<string>("");
  const [imagesAsset, setImagesAsset] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const boot = async () => {
      const { data: res } = await apiInternalGet("/api/asset-master");
      if (res) {
        setProvince(res.province);
        setAsset_type(res.asset_type);
      }
    };
    boot();
    return () => {
      controller.abort();
    };
  }, []);

  const imgLTDChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    
    const convertedImage = await convertImage(selectedFile) as string;
    setImageLTD(convertedImage);
  };

  const imgsAssetChang = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const convertedImage_arr = await convertImage_arr(selectedFiles);
    setImagesAsset(convertedImage_arr)
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingSubmit(true);

    const marker = locataion?.split(/,|\s+/);

    const formJSON = {
      province_id: province_id,
      district_id: 1001,
      collateral: 0,
      asset_type_id: asset_type_id,

      aria_size_rai: Number(rai) || null,
      aria_size_Ngan: Number(ngan) || null,
      aria_size_square_wa: Number(square_wa) || null,
      aria_size_meter: Number(meter) || null,

      land_title_deed_number: landNumber,
      land_plot_number: landplotNumber,
      land_title_deed_image: imageLTD,
      asset_images: imagesAsset,
      locataion_x:
        marker && (!isNaN(Number(marker[0])) ? Number(marker[0]) : null),
      locataion_y:
        marker && (!isNaN(Number(marker[1])) ? Number(marker[1]) : null),
      is_multiple_holder: mto_ownership,
      description: description,
    };
    if (!imageLTD) {
      alert("กรุณาอัพโหลดโฉนดที่ดิน");
      return false;
    }

    if (imagesAsset.length < 3) {
      alert("กรุณาอัพโหลดรูปภาพทรัพย์สิน (อย่างน้อย 3 รูป)");
      return false;
    }
    try {
      const { data: messege } = await axios.post(
        api.internal("/api/asset"),
        formJSON
      );
      alert("บันทึกข้อมูลสำเร็จ");
      router.push("/consignment/index");
    } catch (error) {
      console.log(error);
      alert("ตรวจสอบข้อมูลอีกครั้ง");
      setLoadingSubmit(false);
    }
  };

  return (
    <>
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
                        <option className="text-secondary" value="">
                          กรุณาเลือก
                        </option>
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
                        onChange={(e) =>
                          setAsset_type_id(Number(e.target.value))
                        }
                        id="asset_type_id"
                        name="asset_type_id"
                        className="form-select"
                        required
                      >
                        <option className="text-secondary" value="">
                          กรุณาเลือก
                        </option>
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
                        onChange={(e) => {
                          handleNumberChange(e, setRai);
                        }}
                        value={rai ?? ""}
                        type="text"
                        name="aria_size_rai"
                        className="form-control"
                        aria-describedby="text"
                        placeholder="ไร่"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">งาน</label>
                      <input
                        onChange={(e) => {
                          handleNumberChange(e, setNgan);
                        }}
                        value={ngan ?? ""}
                        type="text"
                        name="aria_size_Ngan"
                        className="form-control"
                        aria-describedby="text"
                        placeholder="งาน"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">ตารางวา</label>
                      <input
                        onChange={(e) => {
                          handleNumberChange(e, setSquare_wa);
                        }}
                        value={square_wa ?? ""}
                        type="text"
                        name="aria_size_square_wa"
                        className="form-control"
                        aria-describedby="text"
                        placeholder="ตางรางวา"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    {asset_type_id === 7 && (
                      <div className="mb-3">
                        <label className="form-label">ตารางเมตร</label>
                        <input
                          onChange={(e) => {
                            handleNumberChange(e, setMeter);
                          }}
                          value={meter ?? ""}
                          type="text"
                          name="aria_size_meter"
                          className="form-control"
                          aria-describedby="text"
                          placeholder="ตารางเมตร"
                        />
                      </div>
                    )}
                  </div>
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
                        placeholder="หมายเลขโฉนดที่ดิน"
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
                        placeholder="หมายเลขระวาง"
                        required
                      />
                    </div>
                  </div>
                </div>

                <p>
                  กรุณาอัพโหลดโฉนดที่ดิน<span className="text-require">*</span>
                </p>
                <div className="upload-btn-group">
                  <input
                    type="file"
                    className="d-none"
                    name="imageLTD"
                    id="imageLTD"
                    onChange={imgLTDChange}
                  />
                  <label
                    role="button"
                    className="btn btn-light csbtn1"
                    htmlFor="imageLTD"
                  >
                    <CustomImage src="/upload.svg" alt="upload" />
                    อัพโหลด
                  </label>
                </div>
                {imageLTD && (
                  <div className="show-image-upload row">
                    <div className="col-auto">
                      <img
                        src={imageLTD}
                        alt="Preview"
                        className="mt-2 w-32 h-32 object-cover"
                      />
                    </div>
                  </div>
                )}

                <p>
                  กรุณาอัพโหลดรูปภาพทรัพย์สิน (อย่างน้อย 3 รูป)
                  <span className="text-require">*</span>
                </p>
                <div className="upload-btn-group">
                  <input
                    type="file"
                    className="d-none"
                    name="imagesAsset"
                    id="imagesAsset"
                    multiple
                    onChange={imgsAssetChang}
                  />
                  <label className="btn btn-light csbtn1" htmlFor="imagesAsset">
                    <CustomImage src="/upload.svg" alt="upload" />
                    อัพโหลด
                  </label>
                </div>

                <div className="show-image-upload row">
                  {imagesAsset.map((image, index) => (
                    <div className="col-auto" key={index}>
                      <img src={image} alt={`Preview ${index}`} />
                    </div>
                  ))}
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    <label
                      className="form-label text-secondary"
                      htmlFor="location"
                    >
                      Location on Google Maps
                      <span className="text-require">*</span>
                    </label>
                    <input
                      onChange={(e) => setLocation(e.target.value)}
                      type="text"
                      className="form-control"
                      id="location"
                      aria-describedby="text"
                      placeholder="ตัวอย่าง: 13.806xx, 100.5516xxx"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3 form-check mt-5 col-lg-6">
                  <input
                    onChange={(e) => setMTO_Ownership(Boolean(e.target.value))}
                    type="checkbox"
                    name="mto_ownership"
                    className="form-check-input"
                    id="mto_ownership"
                  />
                  <label className="form-check-label" htmlFor="mto_ownership">
                    มีผู้ถือกรรมสิทธิ์มากกว่า 1 คน
                  </label>
                </div>

                <div className="mb-3 col-lg-6 mb-5">
                  <label htmlFor="description" className="form-label">
                    ข้อมูลเพิ่มเติม
                  </label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control row-3"
                    id="description"
                    name="description"
                  ></textarea>
                </div>

                <div className="submit-group mt-5">
                  {loadingSubmit === false ? (
                    <Button type="submit" className="btn btn-primary">
                      ส่งข้อมูล
                    </Button>
                  ) : (
                    <Button className="btn btn-primary" disabled>
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="px-2">กำลังตรวจสอบข้อมูล...</span>
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddForm;
