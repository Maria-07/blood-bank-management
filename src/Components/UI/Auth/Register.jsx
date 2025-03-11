"use client";

import { apiRequest } from "@/src/Utils/Fetch";
import { DatePicker } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  const [dob, setDob] = useState("");
  const [donationDate, setDonationDate] = useState("");

  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchData = async (id = 1, type = "upazila") => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/location/GetByParentId/${id}`
      );
      const data = await response.json();
      type === "upazila"
        ? setUpazilas(data?.data || [])
        : setUnions(data?.data || []);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error.message);
    }
  };

  useEffect(() => {
    fetchData(1, "upazila");
  }, []);
  useEffect(() => {
    if (watch("Upazila")) {
      fetchData(watch("Upazila"), "union");
      setValue("Union", "");
    }
  }, [watch("Upazila"), setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList && value.length > 0) {
        key === "Nid"
          ? Array.from(value).forEach((file) => formData.append("Nid", file))
          : formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });

    if (dob && donationDate) {
      formData.append("DateOfBirth", dob);
      formData.append("LastDonationTime", donationDate);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/registration`,
        { method: "POST", body: formData }
      );
      if (!response.ok)
        throw new Error("User already exists or another error occurred.");
      const responseData = await response.json();
      toast.success(
        responseData?.data?.message || "User created successfully!"
      );
      router.push("/login");
      reset();
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-3">
      <h3 className="text-lg font-normal text-primary mb-1">
        Create your account
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-3 my-5">
          {/* User Type Selection */}
          <div>
            <label className="input-title">User Type *</label>
            <select
              {...register("UserType", { required: "User Type is required" })}
              className="input-select-border w-full mb-2"
            >
              <option value="">Select</option>
              <option value="Donor">Donor</option>
              <option value="Volunteer">Volunteer</option>
            </select>
            {errors.UserType && (
              <p className="text-red-500">{errors.UserType.message}</p>
            )}
          </div>

          {/* Personal Info */}
          <div className="sm:col-span-3">
            {" "}
            <h3 className="text-base font-normal text-gray-500 mb-1">
              Personal Information
            </h3>
            <hr />
          </div>
          <div>
            <label className="input-title">Full Name *</label>
            <input
              type="text"
              {...register("FullName", { required: "Full Name is required" })}
              className="input-border w-full mb-2"
            />
          </div>

          <div>
            <label className="input-title">Date of Birth *</label>
            <DatePicker
              className="w-full"
              format="YYYY-MM-DD"
              onChange={(date, dateString) => setDob(dateString)}
            />
          </div>
          <div>
            <label className="input-title">Mobile Number *</label>
            <input
              type="number"
              {...register("MobileNumber", {
                required: "Mobile Number is required",
                minLength: { value: 11, message: "Must be 11 digits" },
              })}
              className="input-border w-full mb-2"
            />
          </div>
          <div>
            <label className="input-title">District *</label>
            <select
              {...register("District", { required: "District is required" })}
              className="input-select-border w-full mb-2"
            >
              <option value="1">Nilphamari</option>
            </select>
          </div>
          <div>
            <label className="input-title">Upazila *</label>
            <select
              {...register("Upazila", { required: "Upazila is required" })}
              className="input-select-border w-full mb-2"
            >
              <option value="">Select</option>
              {upazilas.map((up) => (
                <option key={up.id} value={up.id}>
                  {up.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="input-title">Union *</label>
            <select
              {...register("Union", { required: "Union is required" })}
              className="input-select-border w-full mb-2"
            >
              <option value="">Select</option>
              {unions.map((un) => (
                <option key={un.id} value={un.id}>
                  {un.name}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="input-title">Address *</label>
            <input
              type="text"
              {...register("Address", { required: "Address is required" })}
              className="input-border w-full mb-2"
            />
          </div>
          <div>
            <label className="input-title">Gender *</label>
            <select
              {...register("Gender", { required: "Gender is required" })}
              className="input-select-border w-full mb-2"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Blood Information */}
          <div className="sm:col-span-3">
            {" "}
            <h3 className="text-base font-normal text-gray-500 mb-1">
              Blood Information
            </h3>
            <hr />
          </div>
          <div>
            <label className="input-title">Blood Group *</label>
            <select
              {...register("BloodGroup", {
                required: "Blood Group is required",
              })}
              className="input-select-border w-full mb-2"
            >
              <option value="">Select</option>
              <option value="O+">O+</option>
              <option value="A+">A+</option>
            </select>
          </div>
          <div>
            <label className="input-title">Donation Status *</label>
            <select
              {...register("BloodDonationStatus", {
                required: "Status is required",
              })}
              className="input-select-border w-full mb-2"
            >
              <option value="">Select</option>
              <option value="Interested">Interested</option>
            </select>
          </div>
          <div>
            <label className="input-title">Last Donation Date</label>
            <DatePicker
              className="w-full"
              format="YYYY-MM-DD"
              onChange={(date, dateString) => setDonationDate(dateString)}
            />
          </div>

          {/* Documents */}
          <div>
            <label className="input-title">Profile Picture</label>
            <input
              type="file"
              {...register("ProfilePicture")}
              className="w-full mb-2"
            />
          </div>
          <div>
            <label className="input-title">NID/Student ID *</label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("Nid", { required: "ID is required" })}
              className="w-full mb-2"
            />
          </div>
        </div>
        <button type="submit" className="input-button mb-4">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
