import React, { useState } from "react";
import ApproveVolunteerModal from "./ApproveVolunteerModal";
import DisApproveVolunteerModal from "./DisApproveVolunteerModal";
import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import UserDeleteModal from "../../User/UserDeleteModal";

const PendingVolunteersApproved = ({ record, refetch }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState();

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
    setId(record?.id);
  };

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
        <div className="flex items-center justify-center gap-2">
          {" "}
          <button
            onClick={handleDisApproveVolunteer}
            className="text-green-500  text-[11px] px-2 py-[1px] font-semibold rounded-md"
          >
            <FaCheckSquare />
          </button>
          <button
            type="button"
            onClick={handleDeleteModal}
            className="flex items-center justify-center text-secondary"
          >
            <MdDeleteForever />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleApproveVolunteer}
            className="text-red-500  text-[11px] px-2 py-[1px] font-semibold rounded-md"
          >
            <FaRegCheckSquare />
          </button>
          <button
            type="button"
            onClick={handleDeleteModal}
            className="flex items-center justify-center text-secondary"
          >
            <MdDeleteForever />
          </button>
        </div>
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
      {deleteModal && (
        <UserDeleteModal
          record={record}
          refetch={refetch}
          clicked={deleteModal}
          handleClose={handleDeleteModal}
        />
      )}
    </div>
  );
};

export default PendingVolunteersApproved;
