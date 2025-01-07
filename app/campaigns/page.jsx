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
          <div className="pt-8 bg-[#F2F2F2] rounded-xl shadow-md py-2  px-5 ">
            <div className="md:w-[100%] sm:mx-auto grid sm:grid-cols-2 grid-cols-1 gap-3 items-center justify-between">
              <div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className=""
              >
                <h1 className="font-bold lg:text-7xl text-4xl font-primary">
                  Campaigns
                </h1>
                <hr className="p-[2px] bg-primary w-[22%]" />
                <p className="text-sm text-accent lg:w-[55%] my-3">
                  Search for blood donors in your area quickly and conveniently.
                  Filter results by blood group.
                </p>
              </div>

              <div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Image
                  src={bloodBank}
                  width={500}
                  height={600}
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
