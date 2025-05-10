"use client";
import CustomImage from "@components/CustomImage";
import { useSession } from "next-auth/react";
import Link from "next/link";
import banner from "@public/banner-home-emp.png";
import Image from "next/image";

function Banner() {
  const { data: session, status } = useSession();
  var showConButton = true;
  var showInvButton = true;

  if (status === "authenticated") {
    // if (session?.user && "role" in session.user) {
    // if (session.user.role === "consignment") {
    //     showConButton = false;
    // }

    // if (session.user.role === "investment") {
    //     showInvButton = false;
    // }
    // }
    showConButton = false;
    showInvButton = false;
  }

  return (
    <div className="register-banner">
      <div className="row gap-1 position-absolute justify-content-between w-100">
        {status !== "loading" && showConButton == true ? (
          <div className="col text-center text-nowrap">
            <Link className="btn btn-white" href="/register/consignor">
              ลงทะเบียนเป็น ผู้ขายฝาก
            </Link>
          </div>
        ) : (
          <div className="col d-none d-lg-block"></div>
        )}
        <div className="col d-none d-lg-block"></div>
        <div className="col text-center text-nowrap">
          {status !== "loading" && showInvButton === true && (
            <Link className="btn btn-white bg-black" href="/register/invester">
              ลงทะเบียนเป็น นักลงทุน
            </Link>
          )}{" "}
        </div>
      </div>
      <Image src={banner} alt="banner-home-emp" priority/>
    </div>
  );
}
export default Banner;
