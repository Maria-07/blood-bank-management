"use client";

import CreateCampaignModal from "@/src/Components/UI/Admin/Campaigns/CreateCampaignModal";
import VolunteerListAction from "@/src/Components/UI/Admin/Campaigns/VolunteerListAction";
import PendingVolunteersApproved from "@/src/Components/UI/Admin/Volunteers/PendingVolunteersApproved";
import { useGetAllApprovedVolunteersQuery } from "@/src/redux/features/volunteers/volunteers";
import { Pagination, Table } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import ActionModal from "./ActionModal";

const ApproveVolunteerTable = () => {
  const router = useRouter();
  const [tableData, setTableData] = useState([]); // Data for table
  const [allVolunteers, setAllVolunteers] = useState(false); // Modal state
  const [createCampaign, setCreateCampaign] = useState(false); // Campaign modal state
  const [filteredInfo, setFilteredInfo] = useState({}); // Filters for table
  const [sortedInfo, setSortedInfo] = useState({}); // Sorting state
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  //! Get all volunteers using RTK Query
  const { data, isLoading, isError, refetch } =
    useGetAllApprovedVolunteersQuery({
      pageNo: page,
      pageSize: size,
    });

  //! Update table data when data is fetched
  useEffect(() => {
    if (!isLoading && !isError && data) {
      console.log("Fetched Volunteers Data:", data);
      setRowCount(data?.rowCount || 0);
      setTableData(data?.data || []); // Adjust based on API response structure
    } else {
      // toast.error("Session expired");
      // router.push("/login");
    }
  }, [data, isLoading, isError, router]);

  console.log("data", data);

  // //! Generate filters dynamically for table
  // const generateFilterValues = (data, columnKey) => {
  //   const uniqueValues = [...new Set(data.map((d) => d[columnKey] || "N/A"))];
  //   return uniqueValues.map((value) => ({ text: value, value }));
  // };

  //! Generate filter values (handles booleans, strings, and other types)
  const generateFilterValues = (data, columnKey) => {
    const uniqueValues = [...new Set(data.map((d) => d[columnKey]))];
    return uniqueValues.map((value) => {
      if (typeof value === "boolean") {
        return { text: value ? "True" : "False", value: value.toString() };
      }
      return { text: value || "N/A", value: value?.toString() || "N/A" };
    });
  };

  //! Handle table state changes
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  //! Clear filters
  const clearFilters = () => setFilteredInfo({});

  //! Toggle modals
  const handleAllVolunteers = () => setAllVolunteers(!allVolunteers);
  const handleCreateCampaign = () => setCreateCampaign(!createCampaign);

  const tableDataWithKeys = useMemo(
    () =>
      tableData.map((item) => ({
        ...item,
        key: item.id || item.mobileNumber,
      })),
    [tableData]
  );

  //! Define columns for the table
  const columns = tableData?.length
    ? Object.keys(tableData[0] || {})
        .filter(
          (key) =>
            key !== "id" &&
            key !== "isSuperAdmin" &&
            key !== "password" &&
            key !== "address" &&
            key !== "userType" &&
            key !== "lastDonationTime" &&
            key !== "profilePicture" &&
            key !== "district" &&
            key !== "districtName" &&
            key !== "fatherName" &&
            key !== "upazila" &&
            key !== "upazilaName" &&
            key !== "nid" &&
            key !== "nidUrls" &&
            key !== "physicalComplexity" &&
            key !== "union" &&
            key !== "unionName" &&
            key !== "motherName" &&
            key !== "bloodDonationCount" &&
            key !== "imageUrl"
        )
        .map((key, index) => ({
          title: key
            .replace(/([a-z])([A-Z])/g, "$1 $2") // Add spaces between camelCase
            .replace(/^./, (char) => char.toUpperCase()), // Capitalize the first letter
          dataIndex: key,
          key,
          filters: generateFilterValues(tableData, key),
          filterSearch: true,
          filteredValue: filteredInfo[key] || null,
          onFilter: (value, record) => {
            const recordValue = record[key];
            if (typeof recordValue === "boolean") {
              console.log(`Filtering boolean for ${key}:`, {
                value,
                recordValue,
              });
              return recordValue === (value === "true");
            }
            console.log(`Filtering non-boolean for ${key}:`, {
              value,
              recordValue,
            });
            return recordValue
              ?.toString()
              ?.toLowerCase()
              ?.includes(value.toLowerCase());
          },
          sorter: (a, b) => {
            const aValue = a[key] || ""; // Default empty string for null
            const bValue = b[key] || "";
            if (typeof aValue === "boolean" && typeof bValue === "boolean") {
              return aValue === bValue ? 0 : aValue ? -1 : 1;
            }
            return typeof aValue === "string" && typeof bValue === "string"
              ? aValue.localeCompare(bValue)
              : aValue - bValue;
          },
          sortOrder: sortedInfo.columnKey === key ? sortedInfo.order : null,
          render: (text, record) =>
            key === "isApproved" ? (
              <PendingVolunteersApproved
                record={record}
                refetch={refetch}
              ></PendingVolunteersApproved>
            ) : (
              <div key={index}>{text || "N/A"}</div>
            ),
          ellipsis: true,
        }))
    : [];

  //! Add Details column
  if (tableData?.length) {
    columns.push({
      title: "Details",
      key: "view",
      render: (_, record) => <ActionModal record={record} />,
    });
  }

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-center justify-between gap-2 flex-wrap mb-3 px-1">
        <h1 className="text-primary2 font-semibold text-lg">
          Approved Volunteers
        </h1>
      </div>

      {/* Table Section */}
      <div className="overflow-scroll pb-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Somthing went wrong </div>
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
        {" "}
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
    </div>
  );
};
export default ApproveVolunteerTable;
