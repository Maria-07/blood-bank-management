"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, Pagination, Table, Tabs } from "antd";
import { toast } from "react-toastify";
import { LuFilterX } from "react-icons/lu";
import { MdDeleteForever, MdDeleteOutline, MdDone } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FcDisapprove } from "react-icons/fc";
import { FaRegCheckSquare, FaRegEye } from "react-icons/fa";

import Loader from "@/src/Components/Layouts/Loader";
import PendingVolunteersApproved from "@/src/Components/UI/Admin/Volunteers/PendingVolunteersApproved";
import ApproveVolunteerModal from "@/src/Components/UI/Admin/Volunteers/ApproveVolunteerModal";
import DisApproveVolunteerModal from "@/src/Components/UI/Admin/Volunteers/DisApproveVolunteerModal";
import UserDeleteModal from "@/src/Components/UI/User/UserDeleteModal";
import UserProfileModal from "@/src/Components/UI/User/UserProfileModal";
import ActionModal from "@/src/Components/UI/Admin/Volunteers/ActionModal";

import { useTranslation } from "@/src/Hook/useTranslation";
import { useAuth } from "@/src/Hook/AuthContext";
import {
  useDeleteEmergencyContactMutation,
  useMakeEmergencyContactMutation,
} from "@/src/redux/features/contacts/contact";
import {
  useGetAllApprovedVolunteersQuery,
  useGetAllVolunteersQuery,
} from "@/src/redux/features/volunteers/volunteers";

