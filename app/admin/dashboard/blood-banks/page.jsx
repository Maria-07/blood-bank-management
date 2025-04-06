/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Table, Tabs, Pagination } from "antd";
import { LuFilter, LuFilterX } from "react-icons/lu";

import Loader from "@/src/Components/Layouts/Loader";
import ActionModal from "@/src/Components/UI/Admin/Volunteers/ActionModal";
import UserDeleteModal from "@/src/Components/UI/User/UserDeleteModal";
import FilteredUserData from "@/src/shared/FilteredUserData";

import {
  useGetAllApprovedDonorMutation,
  useGetAllPendingDonorMutation,
} from "@/src/redux/features/auth/userApi";

const BloodBanks = () => {
  const [filterShow, setFilterShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState(null);
  const [filteredData, setFilteredData] = useState({});

  const [pagination, setPagination] = useState({ page: 1, size: 10 });

  const [tableData, setTableData] = useState([]);
  const [tableDataPending, setTableDataPending] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleFilteredData = (key, value) => {
    setFilteredData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [getAllApprovedDonors, { isLoading, isError }] =
    useGetAllApprovedDonorMutation();
  const [getAllPendingDonors, { isLoadingPending, isErrorPending }] =
    useGetAllPendingDonorMutation();

  const tableDataWithKeys = (data) =>
    data?.map((item, index) => ({ ...item, key: item?.id || index }));

  const fetchData = useCallback(
    async (fetchFunction, setData) => {
      try {
        const response = await fetchFunction({
          ...filteredData,
          pageNo: pagination.page,
          pageSize: pagination.size,
        }).unwrap();

        setRowCount(response?.rowCount || 0);
        setData(tableDataWithKeys(response?.data || []));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [pagination, filteredData]
  );

  useEffect(() => {
    fetchData(getAllApprovedDonors, setTableData);
    fetchData(getAllPendingDonors, setTableDataPending);
  }, [fetchData]);

  const handleTableChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const generateColumns = (data) =>
    data.length
      ? Object.keys(data[0])
          .filter(
            (key) =>
              ![
                "id",
                "serial",
                "code",
                "isSuperAdmin",
                "password",
                "address",
                "isApproved",
                "userType",
                "lastDonationTime",
                "profilePicture",
                "district",
                "districtName",
                "fatherName",
                "upazila",
                "upazilaName",
                "union",
                "unionName",
                "motherName",
                "physicalComplexity",
                "nid",
                "nidUrls",
                "key",
                "bloodDonationCount",
                "imageUrl",
              ].includes(key)
          )
          .map((key) => ({
            title: key
              .replace(/([a-z])([A-Z])/g, "$1 $2")
              .replace(/^./, (c) => c.toUpperCase()),
            dataIndex: key,
            key,
            filters: [...new Set(data.map((item) => item[key]))].map(
              (value) => ({
                text: value,
                value,
              })
            ),
            filterSearch: true,
            filteredValue: filteredInfo[key] || null,
            onFilter: (value, record) =>
              record[key]
                ?.toString()
                ?.toLowerCase()
                ?.includes(value.toLowerCase()),
            sorter: (a, b) => {
              const aValue = a[key] || "";
              const bValue = b[key] || "";
              return typeof aValue === "string" && typeof bValue === "string"
                ? aValue.localeCompare(bValue)
                : aValue - bValue;
            },
            sortOrder: sortedInfo.columnKey === key ? sortedInfo.order : null,
            render: (text, record) =>
              key === "fullName" ? (
                <h1 className="text-primary2">{record.fullName}</h1>
              ) : (
                text || "N/A"
              ),
            ellipsis: true,
          }))
      : [];

  const approvedColumns = useMemo(
    () => [
      ...generateColumns(tableData),
      {
        title: "Action",
        key: "view",
        render: (_, record) => <ActionModal record={record} />,
      },
    ],
    [tableData, sortedInfo, filteredInfo]
  );

  const pendingColumns = useMemo(
    () => [
      ...generateColumns(tableDataPending),
      {
        title: "Action",
        key: "view",
        render: (_, record) => <ActionModal record={record} />,
      },
    ],
    [tableDataPending, sortedInfo, filteredInfo]
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <h1 className="text-primary font-semibold text-lg">User Management</h1>
        <button
          className="border p-1 rounded-sm"
          onClick={() => setFilterShow(!filterShow)}
        >
          {!filterShow ? <LuFilter /> : <LuFilterX />}
        </button>
      </div>

      {filterShow && (
        <div className="border px-5 py-5 rounded-md shadow-md mt-5 mb-10">
          <FilteredUserData
            role="admin"
            handleFilteredData={handleFilteredData}
          />
        </div>
      )}

      {isLoading ? (
        <div>
          <Loader></Loader>
        </div>
      ) : isError ? (
        <div>Something went wrong </div>
      ) : (
        <div>
          {" "}
          <div className="my-5">
            <Tabs
              type="card"
              items={[
                {
                  label: "Approved",
                  key: 1,
                  children: (
                    <Table
                      pagination={false}
                      size="small"
                      className="text-xs font-normal"
                      columns={approvedColumns}
                      bordered
                      dataSource={tableData}
                      onChange={handleTableChange}
                    />
                  ),
                },
                {
                  label: "Pending",
                  key: 2,
                  children: (
                    <Table
                      pagination={false}
                      size="small"
                      className="text-xs font-normal"
                      columns={pendingColumns}
                      bordered
                      dataSource={tableDataPending}
                      onChange={handleTableChange}
                    />
                  ),
                },
              ]}
            />
          </div>
          <div className="my-5">
            <Pagination
              showSizeChanger
              onChange={(page, size) => setPagination({ page, size })}
              current={pagination.page}
              total={rowCount}
              pageSize={pagination.size}
              align="end"
            />
          </div>
        </div>
      )}

      {deleteModal && (
        <UserDeleteModal
          record={id}
          refetch={() => fetchData(getAllApprovedDonors, setTableData)}
          clicked={deleteModal}
          handleClose={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default BloodBanks;
