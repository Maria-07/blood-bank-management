import React from "react";
import Campaign from "../Home/Campaigns/Campaign";

const AllCampaigns = () => {
  return (
    <div>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 my-10">
        <Campaign></Campaign>
        <Campaign></Campaign>
        <Campaign></Campaign>
        <Campaign></Campaign>
      </div>
    </div>
  );
};

export default AllCampaigns;
