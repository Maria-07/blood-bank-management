import React from "react";
import HeroBanner from "./(components)/UI/home/HeroBanner";
import Filters from "./(components)/UI/home/Filter/Filters";

const HomePage = () => {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <div className=" p-5 mb-10 bg-[#CFCFCF] border-[1px] shadow-md px-2 rounded-xl">
        <Filters></Filters>
      </div>
    </div>
  );
};

export default HomePage;
