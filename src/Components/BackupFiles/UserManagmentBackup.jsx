"use client";

import Loader from "@/src/Components/Layouts/Loader";
import ActionModal from "@/src/Components/UI/Admin/Volunteers/ActionModal";
import PendingVolunteersApproved from "@/src/Components/UI/Admin/Volunteers/PendingVolunteersApproved";
import UserDeleteModal from "@/src/Components/UI/User/UserDeleteModal";
import {
  useGetAllApprovedDonorMutation,
  useGetAllPendingDonorMutation,
  useGetAllUserMutation,
} from "@/src/redux/features/auth/userApi";
import FilteredUserData from "@/src/shared/FilteredUserData";
import { Pagination, Table, Tabs } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";

const BloodBanks = () => {
  const [filterShow, setFilterShow] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState();

  const handleDeleteModal = (record) => {
    setDeleteModal(!deleteModal);
    setId(record);
  };

  const [getAllApprovedDonors, { data, isLoading, isError }] =
    useGetAllApprovedDonorMutation();
  const [
    getAllPendingDonors,
    { PendingData, isLoadingPending, isErrorPending },
  ] = useGetAllPendingDonorMutation();

  const [tableData, setTableData] = useState([]);
  const [tableDataPending, setTableDataPending] = useState([]);
  const [filteredData, setFilteredData] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleFilteredData = (key, value) => {
    setFilteredData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ Define a manual refetch function
  const refetch = async () => {
    try {
      const response = await getAllApprovedDonors({
        ...filteredData,
        pageNo: page,
        pageSize: size,
      }).unwrap();
      setRowCount(response?.rowCount || 0);
      setTableData(response?.data || []);
    } catch (error) {}
  };

  const refetchPending = async () => {
    try {
      const responsePending = await getAllPendingDonors({
        ...filteredData,
        pageNo: page,
        pageSize: size,
      }).unwrap();
      setRowCount(responsePending?.rowCount || 0);
      setTableDataPending(responsePending?.data || []);
    } catch (error) {}
  };

  useEffect(() => {
    refetch();
    refetchPending();
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
  const tableDataWithKeysPending = useMemo(
    () =>
      tableDataPending.map((item) => ({
        ...item,
        key: item.id || item.mobileNumber,
      })),

    [tableDataPending]
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
            key !== "serial" &&
            key !== "code" &&
            key !== "isSuperAdmin" &&
            key !== "password" &&
            key !== "address" &&
            key !== "isApproved" &&
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
            key !== "physicalComplexity" &&
            key !== "nid" &&
            key !== "nidUrls" &&
            key !== "bloodDonationCount" &&
            key !== "imageUrl"
        ) // Exclude unnecessary keys
        .map((key, index) => ({
          title: key // Rename column title
            .replace(/([a-z])([A-Z])/g, "$1 $2") // Add spaces between camelCase
            .replace(/^./, (char) => char.toUpperCase()), // Capitalize first letter
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
            key === "fullName" ? (
              <>
                <h1 className="text-primary2">{record?.fullName}</h1>
              </>
            ) : (
              <div key={index}>{text || "N/A"}</div>
            ),
          ellipsis: true,
        }))
    : [];
  const pendingColumns = tableDataPending.length
    ? Object.keys(tableDataPending[0] || {})
        .filter(
          (key) =>
            key !== "id" &&
            key !== "serial" &&
            key !== "code" &&
            key !== "isSuperAdmin" &&
            key !== "password" &&
            key !== "address" &&
            key !== "isApproved" &&
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
            key !== "physicalComplexity" &&
            key !== "nid" &&
            key !== "nidUrls" &&
            key !== "bloodDonationCount" &&
            key !== "imageUrl"
        ) // Exclude unnecessary keys
        .map((key, index) => ({
          title: key // Rename column title
            .replace(/([a-z])([A-Z])/g, "$1 $2") // Add spaces between camelCase
            .replace(/^./, (char) => char.toUpperCase()), // Capitalize first letter
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
            key === "fullName" ? (
              <>
                <h1 className="text-primary2">{record?.fullName}</h1>
              </>
            ) : (
              <div key={index}>{text || "N/A"}</div>
            ),
          ellipsis: true,
        }))
    : [];

  //! Add Details column
  if (tableData?.length) {
    columns.push({
      title: "Actions",
      key: "view",
      render: (_, record) => <ActionModal record={record} />,
    });
  }
  //! Add Details column
  if (tableDataPending?.length) {
    pendingColumns.push({
      title: "Actions",
      key: "view",
      render: (_, record) => <ActionModal record={record} />,
    });
  }

  //! tabs details
  const tabItems = [
    {
      label: (
        <h1 className="text-dark text-base hover:text-primary">Approved</h1>
      ),
      key: 1,
      children: (
        <>
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
        </>
      ),
    },
    {
      label: (
        <h1 className="text-dark text-base hover:text-primary">Pending</h1>
      ),
      key: 2,
      children: (
        <>
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
                columns={pendingColumns}
                bordered
                dataSource={tableDataWithKeysPending}
                onChange={handleChange}
              />
            )}
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-2">
        {" "}
        <h1 className="text-primary font-semibold text-lg">User Management</h1>
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

      {/* {isLoading && <Loader />}
      {isError && <div className="text-red-500">Error loading users!</div>} */}

      <div className="my-5">
        <Tabs type="card" items={tabItems} />
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

      {deleteModal && (
        <UserDeleteModal
          record={id}
          refetch={refetch}
          clicked={deleteModal}
          handleClose={handleDeleteModal}
        />
      )}
    </div>
  );
};

export default BloodBanks;
