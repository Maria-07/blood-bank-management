"use client";
import React from "react";
import { Card } from "antd";
import { TiPointOfInterest } from "react-icons/ti";
import { useTranslation } from "@/src/Hook/useTranslation";

const Volunteers = () => {
  const { t } = useTranslation();

  return (
    <div className="my-32">
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 mt-20">
        {/* Mission Card */}
        <div>
          <Card hoverable className="bg-primary text-white">
            <div className="py-16 2xl:py-12 px-10">
              <h2 className="text-3xl mb-3 font-semibold">
                🚀 {t("volunteers.mission.title")}
              </h2>
              <div className="text-lg text-gray-50">
                {t("volunteers.mission.description")}
              </div>
            </div>
          </Card>
        </div>

        {/* Goals Title Card */}
        <div className="sm:row-span-2 h-[100%]">
          <Card hoverable className="shadow-md">
            <h2 className="text-3xl bg-white text-primary py-6 px-10 font-semibold">
              🎯 {t("volunteers.goals.title")}
            </h2>
          </Card>

          {/* Goals List Card */}
          <Card hoverable className="bg-primary text-white mb-6" />

          <Card hoverable className="bg-primary text-white">
            <div className="py-10 2xl:py-12 px-10 text-lg text-gray-50">
              {t("volunteers.goals.points").map((point, i) => (
                <div key={i} className="flex gap-2 ml-7 mt-2">
                  <TiPointOfInterest className="text-sm mt-2" />
                  {point}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Vision Card */}
        <div>
          <Card hoverable className="shadow-md">
            <div className="py-16 2xl:py-12 px-10">
              <h2 className="text-3xl mb-3 font-semibold text-primary">
                🎭 {t("volunteers.vision.title")}
              </h2>
              <div className="text-lg text-accent">
                {t("volunteers.vision.description")}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Volunteers;
