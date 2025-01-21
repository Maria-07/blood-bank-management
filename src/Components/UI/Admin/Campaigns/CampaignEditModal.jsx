"use client";
import { useGetAllVolunteersQuery } from "@/src/redux/features/volunteers/volunteers";
import { Modal, Select } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { toast } from "react-toastify";

const CampaignEditModal = ({ handleClose, clicked, record }) => {
  const router = useRouter();
  const id = record?.id;
  const { address, endDate, startDate, banner, name, volunteerList } = record;

  // Parse volunteerList
  const parsedVolunteerList = (() => {
    try {
      return typeof volunteerList === "string"
        ? JSON.parse(volunteerList)
        : volunteerList;
    } catch (error) {
      console.error("Error parsing volunteerList:", error.message);
      return [];
    }
  })();

  const [selectedVolunteers, setSelectedVolunteers] = useState(
    parsedVolunteerList || []
  );

  const [allVolunteers, setAllVolunteers] = useState([]);
  const accessToken = Cookies.get("accessToken");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    data: volunteers,
    isLoading,
    isError,
  } = useGetAllVolunteersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      setAllVolunteers(volunteers?.data || []);
    } else if (isError) {
      toast.error("Failed to load volunteers.");
    }
  }, [volunteers, isLoading, isError]);

  // Map IDs to names
  const idNameMapping = parsedVolunteerList.map((id) => {
    const volunteer = allVolunteers.find((v) => v.id === id);
    return { id, name: volunteer?.fullName || "Unknown" };
  });

  // Volunteer options for selection
  const volunteerOptions = allVolunteers?.map((volunteer) => ({
    label: volunteer.fullName,
    value: volunteer.id,
  }));

  const handleChange = (selectedValues) => {
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

    formData.append("VolunteerList", JSON.stringify(selectedVolunteers));
    formData.append("id", id);

    try {
      if (!accessToken) {
        toast.error("Unauthorized. Please log in again.");
        return;
      }

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
        router.push("/login");
        return;
      }
      const responseData = await response.json();
      if (responseData?.isSuccess) {
        toast.success(
          responseData?.message || "Campaign updated successfully!"
        );
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

        {/* Render sections for IDs and Names */}
        <div>
          <h2 className="mt-3 font-semibold">Assigned Volunteers:</h2>
          {idNameMapping.map(({ id, name }) => (
            <div key={id} className="p-2 border-b">
              <p>
                <strong>ID:</strong> {id}
              </p>
              <p>
                <strong>Name:</strong> {name}
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 my-3 mr-2 gap-x-2 gap-y-3">
            <div className="sm:col-span-2">
              <label className="label">Campaign Name</label>
              <input
                defaultValue={name}
                type="text"
                className="modal-input-field w-full"
                {...register("Name")}
              />
            </div>
            <div>
              <label className="label">Start Date</label>
              <input
                defaultValue={startDate?.slice(0, 10)}
                type="date"
                className="modal-input-field w-full"
                {...register("startDate")}
              />
            </div>
            <div>
              <label className="label">End Date</label>
              <input
                defaultValue={endDate?.slice(0, 10)}
                type="date"
                className="modal-input-field w-full"
                {...register("endDate")}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Address</label>
              <input
                defaultValue={address}
                type="text"
                className="modal-input-field w-full"
                {...register("address")}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Select Volunteers</label>
              <Select
                mode="multiple"
                maxTagCount="responsive"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleChange}
                options={volunteerOptions}
                defaultValue={selectedVolunteers}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Campaign Banner</label>
              <input
                type="file"
                className="modal-input-field w-full"
                {...register("banner")}
              />
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
