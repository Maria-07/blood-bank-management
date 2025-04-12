import { motion } from "framer-motion";
import Hamburger from "hamburger-react";
import Link from "next/link";
import logo from "@/src/assets/Image/logo/logo.png";
import Image from "next/image";
import { AiFillShop, AiOutlineHome } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BiBookBookmark, BiLogOut, BiLogoBlogger } from "react-icons/bi";
import { BsCardList, BsChatSquareText } from "react-icons/bs";
import { FaUsersCog } from "react-icons/fa";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { MdOutlineAssignmentReturned } from "react-icons/md";
import { IoDocumentAttachSharp } from "react-icons/io5";

const NavbarSmallDevice = ({ isOpen, setOpen, token, handleLogout }) => {
  const currentRoute = usePathname();

  const router = useRouter();

  const handleLogOut = () => {
    console.log("logout");
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <div className="relative">
      {" "}
      <motion.div
        animate={{
          width: isOpen ? "250px" : "0px",
          transition: {
            duration: 0.5,
            type: "spring",
            // damping: 8,
          },
        }}
        className={`fixed w-[250px] top-0 left-0 z-50 bg-primary shadow-md h-screen overflow-x-hidden`}
      >
        <header className="flex justify-between items-center m-2">
          <div className="my-1 px-5">
            <Link href={"/"}>
              <Image
                src={logo}
                width={120}
                height={120}
                alt="Picture of the author"
              />
            </Link>
          </div>
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={20}
            color={isOpen ? "white" : "black"}
            label="Toggle Menu"
          />
        </header>
        <div className="px-8 my-10">
          <Link
            className={
              currentRoute === "/"
                ? "flex items-center gap-2 justify-start hover:text-primary2  rounded-sm text-primary2 h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300 "
                : "flex items-center gap-2 justify-start hover:text-primary2 text-white  rounded-sm h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300"
            }
            href={"/"}
          >
            <span>
              <AiOutlineHome className="text-lg" />
            </span>
            Home
          </Link>
          <Link
            className={
              currentRoute === "/about/"
                ? "flex items-center gap-2 justify-start hover:text-primary2  rounded-sm text-primary2 h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300 "
                : "flex items-center gap-2 justify-start hover:text-primary2 text-white  rounded-sm h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300"
            }
            href={"/about/"}
          >
            <span>
              <AiFillShop className="text-lg" />
            </span>
            About Us
          </Link>
          <Link
            className={
              currentRoute === "/campaigns/"
                ? "flex items-center gap-2 justify-start hover:text-primary2  rounded-sm text-primary2 h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300 "
                : "flex items-center gap-2 justify-start hover:text-primary2 text-white  rounded-sm h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300"
            }
            href={"/campaigns/"}
          >
            <span>
              <FaUsersCog className="text-lg" />
            </span>
            Campaigns
          </Link>
          <Link
            className={
              currentRoute === "/blood-bank/"
                ? "flex items-center gap-2 justify-start hover:text-primary2  rounded-sm text-primary2 h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300 "
                : "flex items-center gap-2 justify-start hover:text-primary2 text-white  rounded-sm h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300"
            }
            href={"/blood-bank/"}
          >
            <span>
              <MdOutlineAssignmentReturned className="text-lg" />
            </span>
            Blood Bank
          </Link>
          <Link
            className={
              currentRoute === "/volunteers/"
                ? "flex items-center gap-2 justify-start hover:text-primary2  rounded-sm text-primary2 h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300 "
                : "flex items-center gap-2 justify-start hover:text-primary2 text-white  rounded-sm h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300"
            }
            href={"/volunteers/"}
          >
            <span>
              <FaPeopleCarryBox className="text-lg" />
            </span>
            Leaders
          </Link>
          <Link
            className={
              currentRoute === "/media/"
                ? "flex items-center gap-2 justify-start hover:text-primary2  rounded-sm text-primary2 h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300 "
                : "flex items-center gap-2 justify-start hover:text-primary2 text-white  rounded-sm h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300"
            }
            href={"/media/"}
          >
            <span>
              <BiLogoBlogger className="text-lg" />
            </span>
            Media
          </Link>
          <Link
            className={
              currentRoute === "/notice/"
                ? "flex items-center gap-2 justify-start hover:text-primary2  rounded-sm text-primary2 h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300 "
                : "flex items-center gap-2 justify-start hover:text-primary2 text-white  rounded-sm h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300"
            }
            href={"/notice/"}
          >
            <span>
              <IoDocumentAttachSharp className="text-lg" />
            </span>
            Notices
          </Link>
          <Link
            className={
              currentRoute === "/contact/"
                ? "flex items-center gap-2 justify-start hover:text-primary2  rounded-sm text-primary2 h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300 "
                : "flex items-center gap-2 justify-start hover:text-primary2 text-white  rounded-sm h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300"
            }
            href={"/contact/"}
          >
            <span>
              <BsChatSquareText className="text-lg" />
            </span>
            Contact Us
          </Link>

          {/* <Link
            className={
              currentRoute === "/myItems"
                ? "flex items-center gap-2 justify-start hover:text-primary2  rounded-sm text-primary2 h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300 "
                : "flex items-center gap-2 justify-start hover:text-primary2 text-white  rounded-sm h-8 my-item-button text-base font-medium leading-5 tracking-wide uppercase pt-1 pb-1 transition ease-in-out duration-300"
            }
            href={token ? "/myItems" : "/login"}
            // href={"/myItems"}
          >
            <span>
              <BsCardList className="text-lg" />
            </span>
            My Item
          </Link> */}
        </div>
        <div>
          {" "}
          <div className=" absolute bottom-0 mb-10 mx-[5%]">
            {token ? (
              <button
                className="input-button  w-[100px] ml-[50%] flex items-center gap-2"
                onClick={handleLogout}
              >
                <BiLogOut className="font-semibold text-lg" />
                Log Out
              </button>
            ) : (
              <div className="flex items-center gap-5">
                {" "}
                <Link href={"/login"}>
                  <button className="input-button w-[100px]">Log In</button>
                </Link>
                <Link href={"/register/"}>
                  <button className="input-button w-[100px]">Register</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NavbarSmallDevice;
