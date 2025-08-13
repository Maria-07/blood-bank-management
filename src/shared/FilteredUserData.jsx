import React, { useEffect, useState, useRef } from "react";
import { MdBloodtype } from "react-icons/md";
import { LuMapPinned } from "react-icons/lu";
import { TiPin } from "react-icons/ti";
import { FaPeopleArrows, FaRegUser, FaTransgender } from "react-icons/fa6";
import CustomSearchOption from "@/src/shared/CustomSearchOption";
import {
  ageRange,
  ApprovalStatus,
  bloodGroups,
  DonationStatus,
  gender,
  userTypes,
} from "@/src/shared/constance";
import { BiSolidDonateHeart } from "react-icons/bi";
import { BsGenderAmbiguous } from "react-icons/bs";
import { useTranslation } from "../Hook/useTranslation";
import { FaUser } from "react-icons/fa";

const FilteredUserData = ({ role, handleFilteredData, resetTrigger }) => {
  // const [userType, setUserType] = useState("");
  // const [bloodType, setBloodType] = useState("");
  const [upazilaId, setUpazilaId] = useState();
  // const [unionId, setUnionId] = useState(null);
  const [age, setAge] = useState({ startAge: null, endAge: null });
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  const searchInputRef = useRef(null);

  const { t } = useTranslation();

  //! Fetch Upazila and Union data
  const fetchData = async (id = 1, type = "upazila") => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/location/GetByParentId/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();

      if (type === "upazila") setUpazilas(data?.data || []);
      else setUnions(data?.data || []);
    } catch (error) {}
  };

  //! Handle Filter Updates
  const updateFilters = (key, value) => {
    handleFilteredData(key, value); // Call the parent handler

    if (key === "upazila") {
      setUpazilaId(value);
    }
  };

  //! Fetch Upazilas on component mount
  useEffect(() => {
    fetchData(1, "upazila");
  }, []);

  //! Fetch Unions when an Upazila is selected
  useEffect(() => {
    if (upazilaId) {
      fetchData(upazilaId, "union");
    }
  }, [upazilaId]);

  //! Reset all filter states when resetTrigger changes
  useEffect(() => {
    if (resetTrigger) {
      setUpazilaId(undefined);
      setAge({ startAge: null, endAge: null });
      setUnions([]);
      if (searchInputRef.current) {
        searchInputRef.current.value = "";
      }
    }
  }, [resetTrigger]);

  //! Handle Age Selection
  const handleAgeSelection = (selectedAgeRange) => {
    setAge(selectedAgeRange);
    updateFilters("startAge", selectedAgeRange?.startAge);
    updateFilters("endAge", selectedAgeRange?.endAge);
  };

  return (
    <div className="">
      <div
        className={`gap-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ${
          role === "admin" ? "2xl:grid-cols-6" : "2xl:grid-cols-5"
        }`}
      >
        {/* Blood Group Filter */}
        <div>
          <h1 className="flex items-center gap-1 font-semibold text-sm mb-2 text-black">
            <MdBloodtype className="text-secondary text-lg" />{" "}
            {t("filters.bloodGroup")}
          </h1>
          <CustomSearchOption
            item={bloodGroups}
            option={(selectedBloodType) => {
              // setBloodType(selectedBloodType);
              updateFilters("bloodGroup", selectedBloodType?.value);
            }}
            resetTrigger={resetTrigger}
          />
        </div>
        {/* Blood Group Filter */}
        <div>
          <h1 className="flex items-center gap-1 font-semibold text-sm mb-2 text-black">
            <FaTransgender className="text-secondary text-lg" />{" "}
            {t("filters.gender")}
          </h1>
          <CustomSearchOption
            item={gender}
            option={(selectedGenderType) => {
              // setBloodType(selectedBloodType);
              updateFilters("gender", selectedGenderType?.value);
            }}
            resetTrigger={resetTrigger}
          />
        </div>
        {/* User Type Filter */}
        {/* {role === "admin" && (
          <div>
            <h1 className="flex items-center gap-1 font-semibold text-sm mb-2 text-black">
              <FaRegUser className="text-secondary text-lg" /> User Type
            </h1>
            <CustomSearchOption
              item={userTypes}
              option={(selectedUserType) => {
                // setBloodType(selectedUserType);
                updateFilters("userType", selectedUserType?.value);
              }}
            />
          </div>
        )} */}
        {/* User Type Filter */}
        {/* {role === "admin" && (
          <div>
            <h1 className="flex items-center gap-1 font-semibold text-sm mb-2 text-black">
              <FaRegUser className="text-secondary text-lg" /> User Approval
              Status
            </h1>
            <CustomSearchOption
              item={ApprovalStatus}
              option={(selectedApprovalStatus) => {
                // setBloodType(selectedUserType);
                updateFilters("isApproved", selectedApprovalStatus?.value);
              }}
            />
          </div>
        )} */}
        {/* User Type Filter */}
        {role === "admin" && (
          <div>
            <h1 className="flex items-center gap-1 font-semibold text-sm mb-2 text-black">
              <BiSolidDonateHeart className="text-secondary text-lg" />{" "}
              {t("filters.bloodDonationStatus")}
            </h1>
            <CustomSearchOption
              item={DonationStatus}
              option={(selectedbdStatus) => {
                // setBloodType(selectedbdStatus);
                updateFilters("bloodDonationStatus", selectedbdStatus?.value);
              }}
              resetTrigger={resetTrigger}
            />
          </div>
        )}

        {/* Upazila Filter */}
        <div>
          <h1 className="flex items-center gap-1 font-semibold text-sm mb-2 text-black">
            <LuMapPinned className="text-secondary text-lg" />{" "}
            {t("filters.upazila")}
          </h1>
          <CustomSearchOption
            item={upazilas.map((u) => ({ label: u.name, value: u.id }))}
            option={(selectedUpazila) => {
              updateFilters("upazila", selectedUpazila?.key);
            }}
            resetTrigger={resetTrigger}
          />
        </div>

        {/* Union Filter */}
        <div>
          <h1 className="flex items-center gap-1 font-semibold text-sm mb-2 text-black">
            <TiPin className="text-secondary text-lg" /> {t("filters.union")}
          </h1>
          <CustomSearchOption
            item={unions.map((u) => ({ label: u.name, value: u.id }))}
            option={(selectedUnion) => {
              updateFilters("union", selectedUnion?.key);
            }}
            resetTrigger={resetTrigger}
          />
        </div>

        {/* Age Filter */}
        <div>
          <h1 className="flex items-center gap-1 font-semibold text-sm mb-2 text-black">
            <FaPeopleArrows className="text-secondary text-lg" />{" "}
            {t("filters.age")}
          </h1>
          <CustomSearchOption
            item={ageRange}
            option={handleAgeSelection}
            resetTrigger={resetTrigger}
          />
        </div>

        {role === "admin" && (
          <div className="sm:col-span-2">
            <h1 className="flex items-center gap-1 font-semibold text-sm mb-2 text-black">
              <FaUser className="text-secondary text-lg" />{" "}
              {t("filters.userName")}
            </h1>
            <input
              ref={searchInputRef}
              type="text"
              placeholder={t("filters.userName")}
              className="input-border w-full "
              onChange={(e) => updateFilters("searchQuery", e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilteredUserData;
