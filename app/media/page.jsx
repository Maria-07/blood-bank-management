"use client";
import React from "react";
import media from "@/src/assets/Image/media.png";
import Image from "next/image";
import MediaTab from "@/src/Components/UI/Media/MediaTab";
import { useTranslation } from "@/src/Hook/useTranslation";

const MediaPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="md:w-[90%] sm:mx-auto ">
        <div className="py-5 bg-[#F2F2F2] rounded-xl shadow-md px-5 ">
          <div className="md:w-[100%] sm:mx-auto grid sm:grid-cols-2 grid-cols-1 gap-3 items-center justify-between">
            <div className="sm:pl-10">
              <h1 className="font-bold lg:text-6xl text-3xl font-primary">
                {t("media.title")}
              </h1>
              <hr className="p-[2px] bg-primary w-[22%]" />
              <p className="text-sm text-accent my-3">{t("media.subtitle")}</p>
            </div>

            <div className="flex items-center justify-center">
              <Image
                src={media}
                width={200}
                height={80}
                alt={t("media.imageAlt")}
              />
            </div>
          </div>
        </div>

        <div>
          <MediaTab />
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
