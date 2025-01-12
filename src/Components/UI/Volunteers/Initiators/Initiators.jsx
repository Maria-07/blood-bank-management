import React from "react";
import Initiator from "./Initiator";

const Initiators = () => {
  return (
    <div>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 mt-10 mb-20">
        <Initiator></Initiator>
        <Initiator></Initiator>
        <Initiator></Initiator>
        <Initiator></Initiator>
      </div>
    </div>
  );
};

export default Initiators;
