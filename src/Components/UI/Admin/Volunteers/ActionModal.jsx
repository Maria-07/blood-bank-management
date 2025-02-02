"use client";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import UserProfileModal from "../../User/UserProfileModal";
import { useAuth } from "@/src/Hook/AuthContext";

const ActionModal = ({ record }) => {
  const { userType } = useAuth();

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
          admin={userType === "Admin" ? true : false}
        ></UserProfileModal>
      )}
    </div>
  );
};

export default ActionModal;
