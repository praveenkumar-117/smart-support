import {
  ArrowUpNarrowWide,
  DotSquareIcon,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import {
  statusConfig,
  priorityConfig,
} from "../../config/ticketConfig";
import useCategories from "../../hooks/useCategories";
import { getCategoryStyleByName } from "../../config/categoryUtils";
import ViewTicket from "../otherComponents/ViewTicket";
import MessagePopup from "../otherComponents/MessagePopup";

const AdminTickets = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const { categories } = useCategories();

  const {
    data,
    isLoading,
    isError,
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

  // Ticket summary data
  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  );

  const progressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  );

  const pendingTickets = tickets.filter(
    (ticket) => ticket.status === "Pending"
  );

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  );

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    if (activeFilter === "status") {
      return (
        selectedStatus === "All" ||
        ticket.status === selectedStatus
      );
    }

    if (activeFilter === "category") {
      return (
        selectedCategory === "All" ||
        ticket.category === selectedCategory
      );
    }

    if (activeFilter === "priority") {
      return (
        selectedPriority === "All" ||
        ticket.priority === selectedPriority
      );
    }

    return true;
  });

  // Config icons
  const TotalIcon = statusConfig.Total.icon;
  const OpenIcon = statusConfig.Open.icon;
  const ProgressIcon = statusConfig["In Progress"].icon;
  const PendingIcon = statusConfig.Pending.icon;
  const ResolvedIcon = statusConfig.Resolved.icon;


  //pagination 
  const itemPerPage = 5;
  const totalPages = Math.ceil(filteredTickets.length / itemPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;

  const currentPageData = filteredTickets.slice(startIndex, endIndex)

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );


  const [showMessage, setShowMessage] = useState(null);

  useEffect(() => {
    if (isError) {
      setShowMessage({
        type: "error",
        title: "Tickets Fetch Failed",
        message:
          "Unable to load recent tickets. Please try again later.",
      });
    }
  }, [isError]);

  return (

    <div className="w-full p-4 flex flex-col gap-6 bg-gray-200 dark:bg-zinc-950">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold md:text-2xl text-xl text-gray-900 dark:text-gray-100">
          Tickets
        </h1>

        <p className="text-sm text-gray-600 dark:text-zinc-400">
          here's is all tickets.
        </p>
      </div>


      {/* Summary Cards */}
      <div className="flex w-full min-w-0 flex-col gap-2 md:flex-row md:flex-nowrap md:gap-2">

        {isLoading ? (
          <>
            {/* Total Tickets Skeleton */}
            <div className="w-full md:w-1/5  animate-pulse rounded-lg border border-violet-200 bg-gray-50 p-4 dark:border-violet-900 dark:bg-zinc-900">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-violet-200 dark:bg-violet-950/50" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-20 rounded bg-violet-200 dark:bg-violet-950" />
                  <div className="h-5 w-10 rounded bg-violet-300 dark:bg-violet-900" />
                </div>
              </div>
            </div>

            {/* Open Tickets Skeleton */}
            <div className="w-1/5 animate-pulse rounded-lg border border-orange-200 bg-gray-50 p-4 dark:border-orange-900 dark:bg-zinc-900">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-orange-200 dark:bg-orange-950/50" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-20 rounded bg-orange-200 dark:bg-orange-950" />
                  <div className="h-5 w-10 rounded bg-orange-300 dark:bg-orange-900" />
                </div>
              </div>
            </div>

            {/* In Progress Skeleton */}
            <div className="w-1/5 animate-pulse rounded-lg border border-sky-200 bg-gray-50 p-4 dark:border-sky-900 dark:bg-zinc-900">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-sky-200 dark:bg-sky-950/50" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-20 rounded bg-sky-200 dark:bg-sky-950" />
                  <div className="h-5 w-10 rounded bg-sky-300 dark:bg-sky-900" />
                </div>
              </div>
            </div>

            {/* Pending Skeleton */}
            <div className="w-1/5 animate-pulse rounded-lg border border-red-200 bg-gray-50 p-4 dark:border-red-900 dark:bg-zinc-900">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-red-200 dark:bg-red-950/50" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-16 rounded bg-red-200 dark:bg-red-950" />
                  <div className="h-5 w-10 rounded bg-red-300 dark:bg-red-900" />
                </div>
              </div>
            </div>

            {/* Resolved Skeleton */}
            <div className="w-1/5 animate-pulse rounded-lg border border-green-200 bg-gray-50 p-4 dark:border-green-900 dark:bg-zinc-900">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-green-200 dark:bg-green-950/50" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-20 rounded bg-green-200 dark:bg-green-950" />
                  <div className="h-5 w-10 rounded bg-green-300 dark:bg-green-900" />
                </div>
              </div>
            </div>
          </>
        ) : isError ? (
          <div className="w-full rounded-lg border border-rose-200 bg-rose-50 p-4 text-center dark:border-rose-900 dark:bg-rose-950/20">
            <p className="text-sm font-semibold text-rose-700 dark:text-rose-300">
              Unable to load ticket summary.
            </p>
          </div>
        ) : (
          <>
            {/* Total Tickets */}
            <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer hover:border-violet-500 hover:bg-violet-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-700 dark:hover:bg-violet-950/10 md:flex-1 md:gap-2">

              <div className="flex flex-row md:flex-col lg:flex-row gap-4 items-center ">
                <span>
                  <TotalIcon
                    className={`${statusConfig.Total.color} bg-violet-200 dark:bg-violet-950/50 p-1.5 rounded-full`}
                    size={40}
                  />
                </span>

                <div className="flex flex-col items-center justify-center text-center">
                  <h1 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                    Total Tickets
                  </h1>

                  <h1 className="font-semibold text-lg text-violet-500">
                    {tickets.length}
                  </h1>
                </div>
              </div>
            </div>

            {/* Open Tickets */}
            <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer hover:border-violet-500 hover:bg-violet-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-700 dark:hover:bg-violet-950/10 md:flex-1 md:gap-2">
              <div className="flex flex-row md:flex-col lg:flex-row gap-4 items-center ">
                <span>
                  <OpenIcon
                    className={`${statusConfig.Open.color} bg-orange-200 dark:bg-orange-950/50 p-1.5 rounded-full`}
                    size={40}
                  />
                </span>

                <div className="flex flex-col items-center justify-center text-center">
                  <h1 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                    Open Tickets
                  </h1>

                  <h1 className="font-semibold text-lg text-orange-500">
                    {openTickets.length}
                  </h1>
                </div>
              </div>
            </div>

            {/* In Progress */}
            <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer hover:border-violet-500 hover:bg-violet-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-700 dark:hover:bg-violet-950/10 md:flex-1 md:gap-2">
              <div className="flex flex-row md:flex-col lg:flex-row gap-4 items-center ">
                <span>
                  <ProgressIcon
                    className={`${statusConfig["In Progress"].color} bg-sky-200 dark:bg-sky-950/50 p-1.5 rounded-full`}
                    size={40}
                  />
                </span>

                <div className="flex flex-col items-center justify-center text-center">
                  <h1 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                    In Progress
                  </h1>

                  <h1 className="font-semibold text-lg text-sky-600 dark:text-sky-400">
                    {progressTickets.length}
                  </h1>
                </div>
              </div>
            </div>

            {/* Pending */}
            <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer hover:border-violet-500 hover:bg-violet-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-700 dark:hover:bg-violet-950/10 md:flex-1 md:gap-2">
              <div className="flex flex-row md:flex-col lg:flex-row gap-4 items-center ">
                <span>
                  <PendingIcon
                    className={`${statusConfig.Pending.color} bg-red-200 dark:bg-red-950/50 p-1.5 rounded-full`}
                    size={40}
                  />
                </span>

                <div className="flex flex-col items-center justify-center text-center">
                  <h1 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                    Pending
                  </h1>

                  <h1 className="font-semibold text-lg text-red-600 dark:text-red-400">
                    {pendingTickets.length}
                  </h1>
                </div>
              </div>
            </div>

            {/* Resolved */}
            <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer hover:border-violet-500 hover:bg-violet-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-700 dark:hover:bg-violet-950/10 md:flex-1 md:gap-2">
              <div className="flex flex-row md:flex-col lg:flex-row gap-4 items-center ">
                <span>
                  <ResolvedIcon
                    className={`${statusConfig.Resolved.color} bg-green-200 dark:bg-green-950/50 p-1.5 rounded-full`}
                    size={40}
                  />
                </span>

                <div className="flex flex-col items-center justify-center text-center">
                  <h1 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                    Resolved
                  </h1>

                  <h1 className="font-semibold text-lg text-green-600 dark:text-green-400">
                    {resolvedTickets.length}
                  </h1>
                </div>
              </div>
            </div>
          </>
        )}
      </div>


      {/* Filters */}
      <div className="flex w-full min-w-0 flex-col gap-3 rounded-lg border border-gray-300 bg-gray-50 px-3 py-4 text-sm dark:border-zinc-700 dark:bg-zinc-900 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-3 md:py-6">

        {/* Search */}
        <div className="flex w-full min-w-0 items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-800 md:flex-1">
          <input
            type="text"
            placeholder="Search tickets..."
            className="w-full min-w-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-0 dark:text-gray-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600"
          />

          <Search
            className="shrink-0 text-gray-400 dark:text-zinc-500"
            size={18}
          />
        </div>

        {/* Status */}
        <div className="flex w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-gray-300 p-2 dark:border-zinc-700 md:w-auto md:flex-none md:justify-start">
          <label
            htmlFor="Status"
            className="shrink-0 text-sm font-semibold text-gray-800 dark:text-gray-200"
          >
            Status
          </label>

          <select
            name="status"
            id="Status"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setSelectedCategory("All");
              setSelectedPriority("All");
              setActiveFilter("status");
              setCurrentPage(1);
            }}
            className="min-w-0 cursor-pointer rounded-lg border border-transparent bg-white p-1 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* Priority */}
        <div className="flex w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-gray-300 p-2 dark:border-zinc-700 md:w-auto md:flex-none md:justify-start">
          <label
            htmlFor="Priority"
            className="shrink-0 text-sm font-semibold text-gray-800 dark:text-gray-200"
          >
            Priority
          </label>

          <select
            name="priority"
            id="Priority"
            value={selectedPriority}
            onChange={(e) => {
              setSelectedPriority(e.target.value);
              setSelectedStatus("All");
              setSelectedCategory("All");
              setActiveFilter("priority");
              setCurrentPage(1);
            }}
            className="min-w-0 cursor-pointer rounded-lg border border-transparent bg-white p-1 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100"
          >
            <option value="All">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Category */}
        <div className="flex w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-gray-300 p-2 dark:border-zinc-700 md:w-auto md:flex-none md:justify-start">
          <label
            htmlFor="Category"
            className="shrink-0 text-sm font-semibold text-gray-800 dark:text-gray-200"
          >
            Category
          </label>

          <select
            name="category"
            id="Category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedStatus("All");
              setSelectedPriority("All");
              setActiveFilter("category");
              setCurrentPage(1);
            }}
            className="min-w-0 cursor-pointer rounded-lg border border-transparent bg-white p-1 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100"
          >
            <option value="All">All Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ticket Table */}
      <div className="w-full min-w-0 overflow-hidden rounded-lg border border-gray-400 bg-gray-50 p-2 dark:border-zinc-700 dark:bg-zinc-900">
        <table className="w-full table-fixed text-[10px] sm:text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-900 dark:bg-zinc-800 dark:text-gray-200 ">
              <th className="w-[10%] x-1 py-2 sm:px-2 md:px-3 md:py-3">Ticket ID</th>
              <th className="w-[23%] x-1 py-2 sm:px-2 md:px-3 md:py-3">Subject</th>
              <th className="w-[12%] x-1 py-2 sm:px-2 md:px-3 md:py-3">User</th>
              <th className="w-[13%] x-1 py-2 sm:px-2 md:px-3 md:py-3">Category</th>
              <th className="w-[13%] x-1 py-2 sm:px-2 md:px-3 md:py-3">Status</th>
              <th className="w-[12%] x-1 py-2 sm:px-2 md:px-3 md:py-3">Priority</th>
              <th className="w-[17%] x-1 py-2 sm:px-2 md:px-3 md:py-3">Created On</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <>
                {/* Skeleton Row 1 */}
                <tr className="border-b border-gray-200 dark:border-zinc-800">
                  <td className="px-1 py-2 sm:px-2 md:px-3 md:py-3">
                    <div className="h-4 w-10 sm:w-16 animate-pulse rounded bg-violet-200 dark:bg-violet-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3 md:py-3">
                    <div className="h-4 w-16 sm:w-32 animate-pulse rounded bg-sky-200 dark:bg-sky-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3 md:py-3">
                    <div className="h-4 w-12 sm:w-24 animate-pulse rounded bg-teal-200 dark:bg-teal-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3 md:py-3">
                    <div className="h-5 w-5 sm:w-24 animate-pulse rounded bg-sky-100 dark:bg-sky-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3 md:py-3">
                    <div className="h-5 w-5 sm:w-24 animate-pulse rounded bg-orange-100 dark:bg-orange-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3 md:py-3">
                    <div className="h-5 w-5 sm:w-20 animate-pulse rounded bg-rose-100 dark:bg-rose-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3 md:py-3">
                    <div className="h-4 w-5 sm:w-28 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
                  </td>
                </tr>

                {/* Skeleton Row 2 */}
                <tr className="border-b border-gray-200 dark:border-zinc-800">
                  <td className="px-1 py-2 sm:px-2 md:px-3">
                    <div className="h-4 w-10 sm:w-16 animate-pulse rounded bg-violet-200 dark:bg-violet-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3">
                    <div className="h-4 w-20 sm:w-40 animate-pulse rounded bg-sky-200 dark:bg-sky-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3">
                    <div className="h-4 w-10 sm:w-20 animate-pulse rounded bg-teal-200 dark:bg-teal-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3">
                    <div className="h-5 w-5 sm:w-20 animate-pulse rounded bg-amber-100 dark:bg-amber-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3">
                    <div className="h-5 w-5 sm:w-20 animate-pulse rounded bg-sky-100 dark:bg-sky-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3">
                    <div className="h-5 w-5 sm:w-16 animate-pulse rounded bg-rose-100 dark:bg-rose-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3">
                    <div className="h-4 w-5 sm:w-28 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
                  </td>
                </tr>

                {/* Skeleton Row 3 */}
                <tr className="border-b border-gray-200 dark:border-zinc-800">
                  <td className="px-1 py-2 sm:px-2 md:px-3">
                    <div className="h-4 w-10 sm:w-16 animate-pulse rounded bg-violet-200 dark:bg-violet-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3">
                    <div className="h-4 w-14 sm:w-28 animate-pulse rounded bg-sky-200 dark:bg-sky-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3">
                    <div className="h-4 w-12 sm:w-24 animate-pulse rounded bg-teal-200 dark:bg-teal-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3">
                    <div className="h-5 w-5 sm:w-24 animate-pulse rounded bg-pink-100 dark:bg-pink-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3">
                    <div className="h-5 w-5 sm:w-20 animate-pulse rounded bg-emerald-100 dark:bg-emerald-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3">
                    <div className="h-5 w-5 sm:w-20 animate-pulse rounded bg-amber-100 dark:bg-amber-950" />
                  </td>
                  <td className="px-1 py-2 sm:px-2 md:px-3">
                    <div className="h-4 w-5 sm:w-28 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
                  </td>
                </tr>
              </>
            ) : isError ? (
              <tr>
                <td colSpan={7} className="p-8 text-center">
                  <p className="font-semibold text-rose-600 dark:text-rose-400">
                    Unable to load tickets
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Please try again later.
                  </p>
                </td>
              </tr>
            ) : currentPageData?.length > 0 ? (
              currentPageData.map((ticket) => {
                const categoryData = getCategoryStyleByName(
                  categories,
                  ticket.category
                );
                const statusData = statusConfig[ticket.status];
                const priorityData = priorityConfig[ticket.priority];

                const CategoryIcon = categoryData.icon;
                const StatusIcon = statusData?.icon || DotSquareIcon;
                const PriorityIcon = priorityData?.icon || ArrowUpNarrowWide;

                return (
                  <tr
                    onClick={() => setSelectedTicket(ticket)}
                    key={ticket._id}
                    className="cursor-pointer border-b border-gray-200 text-xs font-semibold text-gray-800 hover:bg-gray-200 dark:border-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-800/50 md:text-sm"
                  >
                    <td className="wrap-break-words p-1.5 text-violet-700 dark:text-violet-400 md:p-2.5">
                      {ticket.ticketId}
                    </td>

                    <td className="wrap-break-words p-1.5 md:p-2.5">
                      {ticket.subject}
                    </td>

                    <td className="wrap-break-words p-1.5 text-teal-800 dark:text-teal-400 md:p-2.5">
                      {ticket.createdBy?.name}
                    </td>

                    {/* Category */}
                    <td className="p-1.5 text-sky-700 dark:text-sky-400 md:p-2.5">
                      <span
                        className={`flex items-center gap-1 md:gap-2 ${categoryData.text}`}
                      >
                        <CategoryIcon size={18} className="shrink-0 lg:size-5 md:hidden lg:block" />
                        <span className="hidden md:inline lg:hidden">
                          {ticket.category}
                        </span>
                        <span className="hidden lg:inline">
                          {ticket.category}
                        </span>
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-1.5 text-orange-600 dark:text-orange-400 md:p-2.5">
                      <span
                        className={`flex items-center gap-1 md:gap-2 ${statusData?.color || "text-gray-500 dark:text-gray-400"
                          }`}
                      >
                        <StatusIcon size={18} className="shrink-0 lg:size-5 md:hidden lg:block" />
                        <span className="hidden md:inline">
                          {ticket.status}
                        </span>
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="p-1.5 text-red-600 dark:text-red-400 md:p-2.5">
                      <span
                        className={`flex items-center gap-1 md:gap-2 ${priorityData?.color || "text-gray-500 dark:text-gray-400"
                          }`}
                      >
                        <PriorityIcon size={18} className="shrink-0 lg:size-5 md:hidden lg:block" />
                        <span className="hidden md:inline">
                          {ticket.priority}
                        </span>
                      </span>
                    </td>

                    <td className="wrap-break-words p-1.5 text-gray-600 dark:text-zinc-400 md:p-2.5">
                      {new Date(ticket.createdAt).toLocaleString()}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center">
                  <p className="font-semibold text-sky-700 dark:text-sky-300">
                    No tickets found
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Try changing your filters or search criteria.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {!isLoading && !isError && (


          <div className="w-full m-2 md:m-4 flex  flex-wrap items-center justify-start md:justify-end gap-1 font-semibold md:px-4">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="cursor-pointer rounded-lg border border-gray-300 bg-violet-600 px-2 py-1.5 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 md:px-3 md:py-2 dark:border-zinc-700"
            >
              &lt;
            </button>

            {/* Page Numbers */}
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`cursor-pointer rounded-md border px-2 py-1.5 md:px-3 md:py-2 ${currentPage === pageNumber
                  ? "border-violet-600 bg-violet-600 text-white"
                  : "border-gray-300 text-gray-800 hover:bg-blue-600 hover:text-white dark:border-zinc-700 dark:text-gray-200"
                  }`}
              >
                {pageNumber}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={totalPages === 0 || currentPage === totalPages}
              className="cursor-pointer rounded-md border border-gray-300 bg-violet-600 px-2 py-1.5 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 md:px-3 md:py-2 dark:border-zinc-700"
            >
              &gt;
            </button>
          </div>

        )}



      </div>


      {selectedTicket && (
        <ViewTicket
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
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

export default AdminTickets;