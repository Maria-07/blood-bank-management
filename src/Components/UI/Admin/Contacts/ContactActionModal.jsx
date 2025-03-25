"use client";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { useAuth } from "@/src/Hook/AuthContext";
import UserProfileModal from "../../User/UserProfileModal";

const ContactActionModal = ({ record }) => {
  const { userType } = useAuth();

  const [UserDetails, setUserDetails] = useState(false);
  const handleUserDetails = () => {
    setUserDetails(!UserDetails);
  };

  return (
    <>
      {" "}
      <div className="flex items-center justify-center gap-2">
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
      {UserDetails && (
        <UserProfileModal
          record={record}
          handleClose={handleUserDetails}
          clicked={UserDetails}
          admin={userType === "Admin" ? true : false}
        ></UserProfileModal>
      )}
    </>
  );
};

export default ContactActionModal;
