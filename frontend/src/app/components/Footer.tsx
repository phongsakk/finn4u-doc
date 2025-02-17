import Image from "next/image";

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
												<Image src="/ad-tel.svg" alt="ad-tel"
													width={100}
													height={100}
													sizes="100vw"
													style={
														{
															width: "30%",
															height: "auto"
														}
													}/>

												<span>02-0777481</span>
											</div>
											<div className="d-flex">
												<Image src="/ad-email.svg" alt="ad-email"
													width={100}
													height={100}
													sizes="100vw"
													style={
														{
															width: "30%",
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
									<Image src="/facebook.svg" alt="facebook"
										width={100}
										height={100}
										sizes="100vw"
										style={
											{
												width: "80%",
												height: "auto"
											}
										}/>
									<Image src="/line.svg" alt="line"
										width={100}
										height={100}
										sizes="100vw"
										style={
											{
												width: "80%",
												height: "auto"
											}
										}/>
									<Image src="/youtube.svg" alt="youtube"
										width={100}
										height={100}
										sizes="100vw"
										style={
											{
												width: "80%",
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
