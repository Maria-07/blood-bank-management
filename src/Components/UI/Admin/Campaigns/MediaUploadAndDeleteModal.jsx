import DynamicAdd from "@/src/shared/DynamicAdd";
import { Modal, Tabs } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import Images from "./Images";
import { useGetAllCampaignMediaQuery } from "@/src/redux/features/campaign/campaignApi";

const MediaUploadAndDeleteModal = ({ handleClose, clicked, record }) => {
  const [VideoUrls, setVideoUrls] = useState([]);
  const accessToken = Cookies.get("accessToken");
  const router = useRouter();
  const id = record?.id;
  console.log("record", record?.id);

  const {
    data: campaignMedia,
    isLoading,
    isError,
    refetch,
  } = useGetAllCampaignMediaQuery({
    campaignId: id,
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log("All campaignMedia", campaignMedia);
    }
  }, [campaignMedia, isLoading, isError]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  console.log("VideoUrls", VideoUrls);

  const tabItems = [
    {
      label: <h1 className="text-dark text-base hover:text-primary">Images</h1>,
      key: 1,
      children: (
        <>
          <div>
            <h1 className="input-title">Images</h1>
            <input
              type="file"
              accept="image/*" // Only allows image files
              multiple // Allows multiple files
              className="w-full mb-2"
              {...register("Images")}
            />
            <hr />
            <Images></Images>
          </div>
        </>
      ),
    },
    {
      label: <h1 className="text-dark text-base hover:text-primary">Videos</h1>,
      key: 2,
      children: (
        <>
          {" "}
          <div className="">
            <DynamicAdd setVideoUrls={setVideoUrls}></DynamicAdd>
          </div>
        </>
      ),
    },
  ];

  const onSubmit = async (data) => {
    console.log("Create Media data =", data);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "Images" && value instanceof FileList && value.length > 0) {
        Array.from(value).forEach((file) => {
          formData.append("Images", file);
        });
      } else {
        formData.append(key, value);
      }
    });

    if (record) {
      formData.append("ModelId", record?.id);
    }

    // ✅ Ensure VideoUrls is an array of strings and append correctly
    if (Array.isArray(VideoUrls) && VideoUrls.length > 0) {
      VideoUrls.forEach((url) => {
        formData.append("VideoUrls", url); // Append each URL separately
      });
    }

    //! Log FormData entries for debugging
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/media/uploadcampaignmedia`,
        {
          method: "POST",
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        toast.error("Media upload failed.");
        return;
      }

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (responseData?.data?.isSuccess) {
        toast.success(
          responseData?.data?.message || "Media Uploaded successfully!"
        );
        handleClose();
        refetch();
      } else {
        toast.error(responseData?.data?.message);
      }
    } catch (error) {
      console.error("Network or server error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="">
      {" "}
      <Modal
        open={clicked}
        centered
        footer={null}
        width={900}
        closable={false}
        className="box"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl  font-semibold tracking-tight">
              Upload media for this campaign
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 pt-[1px] mt-3"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-5 min-h-[200px]">
              <Tabs type="card" items={tabItems} />
            </div>
            <div className="bg-gray-200 py-[1px] mt-10"></div>
            <div className="flex items-end justify-end gap-2 mt-2">
              <button
                type="submit"
                className="border-sky-600 flex items-center border rounded-sm"
              >
                <MdDone className="text-white bg-sky-700 px-1 py-[2px] text-[28px]" />
                <span className="px-2 py-[6px] bg-sky-500 transition-all hover:bg-sky-600 text-white text-xs">
                  Upload
                </span>
              </button>
              <button
                className=" border-rose-600 flex items-center border rounded-sm"
                onClick={handleClose}
              >
                <MdDeleteOutline className=" text-white bg-rose-700  px-1 py-[2px] text-[28px]" />
                <span className="px-2 py-[6px] bg-rose-500 transition-all hover:bg-rose-600 text-white text-xs">
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

export default MediaUploadAndDeleteModal;
