"use client";
import { useGetDashboardDataQuery } from "@/src/redux/features/home";
import React from "react";

const Count = ({ t }) => {
  const { data: CountedData, isLoading, isError } = useGetDashboardDataQuery();

  return (
    <div className="gap-2 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-7">
      <div>
        <h1 className="text-3xl font-extrabold">
          {CountedData?.data?.volunteer ?? 0}
        </h1>
        <p className="text-base text-accent my-1">{t("count.volunteer")}</p>
      </div>
      <div>
        <h1 className="text-3xl font-extrabold">
          {CountedData?.data?.registeredDonor ?? 0}
        </h1>
        <p className="text-base text-accent my-1">{t("count.donor")}</p>
      </div>
      <div>
        <h1 className="text-3xl font-extrabold">
          {CountedData?.data?.campaign ?? 0}
        </h1>
        <p className="text-base text-accent my-1">{t("count.campaign")}</p>
      </div>
    </div>
  );
};

export default Count;
