/* eslint-disable react/jsx-key */
import Image from "next/image";
import React from "react";
import work from "@/src/assets/Image/pana.png";
import { GiCorkedTube } from "react-icons/gi";
import { GrWorkshop } from "react-icons/gr";
import { BiDonateBlood } from "react-icons/bi";
import { MdWbIncandescent } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { IoCloudDone } from "react-icons/io5";
import { useTranslation } from "@/src/Hook/useTranslation";

const icons = [
  <GiCorkedTube className="text-5xl text-primary" />,
  <GrWorkshop className="text-5xl text-primary" />,
  <BiDonateBlood className="text-5xl text-primary" />,
  <MdWbIncandescent className="text-5xl text-primary" />,
  <TbReportSearch className="text-5xl text-primary" />,
  <IoCloudDone className="text-5xl text-primary" />,
];

const Works = () => {
  const { t } = useTranslation();
  const steps = t("works.steps");

  return (
    <div className="py-12 px-4 bg-gradient-to-br from-red-50 via-white to-red-100 rounded-xl shadow-lg  mx-auto">
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 my-20">
        <div className="p-5">
          <h1 className=" text-6xl font-semibold  ">{t("works.title")}</h1>
          <p className="text-sm text-accent my-2 tracking-wide ">
            {t("works.subtitle")}
          </p>

          <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 my-10">
            {Array.isArray(steps) &&
              steps.map((step, i) => (
                <div key={`step-${i}`}>
                  <div>{icons[i] || icons[0]}</div>
                  <h1 className="text-lg text-accent font-semibold my-2">
                    {step?.title || `Step ${i + 1}`}
                  </h1>
                  <p className="text-sm text-accent">{step?.desc || ""}</p>
                </div>
              ))}
          </div>
        </div>

        <div>
          <Image
            src={work}
            width={500}
            height={400}
            alt="Work Process"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Works;
