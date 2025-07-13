"use client";

import formatDate from "@/src/shared/ReusedFunctions";
import { Image, Modal } from "antd";
import React from "react";
import { BiSolidInstitution } from "react-icons/bi";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoIosPeople, IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdOutlineDateRange } from "react-icons/md";
import { useTranslation } from "@/src/Hook/useTranslation";

const CampaignDetailsModal = ({ handleClose, clicked, record }) => {
  const { t } = useTranslation();

  const {
    address,
    institute,
    bannerUrl,
    startDate,
    endDate,
    name,
    volunteerList,
  } = record;

  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        width={600}
        closable={false}
        className="box"
      >
        <div className="p-0">
          {/* Redesigned Header */}
          <div className="flex items-center justify-between border-b pb-3 mb-4">
            <h1 className="text-2xl font-bold tracking-tight text-primary">
              {t("campaignDetails.title")}
            </h1>
            <button
              onClick={handleClose}
              className="focus:outline-none hover:scale-110 transition-transform"
              aria-label="Close"
              type="button"
            >
              <IoMdCloseCircleOutline className="text-gray-400 text-3xl hover:text-primary" />
            </button>
          </div>

          {/* Banner */}
          <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6 shadow-md">
            <Image
              preview={false}
              className="object-cover w-full h-full"
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${bannerUrl}`}
              alt="Campaign banner"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-2">
              <h2 className="text-white text-xl font-semibold truncate">
                {name}
              </h2>
            </div>
          </div>

          {/* Info Grid */}
          {/* New Card-style Info Section */}
          <div className="mb-6">
            {/* Left Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Institute */}
              <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col items-center text-center border border-primary/10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <BiSolidInstitution className="text-primary text-2xl" />
                </div>
                <div className="text-xs text-primary font-bold uppercase tracking-wider mb-1">
                  {t("campaignDetails.institute")}
                </div>
                <div className="text-base font-semibold text-gray-800 break-words">
                  {institute}
                </div>
              </div>{" "}
              {/* Volunteers */}
              <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col items-center text-center border border-primary/10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <IoIosPeople className="text-primary text-2xl" />
                </div>
                <div className="text-xs text-primary font-bold uppercase tracking-wider mb-1">
                  {t("campaignDetails.volunteers")}
                </div>
                <div className="text-base font-semibold text-gray-800">
                  {volunteerList?.length || 0}
                </div>
              </div>
              {/* Start Date */}
              <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col items-center text-center border border-primary/10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <MdOutlineDateRange className="text-primary text-2xl" />
                </div>
                <div className="text-xs text-primary font-bold uppercase tracking-wider mb-1">
                  {t("campaignDetails.start")}
                </div>
                <div className="text-base font-semibold text-gray-800">
                  {formatDate(startDate)}
                </div>
              </div>
              {/* End Date */}
              <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col items-center text-center border border-primary/10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <MdOutlineDateRange className="text-primary text-2xl" />
                </div>
                <div className="text-xs text-primary font-bold uppercase tracking-wider mb-1">
                  {t("campaignDetails.end")}
                </div>
                <div className="text-base font-semibold text-gray-800">
                  {formatDate(endDate)}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col items-center text-center border border-primary/10 sm:col-span-2">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <FaMapLocationDot className="text-primary text-2xl" />
                </div>
                <div className="text-xs text-primary font-bold uppercase tracking-wider mb-1">
                  {t("campaignDetails.address")}
                </div>
                <div className="text-base font-semibold text-gray-800 break-words ">
                  {address.length > 55 ? `${address.slice(0, 55)}...` : address}
                </div>
              </div>
            </div>
          </div>

          {/* Cancel Button */}
          <div className="flex justify-end">
            <button
              onClick={handleClose}
              type="button"
              className="flex items-center gap-2 bg-secondary hover:bg-primary transition-colors text-white font-semibold px-5 py-2 rounded-lg shadow-md focus:outline-none"
            >
              <MdDeleteOutline className="text-lg" />
              <span>{t("campaignDetails.cancel")}</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CampaignDetailsModal;
