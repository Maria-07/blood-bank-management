"use client";

import Loader from "@/src/Components/Layouts/Loader";
import CreateNoticeModal from "@/src/Components/UI/Admin/Notices/CreateNoticeModal";
import NoticeActionModal from "@/src/Components/UI/Admin/Notices/NoticeActionModal";
import { useGetAllNewsQuery } from "@/src/redux/features/news/news";
import formatDate from "@/src/shared/ReusedFunctions";
import { Pagination, Table } from "antd";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaRegNewspaper } from "react-icons/fa6";

const NewsPage = () => {
  const [tableData, setTableData] = useState([]);
  const [createNotice, setCreateNotice] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [record, setRecord] = useState({});

  //! Get all Campaigns Data
  const { data, isLoading, isError, refetch } = useGetAllNewsQuery({
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
  const handleCreateNotice = () => setCreateNotice(!createNotice);

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
            key !== "url" &&
            key !== "isDeleted" &&
            key !== "createTime" &&
            key !== "lastModifiedTime" &&
            key !== "lastModifiedBy" &&
            key !== "createdBy"
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
            key === "publishDate" ? (
              <div> {formatDate(record?.publishDate)}</div>
            ) : (
              <div key={index}>{text || "N/A"}</div>
            ),
          ellipsis: true,
        }))
    : [];

  //! Add action column if data exists
  if (tableData.length) {
    columns.push({
      title: "News",
      key: "news",
      width: 50,
      render: (text, record) => (
        <Link href={record?.url}>
          <div className="flex items-center justify-center hover:text-secondary">
            <FaRegNewspaper />
          </div>
        </Link>
      ),
    });
    columns.push({
      title: "Action",
      key: "action",
      width: 50,
      render: (text, record) => (
        <NoticeActionModal
          refetch={refetch}
          record={record}
        ></NoticeActionModal>
      ),
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2 flex-wrap mb-3 px-1">
        <h1 className="text-primary2 font-semibold text-lg">News</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCreateNotice}
            className="bbm-button flex items-center gap-2"
          >
            <FaPlus /> Create News
          </button>
        </div>
      </div>
      <div className="overflow-scroll pb-4">
        {isLoading ? (
          <div>
            <Loader></Loader>
          </div>
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
      {createNotice && (
        <CreateNoticeModal
          refetch={refetch}
          handleClose={handleCreateNotice}
          clicked={createNotice}
        />
      )}
    </div>
  );
};

export default NewsPage;
