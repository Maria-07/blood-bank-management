"use client";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import UserProfileModal from "../../User/UserProfileModal";
import { useAuth } from "@/src/Hook/AuthContext";
import ApproveVolunteerModal from "./ApproveVolunteerModal";
import DisApproveVolunteerModal from "./DisApproveVolunteerModal";
import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import UserDeleteModal from "../../User/UserDeleteModal";
import { FcDisapprove } from "react-icons/fc";

const ActionModal = ({ record }) => {
  const { userType } = useAuth();

  const [UserDetails, setUserDetails] = useState(false);
  const handleUserDetails = () => {
    setUserDetails(!UserDetails);
  };

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
      <div>
        {record?.isApproved ? (
          <div className="flex items-center justify-center gap-2">
            {" "}
            <button
              title="Reject"
              onClick={handleDisApproveVolunteer}
              className="text-green-500  text-[16px] px-2 py-[1px] font-semibold rounded-md"
            >
              <FcDisapprove />
            </button>
            <button
              title="Delete User"
              type="button"
              onClick={handleDeleteModal}
              className="flex items-center justify-center text-secondary"
            >
              <MdDeleteForever />
            </button>
            <button
              title="Details"
              className="text-green-500  text-[13px] px-2 py-[1px] font-semibold rounded-md"
              onClick={handleUserDetails}
            >
              <>
                <FaRegEye className="text-green-700" />
              </>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <button
              title="Approve"
              onClick={handleApproveVolunteer}
              className="text-green-500  text-[11px] px-2 py-[1px] font-semibold rounded-md"
            >
              <FaRegCheckSquare />
            </button>
            <button
              title="Delete User"
              type="button"
              onClick={handleDeleteModal}
              className="flex items-center justify-center text-secondary"
            >
              <MdDeleteForever />
            </button>
            <button
              title="Details"
              className="text-green-500  text-[13px] px-2 py-[1px] font-semibold rounded-md"
              onClick={handleUserDetails}
            >
              <>
                <FaRegEye className="text-green-700" />
              </>
            </button>
          </div>
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
        {deleteModal && (
          <UserDeleteModal
            record={record}
            clicked={deleteModal}
            handleClose={handleDeleteModal}
          />
        )}
      </div>

      {UserDetails && (
        <UserProfileModal
          record={record}
          handleClose={handleUserDetails}
          clicked={UserDetails}
          admin={userType === "Admin" ? true : false}
        ></UserProfileModal>
      )}
    </div>
  );
};

export default ActionModal;
