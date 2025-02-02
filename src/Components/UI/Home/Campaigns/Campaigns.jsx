"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useGetAllRunningCampaignsQuery } from "@/src/redux/features/campaign/campaignApi";
import CampaignCard from "../../Campaigns/CampaignCard";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Campaigns = () => {
  const [page] = useState(1);
  const [size] = useState(100);

  //! Fetch all running campaigns
  const {
    data: campaigns,
    isLoading,
    isError,
  } = useGetAllRunningCampaignsQuery({
    pageNo: page,
    pageSize: size,
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log("All Data", campaigns);
    }
  }, [campaigns, isLoading, isError]);

  return (
    <div className="bg-[#ffe8e8] py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary">
          Campaigns
        </h1>
        <p className="text-lg md:text-xl text-accent font-secondary mt-4 lg:px-24">
          Dive into our latest blogs, explore the fascinating world of
          literature, and let the words ignite your imagination.
        </p>
      </div>

      <div className="mt-16 mx-auto px-4">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{
            delay: 3000, // 3 seconds delay
            disableOnInteraction: false, // Keep autoplay even after user interaction
          }}
          navigation={true} // Enables navigation arrows
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          modules={[Autoplay, Navigation]} // Ensure Autoplay module is included
          className="mySwiper"
        >
          {campaigns?.data?.map((campaign, index) => (
            <SwiperSlide key={index}>
              <CampaignCard campaign={campaign} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Campaigns;
