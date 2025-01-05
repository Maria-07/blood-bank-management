"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { FaMobileScreen } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
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
