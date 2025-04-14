"use client";

import Loader from "@/src/Components/Layouts/Loader";
import MediaUploadAndDeleteModal from "@/src/Components/UI/Admin/Campaigns/MediaUploadAndDeleteModal";
import VolunteerListAction from "@/src/Components/UI/Admin/Campaigns/VolunteerListAction";
import MyCampaignAction from "@/src/Components/UI/Admin/MyCampaign/MyCampaignAction";
import { useGetAllVolunteerPermittedCampaignsQuery } from "@/src/redux/features/campaign/campaignApi";
import { Pagination, Table } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { MdPermMedia } from "react-icons/md";

const OwnCampaign = () => {
  const [tableData, setTableData] = useState([]);
  const [allVolunteers, setAllVolunteers] = useState(false);
  const [createCampaign, setCreateCampaign] = useState(false);
  const [media, setMedia] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [record, setRecord] = useState({});

  //! Get all Campaigns Data
  const { data, isLoading, isError, refetch } =
    useGetAllVolunteerPermittedCampaignsQuery({
      pageNo: page,
      pageSize: size,
    });

  //! Update table data when data is fetched
  useEffect(() => {
    if (!isLoading && !isError && data) {
      setRowCount(data?.rowCount || 0);
      setTableData(data?.data);
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
  const handleMedia = () => setMedia(!media);

  const tableDataWithKeys = useMemo(
    () =>
      tableData.map((item) => ({
        ...item,
        key: item.id || item.mobileNumber,
      })),
    [tableData]
  );

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
      title: "Media",
      key: "media",
      width: 50,
      render: (text, record) => (
        <div
          onClick={() => {
            setRecord(record);
            handleMedia();
          }}
          className="flex items-center justify-center hover:text-secondary"
        >
          <MdPermMedia />
        </div>
      ),
    });
  }

  columns.push({
    title: "Action",
    key: "action",
    width: 50,
    render: (text, record) => (
      <MyCampaignAction refetch={refetch} record={record}></MyCampaignAction>
    ),
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-2 flex-wrap mb-3 px-1">
        <h1 className="text-primary2 font-semibold text-lg">Campaigns</h1>
      </div>

      <div className="overflow-scroll pb-4">
        {isLoading ? (
          <div>
            <Loader></Loader>
          </div>
        ) : isError ? (
          <div>Something went wrong </div>
        ) : (
          <Table
            pagination={false}
            size="small"
            className="text-xs font-normal"
            columns={columns}
            bordered
            dataSource={tableDataWithKeys}
            onChange={handleChange}
          />
        )}
      </div>
      <div className="my-5">
        <Pagination
          showSizeChanger
          onChange={(currentPage, pageSize) => {
            setPage(currentPage);
            setSize(pageSize);
          }}
          align="end"
          current={page}
          total={rowCount}
          pageSize={size}
        />
      </div>
      {allVolunteers && (
        <VolunteerListAction
          handleClose={handleAllVolunteers}
          clicked={allVolunteers}
        />
      )}

      {media && (
        <MediaUploadAndDeleteModal
          refetch={refetch}
          handleClose={handleMedia}
          clicked={media}
          record={record}
        />
      )}
    </div>
  );
};

export default OwnCampaign;
