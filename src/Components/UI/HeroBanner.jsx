"use client";

import React from "react";
import Image from "next/image";
import banner from "@/src/assets/Image/logo/heroBanner.png";
import Count from "./Count";
import { useAuth } from "@/src/Hook/AuthContext";
import Link from "next/link";
import { useTranslation } from "@/src/Hook/useTranslation";

const HeroBanner = () => {
  const { token } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="hero-bg">
      <div className="pt-8">
        <div className="grid sm:grid-cols-4 grid-cols-1 gap-2">
          <div className="sm:col-span-3 my-auto">
            <div>
              <h1 className="font-bold lg:text-7xl text-4xl font-primary">
                {t("hero.headlineParts")[0]} <br /> {t("hero.headlineParts")[1]}
              </h1>
              <p className="text-lg text-accent lg:w-[55%] my-3">
                {t("hero.description")}
              </p>

              {!token && (
                <div className="my-3">
                  <Link href={"/register"}>
                    <button className="bb-input-button">
                      {t("hero.registerButton")}
                    </button>
                  </Link>
                </div>
              )}

              <div className="my-7">
                <Count t={t} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Image src={banner} width={350} height={450} alt="Banner" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
