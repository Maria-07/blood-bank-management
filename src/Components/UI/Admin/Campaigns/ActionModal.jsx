"use client";
import { Dropdown } from "antd";
import React, { useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import CampaignEditModal from "./CampaignEditModal";
import CampaignDeleteModal from "./CampaignDeleteModal";

const ActionModal = ({ record, refetch }) => {
  // console.log(record, "record");

  const [EditCampaign, setEditCampaign] = useState(false);
  const handleEditCampaign = () => {
    setEditCampaign(!EditCampaign);
  };

  const [DeleteCampaign, setDeleteCampaign] = useState(false);
  const handleDeleteCampaign = () => {
    setDeleteCampaign(!DeleteCampaign);
  };
  return (
    <div>
      <Dropdown
        overlay={
          <div className="bg-white shadow-md p-2 rounded-sm border-[1px]">
            <button
              onClick={handleEditCampaign}
              className="flex items-center gap-2 font-semibold hover:bg-blue-200 min-w-[180px] px-1 hover:rounded-sm"
            >
              <MdEdit className="text-lime-700" title="edit" />
              Edit Campaign
            </button>
            <button
              onClick={handleDeleteCampaign}
              className="flex items-center gap-2 font-semibold hover:bg-blue-200 min-w-[180px] px-1 hover:rounded-sm"
            >
              <MdDeleteOutline className="text-rose-500" title="delete" />
              Delete Campaign
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

      {EditCampaign && (
        <CampaignEditModal
          refetch={refetch}
          record={record}
          handleClose={handleEditCampaign}
          clicked={EditCampaign}
        ></CampaignEditModal>
      )}

      {DeleteCampaign && (
        <CampaignDeleteModal
          record={record}
          refetch={refetch}
          handleClose={handleDeleteCampaign}
          clicked={DeleteCampaign}
        ></CampaignDeleteModal>
      )}
    </div>
  );
};

export default ActionModal;
