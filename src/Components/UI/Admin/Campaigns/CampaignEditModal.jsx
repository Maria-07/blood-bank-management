"use client";
import { useGetAllVolunteersQuery } from "@/src/redux/features/volunteers/volunteers";
import { DatePicker, Image, Modal, Select } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdCancel, MdDeleteOutline, MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { normalFormatDate } from "@/src/shared/ReusedFunctions";
import { format, parseISO } from "date-fns";
import dayjs from "dayjs";

const CampaignEditModal = ({ handleClose, clicked, record, refetch }) => {
  // debugger;
  console.log(record);
  const [bannerEdit, setBannerEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(100);
  const router = useRouter();
  const id = record?.id;
  const {
    address,
    endDate,
    startDate,
    banner,
    bannerUrl,
    name,
    volunteerList,
  } = record;
  const dateFormat = "yyyy-MM-dd";

  // Convert initial string dates to dayjs objects
  const [StartDateEdit, setStartDateEdit] =
    useState();
    // startDate ? dayjs(startDate).format("YYYY-MM-DD") : null
    // startDate?.split("T")[0]
  const [EndDateEdit, setEndDateEdit] = useState(
    endDate ? dayjs(endDate, "YYYY-MM-DD") : null
  );

  // Parse volunteerList
  const parsedVolunteerList = volunteerList || [];

  const [selectedVolunteers, setSelectedVolunteers] =
    useState(parsedVolunteerList);

  //! get all volunteerList
  const [allVolunteers, setAllVolunteers] = useState([]);
  const accessToken = Cookies.get("accessToken");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // debugger;
  const {
    data: volunteers,
    isLoading,
    isError,
  } = useGetAllVolunteersQuery({
    pageNo: page,
    pageSize: size,
  });

  console.log(volunteers?.data);

  useEffect(() => {
    if (!isLoading && !isError) {
      setAllVolunteers(volunteers?.data || []);
    } else if (isError) {
      toast.error("Failed to load volunteers.");
    }
  }, [volunteers, isLoading, isError]);

  // Volunteer options for selection
  const volunteerOptions = allVolunteers?.map((volunteer) => ({
    label: volunteer.fullName,
    value: volunteer.id,
  }));

  const handleChange = (selectedValues) => {
    console.log("selected v", selectedValues);

    setSelectedVolunteers(selectedValues);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "banner" && value?.length > 0) {
        formData.append(key, value[0]); // Append file
      } else {
        formData.append(key, value);
      }
    });

    formData.append("VolunteerList", selectedVolunteers);
    formData.append("id", id);

    if (StartDateEdit && EndDateEdit) {
      formData.append("StartDate", StartDateEdit);
      formData.append("EndDate", EndDateEdit);
    }

    try {
      if (!accessToken) {
        toast.error("Unauthorized. Please log in again.");
        return;
      }

      console.log("after select", selectedVolunteers);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/campaign/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to update campaign.");
        return;
      }
      const responseData = await response.json();
      // debugger;
      console.log(responseData);

      if (responseData?.data?.isSuccess) {
        toast.success(
          responseData?.data?.message || "Campaign updated successfully!"
        );
        refetch();
        handleClose();
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
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
            Edit Campaign
          </h1>
          <IoMdCloseCircleOutline
            onClick={handleClose}
            className="text-gray-500 text-2xl hover:text-primary"
          />
        </div>

        <div className="bg-gray-200 pt-[1px] mt-3"></div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 my-3 mr-2 gap-x-2 gap-y-3">
            <div className="sm:col-span-2">
              <label className="modal-label-name">Campaign Name</label>
              <input
                defaultValue={name}
                type="text"
                className="modal-input-field ml-1 w-full"
                {...register("Name")}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label flex items-center">
                <div className="modal-label-name">Institution Name</div>
              </label>
              <input
                type="text"
                name="Institute"
                className="modal-input-field ml-1 w-full"
                {...register("Institute")}
              />
            </div>
            <div>
              <label className="modal-label-name">Start Date</label>
              <DatePicker
                className="w-full ml-1"
                format={dateFormat}
                defaultValue={StartDateEdit} // dayjs object
                onChange={(date) => setStartDateEdit(date)}
              />
            </div>
            <div>
              <label className="modal-label-name">End Date</label>
              <DatePicker
                className="w-full ml-1"
                format={dateFormat}
                defaultValue={EndDateEdit} // dayjs object
                onChange={(date) => setEndDateEdit(date)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="modal-label-name">Address</label>
              <input
                defaultValue={address}
                type="text"
                className="modal-input-field ml-1 w-full"
                {...register("address")}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="modal-label-name">Select Volunteers</label>
              <Select
                mode="multiple"
                maxTagCount="responsive"
                allowClear
                style={{ width: "100%" }}
                className="ml-1 w-full"
                placeholder="Please select"
                onChange={handleChange}
                options={volunteerOptions}
                defaultValue={selectedVolunteers}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="modal-label-name">Campaign Banner</label>
              {bannerEdit && (
                <input
                  type="file"
                  defaultValue={banner}
                  className="modal-input-field ml-1 w-full"
                  {...register("banner")}
                />
              )}
            </div>
            <div className=" sm:col-span-2">
              {!bannerEdit ? (
                <button
                  type="button"
                  onClick={() => setBannerEdit(!bannerEdit)}
                  className="flex items-center gap-2"
                >
                  <FiEdit className="" /> Edit Banner
                </button>
              ) : (
                <button
                  onClick={() => setBannerEdit(!bannerEdit)}
                  type="button"
                  className="flex items-center gap-2 text-secondary"
                >
                  <MdCancel className="" />
                  Cancel Banner Upload
                </button>
              )}
              <div className="overflow-hidden h-[200px] w-[500px]">
                {!bannerEdit && (
                  <Image
                    className="border "
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${bannerUrl}`}
                    width={400}
                    height={200}
                    alt="Picture of the author"
                  ></Image>
                )}{" "}
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end gap-2 mt-2">
            <button
              type="submit"
              className="border-sky-600 flex items-center border rounded-sm"
            >
              <MdDone className="text-white bg-sky-700 px-1 py-[2px] text-[28px]" />
              <span className="px-2 py-[6px] bg-sky-500 transition-all hover:bg-sky-600 text-white text-xs">
                Edit Campaign
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
  );
};

export default CampaignEditModal;
