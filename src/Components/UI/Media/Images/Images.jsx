import { Image } from "antd";
import React from "react";

const Images = () => {
  const images = [
    {
      src: "https://ssbhealthcare.com/wp-content/uploads/2023/06/close-up-patient-with-tubes-her-arm-squeezing-ball-her-hand-while-donating-blood_1200x800.jpg",
      alt: "Blood Donation Campaign 1",
    },
    {
      src: "https://ssbhealthcare.com/wp-content/uploads/2023/06/close-up-patient-with-tubes-her-arm-squeezing-ball-her-hand-while-donating-blood_1200x800.jpg",
      alt: "Blood Donation Campaign 2",
    },
    {
      src: "https://ssbhealthcare.com/wp-content/uploads/2023/06/close-up-patient-with-tubes-her-arm-squeezing-ball-her-hand-while-donating-blood_1200x800.jpg",
      alt: "Blood Donation Campaign 3",
    },
    {
      src: "https://ssbhealthcare.com/wp-content/uploads/2023/06/close-up-patient-with-tubes-her-arm-squeezing-ball-her-hand-while-donating-blood_1200x800.jpg",
      alt: "Blood Donation Campaign 4",
    },
    {
      src: "https://ssbhealthcare.com/wp-content/uploads/2023/06/close-up-patient-with-tubes-her-arm-squeezing-ball-her-hand-while-donating-blood_1200x800.jpg",
      alt: "Blood Donation Campaign 5",
    },
    {
      src: "https://ssbhealthcare.com/wp-content/uploads/2023/06/close-up-patient-with-tubes-her-arm-squeezing-ball-her-hand-while-donating-blood_1200x800.jpg",
      alt: "Blood Donation Campaign 6",
    },
    {
      src: "https://ssbhealthcare.com/wp-content/uploads/2023/06/close-up-patient-with-tubes-her-arm-squeezing-ball-her-hand-while-donating-blood_1200x800.jpg",
      alt: "Blood Donation Campaign 7",
    },
    {
      src: "https://ssbhealthcare.com/wp-content/uploads/2023/06/close-up-patient-with-tubes-her-arm-squeezing-ball-her-hand-while-donating-blood_1200x800.jpg",
      alt: "Blood Donation Campaign 8",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {images.map((image, index) => (
        <div key={index} className="overflow-hidden rounded-lg shadow-lg">
          <Image
            src={image.src}
            alt={image.alt}
            preview={true}
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
};

export default Images;
