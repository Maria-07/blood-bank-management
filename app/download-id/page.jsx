/* eslint-disable @next/next/no-img-element */
"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import { FaDownload } from "react-icons/fa6";
import logo from "@/src/assets/Image/logo/lightLogo.png";
import UserInfo from "@/src/Hook/UserInfo";
import { Image } from "antd";
import { useTranslation } from "@/src/Hook/useTranslation";

const DownloadId = () => {
  const user = UserInfo();
  const myRef = useRef(null);

  const { t } = useTranslation();

  const handleDownloadPDF = async () => {
    const input = myRef.current;

    // Wait for all images to load before capture
    await Promise.all(
      Array.from(input.querySelectorAll("img")).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve(true);
            else img.onload = img.onerror = () => resolve(true);
          })
      )
    );

    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("download.pdf");
    });
  };

  const imageUrl = user?.imageUrl
    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${user.imageUrl}`
    : "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg";

  return (
    <div className="sm:w-[30%] mx-auto p-5">
      {/* Download Button */}
      <div className="my-2 flex items-center justify-end mr-[23%]">
        <button onClick={handleDownloadPDF} className="text-primary text-xl">
          <FaDownload />
        </button>
      </div>

      {/* Section to Convert into PDF */}
      <div
        ref={myRef}
        className="mx-auto my-auto flex items-center justify-center"
      >
        <div className="w-[340px] bg-gradient-to-br shadow-2xl rounded-2xl overflow-hidden border-2 border-primary2 relative">
          {/* Top Bar with Logo and Title */}
          <div className="flex items-center justify-between px-5 py-3 bg-primary2 rounded-t-2xl">
            <img
              src={logo.src}
              alt="Logo"
              className="w-10 h-10 object-contain bg-white rounded-full border-2 border-white shadow"
            />
            <span className="text-white font-extrabold text-2xl tracking-wider drop-shadow">
              হিমোগ্লোবিন
            </span>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center relative pt-4 pb-2">
            <div className="relative">
              <div className="relative w-[100px] h-[100px] flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary2 to-secondary opacity-20 z-0"></div>
                <Image
                  className="relative z-10 border-4 border-primary2 rounded-full bg-white shadow-xl"
                  src={imageUrl}
                  width={100}
                  height={100}
                  alt="Profile"
                  unoptimized
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Decorative ring */}
              <span className="absolute -inset-1 rounded-full border-2 border-secondary opacity-30"></span>
            </div>
            <h2 className="mt-3 text-xl font-bold text-primary2">
              {user?.fullName}
            </h2>
            <p className="text-accent text-sm font-medium">{user?.userType}</p>
          </div>

          {/* Details Section */}
          <div className="relative px-7 py-4">
            {/* Watermark Logo */}
            <img
              src={logo.src}
              alt="Logo Watermark"
              className="absolute opacity-10 w-40 h-40 object-contain pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                zIndex: 0,
              }}
            />
            <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-2 text-[15px] text-gray-800 font-medium">
              <div>
                <span className="block text-xs text-gray-400">
                  {t("id.id")}
                </span>
                <span className="font-semibold text-primary2">
                  #{user?.code}
                </span>
              </div>
              <div>
                <span className="block text-xs text-gray-400">
                  {t("id.gender")}
                </span>
                <span>{user?.gender}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-400">
                  {t("id.blood")}
                </span>
                <span className="font-semibold text-red-600">
                  {user?.bloodGroup}
                </span>
              </div>
              <div>
                <span className="block text-xs text-gray-400">
                  {t("id.phone")}
                </span>
                <span>{user?.mobileNumber}</span>
              </div>
              <div className="col-span-2">
                <span className="block text-xs text-gray-400">
                  {t("id.institute")}
                </span>
                <span>{user?.instituteName || "N/A"}</span>
              </div>
              <div className="col-span-2">
                <span className="block text-xs text-gray-400">
                  {t("id.address")}
                </span>
                <span>{user?.address || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-primary2 to-secondary py-2 px-4 rounded-b-2xl">
            <p className="text-[13px] text-center text-white font-semibold tracking-wide">
              {t("id.quote")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadId;
