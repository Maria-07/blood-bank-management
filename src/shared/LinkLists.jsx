/* eslint-disable react-hooks/rules-of-hooks */
import { FaUsersCog } from "react-icons/fa";
import {
  MdAdminPanelSettings,
  MdOutlineAssignmentReturned,
} from "react-icons/md";
import { FaPeopleCarryBox, FaRegNewspaper } from "react-icons/fa6";
import { BsChatSquareText } from "react-icons/bs";
import { IoDocumentAttachSharp } from "react-icons/io5";
import { CgUserlane } from "react-icons/cg";

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
    link_name: "User Management",
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
    icon: <MdAdminPanelSettings />,
    link_name: "Admins",
    link: "/admin/dashboard/admin-manage",
    onlySuperAdmin: true,
  },
];
export const volunteerSidebar = [
  {
    icon: <CgUserlane />,
    link_name: "Donors",
    link: "/admin/dashboard/donar-manage",
  },
];
