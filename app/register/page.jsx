"use client";
import Image from "next/image";
import React from "react";
import blood from "@/src/assets/Image/logo/darkLogo.png";
import Link from "next/link";
import Register from "../../src/Components/UI/Auth/Register";
import { useTranslation } from "@/src/Hook/useTranslation";

const RegistrationPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="sm:w-[90%] sm:mx-auto mb-16 px-5">
        <div className="grid lg:grid-cols-3 grid-cols-1">
          <div className="flex items-center justify-center">
            <div className="mx-auto my-auto px-5 sm:py-32 border-r-[1px]">
              <Image
                src={blood}
                width={200}
                height={200}
                alt="Hemoglobin Logo"
                className="mx-auto"
              />
              <div className="my-7">
                <h1 className="text-center font-primary text-2xl font-bold text-primary mb-2">
                  {t("register.welcome")}
                </h1>
                <h2 className="text-center">{t("register.subtitle")}</h2>
                <div className="text-sm text-gray-600 mb-5">
                  <p className="my-2">{t("register.description1")}</p>
                  {t("register.description2")}
                  <p className="text-base font-semibold my-1">
                    {t("register.tagline")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:mx-auto sm:col-span-2 px-5">
            <Register />
            <div className="text-sm font-medium text-gray-600 items-center flex gap-2 mb-5">
              {t("register.already")}
              <Link href="/login">
                <button className="text-primary font-semibold">
                  {t("register.login")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
