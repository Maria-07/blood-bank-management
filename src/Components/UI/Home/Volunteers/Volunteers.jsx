"use client";
import React from "react";
import { useGetAllApprovedVolunteersQuery } from "@/src/redux/features/volunteers/volunteers";
import { Card } from "antd";
import { TiPointOfInterest } from "react-icons/ti";

const Volunteers = () => {
  //! Get all volunteers using RTK Query
  const { data, isLoading, isError } = useGetAllApprovedVolunteersQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      // pollingInterval: 8000,
    }
  );

  return (
    <div className="my-32">
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 mt-20">
        <div className="">
          {" "}
          <Card hoverable className="bg-primary text-white ">
            <div className="py-16 2xl:py-12 px-10">
              <h2 className="text-3xl mb-3 font-semibold">🚀 Mission</h2>
              <div className="text-lg text-gray-50 ">
                To establish an organized, technology-driven blood donation
                network that helps identify everyone&apos;s blood group and
                connect potential donors through a reliable platform.
              </div>
            </div>
          </Card>
        </div>

        <div className="sm:row-span-2 h-[100%]">
          <Card hoverable className="shadow-md">
            <h2 className="text-3xl bg-white text-primary py-6 px-10 font-semibold">🎯 Goals</h2>
          </Card> <Card hoverable className="bg-primary text-white mb-6">

          </Card>
          <Card hoverable className="bg-primary text-white ">
            <div className="py-10 2xl:py-12  px-10">

              <div className="text-lg text-gray-50 ">
                <div className="flex  gap-2 ml-7  mt-2">
                  <TiPointOfInterest className="text-sm mt-2" /> Blood group
                  identification at campaigns.
                </div>
                <div className="flex  gap-2 ml-7  mt-2">
                  <TiPointOfInterest className="text-sm mt-2" /> Provide the right
                  donor at the right time when blood is needed.
                </div>
                <div className="flex  gap-2 ml-7  mt-2">
                  <TiPointOfInterest className="text-sm mt-2" /> Increase
                  awareness of blood donation and grow the number of voluntary
                  donors.
                </div>
                <div className="flex  gap-2 ml-7  mt-2">
                  <TiPointOfInterest className="text-sm mt-2" /> Build an
                  integrated, technology-supported blood donation ecosystem.
                </div>
                <div className="flex  gap-2 ml-7  mt-2">
                  <TiPointOfInterest className="text-sm mt-2" /> Educate and
                  encourage the public about the importance of donating blood.
                </div>
                <div className="flex  gap-2 ml-7  mt-2">
                  <TiPointOfInterest className="text-sm mt-2" /> Recognize regular
                  and active blood donors with appreciation and rewards.
                </div>
              </div>
            </div>
          </Card>
          </div>

                  <div>  <Card hoverable className="shadow-md">
            <div className="py-16 2xl:py-12 px-10">
              <h2 className="text-3xl mb-3 font-semibold text-primary">
                🎭 Vision
              </h2>
              <div className="text-lg text-accent">
                To simplify and accelerate the availability of blood in
                Nilphamari by building a digital system that stores donor
                information and helps locate suitable donors swiftly.
              </div>
            </div>
          </Card></div>

      </div>
    </div>
  );
};

export default Volunteers;
