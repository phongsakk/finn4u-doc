"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Link from "next/link";
import { useLoaderContext } from "./context/LoaderContext";
import { BsHouseAdd } from "react-icons/bs";
import { BsPersonFillAdd } from "react-icons/bs";
import ImageApi from "./ImageApi";

function ProfileMenu({ session }: { session: any }) {
  const [splBtn, setSplBtn] = useState<any>(undefined);
  const { pathname, path, user, openModal } = useLoaderContext();
  console.log(user);
  useEffect(() => {
    if (user.role == "general") {
      setSplBtn({ name: "ลงประกาศ", href: "/", status: true });
    }
  }, [user.role]);
  return (
    <>
      {session && (
        <>
          {splBtn?.status && (
            <Link
              className="btn btn-success text-white me-2"
              href="/profile/announcement/new"
            >
              <span className="d-none d-sm-none d-mb-block d-lg-block">
                ลงประกาศ
              </span>
              <BsHouseAdd
                className="d-block d-sm-block d-mb-none d-lg-none"
                size={25}
              />
            </Link>
          )}
          <Dropdown className="d-flex justify-content-center profile-menu">
            <Dropdown.Toggle variant="register">
              <span className="d-none d-sm-none d-md-none d-lg-block profile-name text-truncate">
                {user.firstname}
              </span>
              <div
              className="overflow-hidden rounded-circle border"
                style={{
                  width: "25px",
                  height: "25px",
                }}
              >
                <ImageApi
                  src={user?.image || "/"}
                  alt="register"
                />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                href={"/profile"}
                className="border-bottom border-white"
              >
                ข้อมูลส่วนตัว
              </Dropdown.Item>
              <Dropdown.Item
                href={"/profile/announcement"}
                className="border-bottom border-white"
              >
                ประกาศของฉัน
              </Dropdown.Item>
              <Dropdown.Item href="#" className="border-bottom border-white">
                เปลี่ยนรหัสผ่าน
              </Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => signOut()}>
                ออกจากระบบ
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      )}

      {!session && (
        <div className="d-flex register">
          <div
            className={`nav-item ${
              pathname === "/register" ? "nav-active" : ""
            }`}
          >
            <Link className="nav-link" href="/register">
              <span className="d-none d-sm-none d-mb-block d-lg-block">
                ลงทะเบียน
              </span>
              <BsPersonFillAdd
                className="d-block d-sm-block d-mb-none d-lg-none text-primary"
                size={25}
              />
            </Link>
          </div>
          <Link
            className="btn btn-register d-flex align-items-center"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openModal("login");
            }}
          >
            <p className="d-none d-sm-none d-md-none d-lg-block">เข้าสู่ระบบ</p>
            <Image
              src="/register.svg"
              alt="register"
              width={26}
              height={26}
              priority
            />
          </Link>
        </div>
      )}
    </>
  );
}

export default ProfileMenu;
