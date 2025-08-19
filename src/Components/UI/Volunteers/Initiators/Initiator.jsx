import React from "react";
import { Card, Image } from "antd";

const Initiator = ({ record }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <Card
        hoverable
        className="bg-white border-0 shadow-xl rounded-2xl p-0 w-full max-w-xs h-[350px] flex flex-col justify-between transition-transform duration-200 hover:scale-105"
        bodyStyle={{ padding: 0, height: "100%" }}
      >
        {/* Profile Image with Gradient Ring */}
        <div className="flex flex-col items-center pt-8">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-primary2 blur-sm"></div>
            <Image
              className="relative z-10 border-4 border-white rounded-full shadow-lg object-cover"
              src={
                record?.imageUrl
                  ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${record?.imageUrl}`
                  : "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
              }
              width={110}
              height={110}
              alt="Picture of the Officials"
              preview={false}
            />
          </div>
        </div>
        {/* Name and Institute */}
        <div className="flex flex-col items-center mt-6 px-4">
          <h1 className="text-xl font-bold text-primary mb-1 truncate w-full text-center">
            {record?.fullName}
          </h1>
          <span className="text-sm text-gray-500 font-medium text-center block truncate w-full">
            {record?.instituteName}
          </span>
        </div>
        {/* Optional: Add a divider and more info */}
        <div className="px-6 pb-6 pt-4 flex flex-col items-center">
          {record?.designation && (
            <span className="text-xs bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full mb-2">
              {record?.designation}
            </span>
          )}
          {/* {record?.district && (
            <span className="text-xs text-accent">{record?.district}</span>
          )} */}
        </div>
      </Card>
    </div>
  );
};

export default Initiator;
