"use client";
import { Modal } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { toast } from "react-toastify";

const CampaignDeleteModal = ({ handleClose, clicked, record, refetch }) => {
  const router = useRouter();
  const id = record?.id;

  const handleDelete = async () => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      toast.error("Unauthorized. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/campaign/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 302) {
        toast.warning("Session expired. Redirecting to login...");
        Cookies.remove("accessToken"); // Clear the token
        router.push("/login"); // Redirect to login page
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to delete the campaign.");
        Cookies.remove("accessToken");
        router.push("/login");
        return;
      }

      const responseData = await response.json();

      if (responseData?.data?.isSuccess) {
        toast.success(
          responseData?.data?.message || "Campaign deleted successfully!"
        );
        refetch();
        handleClose();
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      onFailure?.(error); // Call the failure callback if provided
    }
  };

  return (
    <div>
      {" "}
      <Modal
        open={clicked}
        centered
        footer={null}
        width={500}
        closable={false}
        className="box"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl  font-semibold tracking-tight">
              Delete Contract
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 pt-[1px] mt-3"></div>

          <form>
            <div className="text-center text-base my-4">
              Do you want to delete this{" "}
              <span className="text-primary font-semibold">{record?.name}</span>{" "}
              Campaign ? This can not be reclaimed.
            </div>
            <div className="bg-gray-200 py-[1px] mt-10"></div>
            <div className="flex items-end justify-end gap-2 mt-2">
              <button
                onClick={handleDelete}
                type="button"
                className=" border-secondary flex items-center border rounded-sm"
              >
                <MdDone className=" text-white bg-secondary  px-1 py-[2px] text-[28px]" />
                <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                  Delete
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

export default CampaignDeleteModal;
