/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Table, Tabs, Pagination } from "antd";
import { LuFilter, LuFilterX } from "react-icons/lu";

import Loader from "@/src/Components/Layouts/Loader";
import UserDeleteModal from "@/src/Components/UI/User/UserDeleteModal";
import FilteredUserData from "@/src/shared/FilteredUserData";

import {
  useGetAllApprovedDonorMutation,
  useGetAllPendingDonorMutation,
} from "@/src/redux/features/auth/userApi";
import { useTranslation } from "@/src/Hook/useTranslation";
import { FcDisapprove } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { FaRegCheckSquare, FaRegEye } from "react-icons/fa";
import ApproveVolunteerModal from "@/src/Components/UI/Admin/Volunteers/ApproveVolunteerModal";
import DisApproveVolunteerModal from "@/src/Components/UI/Admin/Volunteers/DisApproveVolunteerModal";
import UserProfileModal from "@/src/Components/UI/User/UserProfileModal";
import { useAuth } from "@/src/Hook/AuthContext";

const BloodBanks = () => {
  const [filterShow, setFilterShow] = useState(false);
  const [filteredData, setFilteredData] = useState({});
  const { t } = useTranslation();
  const { userType } = useAuth();

  const [ApproveVolunteer, setApproveVolunteer] = useState(false);
  const [DisApproveVolunteer, setDisApproveVolunteer] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [UserDetails, setUserDetails] = useState(false);

  // Misc
  const [approveRecord, setApproveRecord] = useState(null);
  const [id, setId] = useState();

  // Modal toggles
  const handleUserDetails = () => setUserDetails((prev) => !prev);
  const handleApproveVolunteer = () => setApproveVolunteer((prev) => !prev);
  const handleDisApproveVolunteer = () =>
    setDisApproveVolunteer((prev) => !prev);

  const handleDeleteModal = () => {
    setDeleteModal((prev) => !prev);
    setId(approveRecord?.id);
  };

  // Pagination and row count
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const [pagination2, setPagination2] = useState({ page: 1, size: 10 });
  const [rowCount, setRowCount] = useState(0);
  const [rowCount2, setRowCount2] = useState(0);

  // Active tab state
  const [activeTabKey, setActiveTabKey] = useState("1");

  // Table data
  const [tableData, setTableData] = useState([]);
  const [tableDataPending, setTableDataPending] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleFilteredData = (key, value) => {
    setFilteredData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilteredData({});
    setFilteredInfo({});
    setSortedInfo({});
    setResetTrigger((prev) => prev + 1);
  };

  const [getAllApprovedDonors, { isLoading, isError, refetch: refetch }] =
    useGetAllApprovedDonorMutation();
  const [
    getAllPendingDonors,
    { isLoadingPending, isErrorPending, refetch: refetch2 },
  ] = useGetAllPendingDonorMutation();

  const tableDataWithKeys = (data) =>
    data?.map((item, index) => ({ ...item, key: item?.id || index }));

  const fetchData = useCallback(
    async (fetchFunction, setData, paginationConfig, setRowCountFn) => {
      try {
        const response = await fetchFunction({
          ...filteredData,
          pageNo: paginationConfig.page,
          pageSize: paginationConfig.size,
        }).unwrap();

        setRowCountFn(response?.rowCount || 0);
        setData(tableDataWithKeys(response?.data || []));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    },
    [filteredData]
  );

  // Fetch only active tab's data
  useEffect(() => {
    if (activeTabKey === "1") {
      fetchData(getAllApprovedDonors, setTableData, pagination, setRowCount);
    }
  }, [fetchData, pagination, activeTabKey]);

  useEffect(() => {
    if (activeTabKey === "2") {
      fetchData(
        getAllPendingDonors,
        setTableDataPending,
        pagination2,
        setRowCount2
      );
    }
  }, [fetchData, pagination2, activeTabKey]);

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
                "designation",
                "createTime",
                "union",
                "unionName",
                "motherName",
                "physicalComplexity",
                "nid",
                "nidUrls",
                "key",
                "campaignId",
                "campaignName",
                "instituteName",
                "leaderType",
                "bloodDonationCount",
                "imageUrl",
                "isEmergencyContact",
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
              ) : key === "bloodDonationStatus" ? (
                <div>
                  {record?.bloodDonationStatus === "NotInterested"
                    ? "Not Interested"
                    : record?.bloodDonationStatus}
                </div>
              ) : (
                <div>{text || "N/A"}</div>
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
        render: (_, record) => (
          <div className="flex items-center justify-center gap-2">
            <button
              title="Reject"
              onClick={() => {
                setApproveRecord(record);
                handleDisApproveVolunteer();
              }}
              className="text-green-500 text-[16px] px-2 py-[1px] font-semibold rounded-md"
            >
              <FcDisapprove />
            </button>
            <button
              title="Delete User"
              type="button"
              onClick={() => {
                setApproveRecord(record);
                handleDeleteModal();
              }}
              className="flex items-center justify-center text-secondary"
            >
              <MdDeleteForever />
            </button>
            <button
              title="Details"
              className="text-green-500 text-[13px] px-2 py-[1px] font-semibold rounded-md"
              onClick={() => {
                setApproveRecord(record);
                handleUserDetails();
              }}
            >
              <FaRegEye className="text-green-700" />
            </button>
          </div>
        ),
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
        render: (_, record) => (
          <div className="flex items-center justify-center gap-2">
            <button
              title="Approve"
              onClick={() => {
                setApproveRecord(record);
                handleApproveVolunteer();
              }}
              className="text-green-500 text-[11px] px-2 py-[1px] font-semibold rounded-md"
            >
              <FaRegCheckSquare />
            </button>
            <button
              title="Delete User"
              type="button"
              onClick={() => {
                setApproveRecord(record);
                handleDeleteModal();
              }}
              className="flex items-center justify-center text-secondary"
            >
              <MdDeleteForever />
            </button>
            <button
              title="Details"
              className="text-green-500 text-[13px] px-2 py-[1px] font-semibold rounded-md"
              onClick={() => {
                setApproveRecord(record);
                handleUserDetails();
              }}
            >
              <FaRegEye className="text-green-700" />
            </button>
          </div>
        ),
      },
    ],
    [tableDataPending, sortedInfo, filteredInfo]
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <h1 className="text-primary font-semibold text-lg">
          {t("userProfile.titleName")}
        </h1>
        <div className="flex items-center gap-2">
          <button
            className="border p-1 rounded-sm"
            onClick={() => setFilterShow(!filterShow)}
          >
            {!filterShow ? <LuFilter /> : <LuFilterX />}
          </button>
          <button
            className="border px-3 py-1 rounded-sm text-sm hover:bg-gray-50"
            onClick={clearFilters}
          >
            Clear
          </button>
        </div>
      </div>

      {filterShow && (
        <div
          style={{
            background:
              "linear-gradient(120deg, rgba(236,72,153,0.08) 0%, rgba(59,130,246,0.10) 100%)",
            zIndex: 0,
          }}
          className="border px-5 py-5 rounded-md shadow-md mt-5 mb-10"
        >
          <FilteredUserData
            role="admin"
            handleFilteredData={handleFilteredData}
            resetTrigger={resetTrigger}
          />
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>Something went wrong </div>
      ) : (
        <div className="my-5">
          <Tabs
            type="card"
            activeKey={activeTabKey}
            onChange={(key) => setActiveTabKey(key)}
            items={[
              {
                label: t("userProfile.approved"),
                key: "1",
                children: (
                  <>
                    <Table
                      pagination={false}
                      size="small"
                      className="text-xs font-normal"
                      columns={approvedColumns}
                      bordered
                      dataSource={tableData}
                      onChange={handleTableChange}
                    />
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
                  </>
                ),
              },
              {
                label: t("userProfile.pending"),
                key: "2",
                children: (
                  <>
                    <Table
                      pagination={false}
                      size="small"
                      className="text-xs font-normal"
                      columns={pendingColumns}
                      bordered
                      dataSource={tableDataPending}
                      onChange={handleTableChange}
                    />
                    <div className="my-5">
                      <Pagination
                        showSizeChanger
                        onChange={(page, size) =>
                          setPagination2({ page, size })
                        }
                        current={pagination2.page}
                        total={rowCount2}
                        pageSize={pagination2.size}
                        align="end"
                      />
                    </div>
                  </>
                ),
              },
            ]}
          />
        </div>
      )}

      {ApproveVolunteer && (
        <ApproveVolunteerModal
          record={approveRecord}
          handleClose={handleApproveVolunteer}
          clicked={ApproveVolunteer}
          refetch={() => {
            if (activeTabKey === "1") {
              fetchData(
                getAllApprovedDonors,
                setTableData,
                pagination,
                setRowCount
              );
            } else {
              fetchData(
                getAllPendingDonors,
                setTableDataPending,
                pagination2,
                setRowCount2
              );
            }
          }}
          refetch2={() => {
            fetchData(
              getAllPendingDonors,
              setTableDataPending,
              pagination2,
              setRowCount2
            );
            fetchData(
              getAllApprovedDonors,
              setTableData,
              pagination,
              setRowCount
            );
          }}
        />
      )}
      {DisApproveVolunteer && (
        <DisApproveVolunteerModal
          record={approveRecord}
          handleClose={handleDisApproveVolunteer}
          clicked={DisApproveVolunteer}
          refetch={() => {
            fetchData(
              getAllPendingDonors,
              setTableDataPending,
              pagination2,
              setRowCount2
            );
          }}
          refetch2={() => {
            fetchData(
              getAllApprovedDonors,
              setTableData,
              pagination,
              setRowCount
            );
          }}
        />
      )}
      {deleteModal && (
        <UserDeleteModal
          record={approveRecord}
          clicked={deleteModal}
          handleClose={handleDeleteModal}
          refetch={() => {
            fetchData(
              getAllPendingDonors,
              setTableDataPending,
              pagination2,
              setRowCount2
            );
          }}
          refetch2={() => {
            fetchData(
              getAllApprovedDonors,
              setTableData,
              pagination,
              setRowCount
            );
          }}
        />
      )}
      {UserDetails && (
        <UserProfileModal
          record={approveRecord}
          handleClose={handleUserDetails}
          clicked={UserDetails}
          admin={userType === "Admin"}
          refetch={() => {
            if (activeTabKey === "2") {
              fetchData(
                getAllPendingDonors,
                setTableDataPending,
                pagination2,
                setRowCount2
              );
            } else {
              fetchData(
                getAllApprovedDonors,
                setTableData,
                pagination,
                setRowCount
              );
            }
          }}
        />
      )}
    </div>
  );
};

export default BloodBanks;
