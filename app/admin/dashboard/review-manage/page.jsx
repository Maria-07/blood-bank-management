"use client";

import Loader from "@/src/Components/Layouts/Loader";
import { Pagination, Table, Tabs } from "antd";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "@/src/Hook/useTranslation";
import {
  useApproveReviewMutation,
  useGetAllReviewsQuery,
  useGetAllUnapprovedReviewsQuery,
  useRemoveReviewMutation,
} from "@/src/redux/features/review/review";
import { FcApproval } from "react-icons/fc";
import { IoIosRemoveCircle } from "react-icons/io";

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

  const {
    data: approvedData,
    isLoading: isApprovedLoading,
    isError: isApprovedError,
    refetch: refetchApproved,
  } = useGetAllReviewsQuery({
    pageNo: approvedPage,
    pageSize: approvedPageSize,
  });

  const {
    data: pendingData,
    isLoading: isPendingLoading,
    isError: isPendingError,
    refetch: refetchPending,
  } = useGetAllUnapprovedReviewsQuery({
    pageNo: pendingPage,
    pageSize: pendingPageSize,
  });

  const [approveReview] = useApproveReviewMutation();
  const [removeReview] = useRemoveReviewMutation();

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
            <>
              <span
                className="font-semibold cursor-pointer text-primary2 hover:underline"
                onClick={() => {
                  setModalReviewText(reviewText);
                  setShowModal(true);
                }}
              >
                {truncated}
              </span>
            </>
          );
        },
      },
      ...baseColumns,
      {
        title: "Action",
        key: "action",
        render: (_, record) =>
          isPending ? (
            <div className="flex items-center justify-center" title="Approve">
              <FcApproval
                onClick={() => handleApprove(record)}
                className="cursor-pointer"
              />
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
          {t("leaders.titleName")}
        </h1>
      </div>
      {isPendingLoading ? (
        <Loader />
      ) : isPendingError ? (
        <div>Something went wrong</div>
      ) : (
        <div className="my-5">
          <Tabs
            type="card"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded shadow-lg p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-2">Full Review</h2>
            <div className="text-gray-800 whitespace-pre-line break-words">
              {modalReviewText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewManage;
