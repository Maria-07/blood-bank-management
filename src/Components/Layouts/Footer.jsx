import Image from "next/image";
import Link from "next/link";
import logo from "@/src/assets/Image/logo/logo.png";
import { FaFacebookF, FaInstagram, FaTwitch, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="bg-primary px-10 py-16 ">
        <div className="sm:w-[80%]  sm:mx-auto">
          <div className="grid sm:grid-cols-5 md:grid-cols-5 grid-cols-3 gap-5 mb-5">
            <div className="mx-auto">
              <Link href={"/"}>
                <Image
                  src={logo}
                  width={200}
                  height={200}
                  alt="Picture of the author"
                />
              </Link>
              <h1 className="text-base my-3 text-white">
                মানবতার শ্রেষ্ঠ দান, রক্ত দিয়ে বাচাই প্রাণ
              </h1>
            </div>
            <div className="mx-auto">
              <h2 className="text-white text-lg font-semibold mb-1">
                Important links
              </h2>
              <Link href={"/blood-bank"}>
                <h2 className="text-white text-sm mb-1">Blood Bank</h2>
              </Link>
              <Link href={"/campaigns"}>
                <h2 className="text-white text-sm mb-1">Campaigns</h2>
              </Link>
              <Link href={"/volunteers"}>
                <h2 className="text-white text-sm mb-1">Leaders</h2>
              </Link>
              <Link href={"/media"}>
                <h2 className="text-white text-sm mb-1">Media</h2>
              </Link>
            </div>

            <div className="mx-auto">
              <h2 className="text-white text-lg font-semibold mb-1">Legal</h2>
              <Link href={"/"}>
                <h2 className="text-white text-sm mb-1">Terms & Conditions</h2>
              </Link>
              <Link href={"/"}>
                <h2 className="text-white text-sm mb-1">Privacy Policy</h2>
              </Link>
              <Link href={"/"}>
                <h2 className="text-white text-sm mb-1">Cookie Policy</h2>
              </Link>
            </div>
            <div className="mx-auto">
              <h2 className="text-white font-semibold">
                Don&apos;t have an account?
              </h2>

              <Link href={"/signup"}>
                <h2 className="text-white text-sm mb-1">Sign Up</h2>
              </Link>
              <Link href={"/login"}>
                <h2 className="text-white text-sm mb-1">Login</h2>
              </Link>
            </div>

            <div className="mx-auto">
              <h2 className="text-white text-lg font-semibold mb-1">Company</h2>
              <Link href={"/"}>
                <h2 className="text-white text-sm mb-1">About US</h2>
              </Link>
              <Link href={"/"}>
                <h2 className="text-white text-sm mb-1">Contact</h2>
              </Link>
              <div className="flex items-center gap-5 my-4">
                <FaFacebookF className="text-3xl p-2 border border-gray-400 text-white hover:bg-blue-700 hover:text-white" />
                <FaInstagram className="text-3xl p-2 border border-gray-400 text-white hover:bg-rose-700 hover:text-white" />
                <FaTwitch className="text-3xl p-2 border border-gray-400 text-white hover:bg-purple-700 hover:text-white" />
                <FaTwitter className="text-3xl p-2 border border-gray-400 text-white hover:bg-sky-700 hover:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black">
        {" "}
        <p className="text-gray-500 text-sm text-center py-5">
          Copyright © 2022 all rights reserved | This whole project sponsor by
          <span className="text-primary"> Blood bank 🩸</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
