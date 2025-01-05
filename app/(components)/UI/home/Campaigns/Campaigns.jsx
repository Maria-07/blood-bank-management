"use client";
import React from "react";
// Swiper components, modules and styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Campaign from "./Campaign";

const Campaigns = () => {
  return (
    <div className="bg-[#ffe8e8]  ">
      {" "}
      <div className=" py-20 my-24 px-4 md:w-[90%] sm:mx-auto ">
        <h1 className=" text-6xl font-semibold text-primary text-center">
          Campaigns
        </h1>
        <p className="text-xl font-secondary text-accent text-center lg:px-[200px] my-5">
          Dive into our latest blogs, explore the fascinating world of
          literature, and let the words ignite your imagination. BookLink&apos;s
          latest blogs are your gateway to endless literary discoveries and a
          source of inspiration for your reading journey.
        </p>
        <div className="mt-24">
          <>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                1080: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <Campaign></Campaign>
              </SwiperSlide>
              <SwiperSlide>
                <Campaign></Campaign>
              </SwiperSlide>
              <SwiperSlide>
                <Campaign></Campaign>
              </SwiperSlide>
              <SwiperSlide>
                <Campaign></Campaign>
              </SwiperSlide>
              <SwiperSlide>
                <Campaign></Campaign>
              </SwiperSlide>
              <SwiperSlide>
                <Campaign></Campaign>
              </SwiperSlide>
            </Swiper>
          </>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
