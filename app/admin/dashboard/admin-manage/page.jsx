"use client";
import Loader from "@/src/Components/Layouts/Loader";
import AddAdminModal from "@/src/Components/UI/Admin/AdminManage/AddAdminModal";
import AdminActionModal from "@/src/Components/UI/Admin/AdminManage/AdminActionModal";
import { useGetAllAdminQuery } from "@/src/redux/features/auth/userApi";
import { Pagination, Table } from "antd";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaRegNewspaper } from "react-icons/fa6";
import { useTranslation } from "@/src/Hook/useTranslation";

const AdminManagePage = () => {
  const [tableData, setTableData] = useState([]);
  const [AddAdmin, setAddAdmin] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [record, setRecord] = useState({});
  const { t } = useTranslation();

  //! Get all Campaigns Data
  const { data, isLoading, isError, refetch } = useGetAllAdminQuery({
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
  const handleAddAdmin = () => setAddAdmin(!AddAdmin);

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
            ![
              "id",
              "firstName",
              "middleName",
              "lastName",
              "userName",
              "emailAddress",
              "passwordHash",
              "imageUrl",
              "isApproved",
              "isActive",
              "roleId",
              "dob",
              "instituteName",
              "leaderType",
              "createTime",
              "lastModifiedTime",
              "lastModifiedBy",
              "createdBy",
              "isDeleted",
              "serial",
              "isSuperAdmin",
              "password",
              "address",
              "isApproved",
              // "userType",
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
              "campaignName",
              "campaignId",
              "physicalComplexity",
              "nid",
              "nidUrls",
              "key",
              "code",
              "bloodDonationCount",
              "imageUrl",
              "isEmergencyContact"
            ].includes(key)
        )
        .map((key, index) => ({
          title:
            key === "name"
              ? "Title"
              : key
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .replace(/([A-Z])([A-Z])/, "$1 $2")
                  .replace(/^./, (char) => char.toUpperCase()),

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
            key === "name" ? (
              <Link href={record?.url}>
                <div>{record?.name}</div>
              </Link>
            ) : key === "bloodDonationStatus" ? (
              <div>
                {record?.bloodDonationStatus === "NotInterested"
                  ? "Not Interested"
                  : record?.bloodDonationStatus}
              </div>
            ) : (
              <div key={index}>{text || "N/A"}</div>
            ),
          ellipsis: true,
        }))
    : [];

  //! Manually add the "Code" column at the beginning
  columns.unshift({
    title: "Code",
    dataIndex: "code",
    key: "code",
    width: 50,
    sorter: (a, b) => (a.code || "").localeCompare(b.code || ""),
    render: (text) => <h1 className="font-semibold">{text || "N/A"}</h1>,
  });

  //! Add action column if data exists
  if (tableData.length) {
    columns.push({
      title: "Action",
      key: "Action",
      width: 50,
      render: (text, record) => (
        <div>
          <AdminActionModal record={record} />
        </div>
      ),
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2 flex-wrap mb-3 px-1">
        <h1 className="text-primary2 font-semibold text-lg">
          {t("admin.admin")}
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddAdmin}
            className="bbm-button flex items-center gap-2"
          >
            <FaPlus /> {t("admin.create_admin")}
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
          <>
            {" "}
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
          </>
        )}
      </div>

      {AddAdmin && (
        <AddAdminModal
          refetch={refetch}
          handleClose={handleAddAdmin}
          clicked={AddAdmin}
        />
      )}
    </div>
  );
};

export default AdminManagePage;
