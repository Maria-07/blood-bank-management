"use client";
import Cookies from "js-cookie";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { toast } from "react-toastify";

const NoticeEditModal = ({ handleClose, record, clicked, refetch }) => {
  const { id, name, description } = record;

  const accessToken = Cookies.get("accessToken");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    //! Update FormData from input data
    const formData = new FormData();

    //! Add form fields
    Object.entries(data).forEach(([key, value]) => {
      if (key === "Files" && value.length > 0) {
        formData.append(key, value[0]); // Append new file if provided
      }
    });

    formData.append("id", id);
    formData.append("Name", data.Name || name); // Use old name if unchanged
    formData.append("Description", data.Description || description); // Use old description if unchanged

    //! If no new file is uploaded, send the previous file URL
    if (!data.Files.length && record.fileUrls && record.fileUrls.length > 0) {
      formData.append("fileUrls", record.fileUrls);
    }

    //! Log FormData entries for debugging
    for (const [key, value] of formData.entries()) {
    }

    try {
      if (!accessToken) {
        toast.error("Unauthorized. Please log in again.");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/notice/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      const responseData = await response.json();

      if (responseData?.data?.isSuccess) {
        toast.success(
          responseData?.data?.message || "Notice updated successfully!"
        );
        refetch();
        handleClose(); // Close modal after successful update
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
              Update a Notice
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
                    Notice Name<span className="text-red-600">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  className="modal-input-field ml-1 w-full"
                  defaultValue={name}
                  {...register("Name", {
                    required: "Notice name is required",
                  })}
                />
                {errors.Name && (
                  <p className="text-red-500 text-sm">{errors.Name.message}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="label flex items-center">
                  <div className="modal-label-name">Description</div>
                </label>
                <textarea
                  type="text"
                  defaultValue={description}
                  className="modal-input-field ml-1 w-full"
                  {...register("Description")}
                />
              </div>

              {/* <div className="sm:col-span-2">
                <label className="label flex items-center">
                  <div className="modal-label-name">Upload your Notice</div>
                </label>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx, .ppt, .pptx"
                  className=" ml-1 w-full"
                  {...register("Files")}
                />
              </div> */}

              <div className="sm:col-span-2">
                <label className="label flex items-center">
                  <div className="modal-label-name">Upload your Notice</div>
                </label>

                {/* Show Existing File (If Available) */}
                {record?.fileUrls && record?.fileUrls.length > 0 && (
                  <div className="mb-2 text-sm text-blue-600">
                    <a
                      href={`${process.env.NEXT_PUBLIC_FILE_BASE_URL}/${record.fileUrls[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Current File: {record.fileUrls[0].split("/").pop()}
                    </a>
                  </div>
                )}

                {/* File Upload Input */}
                <input
                  type="file"
                  accept=".pdf, .doc, .docx, .ppt, .pptx"
                  className="ml-1 w-full"
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
                  Update Notice
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

export default NoticeEditModal;
