import React, { useState } from "react";
import ApproveVolunteerModal from "./ApproveVolunteerModal";
import DisApproveVolunteerModal from "./DisApproveVolunteerModal";

const PendingVolunteersApproved = ({ record }) => {
  const [ApproveVolunteer, setApproveVolunteer] = useState(false);
  const handleApproveVolunteer = () => {
    setApproveVolunteer(!ApproveVolunteer);
  };
  const [DisApproveVolunteer, setDisApproveVolunteer] = useState(false);
  const handleDisApproveVolunteer = () => {
    setDisApproveVolunteer(!DisApproveVolunteer);
  };
  return (
    <div>
      {record?.isApproved ? (
        <button
          onClick={handleDisApproveVolunteer}
          className="text-green-500 bg-green-50 text-[11px] px-2 py-[1px] font-semibold rounded-md"
        >
          Approved
        </button>
      ) : (
        <button
          onClick={handleApproveVolunteer}
          className="text-red-500 bg-soft text-[11px] px-2 py-[1px] font-semibold rounded-md"
        >
          Pending
        </button>
      )}
      {ApproveVolunteer && (
        <ApproveVolunteerModal
          record={record}
          handleClose={handleApproveVolunteer}
          clicked={ApproveVolunteer}
        ></ApproveVolunteerModal>
      )}
      {DisApproveVolunteer && (
        <DisApproveVolunteerModal
          record={record}
          handleClose={handleDisApproveVolunteer}
          clicked={DisApproveVolunteer}
        ></DisApproveVolunteerModal>
      )}
    </div>
  );
};

export default PendingVolunteersApproved;
