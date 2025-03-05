import CustomImage from "./CustomImage";
function Footer() {
	return (
		<div className="footer-main">
			<div className="wrap">
				<div className="row">

					<div className="col-lg-6">
						<div className="row mb-3">
							<div className="col-lg-6">
								<p>ผู้ขายฝาก</p>
							</div>
							<div className="col-lg-6">
								<p>ทรัพย์สินขายฝาก</p>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col-lg-6">
								<p>นักลงทุน</p>
							</div>
							<div className="col-lg-6">
								<p>Finn Tips</p>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col-lg-6">
								<p>ขายฝากที่นี่</p>
							</div>
							<div className="col-lg-6">
								<p>คำถามที่พบบ่อย</p>
							</div>
						</div>
					</div>


					<div className="col-lg-6">
						<div className="row">
							<div className="col-lg-10">
								<div className="row mb-3">
									<div className="col-lg-12">
										<p className="head">บริษัท อารักษ์มิตร จำกัด</p>
									</div>
								</div>
								<div className="row mb-3">
									<div className="col-lg-12">
										<p>9/8 หมู่ 5 บางกรวย ซอย 10 ตำบลบางกรวย อำเภอบางกรวย จังหวัดนนทบุรี 11130</p>
									</div>
								</div>
								<div className="row mb-3">
									<div className="col-lg-12">
										<div className="group-ad">
											<div className="d-flex">
												<CustomImage src="/ad-tel.svg" alt="ad-tel"
													style={
														{
															width: "10%",
															height: "auto"
														}
													}/>
												<span>02-0777481</span>
											</div>
											<div className="d-flex">
												<CustomImage src="/ad-email.svg"
													style={
														{
															width: "10%",
															height: "auto"
														}
													}/>
												<span>info@arrakmit.com</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-lg-2">
								<div className="other-link">
									<CustomImage src="/facebook.svg"
										style={
											{
												width: "50%",
												height: "auto"
											}
										}/>
									<CustomImage src="/line.svg"
										style={
											{
												width: "50%",
												height: "auto"
											}
										}/>
									<CustomImage src="/youtube.svg"
										style={
											{
												width: "50%",
												height: "auto"
											}
										}/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Footer
