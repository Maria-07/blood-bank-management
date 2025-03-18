"use client";
import { useGetAllNoticesQuery } from "@/src/redux/features/notice/notice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import notice from "@/src/assets/Image/notice.png";
import formatDate from "@/src/shared/ReusedFunctions";
import Link from "next/link";
import { FaRegFilePdf } from "react-icons/fa6";

const NoticePage = () => {
  const [allNotice, setAllNotice] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  //! Get all Campaigns Data
  const { data, isLoading, isError, refetch } = useGetAllNoticesQuery({
    pageNo: page,
    pageSize: size,
  });

  //! Update table data when data is fetched
  useEffect(() => {
    if (!isLoading && !isError && data) {
      setRowCount(data?.rowCount || 0);
      setAllNotice(data?.data);
    }
  }, [data, isLoading, isError]);
  return (
    <div>
      <div>
        <div className="md:w-[90%] sm:mx-auto ">
          <div className="pt-8 bg-[#F2F2F2] rounded-xl shadow-md py-2  px-5 ">
            <div className="md:w-[100%] sm:mx-auto grid sm:grid-cols-2 grid-cols-1 gap-3 items-center justify-between">
              {/* <div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className=""
              >
                <h1 className="font-bold lg:text-7xl text-4xl font-primary">
                  Notice
                </h1>
                <hr className="p-[2px] bg-primary w-[22%]" />
                <p className="text-sm text-accent lg:w-[55%] my-3">
                  Search for blood donors in your area quickly and conveniently.
                  Filter results by blood group.
                </p>
              </div> */}
              <h1 className="font-bold lg:text-7xl text-4xl font-primary my-5">
                Notice
              </h1>
              <div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Image
                  src={notice}
                  width={500}
                  height={600}
                  alt="Picture of the author"
                ></Image>
              </div>
            </div>
          </div>

          <div>
            {allNotice?.map((n, i) => (
              <>
                <div className="flex items-center justify-between  border-b-[1px] shadow-sm p-5">
                  {" "}
                  <div className="flex gap-7">
                    <p>{i + 1}.</p>
                    <div>
                      <h1 className="font-semibold text-lg">{n.name}</h1>
                      <h3 className="text-sm text-accent">
                        {" "}
                        Published Date : {formatDate(n?.publishDate)}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <button className="text-sm border bg-primary px-3 py-1 text-white rounded-md shadow-md">
                      <Link
                        href={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${n?.fileUrls[0]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex items-center gap-2 justify-center">
                          Read More <FaRegFilePdf />
                        </div>
                      </Link>
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticePage;
