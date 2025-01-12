import { Tabs } from "antd";
import React from "react";
import News from "./News/News";
import Videos from "./Videos/Videos";
import Images from "./Images/Images";

const MediaTab = () => {
  const tabItems = [
    {
      label: <h1 className="text-dark text-base hover:text-primary">Image</h1>,
      key: 1,
      children: <Images></Images>,
    },
    {
      label: <h1 className="text-dark text-base hover:text-primary">Video</h1>,
      key: 2,
      children: <Videos></Videos>,
    },
    {
      label: <h1 className="text-dark text-base hover:text-primary">News</h1>,
      key: 3,
      children: <News></News>,
    },
  ];
  return (
    <div>
      <div className="my-20">
        <Tabs centered type="card" items={tabItems} />
      </div>
    </div>
  );
};

export default MediaTab;
