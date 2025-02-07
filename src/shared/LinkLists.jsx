/* eslint-disable react-hooks/rules-of-hooks */
import { FaUsersCog } from "react-icons/fa";
import { MdOutlineAssignmentReturned } from "react-icons/md";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { BsChatSquareText } from "react-icons/bs";
import { IoDocumentAttachSharp } from "react-icons/io5";

export const settingsSidebar = [
  {
    icon: <FaUsersCog />,
    link_name: "Campaigns",
    link: "/admin/dashboard/campaigns",
  },
  {
    icon: <FaPeopleCarryBox />,
    link_name: "Volunteers",
    link: "/admin/dashboard/volunteers",
  },
  {
    icon: <MdOutlineAssignmentReturned />,
    link_name: "Blood Bank",
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
];
