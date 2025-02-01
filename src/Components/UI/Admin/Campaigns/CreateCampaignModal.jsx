"use client";
import Cookies from "js-cookie";
import { DatePicker, Modal, Select } from "antd";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import { useGetAllVolunteersQuery } from "@/src/redux/features/volunteers/volunteers";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CreateCampaignModal = ({ handleClose, clicked, refetch }) => {
  const router = useRouter();
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [allVolunteers, setAllVolunteers] = useState([]);
  const accessToken = Cookies.get("accessToken");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(100);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  const handleStartDate = (date, dateString) => {
    setStartDate(dateString);
  };

  const handleEndDate = (date, dateString) => {
    setEndDate(dateString);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //! get all Volunteers
  const {
    data: volunteers,
    isLoading,
    isError,
  } = useGetAllVolunteersQuery({
    pageNo: page,
    pageSize: size,
  });
  console.log("allVolunteers", allVolunteers);

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log("All volunteers", volunteers);
      setAllVolunteers(volunteers?.data);
    } else {
      console.log(volunteers);
    }
  }, [volunteers, isLoading, isError, router]);

  const volunteerOptions = allVolunteers?.map((volunteer) => ({
    label: volunteer.fullName,
    value: volunteer.id,
  }));

  const handleChange = (selectedValues) => {
    console.log("Selected Values:", selectedValues);
    setSelectedVolunteers(selectedValues);
  };

  const onSubmit = async (data) => {
    console.log("Create Campaign data =", data);

    //! Create FormData from input data
    const formData = new FormData();

    //! Add form fields
    Object.entries(data).forEach(([key, value]) => {
      if (key === "Banner" && value.length > 0) {
        formData.append(key, value[0]); // Append file
      } else {
        formData.append(key, value);
      }
    });

    //! Add selectedVolunteers
    formData.append("VolunteerList", selectedVolunteers);

    if (StartDate && EndDate) {
      formData.append("StartDate", StartDate);
      formData.append("EndDate", EndDate);
    }

    //! Log FormData entries for debugging
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      if (!accessToken) {
        toast.error("Unauthorized. Please log in again.");
        return;
      }

      console.log(accessToken);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/campaign/create`,
        {
          method: "POST",
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
          body: formData,
        }
      );
      // debugger;
      console.log("response", response);

      // if (!response?.data?.ok) {
      //   const errorText = await response.text();
      //   toast.error(errorText);
      //   console.error("Error response:", errorText);
      //   // Cookies.remove("accessToken");
      //   // router.push("/login");
      //   return;
      // }

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (responseData?.data?.isSuccess) {
        toast.success(
          responseData?.data?.message || "Campaign created successfully!"
        );
        refetch();
        reset();
        handleClose(); // Close modal after successful creation
      }
    } catch (error) {
      console.error("Network or server error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        width={600}
        closable={false}
        className="box"
      >
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">
              Create a campaign
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 pt-[1px] mt-3"></div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 my-3 mr-2 gap-x-2 gap-y-3">
              <div className="sm:col-span-2">
                <label className="label flex items-center">
                  <div className="modal-label-name">
                    Campaign Name<span className="text-red-600">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  className="modal-input-field ml-1 w-full"
                  {...register("Name", {
                    required: "Campaign name is required",
                  })}
                />
                {errors.Name && (
                  <p className="text-red-500 text-sm">{errors.Name.message}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="label flex items-center">
                  <div className="modal-label-name">
                    Institution Name <span className="text-red-600">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  className="modal-input-field ml-1 w-full"
                  {...register("InstitutionName", {
                    required: "Institution name is required",
                  })}
                />
                {errors.InstitutionName && (
                  <p className="text-red-500 text-sm">
                    {errors.InstitutionName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label flex items-center">
                  <div className="modal-label-name">
                    Start Date <span className="text-red-600">*</span>
                  </div>
                </label>
                <DatePicker
                  className="w-full ml-1"
                  format={{
                    format: "YYYY-MM-DD",
                    type: "mask",
                  }}
                  onChange={handleStartDate}
                />
              </div>

              <div>
                <label className="label flex items-center">
                  <div className="modal-label-name">
                    End Date <span className="text-red-600">*</span>
                  </div>
                </label>
                <DatePicker
                  className="w-full ml-1"
                  format={{
                    format: "YYYY-MM-DD",
                    type: "mask",
                  }}
                  onChange={handleEndDate}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="label flex items-center">
                  <div className="modal-label-name">
                    Address <span className="text-red-600">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  className="modal-input-field ml-1 w-full"
                  {...register("Address", { required: "Address is required" })}
                />
                {errors.Address && (
                  <p className="text-red-500 text-sm">
                    {errors.Address.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="label flex items-center">
                  <div className="modal-label-name">Select Volunteers</div>
                </label>
                <Select
                  mode="multiple"
                  maxTagCount="responsive"
                  allowClear
                  style={{ width: "100%" }}
                  size="large"
                  placeholder="Please select"
                  onChange={handleChange}
                  className="ml-1"
                  options={volunteerOptions}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="label flex items-center">
                  <div className="modal-label-name">Campaign Banner</div>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="modal-input-field ml-1 w-full"
                  {...register("Banner")}
                />
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
                  Create Campaign
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
      </Modal>
    </div>
  );
};

export default CreateCampaignModal;
