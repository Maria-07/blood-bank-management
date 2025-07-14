"use client";
import Cookies from "js-cookie";
import { DatePicker, Modal, Select } from "antd";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/src/Hook/useTranslation";

const CreateNoticeModal = ({ handleClose, clicked, refetch }) => {
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");
  const { t } = useTranslation();
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

  const onSubmit = async (data) => {
    //! Create FormData from input data
    const formData = new FormData();

    //! Add form fields
    Object.entries(data).forEach(([key, value]) => {
      if (key === "Files" && value.length > 0) {
        formData.append(key, value[0]); // Append file
      } else {
        formData.append(key, value);
      }
    });

    //! Log FormData entries for debugging
    for (const [key, value] of formData.entries()) {
    }

    try {
      if (!accessToken) {
        toast.error("Unauthorized. Please log in again.");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/notice/create`,
        {
          method: "POST",
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
          body: formData,
        }
      );
      // debugger;

      const responseData = await response.json();

      if (responseData?.data?.isSuccess) {
        toast.success(
          responseData?.data?.message || "Notice created successfully!"
        );
        refetch();
        reset();
        handleClose(); // Close modal after successful creation
      } else {
        toast.error(
          responseData?.data?.message || "Notice created unsuccessful!"
        );
      }
    } catch (error) {
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
              {t("notice.createNotice")}
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
                    {t("notice.title")}
                    <span className="text-red-600">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  className="modal-input-field ml-1 w-full"
                  {...register("Name", {
                    required: t("notice.titleRequired"),
                  })}
                />
                {errors.Name && (
                  <p className="text-red-500 text-sm">{errors.Name.message}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="label flex items-center">
                  <div className="modal-label-name">
                    {t("notice.description")}
                  </div>
                </label>
                <textarea
                  type="text"
                  className="modal-input-field ml-1 w-full"
                  {...register("Description")}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="label flex items-center">
                  <div className="modal-label-name">
                    {t("notice.uploadNotice")}
                  </div>
                </label>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx, .ppt, .pptx"
                  className=" ml-1 w-full"
                  {...register("Files")}
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
                  {t("notice.create")}
                </span>
              </button>
              <button
                onClick={handleClose}
                className="border-secondary flex items-center border rounded-sm"
              >
                <MdDeleteOutline className="text-white bg-secondary px-1 py-[2px] text-[28px]" />
                <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                  {t("notice.cancel")}
                </span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateNoticeModal;
