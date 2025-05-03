"use client";

import React from "react";
// import { motion } from "motion/react";
import Image from "next/image";
import banner from "@/src/assets/Image/logo/heroBanner.png";
import Count from "./Count";
import { useAuth } from "@/src/Hook/AuthContext";
import Link from "next/link";

const HeroBanner = () => {
  const { token } = useAuth();
  return (
    <div className="hero-bg">
      <div className="pt-8">
        <div className="grid sm:grid-cols-4 grid-cols-1 gap-2">
          {/* <div className="md:w-[100%] sm:mx-auto flex sm:flex-nowrap flex-wrap gap-3 items-center justify-around"> */}
          <div className="sm:col-span-3 my-auto">
            <div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
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
              {!token && (
                <div className="my-3">
                  <Link href={'/register'}>  <button className="bb-input-button">
                    Register to Save Lives
                  </button></Link>
                
                </div>
              )}
              <div className="my-7">
                <Count></Count>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-centers">
            <div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Image
                src={banner}
                width={350}
                height={450}
                alt="Picture of the author"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
