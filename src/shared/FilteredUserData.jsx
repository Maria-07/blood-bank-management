import React, { useEffect, useState } from "react";
import { MdBloodtype } from "react-icons/md";
import { LuMapPinned } from "react-icons/lu";
import { TiPin } from "react-icons/ti";
import { FaPeopleArrows, FaRegUser } from "react-icons/fa6";
import CustomSearchOption from "@/src/shared/CustomSearchOption";
import {
  ageRange,
  bloodGroups,
  DonationStatus,
  userTypes,
} from "@/src/shared/constance";
import { BiSolidDonateHeart } from "react-icons/bi";

const FilteredUserData = ({ handleFilteredData }) => {
  // const [userType, setUserType] = useState("");
  // const [bloodType, setBloodType] = useState("");
  const [upazilaId, setUpazilaId] = useState();
  // const [unionId, setUnionId] = useState(null);
  const [age, setAge] = useState({ startAge: null, endAge: null });

  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);

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
    } catch (error) {
      console.error(`Error fetching ${type}:`, error.message);
    }
  };

  //! Handle Filter Updates
  const updateFilters = (key, value) => {
    console.log(key, value);

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

  //! Handle Age Selection
  const handleAgeSelection = (selectedAgeRange) => {
    setAge(selectedAgeRange);
    updateFilters("startAge", selectedAgeRange?.startAge);
    updateFilters("endAge", selectedAgeRange?.endAge);
  };

  return (
    <div className="">
      <div className="gap-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 ">
        {/* Blood Group Filter */}
        <div>
          <h1 className="flex items-center gap-1 font-semibold text-sm mb-2 text-black">
            <MdBloodtype className="text-secondary text-lg" /> Blood Group
          </h1>
          <CustomSearchOption
            item={bloodGroups}
            option={(selectedBloodType) => {
              // setBloodType(selectedBloodType);
              updateFilters("bloodGroup", selectedBloodType?.label);
            }}
          />
        </div>
        {/* User Type Filter */}
        <div>
          <h1 className="flex items-center gap-1 font-semibold text-sm mb-2 text-black">
            <FaRegUser className="text-secondary text-lg" /> User Type
          </h1>
          <CustomSearchOption
            item={userTypes}
            option={(selectedUserType) => {
              // setBloodType(selectedUserType);
              updateFilters("userType", selectedUserType?.label);
            }}
          />
        </div>
        {/* User Type Filter */}
        <div>
          <h1 className="flex items-center gap-1 font-semibold text-sm mb-2 text-black">
            <BiSolidDonateHeart className="text-secondary text-lg" /> Blood
            Donation Status
          </h1>
          <CustomSearchOption
            item={DonationStatus}
            option={(selectedbdStatus) => {
              // setBloodType(selectedbdStatus);
              updateFilters("bloodDonationStatus", selectedbdStatus?.label);
            }}
          />
        </div>

        {/* Upazila Filter */}
        <div>
          <h1 className="flex items-center gap-1 font-semibold text-sm mb-2 text-black">
            <LuMapPinned className="text-secondary text-lg" /> Upazila
          </h1>
          <CustomSearchOption
            item={upazilas.map((u) => ({ label: u.name, value: u.id }))}
            option={(selectedUpazila) => {
              // setUpazilaId(selectedUpazila);
              updateFilters("upazila", selectedUpazila?.key);
            }}
          />
        </div>

        {/* Union Filter */}
        <div>
          <h1 className="flex items-center gap-1 font-semibold text-sm mb-2 text-black">
            <TiPin className="text-secondary text-lg" /> Union
          </h1>
          <CustomSearchOption
            item={unions.map((u) => ({ label: u.name, value: u.id }))}
            option={(selectedUnion) => {
              // setUnionId(selectedUnion);
              updateFilters("union", selectedUnion?.key);
            }}
          />
        </div>

        {/* Age Filter */}
        <div>
          <h1 className="flex items-center gap-1 font-semibold text-sm mb-2 text-black">
            <FaPeopleArrows className="text-secondary text-lg" /> Age
          </h1>
          <CustomSearchOption item={ageRange} option={handleAgeSelection} />
        </div>
      </div>
    </div>
  );
};

export default FilteredUserData;
