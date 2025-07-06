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
      <Card hoverable className="bg-popover p-5 h-[280px]">
        <div
          className={`relative ${!token ? "cursor-pointer" : ""}`}
          onClick={() => {
            if (!token) {
              router.push("/login");
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
                alt={fullName}
              />
              <div>
                <h1 className="flex items-center gap-1 text-lg font-semibold">
                  {fullName}
                  <span className="bg-yellow-600 text-white p-[3px] rounded-md">
                    <Tooltip
                      title={t("donarCard.frequentDonorTooltip")}
                      colorText="#000"
                      color={"#a78017"}
                      key={1}
                    >
                      <LuCrown className="text-sm" />
                    </Tooltip>
                  </span>
                </h1>
                <span className="text-xs text-accent">
                  {t("donarCard.lastDonatedDaysAgo").replace(
                    "{{days}}",
                    lastDonationDayCount ?? "Unknown"
                  )}
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary">{bloodGroup}</h1>
            </div>
          </div>

          <hr className="my-5" />

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
                <h1 className="ml-1 text-base font-semibold">
                  {t("donarCard.contact")}
                </h1>
              </div>
              <div className="text-sm text-accent text-right">
                {mobileNumber}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <BiDonateBlood className="text-primary text-lg" />
                <h1 className="ml-1 text-base font-semibold">
                  {t("donarCard.numberOfDonation")}
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
                  {t("donarCard.physicalComplexity")}
                </h1>
              </div>
              <div className="text-sm text-accent text-right">
                {physicalComplexity === "Yes"
                  ? t("donarCard.yes")
                  : t("donarCard.no")}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 my-3">
              <div className="flex items-center gap-1">
                <FaHandHoldingHeart className="text-primary text-lg" />
                <h1 className="ml-1 text-base font-semibold">
                  {t("donarCard.donationStatus")}
                </h1>
              </div>
              {/* <div className="text-sm text-accent text-right">
                {localStorage.getItem("language") === "en" ? (
                  { bloodDonationStatus }
                ) : (
                  <>
                    {bloodDonationStatus === "Interested"
                      ? "আগ্রহী"
                      : "আগ্রহী নই"}
                  </>
                )}
              </div> */}

              {t(`donarCard.donationStatusMap.${bloodDonationStatus}`)}
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
