import CustomImage from "../../components/CustomImage";
import Link from "next/link";
import {
	faMagnifyingGlass,
	faClock,
	faAngleLeft,
	faAngleRight,
	faChevronLeft,
	faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
function Propertysale() {
	return (
		<div className="property-sale">
			<div className="register-banner">
				<CustomImage src="/banner-home-emp.png" alt="banner-home-emp"/>
				<Link className="btn btn-white" href="/registerseller">ลงทะเบียนเป็น ผู้ขายฝาก</Link>
				<Link className="btn btn-white" href="#">ลงทะเบียนเป็น นักลงทุน</Link>
			</div>
			<div className="container-fluid">
				<p className="title-content">ทรัพย์สินขายฝาก</p>
				<div className="step-line"></div>
				<div className="container">
					<div className="row filter">
						<div className="col-lg-2">
							<div className="mb-3">
								<select id="Select1_1" className="form-select">
									<option>select</option>
								</select>
							</div>
						</div>
						<div className="col-lg-2">
							<div className="mb-3">
								<select id="Select1_2" className="form-select">
									<option>select</option>
								</select>
							</div>
						</div>
						<div className="col-lg-5"></div>
						<div className="col-lg-3">
							<div className="search-group">
								<select id="Select1_3" className="form-select">
									<option>select</option>
								</select>
								<label className="form-label">
									<FontAwesomeIcon icon={faMagnifyingGlass}/>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="land-sale-2">
					{
					[...Array(3)].map((_, i) => (
						<a className="not-sale mb-5" href="#"
							key={i}>
							<div className="row">
								<div className="col-lg-7">
									<div className="relative">
										<CustomImage src="/land-img1.png" alt="land-img1"/>
										<span className="badge font2">ที่ดินเปล่า</span>
										<button className="btn btn-sold">
											SOLD
										</button>
										<div className="time">
											<div className="text-center">
												<p className="font2">รอการลงทุน</p>
												<p className="text-warning font2">1 วัน 3.50 ชั่วโมง</p>
											</div>
											<div className="icon">
												<FontAwesomeIcon icon={faClock}/>
												<i className="fa-solid fa-clock"></i>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-5">
									<div className="locataion">
										<p className="font2">ลาดกระบัง, กรุงเทพมหานคร</p>
										<ul>
											<li>
												<CustomImage src="/ic-lo1.svg" alt="ic-lo1"
													style={
														{
															width: "6%",
															height: "auto"
														}
													}/>
												<span className="font2">เลขที่ฝากขาย 000023</span>
											</li>
											<li>
												<CustomImage src="/ic-lo2.svg" alt="ic-lo2"
													style={
														{
															width: "6%",
															height: "auto"
														}
													}/>

												<span className="font2">0 ไร่ 0 งาน 20 ตารางวา</span>
											</li>
											<li>
												<CustomImage src="/ic-lo3.svg" alt="ic-lo3"
													style={
														{
															width: "6%",
															height: "auto"
														}
													}/>

												<span className="font2">มูลค่าสินทรัพย์ค้ำประกัน</span>
												<span className="text-primary font2">3.2 ล้านบาท</span>
											</li>
											<li>
												<CustomImage src="/ic-lo4.svg" alt="ic-lo4"
													style={
														{
															width: "6%",
															height: "auto"
														}
													}/>

												<span className="font2">ราคาขายฝาก<span className="text-primary font2">1,450,000</span>บาท</span>
											</li>
											<li>
												<CustomImage src="/ic-lo5.svg" alt="ic-lo5"
													style={
														{
															width: "6%",
															height: "auto"
														}
													}/>
												<span className="font2">11 เมษายน 2565</span>
											</li>
										</ul>
										<div className="wrap">
											<button type="submit" className="btn btn-light">ข้อมูลเพิ่มเติม</button>
											<button type="submit" className="btn btn-primary">ลงทุน</button>
										</div>
									</div>
								</div>
							</div>
						</a>
					))
				}

					{
					[...Array(3)].map((_, i) => (
						<a className="sale-active mb-5" href="#"
							key={i}>
							<div className="row">
								<div className="col-lg-7">
									<div className="relative">
										<CustomImage src="/land-img1.png" alt="land-img1"/>
										<span className="badge font2">ทาวน์เฮ้าส์</span>
										<button className="btn btn-sold font2">
											SOLD
										</button>
										<div className="time">
											<div className="text-center">
												<p className="font2">รอการลงทุน</p>
												<p className="text-warning font2">1 วัน 3.50 ชั่วโมง</p>
											</div>
											<div className="icon">
												<FontAwesomeIcon icon={faClock}/>
												<i className="fa-solid fa-clock"></i>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-5">
									<div className="locataion">
										<p className="font2">ลาดกระบัง, กรุงเทพมหานคร</p>
										<ul>
											<li>
												<CustomImage src="/ic-lo1.svg" alt="ic-lo1"
													style={
														{
															width: "6%",
															height: "auto"
														}
													}/>
												<span className="font2">เลขที่ฝากขาย 000023</span>
											</li>
											<li>
												<CustomImage src="/ic-lo2.svg" alt="ic-lo2"
													style={
														{
															width: "6%",
															height: "auto"
														}
													}/>
												<span className="font2">0 ไร่ 0 งาน 20 ตารางวา</span>
											</li>
											<li>
												<CustomImage src="/ic-lo3.svg" alt="ic-lo3"
													style={
														{
															width: "6%",
															height: "auto"
														}
													}/>
												<span className="font2">มูลค่าสินทรัพย์ค้ำประกัน</span>
												<span className="text-primary font2">3.2 ล้านบาท</span>
											</li>
											<li>
												<CustomImage src="/ic-lo4.svg" alt="ic-lo4"
													style={
														{
															width: "6%",
															height: "auto"
														}
													}/>
												<span className="font2">ราคาขายฝาก<span className="text-primary font2">1,450,000</span>บาท</span>
											</li>
											<li>
												<CustomImage src="/ic-lo5.svg" alt="ic-lo5"
													style={
														{
															width: "6%",
															height: "auto"
														}
													}/>
												<span className="font2">11 เมษายน 2565</span>
											</li>
										</ul>
										<div className="wrap">
											<button type="submit" className="btn btn-light">ข้อมูลเพิ่มเติม</button>
											<button type="submit" className="btn btn-primary">ลงทุน</button>
										</div>
									</div>
								</div>
							</div>
						</a>
					))
				} </div>
				<div className="panigation-main">
					<nav aria-label="Page navigation example">
						<ul className="pagination">
							<li className="page-item">
								<a className="page-link custom" href="#">
									<FontAwesomeIcon icon={faAngleLeft}/>
								</a>
							</li>
							<li className="page-item">
								<a className="page-link custom" href="#">
									<FontAwesomeIcon icon={faChevronLeft}/>
								</a>
							</li>
							<li className="page-item">
								<a className="page-link active" href="#">1</a>
							</li>
							<li className="page-item">
								<a className="page-link" href="#">2</a>
							</li>
							<li className="page-item">
								<a className="page-link" href="#">3</a>
							</li>
							<li className="page-item">
								<a className="page-link custom" href="#">
									<FontAwesomeIcon icon={faChevronRight}/>
								</a>
							</li>
							<li className="page-item">
								<a className="page-link custom" href="#">
									<FontAwesomeIcon icon={faAngleRight}/>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>

		</div>
	)
}
export default Propertysale
