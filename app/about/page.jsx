"use client";
import React from "react";
import { TbPointFilled } from "react-icons/tb";
import { useTranslation } from "@/src/Hook/useTranslation";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <div className="md:w-[70%] w-[90%] sm:mx-auto py-10">
          <div className="md:w-[100%] sm:mx-auto sm:px-0 px-2 gap-3 items-center justify-between">
            <div className="sm:pl-10 mx-auto">
              <h1 className="font-bold text-center lg:text-5xl text-3xl font-primary">
                {t("about.title")}
              </h1>
              <hr className="p-[2px] bg-primary w-[15%] mx-auto" />
              <p className="text-base text-accent text-center mt-3 ">
                {t("about.quote")}
              </p>
            </div>
          </div>

          <div className="px-2 sm:px-10 my-5">
            <div className="my-10 text-base text-center">
              <span className="text-xl font-semibold text-secondary">
                {t("about.platformName")}
              </span>{" "}
              {t("about.platformDescription.part1")}{" "}
              <strong>{t("about.leaderName")}</strong>.{" "}
              {t("about.platformDescription.part2")}
            </div>

            <div className="border-[1px] sm:px-5 px-1 my-20 rounded-sm shadow-md pt-5 pb-16">
              <h1 className="text-xl font-semibold uppercase my-10 text-center">
                {t("about.whyNeeded.title")}
              </h1>
              <div className="flex gap-2 mx-7 my-5 pl-5 border-primary border-l-[5px]">
                {t("about.whyNeeded.reason1")}
              </div>

              <div className="flex gap-2 mx-7 my-5 pl-5 border-primary border-l-[5px]">
                {t("about.whyNeeded.reason2")}
              </div>
            </div>

            <div className="sm:p-5 p-1 my-20 ">
              <h1 className="text-xl font-semibold text-center my-5 uppercase ">
                {t("about.stakeholders.title")}
              </h1>

              <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                <div className="sm:row-span-2 h-[100%] ml-7 my-4 p-5 rounded-md border bg-primary text-white">
                  <h2 className="text-lg font-semibold">
                    {t("about.stakeholders.districtAdmin.title")}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <TbPointFilled className="text-sm" />{" "}
                    {t("about.stakeholders.districtAdmin.platform")}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <TbPointFilled className="text-sm" />{" "}
                    {t("about.stakeholders.districtAdmin.volunteerTraining")}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <TbPointFilled className="text-sm" />{" "}
                    {t("about.stakeholders.districtAdmin.campaignPlanning")}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <TbPointFilled className="text-sm" />{" "}
                    {t("about.stakeholders.districtAdmin.donorEngagement")}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <TbPointFilled className="text-base" />{" "}
                    {t("about.stakeholders.districtAdmin.recognizingDonors")}
                  </div>
                </div>

                <div className="ml-7 my-4 p-5 h-[100%] rounded-md border ">
                  <h2 className="text-lg font-semibold">
                    {t("about.stakeholders.scouts.title")}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <TbPointFilled className="text-sm" />{" "}
                    {t("about.stakeholders.scouts.bloodGroupId")}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <TbPointFilled className="text-sm" />{" "}
                    {t("about.stakeholders.scouts.dataUploading")}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <TbPointFilled className="text-sm" />{" "}
                    {t("about.stakeholders.scouts.awarenessCampaign")}
                  </div>
                </div>

                <div className="ml-7 my-4 p-5 h-[100%] rounded-md border bg-sky-600 text-white">
                  <h2 className="text-lg font-semibold">
                    {t("about.stakeholders.users.title")}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <TbPointFilled className="text-sm" />{" "}
                    {t("about.stakeholders.users.registerDonors")}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <TbPointFilled className="text-sm" />{" "}
                    {t("about.stakeholders.users.contactDonors")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
