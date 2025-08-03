import { Modal } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from "@/src/Hook/useTranslation";

const DisApproveVolunteerModal = ({
  handleClose,
  clicked,
  record,
  refetch,
  refetch2,
}) => {
  const id = record?.id;
  const { t } = useTranslation();
  const handleApproveVolunteer = async () => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      toast.error(t("leaders.toast.unauthorized"));
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/disapprovevolunteer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ id: id }),
        }
      );

      if (response.status === 302) {
        toast.warning(t("leaders.toast.sessionExpired"));
        Cookies.remove("accessToken"); // Clear the token
        router.push("/login"); // Redirect to login page
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || t("leaders.toast.approveFailed"));
        Cookies.remove("accessToken");
        router.push("/login");
        return;
      }

      const responseData = await response.json();

      if (responseData?.data?.isSuccess) {
        toast.success(
          responseData?.data?.message || t("leaders.toast.approveSuccess")
        );
        handleClose();
        refetch();
        refetch2();
        // window.location.reload();
      }
    } catch (error) {
      toast.error(t("leaders.toast.unexpected"));
    }
  };
  return (
    <div>
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
                {t("leaders.modal.disapproveTitle")}
              </h1>

              <IoMdCloseCircleOutline
                onClick={handleClose}
                className="text-gray-500 text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 pt-[1px] mt-3"></div>

            <form>
              <div className="text-center text-base my-4">
                {t("leaders.modal.disapproveConfirm")}
              </div>
              <div className="bg-gray-200 py-[1px] mt-10"></div>
              <div className="flex items-end justify-end gap-2 mt-2">
                <button
                  onClick={handleApproveVolunteer}
                  type="button"
                  className=" border-green-600 bg-green-700 flex items-center border rounded-sm"
                >
                  <MdDone className=" text-white bg-green-700  px-1 py-[2px] text-[28px]" />
                  <span className="px-2 py-[6px] bg-green-600 transition-all hover:bg-green-700 text-white text-xs">
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
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DisApproveVolunteerModal;
