import { Modal } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { toast } from "react-toastify";

const DisApproveVolunteerModal = ({
  handleClose,
  clicked,
  record,
  refetch,
}) => {
  const id = record?.id;
  console.log("record", record?.id);

  const handleApproveVolunteer = async () => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      toast.error("Unauthorized. Please log in again.");
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
        toast.warning("Session expired. Redirecting to login...");
        Cookies.remove("accessToken"); // Clear the token
        router.push("/login"); // Redirect to login page
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to approve volunteer.");
        Cookies.remove("accessToken");
        router.push("/login");
        return;
      }

      const responseData = await response.json();
      console.log("Approved Response:", responseData);

      if (responseData?.data?.isSuccess) {
        toast.success(
          responseData?.data?.message || "Volunteer dismissed successfully!"
        );
        handleClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Network or server error:", error);
      toast.error("An unexpected error occurred. Please try again.");
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
              <h1 className="text-xl  font-semibold tracking-tight">Remove</h1>

              <IoMdCloseCircleOutline
                onClick={handleClose}
                className="text-gray-500 text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 pt-[1px] mt-3"></div>

            <form>
              <div className="text-center text-base my-4">
                Do you want to Remove this {record?.userType} ?
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
                    Remove
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
    </div>
  );
};

export default DisApproveVolunteerModal;
