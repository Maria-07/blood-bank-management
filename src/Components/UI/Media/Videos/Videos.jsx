import React, { useState } from "react";
import VideoCards from "./VideoCards";
import { useGetAllImagesMutation } from "@/src/redux/features/campaign/campaignApi";

const Videos = ({ videos }) => {
  console.log(videos);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 px-2 gap-10 my-10">
        {" "}
      </div>
    </div>
  );
};

export default Videos;
