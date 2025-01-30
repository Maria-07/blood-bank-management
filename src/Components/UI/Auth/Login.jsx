"use client";

import { useAuth } from "@/src/Hook/AuthContext";
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
  const { login } = useAuth(); // Use login from AuthContext
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("User");
  const [dob, setDob] = useState("");

  const handleDob = (date, dateString) => {
    setDob(dateString);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  /**
   * Utility function to handle API requests with error handling.
   */
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
        throw new Error(errorText || "Error occurred during the API request.");
      }

      return await response.json();
    } catch (error) {
      console.error("API Request Error:", error.message);
      toast.error(error.message || "An unexpected error occurred.");
      throw error;
    }
  };
  /**
   * Handles the login process for both Admin and regular users.
   */
  const handleLogin = async (data, isAdmin = false) => {
    const payload = {
      MobileNumber: data.MobileNumber,
      DateOfBirth: dob,
      ...(isAdmin && { Password: data.Password }), // Include password for Admin login
    };

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/token`;
      const responseLoginData = await fetchData(url, payload);

      if (responseLoginData?.data?.isSuccess) {
        toast.success(responseLoginData?.data?.message || "Login successful!");

        const accessToken = responseLoginData?.data?.content?.token;
        if (accessToken) {
          login(accessToken); // Update AuthContext with the token
          router.push("/"); // Redirect to the homepage
        }
      } else {
        toast.error(responseLoginData?.data?.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };
  /**
   * Handles form submission and determines user type before proceeding to login.
   */
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
          // Wait for admin login on button click
          toast.info("Admin detected, please enter your password.");
        } else {
          await handleLogin(data);
        }
      }
    } catch (error) {
      console.error("Error detecting user type:", error.message);
    }
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1 className="input-title flex items-center gap-1">
            <FaMobileScreen className="text-primary" /> Mobile Number{" "}
            <span className="text-red-600">*</span>
          </h1>
          <input
            type="number"
            className="input-border w-full sm:w-[150%] mb-2"
            {...register("MobileNumber", {
              required: "Mobile number is required",
              minLength: {
                value: 11,
                message: "Mobile number must be 11 digits",
              },
            })}
          />
          {errors.MobileNumber && (
            <p className="text-red-500">{errors.MobileNumber.message}</p>
          )}
        </div>
        <div>
          <h1 className="input-title flex items-center gap-1">
            <MdOutlineDateRange className="text-primary" /> Date of Birth{" "}
            <span className="text-red-600">*</span>
          </h1>
          <DatePicker
            className="w-full sm:w-[150%]"
            format={{
              format: "YYYY-MM-DD",
              type: "mask",
            }}
            onChange={handleDob}
          />
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
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
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
        {userType !== "Admin" ? (
          <button
            type="submit"
            className="input-button w-full my-5 sm:w-[150%]"
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit((data) => handleLogin(data, true))}
            className="input-button w-full my-5 sm:w-[150%]"
          >
            Admin Login
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
