import Image from "next/image";
import logo from "@/src/assets/Image/logo/darkLogo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown } from "antd";
import { AiOutlineMenu } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import Cookies from "js-cookie";
import { getUserType } from "@/src/Hook/authUtils";
import { useEffect, useState } from "react";

const Navbar = () => {
  const currentRoute = usePathname();
  const router = useRouter();

  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Ensure this logic runs on the client
    const accessToken = Cookies.get("accessToken");
    setToken(accessToken);

    const type = getUserType();
    setUserType(type);
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.push("/login");
  };

  return (
    <div>
      {" "}
      <div className="hidden lg:block sticky top-0 ">
        {/* <div className="sm:w-[90%]  sm:mx-auto py-5 flex justify-between border-[1px] shadow-md px-2 rounded-xl"> */}
        <div className="bg-primary py-3">
          {" "}
          {!token && (
            <Link href={"/register/"}>
              <button className="bb-input-button">Register</button>
            </Link>
          )}
          {!token && (
            <Link href={"/login/"}>
              <button className="bb-input-button">Login</button>
            </Link>
          )}
          {token && (
            <div>
              <button onClick={handleLogout} className="bb-input-button">
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="sm:w-[90%]  sm:mx-auto flex items-center justify-center">
          <div className="flex items-center gap-5">
            <Link
              className={
                currentRoute === "/" ? "active custom_link" : "custom_link"
              }
              href={"/"}
            >
              Home
            </Link>
            <Link
              className={
                currentRoute === "/volunteers"
                  ? "active custom_link"
                  : "custom_link"
              }
              href={"/volunteers/"}
            >
              Volunteers
            </Link>
            <Link
              className={
                currentRoute === "/blood-bank"
                  ? "active custom_link"
                  : "custom_link"
              }
              href={"/blood-bank/"}
            >
              Blood Bank
            </Link>
            <Link
              className={
                currentRoute === "/campaigns"
                  ? "active custom_link"
                  : "custom_link"
              }
              href={"/campaigns/"}
            >
              Campaigns
            </Link>
            <div className="mt-[-44px]">
              <Link href={"/"}>
                <Image
                  src={logo}
                  width={80}
                  height={80}
                  alt="Picture of the author"
                />
              </Link>
            </div>
            <Link
              className={
                currentRoute === "/media" ? "active custom_link" : "custom_link"
              }
              href={"/media/"}
            >
              Media
            </Link>

            <Link
              className={
                currentRoute === "/about" ? "active custom_link" : "custom_link"
              }
              href={"/about/"}
            >
              About
            </Link>
            <Link
              className={
                currentRoute === "/contact"
                  ? "active custom_link"
                  : "custom_link"
              }
              href={"/contact/"}
            >
              Contact
            </Link>
            {token && userType === "Admin" && (
              <Link
                className={
                  currentRoute === "/admin/dashboard/campaigns"
                    ? "active custom_link"
                    : "custom_link"
                }
                href={"/admin/dashboard/campaigns/"}
              >
                Dashboard
              </Link>
            )}

            {/* <Link
              className={
                currentRoute === "/books"
                  ? "active custom_link font-medium"
                  : "custom_link font-medium"
              }
              href={"/books"}
            >
              <Dropdown
                overlay={
                  <div className="bg-white p-2 w-[180px] border shadow-md rounded-sm">
                    <div>
                      <div className="mx-5">
                        <>
                          <Link href={"/books"}>
                            <button className="hover:text-primary my-2">
                              Regular Books
                            </button>
                          </Link>
                          <br />
                          <Link href={"/oldBooks"}>
                            <button className="hover:text-primary my-2">
                              Old Books
                            </button>
                          </Link>
                        </>
                      </div>
                    </div>
                  </div>
                }
                placement="bottomRight"
                arrow
              >
                <button>Books</button>
              </Dropdown>
            </Link> */}
            {/* <Link
              className={
                currentRoute === "/blogs"
                  ? "active custom_link font-medium"
                  : "custom_link font-medium"
              }
              href={"/blogs"}
            >
              Blogs
            </Link> */}
            {/* {userInfo?.role === "admin" && (
              <Link
                className={
                  currentRoute === "/admin"
                    ? "active custom_link font-medium"
                    : "custom_link font-medium"
                }
                href={"/admin"}
              >
                Dashboard
              </Link>
            )} */}
            {/* <button onClick={() => setSearch(!search)} className="">
              <BiSearchAlt2 className="text-2xl hover:text-primary" />
            </button> */}
            {/* <Dropdown
              overlay={
                <div className="bg-white p-8 w-[280px] border shadow-md rounded-sm">
                  <div>
                    <h1 className="text-[15px] font-semibold text-dark mb-2">
                      My Account
                    </h1>
                    <hr></hr>
                  </div>
                  <Link href={"/my-profile"}>
                    <h1 className="hover:text-primary my-2">My Profile</h1>
                  </Link>
                </div>
              }
              placement="bottomRight"
              arrow
              st
            >
              <button className="border p-1">
                <AiOutlineMenu className="text-xl hover:text-primary" />
              </button>
            </Dropdown> */}
          </div>
        </div>
      </div>
      <div className="lg:hidden block">
        <div className="flex items-center justify-between px-3 py-3">
          <div>
            <GiHamburgerMenu
              size={24}
              onClick={() => {
                setOpen(!open);
              }}
            />
          </div>
          <div>
            <Link href={"/"}>
              {" "}
              <Image
                src={logo}
                width={100}
                height={100}
                alt="Picture of the author"
              />
            </Link>
          </div>
          <button
            onClick={() => setSearch(!search)}
            className="bb-input-button "
          >
            Search
          </button>
        </div>
        {/* <NavbarSmallDevice isOpen={open} setOpen={setOpen}></NavbarSmallDevice> */}
      </div>
      {/* {search && <SearchBox isOpen={search} setOpen={setSearch}></SearchBox>} */}
    </div>
  );
};

export default Navbar;
