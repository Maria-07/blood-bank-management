"use client";
import { useGetAllImagesMutation } from "@/src/redux/features/campaign/campaignApi";
import { Image } from "antd";
import React, { useEffect, useState } from "react";

const Images = ({ images }) => {
  console.log(images);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {images?.map((imageObj, index) => (
        <div
          key={index}
          className="overflow-hidden h-[230px] rounded-lg shadow-lg flex flex-col"
        >
          <div className="h-[200px] overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${imageObj.imageUrl}`}
              alt={imageObj.campaignName || "Campaign Image"}
              preview={true}
              height={200}
              className="transition-transform duration-300 hover:scale-105 w-full object-cover"
            />
          </div>
          <div className=" text-sm mt-2 px-2">{imageObj.campaignName}</div>
          <div className=" text-xs mt-1 mb-3 px-2 text-accent">
            {imageObj.institute}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Images;
