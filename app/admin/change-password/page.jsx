"use client";
import { useResetPasswordMutation } from "@/src/redux/features/auth/userApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  console.log(resetPassword);

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("Sign up data =", data);

    try {
      const response = await resetPassword({ ...data }).unwrap();
      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (responseData?.data?.isSuccess) {
        toast.success(responseData?.data?.message);
        refetch();
        reset();
        handleClose(); // Close modal after successful creation
      } else {
        toast.error(responseData?.data?.message);
      }
      //   router.push("/login");
    } catch (error) {
      console.log("error?.data?.message", error?.data?.message);
      if (error?.data?.message === "Already exist") {
        toast.error("User already exists");
      } else {
        console.error("signUp failed:", error);
      }
    }
  };
  return (
    <div>
      {" "}
      <div className="w-[95%] sm:w-[30%] mx-auto border-[1px] rounded-md shadow-sm p-5 my-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h1 className="input-title flex items-center gap-1">
              <RiLockPasswordLine className="text-primary" />
              Old Password <span className="text-red-600">*</span>
            </h1>
            <div className="relative ">
              <input
                type={showPassword ? "text" : "OldPassword"}
                className="input-border w-full sm:w-[100%] mb-2"
                {...register("OldPassword", {
                  required: "OldPassword is required",
                  minLength: {
                    value: 6,
                    message: "OldPassword must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[15px] transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <IoMdEye className="text-green-600" />
                ) : (
                  <IoMdEyeOff className="text-primary" />
                )}
              </button>
            </div>
            {errors.OldPassword && (
              <p className="text-red-500">{errors.OldPassword.message}</p>
            )}
          </div>
          <div>
            <h1 className="input-title flex items-center gap-1">
              <RiLockPasswordLine className="text-primary" />
              New Password <span className="text-red-600">*</span>
            </h1>
            <div className="relative ">
              <input
                type={showPassword ? "text" : "NewPassword "}
                className="input-border w-full sm:w-[100%] mb-2"
                {...register("NewPassword", {
                  required: "NewPassword  is required",
                  minLength: {
                    value: 6,
                    message: "NewPassword  must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[15px] transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <IoMdEye className="text-green-600" />
                ) : (
                  <IoMdEyeOff className="text-primary" />
                )}
              </button>
            </div>
            {errors.NewPassword && (
              <p className="text-red-500">{errors.NewPassword.message}</p>
            )}
          </div>
          <div>
            <h1 className="input-title flex items-center gap-1">
              <RiLockPasswordLine className="text-primary" />
              Confirm New Password <span className="text-red-600">*</span>
            </h1>
            <div className="relative ">
              <input
                type={showPassword ? "text" : "ConfirmNewPassword "}
                className="input-border w-full sm:w-[100%] mb-2"
                {...register("ConfirmNewPassword", {
                  required: "ConfirmNewPassword  is required",
                  minLength: {
                    value: 6,
                    message:
                      "ConfirmNewPassword  must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[15px] transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <IoMdEye className="text-green-600" />
                ) : (
                  <IoMdEyeOff className="text-primary" />
                )}
              </button>
            </div>
            {errors.ConfirmNewPassword && (
              <p className="text-red-500">
                {errors.ConfirmNewPassword.message}
              </p>
            )}
          </div>

          <button type="submit" className="input-button  my-5 ">
            Confirm Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
