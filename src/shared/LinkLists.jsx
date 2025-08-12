/* eslint-disable react-hooks/rules-of-hooks */
import { FaUsersCog } from "react-icons/fa";
import {
  MdAdminPanelSettings,
  MdOutlineAssignmentReturned,
  MdOutlineReviews,
} from "react-icons/md";
import { FaPeopleCarryBox, FaRegNewspaper } from "react-icons/fa6";
import { BsChatSquareText } from "react-icons/bs";
import { IoDocumentAttachSharp } from "react-icons/io5";
import { CgUserlane } from "react-icons/cg";

// for admion and superAdmin
export const settingsSidebar = [
  {
    icon: <FaUsersCog />,
    link_name: "Campaigns",
    link: "/admin/dashboard/campaigns",
  },
  {
    icon: <FaPeopleCarryBox />,
    link_name: "Leaders",
    link: "/admin/dashboard/volunteers",
  },
  {
    icon: <MdOutlineAssignmentReturned />,
    link_name: "Users",
    link: "/admin/dashboard/blood-banks",
  },
  {
    icon: <BsChatSquareText />,
    link_name: "Contacts",
    link: "/admin/dashboard/contacts",
  },
  {
    icon: <IoDocumentAttachSharp />,
    link_name: "Notice",
    link: "/admin/dashboard/notices",
  },
  {
    icon: <FaRegNewspaper />,
    link_name: "News",
    link: "/admin/dashboard/news",
  },
  {
    icon: <MdOutlineReviews />,
    link_name: "Reviews",
    link: "/admin/dashboard/review-manage",
  },
  {
    icon: <MdOutlineReviews />,
    link_name: "Donation",
    link: "/admin/dashboard/donation-tracking",
  },
  {
    icon: <MdAdminPanelSettings />,
    link_name: "Admins",
    link: "/admin/dashboard/admin-manage",
    onlySuperAdmin: true,
  },
];

// for volunteerSidebar
export const volunteerSidebar = [
  {
    icon: <FaUsersCog />,
    link_name: "My Campaigns",
    link: "/admin/dashboard/my-campaign",
  },
  {
    icon: <CgUserlane />,
    link_name: "My Donors",
    link: "/admin/dashboard/donar-manage",
  },
];
