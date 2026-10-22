import {
  UserPlus,
  Users,
  UserCheck,
  UserRoundX,
  ShieldCheck,
  Search,
  RotateCcw,
  Funnel,
  Trash2,
  User,
  ShieldUser,
  Rabbit,
  Loader,
  UserRound,
  Eye,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import AddUser from "../otherComponents/AddUser";
import ConfirmPopup from "../otherComponents/ConfirmPopup";
import MessagePopup from "../otherComponents/MessagePopup";

import ViewUser from "../otherComponents/ViewUser";

const AdminUsers = () => {
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messagePopupData, setMessagePopupData] = useState({
    type: "success",
    title: "",
    message: "",
  });


  const { data, isLoading, isError } = useQuery({
    queryKey: ["backendUser"],
    queryFn: async () => {
      const response = await api.get("/user/getuser");
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const users = data?.allUsers || [];



  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setShowConfirmPopup(true);
  };

  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: async (userId) => {
      const response = await api.delete(
        `/user/deleteuser/${userId}`
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["backendUser"],
      });

      setShowConfirmPopup(false);
      setSelectedUserId(null);
      setMessagePopupData({
        type: "success",
        title: "User Deleted",
        message: "User has been deleted successfully.",
      });

      setShowMessagePopup(true);
    },

    onError: () => {
      setMessagePopupData({
        type: "error",
        title: "Delete Failed",
        message: "Unable to delete user.",
      });

      setShowMessagePopup(true);
    },
  });

  // Filter states
  const [activeFilter, setActiveFilter] = useState(null);

  const [selectedDepartment, setSelectedDepartment] =
    useState("All");

  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const [selectedRole, setSelectedRole] =
    useState("All");


  // Summary data
  const onlineUsers = users.filter(
    (user) => user.isOnline === true
  );

  const offlineUsers = users.filter(
    (user) => user.isOnline === false
  );

  const adminUsers = users.filter(
    (user) => user.role === "support_admin"
  );

  const normalUsers = users.filter(
    (user) => user.role === "user"
  );


  // Main filtering
  const filteredUsers = users.filter((user) => {

    // Department filter
    if (activeFilter === "department") {
      return (
        selectedDepartment === "All" ||
        user.department === selectedDepartment
      );
    }

    // Role filter
    if (activeFilter === "role") {
      return (
        selectedRole === "All" ||
        user.role === selectedRole
      );
    }
    // Status filter
    if (activeFilter === "status") {
      return (
        selectedStatus === "All" ||
        (selectedStatus === "Online" &&
          user.isOnline === true) ||
        (selectedStatus === "Offline" &&
          user.isOnline === false)
      );
    }
    return true;
  });


  //pagination 
  const itemPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / itemPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;

  const currentPageData = filteredUsers.slice(startIndex, endIndex)

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  useEffect(() => {
    if (!isError) return;

    setMessagePopupData({
      type: "error",
      title: "Users Fetch Failed",
      message: "Unable to load users. Please try again later.",
    });

    setShowMessagePopup(true);
  }, [isError]);


  return (

    <div className="flex flex-col gap-6 p-2 bg-gray-200 dark:bg-zinc-950">
      <div className="w-full flex flex-col gap-5">

        {/* Header */}
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <h1 className="font-bold md:text-2xl text-xl text-gray-900 dark:text-gray-100">Users</h1>
            <p className="md:text-sm text-xs text-gray-600 dark:text-gray-400">
              Manage employees, view details and control access to the helpdesk support system.
            </p>
          </div>

          <div className="py-2">
            <button
              onClick={() => setShowUserPopup(true)}
              className="flex items-center gap-2 border border-gray-400 rounded-lg px-4 py-2 text-white bg-indigo-600 hover:bg-violet-600 hover:border-white hover:text-white cursor-pointer"
            >
              <UserPlus size={18} className="" />
              <span className="lg:block hidden">Add User</span>
            </button>
          </div>
        </div>

        {/* User Summary Cards */}
        {isLoading ? (
          <div className="flex w-full min-w-0 flex-col gap-2 md:flex-row md:flex-nowrap md:gap-2">
            {/* Total Users Skeleton */}
            <div className="flex w-full min-w-0 animate-pulse items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 md:flex-1 md:gap-2">
              <div className="flex flex-row items-center gap-4 md:flex-col lg:flex-row">
                <div className="size-10 shrink-0 rounded-full bg-blue-200 dark:bg-blue-950" />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="h-4 w-20 rounded bg-gray-200 dark:bg-zinc-700" />
                  <div className="h-5 w-10 rounded bg-gray-200 dark:bg-zinc-700" />
                </div>
              </div>
            </div>

            {/* Online Users Skeleton */}
            <div className="flex w-full min-w-0 animate-pulse items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 md:flex-1 md:gap-2">
              <div className="flex flex-row items-center gap-4 md:flex-col lg:flex-row">
                <div className="size-10 shrink-0 rounded-full bg-green-200 dark:bg-green-950" />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="h-4 w-20 rounded bg-gray-200 dark:bg-zinc-700" />
                  <div className="h-5 w-10 rounded bg-gray-200 dark:bg-zinc-700" />
                </div>
              </div>
            </div>

            {/* Offline Users Skeleton */}
            <div className="flex w-full min-w-0 animate-pulse items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 md:flex-1 md:gap-2">
              <div className="flex flex-row items-center gap-4 md:flex-col lg:flex-row">
                <div className="size-10 shrink-0 rounded-full bg-gray-200 dark:bg-zinc-700" />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="h-4 w-20 rounded bg-gray-200 dark:bg-zinc-700" />
                  <div className="h-5 w-10 rounded bg-gray-200 dark:bg-zinc-700" />
                </div>
              </div>
            </div>

            {/* Admin Users Skeleton */}
            <div className="flex w-full min-w-0 animate-pulse items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 md:flex-1 md:gap-2">
              <div className="flex flex-row items-center gap-4 md:flex-col lg:flex-row">
                <div className="size-10 shrink-0 rounded-full bg-violet-200 dark:bg-violet-950" />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="h-4 w-20 rounded bg-gray-200 dark:bg-zinc-700" />
                  <div className="h-5 w-10 rounded bg-gray-200 dark:bg-zinc-700" />
                </div>
              </div>
            </div>

            {/* Normal Users Skeleton */}
            <div className="flex w-full min-w-0 animate-pulse items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 md:flex-1 md:gap-2">
              <div className="flex flex-row items-center gap-4 md:flex-col lg:flex-row">
                <div className="size-10 shrink-0 rounded-full bg-amber-200 dark:bg-amber-950" />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="h-4 w-20 rounded bg-gray-200 dark:bg-zinc-700" />
                  <div className="h-5 w-10 rounded bg-gray-200 dark:bg-zinc-700" />
                </div>
              </div>
            </div>
          </div>
        ) : isError ? (
          <div className="w-full flex flex-col items-center justify-center gap-2 rounded-lg border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-6 text-center">
            <p className="font-semibold text-red-600 dark:text-red-400">
              Failed to load users
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Unable to fetch user summary. Please try again later.
            </p>
          </div>
        ) : (
          <div className="flex w-full min-w-0 flex-col gap-2 md:flex-row md:flex-nowrap md:gap-2">

            {/* Total Users */}
            <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer hover:border-violet-500 hover:bg-violet-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-700 dark:hover:bg-violet-950/10 md:flex-1 md:gap-2">

              <div className="flex flex-row md:flex-col lg:flex-row gap-4 items-center ">
                <span>
                  <Users
                    className="text-blue-600 bg-blue-100 p-1.5 rounded-full"
                    size={40}
                  />
                </span>
                <div className="flex flex-col items-center justify-center text-center">
                  <h1 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Total Users</h1>
                  <h1 className="font-semibold text-lg text-blue-600">{users.length}</h1>
                </div>
              </div>
            </div>

            {/* Online Users */}
            <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer hover:border-violet-500 hover:bg-violet-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-700 dark:hover:bg-violet-950/10 md:flex-1 md:gap-2">
              <div className="flex flex-row md:flex-col lg:flex-row gap-4 items-center ">
                <span>
                  <UserCheck
                    className="text-green-600 bg-green-100 p-1.5 rounded-full"
                    size={40}
                  />
                </span>
                <div className="flex flex-col items-center justify-center text-center">
                  <h1 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Online Users</h1>
                  <h1 className="font-semibold text-lg text-green-600">{onlineUsers.length}</h1>
                </div>
              </div>
            </div>

            {/* Offline Users */}
            <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer hover:border-violet-500 hover:bg-violet-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-700 dark:hover:bg-violet-950/10 md:flex-1 md:gap-2">
              <div className="flex flex-row md:flex-col lg:flex-row gap-4 items-center ">
                <span>
                  <UserRoundX
                    className="text-gray-500 bg-gray-100 p-1.5 rounded-full"
                    size={40}
                  />
                </span>
                <div className="flex flex-col items-center justify-center text-center">
                  <h1 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Offline Users</h1>
                  <h1 className="font-semibold text-lg text-gray-500">{offlineUsers.length}</h1>
                </div>
              </div>
            </div>

            {/* Admin Users */}
            <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer hover:border-violet-500 hover:bg-violet-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-700 dark:hover:bg-violet-950/10 md:flex-1 md:gap-2">
              <div className="flex flex-row md:flex-col lg:flex-row gap-4 items-center ">
                <span>
                  <ShieldUser
                    className="text-violet-600 bg-violet-100 p-1.5 rounded-full"
                    size={40}
                  />
                </span>
                <div className="flex flex-col items-center justify-center text-center">
                  <h1 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Admins</h1>
                  <h1 className="font-semibold text-lg text-violet-600">{adminUsers.length}</h1>
                </div>
              </div>
            </div>

            {/* Normal Users */}
            <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer hover:border-violet-500 hover:bg-violet-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-700 dark:hover:bg-violet-950/10 md:flex-1 md:gap-2">
              <div className="flex flex-row md:flex-col lg:flex-row gap-4 items-center ">
                <span>
                  <User
                    className="text-amber-600 bg-amber-100 p-1.5 rounded-full"
                    size={40}
                  />
                </span>
                <div className="flex flex-col items-center justify-center text-center">
                  <h1 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Users</h1>
                  <h1 className="font-semibold text-lg text-amber-600">{normalUsers.length}</h1>
                </div>
              </div>
            </div>
          </div>
        )}
</div>

      <div className="flex w-full min-w-0 flex-col gap-3 rounded-lg border border-gray-300 bg-gray-50 px-3 py-4 text-sm dark:border-zinc-700 dark:bg-zinc-900 sm:p-4 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-3 lg:flex-nowrap">

        {/* Search */}
        <div className="flex w-full min-w-0 items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-800 md:flex-1 lg:w-1/3">
          <input
            type="text"
            placeholder="Search by name, email or department..."
            className="w-full min-w-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-0 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
          <Search className="shrink-0 text-gray-400" size={18} />
        </div>

        {/* Department */}
        <div className="flex min-w-0 items-center justify-between gap-2 rounded-lg border border-gray-300 p-2 dark:border-zinc-700 sm:justify-start">
          <label htmlFor="department" className="shrink-0 text-sm font-semibold text-gray-900 dark:text-gray-200">
            Department
          </label>

          <select
            name="department"
            id="department"
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setSelectedRole("All");
              setSelectedStatus("All");
              setActiveFilter("department");
              setCurrentPage(1);
            }}
            className="min-w-0 flex-1 cursor-pointer rounded-lg bg-white p-1 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-zinc-800 dark:text-gray-100 sm:flex-none"
          >
            <option value="All">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
            <option value="Support">Support</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex min-w-0 items-center justify-between gap-2 rounded-lg border border-gray-300 p-2 dark:border-zinc-700 sm:justify-start">
          <label htmlFor="status" className="shrink-0 text-sm font-semibold text-gray-900 dark:text-gray-200">
            Status
          </label>

          <select
            name="status"
            id="status"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setSelectedRole("All");
              setSelectedDepartment("All");
              setActiveFilter("status");
              setCurrentPage(1);
            }}
            className="min-w-0 flex-1 cursor-pointer rounded-lg bg-white p-1 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-zinc-800 dark:text-gray-100 sm:flex-none"
          >
            <option value="All">All Status</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        {/* Role */}
        <div className="flex min-w-0 items-center justify-between gap-2 rounded-lg border border-gray-300 p-2 dark:border-zinc-700 sm:justify-start">
          <label htmlFor="role" className="shrink-0 text-sm font-semibold text-gray-900 dark:text-gray-200">
            Role
          </label>

          <select
            name="role"
            id="role"
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value);
              setSelectedDepartment("All");
              setSelectedStatus("All");
              setActiveFilter("role");
              setCurrentPage(1);
            }}
            className="min-w-0 flex-1 cursor-pointer rounded-lg bg-white p-1 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-zinc-800 dark:text-gray-100 sm:flex-none"
          >
            <option value="All">All Roles</option>
            <option value="user">User</option>
            <option value="support_admin">Admin</option>
          </select>
        </div>

      </div>



     <div className="w-full min-w-0 overflow-hidden rounded-t-lg border border-gray-200 bg-gray-50 dark:border-zinc-700 dark:bg-zinc-900">
  <div className="w-full overflow-x-auto">
    <table className="w-full min-w-225 table-fixed lg:min-w-0">
      <thead>
        <tr className="bg-gray-300 text-left text-gray-900 dark:bg-zinc-800 dark:text-gray-200">
          <th className="w-[16%] px-3 py-3">Name</th>
          <th className="w-[22%] px-3 py-3">Email</th>
          <th className="w-[14%] px-3 py-3">Department</th>
          <th className="w-[11%] px-3 py-3">Role</th>
          <th className="w-[11%] px-3 py-3">Status</th>
          <th className="w-[16%] px-3 py-3">Joined On</th>
          <th className="w-[10%] px-3 py-3">Action</th>
        </tr>
      </thead>

      <tbody className="p-1.5 text-sm text-gray-800 dark:text-gray-200">
        {isLoading ? (
          <>
            {/* Skeleton Rows */}
            {[1, 2, 3].map((row) => (
              <tr
                key={row}
                className="animate-pulse border-t border-gray-200 dark:border-zinc-800"
              >
                <td className="px-3 py-3">
                  <div className="h-4 w-24 rounded bg-blue-200 dark:bg-blue-950" />
                </td>
                <td className="px-3 py-3">
                  <div className="h-4 w-36 rounded bg-green-200 dark:bg-green-950" />
                </td>
                <td className="px-3 py-3">
                  <div className="h-4 w-20 rounded bg-gray-300 dark:bg-zinc-700" />
                </td>
                <td className="px-3 py-3">
                  <div className="h-6 w-16 rounded bg-violet-200 dark:bg-violet-950" />
                </td>
                <td className="px-3 py-3">
                  <div className="h-6 w-16 rounded bg-green-200 dark:bg-green-950" />
                </td>
                <td className="px-3 py-3">
                  <div className="h-4 w-32 rounded bg-amber-200 dark:bg-amber-950" />
                </td>
                <td className="px-3 py-3">
                  <div className="h-8 w-20 rounded bg-violet-200 dark:bg-violet-950" />
                </td>
              </tr>
            ))}
          </>
        ) : isError ? (
          <tr>
            <td colSpan={7} className="px-4 py-8 text-center">
              <p className="font-semibold text-red-600 dark:text-red-400">
                Failed to load users
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Unable to fetch users. Please try again later.
              </p>
            </td>
          </tr>
        ) : currentPageData.length > 0 ? (
          currentPageData.map((user) => {
            return (
              <tr
                key={user._id}
                className="border-t border-gray-200 font-semibold hover:bg-gray-100 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
              >
                <td className="truncate px-3 py-3">{user.name}</td>

                <td className="truncate px-3 py-3" title={user.email}>
                  {user.email}
                </td>

                <td className="truncate px-3 py-3" title={user.department}>
                  {user.department}
                </td>

                <td className="px-3 py-3">
                  <span
                    className={`whitespace-nowrap rounded-md px-2 py-1 text-sm font-semibold ${
                      user.role === "support_admin"
                        ? "bg-violet-100 text-violet-600 dark:bg-zinc-700 dark:text-violet-400"
                        : "bg-blue-100 text-blue-600 dark:bg-zinc-700 dark:text-blue-400"
                    }`}
                  >
                    {user.role === "support_admin" ? "Admin" : "User"}
                  </span>
                </td>

                <td className="px-3 py-3">
                  <span
                    className={`whitespace-nowrap rounded-md px-2 py-1 text-sm ${
                      user.isOnline
                        ? "bg-green-100 text-green-600 dark:bg-zinc-700 dark:text-green-400"
                        : "bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-gray-400"
                    }`}
                  >
                    {user.isOnline ? "Online" : "Offline"}
                  </span>
                </td>

                <td className="whitespace-nowrap px-3 py-3">
                  {new Date(user.createdAt).toLocaleString()}
                </td>

                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="cursor-pointer rounded-lg border border-green-300 p-2 text-green-600 hover:bg-green-100 dark:border-green-800 dark:hover:bg-green-950/30"
                      title="View User"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => handleDeleteClick(user._id)}
                      className="cursor-pointer rounded-lg border border-red-300 p-2 text-red-600 hover:bg-red-100 dark:border-red-800 dark:hover:bg-red-950/30"
                      title="Delete User"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td
              colSpan={7}
              className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
            >
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {!isLoading && !isError && (
    <div className="m-3 flex flex-wrap items-center justify-start gap-1 font-semibold text-gray-800 dark:text-gray-200 sm:justify-end sm:m-4">
      {/* Previous Button */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer rounded-lg border border-gray-300 bg-violet-600 px-3 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700"
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          className={`cursor-pointer rounded-md border px-3 py-2 ${
            currentPage === pageNumber
              ? "border-violet-600 bg-violet-600 text-white"
              : "border-gray-300 text-gray-800 hover:bg-blue-600 hover:text-white dark:border-zinc-700 dark:text-gray-300"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={totalPages === 0 || currentPage === totalPages}
        className="cursor-pointer rounded-md border border-gray-300 bg-violet-600 px-3 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700"
      >
        &gt;
      </button>
    </div>
  )}
</div>


      {showUserPopup && (<AddUser onClose={() => setShowUserPopup(false)} />)}

      {showConfirmPopup && (
        <ConfirmPopup
          title="Delete User"
          message="Are you sure you want to delete this user?"
          confirmText="Yes, Delete"
          cancelText="No"
          onConfirm={() => {
            deleteUserMutation.mutate(selectedUserId);
          }}
          onCancel={() => {
            setShowConfirmPopup(false);
            setSelectedUserId(null);
          }}
        />
      )}

      {showMessagePopup && (
        <MessagePopup
          type={messagePopupData.type}
          title={messagePopupData.title}
          message={messagePopupData.message}
          onClose={() => {
            setShowMessagePopup(false);
          }}
        />
      )}

      {selectedUser && (
        <ViewUser
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default AdminUsers;