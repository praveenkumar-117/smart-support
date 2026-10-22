import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ChevronRight,
  Send,
  Lightbulb,
  FileText,
  CircleCheck,
  Info,
  ShieldCheck,
  CircleHelp,
} from "lucide-react";
import React, { useState } from "react";
import api from "../../api/api";
import { useSelector } from "react-redux";
import MessagePopup from "../otherComponents/MessagePopup";
import useCategories from "../../hooks/useCategories";

const CreateTicket = () => {
  const [showMessage, setShowMessage] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const {
    categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();
  const [formData, setFormData] = useState({
    subject: "",
    category: "Other",
    priority: "Low",
    description: "",
  });

  const handleSubmit = () => {
    createTicket.mutate(formData)
  }

  const queryClient = useQueryClient();

  const createTicket = useMutation({
    mutationKey: ["createTicket"],
    mutationFn: async (formData) => {
      const responseTicket = await api.post("/ticket/createticket", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return responseTicket.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["myTickets"],
      });
      setFormData({
        subject: "",
        category: "Other",
        priority: "Low",
        description: ""
      })
      setShowMessage({
        type: "success",
        title: "Tickets Created.",
        message:
          data?.message ||
          "Tickets Created Successfully.",
      });

    },

    onError: (error) => {
      console.log("Error:", error);
      console.log("Backend response:", error.response?.data);
      setShowMessage({
        type: "info",
        title: error?.message || "Tickets Not Created.",
        message:
          error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.message ||
          "Ticket generation failed.",
      });

    },
  })

  return (

    <div className="flex w-full flex-col bg-gray-200 dark:bg-black p-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm">
        <span className="text-gray-600 dark:text-zinc-400">Dashboard</span>
        <ChevronRight size={17} className="text-gray-500 dark:text-zinc-500" />
        <span className="font-medium text-gray-800 dark:text-gray-100">
          Create Ticket
        </span>
      </div>

      {/* Hero Section */}
      <div className="mt-4 flex items-center rounded-xl bg-linear-to-br from-violet-300 to-indigo-400 dark:from-violet-950 dark:to-indigo-700 p-4">
        <div className="flex w-1/2 flex-col gap-2">
          <h1 className="text-lg md:text-xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Create New Ticket
          </h1>
          <p className=" text-xs md:text-sm lg:text-xl font-medium text-gray-700 dark:text-zinc-300">
            Fill in the details to raise new support request.
          </p>
        </div>

        <div className="flex w-1/2 justify-center">
          <img
            src="/create.png"
            alt="Create a support ticket"
            className="h-24 w-36 md:h-30 md:w-43.75 object-contain"
          />
        </div>
      </div>

      {/* Form and Tips */}
      <div className="flex flex-col lg:flex-row w-full items-start gap-3 p-4">
        {/* Ticket Form */}
        <div className="w-full lg:w-2/3 flex min-w-0 flex-1 flex-col gap-4 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-4">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="ticket-subject"
              className="text-sm font-semibold text-gray-800 dark:text-gray-200"
            >
              Subject
            </label>

            <input
              id="ticket-subject"
              type="text"
              value={formData.subject}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  subject: e.target.value,
                });
              }}
              required
              placeholder="Enter title for your issue"
              className="w-full rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950"
            />
          </div>

          {/* Category and Priority */}
          <div className="flex w-full gap-4">
            <div className="flex w-1/2 flex-col gap-2">
              <label
                htmlFor="category"
                className="text-sm font-semibold text-gray-800 dark:text-gray-200"
              >
                Category
              </label>

              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  });
                }}
                required
                disabled={isCategoriesLoading || isCategoriesError}
                className="w-full cursor-pointer rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-2 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-indigo-500 disabled:cursor-not-allowed"
              >
                {isCategoriesLoading ? (
                  <option value="">Loading categories...</option>
                ) : isCategoriesError ? (
                  <option value="">Failed to load categories</option>
                ) : (
                  categories.map((category) => (
                    <option
                      key={category._id}
                      value={category.name}
                      className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100"
                    >
                      {category.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="flex w-1/2 flex-col gap-2">
              <label
                htmlFor="priority"
                className="text-sm font-semibold text-gray-800 dark:text-gray-200"
              >
                Priority
              </label>

              <select
                name="priority"
                id="priority"
                required
                value={formData.priority}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    priority: e.target.value,
                  });
                }}
                className="w-full cursor-pointer rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-2 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-indigo-500"
              >
                <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100" value="Low">● Low</option>
                <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100" value="Medium">● Medium</option>
                <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100" value="High">● High</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="ticket-description"
              className="text-sm font-semibold text-gray-800 dark:text-gray-200"
            >
              Description
            </label>

            <textarea
              id="ticket-description"
              required
              placeholder="Describe your issue here"
              value={formData.description}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  description: e.target.value,
                });
              }}
              maxLength={1000}
              className="h-40 resize-none rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950"
            />

            <p className="text-right text-xs text-gray-500 dark:text-zinc-400">
              Maximum 1000 characters
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 dark:border-zinc-700 pt-4">
            <button
              type="button"
              className="cursor-pointer rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 transition hover:border-red-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="flex cursor-pointer items-center gap-2 rounded-lg border hover:border-indigo-600 hover:bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition border-violet-700 bg-violet-700"
            >
              <Send size={17} />
              Submit
            </button>
          </div>
        </div>

        {/* Tips Sidebar */}
        <div className="w-full flex lg:w-1/3 shrink-0 flex-col gap-4 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-3">
          <div className="flex items-center gap-2">
            <Lightbulb
              className="shrink-0 rounded-full bg-amber-100 dark:bg-amber-950 p-2 text-amber-600 dark:text-amber-400"
              size={40}
            />
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              Tips Before You Submit
            </h2>
          </div>

          {/* Search First */}
          <div className="flex items-start gap-3">
            <FileText
              className="shrink-0 rounded-full bg-violet-100 dark:bg-violet-950 p-2 text-violet-600 dark:text-violet-400"
              size={44}
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Search First
              </h3>
              <p className="text-xs leading-4 text-gray-600 dark:text-zinc-400">
                Check the knowledge base for quick solutions to common issues.
              </p>
            </div>
          </div>

          {/* Be Specific */}
          <div className="flex items-start gap-3">
            <CircleCheck
              className="shrink-0 rounded-full bg-green-100 dark:bg-green-950 p-2 text-green-600 dark:text-green-400"
              size={44}
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Be Specific
              </h3>
              <p className="text-xs leading-4 text-gray-600 dark:text-zinc-400">
                Clearly describe the issue and provide relevant details.
              </p>
            </div>
          </div>

          {/* Add Details */}
          <div className="flex items-start gap-3">
            <Info
              className="shrink-0 rounded-full bg-sky-100 dark:bg-sky-950 p-2 text-sky-600 dark:text-sky-400"
              size={44}
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Add Details
              </h3>
              <p className="text-xs leading-4 text-gray-600 dark:text-zinc-400">
                Include error messages, device details, or steps you have already tried.
              </p>
            </div>
          </div>

          {/* Keep It Safe */}
          <div className="flex items-start gap-3">
            <ShieldCheck
              className="shrink-0 rounded-full bg-orange-100 dark:bg-orange-950 p-2 text-orange-600 dark:text-orange-400"
              size={44}
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Keep It Safe
              </h3>
              <p className="text-xs leading-4 text-gray-600 dark:text-zinc-400">
                Never share passwords or other sensitive information in your ticket.
              </p>
            </div>
          </div>

          {/* Immediate Help */}
          <div className="rounded-lg border border-violet-200 dark:border-violet-900 bg-violet-50 dark:bg-violet-950/30 p-3">
            <div className="flex items-center gap-2">
              <CircleHelp
                className="shrink-0 rounded-full bg-violet-200 dark:bg-violet-900 p-2 text-violet-700 dark:text-violet-300"
                size={38}
              />
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                Need Immediate Help?
              </h3>
            </div>

            <p className="mt-2 text-xs leading-5 text-gray-700 dark:text-zinc-300">
              Contact our support team at{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                support@helpticket.com
              </span>{" "}
              or call at{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                1800 1147 7412
              </span>
            </p>
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

export default CreateTicket;
