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
  console.log("Videos array:", videos);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 px-2 gap-10 my-10">
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index} className="h-[270px] w-[100%] overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={formatYouTubeUrl(video)}
                title={`Video ${index}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
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
