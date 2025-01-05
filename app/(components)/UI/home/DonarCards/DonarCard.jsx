import { Avatar, Card, Image, Tooltip } from "antd";
import React from "react";
import { LuCrown } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import {
  BiDonateBlood,
  BiDonateHeart,
  BiSolidDonateHeart,
} from "react-icons/bi";

const DonarCard = () => {
  return (
    <div>
      <Card hoverable className="bg-popover">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <Image
                className="border rounded-full"
                src={
                  "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                }
                width={50}
                height={50}
                alt="Picture of the author"
              ></Image>
              <div>
                <h1 className="flex items-center gap-1 text-lg font-semibold">
                  Jhon Smith{" "}
                  <span className="bg-yellow-600 text-white p-[3px] rounded-md">
                    {" "}
                    <Tooltip
                      title="Frequent Donar"
                      colorText="#000"
                      color={"#a78017"}
                      key={1}
                    >
                      <LuCrown className="text-sm" />{" "}
                    </Tooltip>
                  </span>{" "}
                </h1>
                <span className="text-xs text-accent">
                  Last donated: 3 days ago
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary">AB+</h1>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <IoLocationOutline className="text-primary text-lg" />{" "}
                <h1 className="text-base font-semibold">Address</h1>
              </div>
              <div className="text-sm text-accent text-right">
                64167 Keanu Throughway, North Jackland,District of Columbia,
                68697
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <FaPhoneAlt className="text-primary text-lg" />{" "}
                <h1 className="text-base font-semibold">Contact</h1>
              </div>
              <div className="text-sm text-accent text-right">
                +1 (555) 765-4321
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <BiDonateBlood className="text-primary text-lg" />{" "}
                <h1 className="text-base font-semibold">Donations</h1>
              </div>
              <div className="text-sm text-accent text-right">24</div>
            </div>
            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <BiSolidDonateHeart className="text-primary text-lg" />{" "}
                <h1 className="text-base font-semibold">Last donated</h1>
              </div>
              <div className="text-sm text-accent text-right">23/01/2020</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DonarCard;
