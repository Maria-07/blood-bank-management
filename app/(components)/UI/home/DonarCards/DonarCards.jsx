import React from "react";
import DonarCard from "./DonarCard";
import { MdArrowForwardIos } from "react-icons/md";

const DonarCards = () => {
  return (
    <div>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 mt-20">
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
        <DonarCard></DonarCard>
      </div>
      <div className="flex items-center justify-end gap-1 my-3 text-primary font-semibold hover:text-secondary">
        See More <MdArrowForwardIos className="" />
      </div>
    </div>
  );
};

export default DonarCards;
