"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Imagelogo from "@public/logo1.png";
import ProfileMenu from "@components/ProfileMenu";
import { useLoaderContext } from "@components/context/LoaderContext";

export default function Navbar() {
  const [navbarOpen, setNavOpen] = useState(false);
  const { pathname, session, status } = useLoaderContext();

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
      label: "Finn Tips",
      href: "/tips",
    },
    {
      label: "คำถามที่พบบ่อย",
      href: "/FAQ",
    },
  ];

  return (
    <>
      <div className="navbar navbar-expand-lg navbar-main">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <Image src={Imagelogo} alt="logo" priority />
          </Link>
          <Button
            className="navbar-toggler"
            onClick={() => setNavOpen(!navbarOpen)}
            type="button"
            variant="secondary"
            aria-controls="navbarSupportedContent"
            aria-expanded={navbarOpen}
          >
            <span className="navbar-toggler-icon"></span>
          </Button>

          <Collapse in={navbarOpen}>
            <div className="navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {menuItems.map((item, index) => {
                  const isActive = new RegExp(`^${item.href}(/|$)`).test(
                    pathname
                  );

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
              <ProfileMenu session={session} />
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
}
