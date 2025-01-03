import React from "react";
// import { motion } from "motion/react";
import Image from "next/image";
import banner from "@/assets/Image/banner.png";
import Count from "./Count";
import Filters from "./Filter/Filters";

const HeroBanner = () => {
  return (
    <div className="hero-bg">
      <div className="pt-8 px-3">
        <div className="md:w-[100%] sm:mx-auto flex sm:flex-nowrap flex-wrap gap-3 items-center justify-between">
          <div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className=""
          >
            <h1 className="font-bold lg:text-7xl text-4xl font-primary">
              Find Life-Saving <br /> Blood Donors Easily
            </h1>
            <p className="text-lg text-accent lg:w-[55%] my-3">
              Search for blood donors in your area quickly and conveniently.
              Filter results by blood group, location, and availability.
              Register now to access donor contact information and help save
              lives today.
            </p>
            <div className="my-3">
              <button className="bb-input-button">
                Register to Save Lives
              </button>
            </div>
            <div className="my-7">
              <Count></Count>
            </div>
          </div>

          <div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Image
              src={banner}
              width={500}
              height={600}
              alt="Picture of the author"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
