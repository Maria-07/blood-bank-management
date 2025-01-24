"use client";

import Loader from "@/src/Components/Layouts/Loader";
import ActionModal from "@/src/Components/UI/Admin/Volunteers/ActionModal";
import { useGetAllUserMutation } from "@/src/redux/features/auth/userApi";
import FilteredUserData from "@/src/shared/FilteredUserData";
import { Pagination, Table } from "antd";
import React, { useEffect, useState } from "react";

const BloodBanks = () => {
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(1); // Current page number
  const [size, setSize] = useState(10); // Number of items per page

  //! Mutation hook for getting all users
  const [getAllUsers, { data, isLoading, isError }] = useGetAllUserMutation();

  //! Table data
  const [tableData, setTableData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  //! Fetch data when page or size changes
  const [filteredData, setFilteredData] = useState({});

  //! Update Filters Function
  const handleFilteredData = () => {
    // setFilteredData((prev) => ({
    //   ...prev,
    //   [key]: value, // Update specific filter dynamically
    // }));
  };

  console.log(filteredData);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers({
          ...filteredData, // Include dynamic filters
          pageNo: page,
          pageSize: size,
        }).unwrap(); // Use `.unwrap()` to handle the promise properly
        // console.log("Fetched Data:", response);
        setRowCount(response?.rowCount);
        setTableData(response?.data || []); // Update table data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [getAllUsers, filteredData, page, size]); // Trigger only on `getAllUsers`, `page`, or `size` change

  // console.log(rowCount, parseInt(rowCount / size) + 1);

  //! Table Pagination change
  const onShowSizeChange = (currentPage, pageSize) => {
    // console.log("Page:", currentPage, "PageSize:", pageSize);
    setPage(currentPage); // Update current page

    setSize(pageSize); // Update page size
  };

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

  //! Ensure tableData has a unique `key` for each row
  const tableDataWithKeys = tableData.map((item) => ({
    ...item,
    key: item.id || item.mobileNumber,
  }));

  //! Construct columns only when tableData is available
  const columns = tableData.length
    ? Object.keys(tableData[0])
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
            key !== "isApproved" &&
            key !== "motherName" &&
            key !== "bloodDonationCount" &&
            key !== "imageUrl"
        ) // Exclude unnecessary keys
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
          render: (text, record) => <div key={index}>{text || "N/A"}</div>,
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
        // Add any action buttons or modals here
        <ActionModal record={record} />
      ),
    });
  }

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading users!</div>;

  return (
    <div>
      <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
        <h1 className="text-orange-500 text-base">Blood Banks</h1>
      </div>
      <div>
        <FilteredUserData
          handleFilteredData={handleFilteredData}
          setFilteredData={setFilteredData}
        ></FilteredUserData>
      </div>
      <div className="overflow-scroll pb-4">
        <Table
          pagination={false}
          size="small"
          className="text-xs font-normal"
          columns={columns}
          bordered
          dataSource={tableDataWithKeys}
          onChange={handleChange}
        />
      </div>
      <div className="my-3">
        {" "}
        <Pagination
          showSizeChanger
          onChange={onShowSizeChange}
          current={page}
          total={rowCount} // Assuming total records is tableData.length * pageSize
          pageSize={size}
        />
      </div>
    </div>
  );
};

export default BloodBanks;
