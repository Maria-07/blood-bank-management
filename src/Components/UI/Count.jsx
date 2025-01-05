import React from "react";

const Count = () => {
  return (
    <div className="gap-2 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-7">
      <div>
        <h1 className="text-3xl font-extrabold">30+</h1>
        <p className="text-base text-accent my-1">10005 Volunteer</p>
      </div>
      <div>
        <h1 className="text-3xl font-extrabold">100+</h1>
        <p className="text-base text-accent my-1">Happy Donors</p>
      </div>
      <div>
        <h1 className="text-3xl font-extrabold">100k+</h1>
        <p className="text-base text-accent my-1">Registered donors</p>
      </div>
      <div>
        <h1 className="text-3xl font-extrabold">24+</h1>
        <p className="text-base text-accent my-1">Active campaigns</p>
      </div>
    </div>
  );
};

export default Count;
