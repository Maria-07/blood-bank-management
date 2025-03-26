"use client";
import Cookies from "js-cookie";
import { DatePicker, Modal, Select } from "antd";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePostNewsMutation } from "@/src/redux/features/news/news";

const AddAdminModal = ({ handleClose, clicked, refetch }) => {
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  const [dob, setDob] = useState("");
  const [uType, setUType] = useState("Admin");
  const [donationDate, setDonationDate] = useState("");
  const [loading, setLoading] = useState(false);

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

    if (dob && donationDate && uType) {
      formData.append("DateOfBirth", dob);
      formData.append("LastDonationTime", donationDate);
      formData.append("UserType", uType);
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
        width={800}
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
          <div className="h-[700px] overflow-y-scroll px-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid sm:grid-cols-2 grid-cols-1  gap-3 my-5">
                {/* User Type Selection */}
                <div>
                  <label className="input-title">
                    User Type<span className="text-rose-600">*</span>
                  </label>
                  <select
                    // {...register("UserType", { required: "User Type is required" })}
                    onChange={(e) => {
                      setUType(e.target.value);
                    }}
                    className="input-select-border w-full mb-2"
                  >
                    <option value="Admin">Admin</option>
                  </select>
                  {errors.UserType && (
                    <p className="text-red-500">{errors.UserType.message}</p>
                  )}
                </div>
                {uType === "Volunteer" && (
                  <div>
                    <label className="input-title">
                      Leader Type<span className="text-rose-600">*</span>
                    </label>
                    <select
                      {...register("LeaderType", {
                        required: "LeaderType is required",
                      })}
                      className="input-select-border w-full mb-2"
                    >
                      <option value="">Select</option>
                      <option value="DcOffice">DC Office</option>
                      <option value="CivilOffice">Civil Sergon Office</option>
                      <option value="Scouts">Scout</option>
                    </select>
                    {errors.UserType && (
                      <p className="text-red-500">{errors.UserType.message}</p>
                    )}
                  </div>
                )}

                {/* Personal Info */}
                <div className="sm:col-span-2">
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
                      minLength: { value: 11, message: "Must be 11 digits" },
                    })}
                    className="input-border w-full mb-2"
                  />
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
                <div>
                  <label className="input-title">
                    Gender<span className="text-rose-600">*</span>
                  </label>
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
                <div className="sm:col-span-2">
                  <label className="input-title">Address</label>
                  <input
                    type="text"
                    {...register("Address")}
                    className="input-border w-full mb-2"
                  />
                </div>
                {uType === "Volunteer" && (
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
                )}

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
                  <label className="input-title">
                    NID/Student ID<span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    {...register("Nid", { required: "NID is required" })}
                    className="w-full mb-2"
                  />
                  {errors.Nid && (
                    <p className="text-red-500">{errors.Nid.message}</p>
                  )}
                </div>

                {/* Blood Information */}
                <div className="sm:col-span-2">
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
                    <option value="O+">O-</option>
                    <option value="A+">A+</option>
                    <option value="A+">A-</option>
                    <option value="A+">B+</option>
                    <option value="A+">B-</option>
                    <option value="A+">AB+</option>
                    <option value="A+">AB-</option>
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
                    onChange={(date, dateString) => setDonationDate(dateString)}
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
                <div className="">
                  <label htmlFor="PhysicalComplexity" className="input-title">
                    Any Physical Complexity?{" "}
                    {/* <span className="text-xs text-accent">
                                (like : Diabetics / Cancer / thyroid.... etc.)
                              </span> */}
                  </label>
                  <select
                    {...register("PhysicalComplexity")}
                    className="input-select-border w-full mb-2"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-200 py-[1px] mt-10"></div>
              <div className="flex items-end justify-end gap-2 mt-2">
                <button
                  type="submit"
                  className="border-sky-600 flex items-center border rounded-sm"
                >
                  <MdDone className="text-white bg-sky-700 px-1 py-[2px] text-[28px]" />
                  <span className="px-2 py-[6px] bg-sky-500 transition-all hover:bg-sky-600 text-white text-xs">
                    Create Admin
                  </span>
                </button>
                <button
                  onClick={handleClose}
                  className="border-secondary flex items-center border rounded-sm"
                >
                  <MdDeleteOutline className="text-white bg-secondary px-1 py-[2px] text-[28px]" />
                  <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                    Cancel
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddAdminModal;
