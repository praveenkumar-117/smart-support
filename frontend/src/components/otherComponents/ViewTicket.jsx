import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import {
  X,
  Ticket,
  UserRound,
  CalendarDays,
  Clock,
  CircleDot,
  Flag,
  Tag,
  Pencil,
  FileText,
  CircleAlert,
} from "lucide-react";

const statusOptions = ["Open", "In Progress", "Pending", "Resolved"];

const ViewTicket = ({ ticket, onClose }) => {
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "support_admin";
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState("");
  const [resolutionNote, setResolutionNote] = useState("");
  const [formError, setFormError] = useState("");

  const updateMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await api.patch(
        `/ticket/updateticket/${ticket._id}`,
        payload
      );
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["backendTickets"] });
      queryClient.invalidateQueries({ queryKey: ["myTickets"] });
      onClose();
    },

    onError: (error) => {
      setFormError(
        error.response?.data?.message ||
          (error.request
            ? "Cannot reach the server. Please check your connection."
            : error.message) ||
          "Unable to update ticket. Please try again."
      );
    },
  });

  const handleEdit = () => {
    setStatus(ticket.status);
    setResolutionNote(ticket.resolutionNote || "");
    setFormError("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormError("");
  };

  const handleSave = () => {
    const note = resolutionNote.trim();

    if (status === "Resolved" && !note) {
      setFormError("Resolution note is required when resolving a ticket.");
      return;
    }

    setFormError("");
    updateMutation.mutate({ newStatus: status, resolutionNote: note });
  };

  if (!ticket) return null;

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString();
  };

  const formatShortDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const statusColors = {
    Open: "text-orange-700",
    "In Progress": "text-sky-700",
    Pending: "text-yellow-700",
    Resolved: "text-green-700",
  };

  const priorityColors = {
    Low: "text-green-700",
    Medium: "text-yellow-700",
    High: "text-red-700",
  };

  const detailCards = [
    {
      title: "Status",
      value: ticket.status,
      Icon: CircleDot,
      iconBg: "bg-sky-200",
      iconColor: "text-sky-700",
      valueColor: statusColors[ticket.status] || "text-gray-700",
    },
    {
      title: "Priority",
      value: ticket.priority,
      Icon: Flag,
      iconBg: "bg-orange-200",
      iconColor: "text-orange-700",
      valueColor: priorityColors[ticket.priority] || "text-gray-700",
    },
    {
      title: "Category",
      value: ticket.category,
      Icon: Tag,
      iconBg: "bg-indigo-200",
      iconColor: "text-indigo-700",
      valueColor: "text-indigo-700",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-3">
      <div className="flex max-h-[calc(100dvh-1rem)] w-4/5 lg:w-full max-w-2xl flex-col overflow-y-auto rounded-xl bg-gray-50 shadow-xl dark:bg-zinc-900 sm:max-h-[calc(100dvh-3rem)]">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-200 bg-gray-200 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800 sm:px-5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-200 dark:bg-cyan-950">
              <Ticket size={21} className="text-cyan-700 dark:text-cyan-300" />
            </span>

            <div className="min-w-0">
              <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 sm:text-lg">
                Ticket Details
              </h2>

              <p className="break-all text-sm text-violet-600 dark:text-violet-400">
                {ticket.ticketId}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={updateMutation.isPending}
            className="shrink-0 cursor-pointer rounded-md p-1.5 text-gray-500 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-400"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Ticket Information */}
        {updateMutation.isPending ? (
          <div
            className="flex flex-col gap-3 p-3 sm:gap-2.5 sm:p-4"
            aria-busy="true"
          >
            <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-800" />

            <div className="flex w-full gap-2 sm:gap-2.5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-16 min-w-0 flex-1 animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-800"
                />
              ))}
            </div>

            <div className="h-32 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-800" />
            <div className="h-24 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-800" />

            <div className="flex gap-2.5">
              <div className="h-24 min-w-0 flex-1 animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-800" />

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="h-11 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-800" />
                <div className="h-11 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-800" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 p-3 sm:gap-2.5 sm:p-4">

            {/* Error banner */}
            {formError && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300 sm:text-sm"
              >
                <CircleAlert size={16} className="mt-0.5 shrink-0" />
                <p className="min-w-0 wrap-break-words">{formError}</p>
              </div>
            )}

            {/* Subject */}
            <div className="flex min-w-0 flex-col gap-1 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800 sm:flex-row sm:items-start sm:gap-2">
              <p className="shrink-0 text-xs font-medium text-gray-500 dark:text-zinc-400">
                Subject:
              </p>

              <h3 className="min-w-0 wrap-break-words text-sm font-semibold text-gray-800 dark:text-gray-100">
                {ticket.subject}
              </h3>
            </div>

            {/* Status, Priority and Category */}
            <div className="flex w-full gap-2 sm:gap-2.5">
              {detailCards.map(
                ({ title, value, Icon, iconBg, iconColor, valueColor }) => (
                  <div
                    key={title}
                    className="flex min-w-0 flex-1 flex-col md:flex-row items-start gap-2 rounded-lg border border-gray-200 bg-gray-100 px-2 py-2.5 dark:border-zinc-700 dark:bg-zinc-800 sm:gap-2.5 sm:px-3 sm:py-3"
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${iconBg}`}
                    >
                      <Icon size={15} className={iconColor} />
                    </span>

                    <div className="flex w-full min-w-0 flex-col items-start gap-1">
                      <p className="w-full text-xs font-medium leading-4 text-gray-500 dark:text-zinc-400">
                        {title}
                      </p>

                      {title === "Status" && isEditing ? (
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full min-w-0 cursor-pointer rounded-md border border-gray-300 bg-white px-1.5 py-1 text-sm font-semibold text-gray-800 dark:border-zinc-600 dark:bg-zinc-900 dark:text-gray-100"
                        >
                          {statusOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p
                          className={`w-full wrap-break-words text-sm font-semibold leading-5 ${valueColor}`}
                        >
                          {value || "N/A"}
                        </p>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Description */}
            <div className="flex min-w-0 flex-col">
              <h3 className="mb-1.5 text-sm font-semibold text-gray-800 dark:text-gray-100">
                Description
              </h3>

              <div className="max-h-[35vh] min-h-24 overflow-y-auto whitespace-pre-wrap wrap-break-words rounded-lg border border-gray-200 bg-gray-100 p-3 text-xs md:text-sm leading-6 text-gray-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 sm:max-h-[40vh] sm:min-h-32">
                {ticket.description || "No description available."}
              </div>
            </div>

            {/* Resolution Note */}
            {(isEditing ||
              ticket.resolutionNote ||
              ticket.status === "Resolved") && (
              <div className="flex min-w-0 flex-col">
                <div className="mb-1.5 flex min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1">
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 dark:text-gray-100">
                    <FileText size={15} />
                    Resolution Note
                    {isEditing && status === "Resolved" && (
                      <span className="text-red-600">*</span>
                    )}
                  </h3>

                  {!isEditing && ticket.resolvedAt && (
                    <p className="min-w-0 text-xs text-gray-500 dark:text-zinc-400">
                      Resolved on {formatShortDate(ticket.resolvedAt)}
                    </p>
                  )}
                </div>

                {isEditing ? (
                  <textarea
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                    rows={4}
                    maxLength={1000}
                    placeholder="Explain how the issue was resolved..."
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-xs leading-6 text-gray-800 outline-none focus:border-violet-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 md:text-sm"
                  />
                ) : (
                  <div className="max-h-[25vh] overflow-y-auto whitespace-pre-wrap wrap-break-words rounded-lg border border-green-200 bg-green-50 p-3 text-xs leading-6 text-gray-700 dark:border-green-900 dark:bg-green-950/30 dark:text-zinc-200 md:text-sm">
                    {ticket.resolutionNote || "No resolution note provided."}
                  </div>
                )}
              </div>
            )}

            {/* Created By and Dates */}
            <div className="flex gap-2.5 sm:flex-row">

              {/* Created By */}
              <div className="flex min-w-0 flex-1 flex-col rounded-lg border border-gray-200 bg-gray-100 p-2.5 dark:border-zinc-700 dark:bg-zinc-800">
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-violet-200 dark:bg-violet-950">
                    <UserRound size={16} className="text-violet-700 dark:text-violet-300" />
                  </span>

                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    Created By
                  </h3>
                </div>

                <p className="wrap-break-words text-sm font-medium text-gray-700 dark:text-zinc-200">
                  {ticket.createdBy?.name || "Unknown User"}
                </p>

                <p className="mt-0.5 break-all text-sm text-gray-500 dark:text-zinc-400">
                  {ticket.createdBy?.email || "No email available"}
                </p>
              </div>

              {/* Dates */}
              <div className="flex min-w-0 flex-1 flex-col gap-2">

                <div className="flex min-w-0 items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 p-2 dark:border-zinc-700 dark:bg-zinc-800">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-200 dark:bg-green-950">
                    <CalendarDays size={15} className="text-green-700 dark:text-green-300" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 dark:text-zinc-400">
                      Created On
                    </p>

                    <p className="wrap-break-words text-xs font-medium text-gray-700 dark:text-zinc-200">
                      {formatDate(ticket.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 p-2 dark:border-zinc-700 dark:bg-zinc-800">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-orange-200 dark:bg-orange-950">
                    <Clock size={15} className="text-orange-700 dark:text-orange-300" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 dark:text-zinc-400">
                      Last Updated
                    </p>

                    <p className="wrap-break-words text-xs font-medium text-gray-700 dark:text-zinc-200">
                      {formatDate(ticket.updatedAt)}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex shrink-0 justify-end gap-2 border-t border-gray-200 bg-gray-200 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                disabled={updateMutation.isPending}
                className="cursor-pointer rounded-lg bg-gray-400 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-500 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={updateMutation.isPending}
                className="cursor-pointer rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
              >
                {updateMutation.isPending ? "Saving..." : "Save"}
              </button>
            </>
          ) : (
            <>
              {isAdmin && ticket.status !== "Resolved" && (
                <button
                  onClick={handleEdit}
                  className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-sky-600 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  <Pencil size={14} />
                  Edit
                </button>
              )}

              <button
                onClick={onClose}
                className="cursor-pointer rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700"
              >
                Close
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default ViewTicket;
