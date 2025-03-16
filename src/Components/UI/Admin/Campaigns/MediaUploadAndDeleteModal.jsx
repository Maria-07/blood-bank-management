import DynamicAdd from "@/src/shared/DynamicAdd";
import { Image, Modal, Tabs } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import {
  useDeleteMediaMutation,
  useGetAllCampaignMediaQuery,
} from "@/src/redux/features/campaign/campaignApi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Loader from "@/src/Components/Layouts/Loader";

const formatYouTubeUrl = (url) => {
  if (url.includes("shorts/")) {
    return url.replace("youtube.com/shorts/", "www.youtube.com/embed/");
  }
  if (url.includes("youtu.be/")) {
    return url.replace("youtu.be/", "www.youtube.com/embed/");
  }
  return url.replace("watch?v=", "embed/");
};

const MediaUploadAndDeleteModal = ({ handleClose, clicked, record }) => {
  const [resetTrigger, setResetTrigger] = useState(false); // ✅ Reset trigger
  const [VideoUrls, setVideoUrls] = useState([]);
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const accessToken = Cookies.get("accessToken");
  const router = useRouter();
  const id = record?.id;
  console.log("record", record?.id);

  //! All Media get
  const {
    data: campaignMedia,
    isLoading,
    isError,
    refetch,
  } = useGetAllCampaignMediaQuery({
    campaignId: id,
  });

  //! Delete Media :
  const [mediaDelete, { isLoading2 }] = useDeleteMediaMutation();

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log("All campaignMedia", campaignMedia);
      setImages(campaignMedia?.data?.imageData);
      setVideos(campaignMedia?.data?.videoData);
    }
  }, [campaignMedia, isLoading, isError]);

  const handleDelete = async (mId) => {
    console.log("url", mId);
    // debugger;
    try {
      const response = await mediaDelete({ campaignId: id, mediaId: mId });
      if (isLoading2) {
        <Loader></Loader>;
      }
      console.log("response", response);
      if (response?.data?.data?.isSuccess) {
        // router.push("/books");
        toast.success(response?.data?.data?.message);
        refetch();
      } else {
        toast.error(response?.error?.data?.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

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
            <div className="flex items-center justify-between">
              <input
                type="file"
                accept="image/*" // Only allows image files
                multiple // Allows multiple files
                className="w-full mb-2"
                {...register("Images")}
              />
              <button
                type="submit"
                className="border-sky-600 flex items-center border rounded-sm"
              >
                <MdDone className="text-white bg-sky-700 px-1 py-[2px] text-[28px]" />
                <span className="px-2 py-[6px] bg-sky-500 transition-all hover:bg-sky-600 text-white text-xs">
                  Upload
                </span>
              </button>
            </div>
            <hr className="my-3" />
            <div>
              {" "}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4  max-h-[450px] overflow-y-scroll relative">
                {images?.map((image, index) => (
                  <div key={index} className="relative">
                    <div className="overflow-hidden h-[180px] rounded-lg shadow-lg relative">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${image?.imageUrl}`}
                        alt=""
                        preview={true}
                        height={180}
                        className="transition-transform duration-300 hover:scale-105"
                      />
                      {/* Delete Button */}
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-primary text-white p-1 rounded-full hover:bg-red-600"
                        onClick={() => handleDelete(image?.id)}
                      >
                        <RiDeleteBin6Line className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      label: <h1 className="text-dark text-base hover:text-primary">Videos</h1>,
      key: 2,
      children: (
        <>
          <div className="">
            <DynamicAdd
              setVideoUrls={setVideoUrls}
              resetTrigger={resetTrigger}
            />

            <button
              type="submit"
              className="border-sky-600 flex items-center border rounded-sm "
            >
              <MdDone className="text-white bg-sky-700 px-1 py-[2px] text-[28px]" />
              <span className="px-2 py-[6px] bg-sky-500 transition-all hover:bg-sky-600 text-white text-xs">
                Upload
              </span>
            </button>
            <hr className="mt-5" />

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 max-h-[300px] overflow-y-scroll">
              {videos?.length > 0 ? (
                videos?.map((video, index) => (
                  <div
                    key={index}
                    className="relative h-[270px] w-full overflow-hidden"
                  >
                    {/* Video Player */}
                    <iframe
                      width="100%"
                      height="100%"
                      src={formatYouTubeUrl(video?.videoUrl)}
                      title={`Video ${index}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>

                    {/* Delete Button */}
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full hover:bg-red-600"
                      onClick={() => handleDelete(video?.id)} // ✅ Delete video
                    >
                      <RiDeleteBin6Line className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No videos available</p>
              )}
            </div>
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
        setResetTrigger(!resetTrigger); // ✅ Toggle reset trigger to clear fields
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

          {isLoading && <Loader></Loader>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-5 min-h-[200px]">
              <Tabs type="card" items={tabItems} />
              {isLoading && <Loader></Loader>}
            </div>
            <div className="bg-gray-200 py-[1px] mt-10"></div>
            <div className="flex items-end justify-end gap-2 mt-2">
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
