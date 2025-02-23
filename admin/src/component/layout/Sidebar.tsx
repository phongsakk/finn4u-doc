import React from 'react'
import Finn4ULogo from "@/assets/img/finn4u-logo.png"
import Icon1 from "@/assets/img/icon1.png";
import Icon2 from "@/assets/img/icon2.png";
import Icon3 from "@/assets/img/icon3.png";
import Icon4 from "@/assets/img/icon4.png";
import Icon5 from "@/assets/img/icon5.png";
import Icon6 from "@/assets/img/icon6.png";
import Icon7 from "@/assets/img/icon7.png";
import Icon8 from "@/assets/img/icon8.png";
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link';
import type { UrlObject } from 'url';

type Url = string | UrlObject;

type SidebarItemProps = {
	icon: StaticImageData;
	label: string;
	isActive?: boolean;
	href: Url;
}
const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href, isActive = false }) => {
	return (
		<>
			<li className={isActive ? "sidebar-item active" : "sidebar-item"}>
				<Link className="sidebar-link" href={href}>
					<Image src={icon} className="a" alt={label} />
					<span className="align-middle">{label}</span>
				</Link>
			</li>
		</>
	)
}

const Sidebar = () => {
	return (
		<nav id="sidebar" className="sidebar js-sidebar">
			<div className="sidebar-content js-simplebar">

				<a className="sidebar-brand" href="index.php">
					<Image src={Finn4ULogo} className="a w-100 img-fluid" alt="" />
				</a>

				<ul className="sidebar-nav">
					<SidebarItem icon={Icon1} label="Overview" href="/" />
					<SidebarItem icon={Icon2} label="Matching" href="/matching" />
					<SidebarItem icon={Icon3} label="ผู้ขายฝาก" href="consigment" />
					<SidebarItem icon={Icon4} label="นักลงทุน" href="invester" />
					<SidebarItem icon={Icon5} label="ทรัพย์สินขายฝาก" href="property" />
					<SidebarItem icon={Icon6} label="Dashboard" href="dashboard" />
					<SidebarItem icon={Icon7} label="การตั้งค่า" href="/" />
					<SidebarItem icon={Icon8} label="ออกจากระบบ" href="/" />
				</ul>
			</div>
		</nav>
	)
}

export default Sidebar