import Image from "next/image";
import React from "react";
import work from "@/src/assets/Image/pana.png";
import { GiCorkedTube } from "react-icons/gi";
import { GrWorkshop } from "react-icons/gr";
import { BiDonateBlood } from "react-icons/bi";
import { MdWbIncandescent } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { IoCloudDone } from "react-icons/io5";

const Works = () => {
  return (
    <div>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 my-20">
        <div className="p-5">
          <h1 className=" text-6xl font-semibold  ">How we work</h1>
          <p className="text-sm text-accent my-2 tracking-wide ">
            Our Process: How We Work to Ensure Safe Blood Donation
          </p>

          <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 my-10">
            <div>
              <div>
                <GiCorkedTube className="text-5xl text-primary" />
              </div>
              <h1 className="text-lg text-accent font-semibold my-2">
                Sample Collection
              </h1>
              <p className="text-sm text-accent">
                A small blood sample is taken from your arm.
              </p>
            </div>
            <div>
              <div>
                <GrWorkshop className="text-5xl text-primary" />
              </div>
              <h1 className="text-lg text-accent font-semibold my-2">
                Reagent Preparation
              </h1>
              <p className="text-sm text-accent">
                Laboratory technicians prepare specific antibodies.
              </p>
            </div>
            <div>
              <div>
                <BiDonateBlood className="text-5xl text-primary" />
              </div>
              <h1 className="text-lg text-accent font-semibold my-2">
                Applying Blood
              </h1>
              <p className="text-sm text-accent">
                Blood is placed on a card or slide with different sections.
              </p>
            </div>
            <div>
              <div>
                <MdWbIncandescent className="text-5xl text-primary" />
              </div>
              <h1 className="text-lg text-accent font-semibold my-2">
                Incubation
              </h1>
              <p className="text-sm text-accent">
                The blood mixes with antibodies and sits for a few minutes.
              </p>
            </div>
            <div>
              <div>
                <TbReportSearch className="text-5xl text-primary" />
              </div>
              <h1 className="text-lg text-accent font-semibold my-2">
                Observation
              </h1>
              <p className="text-sm text-accent">
                The blood mixes with antibodies and sits for a few minutes.
              </p>
            </div>
            <div>
              <div>
                <IoCloudDone className="text-5xl text-primary" />
              </div>
              <h1 className="text-lg text-accent font-semibold my-2">
                Confirmation
              </h1>
              <p className="text-sm text-accent">
                Results are confirmed and recorded in your medical records.
              </p>
            </div>
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
