"use client";
import React from "react";
import { motion } from "framer-motion";
import HeroBanner from "../src/Components/UI/HeroBanner";
import DonarCards from "../src/Components/UI/Home/DonarCards/DonarCards";
import Campaigns from "../src/Components/UI/Home/Campaigns/Campaigns";
import Works from "../src/Components/UI/Home/Works/Works";
import Volunteers from "../src/Components/UI/Home/Volunteers/Volunteers";
import Blood from "@/src/Components/UI/Home/Blood/Blood";
import Reviews from "@/src/Components/UI/Home/Reviews/Reviews";
import AdSense from "@/src/Components/UI/AdSense/AdSense";

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const HomePage = () => {
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

      {/* AdSense Banner Ad - After Hero */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariants}
        className="md:w-[90%] sm:mx-auto"
      >
        <AdSense
          adSlot="YOUR_AD_SLOT_ID_1"
          adFormat="horizontal"
          className="w-full"
        />
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

      {/* AdSense In-Article Ad - After Campaigns */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariants}
        className="md:w-[90%] sm:mx-auto"
      >
        <AdSense
          adSlot="YOUR_AD_SLOT_ID_2"
          adFormat="auto"
          className="w-full"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInVariants}
        className="md:w-[90%] sm:mx-auto py-2"
      >
        <Blood />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInVariants}
        className="md:w-[90%] sm:mx-auto py-2 "
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
        className="mt-10 bg-gradient-to-r from-red-500 via-red-400 to-pink-400"
      >
        <Reviews />
      </motion.div>

      {/* AdSense Banner Ad - Before Footer */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariants}
        className="md:w-[90%] sm:mx-auto mt-8"
      >
        <AdSense
          adSlot="YOUR_AD_SLOT_ID_3"
          adFormat="horizontal"
          className="w-full"
        />
      </motion.div>
    </div>
  );
};

export default HomePage;
