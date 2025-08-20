"use client";
import React from "react";
import { TbPointFilled } from "react-icons/tb";
import {
  FaHeart,
  FaUsers,
  FaHandshake,
  FaShieldAlt,
  FaLightbulb,
  FaChartLine,
} from "react-icons/fa";
import { useTranslation } from "@/src/Hook/useTranslation";
import Link from "next/link";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-primary">
              {t("about.title")}
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8 rounded-full"></div>
            <p className="text-xl md:text-2xl italic max-w-4xl mx-auto leading-relaxed">
              {t("about.quote")}
            </p>
          </div>
        </div>
      </div>

      {/* Platform Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
              <FaHeart className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("about.platformName")}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              {t("about.platformDescription.part1")}{" "}
              <strong className="text-primary">
                {" "}
                {t("about.leaderName")}
              </strong>{" "}
              {t("about.platformDescription.part2")}
              <br/>
              {t("about.platformDescription.part3")}
            </p>
          </div>
        </div>
      </div>

      {/* Why Needed Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-primary rounded-2xl shadow-xl p-8 md:p-12 text-white">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
              <FaLightbulb className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("about.whyNeeded.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                  <TbPointFilled className="text-white text-sm" />
                </div>
                <p className="text-lg leading-relaxed">
                  {t("about.whyNeeded.reason1")}
                </p>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                  <TbPointFilled className="text-white text-sm" />
                </div>
                <p className="text-lg leading-relaxed">
                  {t("about.whyNeeded.reason2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stakeholders Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
            <FaUsers className="text-white text-2xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("about.stakeholders.title")}
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {/* District Administration */}
          <div className="lg:col-span-2 bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaShieldAlt className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold">
                {t("about.stakeholders.districtAdmin.title")}
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <TbPointFilled className="text-lg flex-shrink-0" />
                <span className="text-lg">
                  {t("about.stakeholders.districtAdmin.platform")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <TbPointFilled className="text-lg flex-shrink-0" />
                <span className="text-lg">
                  {t("about.stakeholders.districtAdmin.volunteerTraining")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <TbPointFilled className="text-lg flex-shrink-0" />
                <span className="text-lg">
                  {t("about.stakeholders.districtAdmin.campaignPlanning")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <TbPointFilled className="text-lg flex-shrink-0" />
                <span className="text-lg">
                  {t("about.stakeholders.districtAdmin.donorEngagement")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <TbPointFilled className="text-lg flex-shrink-0" />
                <span className="text-lg">
                  {t("about.stakeholders.districtAdmin.recognizingDonors")}
                </span>
              </div>
            </div>
          </div>

          {/* Scouts */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaHandshake className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {t("about.stakeholders.scouts.title")}
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <TbPointFilled className="text-primary text-lg flex-shrink-0" />
                <span className="text-gray-700">
                  {t("about.stakeholders.scouts.bloodGroupId")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <TbPointFilled className="text-primary text-lg flex-shrink-0" />
                <span className="text-gray-700">
                  {t("about.stakeholders.scouts.dataUploading")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <TbPointFilled className="text-primary text-lg flex-shrink-0" />
                <span className="text-gray-700">
                  {t("about.stakeholders.scouts.awarenessCampaign")}
                </span>
              </div>
            </div>
          </div>

          {/* Users */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 lg:col-span-3">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <FaChartLine className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {t("about.stakeholders.users.title")}
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <TbPointFilled className="text-purple-600 text-lg flex-shrink-0" />
                <span className="text-gray-700 font-medium">
                  {t("about.stakeholders.users.registerDonors")}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                <TbPointFilled className="text-pink-600 text-lg flex-shrink-0" />
                <span className="text-gray-700 font-medium">
                  {t("about.stakeholders.users.contactDonors")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
            <FaHeart className="text-white text-2xl" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            {t("cta.title")}
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                {t("cta.register")}
              </button>
            </Link>
            <Link href="/media">
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors">
                {t("cta.learnMore")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
