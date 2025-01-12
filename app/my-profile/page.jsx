"use client";
import { Avatar, Image } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import bloodBank from "@/src/assets/Image/bloodBank.png";

const MyProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Sign up data =", data);
  };

  return (
    <div className="min-h-screen">
      {" "}
      <div className="sm:w-[60%] sm:mx-auto mt-24 bg-primary rounded-md text-base px-5 py-2 text-white font-semibold">
        <h1>Update Your Profile</h1>
      </div>
      <div className="sm:w-[60%] sm:mx-auto  border py-10 sm:px-16 px-5 rounded-md shadow-md m-2">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {" "}
            <div className="flex justify-between">
              <div className="flex items-center gap-5">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <Image
                    className="border rounded-full"
                    src={
                      "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                    }
                    width={80}
                    height={80}
                    alt="Picture of the author"
                  ></Image>
                </div>
                <div className="">
                  <h1 className="text-xl font-primary text-primary">
                    Donar name
                  </h1>
                  <h2 className="text-sm text-gray-500">donar</h2>
                </div>
              </div>

              <div>
                <AiOutlineEdit
                  className="text-xl hover:text-primary text-dark"
                  title="Edit Profile"
                  onClick={() => setIsEdit(!isEdit)}
                />
              </div>
            </div>
            {isEdit && (
              <>
                {" "}
                <div className="mt-3">
                  <h1 className="input-title ">Update Your Profile Picture</h1>
                  <input
                    type="file"
                    className="border rounded-md w-full my-1"
                    {...register("ProfilePicture")}
                  />
                </div>
              </>
            )}
            <hr className="mb-10 mt-5" />{" "}
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-3">
              <div className="sm:col-span-2">
                {" "}
                <div>
                  <h1 className="input-title">
                    Full Name <span className="text-red-600">*</span>
                  </h1>
                  <input
                    type="text"
                    className="input-border w-full  mb-2"
                    {...register("FullName", {
                      required: {
                        value: true,
                        message: "First Name is required",
                      },
                    })}
                  />
                  <label className="label">
                    <span className="text-sm">
                      {" "}
                      {errors.FullName?.type === "required" && (
                        <p className=" text-red-500">
                          {errors.FullName.message}
                        </p>
                      )}
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <h1 className="input-title">Blood Group</h1>
                <input
                  type="text"
                  className="input-border w-full  mb-2"
                  {...register("BloodGroup")}
                />
              </div>
              <div className="">
                <h1 className="input-title flex items-center gap-1">
                  Date of Birth
                  <span className="text-red-600">*</span>
                </h1>
                <input
                  type="date"
                  className="input-border w-full sm:w-[100%] mb-2"
                  {...register("DateOfBirth", {
                    required: {
                      value: true,
                      message: "Date Of Birth is required",
                    },
                  })}
                />
                <label className="label">
                  <span className="text-sm">
                    {" "}
                    {errors.DateOfBirth?.type === "required" && (
                      <p className=" text-red-500">
                        {errors.DateOfBirth.message}
                      </p>
                    )}
                  </span>
                </label>
              </div>
              <div>
                <h1 className="input-title flex items-center gap-1">
                  Contact <span className="text-red-600">*</span>
                </h1>
                <input
                  type="number"
                  className="input-border w-full sm:w-[100%] mb-2"
                  {...register("MobileNumber", {
                    required: {
                      value: true,
                      message: "MobileNumber is required",
                    },
                    minLength: {
                      value: 11,
                      message: "Mobile number must be 11 digits",
                    },
                  })}
                />
                <label className="label">
                  <span className="text-sm">
                    {" "}
                    {errors.MobileNumber?.type === "required" && (
                      <p className=" text-red-500">
                        {errors.MobileNumber.message}
                      </p>
                    )}
                    {errors.MobileNumber?.type === "minLength" && (
                      <p className=" text-red-500">
                        {errors.MobileNumber.message}
                      </p>
                    )}
                  </span>
                </label>
              </div>

              <div>
                <h1 className="input-title">Blood Donation Count</h1>
                <input
                  type="number"
                  className="input-border w-full mb-2"
                  {...register("BloodDonationCount")}
                />
              </div>

              <div>
                <h1 className="input-title">
                  District <span className="text-red-600">*</span>
                </h1>
                <select
                  {...register("District", {
                    required: {
                      value: true,
                      message: "District is required",
                    },
                  })}
                  className="input-select-border w-full  mb-2"
                >
                  <option className="py-3" value=""></option>
                  <option value="customer">Customer</option>
                  <option value="bookShopOwner">Shop Owner</option>
                </select>
                <label className="label">
                  {errors.District && (
                    <p className="text-red-500">{errors.District.message}</p>
                  )}
                </label>
              </div>

              <div>
                <h1 className="input-title">
                  Upazila <span className="text-red-600">*</span>
                </h1>

                <select
                  {...register("Upazila", {
                    required: {
                      value: true,
                      message: "Upazila is required",
                    },
                  })}
                  className="input-select-border w-full  mb-2"
                >
                  <option className="py-3" value=""></option>
                  <option value="customer">Customer</option>
                  <option value="bookShopOwner">Shop Owner</option>
                </select>
                <label className="label">
                  <span className="text-sm">
                    {" "}
                    {errors.Upazila?.type === "required" && (
                      <p className=" text-red-500">{errors.Upazila.message}</p>
                    )}
                    {errors.Upazila?.type === "pattern" && (
                      <p className=" text-red-500">{errors.Upazila.message}</p>
                    )}
                  </span>
                </label>
              </div>
              <div>
                <h1 className="input-title">
                  Union <span className="text-red-600">*</span>
                </h1>

                <select
                  {...register("Union", {
                    required: {
                      value: true,
                      message: "Union is required",
                    },
                  })}
                  className="input-select-border w-full  mb-2"
                >
                  <option className="py-3" value=""></option>
                  <option value="customer">Customer</option>
                  <option value="bookShopOwner">Shop Owner</option>
                </select>
                <label className="label">
                  <span className="text-sm">
                    {" "}
                    {errors.Union?.type === "required" && (
                      <p className=" text-red-500">{errors.Union.message}</p>
                    )}
                    {errors.Union?.type === "pattern" && (
                      <p className=" text-red-500">{errors.Union.message}</p>
                    )}
                  </span>
                </label>
              </div>

              <div className="sm:col-span-2">
                <h1 className="input-title">Address</h1>
                <input
                  type="text"
                  className="input-border w-full mb-2"
                  {...register("Address")}
                />
              </div>
              <div>
                <h1 className="input-title">Father&apos;s Name</h1>
                <input
                  type="text"
                  className="input-border w-full mb-2"
                  {...register("FatherName")}
                />
              </div>

              <div>
                <h1 className="input-title">Mother&apos;s Name</h1>
                <input
                  type="text"
                  className="input-border w-full mb-2"
                  {...register("MotherName")}
                />
              </div>

              <div>
                <h1 className="input-title">Last Donation Time</h1>
                <input
                  type="date"
                  className="input-border w-full mb-2"
                  {...register("LastDonationTime")}
                />
              </div>

              <div>
                <h1 className="input-title">
                  Blood Donation Status <span className="text-red-600">*</span>
                </h1>
                <select
                  className="input-select-border w-full mb-2"
                  {...register("BloodDonationStatus", {
                    required: {
                      value: true,
                      message: "Blood Donation Status is required",
                    },
                  })}
                >
                  <option value="">Select</option>
                  <option value="Interested">Interested</option>
                  <option value="NotInterested">Not Interested</option>
                </select>
                <label className="label">
                  {errors.BloodDonationStatus && (
                    <p className="text-red-500">
                      {errors.BloodDonationStatus.message}
                    </p>
                  )}
                </label>
              </div>
              <div>
                <h1 className="input-title">
                  Gender <span className="text-red-600">*</span>
                </h1>
                <select
                  className="input-select-border w-full mb-2"
                  {...register("Gender", {
                    required: {
                      value: true,
                      message: "Gender is required",
                    },
                  })}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <label className="label">
                  {errors.Gender && (
                    <p className="text-red-500">{errors.Gender.message}</p>
                  )}
                </label>
              </div>

              <div>
                <h1 className="input-title">
                  User Type <span className="text-red-600">*</span>
                </h1>
                <select
                  className="input-select-border w-full mb-2"
                  {...register("UserType", {
                    required: {
                      value: true,
                      message: "User Type is required",
                    },
                  })}
                >
                  <option value="">Select</option>
                  <option value="Donor">Donor</option>
                  <option value="Volunteer">Volunteer</option>
                </select>
                <label className="label">
                  {errors.UserType && (
                    <p className="text-red-500">{errors.UserType.message}</p>
                  )}
                </label>
              </div>
            </div>
            {isEdit && (
              <div className="flex items-center gap-3 justify-end">
                <button type="submit" className="input-button  my-5  ">
                  Submit
                </button>
                <button
                  onClick={() => setIsEdit(false)}
                  className="bb-modal-red-button  my-5  "
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="my-16 text-sm font-semibold">
          {" "}
          <div className="my-2 flex items-center justify-between flex-wrap gap-2">
            <h1>Do you want to change your password ?</h1>
            <button className="input-button">Change Password</button>
          </div>
          <div className="my-5 flex items-center justify-between flex-wrap gap-2">
            <h1>Do you want to Delete your account ?</h1>
            <button className="bb-modal-red-button ">Delete my account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
