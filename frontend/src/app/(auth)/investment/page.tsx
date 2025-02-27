import CustomImage from "@components/CustomImage"
import BarChart from "./BarChart"

function page() {
	return (
		<>
			<div className="ragister-content">
				<div className="container">
					<h4>
						ขายฝากได้ง่ายกับ
						<span className="text-primary h3">
							Finn4U</span>
					</h4>


					<div className="row">
						<div className="col-lg-4">
							<div className="group mt-3">
								<CustomImage src="/menuregis4.png" alt="/menuregis4"
									style={
										{
											width: "50%",
											height: "auto"
										}
									}/>
								<p>Finn มีอสังหาฯมูลค่าสูง</p>
								<p>อสังหาริมทรัพย์มูลค่าสูงค้ำประกันง</p>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="group">
								<CustomImage src="/menuregis5.png" alt="/menuregis5"
									style={
										{
											width: "50%",
											height: "auto"
										}
									}/>
								<p>Finn กับอัตราตอบแทน</p>
								<p>ด้วยอัตราผลตอบแทนสูง 9-12% ต่อปี</p>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="group mt-2">
								<CustomImage src="/menuregis6.png" alt="/menuregis6"
									style={
										{
											width: "50%",
											height: "auto"
										}
									}/>
								<p>Finn หายห่วง</p>
								<p>ประเมินทรัพย์สินโดยบริษัทประเมิน</p>
								<p>ที่ได้รับความเห็นชอบจาก ก.ล.ต.</p>
							</div>
						</div>
					</div>

					<div className="btn-wrap">
						<a className="btn btn-primary" href="investment-form.php">เพิ่มข้อมูลสำหรับการลงทุน</a>
					</div>
				</div>
			</div>

			<div className="calculate">
				<h2 className="text-center font2 m-3">
					ขายฝากได้ง่ายกับ
					<span className="text-primary font2 h4">
						Finn4U</span>
				</h2>

				<div className="container">
					<div className="group">
						<div className="row">
							<div className="col-lg-6">
								<h4 className="text-center font2">คำนวณผลตอบแทนกับ<span className="text-primary font2 i h4">
										Finn4U</span>
								</h4>
								<div className="mb-3">
									<label className="form-label font2">จำนวนเงินลงทุน (บาท)<span className="text-require font2">*</span>
									</label>
									<input type="text" className="form-control" id="form1" aria-describedby="text"/></div>
								<div className="mb-3">
									<label className="form-label font2">ระยะเวลาลงทุน (ปี)<span className="text-require font2">*</span>
									</label>
									<input type="text" className="form-control" id="form2" aria-describedby="text"/></div>
								<div className=" mb-3 font2">
									<a href="register-invester2.php" type="submit" className="btn btn-primary ">ผลตอบแทน (บาท/ปี)</a>
								</div>
							</div>
							<div className="col-lg-6">
								<BarChart/>
							</div>
						</div>
					</div>

				</div>
			</div>

			<div className="register-seller">
				<div className="container">
					<div className="wrap">
						<div className="step">
							<div className="child">
								<CustomImage src="/reg-step1.png" alt="reg-step1"
									style={
										{height: "auto"}
									}/>
								<p className="font2">ลงทะเบียน</p>
							</div>
							<div className="polygon">
								<CustomImage src="/Polygon2.png" alt="Polygon2"/>
							</div>
							<div className="child">
								<CustomImage src="/reg-step2.png" alt="reg-step2"
									style={
										{height: "auto"}
									}/>
								<p className="font2">ยืนยันตัวตน</p>
							</div>
							<div className="polygon">
								<CustomImage src="/Polygon2.png" alt="Polygon2"/>
							</div>
							<div className="child">
								<CustomImage src="/reg-step3.png" alt="reg-step3"
									style={
										{height: "auto"}
									}/>
								<p className="font2">อัพโหลดเอกสาร</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default page
