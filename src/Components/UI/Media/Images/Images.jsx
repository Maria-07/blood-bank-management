"use client";
import { useGetAllImagesMutation } from "@/src/redux/features/campaign/campaignApi";
import { Image } from "antd";
import React, { useEffect, useState } from "react";

const Images = ({ images }) => {
  // const [images, setImages] = useState([]);
  // //! Get all Images Data
  // const [getAllImages, { data, isLoading, isError }] =
  //   useGetAllImagesMutation();

  // const refetch = async () => {
  //   try {
  //     const response = await getAllImages({
  //       imagePageNo: 1,
  //       imagePageSize: 20,
  //       videoPageNo: 0,
  //       videoPageSize: 0,
  //     }).unwrap();
  //     console.log(response?.data?.imageUrls);
  //     setImages(response?.data?.imageUrls);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  // useEffect(() => {
  //   refetch();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {images?.map((image, index) => (
        <div
          key={index}
          className="overflow-hidden h-[200px] rounded-lg shadow-lg"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${image}`}
            alt={""}
            preview={true}
            height={200}
            className="transition-transform  duration-300 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
};

export default Images;
