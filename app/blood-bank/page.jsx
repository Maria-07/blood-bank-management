"use client";
import Image from "next/image";
import React, { useState } from "react";
import bloodBank from "@/src/assets/Image/bloodBank.png";
import {
  bloodGroups,
  unionsOfNilphamari,
  upazilasOfNilphamari,
} from "@/src/shared/constance";
import CustomSearchOption from "@/src/shared/CustomSearchOption";
import { MdBloodtype } from "react-icons/md";
import { LuMapPinned } from "react-icons/lu";
import { TiPin } from "react-icons/ti";
import { FaPeopleArrows } from "react-icons/fa6";
import { Pagination } from "antd";
import DonarCards from "@/src/Components/UI/Home/DonarCards/DonarCards";
import DonarsCard from "@/src/Components/UI/BloodBank/Donars/DonarsCard";

const BloodBankPage = () => {
  const [bloodType, setBloodType] = useState("");
  const [Upazila, setUpazila] = useState("");
  const [union, setUnion] = useState("");

  const [UpazilaArray, setUpazilaArray] = useState([]);
  const [unionArray, setUnionArray] = useState([]);

  return (
    <div>
      <div className="md:w-[90%] sm:mx-auto ">
        <div className="pt-8 bg-[#F2F2F2] rounded-xl shadow-md py-2  px-5 ">
          <div className="md:w-[100%] sm:mx-auto grid sm:grid-cols-2 grid-cols-1 gap-3 items-center justify-between">
            <div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className=""
            >
              <h1 className="font-bold lg:text-7xl text-4xl font-primary">
                Blood Bank
              </h1>
              <hr className="p-[2px] bg-primary w-[22%]" />
              <p className="text-sm text-accent lg:w-[55%] my-3">
                Search for blood donors in your area quickly and conveniently.
                Filter results by blood group.
              </p>
            </div>

            <div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Image
                src={bloodBank}
                width={500}
                height={600}
                alt="Picture of the author"
              ></Image>
            </div>
          </div>
        </div>

        <div className="my-10">
          <div className="gap-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4  py-5 ">
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

        <div>
          <div>
            <DonarsCard></DonarsCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodBankPage;
