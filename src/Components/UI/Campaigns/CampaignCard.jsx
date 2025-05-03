import { Card, Image } from "antd";
import React, { useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import formatDate from "@/src/shared/ReusedFunctions";
import CampaignDetailsModal from "./CampaignDetailsModal";

const CampaignCard = ({ campaign }) => {
  const [CampaignDetailModal, setCampaignDetailModal] = useState(false);

  const handleCampaignDetailModal = () => {
    setCampaignDetailModal(!CampaignDetailModal);
  };

  const { address, bannerUrl, startDate, endDate, name, volunteerList } =
    campaign;

  return (
    <div>
      {" "}
      <Card hoverable className="">
        <div>
          <div className="flex flex-wrap gap-2">
            {" "}
            <div className=" overflow-hidden h-[200px] min-w-[200px]">
              <Image
                className="border object-cover w-full h-full rounded-l-md"
                src={
                  bannerUrl
                    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${bannerUrl}`
                    : "  https://static.vecteezy.com/system/resources/previews/025/406/648/non_2x/infographic-of-blood-donation-with-receiving-to-human-in-various-blood-groups-and-example-texts-and-red-gradient-background-poster-s-infographic-of-world-blood-donor-day-campaign-in-design-vector.jpg"
                }
                width={200}
                height={200}
                alt="Picture of the Campaign"
              />
            </div>
            <div
              onClick={() => handleCampaignDetailModal()}
              className="my-1 p-2"
            >
              <h1 className="mb-4 mt-2 text-lg font-semibold">
                
              {name.length > 35 ? `${name.slice(0, 35)}...` : name}
                </h1>
              <div className="flex gap-2 my-3">
                <FaMapLocationDot className="text-primary text-xl" />{" "}
                <div className="text-sm text-accent ">
                  {" "}
                  {address.length > 35 ? `${address.slice(0, 35)}...` : address}
                </div>
              </div>
              <div className="flex gap-2 my-3">
                <MdOutlineDateRange className="text-primary text-xl" />{" "}
                <div className="text-sm text-accent ">
                  <span className="text-black font-semibold">Start at :</span>{" "}
                  {formatDate(startDate)}
                </div>
              </div>
              <div className="flex gap-2 my-3">
                <MdOutlineDateRange className="text-primary text-xl" />{" "}
                <div className="text-sm text-accent ">
                  <span className="text-black font-semibold">End at :</span>{" "}
                  {formatDate(endDate)}
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <IoIosPeople className="text-primary text-xl" />{" "}
                <div className="text-sm text-accent ">
                  <span className="text-black font-semibold">Volunteers :</span>{" "}
                  {volunteerList?.length || 0}
                </div>
              </div>
              {/* <div className="mt-2 text-primary text-xs">more details</div> */}
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
