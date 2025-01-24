import React, { useEffect, useState } from "react";
import { MdBloodtype } from "react-icons/md";
import { LuMapPinned } from "react-icons/lu";
import { TiPin } from "react-icons/ti";
import { FaPeopleArrows } from "react-icons/fa6";
import CustomSearchOption from "@/src/shared/CustomSearchOption";
import { ageRange, bloodGroups } from "@/src/shared/constance";

const FilteredUserData = ({ setFilteredData, handleFilteredData }) => {
  const [bloodType, setBloodType] = useState("");
  const [upazilaId, setUpazilaId] = useState();
  const [unionId, setUnionId] = useState(null);
  const [age, setAge] = useState({ startAge: null, endAge: null });

  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);

  console.log("Selected Blood Type:", bloodType.label);
  console.log("Selected Age Range:", age?.startAge, age?.endAge);
  console.log("Selected Upazila ID:", upazilaId?.key);
  console.log("Selected Union ID:", unionId?.key);

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

  //! Fetch Upazilas on component mount
  useEffect(() => {
    fetchData(1, "upazila");
  }, []);

  //! Fetch Unions when an Upazila is selected
  useEffect(() => {
    if (upazilaId?.key) {
      fetchData(upazilaId?.key, "union");
    }
  }, [upazilaId]);

  //! Handle Age Selection
  const handleAgeSelection = (selectedAgeRange) => {
    setAge({
      startAge: selectedAgeRange.startAge,
      endAge: selectedAgeRange.endAge,
    });
  };

  // handleFilteredData();

  return (
    <div className="my-10">
      <div className="gap-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 py-5">
        {/* Blood Group Filter */}
        <div>
          <h1 className="flex items-center gap-1 font-semibold text-base mb-2 text-black">
            <MdBloodtype className="text-secondary text-lg" /> Blood Group
          </h1>
          <CustomSearchOption
            item={bloodGroups}
            option={(selectedBloodType) => setBloodType(selectedBloodType)}
          />
        </div>

        {/* Upazila Filter */}
        <div>
          <h1 className="flex items-center gap-1 font-semibold text-base mb-2 text-black">
            <LuMapPinned className="text-secondary text-lg" /> Upazila
          </h1>
          <CustomSearchOption
            item={upazilas.map((u) => ({ label: u.name, value: u.id }))}
            option={setUpazilaId}
          />
        </div>

        {/* Union Filter */}
        <div>
          <h1 className="flex items-center gap-1 font-semibold text-base mb-2 text-black">
            <TiPin className="text-secondary text-lg" /> Union
          </h1>
          <CustomSearchOption
            item={unions.map((u) => ({ label: u.name, value: u.id }))}
            option={setUnionId}
          />
        </div>

        {/* Age Filter */}
        <div>
          <h1 className="flex items-center gap-1 font-semibold text-base mb-2 text-black">
            <FaPeopleArrows className="text-secondary text-lg" /> Age
          </h1>
          <CustomSearchOption item={ageRange} option={handleAgeSelection} />
        </div>
      </div>
      <button
        onClick={() => {
          setFilteredData({
            bloodGroup: bloodType.label,
            upazila: upazilaId?.key,
            union: unionId?.key,
            // bloodDonationStatus: "string",
            startAge: age?.startAge,
            endAge: age?.endAge,
          });
        }}
      >
        Filter
      </button>
    </div>
  );
};

export default FilteredUserData;
