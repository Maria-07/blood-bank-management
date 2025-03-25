import { Image } from "antd";
import Link from "next/link";
import React from "react";
import { format } from "date-fns"; // ✅ Import format from date-fns

const NewsCard = ({ news }) => {
  console.log(news);

  const { name, description, url, id, createTime } = news;

  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-primary text-white min-h-[250px] max-h-[600px] ">
      {/* News Content */}
      <div className="p-4">
        {/* Title */}
        <Link href={url}>
          <h2 className="text-lg font-semibold  hover:text-white">
            {name || "News Title Not Available"}
          </h2>
        </Link>

        {/* Date */}
        <h2 className="text-xs text-gray-50 mt-1">
          {createTime
            ? format(new Date(createTime), "MMM dd, yyyy")
            : "Posted Time Not Found"}
        </h2>

        {/* Description */}
        <p className="text-[15px] h-[60px] mt-3 ">
          {description?.length > 100
            ? `${description.slice(0, 100)} ...`
            : description || "No description available."}
        </p>

        {/* Read More Button */}
        <Link href={url}>
          <button className="text-sm mt-3 text-white border-b-2 hover:text-white hover:border-primary2 transition duration-200">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
