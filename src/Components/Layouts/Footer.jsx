"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/src/assets/Image/logo/logo.png";
import {
  FaFacebookF,
  FaGooglePlay,
  FaInstagram,
  FaTwitch,
  FaTwitter,
} from "react-icons/fa";
import { useTranslation } from "@/src/Hook/useTranslation";

const Footer = () => {
  const { t } = useTranslation();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/files/hemoglobin-app.apk";
    link.download = "hemoglobin-app.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="bg-primary px-10 py-16 ">
        <div className="sm:w-[80%]  sm:mx-auto">
          <div className="grid sm:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-5 mb-5">
            {/* Logo and tagline */}
            <div className="mx-auto">
              <Link href={"/"}>
                <Image
                  src={logo}
                  width={200}
                  height={200}
                  alt={t("footer.logoAlt")}
                />
              </Link>
              <h1 className="text-base my-3 text-white">
                {t("footer.tagline")}
              </h1>
            </div>

            {/* Important Links */}
            <div className="mx-auto">
              <h2 className="text-white text-lg font-semibold mb-1">
                {t("footer.links.title")}
              </h2>
              <Link href={"/blood-bank"}>
                <h2 className="text-white text-sm mb-1">
                  {t("footer.links.bloodBank")}
                </h2>
              </Link>
              <Link href={"/campaigns"}>
                <h2 className="text-white text-sm mb-1">
                  {t("footer.links.campaigns")}
                </h2>
              </Link>
              <Link href={"/volunteers"}>
                <h2 className="text-white text-sm mb-1">
                  {t("footer.links.leaders")}
                </h2>
              </Link>
              <Link href={"/media"}>
                <h2 className="text-white text-sm mb-1">
                  {t("footer.links.media")}
                </h2>
              </Link>
            </div>

            {/* Account Section */}
            <div className="mx-auto">
              <h2 className="text-white font-semibold">
                {t("footer.account.prompt")}
              </h2>
              <Link href={"/register"}>
                <h2 className="text-white text-sm mb-1">
                  {t("footer.account.signUp")}
                </h2>
              </Link>
              <Link href={"/login"}>
                <h2 className="text-white text-sm mb-1">
                  {t("footer.account.login")}
                </h2>
              </Link>
              <div className="flex flex-col items-start mt-4">
                <button
                  onClick={handleDownload}
                  className="group relative overflow-hidden bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white text-xs rounded px-4 py-2 flex items-center gap-2 shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
                >
                  <span className="absolute left-0 top-0 w-1 h-full bg-sky-300 group-hover:w-full group-hover:bg-sky-500 transition-all duration-300 opacity-20"></span>
                  <FaGooglePlay className="text-white text-2xl  animate-pulse group-hover:animate-none" />
                  <span className="relative z-10 font-semibold text-sm tracking-wide">
                    Get our mobile app
                  </span>
                </button>
                <span className="text-sky-200 text-xs mt-2 flex items-center gap-1 animate-pulse">
                  <svg
                    className="w-3 h-3 text-sky-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13v4h3l-4 5-4-5h3V5h2z" />
                  </svg>
                  Download now for exclusive features!
                </span>
              </div>
            </div>

            {/* About and Social */}
            <div className="mx-auto">
              <h2 className="text-white text-lg font-semibold mb-1">
                {t("footer.about.title")}
              </h2>
              <Link href={"/about"}>
                <h2 className="text-white text-sm mb-1">
                  {t("footer.about.aboutUs")}
                </h2>
              </Link>
              <Link href={"/contact"}>
                <h2 className="text-white text-sm mb-1">
                  {t("footer.about.contact")}
                </h2>
              </Link>
              <div className="flex items-center gap-5 my-4">
                <FaFacebookF className="text-3xl p-2 border border-gray-400 text-white hover:bg-blue-700 hover:text-white" />
                <FaInstagram className="text-3xl p-2 border border-gray-400 text-white hover:bg-rose-700 hover:text-white" />
                <FaTwitch className="text-3xl p-2 border border-gray-400 text-white hover:bg-purple-700 hover:text-white" />
                <FaTwitter className="text-3xl p-2 border border-gray-400 text-white hover:bg-sky-700 hover:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
