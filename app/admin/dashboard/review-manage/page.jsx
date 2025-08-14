"use client";

import Loader from "@/src/Components/Layouts/Loader";
import { Modal, Pagination, Table, Tabs } from "antd";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "@/src/Hook/useTranslation";
import {
  useApproveReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
  useGetAllUnapprovedReviewsQuery,
  useRemoveReviewMutation,
} from "@/src/redux/features/review/review";
import { FcApproval } from "react-icons/fc";
import { IoIosRemoveCircle } from "react-icons/io";
import { MdDelete, MdDeleteOutline, MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import { IoMdCloseCircleOutline } from "react-icons/io";

const ReviewManage = () => {
  const { t } = useTranslation();

  const [pendingReviews, setPendingReviews] = useState([]);
  const [approvedReviews, setApprovedReviews] = useState([]);
  const [pendingTotal, setPendingTotal] = useState(0);
  const [approvedTotal, setApprovedTotal] = useState(0);

  const [pendingPage, setPendingPage] = useState(1);
  const [pendingPageSize, setPendingPageSize] = useState(10);
  const [approvedPage, setApprovedPage] = useState(1);
  const [approvedPageSize, setApprovedPageSize] = useState(10);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalReviewText, setModalReviewText] = useState("");
  const [activeTab, setActiveTab] = useState("approved");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const {
    data: approvedData,
    isLoading: isApprovedLoading,
    isError: isApprovedError,
    refetch: refetchApproved,
  } = useGetAllReviewsQuery(
    {
      pageNo: approvedPage,
      pageSize: approvedPageSize,
    },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: pendingData,
    isLoading: isPendingLoading,
    isError: isPendingError,
    refetch: refetchPending,
  } = useGetAllUnapprovedReviewsQuery(
    {
      pageNo: pendingPage,
      pageSize: pendingPageSize,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [deleteReview] = useDeleteReviewMutation();
  const [approveReview] = useApproveReviewMutation();
  const [removeReview] = useRemoveReviewMutation();

  useEffect(() => {
    refetchApproved();
    refetchPending();
  }, []);

  useEffect(() => {
    if (!isApprovedLoading && !isApprovedError && approvedData) {
      setApprovedTotal(approvedData?.data?.rowCount || 0);
      setApprovedReviews(approvedData?.data?.data || []);
    }
  }, [approvedData, isApprovedLoading, isApprovedError]);

  useEffect(() => {
    if (!isPendingLoading && !isPendingError && pendingData) {
      setPendingTotal(pendingData?.data?.rowCount || 0);
      setPendingReviews(pendingData?.data?.data || []);
    }
  }, [pendingData, isPendingLoading, isPendingError]);

  const handleDelete = useCallback(
    async (record) => {
      try {
        await deleteReview(record?.id).unwrap();
        toast.success(t("reviews.reviewDeleted"));
        refetchPending();
        refetchApproved();
      } catch (error) {
        toast.error(error?.data?.message || t("reviews.somethingWentWrong"));
      }
    },
    [deleteReview, refetchPending, refetchApproved, t]
  );

  const handleApprove = useCallback(
    async (record) => {
      await approveReview({ reviewId: record?.id });
      refetchPending();
      refetchApproved();
    },
    [approveReview, refetchPending, refetchApproved]
  );

  const handleRemove = useCallback(
    async (record) => {
      await removeReview({ reviewId: record?.id });
      refetchApproved();
      refetchPending();
    },
    [removeReview, refetchApproved, refetchPending]
  );

  const handleChange = (_, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const generateFilterValues = (data, columnKey) => {
    const uniqueValues = Array.from(new Set(data.map((d) => d[columnKey])));
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

  const getColumns = (data, isPending) => {
    if (!data.length) return [];

    const baseColumns = Object.keys(data[0])
      .filter(
        (key) =>
          ![
            "id",
            "reviewOwner",
            "updateTime",
            "createTime",
            "createdBy",
            "isApproved",
            "isDeleted",
            "lastModifiedBy",
            "lastModifiedTime",
            "postedBy",
            "reviewMessage",
          ].includes(key)
      )
      .map((key) => ({
        title: key
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/^./, (char) => char.toUpperCase()),
        dataIndex: key,
        key,
        filters: generateFilterValues(data, key),
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
        ellipsis: true,
      }));

    const columns = [
      {
        title: "Full Name",
        dataIndex: "fullName",
        key: "fullName",
        width: 300,
        sorter: (a, b) =>
          (a.reviewOwner?.fullName || "").localeCompare(
            b.reviewOwner?.fullName || ""
          ),
        render: (_, record) => (
          <span className="font-semibold">
            {record?.reviewOwner?.fullName || "N/A"}
          </span>
        ),
      },
      {
        title: "Review",
        dataIndex: "reviewMessage",
        key: "reviewMessage",
        sorter: (a, b) =>
          (a.reviewMessage || "").localeCompare(b.reviewMessage || ""),
        render: (_, record) => {
          const reviewText = record?.reviewMessage || "N/A";
          const truncated =
            reviewText.length > 40
              ? reviewText.slice(0, 40) + "..."
              : reviewText;

          return (
            <span
              className="font-semibold cursor-pointer text-primary2 hover:underline"
              onClick={() => {
                setModalReviewText(reviewText);
                setShowModal(true);
              }}
            >
              {truncated}
            </span>
          );
        },
      },
      ...baseColumns,
      {
        title: "Action",
        key: "action",
        render: (_, record) =>
          isPending ? (
            <div>
              <div className="flex items-center justify-center gap-2">
                <FcApproval
                  title="Approve"
                  onClick={() => handleApprove(record)}
                  className="cursor-pointer"
                />
                <MdDelete
                  title="Delete"
                  onClick={() => {
                    setDeleteTarget(record);
                    setShowDeleteModal(true);
                  }}
                  className="cursor-pointer text-primary"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center" title="Remove">
              <IoIosRemoveCircle
                className="text-red-500 cursor-pointer"
                onClick={() => handleRemove(record)}
              />
            </div>
          ),
      },
    ];

    return columns;
  };

  const pendingColumns = useMemo(
    () => getColumns(pendingReviews, true),
    [pendingReviews, filteredInfo, sortedInfo, handleApprove]
  );
  const approvedColumns = useMemo(
    () => getColumns(approvedReviews, false),
    [approvedReviews, filteredInfo, sortedInfo, handleRemove]
  );

  const pendingDataWithKeys = useMemo(
    () =>
      pendingReviews.map((item) => ({
        ...item,
        key: item.id || item.mobileNumber,
      })),
    [pendingReviews]
  );
  const approvedDataWithKeys = useMemo(
    () =>
      approvedReviews.map((item) => ({
        ...item,
        key: item.id || item.mobileNumber,
      })),
    [approvedReviews]
  );

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3 px-1">
        <h1 className="text-primary2 font-semibold text-lg">
          {t("reviews.title")}
        </h1>
      </div>
      {(isApprovedLoading && activeTab === "approved") ||
      (isPendingLoading && activeTab === "pending") ? (
        <Loader />
      ) : (isApprovedError && activeTab === "approved") ||
        (isPendingError && activeTab === "pending") ? (
        <div>Something went wrong</div>
      ) : (
        <div className="my-5">
          <Tabs
            type="card"
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              {
                label: t("leaders.approved"),
                key: "approved",
                children: (
                  <>
                    <Table
                      pagination={false}
                      size="small"
                      columns={approvedColumns}
                      bordered
                      dataSource={approvedDataWithKeys}
                      onChange={handleChange}
                    />
                    <Pagination
                      showSizeChanger
                      className="my-3"
                      onChange={(currentPage, pageSize) => {
                        setApprovedPage(currentPage);
                        setApprovedPageSize(pageSize);
                      }}
                      align="end"
                      current={approvedPage}
                      total={approvedTotal}
                      pageSize={approvedPageSize}
                    />
                  </>
                ),
              },
              {
                label: t("leaders.pending"),
                key: "pending",
                children: (
                  <>
                    <Table
                      pagination={false}
                      size="small"
                      columns={pendingColumns}
                      bordered
                      dataSource={pendingDataWithKeys}
                      onChange={handleChange}
                    />
                    <Pagination
                      showSizeChanger
                      className="my-3"
                      onChange={(currentPage, pageSize) => {
                        setPendingPage(currentPage);
                        setPendingPageSize(pageSize);
                      }}
                      align="end"
                      current={pendingPage}
                      total={pendingTotal}
                      pageSize={pendingPageSize}
                    />
                  </>
                ),
              },
            ]}
          />
        </div>
      )}
      {showModal && (
        <Modal
          open={showModal}
          centered
          footer={null}
          width={500}
          closable={false}
          className="box"
        >
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="text-xl  font-semibold tracking-tight">
                {t("reviews.title")}
              </h1>

              <IoMdCloseCircleOutline
                onClick={() => setShowModal(false)}
                className="text-gray-500 text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 pt-[1px] mt-3"></div>
            {/* <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button> */}

            <div className="text-gray-800 whitespace-pre-line break-words my-3 p-3 border border-gray-200 rounded-md">
              {modalReviewText}
            </div>
          </div>
        </Modal>
      )}
      {showDeleteModal && (
        <Modal
          open={showDeleteModal}
          centered
          footer={null}
          width={500}
          closable={false}
          className="box"
        >
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="text-xl  font-semibold tracking-tight">
                {t("reviews.confirmDeleteTitle")}
              </h1>

              <IoMdCloseCircleOutline
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 pt-[1px] mt-3"></div>

            <form>
              <div className="text-center text-base my-4">
                {t("reviews.confirmDeleteMessage")}
              </div>
              <div className="bg-gray-200 py-[1px] mt-10"></div>
              <div className="flex items-end justify-end gap-2 mt-2">
                <button
                  onClick={async () => {
                    if (deleteTarget) {
                      await handleDelete(deleteTarget);
                    }
                    setShowDeleteModal(false);
                    setDeleteTarget(null);
                  }}
                  type="button"
                  className=" border-green-600 bg-green-700 flex items-center border rounded-sm"
                >
                  <MdDone className=" text-white bg-green-700  px-1 py-[2px] text-[28px]" />
                  <span className="px-2 py-[6px] bg-green-600 transition-all hover:bg-green-700 text-white text-xs">
                    {t("reviews.delete")}
                  </span>
                </button>
                <button
                  className=" border-rose-600 flex items-center border rounded-sm"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteTarget(null);
                  }}
                >
                  <MdDeleteOutline className=" text-white bg-rose-700  px-1 py-[2px] text-[28px]" />
                  <span className="px-2 py-[6px] bg-rose-500 transition-all hover:bg-rose-600 text-white text-xs">
                    {t("reviews.cancel")}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ReviewManage;
