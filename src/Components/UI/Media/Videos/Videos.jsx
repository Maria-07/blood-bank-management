import { Image } from "antd";
import React from "react";

const formatYouTubeUrl = (url) => {
  if (url.includes("shorts/")) {
    return url.replace("youtube.com/shorts/", "www.youtube.com/embed/");
  }
  if (url.includes("youtu.be/")) {
    return url.replace("youtu.be/", "www.youtube.com/embed/");
  }
  return url.replace("watch?v=", "embed/");
};

const Videos = ({ videos = [] }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 px-2 gap-10 my-10">
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index}>
              <div className="h-[270px] w-[100%] overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={formatYouTubeUrl(video?.imageUrl)}
                  title={`Video ${index}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>{" "}
              <div className="flex gap-3 mt-3">
                {/* <Image
                  className="border rounded-full"
                  src={
                    "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                  }
                  width={50}
                  height={40}
                  alt="Picture of the author"
                ></Image> */}
                <div>
                  <h1 className="text-lg font-semibold">
                    {video?.campaignName}
                  </h1>
                  <span className="text-sm">{video?.institute}</span>
                  {/* <h3 className="text-xs text-accent">2 years ago</h3> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No videos available</p>
        )}
      </div>
    </div>
  );
};

export default Videos;
