import Image from "next/image";
import logo from "@/src/assets/Image/logo/darkLogo.png";
import mlogo from "@/src/assets/Image/logo/mbLogo.png";
import Logo from "@/src/assets/Image/logo/logo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "@/src/Hook/AuthContext";

const Navbar = () => {
  const { token, userType, logout } = useAuth();

  const currentRoute = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Update context
    router.push("/login");
  };

  return (
    <div>
      {" "}
      <div className="hidden lg:block sticky top-0 mb-10">
        {/* <div className="sm:w-[90%]  sm:mx-auto py-5 flex justify-between border-[1px] shadow-md px-2 rounded-xl"> */}

        <div className="bg-primary py-3">
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
                Notices
              </Link>{" "}
              <Link
                className="text-white font-semibold hover:text-primary2 transition-all mr-2 border-r-[2px] pr-2"
                href={"/contact/"}
              >
                Contact Us
              </Link>{" "}
              {token && userType === "Admin" && (
                <Link
                  className="bg-primary2 text-white text-[0.9rem] px-4 py-[3px] rounded-md shadow-lg "
                  href={"/admin/dashboard/campaigns/"}
                >
                  Dashboard
                </Link>
              )}
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
                  <button onClick={handleLogout} className="head-input-button">
                    Logout
                  </button>
                </div>
              )}
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
              Home
            </Link>
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
              About us
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
          <button className="">User</button>
        </div>
        {/* <NavbarSmallDevice isOpen={open} setOpen={setOpen}></NavbarSmallDevice> */}
      </div>
    </div>
  );
};

export default Navbar;
