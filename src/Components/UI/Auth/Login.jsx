"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaMobileScreen } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("User");
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
      DateOfBirth: data.DateOfBirth,
      ...(isAdmin && { Password: data.Password }), // Include password for Admin login
    };

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/token`;
      const responseLoginData = await fetchData(url, payload);

      if (responseLoginData?.isSuccess) {
        toast.success(responseLoginData?.data?.message || "Login successful!");

        const accessToken = responseLoginData?.content?.token;
        if (accessToken) {
          Cookies.set("accessToken", accessToken);
          router.push("/"); // Redirect to the homepage
        }
      } else {
        toast.error(responseLoginData?.message || "Login failed!");
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
      const userTypeResponse = await fetchData(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/usertype`,
        { MobileNumber: data.MobileNumber, DateOfBirth: data.DateOfBirth }
      );

      const detectedUserType = userTypeResponse?.userType || "User";
      setUserType(detectedUserType);

      if (detectedUserType === "Admin") {
        // Wait for admin login on button click
        toast.info("Admin detected, please enter your password.");
      } else {
        await handleLogin(data); // Non-admin login
      }
    } catch (error) {
      console.error("Error detecting user type:", error.message);
    }
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Mobile Number Input */}
        <div>
          <h1 className="input-title flex items-center gap-1">
            <FaMobileScreen className="text-primary" /> Contact{" "}
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

        {/* Date of Birth Input */}
        <div>
          <h1 className="input-title flex items-center gap-1">
            <MdOutlineDateRange className="text-primary" /> Date of Birth{" "}
            <span className="text-red-600">*</span>
          </h1>
          <input
            type="date"
            className="input-border w-full sm:w-[150%] mb-2"
            {...register("DateOfBirth", {
              required: "Date of Birth is required",
            })}
          />
          {errors.DateOfBirth && (
            <p className="text-red-500">{errors.DateOfBirth.message}</p>
          )}
        </div>

        {/* Password Input for Admin */}
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

        {/* Submit Button */}
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
