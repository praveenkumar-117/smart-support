import {
  CircleCheck,
  Eye,
  EyeOff,
  Info,
  LockKeyhole,
  X
} from "lucide-react";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { useSelector } from "react-redux";


const ChangePassword = ({ onClose }) => {
  const userId = useSelector((state) => state.auth.user?._id);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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



  const updateAdminPassMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.patch(
        `/user/change-password/`, data
      );

      return response.data;
    },

    onSuccess: (data) => {
      if (data.status === true) {
        onClose();
      }
    },

    onError: (error) => {
      console.log("Password update failed:", error);
    },
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      {/* Popup */}
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-lg bg-violet-100 text-violet-600">
              <LockKeyhole size={24} />
            </span>

            <div>
              <h2 className="text-lg font-semibold">
                Change Password
              </h2>
              <p className="text-xs text-gray-500">
                Update your administrator account password.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <div className="p-5 flex flex-col gap-4">

          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Current Password
            </label>

            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <LockKeyhole size={17} className="text-gray-500" />

              <input
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                type={showCurrent ? "text" : "password"}
                placeholder="Enter your current password"
                className="w-full px-3 py-2 text-sm focus:outline-none focus:ring-0"
              />

              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="text-gray-500 cursor-pointer"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>

            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <LockKeyhole size={17} className="text-gray-500" />

              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type={showNew ? "text" : "password"}
                placeholder="Enter your new password"
                className="w-full px-3 py-2 text-sm focus:outline-none focus:ring-0"
              />

              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="text-gray-500 cursor-pointer"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password Strength */}

            <div className="flex items-center gap-2 mt-2">

              <span className="text-xs text-gray-500">
                Password strength:
              </span>

              <span
                className={`text-xs font-semibold ${passStrength <= 2
                  ? "text-red-500"
                  : passStrength >= 2 && passStrength <= 4
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
                  className={`w-8 h-1 rounded ${passStrength >= 1
                    ? passStrength <= 2
                      ? "bg-red-500"
                      : passStrength <= 4
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    : "bg-gray-300"
                    }`}
                ></span>

                {/* 2nd bar */}
                <span
                  className={`w-8 h-1 rounded ${passStrength >= 3
                    ? passStrength <= 4
                      ? "bg-yellow-500"
                      : "bg-green-500"
                    : "bg-gray-300"
                    }`}
                ></span>

                {/* 3rd bar */}
                <span
                  className={`w-8 h-1 rounded ${passStrength >= 5
                    ? "bg-green-500"
                    : "bg-gray-300"
                    }`}
                ></span>

              </div>
            </div>

          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm New Password
            </label>

            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <LockKeyhole size={17} className="text-gray-500" />

              <input
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value) }}
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your new password"
                className="w-full px-3 py-2 text-sm focus:outline-none focus:ring-0"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-gray-500 cursor-pointer"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="flex gap-3 rounded-lg bg-violet-50 border border-violet-100 p-3">
            <Info className="text-violet-600 shrink-0" size={20} />

            <div className="w-2/3">
              <h3 className="text-sm font-semibold text-violet-600">
                Password Requirements:
              </h3>

              <ul className="w-full mt-1 text-xs text-gray-600 space-y-1 ">
                <li className="flex items-center justify-between">• Minimum 8 characters
                  <CircleCheck size={12} className={`${checkLen ? "text-green-600" : "text-gray-400"}`} /></li>

                <li className="flex items-center justify-between">• At least one uppercase letter (A-Z)
                  <CircleCheck size={12} className={`${checkUC ? "text-green-600" : "text-gray-400"}`} /></li>

                <li className="flex items-center justify-between">• At least one lowercase letter (a-z)
                  <CircleCheck size={12} className={`${checkLC ? "text-green-600" : "text-gray-400"}`} /></li>

                <li className="flex items-center justify-between">• At least one number (0-9)
                  <CircleCheck size={12} className={`${checkNum ? "text-green-600" : "text-gray-400"}`} /></li>

                <li className="flex items-center justify-between">• At least one special character (!@#$%^&*)
                  <CircleCheck size={12} className={`${checkSym ? "text-green-600" : "text-gray-400"}`} /></li>
              </ul>

              <p className={`text-xs  mt-2 ${passStrength < 5 ? "text-red-500" : "text-transparent"}`}>
                Please fulfill all the above password conditions.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 p-5">

          <button
            onClick={onClose}
            className="border border-gray-400 rounded-lg px-4 py-2 hover:bg-yellow-500 hover:border-white hover:text-white cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() => handelSubmit(userId)}
            disabled={
              !currentPassword ||
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword ||
              passStrength !== 5
            }
            className={`flex items-center gap-2 border border-indigo-600 rounded-lg px-4 py-2 text-white bg-indigo-600 hover:bg-violet-600 cursor-pointer disabled:bg-gray-400 disabled:border-white disabled:text-black`}
          >
            <LockKeyhole size={17} />
            Update Password
          </button>

        </div>

      </div>
    </div>
  );
};

export default ChangePassword;