import { Modal } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from "@/src/Hook/useTranslation";

const UserDeleteModal = ({ record, handleClose, clicked }) => {
  const router = useRouter();
  const id = record?.id;
  const { t } = useTranslation();
  const handleDelete = async () => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      toast.error(t("leaders.toast.unauthorized"));
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || t("leaders.toast.deleteFailed"));
        return;
      }

      const responseData = await response.json();
      //   debugger;

      if (responseData?.data?.isSuccess) {
        toast.success(
          responseData?.data?.message || t("leaders.toast.deleteSuccess")
        );
        window.location.reload();
        handleClose();
      }
    } catch (error) {
      toast.error(t("leaders.toast.unexpected"));
    }
  };
  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        // bodyStyle={{ padding: "0" }}
        width={600}
        closable={false}
        className="box"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl  font-semibold tracking-tight">
              {t("leaders.title.delete")}
              <div className="text-center text-base my-4"></div>
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 pt-[1px] mt-3"></div>
          <div className="my-2">
            <div>
              {" "}
              {t("leaders.confirm.delete")}
              <span className="text-primary font-semibold">
                {" "}
                {record?.fullName}
              </span>{" "}
              {t("leaders.confirm.user")} ?
            </div>
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
                {t("leaders.modal.disapproveBtn")}
              </span>
            </button>
            <button
              className=" border-rose-600 flex items-center border rounded-sm"
              onClick={handleClose}
            >
              <MdDeleteOutline className=" text-white bg-rose-700  px-1 py-[2px] text-[28px]" />
              <span className="px-2 py-[6px] bg-rose-500 transition-all hover:bg-rose-600 text-white text-xs">
                {t("leaders.modal.cancelBtn")}
              </span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserDeleteModal;
