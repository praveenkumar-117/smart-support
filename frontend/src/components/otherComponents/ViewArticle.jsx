
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  CalendarDays,
  Eye,
  FileText,
  Folder,
  X,
} from "lucide-react";
import React from "react";
import IsLoading from "./IsLoading";
import IsError from "./IsError";
import api from "../../api/api";

const ViewArticle = ({ onClose, articleId }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["backendArticle", articleId],

    queryFn: async () => {
      const response = await api.get(`/knowledge/articles/${articleId}`);

      return response.data;
    },

    // staleTime: 5 * 60 * 1000,
    // gcTime: 10 * 60 * 1000,
    // refetchOnWindowFocus: true,
  });

  const article = data?.articleData;

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError />;
  }

  return (
   
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6">
  {/* Popup */}
    <div className="flex max-h-[85dvh] w-4/5 md:w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-gray-50 shadow-xl dark:bg-zinc-900">
    {/* Header */}
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-200 bg-gray-200 px-3 py-3 dark:border-zinc-700 dark:bg-zinc-800 sm:px-5">
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-200 dark:bg-blue-950">
          <BookOpen size={21} className="text-blue-700 dark:text-blue-300" />
        </span>

        <h2 className="truncate text-base font-bold text-gray-800 dark:text-gray-100 sm:text-lg">
          Article Details
        </h2>
      </div>

      <button
        onClick={onClose}
        className="shrink-0 cursor-pointer rounded-md p-1.5 text-gray-500 hover:bg-red-600 hover:text-white dark:text-zinc-400"
        title="Close"
      >
        <X size={20} />
      </button>
    </div>

    {/* Content */}
    <div className="flex min-h-0 flex-col gap-3 overflow-y-auto p-3 sm:gap-4 sm:p-4">

      {/* Article Title */}
      <div className="flex flex-col gap-1 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800">
        <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">
          Article Title
        </p>

        <h2 className="wrap-break-word text-base font-semibold text-gray-800 dark:text-gray-100">
          {article?.title}
        </h2>
      </div>

      {/* Article Info */}
      <div className="flex  gap-3 ">

        {/* Category */}
        <div className="w-[32%] flex min-w-0 flex-col gap-1.5 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex items-center gap-1.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sky-200 dark:bg-sky-950">
              <Folder size={15} className="text-sky-700 dark:text-sky-300" />
            </span>


            <p className="text-xs md:text-sm  font-medium text-gray-500 dark:text-zinc-400">
              Category
            </p>
          </div>

          <p className="wrap-break-word pl-1 text-xs md:text-sm  font-semibold text-gray-700 dark:text-zinc-200">
            {article?.category}
          </p>
        </div>

        {/* Visibility */}
        <div className="w-[32%] flex min-w-0 flex-col gap-1.5 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex items-center gap-1.5">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                article?.visibility === "Published"
                  ? "bg-green-200 dark:bg-green-950"
                  : "bg-orange-200 dark:bg-orange-950"
              }`}
            >
              <Eye
                size={15}
                className={
                  article?.visibility === "Published"
                    ? "text-green-700 dark:text-green-300"
                    : "text-orange-700 dark:text-orange-300"
                }
              />
            </span>

            <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-zinc-400">
              Visibility
            </p>
          </div>

          <p
            className={`wrap-break-word pl-1 text-xs md:text-sm  font-semibold ${
              article?.visibility === "Published"
                ? "text-green-700 dark:text-green-400"
                : "text-orange-700 dark:text-orange-400"
            }`}
          >
            {article?.visibility}
          </p>
        </div>

        {/* Updated On */}
        <div className="w-[32%] flex min-w-0 flex-col gap-1.5 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-1.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-amber-200 dark:bg-amber-950">
              <CalendarDays
                size={15}
                className="text-amber-700 dark:text-amber-300"
              />
            </span>

            <p className="text-xs md:text-sm  font-medium text-gray-500 dark:text-zinc-400">
              Updated On
            </p>
          </div>

          <p className="wrap-break-word pl-1 text-xs md:text-sm  font-semibold text-gray-700 dark:text-zinc-200">
            {article?.updatedAt
              ? new Date(article.updatedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <div className="flex min-h-0 flex-col">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-violet-200 dark:bg-violet-950">
            <FileText
              size={16}
              className="text-violet-700 dark:text-violet-300"
            />
          </span>

          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            Article Content
          </h3>
        </div>

        <div className="min-h-40 max-h-[40vh] flex-1 overflow-y-auto rounded-lg border border-gray-200 bg-gray-100 p-3 dark:border-zinc-700 dark:bg-zinc-800 sm:max-h-[45vh] sm:p-4">
          <p className="whitespace-pre-line wrap-break-word text-sm leading-6 text-gray-700 dark:text-zinc-200">
            {article?.content}
          </p>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="flex shrink-0 justify-end border-t border-gray-200 bg-gray-200 px-3 py-3 dark:border-zinc-700 dark:bg-zinc-800 sm:px-4">
      <button
        onClick={onClose}
        className="w-full cursor-pointer rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700 sm:w-auto"
      >
        Close
      </button>
    </div>
  </div>
</div>

  );
};

export default ViewArticle;
