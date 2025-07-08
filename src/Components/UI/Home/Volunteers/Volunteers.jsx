"use client";
import React from "react";
import { Card } from "antd";
import { TiPointOfInterest } from "react-icons/ti";
import { useTranslation } from "@/src/Hook/useTranslation";
import { FaRocket, FaEye, FaBullseye } from "react-icons/fa";
import Link from "next/link";

const Volunteers = () => {
  const { t } = useTranslation();

  return (
    <div className="py-20 px-4 bg-gradient-to-br from-soft via-white to-soft">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        {/* <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Volunteer Initiative
          </h1>
          <p className="text-lg text-accent max-w-3xl mx-auto">
            Empowering communities through organized blood donation networks and
            technology-driven solutions
          </p>
        </div> */}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mission Card */}
          <div className="group">
            <Card
              hoverable
              className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-primary to-secondary text-white overflow-hidden"
            >
              <div className="relative p-8 h-full flex flex-col">
                {/* Content */}
                <h2 className="text-3xl flex items-center gap-3 font-bold text-white mb-4">
                  <div className=" bg-gradient-to-br from-primary2 to-primary rounded-full">
                    <FaRocket className=" p-2 text-white" />
                  </div>{" "}
                  {t("volunteers.mission.title")}
                </h2>

                <p className="text-gray-100 leading-relaxed flex-grow">
                  {t("volunteers.mission.description")}
                </p>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              </div>
              <div className="relative p-8 h-full flex flex-col">
                {/* Content */}
                <h2 className="text-3xl flex items-center gap-3 font-bold text-white mb-4">
                  <div className=" bg-gradient-to-br from-primary2 to-primary rounded-full">
                    <FaEye className=" p-2 text-white" />
                  </div>{" "}
                  {t("volunteers.vision.title")}
                </h2>

                <p className="text-gray-100 leading-relaxed flex-grow">
                  {t("volunteers.vision.description")}
                </p>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              </div>
            </Card>
          </div>

          {/* Goals Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Goals Header */}
            <Card hoverable className="border-0 shadow-lg bg-white">
              <div className="p-2 ">
                <h2 className="text-3xl flex items-center gap-3 font-bold text-primary">
                  <div className=" bg-gradient-to-br from-primary2 to-primary rounded-full">
                    <FaBullseye className=" text-white" />
                  </div>{" "}
                  {t("volunteers.goals.title")}
                </h2>
              </div>
            </Card>

            {/* Goals List */}
            <Card
              hoverable
              className="border-0 shadow-lg bg-gradient-to-br from-primary2 to-primary text-white"
            >
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t("volunteers.goals.points").map((point, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mt-1">
                        <TiPointOfInterest className="text-white text-sm" />
                      </div>
                      <p className="text-gray-100 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4">
              {t("volunteerSection.title")}
            </h3>
            <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
              {t("volunteerSection.description")}
            </p>
            <Link href="/register">
              <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                {t("volunteerSection.button")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteers;
