"use client";
import React, { useEffect, useState } from "react";
import DonarCard from "./DonarCard";
import { MdArrowForwardIos } from "react-icons/md";
import FilteredUserData from "@/src/shared/FilteredUserData";
import {
  useGetAllDonorMutation,
  useGetAllUserMutation,
} from "@/src/redux/features/auth/userApi";
import Link from "next/link";

const DonarCards = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(4);
  const [filteredData, setFilteredData] = useState({});
  const [donors, setDonors] = useState([]);

  const handleFilteredData = (key, value) => {
    setFilteredData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [getAllDonor, { data, isLoading, isError }] = useGetAllDonorMutation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllDonor({
          ...filteredData,
          pageNo: page,
          pageSize: size,
        }).unwrap();
        setDonors(response?.data || []);
      } catch (error) {}
    };

    fetchUsers();
  }, [getAllDonor, filteredData, page, size]);

  return (
    <div className=" md:w-[90%] sm:mx-auto ">
      <div className=" p-5  mb-10 bg-[#F3F3F3] border-[1px] shadow-md px-2 rounded-xl">
        {" "}
        <FilteredUserData
          role={"user"}
          handleFilteredData={handleFilteredData}
        />
      </div>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 mt-20">
        {donors?.slice(0, 5).map((data, i) => (
          <DonarCard record={data} key={i}></DonarCard>
        ))}
      </div>
      <Link href={"/blood-bank"}>
        {" "}
        <div className="flex items-center justify-end gap-1 my-3 text-primary font-semibold hover:text-secondary">
          See More <MdArrowForwardIos className="" />
        </div>
      </Link>
    </div>
  );
};

export default DonarCards;
