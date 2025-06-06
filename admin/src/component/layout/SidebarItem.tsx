"use client";
import style from "@/assets/css/sidebar.module.css";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UrlObject } from "node:url";
import { useMemo, useState } from "react";
import { Collapse, Row } from "react-bootstrap";

type Url = string | UrlObject;

type SidebarItemProps = {
  icon: StaticImageData;
  label: string;
  href: Url;
  secondary: any[];
};

// Inside SidebarItem component
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href,
  secondary,
}) => {
  const pathname = usePathname();
  const isActive = useMemo(() => {
    const targetPath = typeof href === "string" ? href : href.pathname;
    const isSameRoute = pathname === targetPath;
    const toIndex = pathname === "/" && targetPath === "";
    return isSameRoute || toIndex;
  }, [href, pathname]);

  const activeClassName = useMemo(
    () =>
      isActive ? `${style.sidebarItem} ${style.active}` : style.sidebarItem,
    [isActive]
  );
  return (
    <>
      <li className={activeClassName}>
        {!secondary.length ? (
          <Link className={style.sidebarLink} href={href}>
            <Image src={icon} alt={label} className={style.sidebarItemImage} />
            <span className="align-middle">{label}</span>
          </Link>
        ) : (
          <SecondaryMenu
            icon={icon}
            label={label}
            href={href}
            secondary={secondary}
          />
        )}
      </li>
    </>
  );
};

export default SidebarItem;

const SecondaryMenu: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href,
  secondary = [],
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Link
        className={style.sidebarLink}
        href="#"
        onClick={(e) => {
          e.preventDefault(), setOpen(!open);
        }}
      >
        <Image src={icon} alt={label} className={style.sidebarItemImage} />
        <span className="align-middle">{label}</span>
      </Link>
      <Collapse in={open}>
        <div>
          {secondary.map((item: any, index: number) => (
            <Link key={index} className={style.sidebarLink} href={item?.href}>
                <span className="ps-1 ms-4 align-middle">{item?.label}</span>
            </Link>
          ))}
        </div>
      </Collapse>
    </>
  );
};
