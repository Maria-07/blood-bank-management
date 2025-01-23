"use client";
import Loader from "@/src/Components/Layouts/Loader";
import { useGetAllContactsQuery } from "@/src/redux/features/contacts/contact";
import { Pagination, Table } from "antd";
import React, { useEffect, useState } from "react";

const Contact = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  //! table data
  const [tableData, setTableData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  //! get all Contacts Data
  const { data, isLoading, isError, refetch } = useGetAllContactsQuery({
    pageNo: page,
    pageSize: size,
    contactType: "Complain",
  });
  console.log(data);

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log("All Data", data);
    } else {
      console.log(data);
    }
  }, [data, isLoading, isError]);

  //! Update table data when data is fetched
  useEffect(() => {
    if (!isLoading && !isError && data) {
      setTableData(data?.data);
    }
  }, [data, isLoading, isError]);

  //! Table Pagination change
  const onShowSizeChange = (page, pageSize) => {
    console.log(page, pageSize);
    setPage(page);
    setSize(pageSize);
    refetch();
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

  //! Construct columns only when tableData is available
  const columns = tableData.length
    ? Object.keys(tableData[0])
        .filter(
          (key) =>
            key !== "id" &&
            key !== "createTime" &&
            key !== "lastModifiedTime" &&
            key !== "lastModifiedBy" &&
            key !== "userData"
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
          render: (text, record) => (
            // key === "startDate" || key === "endDate" ? (
            //   <div>{new Date(text).toLocaleDateString()}</div>
            // ) :
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
        // <ActionModal refetch={refetch} record={record}></ActionModal>
        <></>
      ),
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
        <h1 className="text-orange-500 text-base">Contacts</h1>
      </div>
      <div className="overflow-scroll pb-4">
        {isLoading ? (
          <div>
            <Loader></Loader>
          </div>
        ) : isError ? (
          <div>Somthing went wrong </div>
        ) : (
          <>
            <Table
              pagination={false}
              size="small"
              className="text-xs font-normal"
              columns={columns}
              bordered
              dataSource={tableData}
              onChange={handleChange}
            />
            <Pagination
              showSizeChanger
              onChange={onShowSizeChange}
              defaultCurrent={1}
              total={500}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Contact;
