import React, { useState } from "react";
import ApproveVolunteerModal from "./ApproveVolunteerModal";
import DisApproveVolunteerModal from "./DisApproveVolunteerModal";
import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";

const PendingVolunteersApproved = ({ record, refetch }) => {
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
          className="text-green-500  text-[11px] px-2 py-[1px] font-semibold rounded-md"
        >
          <FaCheckSquare />
        </button>
      ) : (
        <button
          onClick={handleApproveVolunteer}
          className="text-red-500  text-[11px] px-2 py-[1px] font-semibold rounded-md"
        >
          <FaRegCheckSquare />
        </button>
      )}
      {ApproveVolunteer && (
        <ApproveVolunteerModal
          refetch={refetch}
          record={record}
          handleClose={handleApproveVolunteer}
          clicked={ApproveVolunteer}
        ></ApproveVolunteerModal>
      )}
      {DisApproveVolunteer && (
        <DisApproveVolunteerModal
          refetch={refetch}
          record={record}
          handleClose={handleDisApproveVolunteer}
          clicked={DisApproveVolunteer}
        ></DisApproveVolunteerModal>
      )}
    </div>
  );
};

export default PendingVolunteersApproved;
