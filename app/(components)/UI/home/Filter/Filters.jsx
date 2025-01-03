"use client";
import {
  bloodGroups,
  unionsOfNilphamari,
  upazilasOfNilphamari,
} from "@/app/(components)/shared/constance";
import CustomSearchOption from "@/app/(components)/shared/CustomSearchOption";
import React, { useState } from "react";
import { MdBloodtype } from "react-icons/md";

const Filters = () => {
  const [bloodType, setBloodType] = useState("");
  const [Upazila, setUpazila] = useState("");
  const [union, setUnion] = useState("");

  const [UpazilaArray, setUpazilaArray] = useState([]);
  const [unionArray, setUnionArray] = useState([]);
  return (
    <div>
      <div className="gap-2 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 px-5 py-5">
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
            <MdBloodtype className="text-secondary text-lg" /> Upazila
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
            <MdBloodtype className="text-secondary text-lg" /> Blood Group
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
      </div>
    </div>
  );
};

export default Filters;
