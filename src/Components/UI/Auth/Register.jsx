"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Create user data =", data);

    //! Create FormData from input data
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "ProfilePicture" && value.length > 0) {
        formData.append(key, value[0]); // Append file
      } else {
        formData.append(key, value);
      }
    });

    //! Log FormData entries for debugging
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/registration`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        toast.error("User already exists or another error occurred.");
        console.error("Error response:", errorText);
        return;
      }

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (responseData?.data?.isSuccess) {
        toast.success(
          responseData?.data?.message || "User created successfully!"
        );
        router.push("/login");
        reset();
      }
    } catch (error) {
      console.error("Network or server error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                      <p className=" text-red-500">{errors.FullName.message}</p>
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

            <div>
              <h1 className="input-title">Profile Picture</h1>
              <input
                type="file"
                className=" w-full mb-2"
                {...register("ProfilePicture")}
              />
            </div>
          </div>

          <button type="submit" className="input-button w-full my-5  ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
