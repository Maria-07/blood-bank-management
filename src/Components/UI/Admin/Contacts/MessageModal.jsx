import { Modal } from "antd";
import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

const MessageModal = ({ record, handleClose, clicked }) => {
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
              {record?.contactType}
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 pt-[1px] mt-3"></div>
          <div className="my-2">
            <div className="border p-3 rounded-md">
              <h1>
                {" "}
                <span className="text-primary2">
                  {record?.userData?.fullName}
                </span>
              </h1>
              {record?.message}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MessageModal;
