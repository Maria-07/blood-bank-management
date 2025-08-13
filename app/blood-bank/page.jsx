"use client";
import React, { useEffect, useState } from "react";
import { useGetAllDonorMutation } from "@/src/redux/features/auth/userApi";
import FilteredUserData from "@/src/shared/FilteredUserData";
import DonarCard from "@/src/Components/UI/Home/DonarCards/DonarCard";
import { Pagination } from "antd";
import Loader from "@/src/Components/Layouts/Loader";
import { useTranslation } from "@/src/Hook/useTranslation";

const BloodBankPage = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [filteredData, setFilteredData] = useState({});
  const [donors, setDonors] = useState([]);
  const [resetTrigger, setResetTrigger] = useState(0);
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const handleFilteredData = (key, value) => {
    setFilteredData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilteredData({});
    setResetTrigger((prev) => prev + 1);
  };

  const [getAllUsers, { data, isLoading, isError }] = useGetAllDonorMutation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers({
          ...filteredData,
          pageNo: page,
          pageSize: size,
        }).unwrap();
        setDonors(response?.data || []);
        setRowCount(response?.rowCount || 0);
      } catch (error) {}
    };

    fetchUsers();
  }, [getAllUsers, filteredData, page, size]);

  return (
    <div>
      <div className="md:w-[90%] sm:mx-auto ">
        <div>
          <div
            className="relative p-5 mb-10 border-[1px] shadow-md px-2 rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(90deg, #f3f3f3 60%, #e0e7ff 100%)",
            }}
          >
            {/* Gradient overlay for extra effect */}
            <div
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{
                background:
                  "linear-gradient(120deg, rgba(236,72,153,0.08) 0%, rgba(59,130,246,0.10) 100%)",
                zIndex: 0,
              }}
            />
            <div className="relative z-10">
              <FilteredUserData
                role={"user"}
                handleFilteredData={handleFilteredData}
                resetTrigger={resetTrigger}
              />
            </div>
            <div className="flex justify-between gap-2 flex-wrap">
              {Object.keys(filteredData).length > 0 ? (
                <div className="text-sm text-gray-500 mt-2">
                  {t("bloodBank.totalSearchResult")}: {rowCount}
                </div>
              ) : (
                <div className="text-sm text-gray-500 mt-2">
                  {t("bloodBank.totalDonors")}: {rowCount}
                </div>
              )}
              <button className="input-button mt-2" onClick={clearFilters}>
                {t("donationTracking.clear")}
              </button>
            </div>
          </div>
          {isLoading && <Loader></Loader>}
          <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 mt-20">
            {donors?.map((data, i) => (
              <DonarCard record={data} key={i}></DonarCard>
            ))}
          </div>
          <div className="my-10">
            <Pagination
              onChange={(currentPage, pageSize) => {
                setPage(currentPage);
                setSize(pageSize);
              }}
              showSizeChanger
              defaultCurrent={1}
              total={rowCount}
              itemRender={itemRender}
              align="end"
              current={page}
              pageSize={size}
            />
          </div>
        </div>
        {/* <div>
          <div>
            <DonarsCard></DonarsCard>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BloodBankPage;
