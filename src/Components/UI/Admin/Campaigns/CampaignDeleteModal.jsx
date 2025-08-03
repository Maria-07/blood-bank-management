"use client";
import { Modal } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from "@/src/Hook/useTranslation"; // ← Import t()

const CampaignDeleteModal = ({ handleClose, clicked, record, refetch }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const id = record?.id;

  const handleDelete = async () => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      toast.error(t("campaign.unauthorized"));
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
        toast.warning(t("campaign.expired"));
        Cookies.remove("accessToken");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || t("campaign.deleteFailed"));
        Cookies.remove("accessToken");
        router.push("/login");
        return;
      }

      const responseData = await response.json();

      if (responseData?.data?.isSuccess) {
        toast.success(
          responseData?.data?.message || t("campaign.deleteSuccess")
        );
        refetch();
        handleClose();
      }
    } catch (error) {
      toast.error(t("campaign.unexpectedError"));
    }
  };

  return (
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
          <h1 className="text-xl font-semibold tracking-tight">
            {t("campaign.deleteTitle")}
          </h1>

          <IoMdCloseCircleOutline
            onClick={handleClose}
            className="text-gray-500 text-2xl hover:text-primary"
          />
        </div>

        <div className="bg-gray-200 pt-[1px] mt-3"></div>

        <form>
          <div className="text-center text-base my-4">
            {t("campaign.confirmDelete")}{" "}
            <span className="text-primary font-semibold">{record?.name}</span>{" "}
            {t("campaign.confirmNote")}
          </div>
          <div className="bg-gray-200 py-[1px] mt-10"></div>
          <div className="flex items-end justify-end gap-2 mt-2">
            <button
              onClick={handleDelete}
              type="button"
              className="border-secondary flex items-center border rounded-sm"
            >
              <MdDone className="text-white bg-secondary px-1 py-[2px] text-[28px]" />
              <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                {t("campaign.deleteBtn")}
              </span>
            </button>
            <button
              className="border-rose-600 flex items-center border rounded-sm"
              onClick={handleClose}
            >
              <MdDeleteOutline className="text-white bg-rose-700 px-1 py-[2px] text-[28px]" />
              <span className="px-2 py-[6px] bg-rose-500 transition-all hover:bg-rose-600 text-white text-xs">
                {t("campaign.cancelBtn")}
              </span>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CampaignDeleteModal;
