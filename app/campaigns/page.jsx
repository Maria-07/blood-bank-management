import Image from "next/image";
import React from "react";
import bloodBank from "@/src/assets/Image/bloodBank.png";
import AllCampaigns from "@/src/Components/UI/Campaigns/AllCampaigns";

const CampaignsPage = () => {
  return (
    <div>
      {" "}
      <div>
        <div className="md:w-[90%] sm:mx-auto ">
          <div className="py-5 bg-[#F2F2F2] rounded-xl shadow-md   px-5 ">
            <div className="md:w-[100%] sm:mx-auto grid sm:grid-cols-2 grid-cols-1 gap-3 items-center justify-between">
              <div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="sm:pl-10"
              >
                <h1 className="font-bold lg:text-5xl text-3xl font-primary">
                  Campaigns
                </h1>
                <hr className="p-[2px] bg-primary w-[22%]" />
                <p className="text-sm text-accent  my-3">
                Every drop of blood counts. By donating blood, you’re not just giving a part of yourself; you’re giving someone a second chance at life. With every donation, you can save up to three lives. It’s a simple act that can make an extraordinary difference. Join the movement today—be a hero, share the gift of life, and inspire others to do the same. Donate blood, save lives, and make the world a healthier place for all.
                </p>
              </div>

              <div
                className="flex items-center justify-center"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Image
                  src={bloodBank}
                  width={220}
                  height={100}
                  alt="Picture of the author"
                ></Image>
              </div>
            </div>
          </div>

          <div>
            <div>
              <AllCampaigns></AllCampaigns>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignsPage;
