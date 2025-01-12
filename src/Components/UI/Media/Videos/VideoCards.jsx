import { Image } from "antd";
import React from "react";

const VideoCards = () => {
  return (
    <div>
      <div className="h-[270px] w-[100%] overflow-hidden">
        {" "}
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/Q55LrC7vijM"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className="flex gap-3 mt-3">
        <Image
          className="border rounded-full"
          src={
            "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
          }
          width={50}
          height={40}
          alt="Picture of the author"
        ></Image>
        <div>
          <h1 className="text-lg font-semibold">
            The Journey of Blood: What happens after you give blood | NHS Give
            Blood
          </h1>
          <span className="text-sm">user Name</span>
          <h3 className="text-xs text-accent">2 years ago</h3>
        </div>
      </div>
    </div>
  );
};

export default VideoCards;
