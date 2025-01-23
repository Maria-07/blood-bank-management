"use client";
import React from "react";
import Volunteer from "./Volunteer";
import { useGetAllApprovedVolunteersQuery } from "@/src/redux/features/volunteers/volunteers";

const Volunteers = () => {
  //! Get all volunteers using RTK Query
  const { data, isLoading, isError } = useGetAllApprovedVolunteersQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      // pollingInterval: 8000,
    }
  );
  console.log(data);

  return (
    <div className="my-32">
      <h1 className=" text-6xl font-semibold  text-center my-10">
        Our dedicated volunteers
      </h1>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 mt-20">
        {data?.data?.map((v, i) => (
          <Volunteer key={i} record={v}></Volunteer>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <div className="my-10">
          <button className="bb-input-button">See More</button>
        </div>
      </div>
    </div>
  );
};

export default Volunteers;
