"use client";
import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Videos from "./Videos/Videos";
import Images from "./Images/Images";
import News from "./News/News";
import { useGetAllMediaMutation } from "@/src/redux/features/campaign/campaignApi";
import { useGetAllNewsQuery } from "@/src/redux/features/news/news";
import Loader from "../../Layouts/Loader";

const MediaTab = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [media, setMedia] = useState({ images: [], videos: [] });
  const [size, setSize] = useState(10);

  //! Fetch Media Mutation
  const [getAllMedia] = useGetAllMediaMutation();

  //! Fetch News Query
  const {
    data: newsData,
    error: newsError,
    isLoading: newsLoading,
  } = useGetAllNewsQuery({ pageNo: 1, pageSize: size });

  //! Fetch Media based on Active Tab
  const fetchMedia = async () => {
    try {
      if (activeTab === "1" || activeTab === "2") {
        const isImageTab = activeTab === "1";
        const params = {
          imagePageNo: isImageTab ? 1 : 0,
          imagePageSize: isImageTab ? size : 0,
          videoPageNo: isImageTab ? 0 : 1,
          videoPageSize: isImageTab ? 0 : size,
        };

        const response = await getAllMedia(params).unwrap();

        setMedia((prev) => ({
          ...prev,
          images: isImageTab
            ? response?.data?.imageData || prev.images
            : prev.images,
          videos: !isImageTab
            ? response?.data?.videoData || prev.videos
            : prev.videos,
        }));
      }
    } catch (error) {}
  };

  //! Fetch Data when activeTab or size changes
  useEffect(() => {
    fetchMedia();
  }, [activeTab, size]);

  //! Tab Configuration
  const tabItems = [
    {
      label: "Images",
      key: "1",
      children: <Images images={media.images} />,
    },
    {
      label: "Videos",
      key: "2",
      children: <Videos videos={media.videos} />,
    },
    {
      label: "News",
      key: "3",
      children: newsLoading ? (
        <Loader></Loader>
      ) : (
        <News news={newsData?.data} />
      ),
    },
  ];

  return (
    <div className="my-20">
      <Tabs
        centered
        type="card"
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
      />

      {/* Load More Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setSize((prev) => prev + 10)}
          className="px-3 py-1 bg-primary2 text-sm text-white rounded-md shadow-md hover:bg-blue-600"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default MediaTab;
