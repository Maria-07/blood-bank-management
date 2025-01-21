import { Card, Image } from "antd";
import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import formatDate from "@/src/shared/ReusedFunctions";

const Campaign = ({ campaign }) => {
  console.log("single campaign", campaign);

  // function formatDate(dateString) {
  //   const date = new Date(dateString);

  //   // Get day, month, and year
  //   const day = date.getDate();
  //   const month = date.toLocaleString("default", { month: "long" });
  //   const year = date.getFullYear();

  //   // Add ordinal suffix to the day
  //   const dayWithSuffix =
  //     day +
  //     ["th", "st", "nd", "rd"][
  //       day % 10 > 3 || Math.floor((day % 100) / 10) === 1 ? 0 : day % 10
  //     ];

  //   return `${dayWithSuffix} ${month}, ${year}`;
  // }

  const { address, bannerUrl, startDate, endDate, name } = campaign;

  return (
    <div>
      {" "}
      <Card hoverable className="mb-16 min-h-[580px] ">
        <div>
          <div className="h-[250px] overflow-hidden rounded-t-lg shadow-lg relative">
            {" "}
            <Image
              // src={bannerUrl}
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${bannerUrl}`}
              width={"100%"}
              height={"100%"}
              alt="Picture of the author"
            ></Image>
          </div>

          <div className="my-3 p-5">
            <h1 className=" text-lg font-semibold">{name}</h1>
            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <IoLocationOutline className="text-primary text-lg" />{" "}
                <h1 className="text-base font-semibold">Address: </h1>
              </div>
              <div className="text-sm text-accent text-right">{address}</div>
            </div>
            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <FaMapLocationDot className="text-primary text-lg" />{" "}
                <h1 className="text-base font-semibold">District: </h1>
              </div>
              <div className="text-sm text-accent text-right">Dhaka</div>
            </div>
            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <MdOutlineDateRange className="text-primary text-lg" />{" "}
                <h1 className="text-base font-semibold">Start at:</h1>
              </div>
              <div className="text-sm text-accent text-right">
                {formatDate(startDate)}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <MdOutlineDateRange className="text-primary text-lg" />{" "}
                <h1 className="text-base font-semibold">Ends at:</h1>
              </div>
              <div className="text-sm text-accent text-right">
                {formatDate(endDate)}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <IoIosPeople className="text-primary text-lg" />{" "}
                <h1 className="text-base font-semibold">Volunteers : </h1>
              </div>
              <div className="text-sm text-accent text-right">10</div>
            </div>
          </div>

          <button className="bg-primary w-full text-white  hover:bg-secondary py-[1px] shadow-md transition-all absolute bottom-0">
            Learn more
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Campaign;
