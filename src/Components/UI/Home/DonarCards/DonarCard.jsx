import { Avatar, Card, Image, Tooltip } from "antd";
import React, { useState } from "react";
import { LuCrown } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaAccessibleIcon, FaHandHoldingHeart } from "react-icons/fa6";
import { BiDonateBlood } from "react-icons/bi";
import { formatDistanceToNow, parseISO } from "date-fns";
import UserProfileModal from "../../User/UserProfileModal";
import { useAuth } from "@/src/Hook/AuthContext";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/src/Hook/useTranslation";

const DonarCard = ({ record = {} }) => {
  const router = useRouter();
  const { token } = useAuth();
  const { t } = useTranslation(); // get the translation function
  const [UserDetails, setUserDetails] = useState(false);

  console.log(t);

  const handleUserDetails = () => {
    setUserDetails(!UserDetails);
  };

  const {
    bloodDonationCount,
    bloodDonationStatus,
    bloodGroup,
    fullName,
    imageUrl,
    mobileNumber,
    lastDonationDayCount,
    physicalComplexity,
  } = record;

  return (
    <div>
      <Card
        hoverable
        className="p-5 h-[280px] border-0 shadow-md"
        style={{
          background: "linear-gradient(120deg, #f3f3f3 60%, #e0e7ff 100%)",
        }}
      >
        <div
          className={`relative group transition-all duration-200 ${
            !token ? "cursor-pointer" : ""
          }`}
          onClick={() => {
            if (!token) {
              router.push("/login");
            }
          }}
        >
          {/* Top Section: Avatar, Name, Blood Group */}
          <div className="flex items-center justify-between mb-4">
            {/* Avatar & Name */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  className="border-2 border-primary rounded-full shadow-md"
                  src={
                    imageUrl
                      ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${imageUrl}`
                      : "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                  }
                  width={60}
                  height={60}
                  alt={fullName}
                  preview={false}
                />
                {/* Crown for frequent donor */}
                <span className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1 shadow-md">
                  <Tooltip
                    title={t("donarCard.frequentDonorTooltip")}
                    colorText="#000"
                    color={"#a78017"}
                    key={1}
                  >
                    <LuCrown className="text-white text-base" />
                  </Tooltip>
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {fullName}
                </h2>
                <span className="text-xs text-accent block mt-1">
                  {t("donarCard.lastDonatedDaysAgo").replace(
                    "{{days}}",
                    lastDonationDayCount ?? "Unknown"
                  )}
                </span>
              </div>
            </div>
            {/* Blood Group */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  className="drop-shadow-lg"
                >
                  <defs>
                    <radialGradient
                      id="bloodGradient"
                      cx="50%"
                      cy="50%"
                      r="50%"
                    >
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="100%" stopColor="#be123c" />
                    </radialGradient>
                  </defs>
                  <circle
                    cx="30"
                    cy="30"
                    r="28"
                    fill="url(#bloodGradient)"
                    stroke="#fff"
                    strokeWidth="3"
                  />
                  <text
                    x="50%"
                    y="54%"
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="2em"
                    fontWeight="bold"
                    dy=".3em"
                  >
                    {bloodGroup}
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[2px] bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 my-3 rounded-full" />

          {/* Details Section */}
          <div
            className={`transition-all duration-200 ${
              token ? "" : "blur-sm pointer-events-none opacity-60"
            }`}
            onClick={() => {
              if (!token) {
                router.push("/register");
              }
            }}
          >
            <div className="grid grid-cols-2 gap-3">
              {/* Contact */}
              <div className="flex items-center gap-2 bg-primary/5 rounded-lg p-2">
                <FaPhoneAlt className="text-primary text-lg" />
                <div>
                  <div className="text-xs text-accent">
                    {t("donarCard.contact")}
                  </div>
                  <div className="text-sm font-semibold">{mobileNumber}</div>
                </div>
              </div>
              {/* Number of Donations */}
              <div className="flex items-center gap-2 bg-primary/5 rounded-lg p-2">
                <BiDonateBlood className="text-primary text-lg" />
                <div>
                  <div className="text-xs text-accent">
                    {t("donarCard.numberOfDonation")}
                  </div>
                  <div className="text-sm font-semibold">
                    {bloodDonationCount}
                  </div>
                </div>
              </div>
              {/* Physical Complexity */}
              <div className="flex items-center gap-2 bg-primary/5 rounded-lg p-2">
                <FaAccessibleIcon className="text-primary text-lg" />
                <div>
                  <div className="text-xs text-accent">
                    {t("donarCard.physicalComplexity")}
                  </div>
                  <div className="text-sm font-semibold">
                    {physicalComplexity === "Yes"
                      ? t("donarCard.yes")
                      : t("donarCard.no")}
                  </div>
                </div>
              </div>
              {/* Donation Status */}
              <div className="flex items-center gap-2 bg-primary/5 rounded-lg p-2">
                <FaHandHoldingHeart className="text-primary text-lg" />
                <div>
                  <div className="text-xs text-accent">
                    {t("donarCard.donationStatus")}
                  </div>
                  <div className="text-sm font-semibold">
                    {t(`donarCard.donationStatusMap.${bloodDonationStatus}`)}
                  </div>
                </div>
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
        />
      )}
    </div>
  );
};

export default DonarCard;
