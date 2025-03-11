"use client";

import { Campaigns } from "@/src/Components/Data/Data";
import Loader from "@/src/Components/Layouts/Loader";
// import { Campaigns } from "@/src/Components/Data/Data";
import ActionModal from "@/src/Components/UI/Admin/Campaigns/ActionModal";
import MediaUploadAndDeleteModal from "@/src/Components/UI/Admin/Campaigns/MediaUploadAndDeleteModal";
import VolunteerListAction from "@/src/Components/UI/Admin/Campaigns/VolunteerListAction";
import CreateNoticeModal from "@/src/Components/UI/Admin/Notices/CreateNoticeModal";
import NoticeActionModal from "@/src/Components/UI/Admin/Notices/NoticeActionModal";
import { useGetAllCampaignsQuery } from "@/src/redux/features/campaign/campaignApi";
import { useGetAllNoticesQuery } from "@/src/redux/features/notice/notice";
import formatDate from "@/src/shared/ReusedFunctions";
import { Pagination, Switch, Table } from "antd";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { FaPeopleCarryBox, FaPlus, FaRegFilePdf } from "react-icons/fa6";
import { MdPermMedia } from "react-icons/md";

const NoticePage = () => {
  const [tableData, setTableData] = useState([]);
  const [allVolunteers, setAllVolunteers] = useState(false);
  const [createNotice, setCreateNotice] = useState(false);
  const [media, setMedia] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [record, setRecord] = useState({});

  //! Get all Campaigns Data
  const { data, isLoading, isError, refetch } = useGetAllNoticesQuery({
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
  const handleCreateNotice = () => setCreateNotice(!createNotice);
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
            key !== "fileUrls" &&
            key !== "files" &&
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
      title: "Pdf",
      key: "pdf",
      width: 50,
      render: (text, record) => (
        <Link
          href={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${record?.fileUrls[0]}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center justify-center hover:text-secondary">
            <FaRegFilePdf />
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
        <h1 className="text-primary2 font-semibold text-lg">Notices</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCreateNotice}
            className="bbm-button flex items-center gap-2"
          >
            <FaPlus /> Create Notice
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
      {allVolunteers && (
        <VolunteerListAction
          handleClose={handleAllVolunteers}
          clicked={allVolunteers}
        />
      )}
      {createNotice && (
        <CreateNoticeModal
          refetch={refetch}
          handleClose={handleCreateNotice}
          clicked={createNotice}
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

export default NoticePage;
