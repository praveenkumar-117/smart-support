
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import User from "./pages/users/User";
import Admin from "./pages/admin/Admin";

// User
import UserDashboard from "./components/userComponents/UserDashboard";
import CreateTicket from "./components/userComponents/CreateTicket";
import MyTicket from "./components/userComponents/MyTicket";
import Knowledge from "./components/userComponents/knowledge";
import HelpNSupport from "./components/userComponents/HelpNSupport";
import Settings from "./components/userComponents/Setting";

// Admin
import AdminDashboard from "./components/adminComponent/AdminDashboard";
import AdminTickets from "./components/adminComponent/AdminTickets";
import AdminUsers from "./components/adminComponent/AdminUsers";
import AdminKB from "./components/adminComponent/AdminKB";
import AdminReports from "./components/adminComponent/AdminReports";
import AdminAnnoucements from "./components/adminComponent/AdminAnnoucements";
import AdminSetting from "./components/adminComponent/AdminSetting";

// Login
import Login from "./pages/Login";
import ProtectedRoute from "./config/ProtectedRoute";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/slices/authSlice";
import ScrollToTop from "./config/ScrollToTop";
import NotFound404 from "./pages/NotFound404";
import AboutProject from "./pages/AboutProject";

function App() {
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  // Apply and persist theme globally
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Fetch current user
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(getCurrentUser(token));
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          {/* Login */}
          <Route path="/" element={<Login />} />
          <Route path="/about-project" element={<AboutProject />} />

          {/* USER ROUTES */}
          <Route element={<ProtectedRoute allowedRole="user" />}>
            <Route path="user" element={<User />}>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="create-ticket" element={<CreateTicket />} />
              <Route path="my-tickets" element={<MyTicket />} />
              <Route path="knowledge-base" element={<Knowledge />} />
              <Route path="help-support" element={<HelpNSupport />} />
              <Route path="settings" element={<Settings theme={theme}
                setTheme={setTheme} />} />
            </Route>
          </Route>

          {/* ADMIN ROUTES */}
          <Route element={<ProtectedRoute allowedRole="support_admin" />}>
            <Route path="admin" element={<Admin />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="tickets" element={<AdminTickets />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="kbase" element={<AdminKB />} />
              <Route path="annoucements" element={<AdminAnnoucements />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="asettings" element={<AdminSetting
                theme={theme}
                setTheme={setTheme}
              />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
