"use client"
import style from "@/assets/css/sidebar.module.css";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UrlObject } from "node:url";
import { useMemo } from "react";

type Url = string | UrlObject;

type SidebarItemProps = {
  icon: StaticImageData;
  label: string;
  href: Url;
}

// Inside SidebarItem component
const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href }) => {
  const pathname = usePathname();
  const isActive = useMemo(() => {
    const targetPath = typeof href === 'string' ? href : href.pathname;
    const isSameRoute = pathname === targetPath
    const toIndex = (pathname === '/' && targetPath === '')
    return isSameRoute || toIndex;
  }, [href, pathname]);

  const activeClassName = useMemo(() =>
    isActive ? `${style.sidebarItem} ${style.active}` : style.sidebarItem,
    [isActive]
  );
  return (
    <>
      <li className={activeClassName}>
        <Link className={style.sidebarLink} href={href}>
          <Image src={icon} alt={label} className={style.sidebarItemImage} />
          <span className="align-middle">{label}</span>
        </Link>
      </li>
    </>
  )
}

export default SidebarItem;