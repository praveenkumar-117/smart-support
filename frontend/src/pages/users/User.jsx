import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  BookOpen,
  Settings,
  CircleQuestionMark,
  LogOut,
 } from "lucide-react";


import { Outlet } from "react-router-dom";
import TopNavbar from "../../components/otherComponents/navbar";
import { useDispatch } from "react-redux";
import ConfirmPopup from "../../components/otherComponents/ConfirmPopup";
import { logoutUser } from "../../redux/slices/authSlice";
import Footer from "../../components/otherComponents/Footer";

const User = () => {
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("/user/dashboard")
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveTab(location.pathname)
  }, [location])


  const navigate = useNavigate();
  return (

    <>
      <div className="flex min-h-screen w-full min-w-0 bg-gray-200 text-gray-900 dark:bg-zinc-950 dark:text-gray-100">


        {/* Sidebar */}
        <div className="flex w-17 shrink-0 flex-col gap-2 border-r border-gray-300 bg-zinc-900 px-2 py-4 dark:border-zinc-800 sm:w-19 md:w-1/5 md:px-3 lg:w-1/6">

          {/* Logo */}
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <img
              src="/logo123.png"
              alt="Smart Support"
              className="h-10 w-10 shrink-0 object-contain md:h-12.5 md:w-15"
            />

            <div className="hidden min-w-0 flex-col items-start md:flex">
              <h1 className="text-base font-bold leading-tight text-gray-50">
                Smart Support
              </h1>

              <p className="text-sm font-bold leading-tight text-violet-500 lg:text-base">
                Better Solutions.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-4 flex w-full flex-1 flex-col gap-3 px-0 text-sm md:px-1">

            {/* Dashboard */}
            <button
              onClick={() => navigate("/user/dashboard")}
              title="Dashboard"
              className={`flex items-center justify-center gap-3 rounded-lg px-2 py-3 transition-colors cursor-pointer md:justify-start md:px-3 md:py-2 ${activeTab === "/user/dashboard"
                  ? "bg-violet-600 text-white"
                  : "text-gray-300 hover:bg-zinc-700 hover:text-gray-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
            >
              <LayoutDashboard size={20} className="shrink-0" />
              <span className="hidden md:inline">Dashboard</span>
            </button>

            {/* My Tickets */}
            <button
              onClick={() => navigate("/user/my-tickets")}
              title="My Tickets"
              className={`flex items-center justify-center gap-3 rounded-lg px-2 py-3 transition-colors cursor-pointer md:justify-start md:px-3 md:py-2 ${activeTab === "/user/my-tickets"
                  ? "bg-violet-600 text-white"
                  : "text-gray-300 hover:bg-zinc-700 hover:text-gray-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
            >
              <Ticket size={20} className="shrink-0" />
              <span className="hidden md:inline">My Tickets</span>
            </button>

            {/* Create Ticket */}
            <button
              onClick={() => navigate("/user/create-ticket")}
              title="Create Ticket"
              className={`flex items-center justify-center gap-3 rounded-lg px-2 py-3 transition-colors cursor-pointer md:justify-start md:px-3 md:py-2 ${activeTab === "/user/create-ticket"
                  ? "bg-violet-600 text-white"
                  : "text-gray-300 hover:bg-zinc-700 hover:text-gray-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
            >
              <PlusCircle size={20} className="shrink-0" />
              <span className="hidden md:inline">Create Ticket</span>
            </button>

            {/* Knowledge Base */}
            <button
              onClick={() => navigate("/user/knowledge-base")}
              title="Knowledge Base"
              className={`flex items-center justify-center gap-3 rounded-lg px-2 py-3 transition-colors cursor-pointer md:justify-start md:px-3 md:py-2 ${activeTab === "/user/knowledge-base"
                  ? "bg-violet-600 text-white"
                  : "text-gray-300 hover:bg-zinc-700 hover:text-gray-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
            >
              <BookOpen size={20} className="shrink-0" />
              <span className="hidden md:inline">Knowledge Base</span>
            </button>

            <hr className="my-1 border-zinc-700" />

            {/* Settings */}
            <button
              onClick={() => navigate("/user/settings")}
              title="Settings"
              className={`flex items-center justify-center gap-3 rounded-lg px-2 py-3 transition-colors cursor-pointer md:justify-start md:px-3 md:py-2 ${activeTab === "/user/settings"
                  ? "bg-violet-600 text-white"
                  : "text-gray-300 hover:bg-zinc-700 hover:text-gray-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
            >
              <Settings size={20} className="shrink-0" />
              <span className="hidden md:inline">Settings</span>
            </button>

            {/* Help & Support */}
            <button
              onClick={() => navigate("/user/help-support")}
              title="Help & Support"
              className={`flex items-center justify-center gap-3 rounded-lg px-2 py-3 transition-colors cursor-pointer md:justify-start md:px-3 md:py-2 ${activeTab === "/user/help-support"
                  ? "bg-violet-600 text-white"
                  : "text-gray-300 hover:bg-zinc-700 hover:text-gray-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
            >
              <CircleQuestionMark size={20} className="shrink-0" />
              <span className="hidden md:inline">Help & Support</span>
            </button>
          </div>

          {/* Logout */}
          <div className="flex w-full px-0 md:px-1">
            <button
              onClick={() => setShowMessagePopup(true)}
              title="Log out"
              className="flex w-full items-center justify-center gap-3 rounded-lg px-2 py-3 text-gray-100 transition-colors hover:bg-red-600 hover:text-white cursor-pointer md:justify-start md:px-3 md:py-2 dark:text-gray-400 dark:hover:bg-red-600 dark:hover:text-gray-100"
            >
              <LogOut size={20} className="shrink-0" />
              <span className="hidden md:inline">Log out</span>
            </button>
          </div>
        </div>

       {/* Main Section */}
  <div className="flex min-w-0 flex-1 flex-col">
    <div className="min-w-0 flex-1 bg-gray-200 p-2 dark:bg-zinc-950 sm:p-3 md:p-4">
      <TopNavbar />

      {/* Child Routes */}
      <Outlet />
    </div>

    <Footer />
  </div>

        {/* Logout Confirmation */}
        {showMessagePopup && (
          <ConfirmPopup
            title="Confirm Logout"
            message="Are you sure you want to log out?"
            confirmText="Logout"
            cancelText="Cancel"
            onCancel={() => setShowMessagePopup(false)}
            onConfirm={async () => {
              const result = await dispatch(logoutUser());

              if (logoutUser.fulfilled.match(result)) {
                setShowMessagePopup(false);
                navigate("/", { replace: true });
              }
            }}
          />
        )}
      </div>
    </>

  );
};

export default User;
