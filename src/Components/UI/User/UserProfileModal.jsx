import { useAuth } from "@/src/Hook/AuthContext";
import { Image, Modal, Tooltip } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useForm } from "react-hook-form";
import { FaHandHoldingHeart, FaRegHandBackFist } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";

const UserProfileModal = ({ handleClose, clicked, record, admin }) => {
  console.log(record);
  const { token } = useAuth();
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
              User Profile{" "}
              <div
                className={`${
                  token ? "" : "blur-sm pointer-events-none opacity-50"
                }`}
              >
                {" "}
                {isApproved ? (
                  <button className="text-green-500 bg-green-50 text-[14px] px-2 py-[1px] font-semibold rounded-md">
                    Approved
                  </button>
                ) : (
                  <button className="text-red-500 bg-soft text-[14px] px-2 py-[1px] font-semibold rounded-md">
                    Pending
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
              className={`${
                token ? "" : "blur-sm pointer-events-none opacity-50"
              }`}
            >
              <div className="border-[1px] p-3 rounded-md mb-3">
                <div className="flex items-center flex-wrap gap-3">
                  <div className="h-[80px] w-[80px] overflow-hidden rounded-full">
                    <Image
                      className="border object-cover w-full h-full"
                      src={
                        imageUrl
                          ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${imageUrl}`
                          : "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                      }
                      width={80}
                      height={80}
                      alt="Picture of the author"
                    />
                  </div>

                  <div>
                    <h1 className="text-capitalize font-semibold text-lg">
                      {fullName}
                    </h1>
                    <h2 className="text-capitalize text-accent text-sm font-semibold">
                      {code}
                    </h2>
                    <h2 className="text-capitalize text-accent text-sm font-semibold">
                      {userType}
                    </h2>
                    <h2 className="text-capitalize text-accent text-sm">
                      {address}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="border-[1px] p-3 rounded-md mb-3">
                <h1 className="font-semibold text-lg mb-2 text-primary2">
                  Personal information
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 mt-3 mr-2 gap-x-2 gap-y-3">
                  <div>
                    <h1 className="text-xs text-accent">Full Name</h1>
                    <h6 className="text-base font-semibold"> {fullName}</h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">Mobile Number</h1>
                    <h6 className="text-base font-semibold"> {mobileNumber}</h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">Date of Birth</h1>
                    <h6 className="text-base font-semibold"> {dateOfBirth}</h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">Gender</h1>
                    <h6 className="text-base font-semibold"> {gender}</h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">Father&apos;s Name</h1>
                    <h6 className="text-base font-semibold">
                      {" "}
                      {fatherName ? fatherName : "N/A"}
                    </h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">Mother&apos;s Name</h1>
                    <h6 className="text-base font-semibold">
                      {" "}
                      {motherName ? motherName : "N/A"}
                    </h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">District</h1>
                    <h6 className="text-base font-semibold">
                      {" "}
                      {districtName ? districtName : "N/A"}
                    </h6>
                  </div>{" "}
                  <div>
                    <h1 className="text-xs text-accent">Upazila</h1>
                    <h6 className="text-base font-semibold">
                      {" "}
                      {upazilaName ? upazilaName : "N/A"}
                    </h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">Union</h1>
                    <h6 className="text-base font-semibold">
                      {" "}
                      {unionName ? unionName : "N/A"}
                    </h6>
                  </div>
                  {/* <div className="grid grid-cols-1 lg:grid-cols-3 my-3 mr-2 gap-x-2 gap-y-3">
                    
                  </div> */}
                </div>
                <div className="pt-3">
                  {admin && record?.nidUrls?.length > 0 && (
                    <div>
                      <h1 className="text-xs text-accent">NID details</h1>
                      <div className="flex items-center mt-2 gap-2">
                        {record.nidUrls.map((n, i) => {
                          console.log(
                            `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${n}`
                          );

                          return (
                            <div key={i} className="overflow-hidden">
                              <Image
                                className="border object-cover w-full h-full"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${n}`}
                                width={100}
                                height={80}
                                alt="NID image"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-[1px] p-3 rounded-md mb-3">
                <h1 className="font-semibold text-primary2 text-lg mb-2">
                  Blood Donation Details
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 my-3 mr-2 gap-x-2 gap-y-3">
                  <div>
                    <h1 className="text-xs text-accent">Blood Group</h1>
                    <h6 className="text-base font-semibold"> {bloodGroup}</h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">Donation Count</h1>
                    <h6 className="text-base font-semibold">
                      {" "}
                      {bloodDonationCount} times
                    </h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">Last Donation Date</h1>
                    <h6 className="text-base font-semibold">
                      {/* {dayjs(lastDonationTime, "YYYY-MM-DD")} */}
                      {lastDonationTime?.split("T")[0]}
                    </h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">
                      Blood Donation Status
                    </h1>
                    <h6 className="text-base mt-[4px]">
                      {" "}
                      {bloodDonationStatus === "Interested" ? (
                        <span className="">
                          {" "}
                          <Tooltip
                            title="Interested"
                            colorText="#000"
                            color={"#c71919"}
                            key={1}
                          >
                            <FaHandHoldingHeart className="text-base text-secondary" />{" "}
                          </Tooltip>
                        </span>
                      ) : (
                        <span className="">
                          {" "}
                          <Tooltip
                            title="Not Interested"
                            colorText="#000"
                            color={"#a78017"}
                            key={1}
                          >
                            <FaRegHandBackFist className="text-base " />{" "}
                          </Tooltip>
                        </span>
                      )}{" "}
                    </h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">Physical Complexity</h1>
                    <h6 className="text-base font-semibold">
                      {PhysicalComplexity ? "Yes" : "No"}
                    </h6>
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
                  Cancel
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
