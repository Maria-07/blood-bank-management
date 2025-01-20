import { Card, Image } from "antd";
import React from "react";

const Volunteer = ({ record }) => {
  const { fullName, address, bloodGroup } = record;
  return (
    <div>
      <Card hoverable className="bg-popover p-5">
        {" "}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Image
              className="border rounded-full"
              src={
                "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
              }
              width={50}
              height={50}
              alt="Picture of the author"
            ></Image>
            <div>
              <h1 className="flex items-center gap-1 text-lg font-semibold">
                {fullName}
              </h1>
              <span className="text-sm text-accent">{address}</span>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-primary">{bloodGroup}</h1>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Volunteer;
