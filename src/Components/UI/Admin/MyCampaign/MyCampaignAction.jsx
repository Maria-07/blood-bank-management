"use client";
import React, { useState } from "react";
import AddDonorManageModal from "../DonorManage/AddDonorManageModal";
import { ImUserPlus } from "react-icons/im";
import AddDonorManageModalCampaign from "../DonorManage/AddDonorManageModalCampaign";

const MyCampaignAction = ({ record }) => {
  const [AddDonor, setAddDonor] = useState(false);
  //! Handle modals
  const handleAddDonor = () => setAddDonor(!AddDonor);
  return (
    <div>
      <button onClick={handleAddDonor}>
        <ImUserPlus title="Add Donor" />
      </button>
      {AddDonor && (
        <AddDonorManageModalCampaign
          record={record}
          handleClose={handleAddDonor}
          clicked={AddDonor}
        />
      )}
    </div>
  );
};

export default MyCampaignAction;
