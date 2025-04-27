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

const CreateNewsModal = ({ handleClose, clicked, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //! Post news :
  const [news] = usePostNewsMutation();

  const onSubmit = async (data) => {
    try {
      const response = await news(data);

      if (response?.data?.data?.isSuccess) {
        toast.success(response?.data?.data?.message);
        handleClose();
        refetch();
      } else {
        toast.error(response?.error?.data?.message);
      }
    } catch (error) {}
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
              Create a News
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
                    Title<span className="text-red-600">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  className="modal-input-field ml-1 w-full"
                  {...register("name", {
                    required: "News name is required",
                  })}
                />
                {errors.Name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="label flex items-center">
                  <div className="modal-label-name">
                    News Url<span className="text-red-600">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  className="modal-input-field ml-1 w-full"
                  {...register("url", {
                    required: "News url is required",
                  })}
                />
                {errors.url && (
                  <p className="text-red-500 text-sm">{errors.url.message}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="label flex items-center">
                  <div className="modal-label-name">
                    Publish Date<span className="text-red-600">*</span>
                  </div>
                </label>
                <input
                  type="date"
                  className="modal-input-field ml-1 w-full"
                  {...register("publishDate", {
                    required: "News publishDate is required",
                  })}
                />
                {errors.publishDate && (
                  <p className="text-red-500 text-sm">
                    {errors.publishDate.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="label flex items-center">
                  <div className="modal-label-name">Description</div>
                </label>
                <textarea
                  type="text"
                  className="modal-input-field ml-1 w-full"
                  {...register("description")}
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
                  Create News
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

export default CreateNewsModal;
