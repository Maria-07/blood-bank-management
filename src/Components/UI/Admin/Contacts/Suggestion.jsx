"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Pagination, Table } from "antd";
import { CiRead, CiUnread } from "react-icons/ci";
import {
  MdOutlineMarkEmailRead,
  MdOutlineMarkEmailUnread,
} from "react-icons/md";
import Loader from "@/src/Components/Layouts/Loader";
import ActionModal from "../Volunteers/ActionModal";
import MessageModal from "./MessageModal";
import {
  useGetAllContactsQuery,
  useGetMessageReadMutation,
} from "@/src/redux/features/contacts/contact";
import ContactActionModal from "./ContactActionModal";

const Suggestion = () => {
  const [userData, setUserData] = useState(null);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  //! Fetch contacts
  const { data, isLoading, isError, refetch } = useGetAllContactsQuery({
    pageNo: page,
    pageSize: size,
    contactType: "Suggestion",
  });

  //! Handle message read mutation
  const [readMessage, { isLoading: isReadingMessage }] =
    useGetMessageReadMutation();

  //! Update table data when fetching completes
  useEffect(() => {
    if (data?.data) setTableData(data.data);
  }, [data]);

  //! Handle message read

  const handleReadMessageModal = () => {
    setMessageModalVisible(!messageModalVisible);
  };

  const handleReadMessage = async (id, record) => {
    // debugger;
    try {
      await readMessage({ id: id }).unwrap();
      refetch(); // Refresh the table after marking as read
    } catch (error) {}
  };

  //! Handle table filter and sort changes
  const handleTableChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  //! Clear all filters
  const clearFilters = () => setFilteredInfo({});

  //! Generate filter values
  const generateFilterValues = (data, key) => {
    const uniqueValues = [...new Set(data.map((item) => item[key]))];
    return uniqueValues.map((value) => ({
      text:
        value === true ? "True" : value === false ? "False" : value || "N/A",
      value: value?.toString() || "N/A",
    }));
  };

  const tableDataWithKeys = useMemo(
    () =>
      tableData.map((item) => ({
        ...item,
        key: item.id || item.mobileNumber,
      })),
    [tableData]
  );

  const columns = tableData.length
    ? Object.keys(tableData[0])
        .filter(
          (key) =>
            ![
              "id",
              "isRead",
              "lastModifiedTime",
              "createTime",
              "lastModifiedBy",
              "userData",
            ].includes(key)
        )
        .map((key, index) => ({
          title: key
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/^./, (char) => char.toUpperCase()),
          dataIndex: key,
          key,
          filters: generateFilterValues(tableData, key),
          filteredValue: filteredInfo[key] || null,
          filterSearch: true,
          onFilter: (value, record) =>
            record[key]?.toString().toLowerCase().includes(value.toLowerCase()),
          sorter: (a, b) => {
            const aVal = a[key];
            const bVal = b[key];
            return typeof aVal === "string" && typeof bVal === "string"
              ? aVal.localeCompare(bVal)
              : aVal - bVal;
          },
          sortOrder: sortedInfo.columnKey === key ? sortedInfo.order : null,
          // Set default sort order for createTime
          ...(key === "createTime" && { defaultSortOrder: "descend" }),
          render: (text, record) => {
            if (key === "message") {
              return (
                <div className="flex justify-center">
                  {record.isRead ? (
                    <MdOutlineMarkEmailRead
                      onClick={() => {
                        handleReadMessageModal();
                        setUserData(record);
                      }}
                    />
                  ) : (
                    <MdOutlineMarkEmailUnread
                      onClick={() => {
                        setUserData(record);
                        handleReadMessage(record.id, record);
                        handleReadMessageModal();
                      }}
                      className="text-primary cursor-pointer"
                    />
                  )}
                </div>
              );
            }
            return <div key={index}>{text || "N/A"}</div>;
          },
        }))
    : [];

  // Add Action column
  if (tableData.length) {
    columns.push({
      title: "Action",
      key: "action",
      render: (_, record) => <ContactActionModal record={record?.userData} />,
    });
  }

  //! Handle pagination changes
  const handlePaginationChange = (page, pageSize) => {
    setPage(page);
    setSize(pageSize);
    refetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
        <h1 className="text-primary2 font-semibold text-lg">Suggestion</h1>
      </div>
      <div className="overflow-auto pb-4">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <div>Something went wrong</div>
        ) : (
          <>
            <Table
              pagination={false}
              size="small"
              columns={columns}
              dataSource={tableDataWithKeys}
              onChange={handleTableChange}
              bordered
            />
            <Pagination
              showSizeChanger
              onChange={handlePaginationChange}
              current={page}
              align="end"
              className="my-5"
              total={data?.rowCount}
            />
          </>
        )}
      </div>
      {messageModalVisible && (
        <MessageModal
          record={userData}
          clicked={messageModalVisible}
          handleClose={handleReadMessageModal}
        />
      )}
    </div>
  );
};

export default Suggestion;
