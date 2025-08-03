"use client";
import Image from "next/image";
import React from "react";
import bloodBank from "@/src/assets/Image/bloodBank.png";
import AllCampaigns from "@/src/Components/UI/Campaigns/AllCampaigns";
import { useTranslation } from "@/src/Hook/useTranslation";
import { useAuth } from "@/src/Hook/AuthContext";
import Link from "next/link";

const CampaignsPage = () => {
  const { t } = useTranslation();
  const { token } = useAuth();

  return (
    <div>
      <div>
        <div className="md:w-[90%] sm:mx-auto ">
          <section className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-tr from-[#f3f3f3] via-[#f2f2f2] to-[#e0e7ff] py-10 px-6 md:px-12 mb-8">
            <div className="flex flex-col-reverse md:flex-row items-center md:justify-between gap-8">
              <div className="w-full md:w-2/3 flex flex-col items-start">
                <h1 className="font-extrabold text-3xl md:text-5xl font-primary text-primary mb-3 drop-shadow-sm">
                  {t("campaigns.title")}
                </h1>
                <div className="h-2 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mb-4"></div>
                <p className="text-base md:text-lg text-accent mb-4 leading-relaxed">
                  {t("campaigns.subtitle")}
                </p>
                {!token && (
                  <Link href={"/register"}>
                    <button className="mt-2 px-6 py-2 bg-primary text-white rounded-full font-semibold shadow hover:bg-secondary transition">
                      {t("hero.registerButton")}
                    </button>
                  </Link>
                )}
              </div>
              <div className="w-full md:w-1/3 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl z-0"></div>
                  <Image
                    src={bloodBank}
                    width={260}
                    height={140}
                    alt={t("campaigns.imageAlt")}
                    className="relative z-10 drop-shadow-xl rounded-xl"
                  />
                </div>
              </div>
            </div>
          </section>

          <div>
            <AllCampaigns />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignsPage;
