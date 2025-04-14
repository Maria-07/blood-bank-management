"use client";
import React, { useEffect, useState } from "react";
import bloodBank from "@/src/assets/Image/bloodBank.png";
import Image from "next/image";
import {
  useGetOfficialLeadersQuery,
  useGetScoutLeadersQuery,
} from "@/src/redux/features/volunteers/volunteers";
import Initiator from "@/src/Components/UI/Volunteers/Initiators/Initiator";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Volunteer from "@/src/Components/UI/Volunteers/Volunteers/Volunteer";

const VolunteerPage = () => {
  const [allOfficialLeaders, setAllOfficialLeaders] = useState([]);
  const [allCivilOfficeLeaders, setAllCivilOfficeLeaders] = useState([]);
  const [allScoutLeaders, setAllScoutLeaders] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  // Fetch Official Leaders Data
  const {
    data: OfficialLeaders,
    isLoading: isLoadingOfficial,
    isError: isErrorOfficial,
  } = useGetOfficialLeadersQuery({
    pageNo: page,
    pageSize: size,
  });

  // Fetch Scout Leaders Data
  const {
    data: ScoutLeaders,
    isLoading: isLoadingScout,
    isError: isErrorScout,
  } = useGetScoutLeadersQuery({
    pageNo: page,
    pageSize: size,
  });

  useEffect(() => {
    if (!isLoadingOfficial && !isErrorOfficial && OfficialLeaders) {
      setRowCount(OfficialLeaders?.rowCount || 0);
      setAllOfficialLeaders(OfficialLeaders?.dcOfficeLeaders || []);
      setAllCivilOfficeLeaders(OfficialLeaders?.civilOfficeLeaders || []);
    }
  }, [OfficialLeaders, isLoadingOfficial, isErrorOfficial]);

  useEffect(() => {
    if (!isLoadingScout && !isErrorScout && ScoutLeaders) {
      setRowCount(ScoutLeaders?.rowCount || 0);
      setAllScoutLeaders(ScoutLeaders?.civilOfficeLeaders || []);
    }
  }, [ScoutLeaders, isLoadingScout, isErrorScout]);

  console.log(ScoutLeaders);

  return (
    <div>
      <div className="md:w-[90%] sm:mx-auto">
        <div className="pt-8 bg-[#F2F2F2] rounded-xl shadow-md py-2 px-5">
          <div className="md:w-[100%] sm:mx-auto grid sm:grid-cols-2 grid-cols-1 gap-3 items-center justify-between">
            <div className="sm:pl-10">
              <h1 className="font-bold lg:text-7xl text-4xl font-primary">
                Volunteers
              </h1>
              <hr className="p-[2px] bg-primary w-[22%]" />
              <p className="text-sm text-accent lg:w-[55%] my-3">
                Search for blood donors in your area quickly and conveniently.
                Filter results by blood group.
              </p>
            </div>

            <div>
              <Image
                src={bloodBank}
                width={500}
                height={600}
                alt="Picture of the author"
              />
            </div>
          </div>
        </div>

        <h1 className="lg:text-3xl text-2xl font-semibold text-center mt-20">
          Our Respected Official Leaders
        </h1>

        <div className="md:w-[90%] sm:mx-auto mt-10 sm:px-0 px-2 mb-20">
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
              640: { slidesPerView: 1, spaceBetween: 10 }, // For small screens (1 slide)
              768: { slidesPerView: 2, spaceBetween: 15 }, // For medium screens (2 slides)
              1024: { slidesPerView: 3, spaceBetween: 20 }, // For large screens (3 slides)
              1280: { slidesPerView: 4, spaceBetween: 20 }, // For extra large screens (4 slides)
            }}
            modules={[Autoplay]} // Ensure Autoplay module is included
            className="mySwiper"
          >
            {allOfficialLeaders?.map((data, i) => (
              <SwiperSlide key={i}>
                <Initiator record={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="my-10 bg-[#F2F2F2] py-10 pb-20">
        <h1 className="lg:text-3xl text-2xl font-semibold text-center mt-10">
          Our Civil-Office Leaders
        </h1>
        <div className="md:w-[90%] sm:mx-auto mt-10 px-20 ">
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
              640: { slidesPerView: 1, spaceBetween: 10 }, // For small screens (1 slide)
              768: { slidesPerView: 2, spaceBetween: 15 }, // For medium screens (2 slides)
              1024: { slidesPerView: 3, spaceBetween: 20 }, // For large screens (3 slides)
              1280: { slidesPerView: 4, spaceBetween: 20 }, // For extra large screens (4 slides)
            }}
            modules={[Autoplay]} // Ensure Autoplay module is included
            className="mySwiper"
          >
            {allCivilOfficeLeaders?.map((data, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white">
                  {" "}
                  <Volunteer record={data} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <h1 className="lg:text-3xl text-2xl font-semibold text-center mt-20">
        Scouts
      </h1>

      <div className="md:w-[90%] sm:mx-auto my-20">
        <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 mt-20">
          {allScoutLeaders?.slice(0, 5).map((data, i) => (
            <Volunteer record={data} key={i}></Volunteer>
          ))}
        </div>
      </div>

      <div className="md:w-[90%] sm:mx-auto my-20">
        <div className="Volunteer-bg gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div>
            <h1 className="lg:text-6xl text-4xl sm:w-[80%] font-semibold mt-[10%] ml-[10%] p-10">
              Apply to be a volunteer instead ?
            </h1>
            <div className="ml-[10%] px-12">
              <button className="bb-input-button">Apply Here</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;
