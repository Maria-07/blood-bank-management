/* eslint-disable @next/next/no-img-element */
"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import { FaDownload } from "react-icons/fa6";
import logo from "@/src/assets/Image/logo/lightLogo.png";
import UserInfo from "@/src/Hook/UserInfo";

const DownloadId = () => {
  const user = UserInfo();
  const myRef = useRef(null);

  const handleDownloadPDF = async () => {
    const input = myRef.current;
    if (!input) return;

    // Wait for images to load
    await Promise.all(
      Array.from(input.querySelectorAll("img")).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve(true);
            else img.onload = img.onerror = () => resolve(true);
          })
      )
    );

    // Add PDF style mode
    input.classList.add("pdf-mode");

    const scale = window.devicePixelRatio || 2;

    html2canvas(input, {
      scale,
      useCORS: true,
      backgroundColor: null,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        "FAST"
      );
      pdf.save("id_card.pdf");

      // Remove PDF mode styles
      input.classList.remove("pdf-mode");
    });
  };

  const imageUrl =
    user?.imageUrl && process.env.NEXT_PUBLIC_IMAGE_BASE_URL
      ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${user.imageUrl}`
      : "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg";

  return (
    <div className="sm:w-[30%] mx-auto p-5">
      {/* Download Button */}
      <div className="my-2 flex items-center justify-end mr-[26%]">
        <button onClick={handleDownloadPDF} className="text-primary text-xl">
          <FaDownload />
        </button>
      </div>

      {/* Section to Convert into PDF */}
      <div
        ref={myRef}
        className="mx-auto my-auto flex items-center justify-center"
      >
        <div className="w-64 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-300 relative">
          {/* Top Header */}
          <div className="bg-primary2 p-3 w-full rounded-t-lg text-center text-white font-bold text-xl pb-12">
            হিমোগ্লোবিন
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center mt-[-40px]">
            <img
              className="border rounded-full bg-white p-[1px]"
              src={imageUrl}
              width="80"
              height="80"
              alt="User"
              crossOrigin="anonymous"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* User Info */}
          <div className="text-center mt-2 mb-2">
            <h2 className="text-lg font-bold">{user?.fullName}</h2>
            <p className="text-gray-500 text-sm">{user?.userType}</p>
          </div>

          {/* Details */}
          <div className="relative flex items-center justify-center">
            {/* Watermark Logo in Background */}
            <img
              src={logo.src}
              alt="Logo Watermark"
              className="absolute opacity-20 w-32 h-32 object-contain pointer-events-none"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <div className="mt-4 space-y-2 text-sm text-gray-700 px-10 text-left">
              <p>
                <span className="font-semibold">ID NO:</span> #{user?.code}
              </p>
              <p>
                <span className="font-semibold">Gender:</span> {user?.gender}
              </p>
              <p>
                <span className="font-semibold">Blood:</span> {user?.bloodGroup}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {user?.mobileNumber}
              </p>
              <p>
                <span className="font-semibold">Institute Name:</span>{" "}
                {user?.instituteName || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {user?.address || "N/A"}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5">
            <p className="text-[12px] py-[3px] pb-5 text-center bg-primary2 text-white rounded-sm">
              মানবতার শ্রেষ্ঠ দান, রক্ত দিয়ে বাচাই প্রাণ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadId;
