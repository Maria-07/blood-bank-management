"use client";

import { Campaigns } from "@/src/Components/Data/Data";
// import { Campaigns } from "@/src/Components/Data/Data";
import ActionModal from "@/src/Components/UI/Admin/Campaigns/ActionModal";
import CreateCampaignModal from "@/src/Components/UI/Admin/Campaigns/CreateCampaignModal";
import VolunteerListAction from "@/src/Components/UI/Admin/Campaigns/VolunteerListAction";
import { useGetAllCampaignsQuery } from "@/src/redux/features/campaign/campaignApi";
import { Switch, Table } from "antd";
import React, { useEffect, useState } from "react";
import { FaPeopleCarryBox, FaPlus } from "react-icons/fa6";

const CampaignList = () => {
  const [tableData, setTableData] = useState([]);
  const [allVolunteers, setAllVolunteers] = useState(false);
  const [createCampaign, setCreateCampaign] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  //! Get all Campaigns Data
  const { data, isLoading, isError, refetch } =
    useGetAllCampaignsQuery(undefined);

  //! Update table data when data is fetched
  useEffect(() => {
    if (!isLoading && !isError && data) {
      setTableData(data);
    }
  }, [data, isLoading, isError]);

  //! Dynamic filter generation
  const generateFilterValues = (data, columnKey) => {
    const uniqueValues = [...new Set(data?.map((d) => d[columnKey]))];
    return uniqueValues.map((value) => ({ text: value, value }));
  };

  //! Handle table state changes
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  //! Clear filters
  const clearFilters = () => setFilteredInfo({});

  //! Handle modals
  const handleAllVolunteers = () => setAllVolunteers(!allVolunteers);
  const handleCreateCampaign = () => setCreateCampaign(!createCampaign);

  //! Construct columns only when tableData is available
  const columns = tableData.length
    ? Object.keys(tableData[0])
        .filter(
          (key) =>
            key !== "id" &&
            key !== "bannerUrl" &&
            key !== "Banner" &&
            key !== "createTime" &&
            key !== "lastModifiedTime" &&
            key !== "lastModifiedBy" &&
            key !== "createdBy" &&
            key !== "volunteerList" &&
            key !== "banner" &&
            key !== "isDeleted"
        )
        .map((key, index) => ({
          title: key
            .replace(/([a-z])([A-Z])/g, "$1 $2") // Add spaces between camelCase
            .replace(/([A-Z])([A-Z])/, "$1 $2") // Handle uppercase sequences
            .replace(/^./, (char) => char.toUpperCase()), // Capitalize the first letter

          dataIndex: key,
          key,
          width: index === 3 ? 130 : 100,
          filters: generateFilterValues(tableData, key),
          filterSearch: true,
          filteredValue: filteredInfo[key] || null,
          onFilter: (value, record) =>
            record[key]?.toString().toLowerCase().includes(value.toLowerCase()),
          sorter: (a, b) => {
            const aValue = a[key];
            const bValue = b[key];
            return typeof aValue === "string" && typeof bValue === "string"
              ? aValue.localeCompare(bValue)
              : aValue - bValue;
          },
          sortOrder: sortedInfo.columnKey === key ? sortedInfo.order : null,
          render: (text, record) =>
            key === "startDate" || key === "endDate" ? (
              <div>{new Date(text).toLocaleDateString()}</div>
            ) : (
              <div key={index}>{text || "N/A"}</div>
            ),
          ellipsis: true,
        }))
    : [];

  //! Add action column if data exists
  if (tableData.length) {
    columns.push({
      title: "Action",
      key: "action",
      width: 50,
      render: (text, record) => (
        <ActionModal refetch={refetch} record={record}></ActionModal>
      ),
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
        <h1 className="text-orange-500 text-base">Campaigns</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCreateCampaign}
            className="bbm-button flex items-center gap-2"
          >
            <FaPlus /> Create Campaign
          </button>
        </div>
      </div>
      <div className="overflow-scroll pb-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error loading campaigns</div>
        ) : (
          <Table
            pagination={false}
            size="small"
            className="text-xs font-normal"
            columns={columns}
            bordered
            dataSource={tableData}
            onChange={handleChange}
          />
        )}
      </div>
      {allVolunteers && (
        <VolunteerListAction
          handleClose={handleAllVolunteers}
          clicked={allVolunteers}
        />
      )}
      {createCampaign && (
        <CreateCampaignModal
          refetch={refetch}
          handleClose={handleCreateCampaign}
          clicked={createCampaign}
        />
      )}
    </div>
  );
};

export default CampaignList;
