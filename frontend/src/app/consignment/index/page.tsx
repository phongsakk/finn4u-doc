import CustomImage from "@components/CustomImage"
import Link from "next/link"

function Index() {
	return (
		<div className="consignment-form2">
			<div className="container">
				<div className="card-form-main">
					<h4 className="title-main mb-5 mt-5">ข้อมูลทรัพย์สินของคุณ</h4>

					<div className="container">
						<div className="land-sale-2">
							{
							[...Array(3)].map((_, i) => (
								<div className="row not-sale mb-3"
									key={i}>
									<div className="col-lg-4">
										<div className="relative">
											<CustomImage src="/land-img1.png" alt="land-img1"/>
											<span className="badge">รอนักลงทุน</span>
										</div>
									</div>
									<div className="col-lg-8">
										<div className="locataion">
											<div className="date">
												<div className="d-flex">
													<span>วันที่ประกาศขายฝาก<span>12 พ.ค. 2565</span>
													</span>
												</div>
												<p>ที่ดินพร้อมสิ่งปลูกสร้าง</p>
											</div>
											<ul>
												<li className="custom">
													<div className="d-flex">
														<CustomImage src="/cos-ic1.svg" alt="cos-ic1"
															style={
																{
																	width: "15%",
																	height: "auto"
																}
															}/>
														<span>ดอนเมือง, ปทุมธานี</span>
													</div>

													<div className="group-menu">
														<div>
															<span>
																<CustomImage src="/eye-color.svg" alt="eye-color"
																	style={
																		{
																			width: "35%",
																			height: "auto"
																		}
																	}/>

															</span>
															<span className="mx-2">123</span>
														</div>
														<div>
															<span>
																<CustomImage src="/banner.svg" alt="banner"
																	style={
																		{
																			width: "33%",
																			height: "auto"
																		}
																	}/>

															</span>
															<span className="mx-2">5</span>
														</div>
													</div>
												</li>
												<li>
													<CustomImage src="/cos-ic2.svg" alt="cos-ic2"
														style={
															{
																width: "5%",
																height: "auto"
															}
														}/>
													<span>เลขที่ฝากขาย 000012</span>
												</li>
												<li>
													<CustomImage src="/cos-ic3.svg" alt="cos-ic3"
														style={
															{
																width: "5%",
																height: "auto"
															}
														}/>
													<span>1 ไร่ 2 งาน 26 ตารางวา</span>
												</li>
												<li>
													<CustomImage src="/cos-ic3.svg" alt="cos-ic3"
														style={
															{
																width: "5%",
																height: "auto"
															}
														}/>
													<span>มูลค่าสินทรัพย์ค้ำประกัน</span>
													<span className="text-primary">6.2 ล้านบาท</span>
												</li>
												<li className="custom">
													<div className="d-flex">
														<CustomImage src="/cos-ic1.svg" alt="cos-ic1"
															style={
																{
																	width: "10%",
																	height: "auto"
																}
															}/>
														<span>ราคาขายฝาก</span>
														<span className="text-primary">2,000,000</span>
														<span>
															บาท</span>
													</div>

													<div className="group-menu-2">
														<div className="group" data-bs-toggle="modal" data-bs-target="#modalinterest">
															<CustomImage src="/graph-ic.svg" alt="graph-ic"/>
														</div>
														<div className="group" data-bs-toggle="modal" data-bs-target="#modal-notsale">
															<CustomImage src="/info.svg" alt="info"/>
														</div>
														<div className="group">
															<CustomImage src="/usertell.svg" alt="usertell"/>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
							))
						} </div>
					</div>
					<hr/>
					<div className="d-flex align-items-center">
						<Link href="/consignment/warning" className="btn-icon">
							<CustomImage src="/add-conseg.svg" alt="add-conseg"
								style={
									{
										width: "10%",
										height: "auto"
									}
								}/>
							<span>
								เพิ่มทรัพย์สินขายฝาก</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Index
