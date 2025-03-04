"use client";
import CustomImage from "@components/CustomImage";
import {useSession} from "next-auth/react";
import Link from "next/link";

function Banner() {
	const {data: session, status} = useSession();
	var showConButton = true;
	var showInvButton = true;

	if (status === "authenticated") {
		if (session ?. user && "role" in session.user) {
			if ((session.user).role === "consignment") {
				showConButton = false;
			}

			if ((session.user).role === "investment") {
				showInvButton = false;
			}
		}

	}

	return (
		<div className="register-banner">
			<CustomImage src="/banner-home-emp.png" alt="banner-home-emp"/> {
			 status !=="loading" && showConButton == true && (
				<Link className="btn btn-white" href="/consignment-register">
					ลงทะเบียนเป็น ผู้ขายฝาก
				</Link>
			)
		}
			{
			status !=="loading" && showInvButton === true && (
				<Link className="btn btn-white" href="/investment-register">
					ลงทะเบียนเป็น นักลงทุน
				</Link>
			)
		} </div>
	);
}
export default Banner;
