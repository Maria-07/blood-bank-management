"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/src/assets/Image/logo/logo.png";
import { FaFacebookF, FaInstagram, FaTwitch, FaTwitter } from "react-icons/fa";
import { useTranslation } from "@/src/Hook/useTranslation";

const Footer = () => {
  const { t } = useTranslation();

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
