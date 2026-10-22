import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  Eye,
  EyeOff,
  Info,
  LockKeyhole,
  Mail,
  User,
  X
} from "lucide-react";
import React, { useState } from "react";
import { RiUserAddLine } from "react-icons/ri";
import MessagePopup from "../otherComponents/MessagePopup";
import api from "../../api/api";

const AddUser = ({ onClose }) => {
  const queryClient = useQueryClient();
  const [showMessagePopup, setShowMessagePopup] = useState(false);

  const [messagePopupData, setMessagePopupData] = useState({
    type: "success",
    title: "",
    message: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userDept, setUserDept] = useState("")
  const [userRole, setUserRole] = useState("")
  const [userPassword, SetUserPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    createUserMutation.mutate({
      name: userName,
      email: userEmail,
      password: userPassword,
      department: userDept,
      role: userRole,
    });
  }

  const createUserMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await api.post("/user/createuser", userData);

      return response.data;
    },

    onSuccess: (data) => {


      queryClient.invalidateQueries({
        queryKey: ["backendUser"],
      });

      setUserName("");
      setUserEmail("");
      setUserDept("");
      setUserRole("");
      SetUserPassword("");

      setMessagePopupData({
        type: "success",
        title: "User Created",
        message: data.message || "User has been created successfully.",
      });

      setShowMessagePopup(true);
    },

    onError: (error) => {


      setMessagePopupData({
        type: "error",
        title: "User Creation Failed",
        message:
          error.response?.data?.message ||
          "Unable to create user. Please try again.",
      });

      setShowMessagePopup(true);
    },
  });

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/50 p-4">

      {/* Popup */}
      <div className="w-full max-w-lg rounded-xl bg-gray-200 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b bg-gray-300 border-gray-200 dark:bg-zinc-800 dark:border-zinc-700 p-5">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-lg bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400">
              <RiUserAddLine size={24} />
            </span>

            <div>
              <h2 className="text-lg font-bold">
                Add New User
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Create a new user account and set their access details.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            title="CLose"
            className="text-gray-500 dark:text-gray-400 cursor-pointer rounded-md hover:text-white hover:bg-red-500 p-1"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <div className="p-5 flex flex-col gap-4">

          {/* Name & Email */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>

              <div className="flex items-center border bg-gray-50 border-gray-300 dark:border-zinc-700 rounded-lg px-3">
                <User size={17} className="text-gray-400" />

                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>

              <div className="flex items-center border bg-gray-50 border-gray-300 dark:border-zinc-700 rounded-lg px-3">
                <Mail size={17} className="text-gray-400" />

                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-0"
                />
              </div>
            </div>

          </div>

          {/* Department & Role */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium mb-1">
                Department
              </label>

              <div className="flex items-center border bg-gray-50 border-gray-300 dark:border-zinc-700 rounded-lg px-3">
                <Building2 size={17} className="text-gray-400" />

                <select
                  className="w-full px-3 py-2 text-sm bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none cursor-pointer"
                  value={userDept}
                  onChange={(e) => setUserDept(e.target.value)}
                >
                  <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100" value="" disabled>
                    Select department
                  </option>
                  <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100" value="IT">IT</option>
                  <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100" value="HR">HR</option>
                  <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100" value="Finance">Finance</option>
                  <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100" value="Operations">Operations</option>
                  <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100" value="Support">Support</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Role
              </label>

              <div className="flex items-center border bg-gray-50 border-gray-300 dark:border-zinc-700 rounded-lg px-3">
                <RiUserAddLine className="text-gray-400" size={17} />

                <select
                  className="w-full px-3 py-2 text-sm bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none cursor-pointer"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100" value="" disabled>
                    Select role
                  </option>
                  <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100"
                    value="user">User</option>
                  <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100" value="support_admin">Admin</option>
                </select>
              </div>
            </div>

          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>

            <div className="flex items-center border bg-gray-50 border-gray-300 dark:border-zinc-700 rounded-lg px-3">
              <LockKeyhole size={17} className="text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={userPassword}
                onChange={(e) => SetUserPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-0"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="flex gap-3 rounded-lg bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900 p-3">
            <Info
              className="text-violet-600 dark:text-violet-400 shrink-0"
              size={20}
            />

            <div>
              <h3 className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                Password Requirements:
              </h3>

              <ul className="mt-1 text-xs text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Minimum 8 characters</li>
                <li>• At least one uppercase letter (A-Z)</li>
                <li>• At least one lowercase letter (a-z)</li>
                <li>• At least one number (0-9)</li>
                <li>• At least one special character (!@#$%^&amp;*)</li>
              </ul>
            </div>
          </div>

          {/* Welcome Email */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              defaultChecked
              className="mt-1 w-4 h-4 accent-indigo-600 cursor-pointer"
            />

            <div>
              <h3 className="text-sm font-medium">
                Send welcome email to the user
              </h3>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                User will receive an email with login instructions.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-zinc-700 p-5">

          <button
            onClick={onClose}
            className="border border-gray-400 dark:border-zinc-600 rounded-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={createUserMutation.isPending}
            className="flex items-center gap-2 border border-violet-600 rounded-lg px-4 py-2 text-white bg-violet-600 hover:bg-blue-600 hover:border-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            <RiUserAddLine size={18} />

          {createUserMutation.isPending ? "Creating..." : "Create User"}
        </button>

      </div>

    </div>

      {
    showMessagePopup && (
      <MessagePopup
        type={messagePopupData.type}
        title={messagePopupData.title}
        message={messagePopupData.message}
        onClose={() => setShowMessagePopup(false)}
      />
    )
  }
    </div >

  );
};

export default AddUser;