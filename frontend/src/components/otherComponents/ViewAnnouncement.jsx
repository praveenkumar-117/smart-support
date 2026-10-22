
import React from "react";
import {
  Megaphone,
  Info,
  Wrench,
  AlertCircle,
  FileText,
  CalendarDays,
  Clock3,
  Eye,
  X,
} from "lucide-react";

const ViewAnnouncement = ({ announcement, onClose }) => {
  if (!announcement) return null;

  const typeConfig = {
    Info: {
      icon: Info,
      color: "text-blue-700 dark:text-blue-400",
      bg: "bg-blue-200 dark:bg-blue-950",
    },
    Maintenance: {
      icon: Wrench,
      color: "text-orange-700 dark:text-orange-400",
      bg: "bg-orange-200 dark:bg-orange-950",
    },
    Important: {
      icon: AlertCircle,
      color: "text-red-700 dark:text-red-400",
      bg: "bg-red-200 dark:bg-red-950",
    },
    Update: {
      icon: FileText,
      color: "text-green-700 dark:text-green-400",
      bg: "bg-green-200 dark:bg-green-950",
    },
  };

  const selectedType = typeConfig[announcement.type] || typeConfig.Info;
  const TypeIcon = selectedType.icon;

  const statusConfig = {
    Active: {
      color: "text-green-700 dark:text-green-400",
      bg: "bg-green-200 dark:bg-green-950",
    },
    Draft: {
      color: "text-orange-700 dark:text-orange-400",
      bg: "bg-orange-200 dark:bg-orange-950",
    },
    Expired: {
      color: "text-red-700 dark:text-red-400",
      bg: "bg-red-200 dark:bg-red-950",
    },
  };

  const selectedStatus =
    statusConfig[announcement.status] || statusConfig.Active;

  const createdDate = announcement.createdAt
    ? new Date(announcement.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/50 p-3">
      <div className="flex max-h-[calc(100vh-2rem)] w-4/5 lg:w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-gray-50 dark:bg-zinc-900 shadow-xl">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-800 px-5 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-200 dark:bg-blue-950">
              <Megaphone size={22} className="text-blue-700 dark:text-blue-400" />
            </span>

            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Announcement Details
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Close"
            className="ml-3 shrink-0 cursor-pointer rounded-md p-1.5 text-gray-500 dark:text-zinc-400 hover:bg-red-600 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 overflow-y-auto p-4">

          {/* Title */}
          <div className="rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 px-3 py-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="shrink-0 text-sm font-medium text-gray-500 dark:text-zinc-400">
                Announcement :
              </p>

              <h3 className="wrap-break-word min-w-0 flex-1 text-sm font-semibold text-gray-800 dark:text-gray-100">
                {announcement.title}
              </h3>
            </div>
          </div>

          {/* Announcement Information */}
          <div className="flex gap-4">

            {/* Type */}
            <div className="w-[30%] flex flex-col gap-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 p-2.5">
              <div className="flex items-center gap-2">
                <span className={`flex h-7 w-7 items-center justify-center rounded-md ${selectedType.bg}`}>
                  <TypeIcon size={16} className={selectedType.color} />
                </span>

                <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">
                  Type
                </p>
              </div>

              <p className={`wrap-break-word text-sm font-semibold ${selectedType.color}`}>
                {announcement.type || "Info"}
              </p>
            </div>

            {/* Status */}
            <div className="w-[30%]  flex flex-col gap-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 p-2.5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-green-200 dark:bg-green-950">
                  <Eye size={16} className="text-green-700 dark:text-green-400" />
                </span>

                <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">
                  Status
                </p>
              </div>

              <p className={`wrap-break-word text-sm font-semibold ${selectedStatus.color}`}>
                {announcement.status || "N/A"}
              </p>
            </div>

            {/* Created At */}
            <div className="w-[30%]  flex flex-col gap-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 p-2.5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-200 dark:bg-violet-950">
                  <CalendarDays size={16} className="text-violet-700 dark:text-violet-400" />
                </span>

                <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">
                  Created At
                </p>
              </div>

              <p className="wrap-break-word text-sm font-semibold text-gray-700 dark:text-zinc-200">
                {createdDate}
              </p>
            </div>
          </div>

          {/* Schedule Details */}
          <div className="rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 p-2.5">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-200 dark:bg-amber-950">
                <Clock3 size={16} className="text-amber-700 dark:text-amber-400" />
              </span>

              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Schedule Details
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <p className="mb-0.5 text-sm text-gray-500 dark:text-zinc-400">
                  Publish Type
                </p>
                <p className="text-sm font-semibold text-gray-700 dark:text-zinc-200">
                  {announcement.publishType === "later"
                    ? "Scheduled"
                    : "Publish Now"}
                </p>
              </div>

              <div>
                <p className="mb-0.5 text-sm text-gray-500 dark:text-zinc-400">
                  Scheduled Date &amp; Time
                </p>

                <p className="wrap-break-word text-sm font-semibold text-gray-700 dark:text-zinc-200">
                  {announcement.publishType === "later" &&
                  announcement.publishAt
                    ? new Date(announcement.publishAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Not scheduled"}
                </p>
              </div>
            </div>
          </div>

          {/* Announcement Message */}
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-200 dark:bg-rose-950">
                <FileText size={16} className="text-rose-700 dark:text-rose-400" />
              </span>

              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Announcement Message
              </h3>
            </div>

            <div className="min-h-24 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 p-3">
              <p className="wrap-break-word whitespace-pre-line text-sm leading-6 text-gray-700 dark:text-zinc-300">
                {announcement.message}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end border-t border-gray-200 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-800 px-4 py-2">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 dark:bg-violet-600 dark:hover:bg-indigo-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAnnouncement;
