import Image from "next/image";
import React from "react";
import loginLogo from "@/src/assets/video/loginLogo.gif";
import blood from "@/src/assets/Image/bloodDrop.png";
import Link from "next/link";
import Login from "../../src/Components/UI/Auth/Login";

const LoginPage = () => {
  return (
    <div>
      {" "}
      <div className="sm:w-[70%]  sm:mx-auto mt-[10%] my-10 px-5">
        <div className="grid sm:grid-cols-2 grid-cols-1">
          <div className="mx-auto">
            <Image
              src={loginLogo}
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
            <h1 className="font-primary text-2xl font-bold text-primary flex items-center">
              WELCOME BACK{" "}
            </h1>
            <h3 className="text-base font-normal text-gray-500">
              Login to continue
            </h3>
            <div>
              {" "}
              <Login></Login>{" "}
            </div>

            <div className="text-sm font-medium text-gray-600 flex gap-2 my-5">
              Don&apos;t have any account ?
              <Link href={"/register"}>
                <button className="text-primary font-semibold">
                  {" "}
                  Register Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
