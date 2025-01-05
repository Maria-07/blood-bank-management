import Image from "next/image";
import React from "react";
import work from "@/assets/Image/pana.png";
import Work from "./Work";

const Works = () => {
  return (
    <div>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 my-20">
        <div className="p-5">
          <h1 className=" text-6xl font-semibold  ">How we work</h1>
          <p className="text-sm text-accent my-2 tracking-wide sm:w-[60%] w-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            deleniti blanditiis neque, illo, obcaecati
          </p>

          <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 my-10">
            <Work></Work>
            <Work></Work>
            <Work></Work>
            <Work></Work>
            <Work></Work>
            <Work></Work>
          </div>
        </div>
        <div>
          {" "}
          <Image
            src={work}
            width={"100%"}
            height={"100%"}
            alt="Picture of the author"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default Works;
