import { useAuth } from "@/src/Hook/AuthContext";
import { useTranslation } from "@/src/Hook/useTranslation";
import { Image, Modal, Tooltip } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useForm } from "react-hook-form";
import { FaHandHoldingHeart, FaRegHandBackFist } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";

const UserProfileModal = ({ handleClose, clicked, record, admin }) => {
  const { token } = useAuth();
  const { t } = useTranslation();
  const {
    address,
    bloodDonationCount,
    bloodDonationStatus,
    bloodGroup,
    dateOfBirth,
    leaderType,
    districtName,
    fatherName,
    fullName,
    gender,
    id,
    imageUrl,
    isApproved,
    instituteName,
    lastDonationTime,
    mobileNumber,
    motherName,
    password,
    profilePicture,
    union,
    designation,
    unionName,
    upazila,
    PhysicalComplexity,
    upazilaName,
    userType,
    code,
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
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl flex items-center gap-2 font-semibold tracking-tight">
              {t("userProfile.userProfile")}
              <div
                className={`${
                  token ? "" : "blur-sm pointer-events-none opacity-50"
                }`}
              >
                {" "}
                {isApproved ? (
                  <button className="text-green-500 bg-green-50 text-[14px] px-2 py-[1px] font-semibold rounded-md">
                    {t("userProfile.approved")}
                  </button>
                ) : (
                  <button className="text-red-500 bg-soft text-[14px] px-2 py-[1px] font-semibold rounded-md">
                    {t("userProfile.pending")}
                  </button>
                )}
              </div>
            </h1>
            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 pt-[1px] my-3"></div>

          <form>
            <div
              className={`transition-all duration-300 ${
                token
                  ? "backdrop-blur-0 opacity-100"
                  : "backdrop-blur-sm pointer-events-none opacity-60"
              } rounded-lg shadow-inner bg-white/80`}
            >
              <div className="border border-gray-200 p-0 rounded-xl mb-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg overflow-hidden">
                <div className="bg-primary2/90 px-6 py-4 flex items-center gap-4">
                  <div className="flex flex-col flex-1">
                    <h1 className="text-2xl font-bold text-white tracking-wide mb-1">
                      {fullName}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs bg-white/20 text-white px-2 py-1 rounded font-semibold uppercase tracking-wider">
                        {userType}
                      </span>
                      {code && (
                        <span className="text-xs bg-white/10 text-white px-2 py-1 rounded font-semibold">
                          #{code}
                        </span>
                      )}
                    </div>{" "}
                    <h1 className="text-xs bg-white/10 text-white px-2 py-2 rounded font-semibold mt-2">
                      {address}
                    </h1>
                  </div>
                  <div className="h-20 w-20 rounded-full border-4 border-white shadow-lg overflow-hidden flex-shrink-0">
                    <Image
                      className="object-cover w-full h-full"
                      src={
                        imageUrl
                          ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${imageUrl}`
                          : "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                      }
                      width={80}
                      height={80}
                      alt="User profile picture"
                    />
                  </div>
                </div>
                <div className="px-6 py-5">
                  <h2 className="font-semibold text-lg text-primary2 mb-4 border-b border-primary2/20 pb-2">
                    {t("userProfile.personalInfo")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">
                        {t("userProfile.fullName")}
                      </span>
                      <span className="block text-base font-medium text-gray-800">
                        {fullName}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">
                        {t("userProfile.mobileNumber")}
                      </span>
                      <span className="block text-base font-medium text-gray-800">
                        {mobileNumber}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">
                        {t("userProfile.dateOfBirth")}
                      </span>
                      <span className="block text-base font-medium text-gray-800">
                        {dateOfBirth}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">
                        {t("userProfile.gender")}
                      </span>
                      <span className="block text-base font-medium text-gray-800">
                        {gender}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">
                        {t("userProfile.fatherName")}
                      </span>
                      <span className="block text-base font-medium text-gray-800">
                        {fatherName ? fatherName : "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">
                        {t("userProfile.motherName")}
                      </span>
                      <span className="block text-base font-medium text-gray-800">
                        {motherName ? motherName : "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">
                        {t("userProfile.district")}
                      </span>
                      <span className="block text-base font-medium text-gray-800">
                        {districtName ? districtName : "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">
                        {t("userProfile.upazila")}
                      </span>
                      <span className="block text-base font-medium text-gray-800">
                        {upazilaName ? upazilaName : "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">
                        {t("userProfile.union")}
                      </span>
                      <span className="block text-base font-medium text-gray-800">
                        {unionName ? unionName : "N/A"}
                      </span>
                    </div>
                    {(leaderType === "Deputy Commissioner Official" ||
                      leaderType === "Civil Surgeon Official") && (
                      <div>
                        <span className="block text-xs text-gray-500 mb-1">
                          {t("userProfile.designation")}
                        </span>
                        <span className="block text-base font-medium text-gray-800">
                          {designation ? designation : "N/A"}
                        </span>
                      </div>
                    )}
                    {userType !== "donor" && (
                      <div>
                        <span className="block text-xs text-gray-500 mb-1">
                          {t("userProfile.institution")}
                        </span>
                        <span className="block text-base font-medium text-gray-800">
                          {instituteName ? instituteName : "N/A"}
                        </span>
                      </div>
                    )}
                  </div>
                  {Array.isArray(record?.nidUrls) &&
                    record?.nidUrls.length > 0 &&
                    admin && (
                      <div className="mt-6">
                        <h3 className="text-xs text-accent font-semibold mb-2">
                          {t("userProfile.nidDetails")}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3">
                          {record.nidUrls.map((n, i) => (
                            <div
                              key={i}
                              className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm"
                            >
                              <Image
                                className="object-cover w-[100px] h-[80px]"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${n}`}
                                width={100}
                                height={80}
                                alt="NID image"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
                <div className="px-6 py-5">
                  <h2 className="font-semibold text-lg text-primary2 mb-4 border-b border-primary2/20 pb-2">
                    {t("userProfile.bloodDonationDetails")}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3 mr-2">
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">
                        {t("userProfile.bloodGroup")}
                      </span>
                      <span className="block text-base font-medium text-gray-800">
                        {bloodGroup || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">
                        {t("userProfile.bloodDonationCount")}
                      </span>
                      <span className="block text-base font-medium text-gray-800">
                        {bloodDonationCount ?? 0} times
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">
                        {t("userProfile.lastDonationDate")}
                      </span>
                      <span className="block text-base font-medium text-gray-800">
                        {lastDonationTime
                          ? lastDonationTime.split("T")[0]
                          : "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">
                        {t("userProfile.bloodDonationStatus")}
                      </span>
                      <span className="block text-base font-medium text-gray-800">
                        {bloodDonationStatus === "Interested"
                          ? t("userProfile.interested")
                          : t("userProfile.notInterested")}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">
                        {t("userProfile.physicalComplexity")}
                      </span>
                      <span className="block text-base font-medium text-gray-800">
                        {PhysicalComplexity
                          ? t("userProfile.yes")
                          : t("userProfile.no")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-end gap-2 mt-2">
              <button
                onClick={handleClose}
                className="border-secondary flex items-center border rounded-sm"
              >
                <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                  {t("userProfile.cancel")}
                </span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfileModal;
