import React from "react";
import media from "@/src/assets/Image/media.png";
import Image from "next/image";
import MediaTab from "@/src/Components/UI/Media/MediaTab";

const MediaPage = () => {
  return (
    <div>
      {" "}
      <div className="md:w-[90%] sm:mx-auto ">
        <div className="pt-8 bg-[#F2F2F2] rounded-xl shadow-md py-2  px-5 ">
          <div className="md:w-[100%] sm:mx-auto grid sm:grid-cols-2 grid-cols-1 gap-3 items-center justify-between">
            <div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sm:pl-10"
            >
              <h1 className="font-bold lg:text-7xl text-4xl font-primary">
                Media
              </h1>
              <hr className="p-[2px] bg-primary w-[22%]" />
              <p className="text-sm text-accent lg:w-[55%] my-3">
                Search for blood donors in your area quickly and conveniently.
              </p>
            </div>

            <div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Image
                src={media}
                width={400}
                height={400}
                alt="Picture of the author"
              ></Image>
            </div>
          </div>
        </div>

        <div>
          {" "}
          <MediaTab></MediaTab>{" "}
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
