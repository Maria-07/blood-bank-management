"use client";
import React from "react";
import Volunteer from "./Volunteer";
import { useGetAllApprovedVolunteersQuery } from "@/src/redux/features/volunteers/volunteers";
import { Card } from "antd";

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
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 mt-20">
        <Card hoverable className="bg-primary text-white">
          <div className="py-24 px-10">
            <h2 className="text-3xl mb-3 font-semibold">Mission</h2>
            <p className="text-lg text-gray-50 ">
              Our mission is to ensure a safe and sufficient blood supply
              through voluntary donations.
            </p>
          </div>
        </Card>

        <Card hoverable className="shadow-md">
          <div className="py-24 px-10">
            <h2 className="text-3xl mb-3 font-semibold text-primary">Vision</h2>
            <p className="text-lg text-accent">
              We envision a world where no life is lost due to a shortage of
              blood.
            </p>
          </div>
        </Card>

        <Card hoverable className="bg-primary text-white">
          <div className="py-24 px-10">
            <h2 className="text-3xl mb-3 font-semibold">Goal</h2>
            <p className="text-lg text-gray-50 ">
              Our goal is to create a seamless and efficient blood donation
              process for everyone.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Volunteers;
