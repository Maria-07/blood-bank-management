"use client";

import Image from "next/image";
import React from "react";
import loginLogo from "@/src/assets/video/loginLogo.gif";
import blood from "@/src/assets/Image/logo/darkLogo.png";
import Link from "next/link";
import Login from "@/src/Components/UI/Auth/Login";
import { useTranslation } from "@/src/Hook/useTranslation";

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div className="sm:w-[70%] sm:mx-auto mt-[10%] my-10 px-5">
      <div className="grid sm:grid-cols-2 grid-cols-1">
        {/* Left side: Animation/Image */}
        <div className="mx-auto">
          <Image
            src={loginLogo}
            width={"auto"}
            height={"auto"}
            alt="Login animation"
          />
        </div>

        {/* Right side: Login Form */}
        <div className="sm:mx-auto">
          <div className="mb-3">
            <Image src={blood} width={70} height={70} alt="Logo" />
          </div>

          <h1 className="font-primary text-2xl font-bold text-primary mb-2">
            {t("loginPage.welcome")}
          </h1>

          <span>{t("loginPage.slogan")}</span>

          <Login />

          <div className="text-sm font-medium text-gray-600 flex gap-2 my-5">
            {t("loginPage.noAccount")}
            <Link href="/register">
              <button className="text-primary font-semibold">
                {t("loginPage.registerNow")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
