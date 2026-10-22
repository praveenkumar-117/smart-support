import {
  ArrowUpNarrowWide,
  BookOpen,
  ChartColumn,
  ChevronRight,
  DotSquareIcon,
  Settings,
  Ticket,
  UserRoundPlus,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import { statusConfig, priorityConfig } from "../../config/ticketConfig";
import useCategories from "../../hooks/useCategories";
import {
  getCategoryStyle,
  getCategoryStyleByName,
} from "../../config/categoryUtils";
import { useNavigate } from "react-router-dom";
import MessagePopup from "../otherComponents/MessagePopup";
import { useEffect, useState } from "react";



const AdminDashboard = () => {
  const [showMessage, setShowMessage] = useState(null);

  const navigate = useNavigate();

  const {
    categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesFetchError,
  } = useCategories();

  const {
    data,
    isLoading,
    isError,
    error: ticketsError,
  } = useQuery({
    queryKey: ["backendTickets"],
    queryFn: async () => {
      const response = await api.get("/ticket/tickets");
      return response.data;
    },

    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const tickets = data?.tickets || [];
  const latestTickets = tickets.slice(0, 5);

  const TotalIcon = statusConfig.Total.icon;
  const OpenIcon = statusConfig.Open.icon;
  const ProgressIcon = statusConfig["In Progress"].icon;
  const PendingIcon = statusConfig.Pending.icon;
  const ResolvedIcon = statusConfig.Resolved.icon;

  const openTickets = tickets.filter((tickets) => tickets.status === "Open")
  const progressTickets = tickets.filter((tickets) => tickets.status === "In Progress")
  const pendingTickets = tickets.filter((tickets) => tickets.status === "Pending")
  const resolvedTickets = tickets.filter((tickets) => tickets.status === "Resolved")

  const totalTicket = tickets.length;
  const openTicketsCount = openTickets.length;
  const progressTicketsCount = progressTickets.length;
  const pendingTicketsCount = pendingTickets.length;
  const resolvedTicketsCount = resolvedTickets.length;


  const openPer = (openTicketsCount / totalTicket) * 100;
  const progressPer = (progressTicketsCount / totalTicket) * 100;
  const pendingPer = (pendingTicketsCount / totalTicket) * 100;
  const resolvedPer = (resolvedTicketsCount / totalTicket) * 100;
  const getCategoryCount = (categoryName) =>
    tickets.filter(
      (ticket) =>
        ticket.category?.toLowerCase() === categoryName?.toLowerCase()
    ).length;

  useEffect(() => {
    if (!isError) return;

    setShowMessage({
      type: "error",
      title: "Tickets Fetch Failed",
      message:
        ticketsError?.response?.data?.message ||
        ticketsError?.message ||
        "Unable to load tickets. Please try again later.",
    });
  }, [isError, ticketsError]);

  return (
    <div className="w-full min-w-0 p-3 sm:p-4 flex flex-col gap-5 sm:gap-6 bg-gray-200 dark:bg-zinc-950">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-gray-100">
          Administration
        </h1>
        <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
          Welcome back Praveen, here's what's happening with your support system
          today.
        </p>
      </div>



      {isLoading ? (
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {/* Total Tickets Skeleton */}
          <div className="flex w-full min-w-0 basis-full items-center gap-3 rounded-lg border border-violet-200 bg-violet-50 p-4 dark:border-violet-900 dark:bg-zinc-900 sm:basis-[calc(50%-8px)] xl:basis-0 xl:flex-1">
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-violet-200 dark:bg-violet-950" />
            <div className="flex min-w-0 flex-col gap-2">
              <div className="h-4 w-24 animate-pulse rounded bg-violet-300 dark:bg-violet-900" />
              <div className="h-5 w-10 animate-pulse rounded bg-violet-200 dark:bg-violet-950" />
            </div>
          </div>

          {/* Open Tickets Skeleton */}
          <div className="flex w-full min-w-0 basis-full items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-900 dark:bg-zinc-900 sm:basis-[calc(50%-8px)] xl:basis-0 xl:flex-1">
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-orange-200 dark:bg-orange-950" />
            <div className="flex min-w-0 flex-col gap-2">
              <div className="h-4 w-24 animate-pulse rounded bg-orange-300 dark:bg-orange-900" />
              <div className="h-5 w-10 animate-pulse rounded bg-orange-200 dark:bg-orange-950" />
            </div>
          </div>

          {/* In Progress Skeleton */}
          <div className="flex w-full min-w-0 basis-full items-center gap-3 rounded-lg border border-sky-200 bg-sky-50 p-4 dark:border-sky-900 dark:bg-zinc-900 sm:basis-[calc(50%-8px)] xl:basis-0 xl:flex-1">
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-sky-200 dark:bg-sky-950" />
            <div className="flex min-w-0 flex-col gap-2">
              <div className="h-4 w-24 animate-pulse rounded bg-sky-300 dark:bg-sky-900" />
              <div className="h-5 w-10 animate-pulse rounded bg-sky-200 dark:bg-sky-950" />
            </div>
          </div>

          {/* Pending Skeleton */}
          <div className="flex w-full min-w-0 basis-full items-center gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 dark:border-rose-900 dark:bg-zinc-900 sm:basis-[calc(50%-8px)] xl:basis-0 xl:flex-1">
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-rose-200 dark:bg-rose-950" />
            <div className="flex min-w-0 flex-col gap-2">
              <div className="h-4 w-20 animate-pulse rounded bg-rose-300 dark:bg-rose-900" />
              <div className="h-5 w-10 animate-pulse rounded bg-rose-200 dark:bg-rose-950" />
            </div>
          </div>

          {/* Resolved Skeleton */}
          <div className="flex w-full min-w-0 basis-full items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-zinc-900 sm:basis-[calc(50%-8px)] xl:basis-0 xl:flex-1">
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-emerald-200 dark:bg-emerald-950" />
            <div className="flex min-w-0 flex-col gap-2">
              <div className="h-4 w-20 animate-pulse rounded bg-emerald-300 dark:bg-emerald-900" />
              <div className="h-5 w-10 animate-pulse rounded bg-emerald-200 dark:bg-emerald-950" />
            </div>
          </div>
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 text-center dark:border-rose-900 dark:bg-rose-950/20">
          <p className="font-semibold text-rose-700 dark:text-rose-300">
            Ticket statistics unavailable
          </p>
          <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">
            Please try again later.
          </p>
        </div>
      ) : (
        <div className="flex w-full min-w-0 flex-col gap-2 md:flex-row md:flex-nowrap md:gap-2">
          {/* Total Tickets */}
          <div className="flex md:flex-col lg:flex-row  w-full min-w-0 items-center justify-start md:justify-between lg:justify-start gap-4 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:scale-[1.02] hover:border-violet-500 hover:bg-violet-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-700 dark:hover:bg-violet-950/10 sm:p-4 ">
            <TotalIcon
              className={`${statusConfig.Total.color} shrink-0 rounded-full bg-gray-200 p-1.5 dark:bg-zinc-800`}
              size={40}
            />
            <div className="flex flex-col items-center justify-center ">
              <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Total Tickets</h1>
              <h1 className="text-lg font-semibold text-violet-500">{tickets.length}</h1>
            </div>
          </div>

          {/* Open Tickets */}
          <div className="flex md:flex-col lg:flex-row  w-full min-w-0 items-center justify-start md:justify-between lg:justify-start gap-4  rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:scale-[1.02] hover:border-orange-500 hover:bg-orange-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-orange-700 dark:hover:bg-orange-950/10 sm:p-4">
            <OpenIcon
              className={`${statusConfig.Open.color} shrink-0 rounded-full bg-gray-200 p-1.5 dark:bg-zinc-800`}
              size={40}
            />
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Open Tickets</h1>
              <h1 className="text-lg font-semibold text-orange-500">{openTickets.length}</h1>
            </div>
          </div>

          {/* In Progress */}
          <div className="flex md:flex-col lg:flex-row  w-full min-w-0 items-center justify-start md:justify-between lg:justify-start gap-4  rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:scale-[1.02] hover:border-sky-500 hover:bg-sky-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-sky-700 dark:hover:bg-sky-950/10 sm:p-4">
            <ProgressIcon
              className={`${statusConfig["In Progress"].color} shrink-0 rounded-full bg-gray-200 p-1.5 dark:bg-zinc-800`}
              size={40}
            />
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-200">In Progress</h1>
              <h1 className="text-lg font-semibold text-sky-600 dark:text-sky-400">{progressTickets.length}</h1>
            </div>
          </div>

          {/* Pending */}
          <div className="flex md:flex-col lg:flex-row  w-full min-w-0 items-center justify-start md:justify-between lg:justify-start  gap-4   rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:scale-[1.02] hover:border-red-500 hover:bg-red-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-red-700 dark:hover:bg-red-950/10 sm:p-4">
            <PendingIcon
              className={`${statusConfig.Pending.color} shrink-0 rounded-full bg-gray-200 p-1.5 dark:bg-zinc-800`}
              size={40}
            />
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Pending</h1>
              <h1 className="text-lg font-semibold text-red-600 dark:text-red-400">{pendingTickets.length}</h1>
            </div>
          </div>

          {/* Resolved */}
          <div className="flex md:flex-col lg:flex-row  w-full min-w-0 items-center justify-start md:justify-between lg:justify-start  gap-4  rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:scale-[1.02] hover:border-green-500 hover:bg-green-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-green-700 dark:hover:bg-green-950/10 sm:p-4">
            <ResolvedIcon
              className={`${statusConfig.Resolved.color} shrink-0 rounded-full bg-gray-200 p-1.5 dark:bg-zinc-800`}
              size={40}
            />
            <div className="flex flex-col  items-center justify-center text-center">
              <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Resolved</h1>
              <h1 className="text-lg font-semibold text-green-600 dark:text-green-400">{resolvedTickets.length}</h1>
            </div>
          </div>
        </div>
      )}



      <div className="flex flex-wrap gap-4">
        {isLoading ? (
          <div className="flex w-full min-w-0 basis-full flex-col gap-6 rounded-lg border border-violet-200 bg-violet-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 lg:basis-0 lg:flex-1">
            <div className="mb-2 h-6 w-36 animate-pulse rounded bg-violet-200 dark:bg-violet-950" />

            {/* Open Skeleton */}
            <div className="mt-4 flex items-center gap-4">
              <div className="h-4 w-20 shrink-0 animate-pulse rounded bg-orange-200 dark:bg-orange-950" />
              <div className="h-2 min-w-0 flex-1 animate-pulse rounded-full bg-orange-100 dark:bg-zinc-800">
                <div className="h-full w-3/4 rounded-full bg-orange-300 dark:bg-orange-900" />
              </div>
              <div className="h-4 w-24 shrink-0 animate-pulse rounded bg-orange-200 dark:bg-orange-950" />
            </div>

            {/* In Progress Skeleton */}
            <div className="mt-4 flex items-center gap-4">
              <div className="h-4 w-20 shrink-0 animate-pulse rounded bg-sky-200 dark:bg-sky-950" />
              <div className="h-2 min-w-0 flex-1 animate-pulse rounded-full bg-sky-100 dark:bg-zinc-800">
                <div className="h-full w-1/2 rounded-full bg-sky-300 dark:bg-sky-900" />
              </div>
              <div className="h-4 w-24 shrink-0 animate-pulse rounded bg-sky-200 dark:bg-sky-950" />
            </div>

            {/* Pending Skeleton */}
            <div className="mt-4 flex items-center gap-4">
              <div className="h-4 w-20 shrink-0 animate-pulse rounded bg-rose-200 dark:bg-rose-950" />
              <div className="h-2 min-w-0 flex-1 animate-pulse rounded-full bg-rose-100 dark:bg-zinc-800">
                <div className="h-full w-1/4 rounded-full bg-rose-300 dark:bg-rose-900" />
              </div>
              <div className="h-4 w-24 shrink-0 animate-pulse rounded bg-rose-200 dark:bg-rose-950" />
            </div>

            {/* Resolved Skeleton */}
            <div className="mt-4 flex items-center gap-4">
              <div className="h-4 w-20 shrink-0 animate-pulse rounded bg-emerald-200 dark:bg-emerald-950" />
              <div className="h-2 min-w-0 flex-1 animate-pulse rounded-full bg-emerald-100 dark:bg-zinc-800">
                <div className="h-full w-2/3 rounded-full bg-emerald-300 dark:bg-emerald-900" />
              </div>
              <div className="h-4 w-24 shrink-0 animate-pulse rounded bg-emerald-200 dark:bg-emerald-950" />
            </div>

            {/* Total Tickets Skeleton */}
            <div className="mt-8 flex w-full items-center justify-between border-t border-violet-200 pt-4 dark:border-zinc-700">
              <div className="h-4 w-24 animate-pulse rounded bg-violet-200 dark:bg-violet-950" />
              <div className="h-4 w-12 animate-pulse rounded bg-violet-300 dark:bg-violet-900" />
            </div>
          </div>
        ) : isError ? (
          <div className="flex w-full flex-col items-center justify-center rounded-lg border border-rose-200 bg-rose-50 p-6 text-center dark:border-rose-900 dark:bg-zinc-900 md:w-1/2">
            <p className="font-semibold text-rose-700 dark:text-rose-300">
              Ticket statistics unavailable
            </p>
            <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">
              Unable to load ticket statistics. Please try again later.
            </p>
          </div>
        ) : (
          <div className="flex w-full min-w-0 basis-full flex-col gap-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 lg:basis-0 lg:flex-1">
            <h1 className="text-lg font-semibold text-black dark:text-gray-100">
              Tickets by Status
            </h1>

            {/* Open */}
            <div className="mt-4 flex w-full min-w-0 items-center gap-3 sm:gap-4">
              <h1 className="w-20 shrink-0 text-sm font-semibold text-gray-800 dark:text-gray-200">
                Open
              </h1>

              <div className="h-2 min-w-0 flex-1 rounded-full bg-gray-300 dark:bg-zinc-700">
                <div
                  className="h-full rounded-full bg-orange-500"
                  style={{ width: `${openPer}%` }}
                />
              </div>

              <h1 className="w-24 shrink-0 text-right text-sm font-semibold text-gray-800 dark:text-gray-200">
                {openTicketsCount}{" "}
                <span className="text-gray-600 dark:text-zinc-400">
                  ({openPer.toFixed(2)}%)
                </span>
              </h1>
            </div>

            {/* In Progress */}
            <div className="mt-4 flex min-w-0 items-center gap-3 sm:gap-4">
              <h1 className="w-20 shrink-0 text-sm font-semibold text-gray-800 dark:text-gray-200">
                In Progress
              </h1>

              <div className="h-2 min-w-0 flex-1 rounded-full bg-gray-300 dark:bg-zinc-700">
                <div
                  className="h-full rounded-full bg-sky-600"
                  style={{ width: `${progressPer}%` }}
                />
              </div>

              <h1 className="w-24 shrink-0 text-right text-sm font-semibold text-gray-800 dark:text-gray-200">
                {progressTicketsCount}{" "}
                <span className="text-gray-600 dark:text-zinc-400">
                  ({progressPer.toFixed(2)}%)
                </span>
              </h1>
            </div>

            {/* Pending */}
            <div className="mt-4 flex min-w-0 items-center gap-3 sm:gap-4">
              <h1 className="w-20 shrink-0 text-sm font-semibold text-gray-800 dark:text-gray-200">
                Pending
              </h1>

              <div className="h-2 min-w-0 flex-1 rounded-full bg-gray-300 dark:bg-zinc-700">
                <div
                  className="h-full rounded-full bg-rose-500"
                  style={{ width: `${pendingPer}%` }}
                />
              </div>

              <h1 className="w-24 shrink-0 text-right text-sm font-semibold text-gray-800 dark:text-gray-200">
                {pendingTicketsCount}{" "}
                <span className="text-gray-600 dark:text-zinc-400">
                  ({pendingPer.toFixed(2)}%)
                </span>
              </h1>
            </div>

            {/* Resolved */}
            <div className="mt-4 flex min-w-0 items-center gap-3 sm:gap-4">
              <h1 className="w-20 shrink-0 text-sm font-semibold text-gray-800 dark:text-gray-200">
                Resolved
              </h1>

              <div className="h-2 min-w-0 flex-1 rounded-full bg-gray-300 dark:bg-zinc-700">
                <div
                  className="h-full rounded-full bg-emerald-600"
                  style={{ width: `${resolvedPer}%` }}
                />
              </div>

              <h1 className="w-24 shrink-0 text-right text-sm font-semibold text-gray-800 dark:text-gray-200">
                {resolvedTicketsCount}{" "}
                <span className="text-gray-600 dark:text-zinc-400">
                  ({resolvedPer.toFixed(2)}%)
                </span>
              </h1>
            </div>

            {/* Total Tickets */}
            <div className="mt-8 flex w-full items-center justify-between gap-3 border-t border-gray-200 pt-4 dark:border-zinc-700">
              <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Total Tickets
              </h1>

              <h1 className="shrink-0 text-sm font-semibold text-gray-800 dark:text-gray-200">
                {totalTicket}
              </h1>
            </div>
          </div>
        )}

        {isLoading || categoriesLoading ? (
          <div className="flex w-full flex-col gap-2 rounded-lg border border-violet-200 bg-violet-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 md:w-1/2">
            <div className="mb-2 h-6 w-40 animate-pulse rounded bg-violet-200 dark:bg-violet-950" />

            {/* Internet Skeleton */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex w-24 shrink-0 items-center gap-2">
                <div className="h-7.5 w-7.5 animate-pulse rounded-full bg-sky-200 dark:bg-sky-950" />
                <div className="h-4 w-12 animate-pulse rounded bg-sky-200 dark:bg-sky-950" />
              </div>
              <div className="h-2 flex-1 animate-pulse rounded-full bg-sky-100 dark:bg-zinc-800">
                <div className="h-full w-3/4 rounded-full bg-sky-300 dark:bg-sky-900" />
              </div>
              <div className="h-4 w-24 shrink-0 animate-pulse rounded bg-sky-200 dark:bg-sky-950" />
            </div>

            {/* Email Skeleton */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex w-24 shrink-0 items-center gap-2">
                <div className="h-7.5 w-7.5 animate-pulse rounded-full bg-amber-200 dark:bg-amber-950" />
                <div className="h-4 w-10 animate-pulse rounded bg-amber-200 dark:bg-amber-950" />
              </div>
              <div className="h-2 flex-1 animate-pulse rounded-full bg-amber-100 dark:bg-zinc-800">
                <div className="h-full w-1/2 rounded-full bg-amber-300 dark:bg-amber-900" />
              </div>
              <div className="h-4 w-24 shrink-0 animate-pulse rounded bg-amber-200 dark:bg-amber-950" />
            </div>

            {/* Software Skeleton */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex w-24 shrink-0 items-center gap-2">
                <div className="h-7.5 w-7.5 animate-pulse rounded-full bg-pink-200 dark:bg-pink-950" />
                <div className="h-4 w-14 animate-pulse rounded bg-pink-200 dark:bg-pink-950" />
              </div>
              <div className="h-2 flex-1 animate-pulse rounded-full bg-violet-100 dark:bg-zinc-800">
                <div className="h-full w-2/3 rounded-full bg-violet-300 dark:bg-violet-900" />
              </div>
              <div className="h-4 w-24 shrink-0 animate-pulse rounded bg-violet-200 dark:bg-violet-950" />
            </div>

            {/* Hardware Skeleton */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex w-24 shrink-0 items-center gap-2">
                <div className="h-7.5 w-7.5 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-14 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-2 flex-1 animate-pulse rounded-full bg-slate-100 dark:bg-zinc-800">
                <div className="h-full w-1/3 rounded-full bg-slate-300 dark:bg-slate-700" />
              </div>
              <div className="h-4 w-24 shrink-0 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Security Skeleton */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex w-24 shrink-0 items-center gap-2">
                <div className="h-7.5 w-7.5 animate-pulse rounded-full bg-emerald-200 dark:bg-emerald-950" />
                <div className="h-4 w-14 animate-pulse rounded bg-emerald-200 dark:bg-emerald-950" />
              </div>
              <div className="h-2 flex-1 animate-pulse rounded-full bg-emerald-100 dark:bg-zinc-800">
                <div className="h-full w-1/2 rounded-full bg-emerald-300 dark:bg-emerald-900" />
              </div>
              <div className="h-4 w-24 shrink-0 animate-pulse rounded bg-emerald-200 dark:bg-emerald-950" />
            </div>

            {/* Other Skeleton */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex w-24 shrink-0 items-center gap-2">
                <div className="h-7.5 w-7.5 animate-pulse rounded-full bg-orange-200 dark:bg-orange-950" />
                <div className="h-4 w-10 animate-pulse rounded bg-orange-200 dark:bg-orange-950" />
              </div>
              <div className="h-2 flex-1 animate-pulse rounded-full bg-orange-100 dark:bg-zinc-800">
                <div className="h-full w-1/4 rounded-full bg-orange-300 dark:bg-orange-900" />
              </div>
              <div className="h-4 w-24 shrink-0 animate-pulse rounded bg-orange-200 dark:bg-orange-950" />
            </div>
          </div>
        ) : isError || categoriesError ? (
          <div className="flex w-full flex-col items-center justify-center rounded-lg border border-rose-200 bg-rose-50 p-6 text-center dark:border-rose-900 dark:bg-zinc-900 md:w-1/2">
            <p className="font-semibold text-rose-700 dark:text-rose-300">
              Category statistics unavailable
            </p>
            <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">
              Unable to load category statistics. Please try again later.
            </p>
          </div>
        ) : (
          <div className="flex w-full min-w-0 basis-full flex-col gap-2 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 lg:basis-0 lg:flex-1">
            <h1 className="text-lg font-semibold text-black dark:text-gray-100">
              Tickets by Category
            </h1>

            {categories.map((category) => {
              const { icon: Icon, badge, bar } = getCategoryStyle(category.icon);

              const count = getCategoryCount(category.name);
              const percent = totalTicket ? (count / totalTicket) * 100 : 0;

              return (
                <div
                  key={category._id}
                  className="mt-4 flex w-full min-w-0 items-center gap-3 sm:gap-4"
                >
                  <h1 className="flex w-24 shrink-0 items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                    <Icon
                      size={30}
                      className={`shrink-0 rounded-full p-1 ${badge}`}
                    />
                    <span className="truncate">{category.name}</span>
                  </h1>

                  <div className="h-2 min-w-0 flex-1 rounded-full bg-gray-300 dark:bg-zinc-700">
                    <div
                      className={`h-full rounded-full ${bar}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <h1 className="w-24 shrink-0 text-right text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {count}{" "}
                    <span className="text-gray-600 dark:text-zinc-400">
                      ({percent.toFixed(2)}%)
                    </span>
                  </h1>
                </div>
              );
            })}


          </div>

        )}
      </div>


      <div className="flex w-full min-w-0 flex-col gap-2  lg:flex-row">
        <div className="w-full min-w-0 rounded-lg border border-gray-300 bg-gray-50 p-2 dark:border-zinc-700 dark:bg-zinc-900 lg:w-2/3">
          <h1 className="mb-2 text-center text-lg font-bold text-gray-900 underline dark:text-gray-100">
            Recent Tickets
          </h1>

          <div className="w-full min-w-0 overflow-x-auto">
            <table className="w-full min-w-170 table-auto">
              <thead>
                <tr className="rounded-md bg-gray-300 text-left text-sm text-gray-900 dark:bg-zinc-800 dark:text-gray-200">
                  <th className="w-[10%] px-2.5 py-3">Ticket ID</th>
                  <th className="w-[23%] px-2.5 py-3">Subject</th>
                  <th className="w-[12%] px-2.5 py-3">User</th>
                  <th className="w-[13%] px-2.5 py-3">Category</th>
                  <th className="w-[13%] px-2.5 py-3">Status</th>
                  <th className="w-[12%] px-2.5 py-3">Priority</th>
                  <th className="w-[17%] px-2.5 py-3">Created On</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <>
                    <tr className="border-b border-gray-200 dark:border-zinc-800">
                      <td className="p-3"><div className="h-4 w-14 animate-pulse rounded bg-violet-200 dark:bg-violet-950" /></td>
                      <td className="p-3"><div className="h-4 w-32 animate-pulse rounded bg-sky-200 dark:bg-sky-950" /></td>
                      <td className="p-3"><div className="h-4 w-24 animate-pulse rounded bg-teal-200 dark:bg-teal-950" /></td>
                      <td className="p-3"><div className="h-5 w-20 animate-pulse rounded bg-sky-100 dark:bg-sky-950" /></td>
                      <td className="p-3"><div className="h-5 w-20 animate-pulse rounded bg-orange-100 dark:bg-orange-950" /></td>
                      <td className="p-3"><div className="h-5 w-16 animate-pulse rounded bg-rose-100 dark:bg-rose-950" /></td>
                      <td className="p-3"><div className="h-4 w-28 animate-pulse rounded bg-stone-200 dark:bg-stone-800" /></td>
                    </tr>

                    <tr className="border-b border-gray-200 dark:border-zinc-800">
                      <td className="p-3"><div className="h-4 w-14 animate-pulse rounded bg-violet-200 dark:bg-violet-950" /></td>
                      <td className="p-3"><div className="h-4 w-40 animate-pulse rounded bg-sky-200 dark:bg-sky-950" /></td>
                      <td className="p-3"><div className="h-4 w-20 animate-pulse rounded bg-teal-200 dark:bg-teal-950" /></td>
                      <td className="p-3"><div className="h-5 w-24 animate-pulse rounded bg-amber-100 dark:bg-amber-950" /></td>
                      <td className="p-3"><div className="h-5 w-24 animate-pulse rounded bg-sky-100 dark:bg-sky-950" /></td>
                      <td className="p-3"><div className="h-5 w-20 animate-pulse rounded bg-rose-100 dark:bg-rose-950" /></td>
                      <td className="p-3"><div className="h-4 w-28 animate-pulse rounded bg-stone-200 dark:bg-stone-800" /></td>
                    </tr>

                    <tr className="border-b border-gray-200 dark:border-zinc-800">
                      <td className="p-3"><div className="h-4 w-14 animate-pulse rounded bg-violet-200 dark:bg-violet-950" /></td>
                      <td className="p-3"><div className="h-4 w-28 animate-pulse rounded bg-sky-200 dark:bg-sky-950" /></td>
                      <td className="p-3"><div className="h-4 w-24 animate-pulse rounded bg-teal-200 dark:bg-teal-950" /></td>
                      <td className="p-3"><div className="h-5 w-20 animate-pulse rounded bg-pink-100 dark:bg-pink-950" /></td>
                      <td className="p-3"><div className="h-5 w-20 animate-pulse rounded bg-emerald-100 dark:bg-emerald-950" /></td>
                      <td className="p-3"><div className="h-5 w-16 animate-pulse rounded bg-amber-100 dark:bg-amber-950" /></td>
                      <td className="p-3"><div className="h-4 w-28 animate-pulse rounded bg-stone-200 dark:bg-stone-800" /></td>
                    </tr>
                  </>
                ) : isError ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center">
                      <p className="font-semibold text-rose-600 dark:text-rose-400">
                        Unable to load recent tickets
                      </p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Please try again later.
                      </p>
                    </td>
                  </tr>
                ) : latestTickets?.length > 0 ? (
                  latestTickets.map((latestTicket) => {
                    const category = getCategoryStyleByName(
                      categories,
                      latestTicket.category
                    );

                    const status = statusConfig[latestTicket.status];
                    const priority = priorityConfig[latestTicket.priority];

                    const CategoryIcon = category.icon;
                    const StatusIcon = status?.icon || DotSquareIcon;
                    const PriorityIcon = priority?.icon || ArrowUpNarrowWide;
                    return (
                      <tr
                        key={latestTicket._id}
                        className="border-b border-gray-200 text-xs font-semibold text-gray-800 hover:bg-gray-200 dark:border-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-800/50"
                      >
                        <td className="wrap-break-words p-2 text-violet-700 dark:text-violet-400">
                          {latestTicket.ticketId}
                        </td>

                        <td className="wrap-break-words p-2">
                          {latestTicket.subject}
                        </td>

                        <td className="wrap-break-words p-2 text-teal-800 dark:text-teal-400">
                          {latestTicket.createdBy?.name}
                        </td>

                        <td className="p-2 text-sky-700 dark:text-sky-400">
                          <span
                            className={`flex items-center gap-2 ${category.text}`}
                          >
                            <CategoryIcon size={20} className="shrink-0 lg:hidden" />
                            <span className="hidden md:inline lg:hidden">
                              {latestTicket.category}
                            </span>
                            <span className="hidden lg:inline">
                              <CategoryIcon size={20} className="mr-2 inline shrink-0" />
                              {latestTicket.category}
                            </span>
                          </span>
                        </td>

                        <td className="p-2.5 text-orange-600 dark:text-orange-400">
                          <span
                            className={`flex items-center gap-2 ${status?.color || "text-gray-500 dark:text-gray-400"}`}
                          >
                            <StatusIcon size={20} className="shrink-0 lg:hidden" />
                            <span className="hidden md:inline lg:hidden">
                              {latestTicket.status}
                            </span>
                            <span className="hidden lg:inline">
                              <StatusIcon size={20} className="mr-2 inline shrink-0" />
                              {latestTicket.status}
                            </span>
                          </span>
                        </td>

                        <td className="p-2.5 text-red-600 dark:text-red-400">
                          <span
                            className={`flex items-center gap-2 ${priority?.color || "text-gray-500 dark:text-gray-400"}`}
                          >
                            <PriorityIcon size={20} className="shrink-0 lg:hidden" />
                            <span className="hidden md:inline lg:hidden">
                              {latestTicket.priority}
                            </span>
                            <span className="hidden lg:inline">
                              <PriorityIcon size={20} className="mr-2 inline shrink-0" />
                              {latestTicket.priority}
                            </span>
                          </span>
                        </td>

                        <td className="wrap-break-words p-2.5 text-stone-700 dark:text-stone-300">
                          {new Date(latestTicket.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center">
                      <p className="font-semibold text-sky-700 dark:text-sky-300">
                        No recent tickets found
                      </p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Tickets will appear here when available.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

        <div className="flex w-full min-w-0 flex-col gap-2 rounded-lg border border-gray-300 bg-gray-50 p-2 dark:border-zinc-700 dark:bg-zinc-900 lg:w-1/3">
          <h1 className="text-center text-lg font-bold text-gray-900 underline dark:text-gray-100">
            Quick Actions
          </h1>
          <div
            onClick={() => navigate("/admin/tickets/create")}
            className="flex min-w-0 cursor-pointer items-center justify-between gap-2 rounded-lg border border-gray-300 p-2 transition-colors duration-200 hover:bg-gray-200 dark:border-zinc-700 dark:hover:bg-indigo-950/10"
          >
            <div className="flex min-w-0 items-center gap-2">
              <Ticket
                className="shrink-0 rounded-xl bg-indigo-100 p-1.5 text-indigo-500 dark:bg-indigo-950/50"
                size={40}
              />

              <div className="min-w-0">
                <h1 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  View All Tickets
                </h1>
                <p className="text-xs font-semibold text-gray-600 dark:text-zinc-400">
                  View all raise tickets.
                </p>
              </div>
            </div>

            <ChevronRight
              className="shrink-0 rounded-full text-indigo-500"
              size={20}
            />
          </div>

          <div
            onClick={() => navigate("/admin/users")}
            className="flex min-w-0 cursor-pointer items-center justify-between gap-2 rounded-lg border border-gray-300 p-2 transition-colors duration-200 hover:bg-gray-200 dark:border-zinc-700 dark:hover:bg-orange-950/10"
          >
            <div className="flex min-w-0 items-center gap-2">
              <UserRoundPlus
                className="shrink-0 rounded-xl bg-orange-100 p-1.5 text-orange-500 dark:bg-orange-950/50"
                size={40}
              />

              <div className="min-w-0">
                <h1 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Add User
                </h1>
                <p className="text-xs font-semibold text-gray-600 dark:text-zinc-400">
                  Add a new user to system.
                </p>
              </div>
            </div>

            <ChevronRight
              className="shrink-0 rounded-full text-orange-500"
              size={20}
            />
          </div>

          <div
            onClick={() => navigate("/admin/kbase")}
            className="flex min-w-0 cursor-pointer items-center justify-between gap-2 rounded-lg border border-gray-300 p-2 transition-colors duration-200 hover:bg-gray-200 dark:border-zinc-700 dark:hover:bg-sky-950/10"
          >
            <div className="flex min-w-0 items-center gap-2">
              <BookOpen
                className="shrink-0 rounded-xl bg-sky-100 p-1.5 text-sky-500 dark:bg-sky-950/50"
                size={40}
              />

              <div className="min-w-0">
                <h1 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Add Article
                </h1>
                <p className="text-xs font-semibold text-gray-600 dark:text-zinc-400">
                  Create new knowledge base.
                </p>
              </div>
            </div>

            <ChevronRight
              className="shrink-0 rounded-full text-sky-500"
              size={20}
            />
          </div>

          <div
            onClick={() => navigate("/admin/reports")}
            className="flex min-w-0 cursor-pointer items-center justify-between gap-2 rounded-lg border border-gray-300 p-2 transition-colors duration-200 hover:bg-gray-200 dark:border-zinc-700 dark:hover:bg-green-950/10"
          >
            <div className="flex min-w-0 items-center gap-2">
              <ChartColumn
                className="shrink-0 rounded-xl bg-green-100 p-1.5 text-green-500 dark:bg-green-950/50"
                size={40}
              />

              <div className="min-w-0">
                <h1 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  View Reports
                </h1>
                <p className="text-xs font-semibold text-gray-600 dark:text-zinc-400">
                  Create a detailed report and analytics.
                </p>
              </div>
            </div>

            <ChevronRight
              className="shrink-0 rounded-full text-green-500"
              size={20}
            />
          </div>

          <div
            onClick={() => navigate("/admin/asettings")}
            className="flex min-w-0 cursor-pointer items-center justify-between gap-2 rounded-lg border border-gray-300 p-2 transition-colors duration-200 hover:bg-gray-200 dark:border-zinc-700 dark:hover:bg-red-950/10"
          >
            <div className="flex min-w-0 items-center gap-2">
              <Settings
                className="shrink-0 rounded-xl bg-red-100 p-1.5 text-red-500 dark:bg-red-950/50"
                size={40}
              />

              <div className="min-w-0">
                <h1 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Settings
                </h1>
                <p className="text-xs font-semibold text-gray-600 dark:text-zinc-400">
                  Check all settings options.
                </p>
              </div>
            </div>

            <ChevronRight
              className="shrink-0 rounded-full text-red-500"
              size={20}
            />
          </div>
        </div>

      </div>

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

export default AdminDashboard;
