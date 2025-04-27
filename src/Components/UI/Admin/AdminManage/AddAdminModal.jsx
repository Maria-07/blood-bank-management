"use client";

import { DatePicker, Modal } from "antd";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/src/Components/Layouts/Loader";

const AddAdminModal = ({ handleClose, clicked, refetch }) => {
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  const [dob, setDob] = useState("");
  const [uType, setUType] = useState("Admin");
  const [donationDate, setDonationDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [leaderType, setLeaderType] = useState("");

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
    } catch (error) {}
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
    setLoading(true);

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

    formData.append("DateOfBirth", dob);
    formData.append("LastDonationTime", donationDate);
    formData.append("UserType", uType);
    formData.append("LeaderType", leaderType);

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
      handleClose();
      refetch();
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        width={1000}
        closable={false}
        className="box"
      >
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">
              Create an admin
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 pt-[1px] mt-3"></div>

          {loading ? (
            <>
              <Loader></Loader>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-3 my-5">
                  {/* User Type Selection */}
                  <div>
                    <label className="input-title">
                      User Type<span className="text-rose-600">*</span>
                    </label>
                    <select
                      onChange={(e) => {
                        setUType("Admin");
                      }}
                      className="input-select-border w-full mb-2"
                    >
                      <option value="Admin">Admin</option>
                    </select>
                    {errors.UserType && (
                      <p className="text-red-500">{errors.UserType.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="input-title">
                      Leader Type<span className="text-rose-600">*</span>
                    </label>
                    <select
                      // {...register("LeaderType", {
                      //   required: "LeaderType is required",
                      // })}
                      onChange={(e) => {
                        setLeaderType(e.target.value);
                      }}
                      className="input-select-border w-full mb-2"
                    >
                      <option value="">Select</option>
                      <option value="Deputy Commissioner Official">
                        Deputy Commissioner Official
                      </option>
                      <option value="Civil Surgeon Official">
                        Civil Surgeon Official
                      </option>
                      <option value="Volunteer (Scout)">Volunteer</option>
                    </select>
                    {errors.UserType && (
                      <p className="text-red-500">{errors.UserType.message}</p>
                    )}
                  </div>

                  {(leaderType === "Deputy Commissioner Official" ||
                    leaderType === "Civil Surgeon Official") && (
                    <div>
                      <label className="input-title">
                        Designation<span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("Designation", {
                          required: "Designation is required",
                        })}
                        className="input-border w-full mb-2"
                      />
                      {errors.Designation && (
                        <p className="text-red-500">
                          {errors.Designation.message}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Personal Info */}
                  <div className="sm:col-span-3">
                    {" "}
                    <h3 className="text-base font-normal text-gray-500 mb-1">
                      Personal Information
                    </h3>
                    <hr />
                  </div>
                  <div>
                    <label className="input-title">
                      Full Name<span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("FullName", {
                        required: "Full Name is required",
                      })}
                      className="input-border w-full mb-2"
                    />
                  </div>

                  <div>
                    <label className="input-title">
                      Date of Birth<span className="text-rose-600">*</span>
                    </label>
                    <DatePicker
                      className="w-full"
                      format="YYYY-MM-DD"
                      onChange={(date, dateString) => setDob(dateString)}
                    />
                  </div>
                  <div>
                    <label className="input-title">
                      Mobile Number<span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="number"
                      {...register("MobileNumber", {
                        required: "Mobile Number is required",
                        maxLength: 11,
                      })}
                      className="input-border w-full mb-2"
                    />
                  </div>
                  <div>
                    <label className="input-title">
                      Gender<span className="text-rose-600">*</span>
                    </label>
                    <select
                      {...register("Gender", {
                        required: "Gender is required",
                      })}
                      className="input-select-border w-full mb-2"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="input-title">
                      Father Name<span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="input-border w-full mb-2"
                      {...register("FatherName", {
                        required: "Father name is required",
                      })}
                    />
                  </div>
                  <div>
                    <label className="input-title">
                      Mother Name<span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("MotherName", {
                        required: "Mother name is required",
                      })}
                      className="input-border w-full mb-2"
                    />
                  </div>
                  <div>
                    <label className="input-title">
                      District<span className="text-rose-600">*</span>
                    </label>
                    <select
                      {...register("District", {
                        required: "District is required",
                      })}
                      className="input-select-border w-full mb-2"
                    >
                      <option value="1">Nilphamari</option>
                    </select>
                  </div>
                  <div>
                    <label className="input-title">
                      Upazila<span className="text-rose-600">*</span>
                    </label>
                    <select
                      {...register("Upazila", {
                        required: "Upazila is required",
                      })}
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
                    <label className="input-title">
                      Union<span className="text-rose-600">*</span>
                    </label>
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
                    <label className="input-title">Address</label>
                    <input
                      type="text"
                      {...register("Address")}
                      className="input-border w-full mb-2"
                    />
                  </div>

                  <div className="">
                    <label className="input-title">
                      Institution<span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("InstituteName", {
                        required: "Address is required",
                      })}
                      className="input-border w-full mb-2"
                    />
                  </div>
                  {/* <div>
                    <label className="input-title">
                      Password<span className="text-rose-600">*</span>
                    </label>
                    <div className="relative w-full ">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="input-border w-full mb-2"
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
                  </div> */}

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
                    <label className="input-title">NID/Student ID</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      {...register("Nid")}
                      className="w-full mb-2"
                    />
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
                    <label className="input-title">
                      Blood Group<span className="text-rose-600">*</span>
                    </label>
                    <select
                      {...register("BloodGroup", {
                        required: "Blood Group is required",
                      })}
                      className="input-select-border w-full mb-2"
                    >
                      <option value="">Select</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div>
                    <label className="input-title">
                      Donation Status<span className="text-rose-600">*</span>
                    </label>
                    <select
                      {...register("BloodDonationStatus", {
                        required: "Status is required",
                      })}
                      className="input-select-border w-full mb-2"
                    >
                      <option value="">Select</option>
                      <option value="Interested">Interested</option>
                      <option value="NotInterested">Not Interested</option>
                      <option value="NotSure">Not Sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="input-title">Last Donation Date</label>
                    <DatePicker
                      className="w-full"
                      format="YYYY-MM-DD"
                      onChange={(date, dateString) =>
                        setDonationDate(dateString)
                      }
                    />
                  </div>
                  <div>
                    <label className="input-title">Blood Donation Count</label>
                    <input
                      type="number"
                      {...register("BloodDonationCount")}
                      className="input-border w-full mb-2"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="PhysicalComplexity" className="input-title">
                      Any Physical Complexity?
                      <span className="text-rose-600">*</span>
                      <span className="text-xs text-accent">
                        (Diabetics / Cancer / thyroid etc.)
                      </span>
                    </label>
                    <select
                      {...register("PhysicalComplexity", {
                        required: "Physical Complexity is required",
                      })}
                      className="input-select-border w-full mb-2"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.PhysicalComplexity && (
                      <p className="text-red-500">
                        {errors.PhysicalComplexity.message}
                      </p>
                    )}
                  </div>
                </div>
                <button type="submit" className="input-button mb-4">
                  Register
                </button>
              </form>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AddAdminModal;
