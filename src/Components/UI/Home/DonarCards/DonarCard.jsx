import { Avatar, Card, Image, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import { LuCrown } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import {
  BiDonateBlood,
  BiDonateHeart,
  BiSolidDonateHeart,
} from "react-icons/bi";
import { formatDistanceToNow, parseISO } from "date-fns";
import UserProfileModal from "../../User/UserProfileModal";
import { useAnimation } from "framer-motion";

const DonarCard = ({ record = {} }) => {
  const [UserDetails, setUserDetails] = useState(false);
  const handleUserDetails = () => {
    setUserDetails(!UserDetails);
  };

  const controls = useAnimation();
  const ref = useRef(null);

  const {
    address,
    bloodDonationCount,
    bloodDonationStatus,
    bloodGroup,
    dateOfBirth,
    district,
    districtName,
    fatherName,
    fullName,
    gender,
    id,
    imageUrl,
    isApproved,
    isSuperAdmin,
    lastDonationTime,
    mobileNumber,
    motherName,
    password,
    profilePicture,
    union,
    unionName,
    upazila,
    upazilaName,
    userType,
  } = record;
  const getLastDonationTime = (time) => {
    if (!time) return "Unknown";
    const donationDate = parseISO(time);
    return `${formatDistanceToNow(donationDate, {
      addSuffix: true,
    })}`;
  };

  console.log(record);

  return (
    <div>
      <Card onClick={handleUserDetails} hoverable className="bg-popover p-5">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <Image
                className="border rounded-full"
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${imageUrl}`}
                width={50}
                height={50}
                alt="Picture of the author"
              ></Image>
              <div>
                <h1 className="flex items-center gap-1 text-lg font-semibold">
                  {fullName}
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
                  Last donated: {getLastDonationTime(lastDonationTime)}
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary">{bloodGroup}</h1>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <IoLocationOutline className="text-primary text-lg" />{" "}
                <h1 className="text-base font-semibold">Address</h1>
              </div>
              <div className="text-sm text-accent text-right">{address}</div>
            </div>
            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <FaPhoneAlt className="text-primary text-lg" />{" "}
                <h1 className="text-base font-semibold">Contact</h1>
              </div>
              <div className="text-sm text-accent text-right">
                {mobileNumber}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <BiDonateBlood className="text-primary text-lg" />{" "}
                <h1 className="text-base font-semibold">Donations</h1>
              </div>
              <div className="text-sm text-accent text-right">
                {bloodDonationCount}
              </div>
            </div>
            {/* <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <BiSolidDonateHeart className="text-primary text-lg" />{" "}
                <h1 className="text-base font-semibold">Last donated</h1>
              </div>
              <div className="text-sm text-accent text-right">
                {lastDonationTime}
              </div>
            </div> */}
          </div>
        </div>
      </Card>

      {UserDetails && (
        <UserProfileModal
          record={record}
          handleClose={handleUserDetails}
          clicked={UserDetails}
        ></UserProfileModal>
      )}
    </div>
  );
};

export default DonarCard;
