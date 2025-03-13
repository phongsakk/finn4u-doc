"use client";
import CustomImage from "@components/CustomImage";
import Link from "next/link";
import Banner from "../banner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faEye, faHammer} from "@fortawesome/free-solid-svg-icons";
import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import Countdown from "@components/Countdown";
import dayjs from "dayjs";
import "dayjs/locale/th";
import {Input} from "antd";
import {formatDateThai, handleNumberChange} from "@components/helpers";
import AlertStatus, {AlertType} from "@components/alert/AlertStatus";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Map} from "@components/dev/map";

dayjs.extend(customParseFormat);
dayjs.locale("th");

function PropertyPage() {
	const router = useRouter();
	const [galleryOpen, setGallery] = useState(false);
	const [modalImage, setModalImage] = useState < string > ("");
	const [bidPercent, setBidPercent] = useState < string > ();
	const [fromDate, setFromDate] = useState < string > ();
	const [toDate, setToDate] = useState < string > ();
	const [endtime, setEndtime] = useState < Date > ();
	const [alertOpen, setAlertOpen] = useState < AlertType > ();

	const {data: session, status, update} = useSession();

	useEffect(() => {
		const fromDate = dayjs("10/03/2025 00:00:00", "DD/MM/YYYY HH:mm:ss").toDate();
		const toDate = dayjs("15/03/2025 23:59:59", "DD/MM/YYYY HH:mm:ss").toDate();

		setFromDate(formatDateThai(fromDate));
		setToDate(formatDateThai(toDate));

		setEndtime(toDate);
	}, [fromDate, toDate]);

	const handleGallery = (e : React.FormEvent) => {
		e.preventDefault();
		const clickedImage = e.target as HTMLImageElement;
		setModalImage(clickedImage.src);

		setGallery(true);
	};
	const alertClose = () => {
		setAlertOpen({alertOpen: false});
	};

	const handleBid = () => {
		if (!bidPercent) {
			return setAlertOpen({alertOpen: true, alertClose, status: "error", text: "กรุณากรอกดอกเบี้ยของคุณ"});
		}

		setAlertOpen({alertOpen: true, alertClose, status: "success", text: `คุณได้ทำการ Bid สำเร็จแล้ว`});
		setTimeout(() => {
			router.push("/property-consignment/contract");
		}, 3000);
	};

	return (
		<> {
			alertOpen && (
				<AlertStatus alertOpen={
						alertOpen.alertOpen
					}
					alertClose={alertClose}
					status={
						alertOpen.status
					}
					text={
						alertOpen.text
					}/>
			)
		}
			<div className="property-sale-detail">
				<Banner/>
				<div className="container bg-white pb-5">
					<p className="title-content font2">ทรัพย์สินขายฝาก</p>
					<section className="photo-gallery">
						<div className="container">
							<div className="row gallery-grid">
								<div className="col col-lg-9 col-md-9 col-sm-12 col-xs-12">
									<div className="gallery-item">
										<Map position="13.8104970155091, 100.56850354191629"
											style={
												{
													width: "100%",
													height: "541.88px"
												}
											}/>
									</div>
								</div>
								<div className="col col-lg-3 col-md-4 col-sm-12 col-xs-12">
									<Link className="gallery-item" href="#"
										onClick={handleGallery}>
										<CustomImage src="/locate2.png" className="img-fluid object-fit-cover" alt="locate2"/>
									</Link>
									<Link className="gallery-item" href="/locate3.png"
										onClick={handleGallery}>
										<CustomImage src="/locate3.png" className="img-fluid object-fit-cover" alt="locate3"/>
									</Link>
									<Link className="gallery-item" href="/locate4.png"
										onClick={handleGallery}>
										<CustomImage src="/locate4.png" className="img-fluid object-fit-cover" alt="locate4"/>
									</Link>
								</div>
							</div>
							<div className="time">
								<div className="row">
									<div className="col-lg-9">
										<div className="d-flex">
											{/* <!-- ใส่ Class bg-red ต่อจาก Class icon จะเปลี่ยนพื้นหลังสีเเดง --> */}
											<div className="icon">
												<FontAwesomeIcon icon={faClock}/>
												<i className="fa-solid fa-clock"></i>
											</div>
											<span className="font2">
												รอการลงทุน
												<span className="text-danger font2">
													1 วัน 3.50 ชั่วโมง
												</span>
											</span>
											<span className="date-sale font2">
												ประกาศขายเมื่อ 11 เมษายน 2565
											</span>
										</div>
									</div>
									<div className="col-lg-3">
										{/* <!-- เอา class d-none ออกจะเเสดงสถานะ sold --> */}
										<div className="sold d-none">
											<span>SOLD</span>
										</div>
									</div>
								</div>
							</div>
							<div className="location">
								<h3 className="text-primary font2">ลาดกระบัง, กรุงเทพมหานคร</h3>
								<div className="row">
									<div className="col row">
										<div className="font2 col-auto btn btn-primary">
											ที่ดินเปล่า
										</div>
									</div>
									<div className="col-sm-4 text-end">
										<Link href="#"
											onClick={
												(e) => e.preventDefault()
											}
											className="btn btn-primary font2">
											ประมูล
										</Link>
										<Link href="#"
											onClick={
												(e) => e.preventDefault()
											}
											className="btn btn-primary font2 mx-2">
											ลงทุน
										</Link>
									</div>
								</div>
							</div>

							<div className="detail">
								<div className="locataion">
									<ul>
										<li>
											<div className="cust">
												<CustomImage src="/ic-lo1.svg" alt="ic-lo1"
													style={
														{
															width: "30px",
															height: "auto"
														}
													}/>
												<span className="font2">เลขที่ฝากขาย 000023</span>
											</div>
											<div className="manage">
												<FontAwesomeIcon icon={faEye}/>
												<span className="mx-2 font2">123</span>
												<FontAwesomeIcon icon={faHammer}
													className="mx-2"/>
												<span className="font2">5</span>
											</div>
										</li>
										<li>
											<CustomImage src="/ic-lo2.svg" alt="ic-lo2"
												style={
													{
														width: "30px",
														height: "auto"
													}
												}/>

											<span className="font2">0 ไร่ 0 งาน 20 ตารางวา</span>
										</li>
										<li>
											<CustomImage src="/ic-lo3.svg" alt="ic-lo3"
												style={
													{
														width: "30px",
														height: "auto"
													}
												}/>
											<span className="font2">มูลค่าสินทรัพย์ค้ำประกัน</span>3.2
												                      ล้านบาท
										</li>
										<li>
											<CustomImage src="/ic-lo4.svg" alt="ic-lo4"
												style={
													{
														width: "30px",
														height: "auto"
													}
												}/>
											<span className="font2">ราคาขายฝาก</span>1,450,000บาท
										</li>
										<li>
											<CustomImage src="/ic-lo5.svg" alt="ic-lo5"
												style={
													{
														width: "30px",
														height: "auto"
													}
												}/>
											<span className="font2">11 เมษายน 2565</span>
										</li>
									</ul>
								</div>
							</div>
							<div className="badegroup row gap-2">
								<span className="badge font2 col-auto">ใกล้ห้างสรรพสินค้า</span>
								<span className="badge font2 col-auto">ใกล้แหล่งชุมชน</span>
								<span className="badge font2 col-auto">ร้านค้า</span>
								<span className="badge font2 col-auto">สวนสาธารณะ</span>
							</div>
						</div>
						{
						status !== "loading" && status === "authenticated" && (
							<>
								<div className="mt-3 fw-bold">
									<h5>จะสิ้นสุดการประมูลในอีก :</h5>
									{
									endtime && <Countdown toDate={endtime}/>
								}

									<div className="row mt-3">
										<div className="col-sm-auto h5">ระยะเวลาการประมูล:</div>
										<div className=" row col-lg-6 text-secondary">
											<div className="col-auto">
												{fromDate}</div>
											<div className="col-auto px-2">-</div>
											<div className="col-auto">
												{toDate}</div>
										</div>
										<div className="row h5 mt-3">
											<label className="col-auto">
												เปิดประมูลดอกเบี้ยสูงสุดที่:
											</label>
											<label className="col-auto">15%</label>
										</div>
										<h5 className="mt-3">ใส่ดอกเบี้ยของคุณ (%):</h5>
										<div className="row justify-content-start gap-2">
											<div className="col-auto">
												<Input onChange={
														(e) => {
															handleNumberChange(e, setBidPercent);
														}
													}
													value={
														bidPercent ?? ""
													}
													name="bid-percent"
													className="form-control front2"
													placeholder="กรุณาใส่ดอกเบี้ย"/>
											</div>
										<div className="col-sm-4">
											<Button variant="success"
												onClick={handleBid}
												className="px-5 text-nowrap">
												Bid Now
											</Button>
										</div>
									</div>
								</div>
							</div>
						</>
						)
					} </section>

					<Modal className="modal-image-gallery"
						show={galleryOpen}
						onHide={
							() => setGallery(false)
						}
						size="xl"
						centered>
						<Modal.Body>
							<div className="position-absolute top-0 end-0 p-2 bg-danger rounded-circle">
								<Button variant="close"
									onClick={
										() => setGallery(false)
								}></Button>
							</div>
							<div className="show-image">
								<CustomImage src={modalImage}
									alt="Modal Image"
									style={
										{}
									}/>
							</div>
						</Modal.Body>
					</Modal>
				</div>
			</div>
		</>
	);
}
export default PropertyPage;
