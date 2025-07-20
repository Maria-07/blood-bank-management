"use client";
import { useGetAllImagesMutation } from "@/src/redux/features/campaign/campaignApi";
import { Image } from "antd";
import React, { useEffect, useState } from "react";

const Images = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {images?.map((imageObj, index) => (
        <div
          key={index}
          className="relative group overflow-hidden h-[260px] rounded-xl shadow-xl flex flex-col bg-white transition-shadow duration-300 hover:shadow-2xl"
        >
          <div className="h-[180px] overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${imageObj.imageUrl}`}
              alt={imageObj.campaignName || "Campaign Image"}
              preview={true}
              height={180}
              width="100%"
              className="transition-transform duration-500 group-hover:scale-110 w-full object-cover"
              style={{
                borderTopLeftRadius: "0.75rem",
                borderTopRightRadius: "0.75rem",
              }}
            />
            <div className="absolute top-2 right-2 bg-white/80 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 shadow group-hover:bg-accent group-hover:text-white transition-colors duration-300">
              {imageObj.institute}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-end">
            <div className="px-4 py-3">
              <div className="text-sm font-medium text-gray-800 truncate">
                {imageObj.campaignName}
              </div>
              {/* Optionally, add a subtle divider */}
              <div className="mt-2 h-[2px] w-8 bg-accent rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Images;
