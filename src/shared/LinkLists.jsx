/* eslint-disable react-hooks/rules-of-hooks */
import { FaUsersCog } from "react-icons/fa";
import { MdOutlineAssignmentReturned } from "react-icons/md";
import { FaPeopleCarryBox } from "react-icons/fa6";

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
];
