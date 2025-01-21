import { Card, Image } from "antd";
import React from "react";

const Volunteer = ({ record }) => {
  console.log(record);

  const { fullName, address, bloodGroup, imageUrl } = record;
  return (
    <div>
      <Card
        hoverable
        className="bg-white border-[1px] border-gray-200 shadow-md p-5"
      >
        <div className="flex items-end justify-end">
          <h1 className="text-4xl font-bold text-primary">{bloodGroup}</h1>
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Image
            className="border rounded-full"
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${imageUrl}`}
            width={200}
            height={200}
            alt="Picture of the author"
          ></Image>
        </div>
        <div className="text-center mt-5">
          <h1 className=" gap-1 text-lg font-semibold">{fullName}</h1>
          <span className="text-sm text-accent">{address}</span>
        </div>
      </Card>
    </div>
  );
};

export default Volunteer;
