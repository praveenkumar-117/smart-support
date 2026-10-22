import { useEffect, useState } from "react";
import {
  User,
  Camera,
  Save,
  UserShield,
  Building2,
  CalendarDays,
  Clock3,
  ShieldCheck,
  Bell,
  Palette,
  CircleCheck,
  Moon,
  Sun,
  Pencil,
} from "lucide-react";
import { TbBulb } from "react-icons/tb";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import api from "../../api/api"
import MessagePopup from "../otherComponents/MessagePopup";
import ChangePassword from "../otherComponents/ChangePassword"

const AdminSetting = ({ theme, setTheme }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showMessage, setShowMessage] = useState(null);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [personalNumber, setPersonalNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);


  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");


  const userId = useSelector((state) => state.auth.user?._id);
  const user = useSelector((state) => state.auth.user);


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
        setAdminName(updatedUser.name || "");
        setAdminEmail(updatedUser.email || "");
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };


  const handleSaveChanges = () => {
    const formData = new FormData();

    formData.append("name", adminName);
    formData.append("email", adminEmail);
    formData.append("personalNumber", personalNumber);
    formData.append("address", address);
    if (selectedImage) {
      formData.append("profileImage", selectedImage);
    }
    updateProfileMutation.mutate(formData);
  };

  useEffect(() => {
    if (user) {
      setAdminName(user.name || "");
      setAdminEmail(user.email || "");
      setPersonalNumber(user.personalNumber || "");
      setAddress(user.address || "");
      setProfileImage(user.profileImage || "");
    }
  }, [user]);
  return (

    <div className="flex flex-col gap-6 px-2 py-2 bg-gray-200 dark:bg-zinc-950 text-gray-900 dark:text-gray-100">

      {/* Header */}
      <div className="w-full">
        <h1 className="font-bold text-xl md:text-2xl">Settings</h1>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
          Manage your profile, helpdesk preferences, notifications, and
          security settings.
        </p>
      </div>

      {/* Admin Account */}
      <div className="w-full border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-900">

        {/* Header */}
        <div className="flex justify-between gap-4 items-center p-4 border-b border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 rounded-t-lg">
          <div className="flex  gap-4">
            <User
              size={40}
              className="bg-purple-200 dark:bg-purple-950 text-purple-600 dark:text-purple-400 p-1 rounded-lg"
            />

            <div>
              <h1 className="font-semibold text-sm md:text-xl">Admin Account</h1>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Update your personal information and profile details.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (isEditing) {
                setAdminName(user?.name || "");
                setAdminEmail(user?.email || "");
                setPersonalNumber(user.personalNumber || "");
                setAddress(user?.address || "");
                setProfileImage(user?.profileImage || "");
                setSelectedImage(null);
                setImagePreview("");
                setIsEditing(false);
              } else {
                setIsEditing(true);
              }
            }}
            className={`w-20 flex items-center rounded-full p-0.5 border transition-colors duration-300 cursor-pointer ${isEditing
              ? "border-red-500 bg-red-100 dark:bg-red-950"
              : "border-purple-400 bg-purple-200 dark:bg-purple-950"
              }`}
          >
            <span
              className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${isEditing
                ? "translate-x-12.5 bg-red-500"
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

        {/* Profile Information */}
        <div className="flex flex-col gap-6 p-6">

          {/* Profile Image and Form */}
          <div className="flex flex-col lg:flex-row gap-8 ">

            {/* Profile Image */}
            <div className=" lg:w-1/5 flex justify-center pt-4">
              <div className="relative md:w-32 md:h-32 w-24 h-24">

                <div className="md:w-32 md:h-32 w-24 h-24 rounded-full bg-purple-200 dark:bg-purple-950/10 dark:hover:bg-zinc-800 border-4 border-purple-600 dark:border-purple-500 dark:hover:border-purple-400 shadow flex items-center justify-center overflow-hidden cursor-pointer">
                  {imagePreview || profileImage ? (
                    <img
                      src={imagePreview || profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={55} className="text-purple-600 dark:text-purple-400" />
                  )}
                </div>

                {isEditing && (
                  <>
                    <label
                      htmlFor="profileImage"
                      className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950 border border-purple-400 dark:border-purple-700 flex items-center justify-center cursor-pointer hover:bg-purple-500/10 dark:hover:bg-purple-400/10 shadow transition-colors"
                    >
                      <Camera size={17} className="text-gray-700 dark:text-gray-300" />
                    </label>

                    <input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Form and Information */}
            <div className="flex-1 flex flex-col gap-6">

              {/* Input Fields */}
              <div className="flex flex-wrap gap-x-6 gap-y-4">

                <div className="w-full lg:w-[48%] flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 dark:border-zinc-700 rounded-lg px-3 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900 transition duration-200 disabled:bg-gray-100 dark:disabled:bg-zinc-800 disabled:text-gray-600 dark:disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-none"
                  />
                </div>

                <div className="w-full lg:w-[48%] flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 dark:border-zinc-700 rounded-lg px-3 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900 transition duration-200 disabled:bg-gray-100 dark:disabled:bg-zinc-800 disabled:text-gray-600 dark:disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-none"
                  />
                </div>

                <div className="w-full lg:w-[48%] flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Personal Number
                  </label>
                  <input
                    type="tel"
                    value={personalNumber}
                    onChange={(e) => setPersonalNumber(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter your mobile number"
                    className="w-full border border-gray-300 dark:border-zinc-700 rounded-lg px-3 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900 transition duration-200 disabled:bg-gray-100 dark:disabled:bg-zinc-800 disabled:text-gray-600 dark:disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-none"
                  />
                </div>

                <div className="w-full lg:w-[48%] flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter your address"
                    className="w-full border border-gray-300 dark:border-zinc-700 rounded-lg px-3 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900 transition duration-200 disabled:bg-gray-100 dark:disabled:bg-zinc-800 disabled:text-gray-600 dark:disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-none"
                  />
                </div>

              </div>

              {/* Read-only Information */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-gray-200 dark:border-zinc-700 pt-5">

                {/* Role */}
                <div className="flex items-center gap-3">
                  <UserShield
                    size={40}
                    className="text-pink-600 dark:text-pink-400 bg-pink-200 dark:bg-pink-950 p-1 rounded-lg shrink-0"
                  />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                    <p className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200">
                      {user?.role === "support_admin"
                        ? "Support Admin"
                        : user?.role || "Not Available"}
                    </p>
                  </div>
                </div>

                {/* Department */}
                <div className="flex items-center gap-3">
                  <Building2
                    size={40}
                    className="text-stone-600 dark:text-stone-300 bg-stone-200 dark:bg-stone-800 p-1 rounded-lg shrink-0"
                  />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
                    <p className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200">
                      {user?.department || "Not Available"}
                    </p>
                  </div>
                </div>

                {/* Date of Joining */}
                <div className="flex items-center gap-3">
                  <CalendarDays
                    size={40}
                    className="text-green-600 dark:text-green-400 bg-green-200 dark:bg-green-950 p-1 rounded-lg shrink-0"
                  />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date of Joining</p>
                    <p className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200">
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
                <div className="flex items-center gap-3">
                  <Clock3
                    size={40}
                    className="text-purple-600 dark:text-purple-400 bg-purple-200 dark:bg-purple-950 p-1 rounded-lg shrink-0"
                  />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last Login</p>
                    <p className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200">
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

          {/* Edit / Save / Cancel Buttons */}
          <div className="flex justify-end gap-2 border-t border-gray-200 dark:border-zinc-700 pt-4">
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={!isEditing || updateProfileMutation.isPending}
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <Save size={17} />
              {updateProfileMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Security and Helpdesk Settings */}
      <div className="w-full flex flex-col lg:flex-row gap-4">

        {/* Security */}
        <div className="w-full lg:w-1/2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-900">

          {/* Header */}
          <div className="flex gap-3 items-center p-4 border-b border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 rounded-t-lg">
            <ShieldCheck
              size={36}
              className="bg-green-200 dark:bg-green-950 text-green-600 dark:text-green-400 p-1 rounded-lg"
            />
            <div>
              <h2 className="font-semibold lg:text-lg text-gray-900 dark:text-gray-100">
                Security
              </h2>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Manage your password and account security.
              </p>
            </div>
          </div>

          {/* Change Password */}
          <div className="flex items-center justify-between gap-4 p-4">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                Change Password
              </h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                Update your password regularly to keep your account secure.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowPasswordPopup(true)}
              className="shrink-0 px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-200 font-medium hover:bg-yellow-500/10 dark:hover:bg-yellow-400/10 hover:border-yellow-500 cursor-pointer transition"
            >
              Change
            </button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between gap-4 p-4 border-t border-gray-200 dark:border-zinc-700">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                Two-Factor Authentication
              </h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                Add an extra layer of security to your account.
              </p>
            </div>

            <div className="flex items-center p-0.5 rounded-full border border-violet-400 dark:border-violet-600 hover:cursor-pointer">
              <span className="w-5 h-5 rounded-full bg-gray-500 dark:bg-zinc-500 block" />
              <span className="w-5 h-5 rounded-full block" />
            </div>
          </div>

        </div>

        {/* Helpdesk Settings */}
        <div className="w-full lg:w-1/2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-900">

          {/* Header */}
          <div className="flex justify-between gap-3 items-center p-4 border-b border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 rounded-t-lg">

            <div className="flex items-center gap-4">
              <Building2
                size={36}
                className="bg-blue-200 dark:bg-blue-950 text-blue-600 dark:text-blue-400 p-1 rounded-lg"
              />
              <div>
                <h2 className="font-semibold lg:text-lg text-gray-900 dark:text-gray-100">
                  Helpdesk Settings
                </h2>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  Configure your helpdesk information and defaults.
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={
                activeSection !== null &&
                activeSection !== "Helpdesk Settings"
              }
              onClick={() => {
                if (activeSection === "Helpdesk Settings") {
                  setActiveSection(null);
                } else {
                  setActiveSection("Helpdesk Settings");
                }
              }}
              className={`w-20 flex items-center rounded-full p-0.5 border transition-colors duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${activeSection === "Helpdesk Settings"
                ? "border-red-500 bg-red-100 dark:bg-red-950"
                : "border-blue-400 bg-blue-100 dark:bg-blue-950"
                }`}
            >
              <span
                className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${activeSection === "Helpdesk Settings"
                  ? "translate-x-12.5 bg-red-500"
                  : "translate-x-0 bg-blue-500"
                  }`}
              />

              <span
                className={`text-xs font-semibold transition-all duration-300 ${activeSection === "Helpdesk Settings"
                  ? "-translate-x-3 text-red-700 dark:text-red-300"
                  : "ml-1 translate-x-1 text-blue-700 dark:text-blue-300"
                  }`}
              >
                {activeSection === "Helpdesk Settings" ? "Cancel" : "Edit"}
              </span>
            </button>
          </div>

          {/* Helpdesk Name */}
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 flex flex-col gap-2 p-2.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Helpdesk Name
              </label>
              <input
                type="text"
                placeholder="Enter helpdesk name"
                className="w-full border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900 transition duration-200"
              />
            </div>

            {/* Support Email */}
            <div className="w-full lg:w-1/2 flex flex-col gap-2 p-2.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Support Email
              </label>
              <input
                type="email"
                placeholder="Enter support email"
                className="w-full border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900 transition duration-200"
              />
            </div>
          </div>

          {/* Default Priority */}
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 flex flex-col gap-2 px-4 pb-4">
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Default Ticket Priority
              </label>
              <select
                defaultValue="Medium"
                className="w-full border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900 transition duration-200"
              >
                <option value="Low" className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100">Low</option>
                <option value="Medium" className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100">Medium</option>
                <option value="High" className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100">High</option>
                <option value="Urgent" className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100">Urgent</option>
              </select>
            </div>

            {/* Default Status */}
            <div className="w-full lg:w-1/2 flex flex-col gap-2 px-4 pb-4">
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Default Ticket Status
              </label>
              <select
                defaultValue="Open"
                className="w-full border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900 transition duration-200"
              >
                <option value="Open" className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100">Open</option>
                <option value="In Progress" className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100">In Progress</option>
                <option value="Resolved" className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100">Resolved</option>
              </select>
            </div>
          </div>

        </div>
      </div>


      {/* Notification Settings and Appearance */}
      <div className="w-full flex flex-col lg:flex-row gap-4">

        {/* Appearance */}

        <div className="w-full lg:w-1/2 flex flex-col gap-4 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-900">

          {/* Header */}
          <div className="flex gap-3 items-center p-4 border-b border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 rounded-t-lg">
            <Palette
              size={40}
              className="bg-purple-200 dark:bg-purple-950 text-purple-600 dark:text-purple-400 p-1 rounded-lg"
            />
            <div>
              <h1 className="font-semibold lg:text-xl text-gray-900 dark:text-gray-100">
                Appearance
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Customise feel and look of application.
              </p>
            </div>
          </div>

          <div className="p-4">
            <h1 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              Theme
            </h1>

            <div className="w-full flex gap-4">

              {/* Dark Mode */}
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`w-1/2 flex flex-col text-left border rounded-lg p-6 cursor-pointer transition-colors duration-200 hover:bg-purple-500/10 dark:hover:bg-purple-400/10 ${theme === "dark"
                    ? "border-purple-600 dark:border-purple-500"
                    : "border-gray-300 dark:border-zinc-700"
                  }`}
              >
                <span className="flex justify-end w-full">
                  {theme === "dark" && (
                    <CircleCheck
                      size={18}
                      className="text-white bg-violet-600 rounded-lg"
                    />
                  )}
                </span>

                <div className="flex gap-4">
                  <Moon
                    size={40}
                    className="shrink-0 bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 p-1 rounded-lg"
                  />
                  <span>
                    <h1 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                      Dark Mode
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Prefered for low light environment.
                    </p>
                  </span>
                </div>
              </button>

              {/* Light Mode */}
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`w-1/2 flex flex-col text-left border rounded-lg p-4 cursor-pointer transition-colors duration-200 hover:bg-blue-500/10 dark:hover:bg-blue-400/10 ${theme === "light"
                    ? "border-purple-600 dark:border-purple-500"
                    : "border-gray-300 dark:border-zinc-700"
                  }`}
              >
                <span className="flex justify-end w-full">
                  {theme === "light" && (
                    <CircleCheck
                      size={18}
                      className="text-white bg-violet-600 rounded-lg"
                    />
                  )}
                </span>

                <div className="flex gap-4">
                  <Sun
                    size={40}
                    className="shrink-0 bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 p-1 rounded-lg"
                  />
                  <span>
                    <h1 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                      Light Mode
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      better for bright environment.
                    </p>
                  </span>
                </div>
              </button>

            </div>

            {/* Primary Colors - abhi visual only */}
            <div className="flex flex-col gap-4 p-4">
              <h1 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                Primary Colors
              </h1>

              <div className="flex gap-4">
                <span>
                  <CircleCheck
                    size={30}
                    className="text-white bg-indigo-600 rounded-full cursor-pointer"
                  />
                </span>
                <span>
                  <CircleCheck
                    size={30}
                    className="text-white bg-blue-600 rounded-full cursor-pointer"
                  />
                </span>
                <span>
                  <CircleCheck
                    size={30}
                    className="text-white bg-green-600 rounded-full cursor-pointer"
                  />
                </span>
                <span>
                  <CircleCheck
                    size={30}
                    className="text-white bg-amber-500 rounded-full cursor-pointer"
                  />
                </span>
                <span>
                  <CircleCheck
                    size={30}
                    className="text-white bg-red-500 rounded-full cursor-pointer"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>


        {/* Notification Settings */}
        <div className="w-full lg:w-1/2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-900">

          {/* Header */}
          <div className="flex justify-between gap-3 items-center p-4 border-b border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 rounded-t-lg">

            <div className="flex items-center gap-4">
              <Bell
                size={36}
                className="bg-amber-200 dark:bg-amber-950 text-amber-600 dark:text-amber-400 p-1 rounded-lg"
              />
              <div>
                <h2 className="font-semibold lg:text-lg text-gray-900 dark:text-gray-100">
                  Notification Settings
                </h2>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  Choose which updates you want to receive.
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={
                activeSection !== null &&
                activeSection !== "Notification Settings"
              }
              onClick={() => {
                if (activeSection === "Notification Settings") {
                  setActiveSection(null);
                } else {
                  setActiveSection("Notification Settings");
                }
              }}
              className={`w-20 flex items-center rounded-full p-0.5 border transition-colors duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${activeSection === "Notification Settings"
                ? "border-red-500 bg-red-100 dark:bg-red-950"
                : "border-amber-400 bg-amber-100 dark:bg-amber-950"
                }`}
            >
              <span
                className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${activeSection === "Notification Settings"
                  ? "translate-x-12.5 bg-red-500"
                  : "translate-x-0 bg-amber-500"
                  }`}
              />

              <span
                className={`text-xs font-semibold transition-all duration-300 ${activeSection === "Notification Settings"
                  ? "-translate-x-3 text-red-700 dark:text-red-300"
                  : "ml-1 translate-x-1 text-amber-700 dark:text-amber-300"
                  }`}
              >
                {activeSection === "Notification Settings" ? "Cancel" : "Edit"}
              </span>
            </button>
          </div>

          {/* Email Notifications */}
          <div className="flex items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-zinc-700 hover:bg-blue-500/10 dark:hover:bg-blue-400/10 transition-colors duration-200">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                Email Notifications
              </h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                Receive ticket updates and important announcements by email.
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 accent-violet-600 cursor-pointer shrink-0"
            />
          </div>

          {/* New Ticket Alerts */}
          <div className="flex items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-zinc-700 hover:bg-blue-500/10 dark:hover:bg-blue-400/10 transition-colors duration-200">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                New Ticket Alerts
              </h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                Get notified when a new ticket is created.
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 accent-violet-600 cursor-pointer shrink-0"
            />
          </div>

          {/* Ticket Status Updates */}
          <div className="flex items-center justify-between gap-4 p-4 hover:bg-blue-500/10 dark:hover:bg-blue-400/10 transition-colors duration-200">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                Ticket Status Updates
              </h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                Receive updates when ticket status changes.
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 accent-violet-600 cursor-pointer shrink-0"
            />
          </div>

        </div>
      </div>



      <div className="flex gap-2 border border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-900 rounded-lg p-4 hover:bg-indigo-500/10 dark:hover:bg-indigo-400/10 transition-colors duration-200">
        <TbBulb
          className="text-indigo-500 dark:text-indigo-400 bg-purple-100 dark:bg-purple-950 p-2 rounded-lg"
          size={60}
        />

        <div className="px-4 flex-1">
          <h1 className="text-indigo-600 dark:text-indigo-400 font-bold">
            Tip
          </h1>
          <h1 className="text-xs md:text-sm text-indigo-500 dark:text-indigo-300">
            Keep your settings up to date to ensure a smooth and secure helpdesk experiece.
          </h1>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="w-full flex justify-center lg:justify-end gap-3 p-4 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900">

        <button
          type="button"
          onClick={handleSaveChanges}
          className=" flex items-center gap-2 px-6 py-2 rounded-lg bg-violet-600 text-white font-semibold hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
        >
          <Save size={18} />
          Save Changes
        </button>

      </div>

      {showMessage && (
        <MessagePopup
          type={showMessage.type}
          title={showMessage.title}
          message={showMessage.message}
          onClose={() => setShowMessage(null)}
        />
      )}

      {showPasswordPopup && (
        <ChangePassword
          onClose={() => setShowPasswordPopup(false)}
        />
      )}
    </div>
  );
};

export default AdminSetting;