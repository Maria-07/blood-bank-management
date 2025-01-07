"use client";

import { useLoginMutation } from "@/src/redux/features/auth/userApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaMobileScreen } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("User");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 5000,
  });

  const onSubmit = async (data) => {
    setUserType("Admin");
    console.log(data);
    toast.success("success");
  };
  return (
    <div>
      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h1 className="input-title flex items-center gap-1">
              <FaMobileScreen className="text-primary" /> Contact{" "}
              <span className="text-red-600">*</span>
            </h1>
            <input
              type="number"
              className="input-border w-full sm:w-[150%] mb-2"
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
                  <p className=" text-red-500">{errors.MobileNumber.message}</p>
                )}
                {errors.MobileNumber?.type === "minLength" && (
                  <p className=" text-red-500">{errors.MobileNumber.message}</p>
                )}
              </span>
            </label>
          </div>
          <div>
            <h1 className="input-title flex items-center gap-1">
              <MdOutlineDateRange className="text-primary" /> Date of Birth
              <span className="text-red-600">*</span>
            </h1>
            <input
              type="date"
              className="input-border w-full sm:w-[150%] mb-2"
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
                  <p className=" text-red-500">{errors.DateOfBirth.message}</p>
                )}
              </span>
            </label>
          </div>
          {userType === "Admin" && (
            <div>
              <h1 className="input-title flex items-center gap-1">
                <RiLockPasswordLine className="text-primary" /> Password{" "}
                <span className="text-red-600">*</span>
              </h1>
              <div className="relative w-full sm:w-[150%]">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-border w-full sm:w-[100%] mb-2"
                  {...register("Password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters",
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
              <label className="label">
                <span className="text-sm">
                  {errors.Password?.type === "required" && (
                    <p className="text-red-500">{errors.Password.message}</p>
                  )}
                  {errors.Password?.type === "minLength" && (
                    <p className="text-red-500">{errors.Password.message}</p>
                  )}
                </span>
              </label>
            </div>
          )}
          <button
            type="submit"
            className="input-button w-full my-5 sm:w-[150%] "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
