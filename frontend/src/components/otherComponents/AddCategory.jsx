import {
  Bell,
  BookText,
  Folders,
  Headset,
  Info,
  Monitor,
  PencilLine,
  Plus,
  Settings,
  Shield,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api"
import MessagePopup from "../otherComponents/MessagePopup";

const AddCategory = ({ onClose }) => {
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [messagePopupData, setMessagePopupData] = useState({
    type: "success",
    title: "",
    message: "",
  });

  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const queryClient = useQueryClient();

 

  const createCategoryMutation = useMutation({
    mutationFn: async (categoryData) => {
      const response = await api.post(
        "/category/createcategory",
        categoryData
      );

      return response.data;
    },

        onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      setShowMessagePopup(true)
      setMessagePopupData({
        type: "success",
        title: "Category Added",
        message: "Your category added successfully"

      })

      setCategoryName("");
      setCategoryDescription("");
      setSelectedIcon("");


    },

    onError: (error) => {


      setMessagePopupData({
        type: "error",
        title: "Category Creation Failed",
        message:
          error.response?.data?.message ||
          "Unable to create category. Please try again.",
      });

      setShowMessagePopup(true);
    },
  });

  const handleCreateCategory = () => {
    if (!categoryName.trim()) {
      return;
    }

    if (!selectedIcon) {
      return;
    }

    createCategoryMutation.mutate({
      name: categoryName.trim(),
      description: categoryDescription.trim(),
      icon: selectedIcon,
    });
  };

  return (
  
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3  sm:p-5">

  {/* Popup */}
  <div className="flex max-h-[85dvh] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-zinc-50 shadow-xl dark:bg-zinc-900">

    {/* Header */}
    <div className="flex shrink-0 items-center gap-3 border-b border-gray-300 p-3 dark:border-zinc-700 sm:gap-4 sm:p-4">
      <span className="shrink-0 rounded-lg bg-green-200 p-2.5 text-green-600 dark:bg-green-950 dark:text-green-400 sm:p-3">
        <Folders size={24} />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <h1 className="text-base font-bold text-gray-900 dark:text-gray-100 sm:text-lg">
          Add Category
        </h1>

        <p className="text-xs leading-4 text-gray-600 dark:text-gray-400 sm:text-sm sm:leading-normal">
          Create a new category to organize knowledge base articles.
        </p>
      </div>

      <button
        onClick={() => onClose()}
        className="shrink-0 cursor-pointer rounded-md p-1 text-gray-500 hover:bg-red-500 hover:text-white dark:text-gray-400"
      >
        <X size={22} />
      </button>
    </div>

    {/* Scrollable Content */}
    <div className="min-h-0 flex-1 overflow-y-auto">

      {/* Form */}
      <div className="flex flex-col gap-4 p-3 sm:gap-3 sm:p-5">

        {/* Category Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="category"
            className="text-sm font-semibold text-gray-900 dark:text-gray-100"
          >
            Category Name
          </label>

          <div className="flex min-w-0 items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 dark:border-zinc-700 sm:gap-3">
            <Folders size={22} className="shrink-0 text-gray-400" />

            <input
              id="category"
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full min-w-0 bg-transparent px-1 py-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-500 sm:px-2"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-gray-900 dark:text-gray-100"
          >
            Description
          </label>

          <div className="flex min-w-0 items-start gap-2 rounded-lg border border-gray-300 px-3 py-2 dark:border-zinc-700 sm:gap-3">
            <BookText
              size={22}
              className="mt-1 shrink-0 text-gray-400"
            />

            <textarea
              id="description"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              placeholder="Enter category description"
              rows={3}
              className="w-full min-w-0 resize-y bg-transparent px-1 py-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-500 sm:px-2"
            />
          </div>
        </div>
      </div>

      {/* Icon Selection */}
      <div className="flex flex-col gap-3 px-3 pb-4 pt-1 sm:px-5">

        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Icon{" "}
          <span className="font-normal text-gray-500 dark:text-gray-400">
            (Optional)
          </span>
        </h2>

        <div className="flex flex-wrap gap-2">

          {/* Folders */}
          <Folders
            onClick={() => setSelectedIcon("Folders")}
            className={`cursor-pointer rounded-lg border p-2 text-sky-600 transition dark:text-sky-400 ${
              selectedIcon === "Folders"
                ? "border-sky-500 bg-sky-200 dark:bg-sky-900"
                : "border-sky-200 bg-sky-100 hover:bg-sky-200 dark:border-sky-900 dark:bg-sky-950 dark:hover:bg-sky-900"
            }`}
            size={42}
          />

          {/* Settings */}
          <Settings
            onClick={() => setSelectedIcon("Settings")}
            className={`cursor-pointer rounded-lg border p-2 text-indigo-600 transition dark:text-indigo-400 ${
              selectedIcon === "Settings"
                ? "border-indigo-500 bg-indigo-200 dark:bg-indigo-900"
                : "border-indigo-200 bg-indigo-100 hover:bg-indigo-200 dark:border-indigo-900 dark:bg-indigo-950 dark:hover:bg-indigo-900"
            }`}
            size={42}
          />

          {/* User */}
          <UserRound
            onClick={() => setSelectedIcon("UserRound")}
            className={`cursor-pointer rounded-lg border p-2 text-violet-600 transition dark:text-violet-400 ${
              selectedIcon === "UserRound"
                ? "border-violet-500 bg-violet-200 dark:bg-violet-900"
                : "border-violet-200 bg-violet-100 hover:bg-violet-200 dark:border-violet-900 dark:bg-violet-950 dark:hover:bg-violet-900"
            }`}
            size={42}
          />

          {/* Shield */}
          <Shield
            onClick={() => setSelectedIcon("Shield")}
            className={`cursor-pointer rounded-lg border p-2 text-green-600 transition dark:text-green-400 ${
              selectedIcon === "Shield"
                ? "border-green-500 bg-green-200 dark:bg-green-900"
                : "border-green-200 bg-green-100 hover:bg-green-200 dark:border-green-900 dark:bg-green-950 dark:hover:bg-green-900"
            }`}
            size={42}
          />

          {/* Wrench */}
          <Wrench
            onClick={() => setSelectedIcon("Wrench")}
            className={`cursor-pointer rounded-lg border p-2 text-orange-600 transition dark:text-orange-400 ${
              selectedIcon === "Wrench"
                ? "border-orange-500 bg-orange-200 dark:bg-orange-900"
                : "border-orange-200 bg-orange-100 hover:bg-orange-200 dark:border-orange-900 dark:bg-orange-950 dark:hover:bg-orange-900"
            }`}
            size={42}
          />

          {/* Headset */}
          <Headset
            onClick={() => setSelectedIcon("Headset")}
            className={`cursor-pointer rounded-lg border p-2 text-red-600 transition dark:text-red-400 ${
              selectedIcon === "Headset"
                ? "border-red-500 bg-red-200 dark:bg-red-900"
                : "border-red-200 bg-red-100 hover:bg-red-200 dark:border-red-900 dark:bg-red-950 dark:hover:bg-red-900"
            }`}
            size={42}
          />

          {/* Bell */}
          <Bell
            onClick={() => setSelectedIcon("Bell")}
            className={`cursor-pointer rounded-lg border p-2 text-amber-600 transition dark:text-amber-400 ${
              selectedIcon === "Bell"
                ? "border-amber-500 bg-amber-200 dark:bg-amber-900"
                : "border-amber-200 bg-amber-100 hover:bg-amber-200 dark:border-amber-900 dark:bg-amber-950 dark:hover:bg-amber-900"
            }`}
            size={42}
          />

          {/* Pencil */}
          <PencilLine
            onClick={() => setSelectedIcon("PencilLine")}
            className={`cursor-pointer rounded-lg border p-2 text-gray-600 transition dark:text-gray-300 ${
              selectedIcon === "PencilLine"
                ? "border-gray-500 bg-gray-200 dark:bg-zinc-700"
                : "border-gray-200 bg-gray-100 hover:bg-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            }`}
            size={42}
          />

          {/* Monitor */}
          <Monitor
            onClick={() => setSelectedIcon("Monitor")}
            className={`cursor-pointer rounded-lg border p-2 text-cyan-600 transition dark:text-cyan-400 ${
              selectedIcon === "Monitor"
                ? "border-cyan-500 bg-cyan-200 dark:bg-cyan-900"
                : "border-cyan-200 bg-cyan-100 hover:bg-cyan-200 dark:border-cyan-900 dark:bg-cyan-950 dark:hover:bg-cyan-900"
            }`}
            size={42}
          />
        </div>
      </div>

      {/* Tip */}
      <div className="px-3 pb-4 pt-1 sm:px-5">
        <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-100 p-3 dark:border-emerald-900 dark:bg-emerald-950">
          <Info
            className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
            size={24}
          />

          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 sm:text-base">
              Tip:
            </h2>

            <p className="mt-0.5 text-xs leading-5 text-emerald-700 dark:text-emerald-300 sm:text-sm">
              Create a clear and meaningful category name to help users quickly find relevant articles and support information.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-gray-300 p-3 dark:border-zinc-700 sm:flex-row sm:justify-end sm:gap-3 sm:p-4">

      <button
        onClick={() => onClose()}
        className="w-full cursor-pointer rounded-lg border border-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:border-zinc-600 dark:text-gray-200 dark:hover:bg-zinc-800 sm:w-auto"
      >
        Cancel
      </button>

      <button
        onClick={handleCreateCategory}
        disabled={createCategoryMutation.isPending}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-violet-600 bg-violet-600 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        <Plus size={18} />

        {createCategoryMutation.isPending
          ? "Creating..."
          : "Create Category"}
      </button>
    </div>
  </div>

  {showMessagePopup && (
    <MessagePopup
      type={messagePopupData.type}
      title={messagePopupData.title}
      message={messagePopupData.message}
      onClose={() => setShowMessagePopup(false)}
    />
  )}
</div>

  );
};

export default AddCategory;