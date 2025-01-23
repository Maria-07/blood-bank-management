import Image from "next/image";
import React from "react";
import blood from "@/src/assets/Image/logo/darkLogo.png";
import Link from "next/link";
import Register from "../../src/Components/UI/Auth/Register";

const RegistrationPage = () => {
  return (
    <div>
      {" "}
      <div className="sm:w-[90%]  sm:mx-auto my-16 px-5">
        <div className="grid lg:grid-cols-3 grid-cols-1">
          <div className="flex items-center justify-center">
            {" "}
            <div className="mx-auto my-auto p-5">
              <Image
                src={blood}
                // src={register}
                width={"auto"}
                height={"auto"}
                alt="Picture of the author"
              />
              <div className="text-center my-7">
                {" "}
                <h1 className="font-primary text-2xl font-bold text-primary mb-2">
                  WELCOME To হিমোগ্লোবিন
                </h1>
                <span>মানবতার শ্রেষ্ঠ দান, রক্ত দিয়ে বাচাই প্রাণ</span>
              </div>
            </div>
          </div>
          <div className="lg:mx-auto sm:col-span-2">
            <div>
              {" "}
              <Register></Register>{" "}
            </div>

            <div className="text-sm font-medium text-gray-600 items-center flex gap-2 mb-5">
              Already have an account ?
              <Link href={"/login"}>
                <button className="text-primary font-semibold"> Login </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
