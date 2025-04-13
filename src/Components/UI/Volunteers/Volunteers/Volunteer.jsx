import React from "react";
import { Card, Image } from "antd";

const Volunteer = ({ record }) => {
  console.log(record);

  return (
    <div className="border-[1px] rounded-md bg-white ">
      <Card hoverable className="shadow-md p-5">
        {/* <div className="flex items-end justify-end">
          <h1 className="text-4xl font-bold text-primary">AB+</h1>
        </div> */}

        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Image
            className="border rounded-full"
            src={
              record?.imageUrl
                ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${record?.imageUrl}`
                : "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
            }
            width={180}
            height={180}
            alt="Picture of the author"
          ></Image>
        </div>
        <div className="text-center mt-5">
          <h1 className=" gap-1 text-lg font-semibold">{record?.fullName}</h1>
          <span className="text-sm text-accent">{record?.instituteName}</span>
        </div>
      </Card>
    </div>
  );
};

export default Volunteer;
