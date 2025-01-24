import { Modal } from "antd";
import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

const MessageModal = ({ record, handleClose, clicked }) => {
  console.log(record);

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
              {record?.contactType} from{" "}
              <span className="text-primary2">
                {record?.userData?.fullName}
              </span>
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 pt-[1px] mt-3"></div>
          <div className="my-2">
            <div>{record?.message}</div>
          </div>
          <div className="bg-gray-200 py-[1px] mt-10"></div>
          <div className="flex items-end justify-end gap-2 mt-2">
            <button
              onClick={handleClose}
              className=" border-secondary flex items-center border rounded-sm"
            >
              <MdDeleteOutline className=" text-white bg-secondary  px-1 py-[2px] text-[28px]" />
              <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                Cancel
              </span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MessageModal;
