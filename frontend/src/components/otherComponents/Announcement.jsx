
import React, { useState } from "react";
import { Megaphone, CalendarDays, Info } from "lucide-react";
import ViewAnnouncement from "./ViewAnnouncement";

const Announcement = ({ announcements = [], isLoading, isError }) => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
 const Test = true;
  return (

    <div className="w-full lg:w-1/5 h-[calc(100vh-105px)] shrink-0 overflow-y-auto rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-3 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2 border-b border-gray-200 dark:border-zinc-700 pb-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-200 dark:bg-violet-950">
          <Megaphone size={20} className="text-violet-700 dark:text-violet-400" />
        </span>

        <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
          Announcement
        </h2>
      </div>

      {/* Announcement List */}
      {isLoading ? (
       <div className="flex flex-col gap-3">
    
    <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="mb-3 flex items-start gap-2">
        <div className="mt-1 h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-violet-200 dark:bg-violet-900" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />
      </div>

      <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />
      <div className="mb-2 h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />

      <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3 dark:border-zinc-700">
        <div className="h-3.5 w-3.5 animate-pulse rounded bg-violet-200 dark:bg-violet-900" />
        <div className="h-3 w-20 animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />
      </div>
    </div>

    {/* Announcement Skeleton 2 */}
    <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="mb-3 flex items-start gap-2">
        <div className="mt-1 h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-violet-200 dark:bg-violet-900" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />
      </div>

      <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />
      <div className="mb-2 h-4 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />

      <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3 dark:border-zinc-700">
        <div className="h-3.5 w-3.5 animate-pulse rounded bg-violet-200 dark:bg-violet-900" />
        <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />
      </div>
    </div>

    {/* Announcement Skeleton 3 */}
    <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="mb-3 flex items-start gap-2">
        <div className="mt-1 h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-violet-200 dark:bg-violet-900" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />
      </div>

      <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />
      <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />

      <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3 dark:border-zinc-700">
        <div className="h-3.5 w-3.5 animate-pulse rounded bg-violet-200 dark:bg-violet-900" />
        <div className="h-3 w-20 animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />
      </div>
    </div>
  </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-3 py-6 text-center dark:border-zinc-700 dark:bg-zinc-800">
    <Info size={25} className="text-amber-500" />

    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
      Announcements unavailable
    </p>

    <p className="text-xs text-gray-500 dark:text-zinc-400">
      Please try again later.
    </p>
  </div>
      ) : announcements.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-6 text-center">
          <Info size={25} className="text-gray-400 dark:text-zinc-500" />
          <p className="text-sm font-medium text-gray-700 dark:text-zinc-200">
            No announcements
          </p>
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            New updates will appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {announcements.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelectedAnnouncement(item)}
              className="cursor-pointer rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-3 transition-all duration-200 hover:border-violet-300 hover:bg-violet-50 dark:hover:border-violet-500 dark:hover:bg-violet-950/10"
            >
              {/* Title */}
              <div className="mb-2 flex items-start gap-2">
                <span className="mt-1 flex h-2.5 w-2.5 shrink-0 rounded-full bg-violet-600 ring-4 ring-violet-100 dark:bg-violet-400 dark:ring-violet-950" />

                <h3 className="wrap-break-word text-sm font-semibold leading-5 text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
              </div>

              {/* Message */}
              <p className="wrap-break-word text-sm leading-5 text-gray-600 dark:text-zinc-300">
                {item.message}
              </p>

              {/* Date */}
              <div className="mt-3 flex items-center gap-1.5 border-t border-gray-100 dark:border-zinc-700 pt-2">
                <CalendarDays size={14} className="shrink-0 text-violet-600 dark:text-violet-400" />

                <p className="text-xs font-medium text-violet-700 dark:text-violet-300">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                    : "Date unavailable"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAnnouncement && (
        <ViewAnnouncement
          announcement={selectedAnnouncement}
          onClose={() => setSelectedAnnouncement(null)}
        />
      )}
    </div>

  );
};

export default Announcement;
