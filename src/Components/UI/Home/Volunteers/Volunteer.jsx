import { Card, Image } from "antd";
import React from "react";

const Volunteer = ({ record }) => {
  const { fullName, address, bloodGroup, imageUrl } = record;
  return (
    <div>
      <Card hoverable className="bg-popover p-5">
        {" "}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Image
              className="border rounded-full"
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${imageUrl}`}
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
