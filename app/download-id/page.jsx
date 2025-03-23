"use client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import { FaDownload } from "react-icons/fa6";
import logo from "@/src/assets/Image/logo/darkLogo.png";
import UserInfo from "@/src/Hook/UserInfo";
import { Image } from "antd";

const DownloadId = () => {
  const user = UserInfo();
  console.log(user);

  const contentRef = useRef();

  const handleDownloadPDF = () => {
    const input = contentRef.current;
    const scale = window.devicePixelRatio || 2; // Higher scale for better resolution

    html2canvas(input, { scale, backgroundColor: null }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      // Get A4 dimensions
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
      pdf.save("download.pdf");
    });
  };

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
        ref={contentRef}
        className="mx-auto my-auto flex items-center justify-center"
      >
        <div className="w-64 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-300 relative">
          {/* Top Blue Section with Wave */}
          <div className="relative">
            <div className="bg-primary2 p-3 w-full rounded-t-lg flex items-center justify-center relative gap-3">
              <Image
                src={logo}
                width={50}
                height={50}
                className="rounded-full"
                alt="Logo"
                preview={false}
              />
              <div className="text-end">
                <h1 className="font-primary text-xs font-bold text-primary">
                  WELCOME To হিমোগ্লোবিন
                </h1>
                <span className="text-[11px]">
                  মানবতার শ্রেষ্ঠ দান, রক্ত দিয়ে বাচাই প্রাণ
                </span>
              </div>
            </div>

            {/* Profile Picture */}
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2">
              <Image
                className="border rounded-full"
                src={
                  user?.imageUrl
                    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${user.imageUrl}`
                    : "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                }
                width={70}
                height={70}
                preview={false}
                alt="User Profile"
                crossOrigin="anonymous"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="text-center mt-12 mb-2">
            <h2 className="text-lg font-bold">{user?.fullName}</h2>
            <p className="text-gray-500 text-sm">Volunteer</p>
          </div>

          {/* Details */}
          <div className="flex items-center justify-center">
            <div className="mt-4 space-y-2 text-sm text-gray-700 px-3">
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
                {user?.instituteName}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {user?.address || "abc def, sdjsah"}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-7">
            <p className="text-[12px] py-[3px] text-center bg-primary2 rounded-sm">
              মানবতার শ্রেষ্ঠ দান, রক্ত দিয়ে বাচাই প্রাণ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadId;
