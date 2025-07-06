"use client";
import Image from "next/image";
import React from "react";
import bloodBank from "@/src/assets/Image/bloodBank.png";
import AllCampaigns from "@/src/Components/UI/Campaigns/AllCampaigns";
import { useTranslation } from "@/src/Hook/useTranslation";

const CampaignsPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <div className="md:w-[90%] sm:mx-auto ">
          <div className="py-5 bg-[#F2F2F2] rounded-xl shadow-md px-5 ">
            <div className="md:w-[100%] sm:mx-auto grid sm:grid-cols-2 grid-cols-1 gap-3 items-center justify-between">
              <div className="sm:pl-10">
                <h1 className="font-bold lg:text-5xl text-3xl font-primary">
                  {t("campaigns.title")}
                </h1>
                <hr className="p-[2px] bg-primary w-[22%]" />
                <p className="text-sm text-accent my-3">
                  {t("campaigns.subtitle")}
                </p>
              </div>

              <div className="flex items-center justify-center">
                <Image
                  src={bloodBank}
                  width={220}
                  height={100}
                  alt={t("campaigns.imageAlt")}
                />
              </div>
            </div>
          </div>

          <div>
            <AllCampaigns />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignsPage;
