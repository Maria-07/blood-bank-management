"use client";
import { Dropdown } from "antd";
import React, { useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import NewsDeleteModal from "./NewsDeleteModal";
import NewsEditModal from "./NewsEditModal";

const NewsActionModal = ({ record, refetch }) => {
  const [EditNews, setEditNews] = useState(false);
  const handleEditNews = () => {
    setEditNews(!EditNews);
  };

  const [DeleteNews, setDeleteNews] = useState(false);
  const handleDeleteNews = () => {
    setDeleteNews(!DeleteNews);
  };
  return (
    <div>
      {/* <Dropdown
        overlay={
          <div className="bg-white shadow-md p-2 rounded-sm border-[1px]">
            <button
              onClick={handleEditNews}
              className="flex items-center gap-2 font-semibold hover:bg-blue-200 min-w-[180px] px-1 hover:rounded-sm"
            >
              <MdEdit className="text-lime-700" title="edit" />
              Edit News
            </button>
            <button
              onClick={handleDeleteNews}
              className="flex items-center gap-2 font-semibold hover:bg-blue-200 min-w-[180px] px-1 hover:rounded-sm"
            >
              <MdDeleteOutline className="text-rose-500" title="delete" />
              Delete News
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
      </Dropdown> */}

      <div className="flex items-center justify-center  gap-2">
        <MdEdit
          onClick={handleEditNews}
          className="text-lime-700"
          title="edit"
        />
        <MdDeleteOutline
          onClick={handleDeleteNews}
          className="text-rose-500"
          title="delete"
        />
      </div>

      {EditNews && (
        <NewsEditModal
          refetch={refetch}
          record={record}
          handleClose={handleEditNews}
          clicked={EditNews}
        ></NewsEditModal>
      )}

      {DeleteNews && (
        <NewsDeleteModal
          record={record}
          refetch={refetch}
          handleClose={handleDeleteNews}
          clicked={DeleteNews}
        ></NewsDeleteModal>
      )}
    </div>
  );
};

export default NewsActionModal;
