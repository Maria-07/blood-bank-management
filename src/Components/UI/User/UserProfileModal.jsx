import { Image, Modal, Tooltip } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { FaHandHoldingHeart, FaRegHandBackFist } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";

const UserProfileModal = ({ handleClose, clicked, record }) => {
  console.log(record);

  const {
    address,
    bloodDonationCount,
    bloodDonationStatus,
    bloodGroup,
    dateOfBirth,
    district,
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
    upazila,
    userType,
  } = record;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {};
  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        width={700}
        closable={false}
        className="box"
      >
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">
              User Profile{" "}
              {isApproved ? (
                <button className="text-green-500 bg-green-50 text-[14px] px-2 py-[1px] font-semibold rounded-md">
                  Approved
                </button>
              ) : (
                <button className="text-red-500 bg-soft text-[14px] px-2 py-[1px] font-semibold rounded-md">
                  Pending
                </button>
              )}
            </h1>
            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 pt-[1px] my-3"></div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="border-[1px] p-5 rounded-md mb-5">
                <div className="flex items-center flex-wrap gap-3">
                  <Image
                    className="border rounded-full"
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&s"
                    }
                    // src={profilePicture}
                    width={80}
                    height={80}
                    alt="Picture of the author"
                  ></Image>
                  <div>
                    <h1 className="text-capitalize font-semibold text-lg">
                      {fullName}
                    </h1>

                    <h2 className="text-capitalize text-accent text-sm font-semibold">
                      {userType}
                    </h2>
                    <h2 className="text-capitalize text-accent text-sm">
                      {address}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="border-[1px] p-5 rounded-md mb-5">
                <h1 className="font-semibold text-lg mb-5">
                  Personal information
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 my-3 mr-2 gap-x-2 gap-y-3">
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
                    <h1 className="text-xs text-accent">Blood Group</h1>
                    <h6 className="text-base font-semibold"> {bloodGroup}</h6>
                  </div>

                  <div>
                    <h1 className="text-xs text-accent">Gender</h1>
                    <h6 className="text-base font-semibold"> {gender}</h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">Last Donation Date</h1>
                    <h6 className="text-base font-semibold">
                      {lastDonationTime}
                    </h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">Father&apos;s Name</h1>
                    <h6 className="text-base font-semibold"> {fatherName}</h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">Mother&apos;s Name</h1>
                    <h6 className="text-base font-semibold"> {motherName}</h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">
                      Blood Donation Status
                    </h1>
                    <h6 className="text-base mt-[4px]">
                      {" "}
                      {bloodDonationStatus === "interested" ? (
                        <span className="">
                          {" "}
                          <Tooltip
                            title="Interested"
                            colorText="#000"
                            color={"#c71919"}
                            key={1}
                          >
                            <FaHandHoldingHeart className="text-base" />{" "}
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
                            <FaRegHandBackFist className="text-base" />{" "}
                          </Tooltip>
                        </span>
                      )}{" "}
                    </h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">Donation Count</h1>
                    <h6 className="text-base font-semibold">
                      {" "}
                      {bloodDonationCount} times
                    </h6>
                  </div>
                </div>
              </div>
              <div className="border-[1px] p-5 rounded-md mb-5">
                <h1 className="font-semibold text-lg mb-5">Address</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 my-3 mr-2 gap-x-2 gap-y-3">
                  <div>
                    <h1 className="text-xs text-accent">District</h1>
                    <h6 className="text-base font-semibold"> {district}</h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">Union</h1>
                    <h6 className="text-base font-semibold"> {union}</h6>
                  </div>
                  <div>
                    <h1 className="text-xs text-accent">Upazila</h1>
                    <h6 className="text-base font-semibold"> {upazila}</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-end gap-2 mt-2">
              <button
                onClick={handleClose}
                className="border-secondary flex items-center border rounded-sm"
              >
                <MdDeleteOutline className="text-white bg-secondary px-1 py-[2px] text-[28px]" />
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
