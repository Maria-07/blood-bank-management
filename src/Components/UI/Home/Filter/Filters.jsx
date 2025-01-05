"use client";
import {
  bloodGroups,
  unionsOfNilphamari,
  upazilasOfNilphamari,
} from "@/src/Components/shared/constance";
import CustomSearchOption from "@/src/Components/shared/CustomSearchOption";
import React, { useState } from "react";
import { MdBloodtype } from "react-icons/md";
import { LuMapPinned } from "react-icons/lu";
import { TiPin } from "react-icons/ti";
import { FaPeopleArrows } from "react-icons/fa6";

const Filters = () => {
  const [bloodType, setBloodType] = useState("");
  const [Upazila, setUpazila] = useState("");
  const [union, setUnion] = useState("");

  const [UpazilaArray, setUpazilaArray] = useState([]);
  const [unionArray, setUnionArray] = useState([]);
  return (
    <div>
      <div className="gap-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 px-5 py-5">
        <div className="">
          <h1 className="flex items-center gap-1 font-semibold text-base mb-2 text-black">
            <MdBloodtype className="text-secondary text-lg" /> Blood Group
          </h1>
          <div>
            {" "}
            <CustomSearchOption
              item={bloodGroups}
              option={setBloodType}
            ></CustomSearchOption>
          </div>
        </div>
        <div className="">
          <h1 className="flex items-center gap-1 font-semibold text-base mb-2 text-black">
            <LuMapPinned className="text-secondary text-lg" /> Upazila
          </h1>
          <div>
            {" "}
            <CustomSearchOption
              item={upazilasOfNilphamari}
              option={setUpazila}
            ></CustomSearchOption>
          </div>
        </div>
        <div className="">
          <h1 className="flex items-center gap-1 font-semibold text-base mb-2 text-black">
            <TiPin className="text-secondary text-lg" /> Union
          </h1>
          <div>
            {" "}
            <CustomSearchOption
              item={unionsOfNilphamari}
              option={setUnion}
            ></CustomSearchOption>
          </div>
        </div>
        <div className="">
          <h1 className="flex items-center gap-1 font-semibold text-base mb-2 text-black">
            <FaPeopleArrows className="text-secondary text-lg" /> Age
          </h1>
          <div>
            {" "}
            <CustomSearchOption
              item={bloodGroups}
              option={setBloodType}
            ></CustomSearchOption>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
