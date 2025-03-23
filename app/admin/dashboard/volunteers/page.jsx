"use client";

import Loader from "@/src/Components/Layouts/Loader";
import ActionModal from "@/src/Components/UI/Admin/Volunteers/ActionModal";
import PendingVolunteersApproved from "@/src/Components/UI/Admin/Volunteers/PendingVolunteersApproved";
import {
  useGetAllApprovedVolunteersQuery,
  useGetAllVolunteersQuery,
} from "@/src/redux/features/volunteers/volunteers";
import { Pagination, Table, Tabs } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const VolunteerList = () => {
  const router = useRouter();
  const [tableData, setTableData] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [allVolunteers, setAllVolunteers] = useState(false);
  const [createCampaign, setCreateCampaign] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  //! Get all volunteers using RTK Query
  const {
    data: approvedData,
    isLoading: isLoading2,
    isError: isError2,
  } = useGetAllApprovedVolunteersQuery({
    pageNo: page,
    pageSize: size,
  });

  useEffect(() => {
    if (!isLoading2 && !isError2 && approvedData) {
      setRowCount(approvedData?.rowCount || 0);
      setTableData2(approvedData?.data || []);
    }
  }, [approvedData, isLoading2, isError2]);

  //! Get all volunteers using RTK Query
  const { data, isLoading, isError, refetch } = useGetAllVolunteersQuery({
    pageNo: page,
    pageSize: size,
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setRowCount(data?.rowCount || 0);
      setTableData(data?.data || []);
    }
  }, [data, isLoading, isError]);

  //! Generate filter values
  const generateFilterValues = (data, columnKey) => {
    const uniqueValues = [...new Set(data.map((d) => d[columnKey]))];
    return uniqueValues.map((value) => ({
      text:
        typeof value === "boolean"
          ? value
            ? "True"
            : "False"
          : value || "N/A",
      value: value?.toString() || "N/A",
    }));
  };

  //! Handle table state changes
  const handleChange = (_, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  //! Toggle modals
  const handleAllVolunteers = () => setAllVolunteers(!allVolunteers);
  const handleCreateCampaign = () => setCreateCampaign(!createCampaign);

  //! Memoized table data
  const tableDataWithKeys = useMemo(
    () =>
      tableData.map((item) => ({ ...item, key: item.id || item.mobileNumber })),
    [tableData]
  );
  const tableDataWithKeys2 = useMemo(
    () =>
      tableData2.map((item) => ({
        ...item,
        key: item.id || item.mobileNumber,
      })),
    [tableData2]
  );

  //! Define columns
  const createColumns = (tableData) => {
    if (!tableData.length) return [];

    return Object.keys(tableData[0])
      .filter(
        (key) =>
          ![
            "id",
            "serial",
            "isSuperAdmin",
            "password",
            "address",
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
            "nid",
            "nidUrls",
            "physicalComplexity",
            "isApproved",
            "motherName",
            "bloodDonationCount",
            "imageUrl",
          ].includes(key)
      )
      .map((key, index) => ({
        title: key
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/^./, (char) => char.toUpperCase()),
        dataIndex: key,
        key,
        filters: generateFilterValues(tableData, key),
        filterSearch: true,
        filteredValue: filteredInfo[key] || null,
        onFilter: (value, record) => {
          const recordValue = record[key];
          return recordValue
            ?.toString()
            ?.toLowerCase()
            ?.includes(value.toLowerCase());
        },
        sorter: (a, b) => {
          const aValue = a[key] || "";
          const bValue = b[key] || "";
          return typeof aValue === "string" && typeof bValue === "string"
            ? aValue.localeCompare(bValue)
            : aValue - bValue;
        },
        sortOrder: sortedInfo.columnKey === key ? sortedInfo.order : null,
        render: (text, record) =>
          key === "isApproved" ? (
            <PendingVolunteersApproved refetch={refetch} record={record} />
          ) : (
            <div key={index}>{text || "N/A"}</div>
          ),
        ellipsis: true,
      }));
  };

  const columns = createColumns(tableData);
  const columns2 = createColumns(tableData2);

  //! Add Details column
  if (columns.length) {
    columns.push({
      title: "Details",
      key: "view",
      render: (_, record) => <ActionModal record={record} />,
    });
  }
  //! Add Details column
  if (columns2.length) {
    columns2.push({
      title: "Details",
      key: "view",
      render: (_, record) => <ActionModal record={record} />,
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2 flex-wrap mb-3 px-1">
        <h1 className="text-primary2 font-semibold text-lg">Volunteers</h1>
      </div>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>Something went wrong</div>
      ) : (
        <>
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
                      columns={columns2}
                      bordered
                      dataSource={tableDataWithKeys2}
                      onChange={handleChange}
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
                      columns={columns}
                      bordered
                      dataSource={tableDataWithKeys}
                      onChange={handleChange}
                    />
                  ),
                },
              ]}
            />
          </div>{" "}
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
        </>
      )}
    </div>
  );
};

export default VolunteerList;
