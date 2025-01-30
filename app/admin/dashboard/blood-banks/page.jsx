"use client";

import Loader from "@/src/Components/Layouts/Loader";
import ActionModal from "@/src/Components/UI/Admin/Volunteers/ActionModal";
import PendingVolunteersApproved from "@/src/Components/UI/Admin/Volunteers/PendingVolunteersApproved";
import { useGetAllUserMutation } from "@/src/redux/features/auth/userApi";
import FilteredUserData from "@/src/shared/FilteredUserData";
import { Pagination, Table } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import { LuFilter, LuFilterX } from "react-icons/lu";

const BloodBanks = () => {
  const [filterShow, setFilterShow] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const [getAllUsers, { data, isLoading, isError }] = useGetAllUserMutation();

  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleFilteredData = (key, value) => {
    setFilteredData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  console.log(filteredData);

  // ✅ Define a manual refetch function
  const refetch = async () => {
    try {
      const response = await getAllUsers({
        ...filteredData,
        pageNo: page,
        pageSize: size,
      }).unwrap();
      setRowCount(response?.rowCount || 0);
      setTableData(response?.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData, page, size]);

  const tableDataWithKeys = useMemo(
    () =>
      tableData.map((item) => ({
        ...item,
        key: item.id || item.mobileNumber,
      })),
    [tableData]
  );

  const generateFilterValues = (data, columnKey) => {
    if (!data || !data.length || !columnKey) return [];
    const uniqueValues = [...new Set(data.map((d) => d[columnKey]))];
    return uniqueValues.map((value) => ({ text: value, value }));
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = tableData.length
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
            key !== "union" &&
            key !== "unionName" &&
            key !== "motherName" &&
            key !== "bloodDonationCount" &&
            key !== "imageUrl"
        ) // Exclude unnecessary keys
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
                refetch={refetch}
                record={record}
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
      <div className="flex items-center justify-between gap-2 mb-5">
        {" "}
        <h1 className="text-orange-500 text-base">All Users in Blood Bank</h1>
        <button
          className="border p-1 rounded-sm"
          onClick={() => {
            setFilterShow(!filterShow);
          }}
        >
          {!filterShow ? <LuFilter /> : <LuFilterX />}
        </button>
      </div>

      {filterShow && (
        <div className=" border px-5 py-5 rounded-md shadow-md mt-5 mb-10">
          {" "}
          <FilteredUserData
            role={"admin"}
            handleFilteredData={handleFilteredData}
          />
        </div>
      )}

      {isLoading && <Loader />}
      {isError && <div className="text-red-500">Error loading users!</div>}

      <Table
        pagination={false}
        size="small"
        className="text-xs font-normal"
        columns={columns}
        bordered
        dataSource={tableDataWithKeys}
        onChange={handleChange}
      />

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

export default BloodBanks;
