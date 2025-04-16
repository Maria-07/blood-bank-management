"use client";
import { useResetPasswordMutation } from "@/src/redux/features/auth/userApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("Password Change data =", data);

    try {
      const response = await resetPassword({ ...data }).unwrap();
      const responseData = response.data;
      console.log("Response Data:", responseData);

      if (responseData?.isSuccess) {
        toast.success(responseData?.message);
        reset(); // Reset the form after successful submission
        // router.push("/login"); // Redirect or close modal after success
      } else {
        toast.error(responseData?.message);
      }
    } catch (error) {
      console.log("Error:", error?.data?.message);
    }
  };

  return (
    <div>
      <div className="w-[95%] sm:w-[30%] mx-auto border-[1px] rounded-md shadow-sm p-5 my-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Old Password Field */}
          <div>
            <h1 className="input-title flex items-center gap-1">
              <RiLockPasswordLine className="text-primary" />
              Old Password <span className="text-red-600">*</span>
            </h1>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                className="input-border w-full sm:w-[100%] mb-2"
                {...register("OldPassword", {
                  required: "Old Password is required",
                  minLength: {
                    value: 6,
                    message: "Old Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[15px] transform -translate-y-1/2 text-gray-500"
              >
                {showOldPassword ? (
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

          {/* New Password Field */}
          <div>
            <h1 className="input-title flex items-center gap-1">
              <RiLockPasswordLine className="text-primary" />
              New Password <span className="text-red-600">*</span>
            </h1>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className="input-border w-full sm:w-[100%] mb-2"
                {...register("NewPassword", {
                  required: "New Password is required",
                  minLength: {
                    value: 6,
                    message: "New Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[15px] transform -translate-y-1/2 text-gray-500"
              >
                {showNewPassword ? (
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

          {/* Confirm New Password Field */}
          <div>
            <h1 className="input-title flex items-center gap-1">
              <RiLockPasswordLine className="text-primary" />
              Confirm New Password <span className="text-red-600">*</span>
            </h1>
            <div className="relative">
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                className="input-border w-full sm:w-[100%] mb-2"
                {...register("ConfirmNewPassword", {
                  required: "Confirm New Password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Confirm New Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                className="absolute right-3 top-[15px] transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmNewPassword ? (
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

          {/* Submit Button */}
          <button type="submit" className="input-button my-5">
            Confirm Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
