"use client";

import { Campaigns } from "@/src/Components/Data/Data";
import ActionModal from "@/src/Components/UI/Admin/Campaigns/ActionModal";
import CreateCampaignModal from "@/src/Components/UI/Admin/Campaigns/CreateCampaignModal";
import VolunteerListAction from "@/src/Components/UI/Admin/Campaigns/VolunteerListAction";
import { Switch, Table } from "antd";
import React, { useState } from "react";
import { FaPeopleCarryBox, FaPlus } from "react-icons/fa6";
import { MdOutlineVolunteerActivism } from "react-icons/md";

const CampaignList = () => {
  const [AllVolunteers, setAllVolunteers] = useState(false);
  const handleAllVolunteers = () => {
    setAllVolunteers(!AllVolunteers);
  };

  const [CreateCampaign, setCreateCampaign] = useState(false);
  const handleCreateCampaign = () => {
    setCreateCampaign(!CreateCampaign);
  };

  //! Optimized function to get dynamic filter value-text
  const generateFilterValues = (data, columnKey) => {
    const uniqueValues = [...new Set(data?.map((d) => d[columnKey]))];
    return uniqueValues.map((value) => ({ text: value, value }));
  };

  //!   table's state
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
      setRecordSelected(selectedRowKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      // console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log(selected, selectedRows, changeRows);
    },
  };

  const columns = Object.keys(Campaigns[0])
    .filter((key) => key !== "id" && key !== "BannerUrl" && key !== "Banner") // Exclude 'id'
    .map((key, index) => ({
      title: key.replace(/([a-z])([A-Z])/g, "$1 $2"),
      // Capitalize title
      // Replace underscores with spaces
      dataIndex: key,
      key: key,
      width: index === 0 ? 110 : 100, // Adjust width for the action column
      filters: generateFilterValues(Campaigns, key),
      filterSearch: true,
      filteredValue: filteredInfo[key] || null,
      onFilter: (value, record) => {
        if (record[key] !== null && typeof record[key] !== "object") {
          return record[key].toString().includes(value);
        }
        return false;
      },
      sorter: (a, b) => {
        if (typeof a[key] === "string" && typeof b[key] === "string") {
          return a[key].localeCompare(b[key]);
        }
        return 0;
      },
      sortOrder: sortedInfo.columnKey === key ? sortedInfo.order : null,
      render: (text, record) => {
        if (key === "VolunteerList") {
          return (
            <>
              <FaPeopleCarryBox
                className="mx-auto hover:text-primary"
                onClick={() => handleAllVolunteers()}
              />
            </>
          );
        } else {
          return (
            <div key={index}>
              <h1>{text}</h1>
            </div>
          );
        }
      },
      ellipsis: true,
    }));

  // Add action column
  columns.push({
    title: "Action",
    key: "action",
    width: 100,
    render: (text, record) => (
      <div>
        <ActionModal record={record}></ActionModal>
      </div>
    ),
  });
  return (
    <div>
      <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
        <h1 className=" text-orange-500 text-base ">Campaigns</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCreateCampaign()}
            className=" bbm-button flex items-center gap-2"
          >
            <FaPlus /> Create Campaign
          </button>
        </div>
      </div>
      <div>
        <div>
          <div className=" overflow-scroll pb-4 ">
            <Table
              pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
              size="small"
              className=" text-xs font-normal"
              columns={columns}
              bordered
              dataSource={Campaigns}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      {AllVolunteers && (
        <VolunteerListAction
          handleClose={handleAllVolunteers}
          clicked={AllVolunteers}
        ></VolunteerListAction>
      )}
      {CreateCampaign && (
        <CreateCampaignModal
          handleClose={handleCreateCampaign}
          clicked={CreateCampaign}
        ></CreateCampaignModal>
      )}
    </div>
  );
};

export default CampaignList;
