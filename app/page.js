"use client";
import React from "react";
import { motion } from "framer-motion";
import HeroBanner from "../src/Components/UI/HeroBanner";
import DonarCards from "../src/Components/UI/Home/DonarCards/DonarCards";
import Campaigns from "../src/Components/UI/Home/Campaigns/Campaigns";
import Works from "../src/Components/UI/Home/Works/Works";
import Volunteers from "../src/Components/UI/Home/Volunteers/Volunteers";

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const HomePage = () => {
  return (
    <div>
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
    </div>
  );
};

export default HomePage;
