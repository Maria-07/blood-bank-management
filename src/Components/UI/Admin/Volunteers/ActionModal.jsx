"use client";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import UserProfileModal from "../../User/UserProfileModal";

const ActionModal = ({ record }) => {
  // console.log(record, "record");

  const [UserDetails, setUserDetails] = useState(false);
  const handleUserDetails = () => {
    setUserDetails(!UserDetails);
  };

  return (
    <div>
      <button onClick={handleUserDetails}>
        <>
          <FaRegEye className="text-green-700" />
        </>
      </button>

      {UserDetails && (
        <UserProfileModal
          record={record}
          handleClose={handleUserDetails}
          clicked={UserDetails}
        ></UserProfileModal>
      )}
    </div>
  );
};

export default ActionModal;
