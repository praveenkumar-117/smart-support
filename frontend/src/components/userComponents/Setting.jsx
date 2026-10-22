import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  BookOpenText,
  BookText,
  Camera,
  ChevronRight,
  CircleCheck,
  CircleQuestionMark,
  Computer,
  Info,
  LockKeyhole,
  Mail,
  Megaphone,
  MessageSquareMore,
  MessageSquareText,
  Moon,
  Palette,
  Save,
  Sun,
  Trash2,
  User,
  UsersRound,
  Eye
  , EyeOff,
  Clock3,
  CalendarDays,
  Building2,
  UserShield
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api/api"
import MessagePopup from "../otherComponents/MessagePopup";

const Setting = ({ theme, setTheme }) => {
  const userId = useSelector((state) => state.auth.user?._id);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMessage, setShowMessage] = useState(null);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [personalNumber, setPersonalNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  let checkUC = /[A-Z]/.test(newPassword)
  let checkLC = /[a-z]/.test(newPassword)
  let checkNum = /[0-9]/.test(newPassword)
  let checkLen = ((newPassword.length) >= 8)
  let checkSym = /[!@#$%^&*]/.test(newPassword)

  let passStrength = 0

  if (checkLC || checkLen || checkNum || checkSym || checkUC) {
    passStrength = 1
  }
  if (checkLC && checkUC) {
    passStrength = 2
  }
  if (checkLC && checkUC && checkNum) {
    passStrength = 3
  }
  if (checkLC && checkUC && checkNum && checkSym) {
    passStrength = 4
  }
  if (checkLC && checkNum && checkSym && checkUC && checkLen) {
    passStrength = 5
  }

  const handelSubmit = (userId) => {
    updateAdminPassMutation.mutate({
      id: userId,
      currentPassword,
      newPassword,
    });
  }

  const user = useSelector((state) => state.auth.user);


  const updateAdminPassMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.patch(
        `/user/change-password/`, data
      );

      return response.data;
    },


    onSuccess: (data) => {
      if (data.status === true) {

        setCurrentPassword("");
        setConfirmPassword("");
        setNewPassword("");
        setShowMessage({
          type: "success",
          title: "Password Updated",
          message: data.message || "Password updated successfully.",
        });
      }
    },

    onError: (error) => {
      setShowMessage({
        type: "error",
        title: "Password Update Failed",
        message:
          error.response?.data?.message ||
          error.message ||
          "Unable to update password.",
      });
    },
  })

  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await api.patch("/user/updateuser", formData);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["backendUser", userId],
      });

      const updatedUser = data.userData;

      if (updatedUser) {
        setUserName(updatedUser.name || "");
        setUserEmail(updatedUser.email || "");
        setPersonalNumber(updatedUser.personalNumber || "");
        setAddress(updatedUser.address || "");
        setProfileImage(updatedUser.profileImage || "");
        setSelectedImage(null);
        setImagePreview("");
      }
      setIsEditing(false);
      setShowMessage({
        type: "success",
        title: "Success",
        message: data.message || "Profile updated successfully!",
      });
    },

    onError: (error) => {
      setShowMessage({
        type: "error",
        title: "Error",
        message:
          error.response?.data?.message ||
          error.message ||
          "Profile update failed!",
      });
    },
  });

  const handleSaveChanges = () => {
    const formData = new FormData();

    formData.append("name", userName);
    formData.append("email", userEmail);
    formData.append("personalNumber", personalNumber);
    formData.append("address", address);
    if (selectedImage) {
      formData.append("profileImage", selectedImage);
    }
    updateProfileMutation.mutate(formData);
  };

  useEffect(() => {
    if (user) {
      setUserName(user.name || "");
      setUserEmail(user.email || "");
      setPersonalNumber(user.personalNumber || "");
      setAddress(user.address || "");
      setProfileImage(user.profileImage || "");
    }
  }, [user]);


  return (
    <div className="flex w-full flex-col gap-4 dark:bg-gray-950 bg-gray-200 p-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm">
        <span className="text-gray-600 dark:text-gray-400">Dashboard</span>
        <ChevronRight size={17} className="text-gray-400 dark:text-gray-300" />
        <span className="font-semibold text-gray-800 dark:text-gray-100">Settings</span>
      </div>

      {/* Page Heading */}
      <div className=" p-4 bg-gray-50 dark:bg-zinc-900 dark:border-zinc-700 rounded-lg border border-gray-300">
        <h1 className="text-lg md:text-xl lg:text-2xl  font-bold text-gray-900 dark:text-gray-400">Settings</h1>
        <p className="mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-200">
          Manage your account preferences and application settings.
        </p>
      </div>


      {/* Profile Settings */}
      <section className="bg-gray-50 flex flex-col gap-4 rounded-xl border border-gray-300  p-4 transition-colors duration-200 hover:border-gray-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-200 pb-3 dark:border-zinc-700">
          <User
            size={42}
            className="shrink-0 rounded-lg bg-violet-200 p-2 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400"
          />

          <div className="flex flex-1 items-center justify-between gap-3">
            <div>
              <h2 className="md:text-lg font-bold text-gray-900 dark:text-gray-100">
                Profile Settings
              </h2>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Update your personal information and profile details.
              </p>
            </div>

            {/* Edit / Cancel */}
            <button
              type="button"
              onClick={() => {
                if (isEditing) {
                  setUserName(user?.name || "");
                  setUserEmail(user?.email || "");
                  setPersonalNumber(user?.personalNumber || "");
                  setAddress(user?.address || "");
                  setProfileImage(user?.profileImage || "");
                  setSelectedImage(null);
                  setImagePreview("");
                  setIsEditing(false);
                } else {
                  setIsEditing(true);
                }
              }}
              className={`flex w-20 cursor-pointer items-center rounded-full border p-0.5 transition-colors duration-300 ${isEditing
                ? "border-red-500 bg-red-100 dark:bg-red-950"
                : "border-purple-400 bg-purple-200 dark:bg-purple-950"
                }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isEditing
                  ? "translate-x-12 bg-red-500"
                  : "translate-x-0 bg-purple-500"
                  }`}
              />

              <span
                className={`text-xs font-semibold transition-all duration-300 ${isEditing
                  ? "-translate-x-3 text-red-700 dark:text-red-300"
                  : "ml-1 translate-x-1 text-purple-700 dark:text-purple-300"
                  }`}
              >
                {isEditing ? "Cancel" : "Edit"}
              </span>
            </button>
          </div>
        </div>

        {/* Profile Image and Fields */}
        <div className=" flex flex-col md:flex-row gap-4 ">
          {/* Profile Image */}
          <div className="w-full lg:w-1/4 flex justify-center pt-2 items-center md:items-start">
            <div className="relative h-fit">
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-violet-200 bg-violet-100 shadow-sm dark:border-violet-900 dark:bg-zinc-800">
                {imagePreview || profileImage ? (
                  <img
                    src={imagePreview || profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User
                    size={55}
                    className="text-violet-700 dark:text-violet-400"
                  />
                )}
              </div>

              {isEditing && (
                <>
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-violet-100 text-gray-700 shadow-sm transition hover:border-violet-400 hover:bg-violet-200 hover:text-violet-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-900 dark:hover:text-violet-300"
                  >
                    <Camera size={17} />
                  </label>

                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        setSelectedImage(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </>
              )}
            </div>
          </div>

          {/* Profile Fields */}
          <div className="flex flex-col gap-4">

            <div className=" flex flex-wrap gap-4">
              <div className="w-full lg:w-[48%] flex flex-col gap-1.5">
                <label
                  htmlFor="fullName"
                  className="text-sm font-semibold text-gray-800 dark:text-gray-100"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-none disabled:text-gray-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100 dark:disabled:bg-zinc-800 dark:disabled:text-gray-400 dark:focus:ring-violet-900/40"
                />
              </div>

              <div className="w-full lg:w-[48%] flex flex-col gap-1.5">
                <label
                  htmlFor="personalNumber"
                  className="text-sm font-semibold text-gray-800 dark:text-gray-100"
                >
                  Personal Number
                </label>
                <input
                  id="personalNumber"
                  type="tel"
                  value={personalNumber}
                  onChange={(e) => setPersonalNumber(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your mobile number"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-none disabled:text-gray-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100 dark:disabled:bg-zinc-800 dark:disabled:text-gray-400 dark:focus:ring-violet-900/40"
                />
              </div>


              <div className="w-full lg:w-[48%] flex flex-col gap-1.5">
                <label
                  htmlFor="profileEmail"
                  className="text-sm font-semibold text-gray-800 dark:text-gray-100"
                >
                  Your Email
                </label>
                <input
                  id="profileEmail"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-none disabled:text-gray-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100 dark:disabled:bg-zinc-800 dark:disabled:text-gray-400 dark:focus:ring-violet-900/40"
                />
              </div>

              <div className="w-full lg:w-[48%] flex flex-col gap-1.5">
                <label
                  htmlFor="profileAddress"
                  className="text-sm font-semibold text-gray-800 dark:text-gray-100"
                >
                  Address
                </label>
                <input
                  id="profileAddress"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your address"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-none disabled:text-gray-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100 dark:disabled:bg-zinc-800 dark:disabled:text-gray-400 dark:focus:ring-violet-900/40"
                />
              </div>
            </div>

            {/* Read-only Information */}
            <div className="flex flex-row flex-wrap gap-x-3 gap-y-4 border-t border-gray-200 pt-5 dark:border-zinc-700 ">

              {/* Role */}
              <div className="w-[48%] flex items-center gap-3">
                <UserShield
                  size={40}
                  className="text-pink-600 dark:text-pink-400 bg-pink-200 dark:bg-pink-950 p-1 rounded-lg shrink-0"
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                  <p className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200">
                    {user?.role === "support_admin"
                      ? "Support Admin"
                      : user?.role || "Not Available"}
                  </p>
                </div>
              </div>

              {/* Department */}
              <div className="w-[48%] flex items-center gap-3">
                <Building2
                  size={40}
                  className="text-stone-600 dark:text-stone-300 bg-stone-200 dark:bg-stone-800 p-1 rounded-lg shrink-0"
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
                  <p className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200">
                    {user?.department || "Not Available"}
                  </p>
                </div>
              </div>

              {/* Date of Joining */}
              <div className="w-[48%] flex items-center gap-3">
                <CalendarDays
                  size={40}
                  className="text-green-600 dark:text-green-400 bg-green-200 dark:bg-green-950 p-1 rounded-lg shrink-0"
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date of Joining</p>
                  <p className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                      : "Not Available"}
                  </p>
                </div>
              </div>

              {/* Last Login */}
              <div className="w-[48%] flex items-center gap-3">
                <Clock3
                  size={40}
                  className="text-purple-600 dark:text-purple-400 bg-purple-200 dark:bg-purple-950 p-1 rounded-lg shrink-0"
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last Login</p>
                  <p className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200">
                    {user?.lastLogin
                      ? new Date(user.lastLogin).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      : "Not Available"}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
        {/* Save Changes */}
        <div className="flex justify-end border-t border-gray-200 pt-4 dark:border-zinc-700">
          <button
            type="button"
            disabled={!isEditing}
            onClick={handleSaveChanges}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-violet-700 bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:border-blue-700 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>
      </section>


      {/* Appearance and Notification Preferences */}
      <div className="flex flex-col lg:flex-row gap-6">
        <section className="flex flex-col gap-4 rounded-xl border border-gray-300 bg-gray-50 p-4 transition-colors duration-200 hover:border-gray-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3 dark:border-zinc-700">
            <Palette
              size={42}
              className="shrink-0 rounded-lg bg-amber-200 p-2 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Appearance
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Customise the look and feel of the application.
              </p>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            Theme
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Dark Mode */}
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`cursor-pointer rounded-xl border-2 p-3 text-left transition-all duration-200 ${theme === "dark"
                ? "border-violet-500 bg-violet-100 dark:bg-violet-950/20"
                : "border-gray-300 bg-gray-100 hover:bg-violet-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-violet-400/10"
                }`}
            >
              <div className="mb-3 flex justify-end">
                <CircleCheck
                  size={20}
                  className={
                    theme === "dark"
                      ? "rounded-full bg-violet-600 text-gray-50"
                      : "text-gray-400 dark:text-gray-500"
                  }
                />
              </div>

              <div className="flex items-start gap-3">
                <Moon
                  size={40}
                  className="shrink-0 rounded-lg bg-violet-200 p-2 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400"
                />
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    Dark Mode
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">
                    Preferred for low-light environments.
                  </p>
                </div>
              </div>
            </button>

            {/* Light Mode */}
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`cursor-pointer rounded-xl border-2 p-3 text-left transition-all duration-200 ${theme === "light"
                ? "border-amber-500 bg-amber-100 dark:bg-amber-950/20"
                : "border-gray-300 bg-gray-100 hover:bg-amber-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-amber-400/10"
                }`}
            >
              <div className="mb-3 flex justify-end">
                <CircleCheck
                  size={20}
                  className={
                    theme === "light"
                      ? "rounded-full bg-amber-500 text-gray-50"
                      : "text-gray-400 dark:text-gray-500"
                  }
                />
              </div>

              <div className="flex items-start gap-3">
                <Sun
                  size={40}
                  className="shrink-0 rounded-lg bg-amber-200 p-2 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                />
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    Light Mode
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">
                    Better for bright environments.
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Primary Colors */}
          <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-3 dark:border-zinc-700 dark:bg-zinc-800">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Primary Colors
            </h3>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                aria-label="Indigo theme"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-gray-50 ring-2 ring-indigo-300 ring-offset-2 ring-offset-gray-100 transition hover:scale-110 dark:ring-offset-zinc-800"
              >
                <CircleCheck size={20} />
              </button>

              <button
                type="button"
                aria-label="Blue theme"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-gray-50 transition hover:scale-110"
              >
                <CircleCheck size={20} />
              </button>

              <button
                type="button"
                aria-label="Green theme"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-green-600 text-gray-50 transition hover:scale-110"
              >
                <CircleCheck size={20} />
              </button>

              <button
                type="button"
                aria-label="Amber theme"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-amber-500 text-gray-50 transition hover:scale-110"
              >
                <CircleCheck size={20} />
              </button>

              <button
                type="button"
                aria-label="Red theme"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-red-500 text-gray-50 transition hover:scale-110"
              >
                <CircleCheck size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="flex flex-col gap-4 rounded-xl border border-gray-300 bg-gray-50 p-4 transition-colors duration-200 hover:border-gray-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3 dark:border-zinc-700">
            <Bell
              size={42}
              className="shrink-0 rounded-lg bg-sky-200 p-2 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Notification Preferences
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose what you want to receive.
              </p>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-100 p-3 transition hover:border-violet-300 hover:bg-violet-100 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-violet-800 dark:hover:bg-violet-950/10">
            <div className="flex min-w-0 items-center gap-3">
              <Mail
                size={36}
                className="shrink-0 rounded-lg bg-violet-200 p-2 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Email Notifications
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">
                  Receive important notifications about your tickets.
                </p>
              </div>
            </div>
            <span className="relative h-6 w-11 shrink-0 rounded-full bg-indigo-600 p-1">
              <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-gray-50 shadow-sm" />
            </span>
          </div>

          {/* Ticket Status Updates */}
          <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-100 p-3 transition hover:border-green-300 hover:bg-green-100 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-green-900 dark:hover:bg-green-950/10">
            <div className="flex min-w-0 items-center gap-3">
              <BookText
                size={36}
                className="shrink-0 rounded-lg bg-green-200 p-2 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Ticket Status Updates
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">
                  Get notified about your ticket status.
                </p>
              </div>
            </div>
            <span className="relative h-6 w-11 shrink-0 rounded-full bg-indigo-600 p-1">
              <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-gray-50 shadow-sm" />
            </span>
          </div>

          {/* New Replies */}
          <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-100 p-3 transition hover:border-sky-300 hover:bg-sky-100 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-sky-900 dark:hover:bg-sky-950/10">
            <div className="flex min-w-0 items-center gap-3">
              <MessageSquareText
                size={36}
                className="shrink-0 rounded-lg bg-sky-200 p-2 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  New Replies
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">
                  Get notified about new replies.
                </p>
              </div>
            </div>
            <span className="relative h-6 w-11 shrink-0 rounded-full bg-gray-400 p-1 dark:bg-zinc-600">
              <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-gray-50 shadow-sm" />
            </span>
          </div>

          {/* System Announcements */}
          <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-100 p-3 transition hover:border-amber-300 hover:bg-amber-100 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-amber-900 dark:hover:bg-amber-950/10">
            <div className="flex min-w-0 items-center gap-3">
              <Megaphone
                size={36}
                className="shrink-0 rounded-lg bg-amber-200 p-2 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  System Announcements
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">
                  Important updates and system alerts.
                </p>
              </div>
            </div>
            <span className="relative h-6 w-11 shrink-0 rounded-full bg-indigo-600 p-1">
              <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-gray-50 shadow-sm" />
            </span>
          </div>

          {/* Knowledge Base Updates */}
          <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-100 p-3 transition hover:border-pink-300 hover:bg-pink-100 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-pink-900 dark:hover:bg-pink-950/10">
            <div className="flex min-w-0 items-center gap-3">
              <BookOpenText
                size={36}
                className="shrink-0 rounded-lg bg-pink-200 p-2 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Knowledge Base Updates
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">
                  Get notified when new help articles are added.
                </p>
              </div>
            </div>
            <span className="relative h-6 w-11 shrink-0 rounded-full bg-gray-400 p-1 dark:bg-zinc-600">
              <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-gray-50 shadow-sm" />
            </span>
          </div>
        </section>
      </div>


      {/* Security */}
      <section className="flex flex-col gap-5 rounded-xl border border-gray-300 bg-gray-50 p-5 transition-colors duration-200 hover:border-gray-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4 dark:border-zinc-700">
          <LockKeyhole
            size={42}
            className="shrink-0 rounded-lg bg-red-200 p-2 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          />

          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Security
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Change your password to keep your account secure.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full gap-4">
          {/* Password Fields */}
          <div className="flex lg:w-1/2 flex-col gap-4 rounded-lg border border-violet-200 bg-gray-100 p-4 dark:border-violet-900 dark:bg-zinc-800">
            {/* Current Password */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200">
                Current Password
              </label>

              <div className="flex items-center rounded-lg border border-gray-300 bg-gray-50 px-3 dark:border-zinc-700 dark:bg-zinc-900">
                <LockKeyhole size={17} className="text-gray-500 dark:text-gray-400" />

                <input
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter your current password"
                  className="w-full bg-transparent px-3 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
                />

                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="cursor-pointer text-gray-500 dark:text-gray-400"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200">
                New Password
              </label>

              <div className="flex items-center rounded-lg border border-gray-300 bg-gray-50 px-3 dark:border-zinc-700 dark:bg-zinc-900">
                <LockKeyhole size={17} className="text-gray-500 dark:text-gray-400" />

                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type={showNew ? "text" : "password"}
                  placeholder="Enter your new password"
                  className="w-full bg-transparent px-3 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="cursor-pointer text-gray-500 dark:text-gray-400"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200">
                Confirm New Password
              </label>

              <div className="flex items-center rounded-lg border border-gray-300 bg-gray-50 px-3 dark:border-zinc-700 dark:bg-zinc-900">
                <LockKeyhole size={17} className="text-gray-500 dark:text-gray-400" />

                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className="w-full bg-transparent px-3 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="cursor-pointer text-gray-500 dark:text-gray-400"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="flex flex-wrap justify-between gap-2 px-1 py-2">
                {/* Password Strength */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Password strength:
                  </span>

                  <span
                    className={`text-xs font-semibold ${passStrength <= 2
                      ? "text-red-500"
                      : passStrength <= 4
                        ? "text-yellow-500"
                        : "text-green-500"
                      }`}
                  >
                    {passStrength <= 2
                      ? "Weak"
                      : passStrength <= 4
                        ? "Medium"
                        : "Strong"}
                  </span>

                  <div className="flex gap-1">
                    {/* 1st bar */}
                    <span
                      className={`h-1 w-8 rounded ${passStrength >= 1
                        ? passStrength <= 2
                          ? "bg-red-500"
                          : passStrength <= 4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        : "bg-gray-300 dark:bg-zinc-600"
                        }`}
                    />

                    {/* 2nd bar */}
                    <span
                      className={`h-1 w-8 rounded ${passStrength >= 3
                        ? passStrength <= 4
                          ? "bg-yellow-500"
                          : "bg-green-500"
                        : "bg-gray-300 dark:bg-zinc-600"
                        }`}
                    />

                    {/* 3rd bar */}
                    <span
                      className={`h-1 w-8 rounded ${passStrength >= 5
                        ? "bg-green-500"
                        : "bg-gray-300 dark:bg-zinc-600"
                        }`}
                    />
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Password match:
                  </span>

                  <span
                    className={`text-xs font-semibold ${confirmPassword.length === 0
                      ? "text-gray-400"
                      : newPassword === confirmPassword
                        ? "text-green-500"
                        : "text-red-500"
                      }`}
                  >
                    {confirmPassword.length === 0
                      ? "Not checked"
                      : newPassword === confirmPassword
                        ? "Matched"
                        : "Not matched"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="flex lg:w-1/2 gap-3 rounded-lg border border-violet-200 bg-gray-100 p-4 dark:border-violet-900 dark:bg-zinc-800">
            <Info size={20} className="shrink-0 text-violet-600 dark:text-violet-400" />

            <div className="w-2/3">
              <h3 className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                Password Requirements:
              </h3>

              <ul className="mt-2 w-full space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center justify-between gap-2">
                  <span>• Minimum 8 characters</span>
                  <CircleCheck
                    size={15}
                    className={checkLen ? "text-green-600" : "text-gray-400"}
                  />
                </li>

                <li className="flex items-center justify-between gap-2">
                  <span>• At least one uppercase letter (A-Z)</span>
                  <CircleCheck
                    size={15}
                    className={checkUC ? "text-green-600" : "text-gray-400"}
                  />
                </li>

                <li className="flex items-center justify-between gap-2">
                  <span>• At least one lowercase letter (a-z)</span>
                  <CircleCheck
                    size={15}
                    className={checkLC ? "text-green-600" : "text-gray-400"}
                  />
                </li>

                <li className="flex items-center justify-between gap-2">
                  <span>• At least one number (0-9)</span>
                  <CircleCheck
                    size={15}
                    className={checkNum ? "text-green-600" : "text-gray-400"}
                  />
                </li>

                <li className="flex items-center justify-between gap-2">
                  <span>• At least one special character (!@#$%^&amp;*)</span>
                  <CircleCheck
                    size={15}
                    className={checkSym ? "text-green-600" : "text-gray-400"}
                  />
                </li>
              </ul>

              <p
                className={`mt-3 text-sm ${passStrength < 5 ? "text-red-500" : "text-transparent"
                  }`}
              >
                Please fulfill all the above password conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Update Password Button */}
        <div className="flex justify-end border-t border-gray-200 pt-4 dark:border-zinc-700">
          <button
            onClick={() => handelSubmit(userId)}
            disabled={
              !currentPassword ||
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword ||
              passStrength !== 5
            }
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-lg border hover:border-indigo-700 violetbg-indigo-600 px-5 py-2.5 text-sm font-semibold text-gray-50 transition-colors duration-200 border-violet-700 bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LockKeyhole size={17} />
            Update Password
          </button>
        </div>
      </section>

      {/* Account */}
      <section className="flex flex-col gap-4 rounded-xl border border-gray-300 bg-gray-50 p-4 transition-colors duration-200 hover:border-gray-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-3 dark:border-zinc-700">
          <UsersRound
            size={42}
            className="shrink-0 rounded-lg bg-indigo-200 p-2 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Account
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage your account settings and session.
            </p>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="flex flex-col justify-between gap-3 rounded-lg border border-gray-200 bg-gray-100 p-3 sm:flex-row sm:items-center dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex min-w-0 items-center gap-3">
            <Computer
              size={38}
              className="shrink-0 rounded-lg bg-green-200 p-2 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Active Sessions
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                You are currently logged in on 1 device.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-violet-600 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-600 hover:text-gray-50 dark:border-violet-400 dark:text-violet-400 dark:hover:bg-violet-600 dark:hover:text-white"
          >
            View Active Sessions
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Delete Account */}
        <div className="flex flex-col justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-3 sm:flex-row sm:items-center dark:border-red-900 dark:bg-red-950/30">
          <div className="flex min-w-0 items-center gap-3">
            <Trash2
              size={38}
              className="shrink-0 rounded-lg bg-red-200 p-2 text-red-700 dark:bg-red-900/40 dark:text-red-500"
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Delete Account
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Permanently delete your account and all data.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-400 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-600 hover:text-gray-50 dark:text-red-500 dark:hover:text-white"
          >
            <Trash2 size={17} />
            Delete Account
          </button>
        </div>
      </section>

      {/* Need Help */}
      <section className="flex flex-col gap-3 rounded-xl border border-gray-300 bg-gray-50 p-4 transition-colors duration-200 hover:border-indigo-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-indigo-800">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-3">
            <CircleQuestionMark
              size={42}
              className="shrink-0 rounded-lg bg-indigo-200 p-2 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400"
            />
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
                Need Help?
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                If you need assistance, our support team is here to help.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-violet-600 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-600 hover:text-gray-50 dark:border-violet-400 dark:text-violet-400 dark:hover:bg-violet-600 dark:hover:text-white"
          >
            <MessageSquareMore size={18} />
            Contact Support
          </button>
        </div>
      </section>

      {showMessage && (
        <MessagePopup
          type={showMessage.type}
          title={showMessage.title}
          message={showMessage.message}
          onClose={() => setShowMessage(null)}
        />
      )}
    </div>
  );
};

export default Setting;
