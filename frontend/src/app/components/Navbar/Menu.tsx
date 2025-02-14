"use client";
import {useState} from "react"
import Link from "next/link"
import Image from "next/image"
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function Menu() {
    const [open, setOpen] = useState(false);

	return (
		<>
			<Button className="navbar-toggler"
				onClick={
					() => setOpen(!open)
				}
				type="button"
				variant="secondary"
				aria-controls="navbarSupportedContent"
				aria-expanded={open}>
				<span className="navbar-toggler-icon"></span>
			</Button>
			<Collapse in={open}>
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
						<Link className="btn btn-register" href="#">
							<p>เข้าสู่ระบบ</p>
							<Image src="/register.svg" alt="register"
								width={26}
								height={26}
								priority/>
						</Link>
					</div>
				</div>
			</Collapse>
		</>
	)
}
export default Menu