
import {
  Hand,
  Plus,
  Ticket,
  PackageOpen,
  Loader,
  CircleCheckBig,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Announcement from "../otherComponents/Announcement";
import api from "../../api/api";
import MessagePopup from "../otherComponents/MessagePopup";


const UserDashboard = () => {
  const [showMessage, setShowMessage] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  // Fetch logged-in user's tickets
  const {
    data: myTicketdata,
    isLoading: myTicketsisLoading,
    isError: myTicketsisError,
    error: myTicketsError,
  } = useQuery({
    queryKey: ["myTickets"],
    queryFn: async () => {
      const response = await api.get("/ticket/getmytickets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: !!token,
    retry: false,
  });

  const tickets = myTicketdata?.tickets || [];
  // Fetch announcements
  const {
    data: announcementData,
    isLoading: announcementsLoading,
    isError: announcementsIsError,
    error: announcementsQueryError,
  } = useQuery({
    queryKey: ["userAnnouncements"],
    queryFn: async () => {
      const response = await api.get("/announcements");
      return response.data;
    },
    retry: false,
  });


  const announcements = (
    announcementData?.announcements || []
  ).filter((item) => {
    const now = new Date();

    const isPublished =
      item.isActive !== false &&
      (item.publishType !== "later" ||
        (item.publishAt && new Date(item.publishAt) <= now));

    const isNotExpired =
      !item.expiresAt || new Date(item.expiresAt) > now;

    return isPublished && isNotExpired;
  });

  // Ticket summary counts
  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === "open"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === "in progress"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === "resolved"
  ).length;



  // Show newest tickets first
  const recentTickets = [...tickets]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt || 0) -
        new Date(a.updatedAt || a.createdAt || 0)
    )
    .slice(0, 5);

  const formatDate = (dateValue) => {
    if (!dateValue) return "—";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "text-red-600";

      case "in progress":
        return "text-orange-600";

      case "resolved":
        return "text-green-700";

      case "closed":
        return "text-gray-600";

      default:
        return "text-gray-600";
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case "urgent":
      case "high":
        return "text-red-700";

      case "medium":
        return "text-orange-600";

      case "low":
        return "text-green-700";

      default:
        return "text-gray-600";
    }
  };

  useEffect(() => {
    if (!myTicketsisError && !announcementsIsError) return;

    const errors = [];

    if (myTicketsisError) {
      errors.push(
        myTicketsError?.response?.data?.message ||
        myTicketsError?.message ||
        "Unable to fetch tickets."
      );
    }

    if (announcementsIsError) {
      errors.push(
        announcementsQueryError?.response?.data?.message ||
        announcementsQueryError?.message ||
        "Unable to fetch announcements."
      );
    }

    setShowMessage({
      type: "error",
      title:
        myTicketsisError && announcementsIsError
          ? "Dashboard Data Fetch Failed"
          : myTicketsisError
            ? "Tickets Fetch Failed"
            : "Announcements Fetch Failed",
      message: errors.join("\n"),
    });
  }, [
    myTicketsisError,
    myTicketsError,
    announcementsIsError,
    announcementsQueryError,
  ]);
  return (

    <div className="flex flex-col lg:flex-row w-full gap-4 bg-gray-200 dark:bg-zinc-950 p-4">
      <div className="min-w-0 flex flex-col flex-1 rounded-xl gap-3 ">
        {/* Welcome Card */}
        <div className="flex items-center overflow-hidden rounded-xl border border-violet-200 dark:border-zinc-800 bg-linear-to-br from-violet-300 to-indigo-400 dark:from-violet-950 dark:via-purple-950 dark:to-indigo-950 p-4">
          <div className="flex w-1/2 flex-col items-start gap-3">
            <h1 className="flex items-center gap-2 text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100 xl:text-3xl">
              Welcome Back!
              <Hand size={25} className="shrink-0 text-amber-500" />
            </h1>

            <p className="text-xs md:text-sm text-gray-700 dark:text-zinc-300 xl:text-base">
              Here's an overview of your support requests.
            </p>

            <button
              onClick={() => navigate("/user/create-ticket")}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-violet-700 bg-violet-700 md:px-4 md:py-2 px-2 py-1  text-xs md:text-sm font-semibold text-white transition duration-200 hover:border-indigo-700 hover:bg-indigo-700 dark:border-violet-500 dark:bg-violet-600 dark:hover:border-indigo-500 dark:hover:bg-indigo-600"
            >
              <Plus size={19} className="hidden md:block" />
              Create New Ticket
            </button>
          </div>

          <div className="flex w-1/2 justify-center">
            <img
              src="/user_hero.png"
              alt="Support dashboard illustration"
              className="h-24 w-50 md:h-30 object-contain"
            />
          </div>
        </div>



        {myTicketsisLoading ? (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 mt-2">
            {/* Total Tickets Skeleton */}
            <div className="rounded-xl border border-violet-200 bg-violet-50 p-3 sm:p-4 dark:border-violet-900 dark:bg-zinc-900">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-full bg-violet-200 dark:bg-violet-950" />
                <div className="h-6 w-8 animate-pulse rounded bg-violet-300 dark:bg-violet-900" />
              </div>
              <div className="mb-2 h-4 w-24 animate-pulse rounded bg-violet-300 dark:bg-violet-900" />
              <div className="h-3 w-28 animate-pulse rounded bg-violet-200 dark:bg-zinc-800" />
            </div>

            {/* Open Tickets Skeleton */}
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 sm:p-4 dark:border-rose-900 dark:bg-zinc-900">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-full bg-rose-200 dark:bg-rose-950" />
                <div className="h-6 w-8 animate-pulse rounded bg-rose-300 dark:bg-rose-900" />
              </div>
              <div className="mb-2 h-4 w-16 animate-pulse rounded bg-rose-300 dark:bg-rose-900" />
              <div className="h-3 w-28 animate-pulse rounded bg-rose-200 dark:bg-zinc-800" />
            </div>

            {/* In Progress Skeleton */}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 sm:p-4 dark:border-amber-900 dark:bg-zinc-900">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-full bg-amber-200 dark:bg-amber-950" />
                <div className="h-6 w-8 animate-pulse rounded bg-amber-300 dark:bg-amber-900" />
              </div>
              <div className="mb-2 h-4 w-24 animate-pulse rounded bg-amber-300 dark:bg-amber-900" />
              <div className="h-3 w-28 animate-pulse rounded bg-amber-200 dark:bg-zinc-800" />
            </div>

            {/* Resolved Skeleton */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 sm:p-4 dark:border-emerald-900 dark:bg-zinc-900">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-full bg-emerald-200 dark:bg-emerald-950" />
                <div className="h-6 w-8 animate-pulse rounded bg-emerald-300 dark:bg-emerald-900" />
              </div>
              <div className="mb-2 h-4 w-20 animate-pulse rounded bg-emerald-300 dark:bg-emerald-900" />
              <div className="h-3 w-28 animate-pulse rounded bg-emerald-200 dark:bg-zinc-800" />
            </div>
          </div>
        ) : (
          <>

            {/* Ticket Summary Cards */}
            <div className=" flex flex-col md:flex-row flex-wrap gap-2 mt-2">
              <div className="md:w-[48%] lg:w-[24%] flex min-w-0 flex-col justify-between gap-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-3 transition duration-200 hover:scale-[1.02] hover:border-purple-300 hover:bg-purple-100 dark:hover:border-purple-500 dark:hover:bg-purple-950/10">
                <div className="flex items-center gap-2">
                  <Ticket
                    className="shrink-0 rounded-full bg-purple-200 dark:bg-purple-900 p-1.5 text-purple-700 dark:text-purple-300"
                    size={40}
                  />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {totalTickets}
                  </h2>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-zinc-200">
                    Total Tickets
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-purple-700 dark:text-purple-300">
                    All Time
                  </p>
                </div>
              </div>

              <div className="md:w-[48%] lg:w-[24%] flex min-w-0 flex-col justify-between gap-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-3 transition duration-200 hover:scale-[1.02] hover:border-red-300 hover:bg-red-100 dark:hover:border-red-500 dark:hover:bg-red-950/10">
                <div className="flex items-center gap-2">
                  <PackageOpen
                    className="shrink-0 rounded-full bg-red-200 dark:bg-red-900 p-1.5 text-red-700 dark:text-red-300"
                    size={40}
                  />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {openTickets}
                  </h2>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-zinc-200">
                    Open
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-red-700 dark:text-red-300">
                    Need your attention
                  </p>
                </div>
              </div>

              <div className="md:w-[48%] lg:w-[24%] flex min-w-0 flex-col justify-between gap-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-3 transition duration-200 hover:scale-[1.02] hover:border-orange-300 hover:bg-orange-100 dark:hover:border-orange-500 dark:hover:bg-orange-950/10">
                <div className="flex items-center gap-2">
                  <Loader
                    className="shrink-0 rounded-full bg-orange-200 dark:bg-orange-900 p-1.5 text-orange-700 dark:text-orange-300"
                    size={40}
                  />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {inProgressTickets}
                  </h2>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-zinc-200">
                    In Progress
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-orange-700 dark:text-orange-300">
                    Being worked on
                  </p>
                </div>
              </div>

              <div className="md:w-[48%] lg:w-[24%] flex min-w-0 flex-col justify-between gap-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-3 transition duration-200 hover:scale-[1.02] hover:border-green-300 hover:bg-green-100 dark:hover:border-green-500 dark:hover:bg-green-950/10">
                <div className="flex items-center gap-2">
                  <CircleCheckBig
                    className="shrink-0 rounded-full bg-green-200 dark:bg-green-900 p-1.5 text-green-700 dark:text-green-300"
                    size={40}
                  />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {resolvedTickets}
                  </h2>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-zinc-200">
                    Resolved
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-green-700 dark:text-green-300">
                    Successfully resolved
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Recent Tickets */}
        <div className="flex flex-col gap-3">
          <div className=" flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-800 dark:text-gray-400">
              Recent Tickets
            </h2>
            <button
              onClick={() => navigate("/user/my-tickets")}
              className="cursor-pointer text-sm font-semibold text-violet-700 hover:text-indigo-700 dark:text-violet-400 dark:hover:text-indigo-400"
            >
              View All
            </button>
          </div>

          <div className="w-full min-w-0 overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 dark:border-zinc-700 dark:bg-zinc-900">
            <table className="w-full min-w-180 text-left text-sm">
              <thead className="bg-gray-300 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300">
                <tr>
                  <th className="whitespace-nowrap px-3 py-3 font-semibold">Ticket ID</th>
                  <th className="px-3 py-3 font-semibold">Subject</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-3 py-3 font-semibold">Priority</th>
                  <th className="whitespace-nowrap px-3 py-3 font-semibold">Last Updated</th>
                </tr>
              </thead>

              <tbody className="text-gray-800 dark:text-zinc-200">
                {myTicketsisLoading ? (
                  <tr>
                    <td colSpan={5} className="p-3">
                      <div className="flex flex-col gap-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-2 items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900 md:grid-cols-5"
                          >
                            {/* 1. Ticket ID */}
                            <div className="flex flex-col gap-2">
                              <div className="h-3 w-12 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />
                              <div className="h-4 w-16 animate-pulse rounded bg-violet-300 dark:bg-zinc-800" />
                            </div>

                            {/* 2. Subject */}
                            <div className="col-span-2 flex min-w-0 flex-col gap-2 md:col-span-1">
                              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />
                              <div className="h-3 w-full max-w-48 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
                              <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
                            </div>

                            {/* 3. Status */}
                            <div className="flex flex-col gap-2">
                              <div className="h-3 w-12 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />
                              <div className="h-6 w-16 animate-pulse rounded-full bg-red-100 dark:bg-red-950" />
                            </div>

                            {/* 4. Priority */}
                            <div className="flex flex-col gap-2">
                              <div className="h-3 w-14 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />
                              <div className="h-6 w-20 animate-pulse rounded-full bg-orange-100 dark:bg-orange-950" />
                            </div>

                            {/* 5. Last Updated */}
                            <div className="flex flex-col gap-2">
                              <div className="h-3 w-20 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />
                              <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
                              <div className="h-3 w-14 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ) : myTicketsisError ? (

                  <tr>
                    <td colSpan={5} className="px-3 py-8 text-center text-red-600 dark:text-red-400">
                      Unable to load tickets.
                    </td>
                  </tr>

                ) : recentTickets.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-8 text-center text-gray-500 dark:text-zinc-400">
                      No tickets found. Create your first ticket!
                    </td>
                  </tr>

                ) : (

                  recentTickets.map((ticket) => {
                    const updatedDate = ticket.updatedAt || ticket.createdAt;

                    return (
                      <tr
                        key={ticket._id}
                        className="border-t border-gray-200 dark:border-zinc-700 transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800"
                      >
                        <td className="whitespace-nowrap px-3 py-3 font-semibold">
                          {ticket.ticketId || ticket._id}
                        </td>
                        <td className="min-w-48 px-3 py-3">
                          <h3 className="wrap-break-words font-semibold">
                            {ticket.subject}
                          </h3>

                          <p className="mt-1 wrap-break-words text-xs font-normal text-gray-600 dark:text-zinc-400">
                            {ticket.description}
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          <span className={`font-semibold ${getStatusStyle(ticket.status)}`}>
                            ● {ticket.status || "Open"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          <span className={`font-semibold ${getPriorityStyle(ticket.priority)}`}>
                            ● {ticket.priority || "—"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          <p className="font-medium">{formatDate(updatedDate)}</p>
                          <p className="mt-1 text-xs font-normal text-gray-500 dark:text-zinc-400">
                            {formatTime(updatedDate)}
                          </p>
                        </td>
                      </tr>
                    );
                  })
                )}

              </tbody>
            </table>
          </div>
        </div>
      </div>
      

      {/* Announcement Sidebar */}
      <Announcement
        announcements={announcements}
        isLoading={announcementsLoading}
        isError={announcementsIsError}
      />

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

export default UserDashboard;
