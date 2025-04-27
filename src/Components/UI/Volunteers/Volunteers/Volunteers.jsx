"use client";
import React, { useEffect, useState } from "react";
import Volunteer from "./Volunteer";
import { useGetAllApprovedVolunteersQuery } from "@/src/redux/features/volunteers/volunteers";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  //! Get all volunteers using RTK Query
  const { data, isLoading, isError } = useGetAllApprovedVolunteersQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      // pollingInterval: 8000,
    }
  );

  useEffect(() => {
    if (!isLoading && !isError) {
      setVolunteers(data?.data);
    }
  }, [data, isError, isLoading]);

  return (
    <div className="">
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 mt-10 mb-20">
        {volunteers?.map((v, i) => (
          <Volunteer key={i} record={v}></Volunteer>
        ))}
      </div>
    </div>
  );
};

export default Volunteers;
