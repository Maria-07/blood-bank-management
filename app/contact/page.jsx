"use client";
import { decrement, increment } from "@/src/redux/slices/counterSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ContactPage = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.value);
  return (
    <div>
      {" "}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>Counter: {counter}</h1>
        <button
          onClick={() => dispatch(increment())}
          style={{ margin: "5px", padding: "10px" }}
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          style={{ margin: "5px", padding: "10px" }}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
