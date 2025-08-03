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
        <section className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-tr from-[#f3f3f3] via-[#f2f2f2] to-[#e0e7ff] py-10 px-6 md:px-12 mb-8">
          <div className="flex flex-col-reverse md:flex-row items-center md:justify-between gap-8">
            {/* Left: Text Content */}
            <div className="w-full md:w-2/3 flex flex-col items-start">
              <h1 className="font-extrabold text-3xl md:text-5xl font-primary text-primary mb-3 drop-shadow-sm">
                {t("media.title")}
              </h1>
              <div className="h-2 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mb-4"></div>
              <p className="text-base md:text-lg text-accent mb-4 leading-relaxed">
                {t("media.subtitle")}
              </p>
            </div>
            {/* Right: Image */}
            <div className="w-full md:w-1/3 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl z-0"></div>
                <Image
                  src={media}
                  width={260}
                  height={140}
                  alt={t("media.imageAlt")}
                  className="relative z-10 drop-shadow-xl rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <div>
          <MediaTab />
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
