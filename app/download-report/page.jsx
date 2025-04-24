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

const DownloadReport = () => {
  const user = UserInfo();
  const admin = "admin";
  const record = {};

  console.log(user);

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

    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("download.pdf");
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
        <div className="">
          {" "}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">Report</h1>
          </div>{" "}
        </div>

        <div className="bg-gray-200 pt-[1px] my-3"></div>

        <div>
          <div>
            <div className="border-[1px] p-3 rounded-md mb-3 flex justify-between">
              <div className="flex items-center flex-wrap gap-3">
                <div className="h-[80px] w-[80px] overflow-hidden rounded-full">
                  <Image
                    className="border object-cover w-full h-full"
                    // src={`https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg`}
                    src={imageUrl}
                    width={80}
                    height={80}
                    alt="Picture of the author"
                  />
                </div>

                <div>
                  <h1 className="text-capitalize flex items-center gap-1 text-sm ">
                    <span className="font-semibold  text-lg">{fullName}</span>#
                    {code}
                  </h1>

                  <h2 className="text-capitalize text-accent text-sm font-semibold">
                    {userType}
                  </h2>
                  <h2 className="text-capitalize text-accent text-sm">
                    {address}
                  </h2>
                </div>
              </div>
              {campaignId === null || "" ? (
                <div>
                  <h1 className="text-xs text-accent">Registered Date</h1>
                  <h6 className="text-base font-semibold">
                    {createTime?.split("T")[0]}
                  </h6>
                </div>
              ) : (
                <>
                  {" "}
                  <div>
                    <h1 className="text-xs text-accent">Test Date</h1>
                    <h6 className="text-base font-semibold">
                      {createTime?.split("T")[0]}
                    </h6>
                  </div>
                </>
              )}
            </div>

            {/* Details */}
            <div className="relative flex items-center justify-center">
              {/* Watermark Logo in Background */}
              <img
                src={logo.src}
                alt="Logo Watermark"
                className="absolute opacity-20 w-60 h-60 object-contain pointer-events-none"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <div className="relative z-10 w-full">
                {/* Personal Information */}
                <div className="border-[1px] p-3 rounded-md mb-3">
                  <h1 className="font-semibold text-lg mb-2 text-primary2">
                    Personal Information
                  </h1>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div>
                      <h1 className="text-xs text-accent">Full Name</h1>
                      <h6 className="text-base font-semibold">{fullName}</h6>
                    </div>
                    <div>
                      <h1 className="text-xs text-accent">Mobile Number</h1>
                      <h6 className="text-base font-semibold">
                        {mobileNumber}
                      </h6>
                    </div>
                    <div>
                      <h1 className="text-xs text-accent">Date of Birth</h1>
                      <h6 className="text-base font-semibold">{dateOfBirth}</h6>
                    </div>
                    <div>
                      <h1 className="text-xs text-accent">Gender</h1>
                      <h6 className="text-base font-semibold">{gender}</h6>
                    </div>

                    {/* Physical Complexity */}
                    <div>
                      <h1 className="text-xs text-accent">
                        Any Physical Complexity?
                      </h1>
                      <h6 className="text-base font-semibold">
                        {PhysicalComplexity ? PhysicalComplexity : "No"}
                      </h6>
                    </div>

                    {/* NID Details (Admin view only) */}
                    {admin && record?.nidUrls?.length > 0 && (
                      <div>
                        <h1 className="text-xs text-accent">NID details</h1>
                        <div className="flex items-center mt-2 gap-2">
                          {record.nidUrls.map((n, i) => (
                            <div key={i} className="overflow-hidden">
                              <Image
                                className="border object-cover w-full h-full"
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

                {/* Address Section
                <div className="border-[1px] p-3 rounded-md mb-3">
                  <h1 className="font-semibold text-primary2 text-lg mb-2">
                    Address
                  </h1>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <div>
                      <h1 className="text-xs text-accent">District</h1>
                      <h6 className="text-base font-semibold">
                        {districtName}
                      </h6>
                    </div>
                    <div>
                      <h1 className="text-xs text-accent">Upazila</h1>
                      <h6 className="text-base font-semibold">{upazilaName}</h6>
                    </div>
                    <div>
                      <h1 className="text-xs text-accent">Union</h1>
                      <h6 className="text-base font-semibold">{unionName}</h6>
                    </div>
                  </div>
                </div> */}

                {/* Blood Donation Details */}
                <div className="border-[1px] p-3 rounded-md mb-3">
                  <h1 className="font-semibold text-primary2 text-lg mb-2">
                    Blood Donation Details
                  </h1>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <div>
                      <h1 className="text-xs text-accent">Blood Group</h1>
                      <h6 className="text-base font-semibold">{bloodGroup}</h6>
                    </div>
                    <div>
                      <h1 className="text-xs text-accent">Donation Count</h1>
                      <h6 className="text-base font-semibold">
                        {bloodDonationCount} times
                      </h6>
                    </div>
                    <div>
                      <h1 className="text-xs text-accent">
                        Last Donation Date
                      </h1>
                      <h6 className="text-base font-semibold">
                        {lastDonationTime?.split("T")[0]}
                      </h6>
                    </div>
                    <div>
                      <h1 className="text-xs text-accent">
                        Blood Donation Status
                      </h1>
                      <h6 className="text-sm mt-[4px]">
                        {bloodDonationStatus === "Interested" ? (
                          <span className="flex items-center gap-2">
                            <FaHandHoldingHeart className="text-sm text-secondary" />
                            Interested
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <FaRegHandBackFist className="text-sm" /> Not
                            Interested
                          </span>
                        )}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadReport;
