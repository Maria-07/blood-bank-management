import React from "react";
import HeroBanner from "./(components)/UI/home/HeroBanner";
import Filters from "./(components)/UI/home/Filter/Filters";
import DonarCards from "./(components)/UI/home/DonarCards/DonarCards";
import Campaigns from "./(components)/UI/home/Campaigns/Campaigns";
import Works from "./(components)/UI/home/Works/Works";
import Volunteers from "./(components)/UI/home/Volunteers/Volunteers";

const HomePage = () => {
  return (
    <div>
      <div className="md:w-[90%] sm:mx-auto py-2">
        <HeroBanner></HeroBanner>
        <div className=" p-5  mb-10 bg-[#F3F3F3] border-[1px] shadow-md px-2 rounded-xl">
          <Filters></Filters>
        </div>
        <div className="my-10">
          <DonarCards></DonarCards>
        </div>
      </div>
      <div>
        <Campaigns></Campaigns>
      </div>
      <div className="md:w-[90%] sm:mx-auto py-2">
        <Works></Works>
        <Volunteers></Volunteers>
      </div>
    </div>
  );
};

export default HomePage;
