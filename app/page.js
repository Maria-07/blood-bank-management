import React from "react";
import HeroBanner from "../src/Components/UI/HeroBanner";
import Filters from "../src/Components/UI/Home/Filter/Filters";
import DonarCards from "../src/Components/UI/Home/DonarCards/DonarCards";
import Campaigns from "../src/Components/UI/Home/Campaigns/Campaigns";
import Works from "../src/Components/UI/Home/Works/Works";
import Volunteers from "../src/Components/UI/Home/Volunteers/Volunteers";

const HomePage = () => {
  return (
    <div>
      <div className="md:w-[90%] sm:mx-auto py-2">
        <HeroBanner></HeroBanner>
        <div className="mb-10">
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
