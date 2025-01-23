import React from "react";
import loader from "@/src/assets//video/loader.gif";
import Image from "next/image";

const Loader = () => {
  return (
    <div>
      <Image
        src={loader}
        width={500}
        height={600}
        alt="Picture of the author"
      ></Image>
    </div>
  );
};

export default Loader;
