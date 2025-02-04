"use client";
import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import News from "./News/News";
import Videos from "./Videos/Videos";
import Images from "./Images/Images";
import { useGetAllImagesMutation } from "@/src/redux/features/campaign/campaignApi";

const MediaTab = () => {
  const [imageMedia, setImageMedia] = useState(true);
  const [videoMedia, setVideoMedia] = useState(false);

  const [images, setImages] = useState([]);
  const [Video, setVideo] = useState([]);
  //! Get all Images Data
  const [getAllImages, { data, isLoading, isError }] =
    useGetAllImagesMutation();

  const refetch = async () => {
    try {
      // if (imageMedia) {
      //   const response = await getAllImages({
      //     imagePageNo: 1,
      //     imagePageSize: 10,
      //     videoPageNo: 0,
      //     videoPageSize: 0,
      //   }).unwrap();
      //   console.log(response?.data?.imageUrls);
      //   setImages(response?.data?.imageUrls);
      // }
      if (videoMedia) {
        const response = await getAllImages({
          imagePageNo: 0,
          imagePageSize: 0,
          videoPageNo: 1,
          videoPageSize: 10,
        }).unwrap();
        console.log(response?.data?.videoUrls);
        setVideo(response?.data?.videoUrls);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const tabItems = [
    {
      label: (
        <h1
          onClick={() => {
            setImageMedia(true);
            setVideoMedia(false);
            refetch();
          }}
          className="text-dark text-base hover:text-primary"
        >
          Image
        </h1>
      ),
      key: 1,
      children: <Images images={images}></Images>,
    },
    {
      label: (
        <h1
          onClick={() => {
            setVideoMedia(true);
            setImageMedia(false);
            refetch();
          }}
          className="text-dark text-base hover:text-primary"
        >
          Video
        </h1>
      ),
      key: 2,
      children: <Videos videos={Video}></Videos>,
    },
    // {
    //   label: <h1 className="text-dark text-base hover:text-primary">News</h1>,
    //   key: 3,
    //   children: <News></News>,
    // },
  ];
  return (
    <div>
      <div className="my-20">
        <Tabs centered type="card" items={tabItems} />
      </div>
    </div>
  );
};

export default MediaTab;