const VolunteerList = () => {
  // =========================
  // Hooks & State
  // =========================
  const { t } = useTranslation();
  const router = useRouter();
  const { userType } = useAuth();

  // Table data
  const [tableData, setTableData] = useState([]);
  const [tableData2, setTableData2] = useState([]);

  // Pagination & Sorting
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const [rowCount2, setRowCount2] = useState(0);
  const [page2, setPage2] = useState(1);
  const [size2, setSize2] = useState(10);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  // Modal states
  const [emergencyContactModal, setEmergencyContactModal] = useState(false);
  const [emergencyContactRecord, setEmergencyContactRecord] = useState(null);
  const [removeEmergencyContactModal, setRemoveEmergencyContactModal] =
    useState(false);
  const [removeEmergencyContactRecord, setRemoveEmergencyContactRecord] =
    useState(null);

  const [ApproveVolunteer, setApproveVolunteer] = useState(false);
  const [DisApproveVolunteer, setDisApproveVolunteer] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [UserDetails, setUserDetails] = useState(false);

  // Misc
  const [approveRecord, setApproveRecord] = useState(null);
  const [id, setId] = useState();

  // =========================
  // Data Fetching
  // =========================
  // Approved volunteers
  const {
    data: approvedData,
    isLoading: isLoading2,
    isError: isError2,
    refetch: refetch2,
  } = useGetAllApprovedVolunteersQuery({
    pageNo: page,
    pageSize: size,
  });

  // Pending volunteers
  const { data, isLoading, isError, refetch } = useGetAllVolunteersQuery({
    pageNo: page2,
    pageSize: size2,
  });

  // Emergency contact mutations
  const [makeEmergencyContact, { isLoading: isMakeEmergencyContactLoading }] =
    useMakeEmergencyContactMutation();
  const [
    removeEmergencyContact,
    { isLoading: isRemoveEmergencyContactLoading },
  ] = useDeleteEmergencyContactMutation();

  // =========================
  // Effects
  // =========================
  useEffect(() => {
    if (!isLoading2 && !isError2 && approvedData) {
      setRowCount(approvedData?.rowCount || 0);
      setTableData2(approvedData?.data || []);
    }
  }, [approvedData, isLoading2, isError2]);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setRowCount2(data?.rowCount || 0);
      setTableData(data?.data || []);
    }
  }, [data, isLoading, isError]);

  // =========================
  // Handlers
  // =========================
  // Modal toggles
  const handleUserDetails = () => setUserDetails((prev) => !prev);
  const handleApproveVolunteer = () => setApproveVolunteer((prev) => !prev);
  const handleDisApproveVolunteer = () =>
    setDisApproveVolunteer((prev) => !prev);

  const handleDeleteModal = () => {
    setDeleteModal((prev) => !prev);
    setId(approveRecord?.id);
  };

  const handleEmergencyContactModal = (record) => {
    setEmergencyContactModal((prev) => !prev);
    setEmergencyContactRecord(record);
  };

  const handleRemoveEmergencyContactModal = (record) => {
    setRemoveEmergencyContactModal((prev) => !prev);
    setRemoveEmergencyContactRecord(record);
  };

  // Emergency contact actions
  const handleMakeEmergencyContact = async (record) => {
    try {
      const response = await makeEmergencyContact({ userId: record?.id });
      if (response?.data?.data?.isSuccess) {
        toast.success(t("leaders.emergencyContactSuccess"));
      } else {
        toast.error(t("leaders.emergencyContactFailed"));
      }
      setEmergencyContactModal(false);
      refetch2();
    } catch (error) {
      toast.error(t("leaders.emergencyContactFailed"));
    }
  };

  const handleRemoveEmergencyContact = async (record) => {
    try {
      const response = await removeEmergencyContact({ userId: record?.id });
      if (response?.data?.data?.isSuccess) {
        toast.success(t("leaders.removeEmergencyContactSuccess"));
      } else {
        toast.error(t("leaders.removeEmergencyContactFailed"));
      }
      setRemoveEmergencyContactModal(false);
      refetch2();
    } catch (error) {
      toast.error(t("leaders.removeEmergencyContactFailed"));
    }
  };

  // Table filter/sort
  const handleChange = (_, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  // =========================
  // Helpers
  // =========================
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

  // Memoized table data with keys
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

  // =========================
  // Table Columns
  // =========================
  const createColumns = (tableData) => {
    if (!tableData.length) return [];

    return Object.keys(tableData[0])
      .filter(
        (key) =>
          ![
            "id",
            "serial",
            "code",
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
            "designation",
            "createTime",
            "upazilaName",
            "union",
            "unionName",
            "nid",
            "nidUrls",
            "physicalComplexity",
            "isApproved",
            "motherName",
            "campaignId",
            "campaignName",
            "bloodDonationCount",
            "imageUrl",
            "isEmergencyContact",
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
      }));
  };

  // Columns for pending and approved
  const columns = createColumns(tableData);
  const columns2 = createColumns(tableData2);

  // Add "Code" column at the beginning
  columns.unshift({
    title: "Code",
    dataIndex: "code",
    key: "code",
    sorter: (a, b) => (a.code || "").localeCompare(b.code || ""),
    render: (text) => <h1 className="font-semibold">{text || "N/A"}</h1>,
  });

  columns2.unshift(
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => (a.code || "").localeCompare(b.code || ""),
      render: (text) => <h1 className="font-semibold">{text || "N/A"}</h1>,
    },
    {
      title: "Emergency Contact",
      dataIndex: "isEmergencyContact",
      key: "isEmergencyContact",
      width: 130,
      render: (_text, record) => (
        <div className="flex items-center justify-center gap-2">
          {record?.isEmergencyContact ? (
            <button
              onClick={() => {
                handleRemoveEmergencyContactModal(record);
                setRemoveEmergencyContactRecord(record);
              }}
              className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700"
            >
              Emergency
            </button>
          ) : (
            <button
              onClick={() => {
                handleEmergencyContactModal(record);
                setEmergencyContactRecord(record);
              }}
              className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-600"
            >
              Not Emergency
            </button>
          )}
        </div>
      ),
    }
  );

  // Add "Action" column at the end
  if (columns2.length) {
    columns2.push({
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
    });
  }

  if (columns.length) {
    columns.push({
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
    });
  }

  // =========================
  // Render
  // =========================
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3 px-1">
        <h1 className="text-primary2 font-semibold text-lg">
          {t("leaders.titleName")}
        </h1>
        <button
          onClick={() => {
            setFilteredInfo({});
            setSortedInfo({});
          }}
          title={t("leaders.clearFilterTooltip")}
          className="px-2 py-1 bg-red-100 text-red-600 hover:bg-red-200 transition-all rounded text-xs border border-red-300"
        >
          <LuFilterX />
        </button>
      </div>

      {/* Main Table */}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>Something went wrong</div>
      ) : (
        <div className="my-5">
          <Tabs
            type="card"
            items={[
              {
                label: t("leaders.approved"),
                key: 1,
                children: (
                  <>
                    <Table
                      pagination={false}
                      size="small"
                      columns={columns2}
                      bordered
                      dataSource={tableDataWithKeys2}
                      onChange={handleChange}
                    />
                    <Pagination
                      showSizeChanger
                      className="my-3"
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
                ),
              },
              {
                label: t("leaders.pending"),
                key: 2,
                children: (
                  <>
                    <Table
                      pagination={false}
                      size="small"
                      columns={columns}
                      bordered
                      dataSource={tableDataWithKeys}
                      onChange={handleChange}
                    />
                    <Pagination
                      showSizeChanger
                      className="my-3"
                      onChange={(currentPage, pageSize) => {
                        setPage2(currentPage);
                        setSize2(pageSize);
                      }}
                      align="end"
                      current={page2}
                      total={rowCount2}
                      pageSize={size2}
                    />
                  </>
                ),
              },
            ]}
          />
        </div>
      )}

      {/* Emergency Contact Modal */}
      <Modal
        open={emergencyContactModal}
        centered
        footer={null}
        width={600}
        closable={false}
        className="box"
      >
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">
              {t("leaders.emergencyContact")}
              <div className="text-center text-base my-4"></div>
            </h1>
            <IoMdCloseCircleOutline
              onClick={() => setEmergencyContactModal(false)}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 pt-[1px] mt-3"></div>
          <div className="my-2">
            <p className="text-sm">
              {t("leaders.confirmEmergencyContact")}{" "}
              <span className="font-semibold text-primary">
                {emergencyContactRecord?.fullName}
              </span>{" "}
              {t("leaders.user")}
            </p>
          </div>
          <div className="bg-gray-200 py-[1px] mt-10"></div>
          <div className="flex items-end justify-end gap-2 mt-2">
            <button
              onClick={() => handleMakeEmergencyContact(emergencyContactRecord)}
              type="button"
              className="border-secondary flex items-center border rounded-sm"
            >
              <MdDone className="text-white bg-secondary px-1 py-[2px] text-[28px]" />
              <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                {t("leaders.confirmButton")}
              </span>
            </button>
            <button
              className="border-rose-600 flex items-center border rounded-sm"
              onClick={() => setEmergencyContactModal(false)}
            >
              <MdDeleteOutline className="text-white bg-rose-700 px-1 py-[2px] text-[28px]" />
              <span className="px-2 py-[6px] bg-rose-500 transition-all hover:bg-rose-600 text-white text-xs">
                {t("leaders.cancelButton")}
              </span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Remove Emergency Contact Modal */}
      <Modal
        open={removeEmergencyContactModal}
        centered
        footer={null}
        // bodyStyle={{ padding: "0" }}
        width={600}
        closable={false}
        className="box"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl  font-semibold tracking-tight">
              {t("leaders.removeEmergencyContact")}
              <div className="text-center text-base my-4"></div>
            </h1>

            <IoMdCloseCircleOutline
              onClick={() => setRemoveEmergencyContactModal(false)}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 pt-[1px] mt-3"></div>
          <div className="my-2">
            <p className="text-sm">
              {t("leaders.confirmRemoveEmergencyContact")}{" "}
            </p>
          </div>
          <div className="bg-gray-200 py-[1px] mt-10"></div>
          <div className="flex items-end justify-end gap-2 mt-2">
            <button
              onClick={() =>
                handleRemoveEmergencyContact(removeEmergencyContactRecord)
              }
              type="button"
              disabled={isRemoveEmergencyContactLoading}
              className=" border-secondary flex items-center border rounded-sm"
            >
              <MdDone className=" text-white bg-secondary  px-1 py-[2px] text-[28px]" />
              <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                {t("leaders.confirmButton")}
              </span>
            </button>
            <button
              className=" border-rose-600 flex items-center border rounded-sm"
              onClick={() => setRemoveEmergencyContactModal(false)}
            >
              <MdDeleteOutline className=" text-white bg-rose-700  px-1 py-[2px] text-[28px]" />
              <span className="px-2 py-[6px] bg-rose-500 transition-all hover:bg-rose-600 text-white text-xs">
                {t("leaders.cancelButton")}
              </span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Modals for Approve/Disapprove/Delete/User Details */}
      {ApproveVolunteer && (
        <ApproveVolunteerModal
          record={approveRecord}
          handleClose={handleApproveVolunteer}
          clicked={ApproveVolunteer}
          refetch={refetch}
          refetch2={refetch2}
        />
      )}
      {DisApproveVolunteer && (
        <DisApproveVolunteerModal
          record={approveRecord}
          handleClose={handleDisApproveVolunteer}
          clicked={DisApproveVolunteer}
          refetch={refetch2}
          refetch2={refetch}
        />
      )}
      {deleteModal && (
        <UserDeleteModal
          record={approveRecord}
          clicked={deleteModal}
          handleClose={handleDeleteModal}
          refetch={refetch2}
          refetch2={refetch}
        />
      )}
      {UserDetails && (
        <UserProfileModal
          record={approveRecord}
          handleClose={handleUserDetails}
          clicked={UserDetails}
          admin={userType === "Admin"}
          refetch={refetch2}
        />
      )}
    </div>
  );
};

export default VolunteerList;
