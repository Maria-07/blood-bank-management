import DashboardNavbar from "@/src/Components/Layouts/DashboardNavbar";
import { settingsSidebar } from "@/src/shared/LinkLists";

export default function RootLayout({ children }) {
  return (
    <div className="md:w-[90%] sm:mx-auto ">
      <div className="grid sm:grid-cols-12 grid-cols-1 ">
        <div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className={`p-2 my-2 border-[1px] lg:col-span-2 shadow-md rounded-md min-h-screen bg-dark-background border-dark-background `}
        >
          {settingsSidebar.map((s, i) => (
            <DashboardNavbar key={i} data={s}></DashboardNavbar>
          ))}
        </div>
        <div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className={`sm:m-2 sm:p-4 lg:col-span-10 md:col-span-11 border-[1px] shadow-md rounded-lg min-h-screen bg-dark-background border-dark-background`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
