"use client";
import { Image } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import UserInfo from "@/src/Hook/UserInfo";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const MyProfilePage = () => {
  //! User data
  const user = UserInfo();
  console.log(user);
  console.log(dayjs(user?.lastDonationTime).format("YYYY-MM-DD"));

  const donationDate = dayjs(user?.lastDonationTime).format("YYYY-MM-DD");

  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  const [dob, setDob] = useState("");
  const [uType, setUType] = useState();
  const [isEdit, setIsEdit] = useState(false);

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

  console.log("unions", unions);

  useEffect(() => {
    if (user) {
      setValue("BloodGroup", user.bloodGroup || "");
      setValue("District", user.district || "");
      setValue("Upazila", user.upazila || "");
      setValue("Union", user.union || "");
      setValue("Gender", user.gender || "");
      setValue("UserType", user.userType || "");
      setValue("BloodDonationStatus", user.bloodDonationStatus || "");
      setValue("LastDonationTime", donationDate || "");
    }
  }, [user, setValue, donationDate]);
  useEffect(() => {
    fetchData(1, "upazila");
  }, []);
  useEffect(() => {
    if (watch("Upazila")) {
      fetchData(watch("Upazila"), "union");
      setValue("Union", "");
    }
  }, [watch("Upazila"), setValue, user]);

  const filteredUnion = unions.filter((d) => d.id == user?.union);
  const filteredUpazila = upazilas.filter((d) => d.id == user?.upazila);
  console.log(filteredUnion[0]?.name);

  const onSubmit = async (data) => {
    console.log("Sign up data =", data);
  };

  return (
    <div className="min-h-screen">
      {" "}
      <div className="sm:w-[60%] rounded-t-md sm:mx-auto mt-10 bg-primary text-base px-5 py-2 text-white font-semibold">
        <h1>Personal Information</h1>
      </div>
      <div className="sm:w-[60%] sm:mx-auto  border py-10 sm:px-16 px-5 rounded-md shadow-md">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {" "}
            <div className="flex justify-between">
              <div className="flex items-center gap-5">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <Image
                    className="border rounded-full"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${user?.imageUrl}`}
                    width={80}
                    height={80}
                    alt="Picture of the author"
                  ></Image>
                </div>
                <div className="">
                  <h1 className="text-xl font-primary text-primary">
                    {user?.fullName}
                  </h1>
                  <h2 className="text-sm text-gray-500">{user?.userType}</h2>
                  <h2 className="text-sm text-gray-500">#{user?.code}</h2>
                </div>
              </div>

              <div>
                <AiOutlineEdit
                  className="text-xl hover:text-primary text-dark"
                  title="Edit Profile"
                  onClick={() => setIsEdit(!isEdit)}
                />
              </div>
            </div>
            <hr className="mb-10 mt-5" />{" "}
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-3">
              <div className="sm:col-span-2">
                {" "}
                <div>
                  <h1 className="input-title">Full Name</h1>
                  <input
                    disabled={!isEdit}
                    defaultValue={user?.fullName}
                    type="text"
                    className="input-border w-full  mb-2"
                    {...register("FullName")}
                  />
                </div>
              </div>
              <div className="">
                <h1 className="input-title flex items-center gap-1">
                  Date of Birth
                </h1>
                <input
                  disabled={!isEdit}
                  defaultValue={user?.dateOfBirth}
                  type="date"
                  className="input-border w-full sm:w-[100%] mb-2"
                  {...register("DateOfBirth")}
                />
              </div>
              <div>
                <h1 className="input-title flex items-center gap-1">Contact</h1>
                <input
                  disabled
                  defaultValue={user?.mobileNumber}
                  type="number"
                  className="input-border w-full sm:w-[100%] mb-2"
                  {...register("MobileNumber")}
                />
              </div>
              <div>
                <h1 className="input-title">Gender</h1>
                {!isEdit ? (
                  <input
                    disabled
                    type="text"
                    defaultValue={user?.gender}
                    className="input-border w-full mb-2"
                  />
                ) : (
                  <select
                    defaultValue={user?.gender}
                    className="input-select-border w-full mb-2"
                    {...register("Gender")}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                )}
              </div>
              <div>
                <h1 className="input-title">Father&apos;s Name</h1>
                <input
                  disabled={!isEdit}
                  defaultValue={user?.fatherName}
                  type="text"
                  className="input-border w-full mb-2"
                  {...register("FatherName")}
                />
              </div>

              <div>
                <h1 className="input-title">Mother&apos;s Name</h1>
                <input
                  disabled={!isEdit}
                  defaultValue={user?.motherName}
                  type="text"
                  className="input-border w-full mb-2"
                  {...register("MotherName")}
                />
              </div>
              <div className="sm:col-span-2">
                <h1 className="input-title">Address</h1>
                <input
                  disabled={!isEdit}
                  type="text"
                  defaultValue={user?.address}
                  className="input-border w-full mb-2"
                  {...register("Address")}
                />
              </div>
              <div>
                <h1 className="input-title">District</h1>
                {!isEdit ? (
                  <input
                    disabled
                    type="text"
                    defaultValue={"Nilphamari"}
                    className="input-border w-full mb-2"
                  />
                ) : (
                  <select
                    defaultValue={user?.district}
                    {...register("District")}
                    className="input-select-border w-full mb-2"
                  >
                    <option value="1">Nilphamari</option>
                  </select>
                )}
              </div>
              <div>
                <label className="input-title">Upazila</label>

                {!isEdit ? (
                  <input
                    disabled={!isEdit}
                    type="text"
                    defaultValue={filteredUpazila[0]?.name}
                    className="input-border w-full mb-2 mt-1"
                  />
                ) : (
                  <select
                    defaultValue={user?.upazila}
                    {...register("Upazila")}
                    className="input-select-border w-full mt-2"
                  >
                    <option value="">Select</option>
                    {upazilas.map((up) => (
                      <option key={up.id} value={up.id}>
                        {up.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="input-title">Union</label>{" "}
                {!isEdit ? (
                  <input
                    disabled={!isEdit}
                    type="text"
                    defaultValue={filteredUnion[0]?.name}
                    className="input-border w-full mb-2 mt-1"
                  />
                ) : (
                  <select
                    {...register("Union")}
                    className="input-select-border w-full my-2 "
                  >
                    <option value="">Select</option>
                    {unions.map((un) => (
                      <option key={un.id} value={un.id}>
                        {un.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {isEdit && (
                <>
                  {" "}
                  <div className="mt-3">
                    <h1 className="input-title ">Change profile</h1>
                    <input
                      disabled={!isEdit}
                      type="file"
                      className="border rounded-md w-full my-1"
                      {...register("ProfilePicture")}
                    />
                  </div>
                </>
              )}

              {/* Blood Information */}
              <div className="sm:col-span-3">
                {" "}
                <h3 className="text-base font-normal text-gray-500 mb-1 mt-5">
                  Blood Information
                </h3>
                <hr />
              </div>
              <div>
                <h1 className="input-title">Blood Group</h1>
                {!isEdit ? (
                  <input
                    disabled
                    type="text"
                    defaultValue={user?.bloodGroup}
                    className="input-border w-full mb-2"
                  />
                ) : (
                  <select
                    {...register("BloodGroup")}
                    className="input-select-border w-full mb-2"
                    defaultValue={user?.bloodGroup}
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
                )}
              </div>
              <div>
                <h1 className="input-title">Blood Donation Count</h1>
                <input
                  disabled={!isEdit}
                  defaultValue={user?.bloodDonationCount}
                  type="number"
                  className="input-border w-full mb-2"
                  {...register("BloodDonationCount")}
                />
              </div>
              <div>
                <h1 className="input-title">Last Donation Time</h1>
                <input
                  disabled={!isEdit}
                  type="date"
                  className="input-border w-full mb-2"
                  {...register("LastDonationTime")}
                />
              </div>

              <div>
                <h1 className="input-title">Blood Donation Status</h1>
                {!isEdit ? (
                  <input
                    disabled
                    type="text"
                    defaultValue={user?.bloodDonationStatus}
                    className="input-border w-full mb-2"
                  />
                ) : (
                  <select
                    defaultValue={user?.bloodDonationStatus}
                    className="input-select-border w-full mb-2"
                    {...register("BloodDonationStatus")}
                  >
                    <option value="">Select</option>
                    <option value="Interested">Interested</option>
                    <option value="NotInterested">Not Interested</option>
                  </select>
                )}
              </div>
              <div className="flex items-center sm:col-span-3">
                <input
                  disabled={!isEdit}
                  defaultChecked={user?.physicalComplexity}
                  type="checkbox"
                  id="PhysicalComplexity"
                  className="mr-2"
                />
                <label htmlFor="PhysicalComplexity" className="input-title">
                  Any Physical Complexity?{" "}
                  <span className="text-xs text-accent">
                    (like : Diabetics / Cancer / thyroid.... etc.)
                  </span>
                </label>
              </div>
            </div>
            {isEdit && (
              <div className="flex items-center gap-3 justify-end">
                <button type="submit" className="input-button  my-5  ">
                  Submit
                </button>
                <button
                  onClick={() => setIsEdit(false)}
                  className="bb-modal-red-button  my-5  "
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>

        {/* <div className="my-16 text-sm font-semibold">
          {" "}
          <div className="my-2 flex items-center justify-between flex-wrap gap-2">
            <h1>Do you want to change your password ?</h1>
            <button className="input-button">Change Password</button>
          </div>
          <div className="my-5 flex items-center justify-between flex-wrap gap-2">
            <h1>Do you want to Delete your account ?</h1>
            <button className="bb-modal-red-button ">Delete my account</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MyProfilePage;
