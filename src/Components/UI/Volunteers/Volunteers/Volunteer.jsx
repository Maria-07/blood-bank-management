import { Card, Image } from "antd";
import React from "react";

const Volunteer = () => {
  return (
    <div>
      <Card
        hoverable
        className="bg-white border-[1px] border-gray-200 shadow-md p-5"
      >
        <div className="flex items-end justify-end">
          <h1 className="text-4xl font-bold text-primary">AB+</h1>
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Image
            className="border rounded-full"
            src={
              "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
            }
            width={200}
            height={200}
            alt="Picture of the author"
          ></Image>
        </div>
        <div className="text-center mt-5">
          <h1 className=" gap-1 text-lg font-semibold">Michael Smith</h1>
          <span className="text-sm text-accent">
            64167 Keanu Throughway, North Jackland,
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Volunteer;
