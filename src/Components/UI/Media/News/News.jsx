import React from "react";
import NewsCard from "./NewsCard";
import Link from "next/link";

const News = ({ news }) => {
  console.log(news);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {news?.map((n, index) => (
          <div key={index}>
            <NewsCard news={n}></NewsCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
