"use client";

import React, { useEffect } from "react";
import Campaign from "../Home/Campaigns/Campaign";
import { useGetAllCampaignsQuery } from "@/src/redux/features/campaign/campaignApi";

const AllCampaigns = () => {
  //! get all Campaigns Data
  const { data: Campaigns, isLoading, isError } = useGetAllCampaignsQuery();

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log("All Data", Campaigns);
    } else {
      console.log(Campaigns);
    }
  }, [Campaigns, isLoading, isError]);

  return (
    <div>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 my-10">
        {Campaigns?.map((c, i) => (
          <Campaign campaign={c} key={i}></Campaign>
        ))}
      </div>
    </div>
  );
};

export default AllCampaigns;
