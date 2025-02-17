"use client";
import {useState} from 'react';
import Link from "next/link"
import Image from "next/image"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function Navbar() {
	const [navbarOpen, setNavOpen] = useState(false);
	const [regisOpen, setRegisOpen] = useState(false);

	return (
		<>
			<Modal className='font2 modallogin' size="lg"
				show={regisOpen}
				onHide={
					() => setRegisOpen(false)
				}
				centered>
				<div className="row">
					<div className="col-lg-4">
						<div className="left">
							<h2 className="font2">เข้าใช้งาน</h2>
							<h2 className="font2">อย่างไร้กังวล</h2>
							<div className="list">
								<Image src="/log1.svg" alt='log1'
									width={100}
									height={100}
									sizes='100vm'
									style={
										{
											height: "auto"
										}
									}
									priority/>
								<span className="font2">เรารักษาข้อมูลของคุณเป็นความลับสูงสุด</span>
							</div>
							<div className="list">
								<Image src="/safe.svg" alt='safe'
									width={100}
									height={100}
									sizes='100vm'
									style={
										{
											height: "auto"
										}
									}
									priority/>
								<span>ระบบรักษาความปลอดภัยที่ธนาคารยอมรับ</span>
							</div>

							<div className="text-center">
								<Image src="/office.png" alt='office'
									width={100}
									height={100}
									sizes='100vm'
									style={
										{
											height: "auto"
										}
									}
									priority/>
							</div>
						</div>
					</div>
					<div className="col-lg-8">
						<div className="right">
							<h4 className="title">เข้าสู่ระบบ</h4>
							<div className="mb-3">
								<label className="form-label font2">อีเมล</label>
								<input type="email" className="form-control font2" id="form1" aria-describedby="email"/>
							</div>
							<div className="mb-3">
								<div className="forgotpass">
									<label className="form-label font2">รหัสผ่าน</label>
									<span data-bs-toggle="modal" data-bs-target="#modalforgot">ลืมรหัสผ่าน?</span>
								</div>
								<input type="password" className="form-control" id="exampleInputPassword1"/>
							</div>

							<Link className="btn btn-primary font2"
								onClick={
									() => setRegisOpen(false)
								}
								href="/registerseller">เข้าสู่ระบบ</Link>

							<div className="or">
								<span></span>
								<small>Or log in with</small>
								<span></span>
							</div>

							<div className="link">
								<a href="" className="btn btn-secondary">
									<Image src="/googleee.svg" alt='googleee'
										width={100}
										height={100}
										sizes='100vm'
										style={
											{
												height: "auto"
											}
										}
										priority/>
									<span>Facebook</span>
								</a>
								<a href="" className="btn btn-secondary">
									<Image src="/faceeee.svg" alt='faceeee'
										width={100}
										height={100}
										sizes='100vm'
										style={
											{
												height: "auto"
											}
										}
										priority/>
									<span>Google</span>
								</a>
							</div>
							<div className="line"></div>
							<div className="regis">
								<span className="text-secondary">ยังไม่เคยใช้บริการ ?</span>
								<Link href="/registerseller" className="text-primary">สมัครที่นี่</Link>
							</div>
						</div>
					</div>
				</div>
			</Modal>

			<div className="navbar navbar-expand-lg navbar-main">
				<div className="container-fluid">
					<Link className="navbar-brand" href="/">
						<Image src="/logo1.png" alt="Logo 1"
							width={100}
							height={100}
							quality={100}
							sizes="100vw"
							style={
								{
									height: "auto"
								}
							}
							priority/>
					</Link>
					<Button className="navbar-toggler"
						onClick={
							() => setNavOpen(!navbarOpen)
						}
						type="button"
						variant="secondary"
						aria-controls="navbarSupportedContent"
						aria-expanded={navbarOpen}>
						<span className="navbar-toggler-icon"></span>
					</Button>
					<Collapse in={navbarOpen}>
						<div className="navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								<li className="nav-item">
									<Link className="nav-link active" aria-current="page" href="#">หน้าแรก</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="#">ขาย</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="#">เช่า</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="#">ทรัพย์สินขายฝาก</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="#">ผู้ขายฝาก</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="#">นักลงทุน</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="#">Finn Tips</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="#">คำถามที่พบบ่อย</Link>
								</li>
							</ul>
							<div className="d-flex register">
								<div className="nav-item">
									<Link className="nav-link" href="#">ลงทะเบียน</Link>
								</div>
								<Link className='btn btn-register d-flex align-items-center' href="#"
									onClick={
										(e) => {
											e.preventDefault();
											setRegisOpen(true);
										}
								}>
									<p>เข้าสู่ระบบ</p>
									<Image src="/register.svg" alt="register"
										width={26}
										height={26}
										priority/>
								</Link>
							</div>
						</div>
					</Collapse>
				</div>
			</div>
		</>

	)
}
export default Navbar
