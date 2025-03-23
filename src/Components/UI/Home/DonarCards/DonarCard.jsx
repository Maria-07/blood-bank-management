import { Avatar, Card, Image, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import { LuCrown } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import {
  FaAccessibleIcon,
  FaHandHoldingHeart,
  FaRegHandBackFist,
} from "react-icons/fa6";
import {
  BiDonateBlood,
  BiDonateHeart,
  BiSolidDonateHeart,
} from "react-icons/bi";
import { formatDistanceToNow, parseISO } from "date-fns";
import UserProfileModal from "../../User/UserProfileModal";
import { useAuth } from "@/src/Hook/AuthContext";
import { useRouter } from "next/navigation";

const DonarCard = ({ record = {} }) => {
  const router = useRouter();
  const { token, logout } = useAuth();
  const [UserDetails, setUserDetails] = useState(false);
  const handleUserDetails = () => {
    setUserDetails(!UserDetails);
  };

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
      <Card
        // onClick={handleUserDetails}
        hoverable
        className="bg-popover p-5 h-[280px]"
      >
        <div
          className={`relative ${!token ? "cursor-pointer" : ""}`}
          onClick={() => {
            if (!token) {
              console.log("Redirecting to register...");
              router.push("/register");
            }
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <Image
                className="border rounded-full"
                src={
                  imageUrl
                    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${imageUrl}`
                    : "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                }
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
                  Last donated: {record.lastDonationDayCount} days ago
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary">{bloodGroup}</h1>
            </div>
          </div>
          <hr className="my-5" />
          {!token && (
            <h1 className="absolute left-[10%] top-[60%] text-secondary font-semibold text-center">
              Register to view more information.
            </h1>
          )}
          <div
            className={`${
              token ? "" : "blur-sm pointer-events-none opacity-50"
            }`}
            onClick={() => {
              if (!token) {
                router.push("/register");
              }
            }}
          >
            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <FaPhoneAlt className="text-primary text-lg" />
                <h1 className="ml-1 text-base font-semibold">Contact</h1>
              </div>
              <div className="text-sm text-accent text-right">
                {mobileNumber}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <BiDonateBlood className="text-primary text-lg" />
                <h1 className="ml-1 text-base font-semibold">
                  Number of Donation
                </h1>
              </div>
              <div className="text-sm text-accent text-right">
                {bloodDonationCount}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <FaAccessibleIcon className="text-primary text-lg" />
                <h1 className="ml-1 text-base font-semibold">
                  Physical Complexity
                </h1>
              </div>
              <div className="text-sm text-accent text-right">
                {record.physicalComplexity ? "Yes" : "No"}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <FaHandHoldingHeart className="text-primary text-lg" />
                <h1 className="ml-1 text-base font-semibold">
                  Donation Status
                </h1>
              </div>
              <div className="text-sm text-accent text-right">
                {bloodDonationStatus}
              </div>
            </div>
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
