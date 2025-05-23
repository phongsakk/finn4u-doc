"use client";
import Image from "next/image";
import React from "react";
import imagePro from "@public/user3.png";
import { Row } from "react-bootstrap";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useLoaderContext } from "./context/LoaderContext";
const menu = [
  {
    name: "ข้อมูลส่วนตัว",
    href: "/profile",
  },
  {
    name: "ประกาศของฉัน",
    href: "/profile/announcement",
  },
  {
    name: "เปลี่ยนรหัสผ่าน",
    href: "/profile/changepassword",
  },
];

function ProfileSide() {
  const { pathname } = useLoaderContext();
  return (
    <div className="rounded border p-3 bg-white">
      <Row className="align-items-center px-3 mb-3">
        <Image
          src={imagePro}
          alt=""
          className="col-3 object-fit-cover"
          width={100}
          height={100}
          style={{
            width: "70px",
            height: "auto",
          }}
          sizes="100vm"
          property=""
        />
        <h4 className="col-9 mb-0 fw-bold px-0">อาเนีย ฟอร์เจอร์</h4>
      </Row>
      <Row className="mb-3">
        <div className="col-3 text-secondary fw-bold">ID:</div>
        <div className="col-9">1234567890</div>
        <div className="col-3 text-secondary fw-bold">Email:</div>
        <div className="col-9 text-wrap">Anya_forger@gmail.com</div>
        <div className="col-3 text-secondary fw-bold">Phone:</div>
        <div className="col-9">080-123-4567</div>
      </Row>
      <hr />
      <div className="profile-side">
        {menu?.map((item: any, index) => (
          <Link
            key={index}
            href={item?.href}
            className={item.href == pathname ? "active" : ""}
          >
            {item?.name}
          </Link>
        ))}
        <Link href="#" onClick={() => signOut()}>
          ออกจากระบบ
        </Link>
      </div>
    </div>
  );
}

export default ProfileSide;
