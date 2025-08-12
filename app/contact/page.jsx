"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import contact from "@/src/assets/Image/contact.png";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { getUserDetails } from "@/src/Hook/authUtils";
import { useTranslation } from "@/src/Hook/useTranslation";
import { useGetEmergencyContactsQuery } from "@/src/redux/features/contacts/contact";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ContactPage = () => {
  const type = getUserDetails();
  const { t } = useTranslation();
  const [emergencyContact, setEmergencyContact] = useState(null);

  const { data: emergencyContactData, isLoading: isEmergencyContactsLoading } =
    useGetEmergencyContactsQuery({
      pageNo: 1,
      pageSize: 10,
    });

  useEffect(() => {
    if (emergencyContactData?.data?.data?.length > 0) {
      setEmergencyContact(emergencyContactData?.data?.data);
    }
  }, [emergencyContactData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      toast.error(t("contact.errors.unauthorized"));
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contact/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (responseData?.data?.isSuccess) {
        toast.success(responseData?.data?.message || t("contact.success"));
        reset();
      } else {
        const errorText = await response?.data?.text();
        // handle error if needed
      }
    } catch (error) {
      toast.error(t("contact.errors.unexpected"));
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="md:w-[90%] sm:mx-auto">
      <section className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-tr from-[#f3f3f3] via-[#f2f2f2] to-[#e0e7ff] py-10 px-6 md:px-12 mb-8">
        <div className="flex flex-col-reverse md:flex-row items-center md:justify-between gap-8">
          <div className="w-full md:w-2/3 flex flex-col items-start">
            <h1 className="font-extrabold text-3xl md:text-5xl font-primary text-primary mb-3 drop-shadow-sm">
              {t("contact.heading")}
            </h1>
            <div className="h-2 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mb-4"></div>
            <p className="text-base md:text-lg text-accent mb-4 leading-relaxed">
              {t("contact.description")}
            </p>
          </div>
          <div className="w-full md:w-1/3 flex items-center justify-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl z-0"></div>
              <Image
                src={contact}
                width={320}
                height={320}
                alt="Contact illustration"
                className="relative z-10 drop-shadow-xl rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="my-4">
        {emergencyContact && emergencyContact.length > 0 ? (
          <Slider {...settings}>
            {emergencyContact.map((contact) => (
              <div
                key={contact.id}
                className="px-3 pb-4" // Add horizontal gap between slides
              >
                <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-gray-200 hover:shadow-2xl transition-all duration-300 group min-h-[280px] cursor-pointer">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-primary2 to-secondary rounded-full flex items-center justify-center shadow-lg border-4 border-white mb-5">
                    <span className="text-white text-3xl font-bold uppercase tracking-wide">
                      {contact.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center w-full">
                    <h2 className="text-xl font-semibold text-gray-900 mb-1 text-center tracking-wide">
                      {contact.fullName}
                    </h2>
                    <span className="text-base text-gray-500 mb-2 text-center">
                      {contact.mobileNumber}
                    </span>
                    <div className="w-10 h-1 bg-gradient-to-r from-primary2 to-secondary rounded-full mb-2"></div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-accent text-center text-base py-6">
            {t("leaders.emergencyContactFailed")}
          </div>
        )}
      </div>

      {/* form  */}
      <div className="w-full mx-auto my-10 p-0 rounded-xl border shadow-lg bg-gradient-to-br from-[#e0e7ff] via-[#f3f3f3] to-[#f2f2f2]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-0 md:gap-8"
        >
          <div className="flex-1 p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-8 text-primary font-primary">
              {t("contact.form.title")}
            </h2>
            <div className="mb-6">
              <label className="input-title block mb-2">
                {t("contact.form.type")} <span className="text-red-600">*</span>
              </label>
              <select
                className="input-select-border w-full mb-1 bg-white/80 focus:bg-white"
                {...register("contactType", {
                  required: {
                    value: true,
                    message: t("contact.form.errors.typeRequired"),
                  },
                })}
              >
                <option value="">{t("contact.form.select")}</option>
                <option value="Contact">
                  {t("contact.form.types.contact")}
                </option>
                <option value="Complain">
                  {t("contact.form.types.complain")}
                </option>
                <option value="Suggestion">
                  {t("contact.form.types.suggestion")}
                </option>
              </select>
              {errors.contactType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactType.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label className="input-title block mb-2">
                {t("contact.form.subject")}
              </label>
              <input
                type="text"
                className="input-border w-full mb-1 bg-white/80 focus:bg-white"
                {...register("subject")}
                placeholder={t("contact.form.subjectPlaceholder")}
              />
            </div>
            <div className="mb-6">
              <label className="input-title block mb-2">
                {t("contact.form.message")}
              </label>
              <textarea
                className="input-border w-full min-h-[120px] mb-1 bg-white/80 focus:bg-white resize-y"
                {...register("message")}
                placeholder={t("contact.form.messagePlaceholder")}
              />
            </div>
            <div className="flex items-center gap-4 mt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {t("contact.form.button")}
              </button>
            </div>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-tl from-primary/10 via-secondary/10 to-primary2/10 rounded-r-xl p-8">
            <div className="w-full flex flex-col items-center">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-6"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="60"
                  fill="#6366F1"
                  fillOpacity="0.08"
                />
                <path
                  d="M40 60c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20zm20-12a12 12 0 100 24 12 12 0 000-24z"
                  fill="#6366F1"
                />
              </svg>
              <p className="text-lg text-primary2 text-center font-semibold mb-2">
                {t("contact.right.feedbackTitle")}
              </p>
              <p className="text-accent text-center text-sm">
                {t("contact.right.feedbackDesc")}
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                  <span className="font-semibold text-primary2">
                    {t("contact.types.general")}
                  </span>
                  <span className="text-accent">
                    {t("contact.types.generalDesc")}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-secondary rounded-full"></span>
                  <span className="font-semibold text-primary2">
                    {t("contact.types.complain")}
                  </span>
                  <span className="text-accent">
                    {t("contact.types.complainDesc")}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-primary2 rounded-full"></span>
                  <span className="font-semibold text-primary2">
                    {t("contact.types.suggestion")}
                  </span>
                  <span className="text-accent">
                    {t("contact.types.suggestionDesc")}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
