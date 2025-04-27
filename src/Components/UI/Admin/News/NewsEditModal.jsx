"use client";
import { useEffect } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import { useUpdateNewsMutation } from "@/src/redux/features/news/news";

const NewsEditModal = ({ handleClose, record, clicked, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset({
      name: record?.name || "",
      url: record?.url || "",
      description: record?.description || "",
    });
  }, [record, reset]);

  //! Update news :
  const [updateNews] = useUpdateNewsMutation();

  const onSubmit = async (data) => {
    try {
      const response = await updateNews({ ...data, id: record?.id });

      if (response?.data?.isSuccess) {
        toast.success(response?.data?.message);
        handleClose();
        refetch();
      } else {
        toast.error(response?.error?.data?.message || "Failed to update news");
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
        onCancel={handleClose} // Enables closing by clicking outside
      >
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">
              Update a News
            </h1>
          </div>

          <div className="bg-gray-200 pt-[1px] mt-3"></div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 my-3 mr-2 gap-x-2 gap-y-3">
              <div className="sm:col-span-2">
                <label className="label flex items-center">
                  <div className="modal-label-name">Title</div>
                </label>
                <input
                  type="text"
                  className="modal-input-field ml-1 w-full"
                  {...register("name")}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label flex items-center">
                  <div className="modal-label-name">News Url</div>
                </label>
                <input
                  type="text"
                  className="modal-input-field ml-1 w-full"
                  {...register("url")}
                />
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
                  Update News
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

export default NewsEditModal;
