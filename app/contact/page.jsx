"use client";
import { getUserType } from "@/src/Hook/authUtils";
import Image from "next/image";
import React from "react";
import contact from "@/src/assets/Image/contact.png";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const ContactPage = () => {
  const type = getUserType();
  console.log(type);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      toast.error("Unauthorized. Please log in again.");
      return;
    }

    try {
      // debugger;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contact/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      console.log("Approved Response:", responseData);

      if (responseData?.data?.isSuccess) {
        toast.success(
          responseData?.data?.message || "Your Message Successfully Send"
        );
        reset();
      }
      if (!responseData?.data?.isSuccess) {
        const errorText = await response?.data?.text();
        return;
      }
    } catch (error) {
      console.error("Network or server error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="md:w-[90%] sm:mx-auto ">
        <div className="pt-8 bg-[#F2F2F2] rounded-xl shadow-md py-2  px-5 ">
          <div className="md:w-[100%] sm:mx-auto grid sm:grid-cols-2 grid-cols-1 gap-3 items-center justify-between">
            <div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sm:pl-10"
            >
              <h1 className="font-bold lg:text-7xl text-4xl font-primary">
                Contact
              </h1>
              <hr className="p-[2px] bg-primary w-[22%]" />
              <p className="text-sm text-accent lg:w-[55%] my-3">
                We’re here to assist you! Reach out to us for any inquiries,
                feedback, or assistance. Choose from the following options to
                better subject your needs:
              </p>
            </div>

            <div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Image
                src={contact}
                width={400}
                height={400}
                alt="Picture of the author"
              ></Image>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          {" "}
          <div className=" flex items-center justify-center py-10">
            <div className="mx-auto">
              <div className="w-[70%] text-accent my-5">
                {" "}
                {/* <MdConnectWithoutContact className="text-4xl mb-1 text-primary" /> */}
                <h1 className="text-3xl font-semibold text-primary2 ">
                  Contact
                </h1>
                Need to get in touch? We’re happy to help with any general
                queries or support you require.
                <div className="text-black my-2">
                  <h1 className="font-semibold">Business Hours: </h1>
                  Monday – Friday: 9:00 AM – 5:00 PM, <br />
                  Saturday – Sunday: Closed
                </div>
              </div>
              <div className="w-[70%] text-accent my-5">
                {" "}
                {/* <MdConnectWithoutContact className="text-4xl mb-1 text-primary" /> */}
                <h1 className="text-3xl font-semibold text-primary2 ">
                  Complain
                </h1>
                Facing an issue? We value your feedback and are committed to
                resolving any concerns promptly. Please provide details about
                your complaint, and our support team will get back to you.
              </div>
              <div className="w-[70%] text-accent my-5">
                {" "}
                {/* <MdConnectWithoutContact className="text-4xl mb-1 text-primary" /> */}
                <h1 className="text-3xl font-semibold text-primary2 ">
                  Suggestion
                </h1>
                Have an idea or feedback to improve our services? We’d love to
                hear from you! Your suggestions help us grow and serve you
                better.
              </div>
            </div>
          </div>
          <div className="bg-soft w-[100%]  mx-auto p-5 my-10 rounded-md border shadow-md">
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <h1 className="text-2xl mb-10">Here Let us know ...</h1>
                  <div>
                    <h1 className="input-title">
                      Type
                      <span className="text-red-600">*</span>
                    </h1>
                    <select
                      className="input-select-border w-full mb-2"
                      {...register("contactType", {
                        required: {
                          value: true,
                          message: "Type of Issue is required",
                        },
                      })}
                    >
                      <option value="">Select</option>
                      <option value="Contact">Contact</option>
                      <option value="Complain">Complain</option>
                      <option value="Suggestion">Suggestion</option>
                    </select>
                    <label className="label">
                      {errors.contactType && (
                        <p className="text-red-500">
                          {errors.contactType.message}
                        </p>
                      )}
                    </label>
                  </div>
                  <div className="sm:col-span-2">
                    <h1 className="input-title">Subject</h1>
                    <input
                      type="text"
                      className="input-border w-full mb-2"
                      {...register("subject")}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <h1 className="input-title">Message</h1>
                    <textarea
                      type="text"
                      className="input-border w-full mb-2"
                      {...register("message")}
                    />
                  </div>
                </div>
                <button type="submit" className="input-button my-5 ">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default ContactPage;
