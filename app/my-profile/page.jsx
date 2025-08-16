"use client";
import { Image, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import UserInfo from "@/src/Hook/UserInfo";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loader from "@/src/Components/Layouts/Loader";
import { IoMdCloseCircleOutline, IoMdEye, IoMdEyeOff } from "react-icons/io";
import Link from "next/link";
import ErrorLoader from "@/src/Components/Layouts/ErrorLoader";
import { useTranslation } from "@/src/Hook/useTranslation";
import { BiMinus, BiPlanet, BiPlus } from "react-icons/bi";
import { usePostDonationTrackingMutation } from "@/src/redux/features/campaign/campaignApi";
import { MdDeleteOutline, MdDone } from "react-icons/md";

const MyProfilePage = () => {
  //! User data
  const user = UserInfo();

  const donationDate =
    user?.lastDonationTime !== null
      ? dayjs(user?.lastDonationTime).format("YYYY-MM-DD")
      : "";

  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  const [uId, setUId] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const accessToken = Cookies.get("accessToken");
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const [donationType, setDonationType] = useState("no");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const [postDonationTracking, { isLoading: isPosting }] =
    usePostDonationTrackingMutation();

  // Modal states
  const [donationTrackingModal, setDonationTrackingModal] = useState(false);
  const handleDonationTrackingModal = () => {
    setDonationTrackingModal(!donationTrackingModal);
  };

  const handleDonationTracking = async () => {
    if (donationType === "yes") {
      try {
        const data = {
          donationDate: date,
          mobileNumber: phone,
          receiverName: name,
        };
        const response = await postDonationTracking(data);

        if (response?.data?.response?.isSuccess === true) {
          setBloodDonationCount(bloodDonationCount + 1);
          toast.success(response?.data?.response?.message);
          setDonationTrackingModal(false);
          console.log(bloodDonationCount);
        } else {
          toast.error(response?.data?.response?.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setBloodDonationCount(bloodDonationCount + 1);
      setDonationTrackingModal(false);
    }
  };

  if (!accessToken) {
    <>
      <div className="text-center mt-24 mb-5">
        Please{" "}
        <Link className="text-primary font-semibold" href={"/login"}>
          Login
        </Link>{" "}
        again to continue
      </div>
      <ErrorLoader></ErrorLoader>
    </>;
  }

  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch Data for Upazila and Union
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

  const [bloodDonationCount, setBloodDonationCount] = useState(
    user?.bloodDonationCount
  );

  useEffect(() => {
    if (user) {
      setValue("FullName", user.fullName || "abd");
      setValue("Address", user.address || "");
      setValue("InstituteName", user.instituteName || "");
      setValue("dateOfBirth", user.dateOfBirth || "");
      setValue("FatherName", user.fatherName || "");
      setValue("MotherName", user.motherName || "");
      setValue("mobileNumber", user.mobileNumber || "");
      setValue("BloodGroup", user.bloodGroup || "");
      setValue("District", user.district || "");
      setValue("Upazila", user.upazila || "");
      setValue("Union", user?.union || ""); // Default value of Union
      // setValue("BloodDonationCount", user.bloodDonationCount || 0);
      setBloodDonationCount(user.bloodDonationCount);
      setValue("Gender", user.gender || "");
      setValue("UserType", user.userType || "");
      setValue("BloodDonationStatus", user.bloodDonationStatus || "");
      setValue("LastDonationTime", donationDate || "");
      setValue("Designation", user?.designation || "");
    }
  }, [user, setValue, donationDate]);

  // Fetch Upazilas initially
  useEffect(() => {
    fetchData(1, "upazila");
  }, []);

  // When Upazila changes, fetch corresponding Unions and reset Union value
  useEffect(() => {
    if (watch("Upazila")) {
      fetchData(watch("Upazila"), "union");
      setValue("Union", ""); // Reset Union selection when Upazila changes
    }
  }, [watch("Upazila"), setValue]);

  // Set default Union when Union is selected or fetched
  useEffect(() => {
    if (user?.union) {
      const selectedUnion = unions.find((union) => union.id === user?.union);
      if (selectedUnion) {
        setValue("Union", selectedUnion.id); // Dynamically set Union value
      }
    }
  }, [unions, user?.union, setValue]);

  const validateFileSize = (files) => {
    const maxSize = 300 * 1024; // 400 KB

    for (let file of files) {
      if (file.size > maxSize) {
        return "Image Size must be less than 300 KB.";
      }
    }

    return true;
  };

  // Submit handler
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

    formData.append("LastDonationTime", donationDate);
    formData.append("id", user?.id);
    formData.append("BloodDonationCount", bloodDonationCount);

    if (data?.Upazila && data?.Union) {
      setLoading(true);
      try {
        if (!accessToken) {
          toast.error("Unauthorized. Please log in again.");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/update`,
          {
            method: "PUT",
            headers: {
              Authorization: `bearer ${accessToken}`,
            },
            body: formData,
          }
        );

        if (!response.ok) throw new Error("User update error occurred.");
        const responseData = await response.json();
        toast.success(
          responseData?.data?.message || "User Update successfully!"
        );
        window.location.reload();
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please Select your union or upazila properly");
    }
  };

  return (
    <div className="min-h-screen">
      {" "}
      <div className="sm:w-[60%] rounded-t-md sm:mx-auto mt-10 bg-primary text-base px-5 py-2 text-white font-semibold">
        <h1>{t("profile.personalInformation")}</h1>
      </div>
      <div className="sm:w-[60%] sm:mx-auto  border py-10 sm:px-16 px-5 rounded-md shadow-md">
        <div>
          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              {" "}
              <div className="flex justify-between">
                <div className="flex items-center gap-5">
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <Image
                      className="border rounded-full"
                      src={
                        user?.imageUrl
                          ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${user?.imageUrl}`
                          : "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                      }
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
                    <h1 className="input-title">{t("profile.fullName")}</h1>
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
                    {t("profile.dateOfBirth")}
                  </h1>
                  <input
                    disabled={!isEdit}
                    defaultValue={user?.dateOfBirth}
                    type="date"
                    className="input-border w-full sm:w-[100%] mb-2"
                    {...register("dateOfBirth")}
                  />
                </div>
                <div>
                  <h1 className="input-title flex items-center gap-1">
                    {t("profile.contact")}
                  </h1>
                  <input
                    disabled
                    defaultValue={user?.mobileNumber}
                    type="number"
                    className="input-border w-full sm:w-[100%] mb-2"
                    {...register("mobileNumber")}
                  />
                </div>
                <div>
                  <h1 className="input-title">{t("profile.gender")}</h1>
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
                      <option value="Male">{t("profile.male")}</option>
                      <option value="Female">{t("profile.female")}</option>
                      <option value="Other">{t("profile.other")}</option>
                    </select>
                  )}
                </div>
                <div>
                  <h1 className="input-title">{t("profile.fatherName")}</h1>
                  <input
                    disabled={!isEdit}
                    defaultValue={user?.fatherName}
                    type="text"
                    className="input-border w-full mb-2"
                    {...register("FatherName")}
                  />
                </div>
                <div>
                  <h1 className="input-title">{t("profile.motherName")}</h1>
                  <input
                    disabled={!isEdit}
                    defaultValue={user?.motherName}
                    type="text"
                    className="input-border w-full mb-2"
                    {...register("MotherName")}
                  />
                </div>
                <div className="sm:col-span-2">
                  <h1 className="input-title">{t("profile.address")}</h1>
                  <input
                    disabled={!isEdit}
                    type="text"
                    defaultValue={user?.address}
                    className="input-border w-full mb-2"
                    {...register("Address")}
                  />
                </div>
                <div>
                  <h1 className="input-title">{t("profile.district")}</h1>
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
                  <label className="input-title">{t("profile.upazila")}</label>

                  {!isEdit ? (
                    <input
                      disabled={!isEdit}
                      type="text"
                      defaultValue={user?.upazilaName || ""}
                      className="input-border w-full mb-2 mt-2"
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
                  <label className="input-title">{t("profile.union")}</label>{" "}
                  {!isEdit ? (
                    <input
                      disabled={!isEdit}
                      type="text"
                      defaultValue={user?.unionName || ""}
                      className="input-border w-full mb-2 mt-2"
                    />
                  ) : (
                    <select
                      defaultValue={user?.Union}
                      {...register("Union")}
                      className="input-select-border w-full mt-2"
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
                {/* <div>
                    <label className="input-title">Union</label>
                    <select
                      defaultValue={user?.union || ""}
                      {...register("Union")}
                      className="input-select-border w-full my-2"
                    >
                      <option value="">Select</option>
                      {unions.map((union) => (
                        <option key={union.id} value={union.id}>
                          {union.name}
                        </option>
                      ))}
                    </select>
                  </div> */}
                {user?.userType !== "Donor" && (
                  <div className="">
                    <label className="input-title">
                      {t("profile.institution")}
                    </label>
                    <input
                      disabled={!isEdit}
                      type="text"
                      defaultValue={user?.InstituteName}
                      {...register("InstituteName", {
                        required: "Address is required",
                      })}
                      className="input-border w-full mt-2"
                    />
                  </div>
                )}
                {(user?.leaderType === "Deputy Commissioner Official" ||
                  user?.leaderType === "") && (
                  <div>
                    <h1 className="input-title">{t("profile.designation")}</h1>
                    <input
                      disabled={!isEdit}
                      defaultValue={user?.designation}
                      type="text"
                      className="input-border w-full mb-2"
                      {...register("Designation")}
                    />
                  </div>
                )}
                {isEdit && (
                  <>
                    {" "}
                    <div className="">
                      <h1 className="input-title ">
                        {t("profile.changeProfile")}
                      </h1>
                      <input
                        disabled={!isEdit}
                        type="file"
                        className="border rounded-md w-full "
                        {...register("ProfilePicture", {
                          validate: validateFileSize,
                        })}
                      />
                      {errors.ProfilePicture && (
                        <p className="text-red-500 text-sm">
                          {errors.ProfilePicture.message}
                        </p>
                      )}
                    </div>
                  </>
                )}
                {/* Blood Information */}
                <div className="sm:col-span-3">
                  {" "}
                  <h3 className="text-base font-normal text-gray-500 mb-1 mt-5">
                    {t("profile.bloodInformation")}
                  </h3>
                  <hr />
                </div>
                <div>
                  <h1 className="input-title">{t("profile.bloodGroup")}</h1>
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
                  <h1 className="input-title">
                    {t("profile.bloodDonationCount")}
                  </h1>
                  <div className="flex items-center gap-2">
                    <input
                      disabled
                      defaultValue={bloodDonationCount}
                      type="number"
                      className="input-border w-full mb-2"
                      // {...register("BloodDonationCount")}
                    />
                    {isEdit && (
                      <button
                        type="button"
                        className="py-1 mt-[-7px] rounded-md bg-primary2 "
                        onClick={handleDonationTrackingModal}
                      >
                        <BiPlus className="text-white text-xl" />
                      </button>
                    )}
                    {isEdit && (
                      <button
                        type="button"
                        className="py-1 mt-[-7px] rounded-md bg-primary "
                        onClick={() => {
                          setBloodDonationCount(bloodDonationCount - 1);
                        }}
                      >
                        <BiMinus className="text-white text-xl" />
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <h1 className="input-title">
                    {t("profile.lastDonationTime")}
                  </h1>
                  <input
                    disabled={!isEdit}
                    type="date"
                    className="input-border w-full mb-2"
                    {...register("LastDonationTime")}
                  />
                </div>
                <div>
                  <h1 className="input-title">
                    {t("profile.bloodDonationStatus")}
                  </h1>
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
                      <option value="NotSure">Not Sure</option>
                    </select>
                  )}
                </div>
                <div className="sm:col-span-2 ">
                  <h1 className="input-title my-1">
                    {t("profile.physicalComplexity")}
                  </h1>
                  {!isEdit ? (
                    <input
                      disabled
                      type="text"
                      defaultValue={user?.physicalComplexity}
                      className="input-border w-full mb-2"
                    />
                  ) : (
                    <select
                      {...register("PhysicalComplexity")}
                      className="input-select-border w-full mb-2"
                      defaultValue={user?.physicalComplexity || "No"}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  )}
                </div>
              </div>
              {isEdit && (
                <div className="flex items-center gap-3 justify-end">
                  <button type="submit" className="input-button  my-5  ">
                    {t("profile.submit")}
                  </button>
                  <button
                    onClick={() => setIsEdit(false)}
                    className="bb-modal-red-button  my-5  "
                  >
                    {t("profile.cancel")}
                  </button>
                </div>
              )}
            </form>
          )}
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
      {donationTrackingModal && (
        <div>
          <Modal
            open={donationTrackingModal}
            centered
            footer={null}
            width={700}
            closable={false}
            className="box"
          >
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold tracking-tight">
                  {t("profile.donationTrackingTitle")}
                </h1>

                <IoMdCloseCircleOutline
                  onClick={handleDonationTrackingModal}
                  className="text-gray-500 text-2xl hover:text-primary"
                />
              </div>
              <div className="bg-gray-200 pt-[1px] mt-3"></div>
              <div className="my-5">
                <div className="flex items-center gap-4 my-2">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="donationType"
                      value="yes"
                      onChange={(e) => setDonationType(e.target.value)}
                      className="accent-primary"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="donationType"
                      value="no"
                      onChange={(e) => setDonationType(e.target.value)}
                      className="accent-primary"
                    />
                    No
                  </label>
                </div>

                {donationType === "yes" && (
                  <>
                    {" "}
                    <h1 className="text-base text-primary2 font-semibold my-2">
                      {t("profile.donationTrackingDescription")}
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <h1 className="input-title">{t("profile.date")}</h1>
                        <input
                          type="date"
                          className="input-border w-full mb-2"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <h1 className="input-title">
                          {t("profile.receiverPhone")}
                        </h1>
                        <input
                          type="number"
                          className="input-border w-full mb-2"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <h1 className="input-title">
                        {t("profile.receiverName")}
                      </h1>
                      <input
                        type="text"
                        className="input-border w-full mb-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </>
                )}
                <div className="bg-gray-200 py-[1px] mt-10"></div>
                <div className="flex items-end justify-end gap-2 mt-2">
                  <button
                    onClick={() => {
                      handleDonationTracking();
                    }}
                    type="button"
                    className="border-secondary flex items-center border rounded-sm"
                  >
                    <MdDone className="text-white bg-secondary px-1 py-[2px] text-[28px]" />
                    <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                      {t("profile.donationTrackingSubmit")}
                    </span>
                  </button>
                  <button
                    className="border-rose-600 flex items-center border rounded-sm"
                    onClick={handleDonationTrackingModal}
                  >
                    <MdDeleteOutline className="text-white bg-rose-700 px-1 py-[2px] text-[28px]" />
                    <span className="px-2 py-[6px] bg-rose-500 transition-all hover:bg-rose-600 text-white text-xs">
                      {t("profile.donationTrackingCancel")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default MyProfilePage;
