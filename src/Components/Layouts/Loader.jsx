import React from "react";
import loader from "@/src/assets//video/loader.gif";
import Image from "next/image";
import { DNA } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      {/* <Image
        src={loader}
        width={500}
        height={600}
        alt="Picture of the author"
      ></Image> */}
      <div className="mx-auto my-auto flex items-center justify-center">
        <DNA
          visible={true}
          height="150"
          width="150"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    </div>
  );
};

export default Loader;
