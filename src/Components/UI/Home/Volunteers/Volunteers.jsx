import React from "react";
import Volunteer from "./Volunteer";

const Volunteers = () => {
  return (
    <div className="my-32">
      <h1 className=" text-6xl font-semibold  text-center my-10">
        Our dedicated volunteers
      </h1>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 mt-20">
        <Volunteer></Volunteer>
        <Volunteer></Volunteer>
        <Volunteer></Volunteer>
        <Volunteer></Volunteer>
        <Volunteer></Volunteer>
        <Volunteer></Volunteer>
      </div>
      <div className="flex items-center justify-center">
        <div className="my-10">
          <button className="bb-input-button">See More</button>
        </div>
      </div>
    </div>
  );
};

export default Volunteers;
