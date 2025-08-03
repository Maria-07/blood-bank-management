"use client";
import { useTranslation } from "@/src/Hook/useTranslation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardNavbar = ({ data }) => {
  const { t } = useTranslation();
  const currentRoute = usePathname();
  const { icon, link_name, link } = data;
  return (
    <div>
      {" "}
      <div className="">
        <Link
          className={
            currentRoute === link
              ? "flex items-center gap-2 rounded-md px-2  h-8 my-item-button text-sm font-medium leading-5 tracking-wide my-3 pt-1 pb-1 transition  ease-in-out duration-300 bg-soft  text-primary hover:bg-soft hover:text-primary"
              : "flex items-center gap-2 rounded-md px-2 text-dark  h-8 my-item-button text-sm font-medium leading-5 tracking-wide my-3 pt-1 pb-1 transition  ease-in-out duration-300 hover:bg-soft hover:text-primary"
          }
          href={link}
        >
          <span className="text-xl">{icon}</span>
          {t(`sidebar.${link_name.replace(/\s+/g, "").toLowerCase()}`)}
        </Link>
      </div>
    </div>
  );
};

export default DashboardNavbar;
