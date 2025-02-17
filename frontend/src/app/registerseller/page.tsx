import {Button} from "react-bootstrap"
import Image from "next/image"

function regisseller() {
	return (
		<>
			<div className="banner-regis">
				<Image src="/banner_regis1.png" alt="banner_regis1"
					width={100}
					height={100}
					sizes="100vm"
					style={
						{height: "auto"}
					}
					priority/>
			</div>

			<div className="register-seller">
				<div className="container">
					<div className="card-form-main">
						<div className="wrap">
							<h4 className="title-main font2">ลงทะเบียนเป็นผู้ขายฝากกับ Finn4U</h4>
							<div className="step">
								<div className="child">
									<Image src="/reg-step1.png" alt="reg-step1"
										width={100}
										height={100}
										sizes="100vm"
										style={
											{height: "auto"}
										}
										priority/>
									<p className="font2 fw-bold">ลงทะเบียน</p>
								</div>
								<div className="polygon">
									<Image src="/Polygon2.png" alt="Polygon2"
										width={100}
										height={100}
										sizes="100vm"
										style={
											{height: "auto"}
										}
										priority/>
								</div>
								<div className="child">
									<Image src="/reg-step2.png" alt="reg-step2"
										width={100}
										height={100}
										sizes="100vm"
										style={
											{height: "auto"}
										}
										priority/>
									<p className="font2">ยืนยันตัวตน</p>
								</div>
								<div className="polygon">
									<Image src="/Polygon2.png" alt="Polygon2"
										width={100}
										height={100}
										sizes="100vm"
										style={
											{height: "auto"}
										}
										priority/>
								</div>
								<div className="child">
									<Image src="/reg-step3.png" alt="reg-step3"
										width={100}
										height={100}
										sizes="100vm"
										style={
											{height: "auto"}
										}
										priority/>
									<p className="font2">อัพโหลดเอกสาร</p>
								</div>
							</div>
						</div>

						<form>
							<div className="row mb-3">
								<div className="col-lg-4">
									<div className="mb-3">
										<label className="form-label font2">คำนำหน้า<span className="text-require font2">*</span>
										</label>
										<select id="Select1" className="form-select font2">
											<option>select</option>
										</select>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="mb-3">
										<label className="form-label font2">ชื่อ<span className="text-require font2">*</span>
										</label>
										<input type="text" className="form-control font2" id="form1" aria-describedby="text"/>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="mb-3">
										<label className="form-label font2">นามสกุล<span className="text-require font2">*</span>
										</label>
										<input type="text" className="form-control font2" id="form1" aria-describedby="text"/>
									</div>
								</div>

								<div className="col-lg-4">
									<div className="mb-3">
										<label className="form-label font2">เบอร์โทรศัพท์<span className="text-require font2">*</span>
										</label>
										<input type="text" className="form-control font2" id="form1" aria-describedby="text"/>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="mb-3">
										<label className="form-label font2">เวลาที่สะดวกให้ติดต่อกลับ<span className="text-require font2">*</span>
										</label>
										<select id="Select1" className="form-select font2">
											<option>select</option>
										</select>
									</div>
								</div>
							</div>

							<div className="row mt-5 mb-3">
								<div className="col-lg-4">
									<div className="mb-3">
										<label className="form-label font2">อาชีพ<span className="text-require font2">*</span>
										</label>
										<select id="Select1" className="form-select font2">
											<option>select</option>
										</select>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="mb-3">
										<label className="form-label font2">รายได้ต่อเดือน<span className="text-require font2">*</span>
										</label>
										<input type="text" className="form-control font2" id="form1" aria-describedby="text"/>
									</div>
								</div>
							</div>

							<div className="row mt-5">
								<div className="col-lg-4">
									<div className="mb-3">
										<label className="form-label font2">ที่อยู่ปัจจุบัน<span className="text-require font2">*</span>
										</label>
										<input type="text" className="form-control font2" id="form1" aria-describedby="text"/>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="mb-3">
										<label className="form-label font2">ถนน<span className="text-require font2">*</span>
										</label>
										<input type="text" className="form-control font2" id="form1" aria-describedby="text"/>
									</div>
								</div>
							</div>

							<div className="row mb-3">
								<div className="col-lg-4">
									<div className="mb-3">
										<label className="form-label font2">จังหวัด<span className="text-require font2">*</span>
										</label>
										<input type="text" className="form-control font2" id="form1" aria-describedby="text"/>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="mb-3">
										<label className="form-label font2">อำเภอ/เขต<span className="text-require font2">*</span>
										</label>
										<input type="text" className="form-control font2" id="form1" aria-describedby="text"/>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="mb-3">
										<label className="form-label font2">ตำบล/แขวง<span className="text-require font2">*</span>
										</label>
										<input type="text" className="form-control font2" id="form1" aria-describedby="text"/>
									</div>
								</div>
							</div>

							<div className="row mt-5 mb-3">
								<div className="col-lg-4">
									<div className="mb-3">
										<label className="form-label font2">อีเมล<span className="text-require font2">*</span>
										</label>
										<input type="email" className="form-control font2" id="form1" aria-describedby="text"/>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="mb-3">
										<label className="form-label font2">รหัสผ่าน<span className="text-require font2">*</span>
										</label>
										<input type="text" className="form-control font2" id="form1" aria-describedby="text"/>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="mb-3">
										<label className="form-label font2">ยืนยันรหัสผ่าน<span className="text-require font2">*</span>
										</label>
										<input type="text" className="form-control font2" id="form1" aria-describedby="text"/>
									</div>
								</div>
							</div>
							<div className="submit-group">
								<Button type="submit" variant="white">ย้อนกลับ</Button>
								<Button type="submit" variant="primary">ถัดไป</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
export default regisseller
