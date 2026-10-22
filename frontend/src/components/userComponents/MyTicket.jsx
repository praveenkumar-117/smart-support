import {
  ArrowUpNarrowWide,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock4,
  DotSquareIcon,
  Funnel,
  Loader,
  Plus,
  Search,
  Tickets,
  ArrowDownNarrowWide,
  ArrowRight,
  Globe,
  Monitor,
  Code,
  UserRound,
  Wifi,
  Ellipsis,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import api from "../../api/api";
import MessagePopup from "../otherComponents/MessagePopup";
import ViewTicket from "../otherComponents/ViewTicket";
import useCategories from "../../hooks/useCategories";
import { getCategoryStyleByName } from "../../config/categoryUtils";


const MyTicket = () => {
  const [showMessage, setShowMessage] = useState(null);
  const [selctedFilter, setSelctedFilter] = useState("All")
  const [viewTicket, setViewTicket] = useState(null)

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { categories } = useCategories();

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


  // Ticket summary counts
  const totalTickets = tickets;

  const openTickets = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === "open"
  );

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === "in progress"
  );

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === "resolved"
  );

  let filteredTickets = [];
  if (selctedFilter === "All") {
    filteredTickets = totalTickets
  }
  if (selctedFilter === "Open") {
    filteredTickets = openTickets
  }
  if (selctedFilter === "In Progress") {
    filteredTickets = inProgressTickets
  }
  if (selctedFilter === "Resolved") {
    filteredTickets = resolvedTickets
  }

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredTickets.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );



  const statusStyles = {
    Open: {
      icon: <DotSquareIcon size={18} />,
      className: "text-yellow-500",
    },
    "In Progress": {
      icon: <Clock4 size={18} />,
      className: "text-sky-600",
    },
    Resolved: {
      icon: <CircleCheck size={18} />,
      className: "text-green-600",
    },
    Closed: {
      icon: <CircleCheck size={18} />,
      className: "text-gray-500",
    },
  };

  const priorityStyles = {
    Low: {
      icon: <ArrowDownNarrowWide size={18} />,
      className: "text-green-600",
    },
    Medium: {
      icon: <ArrowRight size={18} />,
      className: "text-orange-600",
    },
    High: {
      icon: <ArrowUpNarrowWide size={18} />,
      className: "text-red-600",
    },
  }



  useEffect(() => {
    if (myTicketsisError) {
      setShowMessage({
        type: "error",
        title: "Tickets Fetch Failed",
        message:
          myTicketsError?.response?.data?.message ||
          myTicketsError?.message ||
          "Unable to fetch tickets.",
      });
    }
  }, [myTicketsisError, myTicketsError]);


  return (

    <div className="flex flex-1 flex-col gap-4 bg-gray-200 dark:bg-black p-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm">
        <span className="text-gray-600 dark:text-zinc-400">Dashboard</span>
        <ChevronRight size={17} className="text-gray-500 dark:text-zinc-500" />
        <span className="font-medium text-gray-800 dark:text-gray-100">My Tickets</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-4">
        <div>
          <h1 className="text-base font-bold text-gray-900 dark:text-gray-100">My Tickets</h1>
          <p className="mt-1 text-xs lg:text-sm text-gray-600 dark:text-zinc-400">
            View and track all your support tickets in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/user/create-ticket")}
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border hover:border-indigo-600 hover:bg-indigo-600 px-2 py-1 lg:px-4 lg:py-2 text-sm font-semibold text-white transition duration-200 border-violet-700 bg-violet-700"
        >
          <Plus size={18} className="hidden lg:block" />
          Create Ticket
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">

        {myTicketsisLoading ? (
          <>
            {/* All Tickets Skeleton */}
            <div className="flex items-center gap-3 rounded-xl border border-purple-200 bg-purple-50 p-4 dark:border-purple-900 dark:bg-zinc-900">
              <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-purple-200 dark:bg-purple-950" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-20 animate-pulse rounded bg-purple-200 dark:bg-purple-900" />
                <div className="h-6 w-8 animate-pulse rounded bg-purple-200 dark:bg-purple-900" />
                <div className="h-3 w-16 animate-pulse rounded bg-purple-100 dark:bg-purple-950" />
              </div>
            </div>

            {/* Open Tickets Skeleton */}
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-zinc-900">
              <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-red-200 dark:bg-red-950" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-red-200 dark:bg-red-900" />
                <div className="h-6 w-8 animate-pulse rounded bg-red-200 dark:bg-red-900" />
                <div className="h-3 w-20 animate-pulse rounded bg-red-100 dark:bg-red-950" />
              </div>
            </div>

            {/* In Progress Skeleton */}
            <div className="flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900 dark:bg-zinc-900">
              <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-orange-200 dark:bg-orange-950" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-orange-200 dark:bg-orange-900" />
                <div className="h-6 w-8 animate-pulse rounded bg-orange-200 dark:bg-orange-900" />
                <div className="h-3 w-24 animate-pulse rounded bg-orange-100 dark:bg-orange-950" />
              </div>
            </div>

            {/* Resolved Skeleton */}
            <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-zinc-900">
              <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-green-200 dark:bg-green-950" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-20 animate-pulse rounded bg-green-200 dark:bg-green-900" />
                <div className="h-6 w-8 animate-pulse rounded bg-green-200 dark:bg-green-900" />
                <div className="h-3 w-24 animate-pulse rounded bg-green-100 dark:bg-green-950" />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* All Tickets */}
            <div className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer hover:border-purple-300 hover:bg-purple-100 dark:hover:border-purple-700 dark:hover:bg-purple-950/30">
              <Tickets
                className="shrink-0 rounded-full bg-purple-200 dark:bg-purple-950 p-1.5 text-purple-700 dark:text-purple-300"
                size={40}
              />
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">All Tickets</h2>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{totalTickets.length}</p>
                <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">All Time</p>
              </div>
            </div>

            {/* Open Tickets */}
            <div className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer hover:border-orange-300 hover:bg-orange-100 dark:hover:border-orange-700 dark:hover:bg-orange-950/30">
              <Clock4
                className="shrink-0 rounded-full bg-orange-200 dark:bg-orange-950 p-1.5 text-orange-700 dark:text-orange-300"
                size={40}
              />
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Open Tickets</h2>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{openTickets.length}</p>
                <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">Need action</p>
              </div>
            </div>

            {/* In Progress */}
            <div className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer hover:border-sky-300 hover:bg-sky-100 dark:hover:border-sky-700 dark:hover:bg-sky-950/30">
              <Loader
                className="shrink-0 rounded-full bg-sky-200 dark:bg-sky-950 p-1.5 text-sky-700 dark:text-sky-300"
                size={40}
              />
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">In Progress</h2>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{inProgressTickets.length}</p>
                <p className="text-sm font-semibold text-sky-700 dark:text-sky-300">Being worked on</p>
              </div>
            </div>

            {/* Resolved */}
            <div className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer hover:border-green-300 hover:bg-green-100 dark:hover:border-green-700 dark:hover:bg-green-950/30">
              <CircleCheck
                className="shrink-0 rounded-full bg-green-200 dark:bg-green-950 p-1.5 text-green-700 dark:text-green-300"
                size={40}
              />
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Resolved</h2>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{resolvedTickets.length}</p>
                <p className="text-sm font-semibold text-green-700 dark:text-green-300">Successfully Resolved</p>
              </div>
            </div>

          </>
        )}
      </div>
      {/* Ticket Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-3">
        <div className="flex flex-wrap items-center gap-2">
          {["All", "Open", "In Progress", "Resolved"].map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setSelctedFilter(filter);
                setCurrentPage(1);
              }}
              className={`cursor-pointer rounded-lg px-3 py-2  text-xs lg:text-sm font-semibold transition-colors ${selctedFilter === filter
                ? "border-b-2 border-violet-600 bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
                : "text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-violet-950/30 dark:hover:text-gray-100"
                }`}
            >
              {filter === "All" ? "All Tickets" : filter}
            </button>
          ))}
        </div>

        <div className="flex min-w-45 flex-1 items-center gap-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 px-3 py-2 lg:max-w-xs">
          <Search size={18} className="shrink-0 text-gray-400 dark:text-zinc-500" />
          <input
            type="text"
            className="w-full bg-transparent text-sm text-gray-700 dark:text-gray-200 outline-none placeholder:text-gray-400 dark:placeholder:text-zinc-500"
            placeholder="Search in tickets..."
          />
        </div>

        <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 transition hover:bg-gray-100 dark:hover:bg-violet-950/30">
          <Funnel size={17} />
          Filters
          <ChevronDown size={17} />
        </button>
      </div>

      {/* Tickets Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900">
        <table className="w-full min-w-212.5 table-fixed text-left text-sm">
          <thead className="bg-gray-300 dark:bg-zinc-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="w-[10%] p-4">Ticket ID</th>
              <th className="w-[25%] p-4">Subject</th>
              <th className="w-[16%] p-4">Category</th>
              <th className="w-[15%] p-4">Status</th>
              <th className="w-[17%] p-4">Priority</th>
              <th className="w-[17%] p-4">Created On</th>
            </tr>
          </thead>

          <tbody className="text-gray-800 dark:text-zinc-200">
            {myTicketsisLoading ? (
              <>
                {/* Skeleton Row 1 */}
                <tr className="border-b border-gray-200 dark:border-zinc-700">
                  <td className="p-4">
                    <div className="h-4 w-14 animate-pulse rounded bg-purple-200 dark:bg-purple-950" />
                  </td>
                  <td className="p-4">
                    <div className="mb-2 h-4 w-36 animate-pulse rounded bg-sky-200 dark:bg-sky-950" />
                    <div className="h-3 w-24 animate-pulse rounded bg-sky-100 dark:bg-sky-900" />
                  </td>
                  <td className="p-4">
                    <div className="h-4 w-20 animate-pulse rounded bg-blue-200 dark:bg-blue-950" />
                  </td>
                  <td className="p-4">
                    <div className="h-5 w-16 animate-pulse rounded-full bg-amber-200 dark:bg-amber-950" />
                  </td>
                  <td className="p-4">
                    <div className="h-5 w-20 animate-pulse rounded-full bg-orange-200 dark:bg-orange-950" />
                  </td>
                  <td className="p-4">
                    <div className="mb-2 h-4 w-24 animate-pulse rounded bg-violet-200 dark:bg-violet-950" />
                    <div className="h-3 w-16 animate-pulse rounded bg-violet-100 dark:bg-violet-900" />
                  </td>
                </tr>

                {/* Skeleton Row 2 */}
                <tr className="border-b border-gray-200 dark:border-zinc-700">
                  <td className="p-4">
                    <div className="h-4 w-12 animate-pulse rounded bg-purple-200 dark:bg-purple-950" />
                  </td>
                  <td className="p-4">
                    <div className="mb-2 h-4 w-44 animate-pulse rounded bg-sky-200 dark:bg-sky-950" />
                    <div className="h-3 w-28 animate-pulse rounded bg-sky-100 dark:bg-sky-900" />
                  </td>
                  <td className="p-4">
                    <div className="h-4 w-16 animate-pulse rounded bg-blue-200 dark:bg-blue-950" />
                  </td>
                  <td className="p-4">
                    <div className="h-5 w-20 animate-pulse rounded-full bg-amber-200 dark:bg-amber-950" />
                  </td>
                  <td className="p-4">
                    <div className="h-5 w-14 animate-pulse rounded-full bg-green-200 dark:bg-green-950" />
                  </td>
                  <td className="p-4">
                    <div className="mb-2 h-4 w-20 animate-pulse rounded bg-violet-200 dark:bg-violet-950" />
                    <div className="h-3 w-16 animate-pulse rounded bg-violet-100 dark:bg-violet-900" />
                  </td>
                </tr>

                {/* Skeleton Row 3 */}
                <tr>
                  <td className="p-4">
                    <div className="h-4 w-14 animate-pulse rounded bg-purple-200 dark:bg-purple-950" />
                  </td>
                  <td className="p-4">
                    <div className="mb-2 h-4 w-32 animate-pulse rounded bg-sky-200 dark:bg-sky-950" />
                    <div className="h-3 w-36 animate-pulse rounded bg-sky-100 dark:bg-sky-900" />
                  </td>
                  <td className="p-4">
                    <div className="h-4 w-24 animate-pulse rounded bg-blue-200 dark:bg-blue-950" />
                  </td>
                  <td className="p-4">
                    <div className="h-5 w-16 animate-pulse rounded-full bg-amber-200 dark:bg-amber-950" />
                  </td>
                  <td className="p-4">
                    <div className="h-5 w-20 animate-pulse rounded-full bg-orange-200 dark:bg-orange-950" />
                  </td>
                  <td className="p-4">
                    <div className="mb-2 h-4 w-24 animate-pulse rounded bg-violet-200 dark:bg-violet-950" />
                    <div className="h-3 w-12 animate-pulse rounded bg-violet-100 dark:bg-violet-900" />
                  </td>
                </tr>
              </>
            ) : filteredTickets.length > 0 ? (
              filteredTickets.map((item) => (
                <tr
                  key={item._id}
                  onClick={() => setViewTicket(item)}
                  className="cursor-pointer border-b border-gray-200 font-semibold transition-colors hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-violet-950/10"
                >
                  <td className="p-4 text-violet-700 dark:text-violet-300">
                    {item.ticketId}
                  </td>

                  <td className="p-4">{item.subject}</td>

                  <td className="p-4">
                    {(() => {
                      const categoryStyle = getCategoryStyleByName(
                        categories,
                        item.category
                      );
                      const CategoryIcon = categoryStyle.icon;

                      return (
                        <span
                          className={`flex items-center gap-2 ${categoryStyle.text}`}
                        >
                          <CategoryIcon size={18} />
                          {item.category}
                        </span>
                      );
                    })()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`flex items-center gap-2 ${statusStyles[item.status]?.className ||
                        "text-gray-500 dark:text-zinc-400"
                        }`}
                    >
                      {statusStyles[item.status]?.icon}
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`flex items-center gap-2 ${priorityStyles[item.priority]?.className ||
                        "text-gray-500 dark:text-zinc-400"
                        }`}
                    >
                      {priorityStyles[item.priority]?.icon}
                      {item.priority}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Date(item.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-gray-500 dark:text-zinc-400"
                >
                  You have 0 tickets in this category
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 py-2 px-4">
        <p className="text-sm text-gray-600 dark:text-zinc-400">
          Showing results {filteredTickets.length === 0 ? 0 : startIndex + 1} - {startIndex + currentPageData.length} of {filteredTickets.length}
        </p>

        <div className="m-4 flex items-center justify-end gap-1 font-semibold">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="cursor-pointer rounded-lg border border-gray-500 dark:border-zinc-600 px-3 py-2 text-gray-500 dark:text-zinc-300 hover:bg-violet-100 dark:hover:bg-violet-950/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            &lt;
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`cursor-pointer rounded-md border px-3 py-2 transition-colors ${currentPage === pageNumber
                ? "border-violet-600 bg-violet-600 text-white"
                : "border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-200 hover:border-violet-500 hover:bg-violet-100 dark:hover:bg-violet-950/30"
                }`}
            >
              {pageNumber}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="cursor-pointer rounded-md border border-gray-500 dark:border-zinc-600 px-3 py-2 text-gray-500 dark:text-zinc-300 hover:bg-violet-100 dark:hover:bg-violet-950/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            &gt;
          </button>
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

      {viewTicket && (
        <ViewTicket
          ticket={viewTicket}
          onClose={() => setViewTicket(null)}
        />
      )}
    </div>

  );
};

export default MyTicket;
