"use client"
import React from 'react'
import Image from 'next/image'
import Finn4ULogo from "@assets/img/finn4u-logo.png"
import style from "@assets/css/sidebar.module.css";

import Icon1 from "@assets/img/icon1.png";
import Icon2 from "@assets/img/icon2.png";
import Icon3 from "@assets/img/icon3.png";
import Icon4 from "@assets/img/icon4.png";
import Icon5 from "@assets/img/icon5.png";
import Icon6 from "@assets/img/icon6.png";
import Icon7 from "@assets/img/icon7.png";
import Icon8 from "@assets/img/icon8.png";
import SidebarItem from "@component/layout/SidebarItem"
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const sidebarItems = [
	{ icon: Icon1, label: "Overview", href: "/", isActive: false },
	{ icon: Icon2, label: "Matching", href: "/matching", isActive: false },
	{ icon: Icon3, label: "ผู้ขายฝาก", href: "/consigment", isActive: false },
	{ icon: Icon4, label: "นักลงทุน", href: "/invester", isActive: false },
	{ icon: Icon5, label: "ทรัพย์สินขายฝาก", href: "/property", isActive: false },
	{ icon: Icon6, label: "Dashboard", href: "/dashboard", isActive: false },
	{ icon: Icon7, label: "การตั้งค่า", href: "/setting", isActive: false },
	// { icon: Icon8, label: "ออกจากระบบ", href: "/logout", isActive: false }
]

const Sidebar = () => {
	return (
		<nav id="sidebar" className="sidebar js-sidebar">
			<div className="sidebar-content js-simplebar">
				<a className="sidebar-brand" href="index.php">
					<Image src={Finn4ULogo} className="a w-100 img-fluid" alt="" />
				</a>

				<ul className="sidebar-nav">
					{sidebarItems.map(({ href, icon, label, isActive }) => (
						<SidebarItem
							key={href}
							icon={icon}
							label={label}
							href={href}
						/>
					))}

					<li className={style.sidebarItem}>
						<Link className={style.sidebarLink} href="/logout"
							onClick={
								(e) => {
									e.preventDefault();
									signOut({
										redirectTo: "/auth/login"
									});
								}} >
							<Image src={Icon8} alt="ออกจากระบบ" className={style.sidebarItemImage} />
							<span className="align-middle">ออกจากระบบ</span>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Sidebar