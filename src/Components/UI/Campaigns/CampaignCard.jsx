import { Card, Image } from "antd";
import React, { useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import formatDate from "@/src/shared/ReusedFunctions";
import CampaignDetailsModal from "./CampaignDetailsModal";
import { useTranslation } from "@/src/Hook/useTranslation";

const CampaignCard = ({ campaign }) => {
  const { t } = useTranslation();
  const [CampaignDetailModal, setCampaignDetailModal] = useState(false);

  const handleCampaignDetailModal = () => {
    setCampaignDetailModal(!CampaignDetailModal);
  };

  const { address, bannerUrl, startDate, endDate, name, volunteerList } =
    campaign;

  return (
    <div>
      {" "}
      <Card
        hoverable
        className="transition-shadow duration-300 shadow-md hover:shadow-xl rounded-2xl border-0 bg-gradient-to-br from-[#f3f3f3] via-[#f8fafc] to-[#e0e7ff] p-0"
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative md:w-1/3 w-full h-[180px] md:h-auto overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
            <Image
              className="object-cover w-full h-full"
              src={
                bannerUrl
                  ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${bannerUrl}`
                  : "https://static.vecteezy.com/system/resources/previews/025/406/648/non_2x/infographic-of-blood-donation-with-receiving-to-human-in-various-blood-groups-and-example-texts-and-red-gradient-background-poster-s-infographic-of-world-blood-donor-day-campaign-in-design-vector.jpg"
              }
              width={320}
              height={220}
              alt="Picture of the Campaign"
              preview={false}
              style={{ borderRadius: "inherit" }}
            />
            <div className="absolute top-2 left-2 bg-primary2/90 text-white text-xs px-3 py-1 rounded-full shadow font-semibold z-10">
              {t("campaignCard.volunteers")}: {volunteerList?.length || 0}
            </div>
          </div>
          {/* Content Section */}
          <div
            onClick={handleCampaignDetailModal}
            className="flex-1 flex flex-col justify-between p-5 cursor-pointer"
          >
            <div>
              <h2 className="text-xl font-bold font-primary text-primary mb-2 line-clamp-2">
                {name.length > 50 ? `${name.slice(0, 50)}...` : name}
              </h2>
              <div className="flex items-center gap-2 mb-2 text-accent">
                <FaMapLocationDot className="text-secondary text-lg" />
                <span className="text-sm truncate">
                  {address.length > 50 ? `${address.slice(0, 50)}...` : address}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <MdOutlineDateRange className="text-primary text-lg" />
                  <span className="text-xs text-gray-500">
                    <span className="font-semibold text-black">
                      {t("campaignCard.startAt")}:
                    </span>{" "}
                    {formatDate(startDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineDateRange className="text-primary text-lg" />
                  <span className="text-xs text-gray-500">
                    <span className="font-semibold text-black">
                      {t("campaignCard.endAt")}:
                    </span>{" "}
                    {formatDate(endDate)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                className="px-4 py-1 bg-secondary text-white rounded-full text-xs font-semibold shadow hover:bg-primary transition"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCampaignDetailModal();
                }}
              >
                {t("campaignCard.moreDetails")}
              </button>
            </div>
          </div>
        </div>
        {CampaignDetailModal && (
          <CampaignDetailsModal
            record={campaign}
            clicked={CampaignDetailModal}
            handleClose={handleCampaignDetailModal}
          />
        )}
      </Card>
    </div>
  );
};

export default CampaignCard;
