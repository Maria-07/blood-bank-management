"use client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import { FaDownload } from "react-icons/fa6";
import logo from "@/src/assets/Image/logo/darkLogo.png";
import Image from "next/image";

const DownloadId = () => {
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
    <div className="sm:w-[30%] mx-auto  p-5">
      {" "}
      {/* Download Button */}
      <div className="my-2 flex items-center justify-end mr-[26%]">
        {" "}
        <button onClick={handleDownloadPDF} className=" text-primary text-xl ">
          <FaDownload />
        </button>
      </div>
      {/* Section to Convert into PDF */}
      <div
        ref={contentRef}
        className="mx-auto my-auto flex items-center justify-center"
      >
        <div className="w-64 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-300  relative">
          {/* Top Blue Section with Wave */}
          <div className="relative">
            <div className="bg-primary2 p-12  w-full rounded-t-lg flex items-center justify-center relative"></div>

            {/* Profile Picture */}
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2">
              <Image // need to import antd after the config
                src={logo}
                width={80}
                height={80}
                className="rounded-full"
                alt="Picture of the author"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="text-center mt-12 mb-2">
            <h2 className="text-lg font-bold">
              MICHAL <span className="text-primary2">SMITH</span>
            </h2>
            <p className="text-gray-500 text-sm">Volunteer</p>
          </div>

          {/* Details */}
          <div className="flex items-center justify-center">
            {" "}
            <div className="mt-4 space-y-2 text-sm text-gray-700 px-3">
              <p>
                <span className="font-semibold">ID NO:</span> 01234567890123
              </p>

              <p>
                <span className="font-semibold">Gender:</span> Male
              </p>

              <p>
                <span className="font-semibold">Blood:</span> AB+
              </p>
              {/* <p>
                <span className="font-semibold">District:</span> District
              </p>
              <p>
                <span className="font-semibold">Upozilla:</span> Upozilla
              </p>
              <p>
                <span className="font-semibold">Union:</span> Union
              </p> */}
              <p>
                <span className="font-semibold">Phone:</span> +01 123 456 7890
              </p>
              <p>
                <span className="font-semibold">Institute Name:</span> Institute
                Name
              </p>
              <p>
                <span className="font-semibold">Address:</span> abc,def dfjhdfhj
              </p>
            </div>
          </div>

          {/* Barcode */}
          <div className="mt-7">
            <div className=" h-4 bg-primary2 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadId;
