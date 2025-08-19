"use client";
import React, { useEffect, useState } from "react";
import bloodBank from "@/src/assets/Image/bloodBank.png";
import Image from "next/image";
import {
  useGetOfficialLeadersQuery,
  useGetScoutLeadersQuery,
} from "@/src/redux/features/volunteers/volunteers";
import Initiator from "@/src/Components/UI/Volunteers/Initiators/Initiator";
import Link from "next/link";
import { useTranslation } from "@/src/Hook/useTranslation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useGetAllAdminQuery } from "@/src/redux/features/auth/userApi";

const VolunteerPage = () => {
  const [allOfficialLeaders, setAllOfficialLeaders] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [allCivilOfficeLeaders, setAllCivilOfficeLeaders] = useState([]);
  const [allScoutLeaders, setAllScoutLeaders] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(30);
  const [scoutSize, setScoutSize] = useState(12);

  const { t } = useTranslation();

  // Fetch Official Leaders Data
  const {
    data: OfficialLeaders,
    isLoading: isLoadingOfficial,
    isError: isErrorOfficial,
  } = useGetOfficialLeadersQuery({
    pageNo: page,
    pageSize: size,
  });

  //! Get all Admin Data
  const { data, isLoading, isError, refetch } = useGetAllAdminQuery({
    pageNo: page,
    pageSize: size,
  });

  // Fetch Scout Leaders Data
  const {
    data: ScoutLeaders,
    isLoading: isLoadingScout,
    isError: isErrorScout,
  } = useGetScoutLeadersQuery({
    pageNo: 1,
    pageSize: scoutSize,
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setAdmin(data?.data);
    }
  }, [data, isLoading, isError]);

  useEffect(() => {
    if (!isLoadingOfficial && !isErrorOfficial && OfficialLeaders) {
      setAllOfficialLeaders(OfficialLeaders?.dcOfficeLeaders || []);
      setAllCivilOfficeLeaders(OfficialLeaders?.civilOfficeLeaders || []);
    }
  }, [OfficialLeaders, isLoadingOfficial, isErrorOfficial]);

  useEffect(() => {
    if (!isLoadingScout && !isErrorScout && ScoutLeaders) {
      setAllScoutLeaders(ScoutLeaders?.data || []);
    }
  }, [ScoutLeaders, isLoadingScout, isErrorScout]);

  if (isLoadingOfficial || isLoadingScout) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div>
      <div className="md:w-[90%] sm:mx-auto">
        <section className="relative bg-gradient-to-br from-primary/10 to-[#F2F2F2] rounded-2xl shadow-lg px-4 py-10 overflow-hidden mb-10">
          <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8">
            {/* Left: Text Content */}
            <div className="w-full md:w-2/3 flex flex-col items-start">
              <h1 className="font-extrabold text-3xl md:text-5xl font-primary text-primary mb-3 drop-shadow-sm">
                {t("leaderSection.title")}
              </h1>
              <div className="h-2 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mb-4"></div>
              <p className="text-base md:text-lg text-accent mb-4 leading-relaxed">
                {t("leaderSection.subtitle")}
              </p>
            </div>
            {/* Right: Image */}
            <div className="w-full md:w-1/3 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl z-0"></div>
                <Image
                  src={bloodBank}
                  width={260}
                  height={140}
                  alt={t("leaderSection.imageAlt")}
                  className="relative z-10 drop-shadow-xl rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <h1 className="lg:text-3xl text-2xl font-semibold text-center mt-20">
          {t("leaderSection.dcOfficials")}
        </h1>

        <div className="md:w-[90%] sm:mx-auto mt-10 sm:px-0 px-2 mb-20 ">
          <Slider {...settings}>
            {admin?.map((data, i) => (
              <div key={i} className="pb-10">
                <Initiator record={data} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* <div className="my-10  bg-[#F2F2F2] py-10 pb-20">
        <h1 className="lg:text-3xl text-2xl font-semibold text-center mt-10">
          {t("leaderSection.civilSurgeon")}
        </h1>
        <div className="md:w-[80%] sm:mx-auto mt-10 px-2">
          <Slider {...settings}>
            {allCivilOfficeLeaders?.map((data, i) => (
              <div key={i}>
                <Initiator record={data} />
              </div>
            ))}
          </Slider>
        </div>
      </div> */}

      <h1 className="lg:text-3xl text-2xl font-semibold text-center mt-20 ">
        {t("leaderSection.volunteers")}
      </h1>

      <div className="md:w-[90%] sm:mx-auto my-20 px-20 ">
        <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 mt-20">
          {allScoutLeaders?.map((data, i) => (
            <Initiator record={data} key={i}></Initiator>
          ))}
        </div>
        {/* Load More Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setScoutSize((prev) => prev + 6)}
            className="px-3 py-1 bg-primary2 text-sm text-white rounded-md shadow-md hover:bg-blue-600"
          >
            {t("leaderSection.loadMore")}
          </button>
        </div>
      </div>

      <div className="md:w-[90%] sm:mx-auto my-20">
        <div className="Volunteer-bg gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div>
            <h1 className="lg:text-6xl text-4xl sm:w-[80%] font-semibold mt-[10%] ml-[10%] p-10">
              {t("leaderSection.applyPrompt")}
            </h1>
            <div className="ml-[10%] px-12">
              <button className="bb-input-button">
                <Link href={"/register"}>{t("leaderSection.applyHere")}</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;
