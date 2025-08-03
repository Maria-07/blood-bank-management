"use client";

import { useAuth } from "@/src/Hook/AuthContext";
import { useTranslation } from "@/src/Hook/useTranslation";
import { DatePicker } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaMobileScreen } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("User");
  const [dob, setDob] = useState("");

  const handleDob = (date, dateString) => setDob(dateString);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchData = async (url, payload) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || t("login.apiError"));
      }

      return await response.json();
    } catch (error) {
      toast.error(error.message || t("login.unexpectedError"));
      throw error;
    }
  };

  const handleLogin = async (data, isAdmin = false) => {
    const payload = {
      MobileNumber: data.MobileNumber,
      DateOfBirth: dob,
      ...(isAdmin && { Password: data.Password }),
    };

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/token`;
      const responseLoginData = await fetchData(url, payload);

      if (responseLoginData?.data?.isSuccess) {
        toast.success(responseLoginData?.data?.message || t("login.success"));
        const token = responseLoginData?.data?.content?.token;
        if (token) {
          login(token);
          router.push("/");
        }
      } else {
        toast.error(responseLoginData?.data?.message || t("login.failed"));
      }
    } catch (error) {}
  };

  const onSubmit = async (data) => {
    try {
      if (dob) {
        const userTypeResponse = await fetchData(
          `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/usertype`,
          { MobileNumber: data.MobileNumber, DateOfBirth: dob }
        );
        const detectedUserType = userTypeResponse?.data?.userType || "User";
        setUserType(detectedUserType);

        if (detectedUserType === "Admin") {
          toast.info(t("login.adminNotice"));
        } else {
          await handleLogin(data);
        }
      }
    } catch (error) {}
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Mobile Number */}
        <div>
          <h1 className="input-title flex items-center gap-1">
            <FaMobileScreen className="text-primary" />
            {t("login.mobile")} <span className="text-red-600">*</span>
          </h1>
          <input
            type="number"
            className="input-border w-full sm:w-[120%] mb-2"
            {...register("MobileNumber", {
              required: t("login.errors.mobileRequired"),
              minLength: {
                value: 11,
                message: t("login.errors.mobileLength"),
              },
            })}
          />
          {errors.MobileNumber && (
            <p className="text-red-500">{errors.MobileNumber.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <h1 className="input-title flex items-center gap-1">
            <MdOutlineDateRange className="text-primary" />
            {t("login.dob")} <span className="text-red-600">*</span>
          </h1>
          <DatePicker
            className="w-full sm:w-[120%]"
            format={{ format: "YYYY-MM-DD", type: "mask" }}
            onChange={handleDob}
          />
        </div>

        {/* Password (Admin only) */}
        {userType === "Admin" && (
          <div>
            <h1 className="input-title flex items-center gap-1">
              <RiLockPasswordLine className="text-primary" />
              {t("login.password")} <span className="text-red-600">*</span>
            </h1>
            <div className="relative w-full sm:w-[120%]">
              <input
                type={showPassword ? "text" : "password"}
                className="input-border w-full mb-2"
                {...register("Password", {
                  required: t("login.errors.passwordRequired"),
                  minLength: {
                    value: 6,
                    message: t("login.errors.passwordLength"),
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
            {errors.Password && (
              <p className="text-red-500">{errors.Password.message}</p>
            )}
          </div>
        )}

        {/* Submit/Login Button */}
        {userType !== "Admin" ? (
          <button
            type="submit"
            className="input-button w-full my-5 sm:w-[120%]"
          >
            {t("login.submit")}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit((data) => handleLogin(data, true))}
            className="input-button w-full my-5 sm:w-[120%]"
          >
            {t("login.login")}
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
