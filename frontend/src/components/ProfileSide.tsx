"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import imagePro from "@public/user3.png";
import { Row } from "react-bootstrap";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useLoaderContext } from "./context/LoaderContext";
import axios from "axios";
import { api } from "@utils/api/index";
import ImageApi from "./ImageApi";
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
  const { pathname, user } = useLoaderContext();
  return (
    <div className="rounded border p-3 bg-white">
      <Row className="align-items-center px-3 mb-3">
        <div
          className="col-3 px-0 overflow-hidden object-fit-cover rounded-circle bg-secondary me-2"
          style={{
            width: "50px",
            height:"50px"
          }}
        >
          <ImageApi src={user?.image || "/"}/>
        </div>

        <h4 className="col-9 mb-0 fw-bold px-0">
          {user.firstname} {user.lastname}
        </h4>
      </Row>
      <Row className="mb-3">
        <div className="col-3 text-secondary fw-bold">ID:</div>
        <div className="col-9">1234567890</div>
        <div className="col-3 text-secondary fw-bold">Email:</div>
        <div className="col-9 text-wrap">{user.email}</div>
        <div className="col-3 text-secondary fw-bold">Phone:</div>
        <div className="col-9">{user.phone_number}</div>
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
