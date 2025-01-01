"use client";
import Image from "next/image";
import logo from "@/assets/Image/bbLogo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dropdown } from "antd";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const currentRoute = usePathname();

  return (
    <div>
      {" "}
      <div className="hidden lg:block sticky top-0  my-5">
        <div className="sm:w-[90%]  sm:mx-auto py-2 flex justify-between border-[1px] shadow-md px-2 rounded-xl">
          <div>
            <Link href={"/"}>
              <Image
                src={logo}
                width={150}
                height={150}
                alt="Picture of the author"
              />
            </Link>
          </div>
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
              campaigns
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
            <button className="bk-input-button">Register</button>
            <button className="bk-input-button">Login</button>

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
            <Dropdown
              overlay={
                <div className="bg-white p-8 w-[280px] border shadow-md rounded-sm">
                  <div>
                    <h1 className="text-[15px] font-semibold text-dark mb-2">
                      My Account
                    </h1>
                    <hr></hr>
                    {/* <div className="mx-5">
                      {accessToken ? (
                        <>
                          <Link href={"/myProfile"}>
                            <button className="hover:text-primary my-2">
                              My Profile
                            </button>
                          </Link>
                          <br />
                          <button
                            className="hover:text-primary"
                            onClick={handleLogOut}
                          >
                            Log Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link href={"/login"}>
                            <button className="hover:text-primary my-2">
                              Log In
                            </button>
                          </Link>
                          <br />
                          <Link href={"/signup"}>
                            <button className="hover:text-primary ">
                              Create Account
                            </button>
                          </Link>
                        </>
                      )}
                    </div> */}
                  </div>
                  {/* {accessToken && (
                    <div>
                      <h1 className="text-[15px] font-semibold text-dark mb-2 mt-4">
                        My Items
                      </h1>
                      <hr></hr>
                      <div className="mx-5">
                        {userInfo?.role === "bookShopOwner" ? (
                          <>
                            <Link href={"/myItems/shop"}>
                              <h1 className="hover:text-primary my-2">
                                My Shop
                              </h1>
                            </Link>
                            <Link href={"/myItems/book"}>
                              <h1 className="hover:text-primary my-2">
                                My Books
                              </h1>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link href={"/myItems/oldBooks"}>
                              <h1 className="hover:text-primary my-2">
                                My Old Books
                              </h1>
                            </Link>
                          </>
                        )}

                        <Link href={"/myItems/blogs"}>
                          <h1 className="hover:text-primary my-2">My Blogs</h1>
                        </Link>
                      </div>
                    </div>
                  )} */}
                </div>
              }
              placement="bottomRight"
              arrow
              st
            >
              <button className="border p-1">
                <AiOutlineMenu className="text-xl hover:text-primary" />
              </button>
            </Dropdown>
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
            className="bk-input-button "
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
