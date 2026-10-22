import {

  AlertCircle,
  CheckCircle,
  Clock,
  Ellipsis,
  Star,
  Ticket,
  Tickets,
  TrendingUp

} from "lucide-react";
import {
  PieChart, Pie, Tooltip, Legend, ResponsiveContainer, BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Rectangle
} from "recharts";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import MessagePopup from "../otherComponents/MessagePopup";

const AdminReports = () => {
  const navigate = useNavigate();

  const {
    data: ticketResponse,
    isLoading: ticketsLoading,
    isError: ticketsError,
  } = useQuery({
    queryKey: ["backendTickets"],
    queryFn: async () => {
      const response = await api.get("/ticket/tickets");
      return response.data;
    },
  });
  const tickets = ticketResponse?.tickets || [];
  const latestTickets = tickets.slice(0, 5);
  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  );

  const ticketCategory = [
    ...new Set(tickets.map((tickets) => tickets.category)),
  ];

  const ticketData = [
    {
      name: "Open",
      value: tickets.filter((ticket) => ticket.status === "Open").length,
      fill: "#f97316",
    },
    {
      name: "In Progress",
      value: tickets.filter((ticket) => ticket.status === "In Progress").length,
      fill: "#0284c7",
    },
    {
      name: "Pending",
      value: tickets.filter((ticket) => ticket.status === "Pending").length,
      fill: "#dc2626",
    },
    {
      name: "Resolved",
      value: tickets.filter((ticket) => ticket.status === "Resolved").length,
      fill: "#22c55e",
    },
  ];

  const priorityData = [
    {
      name: "Low",
      tickets: tickets.filter((ticket) => ticket.priority === "Low").length,
    },
    {
      name: "Medium",
      tickets: tickets.filter((ticket) => ticket.priority === "Medium").length,
    },
    {
      name: "High",
      tickets: tickets.filter((ticket) => ticket.priority === "High").length,
    },
  ];

  const categoryData = [
    ...new Set(tickets.map((ticket) => ticket.category)),
  ].map((category) => ({
    name: category,
    tickets: tickets.filter((ticket) => ticket.category === category).length,
  }));


  const [showMessage, setShowMessage] = useState(null);

  useEffect(() => {
    if (ticketsError) {
      setShowMessage({
        type: "error",
        title: "Failed to Load Reports",
        message: "Unable to fetch ticket reports. Please try again.",
      });
    }
  }, [ticketsError]);

  return (

    <div className="flex flex-col gap-6 p-2 bg-gray-200 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100">

      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-bold text-xl md:text-2xl">Reports & Analytics</h1>
          <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
            Analyze support activity, ticket trends, and performance to improve helpdesk operations.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {ticketsLoading ? (
          <>
            {/* Total Tickets Skeleton */}
            <div className="flex w-full animate-pulse items-center gap-4 rounded-lg border border-violet-200 bg-violet-50 p-4 dark:border-violet-900 dark:bg-violet-950 sm:w-[calc(50%-6px)] xl:w-[calc(20%-10px)]">
              <div className="h-10 w-10 shrink-0 rounded-full bg-violet-200 dark:bg-violet-800" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 rounded bg-violet-200 dark:bg-violet-800" />
                <div className="h-6 w-12 rounded bg-violet-300 dark:bg-violet-700" />
              </div>
            </div>

            {/* Resolved Tickets Skeleton */}
            <div className="flex w-full animate-pulse items-center gap-4 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950 sm:w-[calc(50%-6px)] xl:w-[calc(20%-10px)]">
              <div className="h-10 w-10 shrink-0 rounded-full bg-green-200 dark:bg-green-800" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-28 rounded bg-green-200 dark:bg-green-800" />
                <div className="h-6 w-12 rounded bg-green-300 dark:bg-green-700" />
              </div>
            </div>

            {/* Average Resolution Skeleton */}
            <div className="flex w-full animate-pulse items-center gap-4 rounded-lg border border-sky-200 bg-sky-50 p-4 dark:border-sky-900 dark:bg-sky-950 sm:w-[calc(50%-6px)] xl:w-[calc(20%-10px)]">
              <div className="h-10 w-10 shrink-0 rounded-full bg-sky-200 dark:bg-sky-800" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-28 rounded bg-sky-200 dark:bg-sky-800" />
                <div className="h-6 w-12 rounded bg-sky-300 dark:bg-sky-700" />
              </div>
            </div>

            {/* SLA Compliance Skeleton */}
            <div className="flex w-full animate-pulse items-center gap-4 rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-900 dark:bg-orange-950 sm:w-[calc(50%-6px)] xl:w-[calc(20%-10px)]">
              <div className="h-10 w-10 shrink-0 rounded-full bg-orange-200 dark:bg-orange-800" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-28 rounded bg-orange-200 dark:bg-orange-800" />
                <div className="h-6 w-12 rounded bg-orange-300 dark:bg-orange-700" />
              </div>
            </div>

            {/* Customer Satisfaction Skeleton */}
            <div className="flex w-full animate-pulse items-center gap-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950 sm:w-[calc(50%-6px)] xl:w-[calc(20%-10px)]">
              <div className="h-10 w-10 shrink-0 rounded-full bg-yellow-200 dark:bg-yellow-800" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 rounded bg-yellow-200 dark:bg-yellow-800" />
                <div className="h-6 w-12 rounded bg-yellow-300 dark:bg-yellow-700" />
              </div>
            </div>
          </>
        ) : ticketsError ? (
          /* Error State */
          <div className="flex min-h-32 w-full flex-col items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950">
            <span className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900 dark:text-red-300">
              <AlertCircle size={24} />
            </span>
            <h3 className="font-semibold text-red-700 dark:text-red-300">
              Failed to load reports
            </h3>
            <p className="text-sm text-red-600 dark:text-red-400">
              Unable to fetch ticket data. Please try again.
            </p>
          </div>
        ) : (
          <>
            {/* Total Tickets */}
            <div className="flex w-full items-center justify-between gap-2 rounded-lg border border-violet-200 bg-violet-50 p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:border-violet-500 hover:bg-violet-500/10 dark:border-violet-900 dark:bg-violet-950/10 dark:hover:bg-violet-400/10 sm:w-[calc(50%-6px)] xl:w-[calc(20%-10px)]">
              <div className="flex items-center gap-4">
                <span>
                  <Tickets
                    className="rounded-full bg-violet-200 p-1.5 text-violet-600 dark:bg-violet-900 dark:text-violet-400"
                    size={40}
                  />
                </span>
                <div>
                  <h1 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    Total Tickets
                  </h1>
                  <h1 className="text-lg font-semibold text-violet-600 dark:text-violet-400">
                    {tickets.length}
                  </h1>
                </div>
              </div>
            </div>

            {/* Resolved Tickets */}
            <div className="flex w-full items-center justify-between gap-2 rounded-lg border border-green-200 bg-green-50 p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:border-green-500 hover:bg-green-500/10 dark:border-green-900 dark:bg-green-950/10 dark:hover:bg-green-400/10 sm:w-[calc(50%-6px)] xl:w-[calc(20%-10px)]">
              <div className="flex items-center gap-4">
                <span>
                  <CheckCircle
                    className="rounded-full bg-green-200 p-1.5 text-green-600 dark:bg-green-900 dark:text-green-400"
                    size={40}
                  />
                </span>
                <div>
                  <h1 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    Resolved Tickets
                  </h1>
                  <h1 className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {resolvedTickets.length}
                  </h1>
                </div>
              </div>
            </div>

            {/* Average Resolution */}
            <div className="flex w-full items-center justify-between gap-2 rounded-lg border border-sky-200 bg-sky-50 p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:border-sky-500 hover:bg-sky-500/10 dark:border-sky-900 dark:bg-sky-950/10 dark:hover:bg-sky-400/10 sm:w-[calc(50%-6px)] xl:w-[calc(20%-10px)]">
              <div className="flex items-center gap-4">
                <span>
                  <Clock
                    className="rounded-full bg-sky-200 p-1.5 text-sky-600 dark:bg-sky-900 dark:text-sky-400"
                    size={40}
                  />
                </span>
                <div>
                  <h1 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    Avg. Resolution
                  </h1>
                  <h1 className="text-lg font-semibold text-sky-600 dark:text-sky-400">
                    4.2h
                  </h1>
                </div>
              </div>
            </div>

            {/* SLA Compliance */}
            <div className="flex w-full items-center justify-between gap-2 rounded-lg border border-orange-200 bg-orange-50 p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:border-orange-500 hover:bg-orange-500/10 dark:border-orange-900 dark:bg-orange-950/10 dark:hover:bg-orange-400/10 sm:w-[calc(50%-6px)] xl:w-[calc(20%-10px)]">
              <div className="flex items-center gap-4">
                <span>
                  <TrendingUp
                    className="rounded-full bg-orange-200 p-1.5 text-orange-600 dark:bg-orange-900 dark:text-orange-400"
                    size={40}
                  />
                </span>
                <div>
                  <h1 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    SLA Compliance
                  </h1>
                  <h1 className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                    92%
                  </h1>
                </div>
              </div>
            </div>

            {/* Customer Satisfaction */}
            <div className="flex w-full items-center justify-between gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:border-yellow-500 hover:bg-yellow-500/10 dark:border-yellow-900 dark:bg-yellow-950/10 dark:hover:bg-yellow-400/10 sm:w-[calc(50%-6px)] xl:w-[calc(20%-10px)]">
              <div className="flex items-center gap-4">
                <span>
                  <Star
                    className="rounded-full bg-yellow-200 p-1.5 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400"
                    size={40}
                  />
                </span>
                <div>
                  <h1 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    Customer Satisfaction
                  </h1>
                  <h1 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                    4.6/5
                  </h1>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {ticketsLoading ? (
          <>
            {/* Ticket By Status Skeleton */}
            <div className="min-w-0 p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900 animate-pulse">
              <div className="flex justify-between items-center mb-4">
                <div className="h-5 w-36 rounded bg-violet-200 dark:bg-violet-900" />
                <div className="h-5 w-5 rounded bg-zinc-300 dark:bg-zinc-700" />
              </div>

              <div className="h-75 flex flex-col items-center justify-center gap-5">
                <div className="w-40 h-40 rounded-full border-24 border-violet-200 dark:border-violet-900 relative">
                  <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                </div>
                <div className="flex justify-center gap-3">
                  <div className="h-3 w-12 rounded bg-orange-200 dark:bg-orange-900" />
                  <div className="h-3 w-16 rounded bg-sky-200 dark:bg-sky-900" />
                  <div className="h-3 w-14 rounded bg-green-200 dark:bg-green-900" />
                </div>
              </div>
            </div>

            {/* Ticket By Priority Skeleton */}
            <div className="min-w-0 p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900 animate-pulse">
              <div className="flex justify-between items-center mb-4">
                <div className="h-5 w-36 rounded bg-orange-200 dark:bg-orange-900" />
                <div className="h-5 w-5 rounded bg-zinc-300 dark:bg-zinc-700" />
              </div>

              <div className="h-75 flex items-end justify-center gap-8 px-6 pb-10">
                <div className="w-10 h-24 rounded-t-md bg-green-200 dark:bg-green-900" />
                <div className="w-10 h-36 rounded-t-md bg-orange-200 dark:bg-orange-900" />
                <div className="w-10 h-48 rounded-t-md bg-red-200 dark:bg-red-900" />
              </div>
            </div>

            {/* Ticket By Category Skeleton */}
            <div className="min-w-0 p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900 animate-pulse md:col-span-2 xl:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <div className="h-5 w-36 rounded bg-sky-200 dark:bg-sky-900" />
                <div className="h-5 w-5 rounded bg-zinc-300 dark:bg-zinc-700" />
              </div>

              <div className="h-75 flex flex-col justify-center gap-5 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-16 rounded bg-zinc-300 dark:bg-zinc-700" />
                  <div className="h-5 w-3/4 rounded bg-blue-200 dark:bg-blue-900" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-16 rounded bg-zinc-300 dark:bg-zinc-700" />
                  <div className="h-5 w-1/2 rounded bg-violet-200 dark:bg-violet-900" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-16 rounded bg-zinc-300 dark:bg-zinc-700" />
                  <div className="h-5 w-2/3 rounded bg-green-200 dark:bg-green-900" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-16 rounded bg-zinc-300 dark:bg-zinc-700" />
                  <div className="h-5 w-2/5 rounded bg-orange-200 dark:bg-orange-900" />
                </div>
              </div>
            </div>
          </>
        ) : ticketsError ? (
          /* Error State */
          <div className="md:col-span-2 xl:col-span-3 min-w-0 p-6 border border-red-300 dark:border-red-900 rounded-lg bg-red-50 dark:bg-red-950/30">
            <div className="min-h-55 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-900/50">
                <AlertCircle className="text-red-600 dark:text-red-400" size={26} />
              </div>

              <h2 className="font-semibold text-red-700 dark:text-red-400">
                Failed to Load Ticket Charts
              </h2>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
                Unable to fetch ticket data. Please check your connection and try again.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Ticket By Status */}
            <div className="min-w-0 p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900">
              <span className="flex justify-between items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
                <h2 className="truncate">Ticket By Status</h2>
                <Ellipsis className="shrink-0" />
              </span>

              <div className="w-full h-75 min-w-0 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ticketData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="45%"
                      outerRadius="65%"
                      label
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        border: "1px solid #3f3f46",
                        borderRadius: "8px",
                        color: "#f4f4f5",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "12px" }}
                      formatter={(value) => (
                        <span className="text-zinc-700 dark:text-zinc-300">
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Ticket By Priority */}
            <div className="min-w-0 p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900">
              <span className="flex justify-between items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
                <h2 className="truncate">Ticket By Priority</h2>
                <Ellipsis className="shrink-0" />
              </span>

              <div className="w-full h-75 min-w-0 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={priorityData}
                    margin={{ top: 15, right: 10, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#52525b" />
                    <XAxis dataKey="name" stroke="#a1a1aa" />
                    <YAxis stroke="#a1a1aa" allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        border: "1px solid #3f3f46",
                        borderRadius: "8px",
                        color: "#f4f4f5",
                      }}
                    />

                    <Bar
                      dataKey="tickets"
                      radius={[5, 5, 0, 0]}
                      maxBarSize={48}
                      shape={(props) => {
                        const colors = ["#22c55e", "#f97316", "#ef4444"];

                        return (
                          <Rectangle
                            {...props}
                            fill={colors[props.index % colors.length]}
                          />
                        );
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Ticket By Category */}
            <div className="min-w-0 p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900 md:col-span-2 xl:col-span-1">
              <span className="flex justify-between items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
                <h2 className="truncate">Ticket By Category</h2>
                <Ellipsis className="shrink-0" />
              </span>

              <div className="w-full h-75 min-w-0 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
                  >
                    <XAxis type="number" hide allowDecimals={false} />

                    <YAxis
                      type="category"
                      dataKey="name"
                      width={90}
                      tick={{ fontSize: 12, fill: "#a1a1aa" }}
                      stroke="#a1a1aa"
                      tickFormatter={(value) =>
                        value.length > 12 ? `${value.slice(0, 12)}…` : value
                      }
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        border: "1px solid #3f3f46",
                        borderRadius: "8px",
                        color: "#f4f4f5",
                      }}
                    />

                    <Bar
                      dataKey="tickets"
                      radius={[0, 5, 5, 0]}
                      label={{
                        position: "right",
                        fontSize: 12,
                        fill: "#a1a1aa",
                      }}
                      barSize={22}
                      maxBarSize={30}
                      shape={(props) => {
                        const colors = [
                          "#3b82f6",
                          "#8b5cf6",
                          "#22c55e",
                          "#f97316",
                          "#ef4444",
                          "#9ca3af",
                        ];

                        return (
                          <Rectangle
                            {...props}
                            fill={colors[props.index % colors.length]}
                          />
                        );
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
       {/* Recent Tickets */}
<div className="w-full min-w-0 xl:w-3/4 rounded-lg border border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 overflow-hidden">

  {/* Header */}
  <div className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-800">
    <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
      Recent Tickets
    </h2>

    <button
      onClick={() => navigate("/admin/tickets")}
      className="shrink-0 rounded-md bg-indigo-100 px-3 py-1 text-xs text-indigo-700 transition-colors hover:bg-indigo-500/10 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-400/10"
    >
      View All
    </button>
  </div>

          {/* Loading Skeleton */}
          {ticketsLoading ? (
           <div className="w-full overflow-x-auto">
    <table className="w-full min-w-150 border-collapse text-left">
      <thead>
        <tr className="text-xs text-zinc-600 dark:text-zinc-400">
          <th className="whitespace-nowrap p-3">#</th>
          <th className="p-3">Subject</th>
          <th className="p-3">User</th>
          <th className="p-3">Category</th>
          <th className="p-3">Status</th>
          <th className="p-3">Priority</th>
          <th className="whitespace-nowrap p-3">Created On</th>
        </tr>
      </thead>

                <tbody>
                  <tr className="border-t border-zinc-200 dark:border-zinc-800">
                    <td className="p-3"><div className="h-4 w-8 rounded bg-indigo-200 dark:bg-indigo-900" /></td>
                    <td className="p-3"><div className="h-4 w-28 rounded bg-violet-200 dark:bg-violet-900" /></td>
                    <td className="p-3"><div className="h-4 w-16 rounded bg-sky-200 dark:bg-sky-900" /></td>
                    <td className="p-3"><div className="h-4 w-16 rounded bg-orange-200 dark:bg-orange-900" /></td>
                    <td className="p-3"><div className="h-5 w-16 rounded-md bg-blue-200 dark:bg-blue-900" /></td>
                    <td className="p-3"><div className="h-5 w-14 rounded-md bg-red-200 dark:bg-red-900" /></td>
                    <td className="p-3"><div className="h-4 w-16 rounded bg-zinc-300 dark:bg-zinc-700" /></td>
                  </tr>

                  <tr className="border-t border-zinc-200 dark:border-zinc-800">
                    <td className="p-3"><div className="h-4 w-8 rounded bg-indigo-200 dark:bg-indigo-900" /></td>
                    <td className="p-3"><div className="h-4 w-32 rounded bg-violet-200 dark:bg-violet-900" /></td>
                    <td className="p-3"><div className="h-4 w-20 rounded bg-sky-200 dark:bg-sky-900" /></td>
                    <td className="p-3"><div className="h-4 w-14 rounded bg-orange-200 dark:bg-orange-900" /></td>
                    <td className="p-3"><div className="h-5 w-20 rounded-md bg-yellow-200 dark:bg-yellow-900" /></td>
                    <td className="p-3"><div className="h-5 w-12 rounded-md bg-green-200 dark:bg-green-900" /></td>
                    <td className="p-3"><div className="h-4 w-16 rounded bg-zinc-300 dark:bg-zinc-700" /></td>
                  </tr>

                  <tr className="border-t border-zinc-200 dark:border-zinc-800">
                    <td className="p-3"><div className="h-4 w-8 rounded bg-indigo-200 dark:bg-indigo-900" /></td>
                    <td className="p-3"><div className="h-4 w-24 rounded bg-violet-200 dark:bg-violet-900" /></td>
                    <td className="p-3"><div className="h-4 w-16 rounded bg-sky-200 dark:bg-sky-900" /></td>
                    <td className="p-3"><div className="h-4 w-20 rounded bg-orange-200 dark:bg-orange-900" /></td>
                    <td className="p-3"><div className="h-5 w-16 rounded-md bg-green-200 dark:bg-green-900" /></td>
                    <td className="p-3"><div className="h-5 w-14 rounded-md bg-orange-200 dark:bg-orange-900" /></td>
                    <td className="p-3"><div className="h-4 w-16 rounded bg-zinc-300 dark:bg-zinc-700" /></td>
                  </tr>

                  <tr className="border-t border-zinc-200 dark:border-zinc-800">
                    <td className="p-3"><div className="h-4 w-8 rounded bg-indigo-200 dark:bg-indigo-900" /></td>
                    <td className="p-3"><div className="h-4 w-28 rounded bg-violet-200 dark:bg-violet-900" /></td>
                    <td className="p-3"><div className="h-4 w-20 rounded bg-sky-200 dark:bg-sky-900" /></td>
                    <td className="p-3"><div className="h-4 w-16 rounded bg-orange-200 dark:bg-orange-900" /></td>
                    <td className="p-3"><div className="h-5 w-20 rounded-md bg-red-200 dark:bg-red-900" /></td>
                    <td className="p-3"><div className="h-5 w-12 rounded-md bg-green-200 dark:bg-green-900" /></td>
                    <td className="p-3"><div className="h-4 w-16 rounded bg-zinc-300 dark:bg-zinc-700" /></td>
                  </tr>

                  <tr className="border-t border-zinc-200 dark:border-zinc-800">
                    <td className="p-3"><div className="h-4 w-8 rounded bg-indigo-200 dark:bg-indigo-900" /></td>
                    <td className="p-3"><div className="h-4 w-32 rounded bg-violet-200 dark:bg-violet-900" /></td>
                    <td className="p-3"><div className="h-4 w-16 rounded bg-sky-200 dark:bg-sky-900" /></td>
                    <td className="p-3"><div className="h-4 w-14 rounded bg-orange-200 dark:bg-orange-900" /></td>
                    <td className="p-3"><div className="h-5 w-16 rounded-md bg-blue-200 dark:bg-blue-900" /></td>
                    <td className="p-3"><div className="h-5 w-14 rounded-md bg-red-200 dark:bg-red-900" /></td>
                    <td className="p-3"><div className="h-4 w-16 rounded bg-zinc-300 dark:bg-zinc-700" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : ticketsError ? (
            /* Error State */
            <div className="min-h-70 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                <AlertCircle className="text-red-600 dark:text-red-400" size={26} />
              </div>

              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Failed to Load Tickets
              </h3>

              <p className="max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
                Unable to fetch recent tickets. Please check your connection and try again.
              </p>
            </div>
          ) : latestTickets.length === 0 ? (
            /* Empty State */
            <div className="min-h-55 flex flex-col items-center justify-center gap-2 p-6 text-center">
              <Ticket className="text-zinc-400 dark:text-zinc-500" size={32} />

              <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">
                No Tickets Found
              </h3>

              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                There are no tickets available to display.
              </p>
            </div>
          ) : (
            /* Normal Table */
            <div className="overflow-x-auto">
              <table className="w-full min-w-187.5 table-fixed">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-900 text-left text-xs text-zinc-600 dark:text-zinc-400">
                    <th className="w-[10.5%] p-3">#</th>
                    <th className="w-[23%] p-3">Subject</th>
                    <th className="w-[14%] p-3">User</th>
                    <th className="w-[10%] p-3">Category</th>
                    <th className="w-[10.5%] p-3">Status</th>
                    <th className="w-[10%] p-3">Priority</th>
                    <th className="w-[12%] p-3">Created On</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-zinc-800 dark:text-zinc-200">
                  {latestTickets.map((tickets) => {
                    let statusColors =
                      "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-950";

                    let priorityColors =
                      "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-950";

                    if (tickets.priority === "High") {
                      priorityColors =
                        "text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-950";
                    } else if (tickets.priority === "Low") {
                      priorityColors =
                        "text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-950";
                    }

                    if (tickets.status === "Open") {
                      statusColors =
                        "text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-950";
                    } else if (tickets.status === "In Progress") {
                      statusColors =
                        "text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-950";
                    } else if (tickets.status === "Pending") {
                      statusColors =
                        "text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-950";
                    }

                    return (
                      <tr
                        key={tickets._id}
                        className="border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-500/10 dark:hover:bg-zinc-400/10 transition-colors"
                      >
                        <td className="p-3 text-indigo-600 dark:text-indigo-400 truncate">
                          {tickets.ticketId}
                        </td>

                        <td className="p-3 truncate" title={tickets.subject}>
                          {tickets.subject}
                        </td>

                        <td className="p-3 truncate" title={tickets.createdBy?.name}>
                          {tickets.createdBy?.name || "Unknown"}
                        </td>

                        <td className="p-3 truncate" title={tickets.category}>
                          {tickets.category}
                        </td>

                        <td className="p-3">
                          <span className={`inline-block max-w-full truncate px-2 py-1 rounded-md font-medium ${statusColors}`}>
                            {tickets.status}
                          </span>
                        </td>

                        <td className="p-3">
                          <span className={`inline-block px-2 py-1 rounded-md font-medium ${priorityColors}`}>
                            {tickets.priority}
                          </span>
                        </td>

                        <td className="p-3 whitespace-nowrap">
                          {tickets.createdAt
                            ? new Date(tickets.createdAt).toLocaleDateString("en-IN")
                            : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Top Categories */}
        <div className="w-full lg:w-1/4 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
          <div className="flex justify-between items-center p-3 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Top Categories
            </h2>

            <button
              onClick={() => navigate("/admin/kbase")}
              className="px-3 py-1 text-xs text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950 rounded-md hover:bg-indigo-500/10 dark:hover:bg-indigo-400/10 cursor-pointer transition-colors"
            >
              View All
            </button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900 text-left text-xs text-zinc-600 dark:text-zinc-400">
                <th className="p-2">#</th>
                <th className="p-2">Category</th>
                <th className="p-2">Tickets</th>
                <th className="p-2">%</th>
              </tr>
            </thead>

            <tbody className="text-xs text-zinc-800 dark:text-zinc-200">
              {ticketsLoading ? (
                <>
                  <tr className="animate-pulse border-t border-zinc-200 dark:border-zinc-800">
                    <td className="p-3"><div className="h-4 w-5 rounded bg-indigo-200 dark:bg-indigo-900" /></td>
                    <td className="p-3"><div className="h-4 w-28 rounded bg-violet-200 dark:bg-violet-900" /></td>
                    <td className="p-3"><div className="h-4 w-10 rounded bg-sky-200 dark:bg-sky-900" /></td>
                    <td className="p-3"><div className="h-4 w-12 rounded bg-green-200 dark:bg-green-900" /></td>
                  </tr>
                  <tr className="animate-pulse border-t border-zinc-200 dark:border-zinc-800">
                    <td className="p-3"><div className="h-4 w-5 rounded bg-indigo-200 dark:bg-indigo-900" /></td>
                    <td className="p-3"><div className="h-4 w-20 rounded bg-violet-200 dark:bg-violet-900" /></td>
                    <td className="p-3"><div className="h-4 w-8 rounded bg-sky-200 dark:bg-sky-900" /></td>
                    <td className="p-3"><div className="h-4 w-12 rounded bg-green-200 dark:bg-green-900" /></td>
                  </tr>
                  <tr className="animate-pulse border-t border-zinc-200 dark:border-zinc-800">
                    <td className="p-3"><div className="h-4 w-5 rounded bg-indigo-200 dark:bg-indigo-900" /></td>
                    <td className="p-3"><div className="h-4 w-24 rounded bg-violet-200 dark:bg-violet-900" /></td>
                    <td className="p-3"><div className="h-4 w-10 rounded bg-sky-200 dark:bg-sky-900" /></td>
                    <td className="p-3"><div className="h-4 w-12 rounded bg-green-200 dark:bg-green-900" /></td>
                  </tr>
                </>
              ) : ticketsError ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-red-600 dark:text-red-400">
                    Failed to load category data.
                  </td>
                </tr>
              ) : ticketCategory.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-zinc-500 dark:text-zinc-400">
                    No ticket categories found.
                  </td>
                </tr>
              ) : (
                ticketCategory.map((category, index) => {
                  const categoryCount = tickets.filter(
                    (ticket) => ticket.category === category
                  ).length;

                  const percentage = tickets.length
                    ? Math.round((categoryCount / tickets.length) * 100)
                    : 0;

                  return (
                    <tr
                      key={category}
                      className="border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-500/10 dark:hover:bg-zinc-400/10 transition-colors"
                    >
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{category}</td>
                      <td className="p-2">{categoryCount}</td>
                      <td className="p-2">{percentage}%</td>
                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>
      </div>


     {/* Insight */}
<div className="flex w-full min-w-0 flex-col gap-4 rounded-lg border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900 dark:bg-indigo-950 md:flex-row md:items-center md:justify-between">
  <div className="flex min-w-0 items-start gap-3 sm:gap-4">
    <div className="shrink-0 text-2xl text-indigo-600 dark:text-indigo-400">
      💡
    </div>

    <div className="min-w-0">
      <h2 className="mb-1 font-semibold text-indigo-600 dark:text-indigo-400">
        Insight
      </h2>

      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        The number of resolved tickets has increased by 18% compared to last
        month. Great work!
      </p>
    </div>
  </div>

  <button
    onClick={() => navigate("/admin/dashboard")}
    className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-indigo-500 px-3 py-2 text-sm text-indigo-600 transition-colors hover:bg-indigo-500/10 dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-indigo-400/10 md:w-auto"
  >
    <span>View Detailed Analytics</span>
    <span className="shrink-0">→</span>
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
    </div>
  )
}

export default AdminReports
