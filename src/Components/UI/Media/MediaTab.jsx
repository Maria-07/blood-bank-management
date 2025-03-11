"use client";
import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Videos from "./Videos/Videos";
import Images from "./Images/Images";
import { useGetAllMediaMutation } from "@/src/redux/features/campaign/campaignApi";

const MediaTab = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [media, setMedia] = useState({ images: [], videos: [] });
  const [getAllMedia] = useGetAllMediaMutation();
  const [size, setSize] = useState(10);

  //! Fetch Media based on Active Tab & Page Size
  const fetchMedia = async () => {
    try {
      const isImageTab = activeTab === "1";
      const params = {
        imagePageNo: isImageTab ? 1 : 0,
        imagePageSize: isImageTab ? size : 0,
        videoPageNo: isImageTab ? 0 : 1,
        videoPageSize: isImageTab ? 0 : size,
      };

      console.log("Fetching media with params:", params);
      const response = await getAllMedia(params).unwrap();
      console.log("API Response:", response);

      setMedia((prev) => ({
        ...prev,
        images: isImageTab
          ? response?.data?.imageUrls || prev.images
          : prev.images,
        videos: !isImageTab
          ? response?.data?.videoUrls || prev.videos
          : prev.videos,
      }));
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  //! Fetch Data when activeTab or size changes
  useEffect(() => {
    fetchMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, size]); // Added `size` as dependency

  //! Reusable Tab Configuration
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
          onClick={() => setSize((prev) => prev + 10)} // Only update state
          className="px-3 py-1 bg-primary2 text-sm text-white rounded-md shadow-md hover:bg-blue-600"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default MediaTab;
