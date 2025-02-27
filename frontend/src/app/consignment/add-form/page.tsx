import CustomImage from "@components/CustomImage"
import Link from "next/link"

function AddForm() {
  return (
    <div className="consignment-form">
        <div className="container register-seller">
            <div className="card-form-main">
                <h4 className="title-main mb-5">ข้อมูลทรัพย์สินที่ต้องการขายฝาก</h4>

                <div className="container-wrap">
                    <form>

                        <div className="row mb-3">
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label  className="form-label">จังหวัดที่ตั้งทรัพย์สิน<span className="text-require">*</span></label>
                                    <select id="Select1" className="form-select">
                                        <option>select</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label  className="form-label">ประเภททรัพย์สิน<span className="text-require">*</span></label>
                                    <select id="Select1" className="form-select">
                                        <option>select</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label">ขนาดพื้นที่ทรัพย์สิน<span className="text-require">*</span></label>
                                    <input type="text" className="form-control" id="form1" aria-describedby="text"/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label  className="form-label">หน่วยเป็น<span className="text-require">*</span></label>
                                    <select id="Select1" className="form-select">
                                        <option>select</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label">กรุณากรอกหมายเลขโฉนดที่ดิน<span className="text-require">*</span></label>
                                    <input type="text" className="form-control" id="form1" aria-describedby="text"/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label">กรุณากรอกหมายเลขระวางที่ดิน<span className="text-require">*</span></label>
                                    <input type="text" className="form-control" id="form1" aria-describedby="text"/>
                                </div>
                            </div>
                        </div>

                        <p>กรุณาอัพโหลดโฉนดที่ดิน<span className="text-require">*</span></p>
                        <div className="upload-btn-group">
                            <button type="submit" className="btn btn-light csbtn1">
                                <CustomImage src="/upload.svg"  alt="upload"/>
                               อัพโหลด</button>
                        </div>

                        <p>กรุณาอัพโหลดรูปภาพทรัพย์สิน (อย่างน้อย 3 รูป)<span className="text-require">*</span></p>
                        <div className="upload-btn-group">
                            <button type="submit" className="btn btn-light csbtn1">
                                <CustomImage src="/upload.svg"  alt="upload"/>
                                อัพโหลด</button>
                        </div>

                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label className="form-label text-secondary">Location on Google Maps<span className="text-require">*</span></label>
                                <input type="text" className="form-control" id="form1" aria-describedby="text"/>
                            </div>
                        </div>

                        <div className="mb-3 form-check mt-5 col-lg-6">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" >มีผู้ถือกรรมสิทธิ์มากกว่า 1 คน</label>
                        </div>

                        <div className="mb-3 col-lg-6 mb-5">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">ข้อมูลเพิ่มเติม</label>
                            <textarea className="form-control row-3" id="exampleFormControlTextarea1"></textarea>
                        </div>

                        <div className="submit-group mt-5">
                            <Link href="/consignment/index" type="submit" className="btn btn-primary">ส่งข้อมูล</Link>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
export default AddForm