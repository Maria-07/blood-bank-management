"use client";
import { useGetAllAdminQuery } from "@/src/redux/features/auth/userApi";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const AdminManagePage = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [record, setRecord] = useState({});

  //! Get all Campaigns Data
  const { data, isLoading, isError, refetch } = useGetAllAdminQuery({
    pageNo: page,
    pageSize: size,
  });

  console.log("data", data);

  return (
    <div>
      <div className="flex items-center justify-between gap-2 flex-wrap mb-3 px-1">
        <h1 className="text-primary2 font-semibold text-lg">Admins</h1>
      </div>
    </div>
  );
};

export default AdminManagePage;
