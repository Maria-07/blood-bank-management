/* eslint-disable react-hooks/rules-of-hooks */
import { FaComments, FaFileContract, FaUsersCog } from "react-icons/fa";
import {
  MdDriveFileRenameOutline,
  MdOutlineAssignmentReturned,
  MdTask,
} from "react-icons/md";
import { LuFileType2 } from "react-icons/lu";
import { TiDocumentText } from "react-icons/ti";
import { IoIosOptions, IoIosSettings } from "react-icons/io";
import { GrSettingsOption } from "react-icons/gr";

export const settingsSidebar = [
  {
    icon: <FaUsersCog />,
    link_name: "Campaigns",
    link: "/admin/dashboard/campaigns",
  },
  {
    icon: <MdOutlineAssignmentReturned />,
    link_name: "Blood Bank",
    link: "/admin/dashboard/blood-banks",
  },
];
