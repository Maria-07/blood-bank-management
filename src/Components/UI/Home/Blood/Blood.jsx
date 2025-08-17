import React from "react";
import { FaHandPointRight } from "react-icons/fa";
import { useTranslation } from "@/src/Hook/useTranslation";

const Blood = () => {
  const { t } = useTranslation();
  return (
    <div>
      <section className="py-8 px-2 sm:py-10 sm:px-4 md:py-12 md:px-8 my-6 md:my-10 max-w-[100%] mx-auto">
        <div className="flex flex-col items-center mt-6 md:mt-8 pb-8 md:pb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gradient bg-gradient-to-r from-primary2 via-primary to-red-600 bg-clip-text text-transparent mb-3 md:mb-4 drop-shadow-lg tracking-tight">
            {t("bloodInfo.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary2 via-primary to-red-600 rounded-full mb-4"></div>
          <div className="text-lg md:text-xl text-gray-700 text-center  mx-auto leading-relaxed font-medium">
            {t("bloodInfo.importance")}
            <h3 className="text-primary font-semibold">
              {t("bloodInfo.importance2")}
            </h3>
          </div>
        </div>

        {/* Responsive grid for blood components and blood types */}
        <div className="mb-8 md:mb-12 grid grid-cols-1 gap-6 md:gap-8 mt-8 md:mt-10 lg:grid-cols-3">
          {/* Main Components of Blood - Timeline Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-white via-red-50 to-white rounded-2xl shadow-xl border border-primary/10 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-primary2 mb-5 sm:mb-8 flex items-center gap-2 sm:gap-3">
              <span className="w-2 sm:w-3 h-8 sm:h-10 bg-gradient-to-b from-primary2 to-primary rounded-full mr-2"></span>
              {t("bloodInfo.components.title")}
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
              {/* Timeline */}
              {[
                {
                  icon: (
                    <svg
                      className="w-7 h-7 sm:w-8 sm:h-8 text-primary2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <ellipse cx="12" cy="12" rx="10" ry="10" fill="#fbbf24" />
                    </svg>
                  ),
                  title: t("bloodInfo.components.plasma"),
                  desc: t("bloodInfo.components.plasmaDescription"),
                },
                {
                  icon: (
                    <svg
                      className="w-7 h-7 sm:w-8 sm:h-8 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" fill="#ef4444" />
                    </svg>
                  ),
                  title: t("bloodInfo.components.rbc"),
                  desc: (
                    <>
                      {t("bloodInfo.components.rbcDescription")}
                      <span className="italic text-gray-500">
                        ( {t("bloodInfo.components.rbcLifespan")} )
                      </span>
                    </>
                  ),
                },
                {
                  icon: (
                    <svg
                      className="w-7 h-7 sm:w-8 sm:h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="4"
                        y="4"
                        width="16"
                        height="16"
                        rx="8"
                        fill="#FFFFFF"
                      />
                    </svg>
                  ),
                  title: t("bloodInfo.components.wbc"),
                  desc: t("bloodInfo.components.wbcDescription"),
                },
                {
                  icon: (
                    <svg
                      className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <polygon points="12,2 22,22 2,22" fill="#facc15" />
                    </svg>
                  ),
                  title: t("bloodInfo.components.platelets"),
                  desc: t("bloodInfo.components.plateletsDescription"),
                },
              ].map((item, idx) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center relative w-full sm:w-auto"
                >
                  <div className="mb-1 sm:mb-2">{item.icon}</div>
                  <div className="font-bold text-base sm:text-lg text-primary2">
                    {item.title}
                  </div>
                  <div className="text-gray-700 text-xs sm:text-sm">
                    {item.desc}
                  </div>
                  {/* {idx < 3 && (
                    <div className="hidden sm:block absolute right-[-30px] md:right-[-40px] top-1/2 transform -translate-y-1/2 w-5 md:w-10 h-1 bg-gradient-to-r from-primary2 to-primary opacity-40"></div>
                  )} */}
                </div>
              ))}
            </div>
          </div>
          {/* Blood Types - Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-primary/10 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-primary2 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <span className="w-2 sm:w-3 h-8 sm:h-10 bg-gradient-to-b from-primary2 to-primary rounded-full mr-2"></span>
              {t("bloodInfo.bloodTypes.title")}
            </h3>
            <p className="mb-3 sm:mb-4 text-gray-700">
              <span className="font-semibold text-primary">
                {t("bloodInfo.bloodTypes.description")}
              </span>
            </p>
            <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
              {["A+", "A−", "B+", "B−", "O+", "O−", "AB+", "AB−"].map(
                (type) => (
                  <span
                    key={type}
                    className="bg-gradient-to-br from-primary2 to-primary text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl font-semibold shadow text-base sm:text-lg border border-primary2 text-center"
                  >
                    {type}
                  </span>
                )
              )}
            </div>
            <div className="mt-1 sm:mt-2">
              <p className="text-xs text-gray-500">
                <span className="font-semibold text-primary">
                  {t("bloodInfo.note.title")}:
                </span>{" "}
                {t("bloodInfo.note.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Health & Hemoglobin Section */}
        <div className="mb-8 md:mb-10 grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2">
          {/* How to Keep Your Blood Healthy */}
          <div className="bg-white rounded-2xl shadow-xl border border-primary/10 p-4 sm:p-6 md:p-8 flex flex-col hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-4 sm:mb-6">
              <span className="inline-block w-2 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-primary2 to-primary rounded-full mr-2 sm:mr-3"></span>
              <h3 className="text-xl sm:text-2xl font-bold text-primary2">
                {t("bloodInfo.healthTips.title")}
              </h3>
            </div>
            <ul className="space-y-2 sm:space-y-3 mt-1 sm:mt-2">
              <li className="flex items-start gap-2 sm:gap-3">
                <FaHandPointRight className="text-lg sm:text-xl text-primary mt-1" />
                <div>
                  <span className="font-semibold text-gray-900">
                    {t("bloodInfo.healthTips.tips")}
                  </span>{" "}
                  <span className="text-gray-700">
                    {t("bloodInfo.healthTips.tips1")}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <FaHandPointRight className="text-lg sm:text-xl text-primary mt-1" />
                <span className="font-semibold text-gray-900">
                  {t("bloodInfo.healthTips.tips2")}
                </span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <FaHandPointRight className="text-lg sm:text-xl text-primary mt-1" />
                <span className="font-semibold text-gray-900">
                  {t("bloodInfo.healthTips.tips3")}
                </span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <FaHandPointRight className="text-lg sm:text-xl text-primary mt-1" />
                <span className="font-semibold text-gray-900">
                  {t("bloodInfo.healthTips.tips4")}
                </span>
              </li>
            </ul>
          </div>

          {/* Hemoglobin & Its Production */}
          <div className="bg-white rounded-2xl shadow-xl border border-primary/10 p-4 sm:p-6 md:p-8 flex flex-col hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-4 sm:mb-6">
              <span className="inline-block w-2 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-primary2 to-primary rounded-full mr-2 sm:mr-3"></span>
              <h3 className="text-xl sm:text-2xl font-bold text-primary2">
                {t("bloodInfo.hemoglobin.title")}
              </h3>
            </div>
            <div className="mb-3 sm:mb-4 text-gray-700">
              <span className="font-semibold text-gray-900">
                {t("bloodInfo.hemoglobin.description1")}
              </span>{" "}
              {t("bloodInfo.hemoglobin.description2")}
            </div>
            <div className="mb-3 sm:mb-4">
              <div className="flex items-start gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-700">
                  {t("bloodInfo.hemoglobin.synthesis.heme")}
                </span>
              </div>
              <div className="flex items-start gap-1.5 sm:gap-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-700">
                  {t("bloodInfo.hemoglobin.synthesis.globin")}
                </span>
              </div>
            </div>
            <div>
              <div className="font-semibold text-primary2 mb-1 sm:mb-2">
                {t("bloodInfo.hemoglobin.keyFactors.title")}
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {[
                  t("bloodInfo.hemoglobin.keyFactors.iron"),
                  t("bloodInfo.hemoglobin.keyFactors.b12"),
                  t("bloodInfo.hemoglobin.keyFactors.vitaminA"),
                  t("bloodInfo.hemoglobin.keyFactors.betaCarotene"),
                  t("bloodInfo.hemoglobin.keyFactors.epo"),
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-gray-900 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8 md:mb-12">
          <div className="bg-gradient-to-br from-primary2 via-primary to-red-400 rounded-2xl shadow-lg border border-red-100 p-4 sm:p-6 md:p-8">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="bg-gradient-to-br from-primary2 to-primary rounded-full w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center mr-2 sm:mr-3 shadow">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {t("bloodInfo.transfusion.title")}
              </h3>
            </div>
            <p className="mb-3 sm:mb-4 text-white text-base sm:text-lg">
              {t("bloodInfo.transfusion.description1")}
              <span className="text-sky-500 font-semibold">
                {" "}
                {t("bloodInfo.transfusion.description2")}
              </span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100 flex flex-col">
                <div className="flex items-center mb-1 sm:mb-2">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-1 sm:mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C12 2 7 7.5 7 12C7 15.31 9.69 18 13 18C16.31 18 19 15.31 19 12C19 7.5 14 2 14 2H12Z" />
                  </svg>
                  <h4 className="font-semibold text-primary text-base sm:text-lg">
                    {t("bloodInfo.donorCriteria.title")}
                  </h4>
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-gray-800 pl-1 sm:pl-2">
                  <li>
                    <span className="font-semibold text-primary2">
                      {t("bloodInfo.donorCriteria.criteria.age")}:
                    </span>{" "}
                    {t("bloodInfo.donorCriteria.criteria.age1")}
                  </li>
                  <li>
                    <span className="font-semibold text-primary2">
                      {t("bloodInfo.donorCriteria.criteria.weight")}:
                    </span>{" "}
                    {t("bloodInfo.donorCriteria.criteria.weight1")}
                  </li>
                  <li>
                    <span className="font-semibold text-primary2">
                      {t("bloodInfo.donorCriteria.criteria.hemoglobin")}:
                    </span>{" "}
                    {t("bloodInfo.donorCriteria.criteria.hemoglobin1")}
                  </li>
                  <li>
                    <span className="font-semibold text-primary2">
                      {t("bloodInfo.donorCriteria.criteria.maleFreq")}:
                    </span>{" "}
                    {t("bloodInfo.donorCriteria.criteria.maleFreq1")}
                  </li>
                  <li>
                    <span className="font-semibold text-primary2">
                      {t("bloodInfo.donorCriteria.criteria.femaleFreq")}:
                    </span>{" "}
                    {t("bloodInfo.donorCriteria.criteria.femaleFreq1")}
                  </li>
                  <li>
                    <span className="font-semibold text-primary2">
                      {t("bloodInfo.donorCriteria.criteria.disqualify")}:
                    </span>{" "}
                    {t("bloodInfo.donorCriteria.criteria.disqualify1")}
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100 flex flex-col">
                <div className="flex items-center mb-1 sm:mb-2">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mr-1 sm:mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                  </svg>
                  <h4 className="font-semibold text-red-600 text-base sm:text-lg">
                    {t("bloodInfo.caution.title")}
                  </h4>
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-gray-800 pl-1 sm:pl-2">
                  <li>
                    <span className="font-semibold text-red-600">
                      {t("bloodInfo.caution.description")}
                    </span>{" "}
                    {t("bloodInfo.caution.description1")}
                  </li>
                  <li>
                    <span className="font-semibold text-red-600">TA-GVHD</span>{" "}
                    {t("bloodInfo.caution.description3")}
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center mb-4 sm:mb-6 mt-8 sm:mt-10 ">
              <div className="bg-gradient-to-br from-primary2 to-primary rounded-full w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center mr-2 sm:mr-3 shadow">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {t("bloodInfo.instructions.title")}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100 flex flex-col">
                <div className="flex items-center mb-1 sm:mb-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-1 sm:mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <h4 className="font-semibold text-primary text-base sm:text-lg">
                    {t("bloodInfo.instructions.before.title")}
                  </h4>
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-gray-800 pl-1 sm:pl-2">
                  <li className="flex items-center gap-1.5 sm:gap-2">
                    <FaHandPointRight className="text-primary" />
                    {t("bloodInfo.instructions.before.hydrate")}
                  </li>
                  <li className="flex items-center gap-1.5 sm:gap-2">
                    <FaHandPointRight className="text-primary" />
                    {t("bloodInfo.instructions.before.meal")}
                  </li>
                  <li className="flex items-center gap-1.5 sm:gap-2">
                    <FaHandPointRight className="text-primary" />
                    {t("bloodInfo.instructions.before.sleep")}
                  </li>
                  <li className="flex items-center gap-1.5 sm:gap-2">
                    <FaHandPointRight className="text-primary" />
                    {t("bloodInfo.instructions.before.exercise")}
                  </li>
                  <li className="flex items-center gap-1.5 sm:gap-2">
                    <FaHandPointRight className="text-primary" />
                    {t("bloodInfo.instructions.before.medication")}
                  </li>
                  <li className="flex items-center gap-1.5 sm:gap-2">
                    <FaHandPointRight className="text-primary" />
                    {t("bloodInfo.instructions.before.honesty")}
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100 flex flex-col">
                <div className="flex items-center mb-1 sm:mb-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-1 sm:mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                  <h4 className="font-semibold text-primary text-base sm:text-lg">
                    {t("bloodInfo.instructions.during.title")}
                  </h4>
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-gray-800 pl-1 sm:pl-2">
                  <li className="flex items-center gap-1.5 sm:gap-2">
                    <FaHandPointRight className="text-primary" />
                    {t("bloodInfo.instructions.during.followInstructions")}
                  </li>
                  <li className="flex items-center gap-1.5 sm:gap-2">
                    <FaHandPointRight className="text-primary" />
                    {t("bloodInfo.instructions.during.stayCalm")}
                  </li>
                  <li className="flex items-center gap-1.5 sm:gap-2">
                    <FaHandPointRight className="text-primary" />
                    {t("bloodInfo.instructions.during.reportDiscomfort")}
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100 flex flex-col">
                <div className="flex items-center mb-1 sm:mb-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-1 sm:mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <h4 className="font-semibold text-primary text-base sm:text-lg">
                    {t("bloodInfo.instructions.after.title")}
                  </h4>
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-gray-800 pl-1 sm:pl-2">
                  <li className="flex items-center gap-1.5 sm:gap-2">
                    <FaHandPointRight className="text-primary" />
                    {t("bloodInfo.instructions.after.fluids")}
                  </li>
                  <li className="flex items-center gap-1.5 sm:gap-2">
                    <FaHandPointRight className="text-primary" />
                    {t("bloodInfo.instructions.after.rest")}
                  </li>
                  <li className="flex items-center gap-1.5 sm:gap-2">
                    <FaHandPointRight className="text-primary" />
                    {t("bloodInfo.instructions.after.staffAdvice")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 md:mt-8 text-center text-base sm:text-lg text-primary2 font-semibold">
          {t("bloodInfo.info.details")}
        </p>
      </section>
    </div>
  );
};

export default Blood;
