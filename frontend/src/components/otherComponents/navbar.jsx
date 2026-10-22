import React from "react";
import { useSelector } from "react-redux";
import {
  Bell,
  ChevronDown,
  CircleUserRound,
} from "lucide-react";
import { TbUserFilled } from "react-icons/tb";

const TopNavbar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="w-full min-w-0 min-h-14 px-2 sm:px-3 md:px-4 bg-zinc-900 dark:border-zinc-700 border rounded-md shadow-sm flex items-center justify-between gap-2">

  {/* Left Section */}
  <div className="min-w-0 flex flex-col justify-center">
    <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-200 truncate">
      {user?.role === "support_admin" ? "Admin DashBoard" : "User DashBoard"}
    </h2>
  </div>

  {/* Right Section */}
  <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-4">

    {/* Notification */}
    <button className="relative shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg text-gray-200 hover:bg-gray-100 hover:text-gray-600 transition cursor-pointer">
      <Bell size={19} />

      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
    </button>

    {/* Divider */}
    <div className="h-6 sm:h-7 w-px shrink-0 bg-gray-200"></div>

    {/* Profile */}
    <div className="min-w-0 px-1 sm:px-2 md:px-4 flex items-center gap-1.5 sm:gap-2.5 cursor-pointer">

      {user?.profileImage ? (
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full object-cover border-2 border-purple-500"
        />
      ) : (
        <TbUserFilled
          size={36}
          className="p-1.5 shrink-0 rounded-full bg-purple-100 text-purple-500"
        />
      )}

      <div className="min-w-0 flex flex-col leading-tight">
        <h1 className="max-w-20 sm:max-w-32 md:max-w-none truncate text-sm sm:text-base font-semibold text-gray-200">
          {user?.name || "User"}
        </h1>
      </div>

     

    </div>

  </div>

</nav>
  );
};

export default TopNavbar;