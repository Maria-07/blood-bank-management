import React from "react";
import { Triangle } from "react-loader-spinner";

const ErrorLoader = () => {
  return (
    <div>
      <div className="mx-auto my-auto flex items-center justify-center">
        <Triangle
          visible={true}
          height="80"
          width="80"
          color="#dc0000"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
};

export default ErrorLoader;
