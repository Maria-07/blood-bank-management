"use client";
import { useGetDashboardDataQuery } from "@/src/redux/features/home";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Count = () => {
  //! get all Dashboard Data
  const { data: CountedData, isLoading, isError } = useGetDashboardDataQuery();

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log("All Data", CountedData);
    } else {
      console.log(CountedData);
    }
  }, [CountedData, isLoading, isError]);

  // const { campaign, donor, registeredDonor, volunteer } = CountedData;

  return (
    <div className="gap-2 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-7">
      <div>
        <h1 className="text-3xl font-extrabold">
          {CountedData?.data?.volunteer}+
        </h1>
        <p className="text-base text-accent my-1">10005 Volunteer</p>
      </div>
      <div>
        <h1 className="text-3xl font-extrabold">
          {CountedData?.data?.registeredDonor}+
        </h1>
        <p className="text-base text-accent my-1">Total donors</p>
      </div>
      <div>
        <h1 className="text-3xl font-extrabold">
          {CountedData?.data?.campaign}+
        </h1>
        <p className="text-base text-accent my-1">Active campaigns</p>
      </div>
      <div>
        <h1 className="text-3xl font-extrabold">
          {CountedData?.data?.campaign}+
        </h1>
        <p className="text-base text-accent my-1">Upcoming campaigns</p>
      </div>
    </div>
  );
};

export default Count;
