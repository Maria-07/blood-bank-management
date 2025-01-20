"use client";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";

const ActionModal = ({ record }) => {
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
      <button onClick={(e) => e.preventDefault()}>
        <>
          <FaRegEye className="text-green-700" />
        </>
      </button>

      {/* {EditCampaign && (
        <CampaignEditModal
          record={record}
          handleClose={handleEditCampaign}
          clicked={EditCampaign}
        ></CampaignEditModal>
      )} */}
    </div>
  );
};

export default ActionModal;
