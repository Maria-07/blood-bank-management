"use client";
import { useGetAllReviewsQuery } from "@/src/redux/features/review/review";
import React, { useEffect, useState } from "react";
import AddReviewModal from "./AddReviewModal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { useAuth } from "@/src/Hook/AuthContext";
import { useTranslation } from "@/src/Hook/useTranslation";

const Reviews = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [reviews, setReviews] = useState([]);
  const [clicked, setClicked] = useState(false);
  const handleClose = () => setClicked(false);

  const { token } = useAuth();

  const {
    data: approvedData,
    isLoading: isLoading2,
    isError: isError2,
  } = useGetAllReviewsQuery({
    pageNo: page,
    pageSize: size,
  });

  useEffect(() => {
    if (!isLoading2 && !isError2 && approvedData) {
      setReviews(approvedData?.data?.data || []);
    }
  }, [approvedData?.data?.data, isLoading2, isError2]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  console.log(reviews);

  return (
    <div className="md:w-[90%] sm:mx-auto my-20 py-16">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white">{t("reviews.title")}</h1>
        <p className="mt-2 text-white text-base max-w-xl mx-auto">
          {t("reviews.description")}
        </p>
      </div>

      <div>
        <Slider {...settings}>
          {reviews?.map((review) => (
            <div key={review._id} className="px-3">
              <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-gray-200 hover:shadow-3xl transition-all duration-300 group min-h-[370px]">
                <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-primary2 to-secondary rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <span className="text-white text-4xl font-bold">
                    {review.reviewOwner?.fullName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                </div>
                <div className="mt-3 flex flex-col items-center w-full">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1 text-center tracking-wide">
                    {review.reviewOwner?.fullName || "Anonymous"}
                  </h2>
                  <span className="text-xs text-gray-500 mb-2 text-center">
                    {review.reviewOwner?.email || ""}
                  </span>
                  <div className="w-12 h-1 bg-gradient-to-r from-primary2 to-secondary rounded-full mb-4"></div>
                  <p className="text-gray-700 text-center mb-2 italic font-medium break-words">
                    “{review.reviewMessage}”
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <AddReviewModal handleClose={handleClose} clicked={clicked} />

      <div className="flex justify-center mt-6">
        {!token ? (
          <div className="my-3">
            <Link href={"/register"}>
              <button className="bg-gradient-to-r from-primary2 to-secondary text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary2">
                {t("reviews.loginToAddReview")}
              </button>
            </Link>
          </div>
        ) : (
          <button
            onClick={() => setClicked(true)}
            className="bg-gradient-to-r from-primary2 to-secondary text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary2"
          >
            {t("reviews.addReview")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Reviews;
