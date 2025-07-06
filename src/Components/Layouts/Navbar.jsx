/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import logo from "@/src/assets/Image/logo/darkLogo.png";
import mlogo from "@/src/assets/Image/logo/mbLogo.png";
import Logo from "@/src/assets/Image/logo/logo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "@/src/Hook/AuthContext";
import { Dropdown, Switch } from "antd";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaFileDownload } from "react-icons/fa";
import { FaIdBadge } from "react-icons/fa6";
import NavbarSmallDevice from "./NavbarSmallDevice";
import { useEffect, useState } from "react";
import UserInfo from "@/src/Hook/UserInfo";
import { useTranslation } from "@/src/Hook/useTranslation";

const Navbar = () => {
  //! User data
  const user = UserInfo();

  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("language") || "en";
    setLanguage(storedLang);
  }, []);

  const toggleLanguage = (checked) => {
    const lang = checked ? "bn" : "en";
    setLanguage(lang);
    console.log(lang);
    localStorage.setItem("language", lang);
    window.location.reload();
  };

  console.log(language);

  const [open, setOpen] = useState(false);
  const { token, userType, logout, userId } = useAuth();

  const currentRoute = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Update context
    router.push("/login");
  };

  const { t } = useTranslation();

  return (
    <div>
      {" "}
      <div className={`hidden lg:block sticky top-0 mb-10`}>
        {/* <div className="sm:w-[90%]  sm:mx-auto py-5 flex justify-between border-[1px] shadow-md px-2 rounded-xl"> */}

        <div className={token ? `bg-primary` : `bg-primary py-2`}>
          {" "}
          <div className="md:w-[90%] sm:mx-auto flex items-center justify-between">
            <div>
              <Link href={"/"}>
                <Image
                  src={Logo}
                  width={130}
                  height={100}
                  alt="Picture of the author"
                />
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link
                className="text-white font-semibold hover:text-primary2 transition-all  border-r-[2px] px-3"
                href={"/notice/"}
              >
                {t("navbar.notice")}
              </Link>{" "}
              <Link
                className="text-white font-semibold hover:text-primary2 transition-all mr-2 border-r-[2px] pr-2"
                href={"/contact/"}
              >
                {t("navbar.contact")}
              </Link>{" "}
              {!token && (
                <>
                  <Link href={"/register/"}>
                    <button className="head-input-button mr-3">Register</button>
                  </Link>

                  <Link href={"/login/"}>
                    <button className="head-input-button">Login</button>
                  </Link>
                </>
              )}
              {token && (
                <div>
                  <Dropdown
                    overlay={
                      <div className="bg-primary py-3 px-4 w-[200px] border shadow-md rounded-sm mt-1">
                        <div>
                          {token &&
                            (userType === "Admin" ||
                              userType === "Volunteer") && (
                              <button>
                                {" "}
                                <Link
                                  className="text-white hover:text-white font-semibold flex items-center gap-2"
                                  href={`${
                                    userType === "Volunteer"
                                      ? "/admin/dashboard/my-campaign/"
                                      : "/admin/dashboard/campaigns/"
                                  }`}
                                >
                                  <MdDashboard /> Dashboard
                                </Link>{" "}
                              </button>
                            )}
                          <button>
                            <Link
                              className="text-white hover:text-white font-semibold flex items-center gap-2"
                              href={"/my-profile"}
                            >
                              <CgProfile /> My Profile
                            </Link>
                          </button>
                          {token && userType === "Volunteer" && (
                            <button>
                              <Link
                                className="text-white hover:text-white font-semibold flex items-center gap-2"
                                href={"/download-id"}
                              >
                                <FaIdBadge /> Download Id Card
                              </Link>
                            </button>
                          )}
                          <button>
                            <Link
                              className="text-white hover:text-white font-semibold flex items-center gap-2"
                              href={"/download-report"}
                            >
                              <FaFileDownload /> Download Report
                            </Link>
                          </button>
                          {token && userType === "Admin" && (
                            <button>
                              <Link
                                className="text-white hover:text-white font-semibold flex items-center gap-2"
                                href={"/admin/change-password"}
                              >
                                <FaFileDownload /> Change Password
                              </Link>
                            </button>
                          )}

                          <hr className="mt-5 mb-3" />
                          <div className="">
                            <>
                              <button
                                onClick={handleLogout}
                                className="head-input-button"
                              >
                                Logout
                              </button>
                            </>
                          </div>
                        </div>
                      </div>
                    }
                    placement="bottomRight"
                  >
                    <div className="my-2 flex items-center gap-1">
                      {" "}
                      <Link
                        className="text-white font-semibold text-end hover:text-primary2 transition-all mr-2  "
                        href={"/"}
                      >
                        <h1 className="text-sm">{user?.fullName}</h1>
                        <h2 className="text-xs font-thin">{user?.userType}</h2>
                      </Link>{" "}
                      <img
                        src={
                          user?.imageUrl
                            ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${user?.imageUrl}`
                            : "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                        }
                        className="rounded-full h-[40px] w-[40px] overflow-hidden"
                        alt="Picture of the author"
                      />
                    </div>
                  </Dropdown>
                </div>
              )}
              <div>
                <Switch
                  checked={language === "bn"}
                  onChange={toggleLanguage}
                  checkedChildren="বাংলা"
                  unCheckedChildren="English"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sm:w-[90%]  sm:mx-auto flex items-center justify-center">
          <div className="flex items-center gap-5">
            <Link
              className={
                currentRoute === "/" ? "active custom_link" : "custom_link"
              }
              href={"/"}
            >
              {t("navbar.home")}
            </Link>{" "}
            <Link
              className={
                currentRoute === "/about" ? "active custom_link" : "custom_link"
              }
              href={"/about/"}
            >
              {t("navbar.about")}
            </Link>
            <Link
              className={
                currentRoute === "/campaigns"
                  ? "active custom_link"
                  : "custom_link"
              }
              href={"/campaigns/"}
            >
              {t("navbar.campaigns")}
            </Link>
            <div className="mt-[-44px]">
              <Link href={"/"}>
                <Image
                  src={logo}
                  width={100}
                  height={100}
                  alt="Picture of the author"
                />
              </Link>
            </div>
            <Link
              className={
                currentRoute === "/blood-bank"
                  ? "active custom_link"
                  : "custom_link"
              }
              href={"/blood-bank/"}
            >
              {t("navbar.bloodBank")}
            </Link>
            <Link
              className={
                currentRoute === "/volunteers"
                  ? "active custom_link"
                  : "custom_link"
              }
              href={"/volunteers/"}
            >
              {t("navbar.leaders")}
            </Link>
            <Link
              className={
                currentRoute === "/media" ? "active custom_link" : "custom_link"
              }
              href={"/media/"}
            >
              {t("navbar.media")}
            </Link>
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
                src={mlogo}
                width={100}
                height={100}
                alt="Picture of the author"
              />
            </Link>
          </div>
          <div className="">
            {token ? (
              <div>
                <Dropdown
                  overlay={
                    <div className="bg-primary py-3 px-4 w-[200px] border shadow-md rounded-sm  ">
                      <div>
                        {token &&
                          (userType === "Admin" ||
                            userType === "Volunteer") && (
                            <button>
                              {" "}
                              <Link
                                className="text-white hover:text-white font-semibold flex items-center gap-2"
                                href={`${
                                  userType === "Volunteer"
                                    ? "/admin/dashboard/my-campaign/"
                                    : "/admin/dashboard/campaigns/"
                                }`}
                              >
                                <MdDashboard /> Dashboard
                              </Link>{" "}
                            </button>
                          )}
                        <button>
                          <Link
                            className="text-white hover:text-white font-semibold flex items-center gap-2"
                            href={"/my-profile"}
                          >
                            <CgProfile /> My Profile
                          </Link>
                        </button>
                        {token && userType === "Volunteer" && (
                          <button>
                            <Link
                              className="text-white hover:text-white font-semibold flex items-center gap-2"
                              href={"/download-id"}
                            >
                              <FaIdBadge /> Download Id Card
                            </Link>
                          </button>
                        )}
                        <button>
                          <Link
                            className="text-white hover:text-white font-semibold flex items-center gap-2"
                            href={"/download-report"}
                          >
                            <FaFileDownload /> Download Report
                          </Link>
                        </button>
                        {token && userType === "Admin" && (
                          <button>
                            <Link
                              className="text-white hover:text-white font-semibold flex items-center gap-2"
                              href={"/admin/change-password"}
                            >
                              <FaFileDownload /> Change Password
                            </Link>
                          </button>
                        )}
                        <hr className="mt-5 mb-3" />
                        <div className="">
                          <>
                            <button
                              onClick={handleLogout}
                              className="head-input-button"
                            >
                              Logout
                            </button>
                          </>
                        </div>
                      </div>
                    </div>
                  }
                  placement="bottomRight"
                >
                  <div className="">
                    <img
                      src={
                        user?.imageUrl
                          ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${user?.imageUrl}`
                          : "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                      }
                      className="rounded-full h-[40px] w-[40px] overflow-hidden"
                      alt="Picture of the author"
                    />
                  </div>
                </Dropdown>
              </div>
            ) : (
              <>
                {" "}
                <Link href={"/login/"}>
                  <button className="head-input-button">Login</button>
                </Link>
              </>
            )}
          </div>
        </div>
        <NavbarSmallDevice
          token={token}
          isOpen={open}
          handleLogout={handleLogout}
          setOpen={setOpen}
        ></NavbarSmallDevice>
      </div>
    </div>
  );
};

export default Navbar;
