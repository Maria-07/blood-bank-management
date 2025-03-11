import React from "react";
import media from "@/src/assets/Image/media.png";
import Image from "next/image";
import MediaTab from "@/src/Components/UI/Media/MediaTab";

const MediaPage = () => {
  return (
    <div>
      {" "}
      <div className="md:w-[90%] sm:mx-auto ">
        <div className="py-5 bg-[#F2F2F2] rounded-xl shadow-md   px-5 ">
          <div className="md:w-[100%] sm:mx-auto grid sm:grid-cols-2 grid-cols-1 gap-3 items-center justify-between">
            <div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sm:pl-10"
            >
              <h1 className="font-bold lg:text-6xl text-3xl font-primary">
                Media
              </h1>
              <hr className="p-[2px] bg-primary w-[22%]" />
              <p className="text-sm text-accent  my-3">
                Every drop counts, every story matters. Through these images and
                videos, witness the selfless acts of blood donors, the joy of
                lives saved, and the power of humanity in action. Let these
                moments inspire you to be the reason someone gets a second
                chance. Together, we create a legacy of hope, one donation at a
                time!
              </p>
            </div>

            <div
              className="flex items-center justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Image
                src={media}
                width={200}
                height={80}
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
