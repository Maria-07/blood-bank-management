"use client";
import React from "react";
import { motion } from "framer-motion";
import HeroBanner from "../src/Components/UI/HeroBanner";
import DonarCards from "../src/Components/UI/Home/DonarCards/DonarCards";
import Campaigns from "../src/Components/UI/Home/Campaigns/Campaigns";
import Works from "../src/Components/UI/Home/Works/Works";
import Volunteers from "../src/Components/UI/Home/Volunteers/Volunteers";
import { FaMobileAlt } from "react-icons/fa";

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const HomePage = () => {
  const handleDownload = () => {
    const downloadUrl =
      "https://expo.dev/accounts/rajaul2810/projects/hemoglobin/builds/c768b1ef-ac34-44c0-83c3-d4cd64fc3a9e"; // real .apk link
    window.location.href = downloadUrl;
  };
  return (
    <div className="px-2">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInVariants}
        className="md:w-[90%] sm:mx-auto py-2"
      >
        <HeroBanner />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInVariants}
        className="mb-10"
      >
        <DonarCards />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInVariants}
      >
        <Campaigns />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInVariants}
        className="md:w-[90%] sm:mx-auto py-2"
      >
        <Works />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInVariants}
        className="md:w-[90%] sm:mx-auto py-2"
      >
        <Volunteers />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInVariants}
        className="md:w-[90%] sm:mx-auto py-8 flex justify-center"
      >
        <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6 px-8 py-6 w-full md:w-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-lg shadow-md border-2 border-white bg-white">
              <FaMobileAlt className="text-green-600 text-3xl" />
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold mb-1">
                Get Our Mobile App
              </h2>
              <p className="text-green-100 text-sm">
                Experience all features on the go. Download now!
              </p>
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="mt-4 md:mt-0 px-6 py-3 bg-white text-green-700 font-semibold rounded-lg shadow hover:bg-green-100 transition"
          >
            <span className="flex items-center gap-2">
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
                  d="M12 4v16m0 0l-6-6m6 6l6-6"
                />
              </svg>
              Install Mobile App
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
