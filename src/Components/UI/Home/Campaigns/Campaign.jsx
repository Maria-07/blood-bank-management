import { Card, Image } from "antd";
import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";

const Campaign = () => {
  return (
    <div>
      {" "}
      <Card hoverable className="mb-16 min-h-[500px] p-5">
        <div>
          <Image
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4MOO0iC6xb7Z7vNl2JfamYWHr4sSfBD5pmA&s"
            }
            width={"100%"}
            height={"100%"}
            alt="Picture of the author"
          ></Image>
          <h1 className="my-5 text-lg font-semibold">
            Sukhipur Blood testing campagin
          </h1>

          <div className="my-3">
            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <IoLocationOutline className="text-primary text-lg" />{" "}
                <h1 className="text-base font-semibold">Address: </h1>
              </div>
              <div className="text-sm text-accent text-right">
                64167 Keanu Throughway, North Jackland,District of Columbia,
                68697
              </div>
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
                <h1 className="text-base font-semibold">Ends at:</h1>
              </div>
              <div className="text-sm text-accent text-right">
                26th January, 2025
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

          <button className="bg-primary w-full text-white  hover:bg-secondary py-[1px] shadow-md transition-all">
            Learn more
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Campaign;
