import {
  BookOpen,
  CheckCircle,
  Clock3,
  Eye,
  FileText,
  Folder,
  Pencil,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  ListChecks,
  EyeIcon,
} from "lucide-react";

import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import AddCategory from "../otherComponents/AddCategory";
import AddArticle from "../otherComponents/AddArticle";
import ConfirmPopup from "../otherComponents/ConfirmPopup";
import MessagePopup from "../otherComponents/MessagePopup";
import ViewArticle from "../otherComponents/ViewArticle";
import useCategories from "../../hooks/useCategories";
import { getCategoryStyle } from "../../config/categoryUtils";

const AdminKB = () => {
  const navigate = useNavigate();
  const [messagePopupData, setMessagePopupData] = useState({
    type: "success",
    title: "",
    message: "",
  });
  const [showViewArticle, setShowViewArticle] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [showArticlePopup, setShowArticlePopup] = useState(false);
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedArticleId, setSelectedArticleId] = useState(null)

  const {
    categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["backendArticle"],

    queryFn: async () => {
      const response = await api.get("/knowledge/articles");

      return response.data;
    },

    // staleTime: 5 * 60 * 1000,
    // gcTime: 10 * 60 * 1000,
    // refetchOnWindowFocus: true,
  });

  const articles = data?.allArticles || [];

  useEffect(() => {
    if (isError) {
      setMessagePopupData({
        type: "error",
        title: "Failed to Load Articles",
        message: "Unable to fetch knowledge base articles. Please try again.",
      });

      setShowMessagePopup(true);
    }
  }, [isError]);


  const getCategoryArticleCount = (categoryName) =>
    articles.filter(
      (article) =>
        article.category?.toLowerCase() === categoryName.toLowerCase()
    ).length;

  const publishedArticles = articles.filter(
    (article) => article.visibility === "Published"
  );

  const draftArticles = articles.filter(
    (article) => article.visibility === "Draft"
  );

  // Filter states
  const [activeFilter, setActiveFilter] = useState(null);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedVisibility, setSelectedVisibility] =
    useState("All");


  let filteredData = articles;

  if (activeFilter === "category") {
    filteredData = selectedCategory === "All" ? articles
      : articles.filter(
        (article) =>
          article.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
  }

  if (activeFilter === "visibility") {
    filteredData = selectedVisibility === "All" ? articles
      : articles.filter((article) => article.visibility === selectedVisibility)
  }

  if (selectedSort === "newest") {
    filteredData = [...filteredData].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
  }

  if (selectedSort === "oldest") {
    filteredData = [...filteredData].sort(
      (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
    );
  }

  const itemPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentPageData = filteredData.slice(startIndex, endIndex)
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handleDelete = (articleId) => {
    setSelectedArticleId(articleId);
    setShowConfirmPopup(true);
  };

  const queryClient = useQueryClient();

  const deleteArticleMutation = useMutation({
    mutationFn: async (articleId) => {
      const response = await api.delete(
        `/knowledge/deletearticle/${articleId}`
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["backendArticle"],
      });

      setShowConfirmPopup(false);
      setSelectedArticleId(null);
      setMessagePopupData({
        type: "success",
        title: "Article Deleted",
        message: "Article has been deleted successfully.",
      });

      setShowMessagePopup(true);
      setActiveFilter(null)

    },

    onError: (error) => {
      setMessagePopupData({
        type: "error",
        title: "Delete Failed",
        message: error.response?.data?.message || "Unable to delete article.",
      });

      setShowMessagePopup(true);
    },
  });

  const handleView = (articleId) => {
    setSelectedArticleId(articleId);
    setShowViewArticle(true);
  };


  return (
    <div className="flex flex-col gap-6 p-2 bg-gray-200 dark:bg-zinc-950">
      {/* Header */}

      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-bold lg:text-2xl md:text-xl text-gray-900 dark:text-gray-100">
            Knowledge Base Management
          </h1>

          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Create and manage help articles to assist users and
            reduce support tickets.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowCategoryPopup(true)}
            className="flex items-center gap-2 border border-violet-600 rounded-lg px-4  py-1 md:py-2 text-white bg-violet-600 hover:bg-blue-600 cursor-pointer"
          >
            <Folder size={19} />
            <span className="lg:block hidden">Add Category</span>
          </button>

          <button
            onClick={() => setShowArticlePopup(true)}
            className="flex items-center gap-2 border border-violet-600 rounded-lg px-4 py-2 text-white bg-violet-600 hover:bg-blue-600 cursor-pointer"
          >
            <FileText size={19} />
            <span className="lg:block hidden">Add Article</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="flex w-full min-w-0 flex-col gap-2 md:flex-row md:flex-nowrap md:gap-2">

        {isLoading ? (
          <>
            {/* Total Articles Skeleton */}
            <div className="flex items-center gap-4 border border-gray-300 dark:border-zinc-700 rounded-lg p-4 bg-gray-50 dark:bg-zinc-900 animate-pulse">
              <div className="p-3 rounded-xl bg-blue-200 dark:bg-blue-950">
                <div className="w-8 h-8 rounded-lg bg-blue-300 dark:bg-blue-900" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="h-4 w-28 rounded bg-blue-200 dark:bg-blue-950" />
                <div className="h-7 w-12 rounded bg-blue-200 dark:bg-blue-950" />
              </div>
            </div>

            {/* Categories Skeleton */}
            <div className="flex items-center gap-4 border border-gray-300 dark:border-zinc-700 rounded-lg p-4 bg-gray-50 dark:bg-zinc-900 animate-pulse">
              <div className="p-3 rounded-xl bg-orange-200 dark:bg-orange-950">
                <div className="w-8 h-8 rounded-lg bg-orange-300 dark:bg-orange-900" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 rounded bg-orange-200 dark:bg-orange-950" />
                <div className="h-7 w-12 rounded bg-orange-200 dark:bg-orange-950" />
              </div>
            </div>

            {/* Published Skeleton */}
            <div className="flex items-center gap-4 border border-gray-300 dark:border-zinc-700 rounded-lg p-4 bg-gray-50 dark:bg-zinc-900 animate-pulse">
              <div className="p-3 rounded-xl bg-green-200 dark:bg-green-950">
                <div className="w-8 h-8 rounded-lg bg-green-300 dark:bg-green-900" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 rounded bg-green-200 dark:bg-green-950" />
                <div className="h-7 w-12 rounded bg-green-200 dark:bg-green-950" />
              </div>
            </div>

            {/* Drafts Skeleton */}
            <div className="flex items-center gap-4 border border-gray-300 dark:border-zinc-700 rounded-lg p-4 bg-gray-50 dark:bg-zinc-900 animate-pulse">
              <div className="p-3 rounded-xl bg-violet-200 dark:bg-violet-950">
                <div className="w-8 h-8 rounded-lg bg-violet-300 dark:bg-violet-900" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="h-4 w-20 rounded bg-violet-200 dark:bg-violet-950" />
                <div className="h-7 w-12 rounded bg-violet-200 dark:bg-violet-950" />
              </div>
            </div>
          </>
        ) : isError ? (
          /* Error State */
          <div className="col-span-full flex flex-col items-center justify-center gap-2 rounded-lg border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-6 text-center">
            <p className="font-semibold text-red-600 dark:text-red-400">
              Unable to load article summary
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please check your connection and try again.
            </p>
          </div>
        ) : (
          <>
            {/* Total Articles */}
            <div className="flex lg:flex-row md:flex-col md:w-1/4 w-full min-w-0 items-center lg:justify-start md:justify-between gap-4  bg-gray-50 dark:bg-zinc-900  border border-gray-300 dark:border-zinc-700 rounded-lg p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-200 dark:hover:bg-blue-950/10 hover:border-blue-500">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <BookOpen size={32} />
              </div>

              <div className="flex flex-col items-center">
                <h1 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Total Articles
                </h1>

                <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  {articles.length}
                </p>
              </div>
            </div>

            {/* Categories */}
            <div className="flex lg:flex-row md:flex-col md:w-1/4 w-full min-w-0 items-center lg:justify-start md:justify-between gap-4 border border-gray-300 dark:border-zinc-700 rounded-lg p-4 bg-gray-50 dark:bg-zinc-900 hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-200 dark:hover:bg-orange-950/10 hover:border-orange-500">
              <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-500 dark:text-orange-400">
                <Folder size={32} />
              </div>

              <div className="flex flex-col items-center">
                <h1 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Categories
                </h1>

                <p className="text-2xl font-semibold text-orange-500 dark:text-orange-400">
                  {categories.length}
                </p>
              </div>
            </div>

            {/* Published */}
            <div className="flex lg:flex-row md:flex-col md:w-1/4 w-full min-w-0 items-center lg:justify-start md:justify-between gap-4 border border-gray-300 dark:border-zinc-700 rounded-lg p-4 bg-gray-50 dark:bg-zinc-900 hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-950/10 hover:border-green-500">
              <div className="p-3 rounded-xl bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400">
                <CheckCircle size={32} />
              </div>

              <div className="flex flex-col items-center">
                <h1 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Published
                </h1>

                <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                  {publishedArticles.length}
                </p>
              </div>
            </div>

            {/* Drafts */}
            <div className="flex lg:flex-row md:flex-col md:w-1/4 w-full min-w-0 items-center  lg:justify-start md:justify-between gap-4 border border-gray-300 dark:border-zinc-700 rounded-lg p-4 bg-gray-50 dark:bg-zinc-900 hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out hover:bg-violet-200 dark:hover:bg-violet-950/10 hover:border-violet-500">
              <div className="p-3 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400">
                <Clock3 size={32} />
              </div>

              <div className="flex flex-col items-center">
                <h1 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Drafts
                </h1>

                <p className="text-2xl font-semibold text-violet-600 dark:text-violet-400">
                  {draftArticles.length}
                </p>
              </div>
            </div>
          </>
        )}

      </div>

      {/* Categories + Articles */}
      <div className="flex flex-col lg:flex-row gap-3">

        {/* Categories */}
        <div className="lg:w-[30%] border border-gray-200 dark:border-zinc-700 rounded-lg bg-gray-200 dark:bg-zinc-900 overflow-hidden">

          {isLoading || isCategoriesLoading ? (
            /* Loading Skeleton */
            <>
              <div className="flex items-center justify-between p-4 bg-gray-300 dark:bg-zinc-800 border-b border-gray-300 dark:border-zinc-700 animate-pulse">
                <div className="h-6 w-28 rounded bg-gray-400 dark:bg-zinc-700" />
                <div className="h-9 w-9 rounded-lg bg-violet-300 dark:bg-violet-950" />
              </div>

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 animate-pulse"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-200 dark:bg-blue-950" />

                    <div className="space-y-2">
                      <div className="h-4 w-28 rounded bg-gray-300 dark:bg-zinc-700" />
                      <div className="h-3 w-16 rounded bg-gray-200 dark:bg-zinc-800" />
                    </div>
                  </div>

                  <div className="h-5 w-3 rounded bg-gray-300 dark:bg-zinc-700" />
                </div>
              ))}
            </>
          ) : isError || isCategoriesError ? (
            /* Error State */
            <div className="flex flex-col items-center justify-center gap-2 p-6 text-center min-h-48">
              <p className="font-semibold text-red-600 dark:text-red-400">
                Failed to load categories
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Unable to fetch categories. Please try again.
              </p>
            </div>
          ) : (
            <>
              {/* Category Header */}
              <div className="flex items-center justify-between p-4 bg-gray-300 dark:bg-zinc-800 border-b border-gray-300 dark:border-zinc-700">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  Categories
                </h2>

                <button
                  onClick={() => setShowCategoryPopup(true)}
                  className="p-2 rounded-lg bg-violet-600 text-white hover:bg-blue-600 cursor-pointer"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Category List */}
              <div>
                <div
                  onClick={() => {
                    setSelectedCategory("All");
                    setActiveFilter("category");
                    setSelectedVisibility("All");
                    setCurrentPage(1);
                  }}
                  className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 hover:bg-blue-50 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-950 text-yellow-500 dark:text-yellow-400">
                      <ListChecks size={23} />
                    </span>

                    <div>
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                        All Category
                      </h3>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {articles.length}
                      </p>
                    </div>
                  </div>

                  <span className="text-gray-500 dark:text-gray-400 text-lg cursor-pointer">
                    ⋮
                  </span>
                </div>

                {/* Individual Categories */}
                {categories.map((category) => {
                  const categoryArticleCount = getCategoryArticleCount(
                    category.name
                  );

                  const { icon: Icon, badge } = getCategoryStyle(category.icon);

                  return (
                    <div
                      key={category._id}
                      onClick={() => {
                        setSelectedCategory(category.name);
                        setActiveFilter("category");
                        setSelectedVisibility("All");
                        setCurrentPage(1);
                      }}
                      className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 hover:bg-blue-50 dark:hover:bg-zinc-800 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`p-2 rounded-lg ${badge}`}>
                          <Icon size={23} />
                        </span>

                        <div>
                          <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                            {category.name}
                          </h3>

                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {categoryArticleCount}{" "}
                            {categoryArticleCount === 1 ? "article" : "articles"}
                          </p>
                        </div>
                      </div>

                      <span className="text-gray-500 dark:text-gray-400 text-lg cursor-pointer">
                        ⋮
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Articles */}
        <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-zinc-700 dark:bg-zinc-900">

          {isLoading ? (
            <>
              {/* Article Header Skeleton */}
              <div className="flex animate-pulse flex-col gap-3 border-b border-gray-200 bg-gray-300 p-3 dark:border-zinc-700 dark:bg-zinc-800 sm:flex-row sm:items-center sm:justify-between sm:p-4">
                <div className="h-6 w-36 rounded bg-gray-400 dark:bg-zinc-700" />

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="h-10 min-w-0 flex-1 rounded-lg bg-gray-200 dark:bg-zinc-700 sm:w-56 sm:flex-none" />
                  <div className="h-10 w-24 rounded-lg bg-gray-200 dark:bg-zinc-700 sm:w-28" />
                  <div className="h-10 w-24 rounded-lg bg-gray-200 dark:bg-zinc-700 sm:w-28" />
                </div>
              </div>

              {/* Table Skeleton - Horizontal Scroll on Small Screens */}
              <div className="w-full overflow-x-auto">
                <div className="min-w-175">
                  {/* Table Header */}
                  <div className="grid grid-cols-[6%_40%_15%_15%_24%] gap-2 border-b border-gray-200 bg-gray-100 p-3 dark:border-zinc-700 dark:bg-zinc-800">
                    {["Sr. No.", "Title", "Status", "Updated On", "Actions"].map(
                      (heading) => (
                        <div
                          key={heading}
                          className="text-sm font-semibold text-gray-600 dark:text-gray-400"
                        >
                          {heading}
                        </div>
                      )
                    )}
                  </div>

                  {/* Article Row Skeletons */}
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="grid animate-pulse grid-cols-[6%_40%_15%_15%_24%] items-center gap-2 border-b border-gray-200 p-3 dark:border-zinc-700"
                    >
                      {/* Sr. No. */}
                      <div className="h-4 w-5 rounded bg-gray-300 dark:bg-zinc-700" />

                      {/* Title and Content */}
                      <div className="space-y-2 pr-2">
                        <div className="h-4 w-3/4 rounded bg-blue-200 dark:bg-blue-950" />
                        <div className="h-3 w-full rounded bg-gray-200 dark:bg-zinc-800" />
                        <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-zinc-800" />
                      </div>

                      {/* Status */}
                      <div className="h-6 w-20 rounded-md bg-green-200 dark:bg-green-950" />

                      {/* Updated On */}
                      <div className="h-4 w-20 rounded bg-amber-200 dark:bg-amber-950" />

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-green-200 dark:bg-green-950" />
                        <div className="h-9 w-9 rounded-lg bg-indigo-200 dark:bg-indigo-950" />
                        <div className="h-9 w-9 rounded-lg bg-red-200 dark:bg-red-950" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Skeleton */}
              <div className="flex animate-pulse flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
                <div className="h-4 w-48 max-w-full rounded bg-gray-300 dark:bg-zinc-700" />

                <div className="flex flex-wrap items-center gap-2">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-9 w-9 rounded-lg bg-violet-200 dark:bg-violet-950"
                    />
                  ))}
                </div>
              </div>
            </>
          ) : isError ? (
            /* Error State */
            <div className="flex min-h-64 flex-col items-center justify-center gap-2 p-6 text-center">
              <p className="font-semibold text-red-600 dark:text-red-400">
                Failed to load articles
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Unable to fetch knowledge base articles. Please try again.
              </p>
            </div>
          ) : (
            <>
              {/* Article Header */}
              <div className="flex min-w-0 flex-col gap-3 border-b border-gray-200 bg-gray-300 p-3 dark:border-zinc-700 dark:bg-zinc-800 sm:p-4 md:flex-row md:items-center md:justify-between">
                <h2 className="min-w-0 wrap-break-words text-base font-semibold text-gray-900 dark:text-gray-100 sm:text-lg">
                  {activeFilter === "visibility"
                    ? selectedVisibility
                    : selectedCategory}
                  <span className="text-gray-500 dark:text-gray-400">
                    {` (${filteredData.length})`}
                  </span>
                </h2>

                <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 md:justify-end">
                  {/* Search */}
                  <div className="flex min-w-0 w-full items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 sm:w-56">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full min-w-0 bg-transparent text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0 dark:text-gray-100 dark:placeholder:text-gray-400"
                    />

                    <Search
                      size={18}
                      className="shrink-0 text-gray-500 dark:text-gray-400"
                    />
                  </div>

                  {/* Status */}
                  <select
                    value={selectedVisibility}
                    onChange={(e) => {
                      setActiveFilter("visibility");
                      setSelectedVisibility(e.target.value);
                      setSelectedCategory("All");
                      setCurrentPage(1);
                    }}
                    className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100 sm:w-auto"
                  >
                    <option value="All">All Status</option>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>

                  {/* Sort */}
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100 sm:w-auto"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>

              {/* Article Table */}
              <table className="w-full">

                <thead>
                  <tr className="bg-gray-100 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 text-left">

                    <th className="p-3 w-[6%] text-sm text-gray-700 dark:text-gray-300">
                      Sr. No.
                    </th>

                    <th className="p-3 w-[40%] text-sm text-gray-700 dark:text-gray-300">
                      Title
                    </th>

                    <th className="p-3 w-[15%] text-sm text-gray-700 dark:text-gray-300">
                      Status
                    </th>

                    <th className="p-3 w-[15%] text-sm text-gray-700 dark:text-gray-300">
                      Updated On
                    </th>

                    <th className="p-3 w-[14%] text-sm text-gray-700 dark:text-gray-300">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {currentPageData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-8 text-center text-sm text-gray-500 dark:text-gray-400"
                      >
                        No articles found.
                      </td>
                    </tr>
                  ) : (
                    currentPageData.map((article, index) => {
                      const serialNumber = startIndex + index + 1;

                      return (
                        <tr
                          key={article._id}
                          className="border-b border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:cursor-pointer"
                        >

                          <td className="p-3 text-gray-800 dark:text-gray-300">
                            <span>{serialNumber}.</span>
                          </td>

                          <td className="p-3">
                            <h3 className="font-semibold text-xs lg:text-sm text-gray-900 dark:text-gray-100">
                              {article.title}
                            </h3>

                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                              {article.content}
                            </p>
                          </td>

                          <td className="p-3">
                            <span
                              className={`flex w-fit items-center gap-1 md:px-2 py-1 rounded-md text-xs ${article.visibility === "Published"
                                ? "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400"
                                : "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400"
                                }`}
                            >
                              <CheckCircle size={13} />
                              {article.visibility}
                            </span>
                          </td>

                          <td className="p-3 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                            {article.updatedAt
                              ? new Date(article.updatedAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                              : "N/A"}
                          </td>

                          <td className="p-3 ">
                            <div className="flex   gap-2">

                              <button
                                onClick={() => handleView(article._id)}
                                title="View Article"
                                className="p-1 md:p-2 border border-green-300 dark:border-green-800 rounded-lg hover:bg-green-200 dark:hover:bg-green-950 text-green-600 dark:text-green-400 cursor-pointer"
                              >
                                <EyeIcon size={16} />
                              </button>

                              <button
                                onClick={() => {
                                  setSelectedArticle(article);
                                  setShowArticlePopup(true);
                                }}
                                title="Edit Article"
                                className="p-1 md:p-2 border border-gray-300 dark:border-zinc-600 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-950 text-indigo-600 dark:text-indigo-400 cursor-pointer"
                              >
                                <Pencil size={16} />
                              </button>

                              <button
                                onClick={() => handleDelete(article._id)}
                                title="Delete Article"
                                className="p-1 md:p-2 border border-red-300 dark:border-red-800 rounded-lg hover:bg-red-200 dark:hover:bg-red-950 text-red-600 dark:text-red-400 cursor-pointer"
                              >
                                <Trash2 size={16} />
                              </button>

                            </div>
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>

              </table>

              {/* Pagination */}
              <div className="flex items-center justify-between p-4">

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing{" "}
                  {filteredData.length === 0 ? 0 : startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredData.length)} of{" "}
                  {filteredData.length} articles
                </p>

                <div className="flex justify-end items-center gap-1 m-4 font-semibold">

                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg cursor-pointer bg-violet-600 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &lt;
                  </button>

                  {/* Page Numbers */}
                  {pageNumbers.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-2 border rounded-md cursor-pointer ${currentPage === pageNumber
                        ? "bg-violet-600 text-white border-violet-600"
                        : "border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-gray-300 hover:bg-blue-600 hover:text-white"
                        }`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={totalPages === 0 || currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-violet-600 text-white hover:bg-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &gt;
                  </button>

                </div>
              </div>
            </>
          )}

        </div>


      </div>

      {/* Bottom Information */}

      <div className="flex w-full min-w-0 flex-col gap-3 md:flex-row md:gap-4">
        {/* Tip */}
        <div className="flex min-w-0 flex-1 items-center gap-4 rounded-lg border border-blue-300 bg-blue-100 p-4 dark:border-blue-900 dark:bg-blue-950 sm:gap-5 sm:p-5">
          <div className="shrink-0 text-blue-600 dark:text-blue-400">
            <TrendingUp size={32} className="sm:h-9.5 sm:w-9.5" />
          </div>

          <div className="min-w-0">
            <h2 className="mb-1 font-semibold text-blue-600 dark:text-blue-400">
              Tip
            </h2>

            <p className="text-xs text-gray-600 dark:text-gray-300 md:text-sm">
              Keep your knowledge base updated with commonly asked questions to
              reduce support tickets and improve user experience.
            </p>
          </div>
        </div>

        {/* Need Ideas */}
        <div className="flex min-w-0 flex-1 flex-col items-stretch justify-between gap-4 rounded-lg border border-green-300 bg-green-100 p-4 dark:border-green-900 dark:bg-green-950 sm:p-5 lg:flex-row lg:items-center">
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            <div className="shrink-0 text-green-600 dark:text-green-400">
              <TrendingUp size={32} className="sm:h-9.5 sm:w-9.5" />
            </div>

            <div className="min-w-0">
              <h2 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                Need Ideas?
              </h2>

              <p className="text-xs text-gray-600 dark:text-gray-300 md:text-sm">
                Check your most common tickets in Reports to find topics for new
                knowledge base articles.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/admin/reports")}
            className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-violet-600 bg-violet-600 px-4 py-2 text-white transition-colors hover:bg-blue-600 sm:w-auto"
          >
            <span>View Reports</span>
            <span className="hidden lg:inline">→</span>
          </button>
        </div>
      </div>

      {/* Add Category Popup */}
      {showCategoryPopup && (
        <AddCategory
          onClose={() => setShowCategoryPopup(false)}
        />
      )}

      {/* Add Article Popup */}
      {showArticlePopup && (
        <AddArticle
          onClose={() => setShowArticlePopup(false)}
        />
      )}

      {showConfirmPopup && (
        <ConfirmPopup
          title="Delete Article"
          message="Are you sure you want to delete this article?"
          confirmText="Yes, Delete"
          cancelText="No"
          onConfirm={() => {
            deleteArticleMutation.mutate(selectedArticleId);
          }}
          onCancel={() => {
            setShowConfirmPopup(false);
            setSelectedArticleId(null);

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

      {showArticlePopup && (
        <AddArticle
          onClose={() => {
            setShowArticlePopup(false);
            setSelectedArticle(null);
            setCurrentPage(1);
          }}
          selectedArticle={selectedArticle}
        />
      )}


      {showViewArticle && (
        <ViewArticle
          articleId={selectedArticleId}
          onClose={() => {
            setShowViewArticle(false);
            setSelectedArticleId(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminKB;