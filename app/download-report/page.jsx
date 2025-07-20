/* eslint-disable @next/next/no-img-element */
"use client";
import UserInfo from "@/src/Hook/UserInfo";
import { Image } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import logo from "@/src/assets/Image/logo/lightLogo.png";
import {
  FaDownload,
  FaHandHoldingHeart,
  FaRegHandBackFist,
} from "react-icons/fa6";
import { useTranslation } from "@/src/Hook/useTranslation";

const DownloadReport = () => {
  const user = UserInfo();
  const admin = "admin";
  const record = {};
  const { t } = useTranslation();

  const {
    address,
    bloodDonationCount,
    bloodDonationStatus,
    bloodGroup,
    dateOfBirth,
    campaignId,
    districtName,
    fatherName,
    fullName,
    gender,
    id,
    code,
    createTime,
    lastDonationTime,
    mobileNumber,
    motherName,
    password,
    profilePicture,
    union,
    unionName,
    upazila,
    PhysicalComplexity,
    upazilaName,
    userType,
  } = user || {};

  const contentRef = useRef();

  // Construct the full image URL or fallback
  const imageUrl = user?.imageUrl
    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${user.imageUrl}`
    : "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg";

  const handleDownloadPDF = async () => {
    const input = contentRef.current;

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

    html2canvas(input, { scale: 2, useCORS: true, logging: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("download.pdf");
      })
      .catch((error) => {
        console.error("Error in rendering the PDF:", error);
      });
  };

  return (
    <div className="sm:w-[40%] mx-auto ">
      {/* Download Button */}
      <div className="my-2 flex items-center justify-end ">
        {" "}
        <button onClick={handleDownloadPDF} className=" text-primary text-xl ">
          <FaDownload />
        </button>
      </div>
      <div
        ref={contentRef}
        className="border rounded-md shadow-md p-3 mt-5 mb-10"
      >
        <div className="w-full rounded-t-lg bg-gradient-to-r from-primary2 to-primary p-6 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block bg-white/20 rounded-full px-4 py-2 text-2xl font-extrabold text-white shadow">
                {t("report.title")}
              </span>
            </div>
            {/* <div className="w-full flex justify-center">
              <h2 className="text-lg font-semibold text-white/90 mb-1 tracking-wide">
                {t("report.reportTitle")}
              </h2>
            </div> */}
            <p className="text-sm text-white/80 mt-2">{t("report.subtitle")}</p>
          </div>
        </div>

        <div className="bg-gray-200 pt-[1px] my-3"></div>

        <div className="space-y-6">
          {/* Header Card */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between border-[1px] border-primary2/20 bg-white p-5 rounded-lg shadow mb-4 gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="h-[100px] w-[100px] overflow-hidden rounded-full border-2 border-primary2/20 shadow">
                <Image
                  className="object-cover w-full h-full"
                  src={imageUrl}
                  width={100}
                  height={100}
                  alt="Profile"
                  unoptimized
                />
              </div>
              <h6 className="text-xs text-gray-400 mt-2">#{code}</h6>
            </div>
            {/* User Info */}
            <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
              <div>
                <h1 className="text-2xl font-bold text-primary2 mb-1">
                  {fullName}
                </h1>
                <div className="">
                  <h1 className="text-sm font-semibold text-accent bg-accent/10 px-2 py-1 rounded w-full">
                    {userType}
                  </h1>

                  <h1 className="text-sm text-gray-600 my-1">{address}</h1>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-accent font-medium">
                  {campaignId === null || campaignId === ""
                    ? t("report.registeredDate")
                    : t("report.testDate")}
                </span>
                <span className="text-base font-semibold">
                  {createTime?.split("T")[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Main Details Section */}
          <div className="relative bg-white rounded-lg shadow p-6 overflow-hidden">
            {/* Watermark Logo */}
            <img
              src={logo.src}
              alt="Logo Watermark"
              className="absolute opacity-10 w-72 h-72 object-contain pointer-events-none"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 0,
              }}
            />
            <div className="relative z-10">
              {/* Personal Information */}
              <div className="mb-6">
                <h2 className="font-semibold text-lg text-primary2 mb-4 border-b border-primary2/20 pb-2">
                  {t("report.personalInformation")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs text-accent">
                      {t("report.fullName")}
                    </span>
                    <span className="block text-base font-semibold">
                      {fullName}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-accent">
                      {t("report.mobileNumber")}
                    </span>
                    <span className="block text-base font-semibold">
                      {mobileNumber}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-accent">
                      {t("report.dob")}
                    </span>
                    <span className="block text-base font-semibold">
                      {dateOfBirth}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-accent">
                      {t("report.gender")}
                    </span>
                    <span className="block text-base font-semibold">
                      {gender}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-accent">
                      {t("report.physicalComplexity")}
                    </span>
                    <span className="block text-base font-semibold">
                      {PhysicalComplexity
                        ? PhysicalComplexity
                        : t("profile.no")}
                    </span>
                  </div>
                  {/* NID Details (Admin only) */}
                  {admin && record?.nidUrls?.length > 0 && (
                    <div className="md:col-span-2">
                      <span className="block text-xs text-accent">
                        {t("report.nidDetails")}
                      </span>
                      <div className="flex flex-wrap items-center mt-2 gap-2">
                        {record.nidUrls.map((n, i) => (
                          <div
                            key={i}
                            className="overflow-hidden rounded border w-[100px] h-[80px] bg-gray-100"
                          >
                            <Image
                              className="object-cover w-full h-full"
                              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${n}`}
                              width={100}
                              height={80}
                              alt="NID image"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Blood Donation Details */}
              <div>
                <h2 className="font-semibold text-lg text-primary2 mb-4 border-b border-primary2/20 pb-2">
                  {t("report.bloodDonationDetails")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="block text-xs text-accent">
                      {t("report.bloodGroup")}
                    </span>
                    <span className="block text-base font-semibold">
                      {bloodGroup}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-accent">
                      {t("report.donationCount")}
                    </span>
                    <span className="block text-base font-semibold">
                      {bloodDonationCount}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-accent">
                      {t("report.lastDonation")}
                    </span>
                    <span className="block text-base font-semibold">
                      {lastDonationTime?.split("T")[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="my-5 italic text-center">
            <h1 className="text-sm mb-2">{t("report.systemNote")}</h1>
            <h1 className="text-[13px] text-accent mx-auto max-w-xl">
              {t("report.createdBy")}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadReport;
