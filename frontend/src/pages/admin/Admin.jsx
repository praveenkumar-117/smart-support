import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  Settings,
  Ticket,
  Users,
  BarChart3,
  Megaphone,
} from "lucide-react";


import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TopNavbar from "../../components/otherComponents/navbar";
import { useEffect, useState } from "react";
import { logoutUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import ConfirmPopup from "../../components/otherComponents/ConfirmPopup";
import Footer from "../../components/otherComponents/Footer";

const Admin = () => {
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("/admin/dashboard")
  const dispatch = useDispatch();



  useEffect(() => {
    setActiveTab(location.pathname)
  }, [location])

  return (
    <div className="w-full flex">

      {/* Sidebar */}
      <div className="w-1/6 max-xl:w-1/5 max-lg:w-1/4 max-md:w-16 shrink-0 py-4 px-2 bg-zinc-900 flex flex-col gap-2">

        {/* Logo */}
        <div className="flex items-center min-w-0">
          <img
            src="/logo123.png"
            alt="Smart Support"
            className="w-20 h-15 max-xl:w-16 max-xl:h-auto max-md:w-full object-contain shrink-0"
          />

          <div className="flex flex-col items-start min-w-0 max-md:hidden">
            <h1 className="text-white text-base font-bold leading-tight">
              Smart Support
            </h1>

            <p className="text-blue-600 text-base font-bold leading-tight">
              Better Solutions.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="w-full flex flex-1 flex-col gap-3 px-4 max-xl:px-2 max-md:px-0 mt-4 text-sm">

          {/* Dashboard */}
          <button
            onClick={() => navigate("/admin/dashboard")}
            className={`flex items-center gap-3 px-4 max-xl:px-2 max-md:px-0 max-md:justify-center py-1 rounded-md text-gray-400 hover:text-white cursor-pointer ${activeTab === "/admin/dashboard" ? "bg-violet-600 text-white " : "text-gray-200 hover:bg-zinc-700"}`}
          >
            <LayoutDashboard size={20} className="shrink-0" />
            <span className="max-md:hidden whitespace-nowrap">Dashboard</span>
          </button>

          {/* Tickets */}
          <button
            onClick={() => navigate("/admin/tickets")}
            className={`flex items-center gap-3 px-4 max-xl:px-2 max-md:px-0 max-md:justify-center py-1 rounded-md text-gray-400 hover:text-white cursor-pointer ${activeTab === "/admin/tickets" ? "bg-violet-600 text-white" : "text-gray-200 hover:bg-zinc-700"}`}
          >
            <Ticket size={20} className="shrink-0" />
            <span className="max-md:hidden whitespace-nowrap">Tickets</span>
          </button>

          {/* Users */}
          <button
            onClick={() => navigate("/admin/users")}
            className={`flex items-center gap-3 px-4 max-xl:px-2 max-md:px-0 max-md:justify-center py-1 rounded-md text-gray-400 hover:text-white cursor-pointer ${activeTab === "/admin/users" ? "bg-violet-600 text-white" : "text-gray-400 hover:bg-zinc-700"}`}
          >
            <Users size={20} className="shrink-0" />
            <span className="max-md:hidden whitespace-nowrap">Users</span>
          </button>

          {/* Knowledge Base Management */}
          <button
            onClick={() => navigate("/admin/kbase")}
            className={`flex items-center gap-3 px-4 max-xl:px-2 max-md:px-0 max-md:justify-center py-1 rounded-lg text-gray-400 hover:text-white cursor-pointer ${activeTab === "/admin/kbase" ? "bg-violet-600 text-white" : "text-gray-400 hover:bg-zinc-700"}`}
          >
            <BookOpen size={20} className="shrink-0" />
            <span className="max-md:hidden whitespace-nowrap">Knowledge Base</span>
          </button>

          {/* Announcements */}
          <button
            onClick={() => navigate("/admin/annoucements")}
            className={`flex items-center gap-3 px-4 max-xl:px-2 max-md:px-0 max-md:justify-center py-1 rounded-lg text-gray-400 hover:text-white cursor-pointer ${activeTab === "/admin/annoucements" ? "bg-violet-600 text-white" : "text-gray-400 hover:bg-zinc-700"}`}
          >
            <Megaphone size={20} className="shrink-0" />
            <span className="max-md:hidden whitespace-nowrap">Announcements</span>
          </button>

          {/* Reports */}
          <button
            onClick={() => navigate("/admin/reports")}
            className={`flex items-center gap-3 px-4 max-xl:px-2 max-md:px-0 max-md:justify-center py-1 rounded-lg text-gray-400 hover:text-white cursor-pointer ${activeTab === "/admin/reports" ? "bg-violet-600 text-white" : "text-gray-400 hover:bg-zinc-700"}`}
          >
            <BarChart3 size={20} className="shrink-0" />
            <span className="max-md:hidden whitespace-nowrap">Reports</span>
          </button>

          <hr className="text-zinc-600 rounded-2xl" />

          {/* Settings */}
          <button
            onClick={() => navigate("/admin/asettings")}
            className={`flex items-center gap-3 px-4 max-xl:px-2 max-md:px-0 max-md:justify-center py-1 rounded-lg text-gray-400 hover:text-white cursor-pointer ${activeTab === "/admin/asettings" ? "bg-violet-600 text-white" : "text-gray-400 hover:bg-zinc-700"}`}
          >
            <Settings size={20} className="shrink-0" />
            <span className="max-md:hidden whitespace-nowrap">Setting</span>
          </button>

        </div>

        {/* Logout */}
        <div className="w-full flex px-4 max-xl:px-2 max-md:px-0">
          <button
            onClick={() => setShowMessagePopup(true)}
            className="w-full flex items-center gap-3 px-4 max-xl:px-2 max-md:px-0 max-md:justify-center py-1 rounded-lg text-gray-400 hover:bg-violet-700 hover:text-white cursor-pointer"
          >
            <LogOut size={20} className="shrink-0" />
            <span className="max-md:hidden whitespace-nowrap">Log out</span>
          </button>
        </div>

      </div>

      {/* Main Section */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <div className="p-2 dark:bg-zinc-950 flex flex-col flex-1 bg-gray-200 min-w-0">

          <TopNavbar />

          {/* Child Routes */}
          <Outlet />

        </div>

        <Footer />
      </div>

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
              setShowMessagePopup(false)
              navigate("/", { replace: true });
            }
          }}
        />
      )}

    </div>
  );
};

export default Admin;