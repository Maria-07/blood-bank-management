import Image from "next/image";
import React from "react";
import register from "@/assets/video/register.gif";
import blood from "@/assets/Image/bloodDrop.png";
import Link from "next/link";
import Register from "../../src/Components/UI/Auth/Register";

const RegistrationPage = () => {
  return (
    <div>
      {" "}
      <div className="sm:w-[70%]  sm:mx-auto my-16 px-5">
        <div className="grid sm:grid-cols-2 grid-cols-1">
          <div className="mx-auto my-auto">
            <Image
              src={register}
              width={"auto"}
              height={"auto"}
              alt="Picture of the author"
            />
          </div>
          <div className="sm:mx-auto">
            <div className="mb-3">
              {" "}
              <Image
                src={blood}
                width={40}
                height={40}
                alt="Picture of the author"
              />
            </div>
            <h1 className="font-primary text-2xl font-bold text-primary">
              WELCOME To Blood Bank Management
            </h1>
            <h3 className="text-base font-normal text-gray-500">
              Create your account
            </h3>
            <div>
              {" "}
              <Register></Register>{" "}
            </div>

            <div className="text-sm font-medium text-gray-600 justify-center items-center flex gap-2 my-5">
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
