"use client";
import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import CustomImage from "@components/CustomImage";
import {signOut, useSession} from "next-auth/react";
import Login from "./Login";
export default function Navbar() {
	const [navbarOpen, setNavOpen] = useState(false);
	const [regisOpen, setRegisOpen] = useState(false);

	const {data: session, status} = useSession();

	return (
		<> {
			!session && (
				<Modal className="font2 modallogin" size="lg"
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
									<CustomImage src="/log1.svg" alt="log1"
										style={
											{
												height: "auto"
											}
										}/>
									<span className="font2">
										เรารักษาข้อมูลของคุณเป็นความลับสูงสุด
									</span>
								</div>
								<div className="list">
									<CustomImage src="/safe.svg" alt="safe"
										style={
											{
												height: "auto"
											}
										}/>
									<span>ระบบรักษาความปลอดภัยที่ธนาคารยอมรับ</span>
								</div>

								<div className="text-center">
									<CustomImage src="/office.png" alt="office"
										style={
											{
												height: "auto"
											}
										}/>
								</div>
							</div>
						</div>
						<div className="col-lg-8">
							<Login/>
						</div>
					</div>
				</Modal>
			)
		}


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
									<Link className="nav-link active" aria-current="page" href="#">
										หน้าแรก
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="#">
										ขาย
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="#">
										เช่า
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="/property-sale">
										ทรัพย์สินขายฝาก
									</Link>
								</li>
								{
								status !== "loading" && status === "authenticated" && (
									<li className="nav-item">
										<Link className="nav-link" href="/consignment">
											ผู้ขายฝาก
										</Link>
									</li>
								)
							}
								<li className="nav-item">
									<Link className="nav-link" href="#">
										นักลงทุน
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="#">
										Finn Tips
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="#">
										คำถามที่พบบ่อย
									</Link>
								</li>
							</ul>
							{
							status !== "loading" && (status === "authenticated" ? (
								<div className="d-flex register">
									<Link className="btn btn-register d-flex align-items-center" href="#"
										onClick={
											(e) => {
												e.preventDefault();
												signOut();
											}
									}>
										<p>{
											session ?. user ?. name
										}</p>
										<Image src="/register.svg" alt="register"
											width={26}
											height={26}
											priority/>
									</Link>
								</div>
							) : (
								<div className="d-flex register">
									<div className="nav-item">
										<Link className="nav-link" href="#">
											ลงทะเบียน
										</Link>
									</div>
									<Link className="btn btn-register d-flex align-items-center" href="#"
										onClick={
											(e) => {
												e.preventDefault();
												setRegisOpen(true);
											}
									}
									>
										<p>เข้าสู่ระบบ</p>
										<Image src="/register.svg" alt="register"
											width={26}
											height={26}
											priority/>
									</Link>
								</div>
							))
						} </div>
					</Collapse>
				</div>
			</div>
		</>
	);
}
