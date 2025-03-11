"use client";
import { Image } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import {
  FaDownload,
  FaHandHoldingHeart,
  FaRegHandBackFist,
} from "react-icons/fa6";

const DownloadReport = () => {
  const admin = "admin";
  const record = {};

  const {
    address,
    bloodDonationCount,
    bloodDonationStatus,
    bloodGroup,
    dateOfBirth,
    district,
    districtName,
    fatherName,
    fullName,
    gender,
    id,
    imageUrl,
    isApproved,
    isSuperAdmin,
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
  } = record;

  const contentRef = useRef();

  const handleDownloadPDF = () => {
    const input = contentRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("download.pdf");
    });
  };

  return (
    <div className="sm:w-[50%] mx-auto ">
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
            <div className="border-[1px] p-3 rounded-md mb-3">
              <div className="flex items-center flex-wrap gap-3">
                <div className="h-[80px] w-[80px] overflow-hidden rounded-full">
                  <Image
                    className="border object-cover w-full h-full"
                    src={`https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg`}
                    // src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${imageUrl}`}
                    width={80}
                    height={80}
                    alt="Picture of the author"
                  />
                </div>

                <div>
                  <h1 className="text-capitalize font-semibold text-lg">
                    {fullName} User Full Name
                  </h1>

                  <h2 className="text-capitalize text-accent text-sm font-semibold">
                    {userType} Volunteer
                  </h2>
                  <h2 className="text-capitalize text-accent text-sm">
                    {address} abc, sds, wererwr
                  </h2>
                </div>
              </div>
            </div>
            <div className="border-[1px] p-3 rounded-md mb-3">
              <h1 className="font-semibold text-lg mb-2 text-primary2">
                Personal information
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 mt-3 mr-2 gap-x-2 gap-y-3">
                <div>
                  <h1 className="text-xs text-accent">Full Name</h1>
                  <h6 className="text-base font-semibold"> {fullName}</h6>
                </div>
                <div>
                  <h1 className="text-xs text-accent">Mobile Number</h1>
                  <h6 className="text-base font-semibold"> {mobileNumber}</h6>
                </div>
                <div>
                  <h1 className="text-xs text-accent">Date of Birth</h1>
                  <h6 className="text-base font-semibold"> {dateOfBirth}</h6>
                </div>

                <div>
                  <h1 className="text-xs text-accent">Gender</h1>
                  <h6 className="text-base font-semibold"> {gender}</h6>
                </div>

                <div>
                  <h1 className="text-xs text-accent">Father&apos;s Name</h1>
                  <h6 className="text-base font-semibold"> {fatherName}</h6>
                </div>
                <div>
                  <h1 className="text-xs text-accent">Mother&apos;s Name</h1>
                  <h6 className="text-base font-semibold"> {motherName}</h6>
                </div>

                {admin && record?.nidUrls?.length > 0 && (
                  <div>
                    <h1 className="text-xs text-accent">NID details</h1>
                    <div className="flex items-center mt-2 gap-2">
                      {record.nidUrls.map((n, i) => {
                        console.log(
                          `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${n}`
                        );

                        return (
                          <div key={i} className="overflow-hidden">
                            <Image
                              className="border object-cover w-full h-full"
                              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${n}`}
                              width={100}
                              height={80}
                              alt="NID image"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="flex items-center sm:col-span-2">
                  <input
                    defaultChecked={PhysicalComplexity}
                    type="checkbox"
                    id="PhysicalComplexity"
                    className="mr-2"
                    disabled
                  />
                  <label htmlFor="PhysicalComplexity" className="input-title">
                    Any Physical Complexity?{" "}
                    <span className="text-xs text-accent">
                      (like : Diabetics / Cancer / thyroid.... etc.)
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="border-[1px] p-3 rounded-md mb-3">
              <h1 className="font-semibold text-primary2 text-lg mb-2">
                Address
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 my-3 mr-2 gap-x-2 gap-y-3">
                <div>
                  <h1 className="text-xs text-accent">District</h1>
                  <h6 className="text-base font-semibold"> {districtName}</h6>
                </div>{" "}
                <div>
                  <h1 className="text-xs text-accent">Upazila</h1>
                  <h6 className="text-base font-semibold"> {upazilaName}</h6>
                </div>
                <div>
                  <h1 className="text-xs text-accent">Union</h1>
                  <h6 className="text-base font-semibold"> {unionName}</h6>
                </div>
              </div>
            </div>
            <div className="border-[1px] p-3 rounded-md mb-3">
              <h1 className="font-semibold text-primary2 text-lg mb-2">
                Blood Donation Details
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 my-3 mr-2 gap-x-2 gap-y-3">
                <div>
                  <h1 className="text-xs text-accent">Blood Group</h1>
                  <h6 className="text-base font-semibold"> {bloodGroup}</h6>
                </div>
                <div>
                  <h1 className="text-xs text-accent">Donation Count</h1>
                  <h6 className="text-base font-semibold">
                    {" "}
                    {bloodDonationCount} times
                  </h6>
                </div>
                <div>
                  <h1 className="text-xs text-accent">Last Donation Date</h1>
                  <h6 className="text-base font-semibold">
                    {/* {dayjs(lastDonationTime, "YYYY-MM-DD")} */}
                    {lastDonationTime?.split("T")[0]}
                  </h6>
                </div>
                <div>
                  <h1 className="text-xs text-accent">Blood Donation Status</h1>
                  <h6 className="text-sm mt-[4px]">
                    {" "}
                    {bloodDonationStatus === "Interested" ? (
                      <span className="flex item-center gap-2">
                        <FaHandHoldingHeart className="text-sm text-secondary" />
                        Interested
                      </span>
                    ) : (
                      <span className="flex item-center gap-2">
                        <FaRegHandBackFist className="text-sm " /> Not
                        Interested
                      </span>
                    )}{" "}
                  </h6>
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
