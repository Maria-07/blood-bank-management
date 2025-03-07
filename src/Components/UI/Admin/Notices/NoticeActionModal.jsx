"use client";
import { Dropdown } from "antd";
import React, { useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import NoticeDeleteModal from "./NoticeDeleteModal";
import NoticeEditModal from "./NoticeEditModal";

const NoticeActionModal = ({ record, refetch }) => {
  // console.log(record, "record");

  const [EditNotice, setEditNotice] = useState(false);
  const handleEditNotice = () => {
    setEditNotice(!EditNotice);
  };

  const [DeleteNotice, setDeleteNotice] = useState(false);
  const handleDeleteNotice = () => {
    setDeleteNotice(!DeleteNotice);
  };
  return (
    <div>
      <Dropdown
        overlay={
          <div className="bg-white shadow-md p-2 rounded-sm border-[1px]">
            <button
              onClick={handleEditNotice}
              className="flex items-center gap-2 font-semibold hover:bg-blue-200 min-w-[180px] px-1 hover:rounded-sm"
            >
              <MdEdit className="text-lime-700" title="edit" />
              Edit Notice
            </button>
            <button
              onClick={handleDeleteNotice}
              className="flex items-center gap-2 font-semibold hover:bg-blue-200 min-w-[180px] px-1 hover:rounded-sm"
            >
              <MdDeleteOutline className="text-rose-500" title="delete" />
              Delete Notice
            </button>
          </div>
        }
        trigger={["click"]}
        overlayStyle={{ zIndex: "100" }}
      >
        <button onClick={(e) => e.preventDefault()}>
          <>
            <BsThreeDots />
          </>
        </button>
      </Dropdown>

      {EditNotice && (
        <NoticeEditModal
          refetch={refetch}
          record={record}
          handleClose={handleEditNotice}
          clicked={EditNotice}
        ></NoticeEditModal>
      )}

      {DeleteNotice && (
        <NoticeDeleteModal
          record={record}
          refetch={refetch}
          handleClose={handleDeleteNotice}
          clicked={DeleteNotice}
        ></NoticeDeleteModal>
      )}
    </div>
  );
};

export default NoticeActionModal;
