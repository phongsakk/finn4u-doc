"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Imagelogo from "@public/logo1.png";
import ProfileMenu from "@components/ProfileMenu";
import { useLoaderContext } from "@components/context/LoaderContext";
import { Modal } from "react-bootstrap";
import { PiList } from "react-icons/pi";

export default function Navbar() {
  const [showmenu, setShowMenu] = useState(false);
  const { pathname, session, status } = useLoaderContext();
  const CloseMenu = () => {
    setShowMenu(false);
  };

  const OpenMenu = () => {
    setShowMenu(true);
  };

  const menuItems = [
    {
      label: "หน้าแรก",
      href: "/",
    },
    {
      label: "ขาย",
      href: "/sell",
    },
    {
      label: "เช่า",
      href: "/rent",
    },
    {
      label: "ทรัพย์สินขายฝาก",
      href: "/property",
    },
    {
      label: "ผู้ขายฝาก",
      href: status === "authenticated" ? "/consignor" : "/register/consignor",
    },
    {
      label: "นักลงทุน",
      href: status === "authenticated" ? "/invester" : "/register/invester",
    },
    {
      label: "ทุนทันใจ Tips",
      href: "/tips",
    },
    {
      label: "คำถามที่พบบ่อย",
      href: "/FAQ",
    },
  ];

  return (
    <>
      <div className="navbar navbar-expand-lg navbar-main position-fixed w-100 z-3 shadow">
        <div className="container-fluid">
          <div className="logo-brand">
            <Link href="/">
              <Image
                src={Imagelogo}
                alt="logo"
                className="w-100 h-100"
                priority
              />
            </Link>
          </div>
          <ul className="d-none d-sm-none d-mb-none d-lg-flex navbar-nav px-3 justify-content-between">
            {menuItems.map((item, index) => {
              const isActive = new RegExp(`^${item.href}(/|$)`).test(pathname);
              return (
                <li
                  className={`nav-item ${isActive ? "nav-active" : ""}`}
                  key={index}
                >
                  <Link
                    className="nav-link"
                    aria-current="page"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="d-flex">
            <ProfileMenu session={session} />
            <Button
              className="ms-2 d-mb-block d-lg-none border"
              variant=""
              onClick={OpenMenu}
            >
              <PiList size={25} />
            </Button>
          </div>
        </div>
      </div>
      <Modal show={showmenu} onHide={CloseMenu} fullscreen>
        <Modal.Header className="text-center" closeButton>
          <h3 className="text-primary fw-bold">ทุนทันใจ</h3>
        </Modal.Header>
        <Modal.Body>
          <ul className="navbar-nav justify-content-between">
            {menuItems.map((item, index) => {
              const isActive = new RegExp(`^${item.href}(/|$)`).test(pathname);
              return (
                <li
                  className={`nav-item ${isActive ? "nav-active" : ""} border-bottom`}
                  key={index}
                >
                  <Link
                    className="nav-link"
                    aria-current="page"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
}
