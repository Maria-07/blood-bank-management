"use client";
import { getUserType } from "@/src/Hook/authUtils";
import { decrement, increment } from "@/src/redux/slices/counterSlice";
import Cookies from "js-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ContactPage = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.value);

  const type = getUserType();
  console.log(type);

  return (
    <div>
      {" "}
      <div className="bg-soft w-[40%]">
        <div>
          <div>contact</div>
          <div>form</div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
