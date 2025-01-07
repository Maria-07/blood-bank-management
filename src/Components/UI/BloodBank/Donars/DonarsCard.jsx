import React from "react";
import DonarCard from "../../Home/DonarCards/DonarCard";
import { MdArrowForwardIos } from "react-icons/md";
import { Pagination } from "antd";

const DonarsCard = () => {
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };
  return (
    <div>
      <Pagination
        defaultCurrent={6}
        total={500}
        itemRender={itemRender}
        align="end"
      />
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 my-10">
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
      </div>
    </div>
  );
};

export default DonarsCard;
