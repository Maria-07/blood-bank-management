"use client";

import DashboardNavbar from "@/src/Components/Layouts/DashboardNavbar";
import Loader from "@/src/Components/Layouts/Loader";
import ProtectedRoute from "@/src/Components/Layouts/ProtectedRoute";
import { useAuth } from "@/src/Hook/AuthContext";
import UserInfo from "@/src/Hook/UserInfo";
import { settingsSidebar, volunteerSidebar } from "@/src/shared/LinkLists";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const user = UserInfo();
  const { userType, isLoading } = useAuth();
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    if (user?.isSuperAdmin) {
      setUserRole("superAdmin");
    } else if (user?.userType) {
      setUserRole(user.userType);
    } else if (userType) {
      setUserRole(userType);
    }
  }, [user, userType]);

  if (isLoading || !userRole) {
    return (
      <div className="text-center py-10">
        Loading dashboard...
        <Loader></Loader>
      </div>
    );
  }

  let filteredSidebar;

  if (userRole === "superAdmin") {
    filteredSidebar = settingsSidebar;
  } else if (userRole === "Admin") {
    filteredSidebar = settingsSidebar;
  } else {
    filteredSidebar = volunteerSidebar;
  }

  return (
    <ProtectedRoute allowedUserTypes={["Admin", "superAdmin", "Volunteer"]}>
      <div className="md:w-[90%] sm:mx-auto">
        <div className="grid sm:grid-cols-12 grid-cols-1">
          <div className="p-2 my-2 border-[1px] lg:col-span-2 shadow-md rounded-md min-h-screen bg-dark-background border-dark-background">
            {filteredSidebar?.map((s, i) => (
              <DashboardNavbar key={i} data={s} />
            ))}
          </div>
          <div className="sm:m-2 sm:p-4 lg:col-span-10 md:col-span-11 border-[1px] shadow-md rounded-lg min-h-screen bg-dark-background border-dark-background">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
