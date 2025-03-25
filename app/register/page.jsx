import Image from "next/image";
import React from "react";
import blood from "@/src/assets/Image/logo/darkLogo.png";
import Link from "next/link";
import Register from "../../src/Components/UI/Auth/Register";

const RegistrationPage = () => {
  return (
    <div>
      {" "}
      <div className="sm:w-[90%]  sm:mx-auto mb-16 px-5">
        <div className="grid lg:grid-cols-3 grid-cols-1">
          <div className="flex items-center justify-center ">
            {" "}
            <div className="mx-auto my-auto px-5 sm:py-20  border-r-[1px]">
              <Image
                src={blood}
                // src={register}
                width={"200"}
                height={"auto"}
                alt="Picture of the author"
                className="mx-auto"
              />
              <div className=" my-7">
                {" "}
                <h1 className=" text-center font-primary text-2xl font-bold text-primary mb-2">
                  WELCOME To Hemoglobin
                </h1>
                <h2 className="text-center">
                  Join Our Life-Saving Mission – Register Today! 🩸❤️
                </h2>
                <div className="text-sm text-gray-600 my-5">
                  Every drop of blood has the power to save a life. By creating
                  an account with our blood bank, you are taking a step toward
                  becoming a real-life hero. Thousands of people, including
                  accident victims, cancer patients, and those undergoing
                  surgery, rely on the generosity of donors like you.
                  <br />{" "}
                  <p className="my-2">
                    When you register, you become part of a compassionate
                    community that stands together to make a difference. Whether
                    you choose to donate blood or volunteer, your small act can
                    mean the world to someone in need.
                  </p>{" "}
                  Sign up today and be the reason someone gets a second chance
                  at life. Together, we can build a future where no one suffers
                  due to a lack of blood. 💪🔥
                  <p className="text-base font-semibold my-1">
                    Donate Blood. Save Lives. Make an Impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:mx-auto sm:col-span-2 px-5">
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
