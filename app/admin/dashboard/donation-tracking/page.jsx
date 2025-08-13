/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useTranslation } from "@/src/Hook/useTranslation";
import { DatePicker, Pagination, Table, Button } from "antd";
import { MdOutlineDateRange } from "react-icons/md";
import { LuFilterX } from "react-icons/lu";
import { toast } from "react-toastify";
import { useGetDonationTrackingQuery } from "@/src/redux/features/campaign/campaignApi";
import Loader from "@/src/Components/Layouts/Loader";
import moment from "moment";

const DonationTracking = () => {
  const { t } = useTranslation();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [rowCount, setRowCount] = useState(0);
  const [dateError, setDateError] = useState("");
  const [tableShow, setTableShow] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, size: 10 });

  const queryParams = useMemo(() => {
    if (!searchParams) return undefined;
    return {
      pageNo: searchParams.page,
      pageSize: searchParams.size,
      startTime: searchParams.fromDate.format("YYYY-MM-DD"),
      endTime: searchParams.toDate.format("YYYY-MM-DD"),
    };
  }, [searchParams]);

  const { data, isLoading, isError, error } = useGetDonationTrackingQuery(
    queryParams,
    {
      skip: !searchParams,
    }
  );

  const handleSearch = useCallback(() => {
    if (!fromDate || !toDate) {
      setDateError(t("donationTracking.dateRequired"));
      toast.error(t("donationTracking.dateRequired"));
      return;
    }
    if (fromDate.isAfter(toDate)) {
      const msg =
        t("donationTracking.invalidDateRange") ||
        "From date cannot be after To date";
      setDateError(msg);
      toast.error(msg);
      return;
    }
    setDateError("");
    setSearchParams({
      fromDate,
      toDate,
      page: pagination.page,
      size: pagination.size,
    });
  }, [fromDate, toDate, pagination.page, pagination.size, t]);

  const handleClear = useCallback(() => {
    setFromDate(null);
    setToDate(null);
    setSearchParams(null);
    setTableData([]);
    setTableShow(false);
    setRowCount(0);
    setDateError("");
    setPagination({ page: 1, size: 10 });
  }, []);

  const handlePageChange = useCallback(
    (currentPage, pageSize) => {
      const newPagination = { page: currentPage, size: pageSize };
      setPagination(newPagination);

      if (searchParams) {
        setSearchParams({
          ...searchParams,
          page: currentPage,
          size: pageSize,
        });
      }
    },
    [searchParams]
  );

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setTableData(data?.data?.data || []);
      setTableShow(true);
      setRowCount(data?.totalCount || 0);
    }
  }, [data, isLoading, isError]);

  const generateFilterValues = (data, columnKey) => {
    const arr = Array.isArray(data) ? data : [];
    const uniqueValues = [...new Set(arr.map((d) => d[columnKey]))];
    return uniqueValues.map((value) => ({ text: value, value }));
  };

  const handleChange = (_, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const tableDataWithKeys = useMemo(
    () =>
      Array.isArray(tableData)
        ? tableData.map((item) => ({
            ...item,
            key: item.id || item.mobileNumber,
          }))
        : [],
    [tableData]
  );

  const columns =
    Array.isArray(tableData) && tableData.length
      ? Object.keys(tableData[0])
          .filter((key) => !["id", "donorId"].includes(key))
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
              record[key]
                ?.toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
            sorter: (a, b) => {
              const aValue = a[key];
              const bValue = b[key];
              return typeof aValue === "string" && typeof bValue === "string"
                ? aValue.localeCompare(bValue)
                : aValue - bValue;
            },
            sortOrder: sortedInfo.columnKey === key ? sortedInfo.order : null,
            render: (text, record) =>
              key === "lastDonationTime" && text ? (
                <div>{moment(text).format("YYYY-MM-DD")}</div>
              ) : (
                <div key={index}>{text || "N/A"}</div>
              ),
            ellipsis: true,
          }))
      : [];

  return (
    <div>
      <div className="flex items-center justify-between gap-2 flex-wrap mb-3 px-1">
        <h1 className="text-primary2 font-semibold text-lg">
          {t("sidebar.donation")}
        </h1>
      </div>
      <div className="flex items-center gap-5 flex-wrap">
        <div>
          <h1 className="input-title flex items-center gap-1">
            <MdOutlineDateRange className="text-primary" />
            {t("donationTracking.fromDate")}{" "}
            <span className="text-red-600">*</span>
          </h1>
          <DatePicker
            className="w-full mb-2"
            format={{ format: "YYYY-MM-DD", type: "mask" }}
            onChange={setFromDate}
            value={fromDate}
          />
        </div>
        <div>
          <h1 className="input-title flex items-center gap-1">
            <MdOutlineDateRange className="text-primary" />
            {t("donationTracking.toDate")}{" "}
            <span className="text-red-600">*</span>
          </h1>
          <DatePicker
            className="w-full mb-2"
            format={{ format: "YYYY-MM-DD", type: "mask" }}
            onChange={setToDate}
            value={toDate}
          />
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={handleSearch} className="input-button">
            {t("donationTracking.Go")}
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1 input-button bg-primary"
          >
            <LuFilterX /> {t("donationTracking.clear")}
          </button>
        </div>
      </div>
      {dateError && (
        <div className="text-red-500 text-sm mt-2">{dateError}</div>
      )}
      <div className="mt-6">
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Loader />
          </div>
        )}
        {isError && (
          <div className="text-red-500 text-center py-4">
            {error?.data?.message || t("donationTracking.fetchError")}
          </div>
        )}
        {tableShow && (
          <div className="overflow-scroll pb-4">
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
              <Pagination
                showSizeChanger
                onChange={handlePageChange}
                align="end"
                current={pagination.page}
                total={rowCount}
                pageSize={pagination.size}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationTracking;
