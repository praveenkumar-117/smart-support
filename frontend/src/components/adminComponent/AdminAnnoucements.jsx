import React, { useState } from "react";
import {
  Megaphone, Info, Wrench, AlertCircle, FileText, CheckCircle, Trash2, Send, RotateCcw, Eye
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../api/api";
import MessagePopup from "../otherComponents/MessagePopup";

import ViewAnnouncement from "../otherComponents/ViewAnnouncement";
import ConfirmPopup from "../otherComponents/ConfirmPopup";

const AdminAnnoucements = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmPublish, setConfirmPublish] = useState(null);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [announcementType, setAnnouncementType] = useState("Info");
  const [publishType, setPublishType] = useState("now");
  const [showMessage, setShowMessage] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;
  const queryClient = useQueryClient();

  const announcementTypes = [
    { name: "Info", icon: Info },
    { name: "Maintenance", icon: Wrench },
    { name: "Important", icon: AlertCircle },
    { name: "Update", icon: FileText },
  ];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const response = await api.get("/announcements");
      return response.data;
    },
  });

  const announcements = (data?.announcements || []).map((item) => {
    let status = "Active";

    if (item.publishType === "draft") {
      status = "Draft";
    } else if (item.isActive === false) {
      status = "Inactive";
    }

    return {
      ...item,
      id: item._id,
      status,
      publishedAt: item.publishedAt
        ? new Date(item.publishedAt).toLocaleString("en-IN")
        : "-",
    };
  });


  const totalAnnouncements = announcements.length;
  const activeAnnouncements = announcements.filter(
    (item) => item.status === "Active"
  ).length;
  const draftAnnouncements = announcements.filter(
    (item) => item.status === "Draft"
  ).length;
  const filteredAnnouncements = announcements.filter(
    (item) => statusFilter === "All Status" || item.status === statusFilter
  );

  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAnnouncements = filteredAnnouncements.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setAnnouncementTitle("");
    setAnnouncementMessage("");
    setAnnouncementType("Info");
    setPublishType("now");
  };

  const handlePublish = () => {
    if (!announcementTitle.trim() || !announcementMessage.trim()) {
      setShowMessage({
        type: "error",
        title: "Required Fields",
        message: "Please enter announcement title and message.",
      });
      return;
    }

    createAnnouncement.mutate({
      title: announcementTitle.trim(),
      message: announcementMessage.trim(),
      type: announcementType,
      publishType,
    });
  };

  const createAnnouncement = useMutation({
    mutationFn: async (announcementData) => {
      const response = await api.post("/announcements", announcementData);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      setCurrentPage(1);
      setShowMessage({
        type: "success",
        title: "Success",
        message: data.message || "Announcement created successfully",
      });
      handleClear();
    },
    onError: (error) => {
      setShowMessage({
        type: "error",
        title: "Error",
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to create announcement",
      });
    },
  });


  const publishDraft = useMutation({
    mutationFn: async (id) => {
      const response = await api.patch(
        `/announcements/${id}/publish`
      );
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });

      setShowMessage({
        type: "success",
        title: "Success",
        message: response.message || "Announcement published successfully",
      });
    },
    onError: (error) => {
      setShowMessage({
        type: "error",
        title: "Error",
        message:
          error.response?.data?.message ||
          "Failed to publish announcement",
      });
    },
  });


  const deactivateAnnouncement = useMutation({
    mutationFn: async (id) => {
      const response = await api.patch(`/announcements/${id}/deactivate`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      setShowMessage({
        type: "success",
        title: "Deactivated",
        message: data.message || "Announcement deactivated successfully",
      });
    },
    onError: (error) => {
      setShowMessage({
        type: "error",
        title: "Error",
        message: error.response?.data?.message || "Failed to deactivate announcement",
      });
    },
  });

  const handleDelete = (id) => {
    setConfirmDelete(id);
  };

  const handleConfirmDelete = () => {
    if (confirmDelete) {
      deactivateAnnouncement.mutate(confirmDelete);
      setConfirmDelete(null);
    }
  };

  return (

    <div className="w-full bg-gray-200 dark:bg-zinc-950 p-4">

      <div className="mb-4 grid grid-cols-1 gap-4">

        {/* Announcement Status Cards */}

        <div className="rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-zinc-700 px-4 py-3 bg-gray-100 dark:bg-zinc-800 rounded-t-xl">
            <span className="rounded-xl bg-violet-100 dark:bg-violet-950 p-2.5 text-violet-600 dark:text-violet-400">
              <Megaphone size={20} />
            </span>

            <div>
              <h2 className="font-bold text-gray-900 dark:text-gray-100">
                Announcement Status
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Overview of all announcements in the system.
              </p>
            </div>
          </div>

          {isLoading ? (

            <>
              <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3">
                <div className="flex min-h-28 flex-col justify-between rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-3 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-blue-200 dark:bg-blue-800" />
                    <div className="h-4 w-14 rounded bg-blue-200 dark:bg-blue-800" />
                  </div>
                  <div>
                    <div className="mb-2 h-8 w-12 rounded bg-blue-200 dark:bg-blue-800" />
                    <div className="h-3 w-28 rounded bg-blue-200 dark:bg-blue-800" />
                  </div>
                </div>

                <div className="flex min-h-28 flex-col justify-between rounded-xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-3 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-green-200 dark:bg-green-800" />
                    <div className="h-4 w-14 rounded bg-green-200 dark:bg-green-800" />
                  </div>
                  <div>
                    <div className="mb-2 h-8 w-12 rounded bg-green-200 dark:bg-green-800" />
                    <div className="h-3 w-28 rounded bg-green-200 dark:bg-green-800" />
                  </div>
                </div>

                <div className="flex min-h-28 flex-col justify-between rounded-xl border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950 p-3 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-orange-200 dark:bg-orange-800" />
                    <div className="h-4 w-14 rounded bg-orange-200 dark:bg-orange-800" />
                  </div>
                  <div>
                    <div className="mb-2 h-8 w-12 rounded bg-orange-200 dark:bg-orange-800" />
                    <div className="h-3 w-28 rounded bg-orange-200 dark:bg-orange-800" />
                  </div>
                </div>

              </div>
            </>
          ) : isError ? (

            <div className="col-span-2 flex min-h-40 flex-col items-center justify-center gap-2 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 p-5 text-center">
              <span className="rounded-full bg-red-100 dark:bg-red-900 p-3 text-red-600 dark:text-red-400">
                <AlertCircle size={24} />
              </span>

              <h3 className="font-semibold text-red-700 dark:text-red-300">
                Failed to load announcements
              </h3>

              <p className="text-sm text-red-600 dark:text-red-400">
                Something went wrong while fetching announcement data.
              </p>
            </div>
          ) : (
            // Normal UI
            <>
              <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3">

                <div className="w-full p-4 flex min-h-28 flex-col justify-between rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/10  hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-500/10 dark:hover:bg-blue-400/10 hover:border-blue-500">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-blue-100 dark:bg-blue-900 p-2.5 text-blue-600 dark:text-blue-400">
                      <Megaphone size={20} />
                    </span>
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                      Total
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {totalAnnouncements}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      All announcements
                    </p>
                  </div>
                </div>

                <div className="w-full flex min-h-28 flex-col justify-between rounded-xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/10 p-3 hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out hover:bg-green-500/10 dark:hover:bg-green-400/10 hover:border-green-500">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-green-100 dark:bg-green-900 p-2.5 text-green-600 dark:text-green-400">
                      <CheckCircle size={20} />
                    </span>
                    <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                      Active
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {activeAnnouncements}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Currently published
                    </p>
                  </div>
                </div>

                <div className="w-full flex min-h-28 flex-col justify-between rounded-xl border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/10 p-3 hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-500/10 dark:hover:bg-orange-400/10 hover:border-orange-500">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-orange-100 dark:bg-orange-900 p-2.5 text-orange-600 dark:text-orange-400">
                      <FileText size={20} />
                    </span>
                    <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                      Draft
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {draftAnnouncements}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Not published yet
                    </p>
                  </div>
                </div>

              </div>
            </>
          )}
        </div>

        {/* Create Announcement Form */}
        <div className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 shadow-sm">

          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-zinc-700 px-4 py-3 bg-gray-100 dark:bg-zinc-800 rounded-xl">

            <span className="rounded-lg bg-violet-100 dark:bg-violet-950 p-2.5 text-violet-600 dark:text-violet-400">
              <Megaphone size={20} />
            </span>

            <div>
              <h2 className="font-bold text-gray-900 dark:text-gray-100">Create New Announcement</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Publish an important message for all users.</p>
            </div>

          </div>

          <div className="flex flex-col gap-3 p-4">

            <div className="flex flex-col gap-1">

              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Title <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                placeholder="Enter announcement title..."
                maxLength={100}
                className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-950"
              />

              <div className="flex justify-end">
                <span className="text-xs text-gray-400">{announcementTitle.length}/100</span>
              </div>

            </div>

            <div className="flex flex-col gap-1">

              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Message <span className="text-red-500">*</span>
              </label>

              <textarea
                rows={3}
                maxLength={500}
                value={announcementMessage}
                onChange={(e) => setAnnouncementMessage(e.target.value)}
                placeholder="Write your announcement message here..."
                className="w-full resize-none rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-950"
              />

              <div className="flex justify-end">
                <span className="text-xs text-gray-400">{announcementMessage.length}/500</span>
              </div>

            </div>

            <div className="flex flex-col gap-1.5">

              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">Type</label>

              <div className="flex w-full items-center gap-2">

                {announcementTypes.map((item) => {
                  const Icon = item.icon;
                  const isActive = announcementType === item.name;

                  return (

                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setAnnouncementType(item.name)}
                      className={` flex flex-1 flex-col md:flex-row cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${item.name === "Info"
                        ? isActive
                          ? "border-blue-400 bg-blue-100 text-blue-700 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-300 hover:bg-blue-500/10 dark:hover:bg-blue-400/10"
                          : "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300 hover:border-blue-300 hover:bg-blue-500/10 dark:hover:bg-blue-400/10"
                        : item.name === "Maintenance"
                          ? isActive
                            ? "border-orange-400 bg-orange-100 text-orange-700 dark:border-orange-700 dark:bg-orange-950 dark:text-orange-300 hover:bg-orange-500/10 dark:hover:bg-orange-400/10"
                            : "border-orange-200 bg-orange-100 text-orange-700 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-300 hover:border-orange-300 hover:bg-orange-500/10 dark:hover:bg-orange-400/10"
                          : item.name === "Important"
                            ? isActive
                              ? "border-red-400 bg-red-100 text-red-700 dark:border-red-700 dark:bg-red-950 dark:text-red-300 hover:bg-red-500/10 dark:hover:bg-red-400/10"
                              : "border-red-200 bg-red-100 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300 hover:border-red-300 hover:bg-red-500/10 dark:hover:bg-red-400/10"
                            : isActive
                              ? "border-green-400 bg-green-100 text-green-700 dark:border-green-700 dark:bg-green-950 dark:text-green-300 hover:bg-green-500/10 dark:hover:bg-green-400/10"
                              : "border-green-200 bg-green-100 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300 hover:border-green-300 hover:bg-green-500/10 dark:hover:bg-green-400/10"
                        }`}
                    >
                      <Icon size={16} className="shrink-0" />
                      <span className="whitespace-nowrap">{item.name}</span>
                    </button>

                  );
                })}

              </div>

            </div>


            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Publishing Option
              </label>

              <div className="flex flex-wrap items-center gap-5">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="publishType"
                    value="now"
                    checked={publishType === "now"}
                    onChange={(e) => setPublishType(e.target.value)}
                    className="accent-violet-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Publish Now
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="publishType"
                    value="draft"
                    checked={publishType === "draft"}
                    onChange={(e) => setPublishType(e.target.value)}
                    className="accent-violet-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Save as Draft
                  </span>
                </label>
              </div>
            </div>


            <div className="flex flex-col items-stretch gap-2 pt-1 sm:flex-row sm:items-center">


              <div className="flex flex-1 items-center gap-2 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 px-3 py-2">
                <Info size={17} className="shrink-0 text-blue-600 dark:text-blue-400" />

                <p className="text-xs text-blue-700 dark:text-blue-300">
                  {publishType === "draft"
                    ? "This announcement will be saved as a draft and won't be visible to users until published."
                    : "This announcement will be published immediately and visible to users."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleClear}
                className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
              >
                <RotateCcw size={16} />
                Clear
              </button>

              <button
                type="button"
                onClick={handlePublish}
                disabled={createAnnouncement.isPending}
                className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-violet-600 bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={16} />
                {createAnnouncement.isPending
                  ? publishType === "draft"
                    ? "Saving Draft..."
                    : "Publishing..."
                  : publishType === "draft"
                    ? "Save as Draft"
                    : "Publish Announcement"}
              </button>

            </div>

          </div>
        </div>

        
      </div>

      {/* Announcements Table */}
      <div className="rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 shadow-sm">

        <div className="flex flex-col gap-3 border-b border-gray-200 dark:border-zinc-700 p-4 sm:flex-row sm:items-center sm:justify-between bg-gray-100 dark:bg-zinc-800 rounded-t-xl">

          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-violet-100 dark:bg-violet-950 p-2.5 text-violet-600 dark:text-violet-400"><Megaphone size={20} /></span>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-gray-100">All Announcements</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Manage drafts and published announcements.</p>
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="cursor-pointer rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm outline-none focus:border-violet-500"
          >
            <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100">All Status</option>
            <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100">Active</option>
            <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100">Draft</option>
            <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100">Inactive</option>
          </select>

        </div>

        <div className="w-full overflow-x-auto">

          <table className="w-full min-w-225">

            <thead>
              <tr className="border-b border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Title</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Published At</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <>
                  {/* Skeleton Row 1 */}
                  <tr className="animate-pulse border-b border-gray-100 dark:border-zinc-800">
                    <td className="px-4 py-4">
                      <div className="h-4 w-6 rounded bg-blue-200 dark:bg-blue-900" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-violet-200 dark:bg-violet-900" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-40 rounded bg-blue-200 dark:bg-blue-900" />
                          <div className="h-3 w-56 rounded bg-sky-100 dark:bg-sky-950" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-6 w-24 rounded-md bg-orange-200 dark:bg-orange-900" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-6 w-20 rounded-md bg-green-200 dark:bg-green-900" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-28 rounded bg-cyan-200 dark:bg-cyan-900" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-sky-200 dark:bg-sky-900" />
                        <div className="h-9 w-9 rounded-lg bg-rose-200 dark:bg-rose-900" />
                      </div>
                    </td>
                  </tr>

                  {/* Skeleton Row 2 */}
                  <tr className="animate-pulse border-b border-gray-100 dark:border-zinc-800">
                    <td className="px-4 py-4">
                      <div className="h-4 w-6 rounded bg-blue-200 dark:bg-blue-900" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-violet-200 dark:bg-violet-900" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-32 rounded bg-blue-200 dark:bg-blue-900" />
                          <div className="h-3 w-48 rounded bg-sky-100 dark:bg-sky-950" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-6 w-24 rounded-md bg-green-200 dark:bg-green-900" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-6 w-20 rounded-md bg-orange-200 dark:bg-orange-900" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-28 rounded bg-cyan-200 dark:bg-cyan-900" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-sky-200 dark:bg-sky-900" />
                        <div className="h-9 w-9 rounded-lg bg-rose-200 dark:bg-rose-900" />
                      </div>
                    </td>
                  </tr>

                  {/* Skeleton Row 3 */}
                  <tr className="animate-pulse border-b border-gray-100 dark:border-zinc-800">
                    <td className="px-4 py-4">
                      <div className="h-4 w-6 rounded bg-blue-200 dark:bg-blue-900" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-violet-200 dark:bg-violet-900" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-36 rounded bg-blue-200 dark:bg-blue-900" />
                          <div className="h-3 w-52 rounded bg-sky-100 dark:bg-sky-950" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-6 w-24 rounded-md bg-red-200 dark:bg-red-900" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-6 w-20 rounded-md bg-green-200 dark:bg-green-900" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-28 rounded bg-cyan-200 dark:bg-cyan-900" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-sky-200 dark:bg-sky-900" />
                        <div className="h-9 w-9 rounded-lg bg-rose-200 dark:bg-rose-900" />
                      </div>
                    </td>
                  </tr>
                </>
              ) : isError ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-950 dark:text-red-400">
                        <AlertCircle size={24} />
                      </span>
                      <p className="font-semibold text-red-600 dark:text-red-400">
                        Failed to load announcements
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Please check your connection and try again.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : paginatedAnnouncements.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="rounded-full bg-violet-100 p-3 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                        <Megaphone size={24} />
                      </span>
                      <p className="font-semibold text-gray-700 dark:text-gray-300">
                        No announcements found
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Create an announcement or change the status filter.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedAnnouncements.map((announcement, index) => {
                  let TypeIcon = Info;
                  let typeClass =
                    "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-950 dark:border-blue-900";

                  if (announcement.type === "Maintenance") {
                    TypeIcon = Wrench;
                    typeClass =
                      "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-300 dark:bg-orange-950 dark:border-orange-900";
                  } else if (announcement.type === "Important") {
                    TypeIcon = AlertCircle;
                    typeClass =
                      "text-red-600 bg-red-50 border-red-200 dark:text-red-300 dark:bg-red-950 dark:border-red-900";
                  } else if (announcement.type === "Update") {
                    TypeIcon = FileText;
                    typeClass =
                      "text-green-600 bg-green-50 border-green-200 dark:text-green-300 dark:bg-green-950 dark:border-green-900";
                  }

                  let statusClass =
                    "text-red-600 bg-red-50 border-red-200 dark:text-red-300 dark:bg-red-950 dark:border-red-900";

                  if (announcement.status === "Active") {
                    statusClass =
                      "text-green-600 bg-green-50 border-green-200 dark:text-green-300 dark:bg-green-950 dark:border-green-900";
                  } else if (announcement.status === "Draft") {
                    statusClass =
                      "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-300 dark:bg-orange-950 dark:border-orange-900";
                  }

                  return (
                    <tr
                      key={announcement.id}
                      className="border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {startIndex + index + 1}
                      </td>

                      <td className="max-w-md px-4 py-4">
                        <div className="flex items-start gap-3">
                          <span className={`mt-0.5 rounded-lg border p-2 ${typeClass}`}>
                            <TypeIcon size={18} />
                          </span>
                          <div className="min-w-0">
                            <h3 className="truncate font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">
                              {announcement.title}
                            </h3>
                            <p className="mt-1 max-w-md truncate text-xs text-gray-500 dark:text-gray-400">
                              {announcement.message}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium ${typeClass}`}>
                          <TypeIcon size={13} />
                          {announcement.type}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium ${statusClass}`}>
                          {announcement.status === "Active" && <CheckCircle size={13} />}
                          {announcement.status}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {announcement.publishedAt}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedAnnouncement(announcement)}
                            aria-label="View announcement"
                            title="View Announcement"
                            className="cursor-pointer rounded-lg border border-sky-200 bg-sky-50 p-2 text-sky-600 transition-colors hover:border-sky-300 hover:bg-sky-100 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-400 dark:hover:bg-sky-900"
                          >
                            <Eye size={16} />
                          </button>

                          {announcement.status === "Draft" && (
                            <button
                              type="button"
                              onClick={() => setConfirmPublish(announcement)}
                              disabled={publishDraft.isPending}
                              aria-label="Publish draft announcement"
                              title="Publish Draft"
                              className="cursor-pointer rounded-lg border border-indigo-200 bg-indigo-50 p-2 text-indigo-600 transition-colors hover:border-indigo-300 hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-400 dark:hover:bg-indigo-900"
                            >
                              <Send size={16} />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDelete(announcement.id)}
                            disabled={deactivateAnnouncement.isPending}
                            aria-label="Delete announcement"
                            title="Deactivate Announcement"
                            className="cursor-pointer rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 transition-colors hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>


        {/* Pagination */}
        {!isLoading && !isError && (
          <div className="flex flex-col gap-3 border-t border-gray-200 dark:border-zinc-700 p-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Showing {filteredAnnouncements.length === 0 ? 0 : startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredAnnouncements.length)} of{" "}
              {filteredAnnouncements.length} announcements
            </p>

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={() => setCurrentPage((page) => page - 1)}
                disabled={currentPage === 1}
                className="cursor-pointer rounded-lg border border-violet-600 bg-violet-600 px-3 py-2 text-sm text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium ${currentPage === page
                    ? "border-violet-600 bg-violet-600 text-white hover:bg-blue-600"
                    : "border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white dark:hover:bg-zinc-700"
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((page) => page + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="cursor-pointer rounded-lg border border-violet-600 bg-violet-600 px-3 py-2 text-sm text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                &gt;
              </button>

            </div>
          </div>

        )}

      </div>

      {showMessage && (
        <MessagePopup
          type={showMessage.type}
          title={showMessage.title}
          message={showMessage.message}
          onClose={() => setShowMessage(null)}
        />
      )}

      {confirmDelete && (
        <ConfirmPopup
          title="Deactivate Announcement"
          message="Are you sure you want to deactivate this announcement? It will no longer be active."
          confirmText="Yes, Deactivate"
          cancelText="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {confirmPublish && (
        <ConfirmPopup
          title="Publish Announcement"
          message={`Are you sure you want to publish "${confirmPublish.title}"? It will become visible to users immediately.`}
          confirmText={publishDraft.isPending ? "Publishing..." : "Yes, Publish"}
          cancelText="Cancel"
          onConfirm={() => {
            const announcementId = confirmPublish.id;
            setConfirmPublish(null);
            publishDraft.mutate(announcementId);
          }}
          onCancel={() => setConfirmPublish(null)}
        />
      )}

      {selectedAnnouncement && (
        <ViewAnnouncement
          announcement={selectedAnnouncement}
          onClose={() => setSelectedAnnouncement(null)}
        />
      )}

    </div>

  );

}

export default AdminAnnoucements;
