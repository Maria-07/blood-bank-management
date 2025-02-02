"use client";
import React, { useEffect, useState } from "react";
import { useGetAllDonorMutation } from "@/src/redux/features/auth/userApi";
import FilteredUserData from "@/src/shared/FilteredUserData";
import DonarCard from "@/src/Components/UI/Home/DonarCards/DonarCard";
import { Pagination } from "antd";
import Loader from "@/src/Components/Layouts/Loader";

const BloodBankPage = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [filteredData, setFilteredData] = useState({});
  const [donors, setDonors] = useState([]);

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

  console.log(filteredData);

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
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [getAllUsers, filteredData, page, size]);

  return (
    <div>
      <div className="md:w-[90%] sm:mx-auto ">
        <div>
          <div className=" p-5  mb-10 bg-[#F3F3F3] border-[1px] shadow-md px-2 rounded-xl">
            {" "}
            <FilteredUserData
              role={"user"}
              handleFilteredData={handleFilteredData}
            />
          </div>
          {isLoading && <Loader></Loader>}
          <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 mt-20">
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
