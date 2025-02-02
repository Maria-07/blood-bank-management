"use client";

import React, { useEffect, useState } from "react";
import { useGetAllCampaignsQuery } from "@/src/redux/features/campaign/campaignApi";
import CampaignCard from "./CampaignCard";
import { Pagination } from "antd";
import Loader from "../../Layouts/Loader";

const AllCampaigns = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [rowCount, setRowCount] = useState(0);
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };
  //! get all Campaigns Data
  const {
    data: Campaigns,
    isLoading,
    isError,
  } = useGetAllCampaignsQuery({ pageNo: page, pageSize: size });

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log("All Data", Campaigns);
      setRowCount(Campaigns?.rowCount);
    } else {
      console.log(Campaigns);
    }
  }, [Campaigns, isLoading, isError]);

  console.log(Campaigns);

  return (
    <div>
      {isLoading && <Loader></Loader>}
      <div className="gap-x-7 gap-y-7 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 my-10 px-1 sm:px-0">
        {Campaigns?.data?.map((c, i) => (
          <CampaignCard campaign={c} key={i}></CampaignCard>
        ))}
      </div>
      <div className="my-10">
        <Pagination
          onChange={(currentPage, pageSize) => {
            setPage(currentPage);
            setSize(pageSize);
          }}
          showSizeChanger
          defaultCurrent={1}
          total={rowCount}
          itemRender={itemRender}
          align="end"
          current={page}
          pageSize={size}
        />
      </div>
    </div>
  );
};

export default AllCampaigns;
