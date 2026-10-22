import {
  ArrowRight,
  ChevronRight,
  CirclePlus,
  Headset,
  Newspaper,
  Search,
  CircleArrowRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api"
import ViewArticle from "../otherComponents/ViewArticle";
import MessagePopup from "../otherComponents/MessagePopup";
import useCategories from "../../hooks/useCategories";
import {
  getCategoryStyle,
  getCategoryStyleByName,
} from "../../config/categoryUtils";

const knowledge = () => {
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showMessage, setShowMessage] = useState(null);
  const {
    categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();

  const {
    data,
    isLoading,
    isError,
    error: articlesError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await api.get("/knowledge/articles");
      return response.data;
    },
    retry: false,
  });

  const articles = data?.allArticles || [];


  const categoryData = categories.map((category) => ({
    ...category,
    count: articles.filter(
      (article) =>
        article.category?.toLowerCase() === category.name.toLowerCase()
    ).length,
  }));


  useEffect(() => {
    const filteredArticles =
      selectedCategory === "All"
        ? articles.slice(0, 5)
        : articles.filter(
          (article) =>
            article.category?.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

    setArticleData(filteredArticles);
  }, [articles, selectedCategory]);


  useEffect(() => {
    if (!isError) return;

    setShowMessage({
      type: "error",
      title: "Articles Fetch Failed",
      message:
        articlesError?.response?.data?.message ||
        articlesError?.message ||
        "Unable to load knowledge base articles. Please try again later.",
    });
  }, [isError, articlesError]);


  return (


    <div className="flex w-full flex-col gap-5 bg-gray-200 p-4 dark:bg-black">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm">
        <span className="text-gray-600 dark:text-zinc-400">Dashboard</span>
        <ChevronRight size={17} className="text-gray-400 dark:text-zinc-500" />
        <span className="font-semibold text-gray-800 dark:text-gray-100">
          Knowledge Base
        </span>
      </div>

      {/* Page Heading and Search */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
        <h1 className="md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">
          Knowledge Base
        </h1>
        <p className="mt-1 text-xs md:text-sm text-gray-600 dark:text-zinc-400">
          Find helpful articles, guides and solutions for your issues.
        </p>

        <div className="mt-4 flex items-center gap-3 rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 transition-colors focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 dark:border-zinc-600 dark:bg-zinc-800 dark:focus-within:border-indigo-500 dark:focus-within:ring-indigo-950">
          <Search size={19} className="shrink-0 text-gray-500 dark:text-zinc-400" />
          <input
            type="text"
            placeholder="Search knowledge base..."
            className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-500 dark:text-gray-100 dark:placeholder:text-zinc-500"
          />
        </div>
      </div>

      {/* Browse by Category */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Browse by Category
          </h2>
          <span className="text-xs font-medium text-gray-500 dark:text-zinc-400">
            {categories.length} categories
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {isLoading || categoriesLoading ? (
            <>
              {/* Internet Skeleton */}
              <div className="flex items-center justify-between rounded-xl border border-sky-200 bg-sky-50 p-3 dark:border-sky-900 dark:bg-zinc-900">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-sky-200 dark:bg-sky-950" />
                  <div className="space-y-2">
                    <div className="h-4 w-20 animate-pulse rounded bg-sky-200 dark:bg-sky-900" />
                    <div className="h-3 w-24 animate-pulse rounded bg-sky-100 dark:bg-sky-950" />
                  </div>
                </div>
                <div className="h-6 w-6 animate-pulse rounded-full bg-sky-200 dark:bg-sky-900" />
              </div>

              {/* Software Skeleton */}
              <div className="flex items-center justify-between rounded-xl border border-violet-200 bg-violet-50 p-3 dark:border-violet-900 dark:bg-zinc-900">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-violet-200 dark:bg-violet-950" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded bg-violet-200 dark:bg-violet-900" />
                    <div className="h-3 w-20 animate-pulse rounded bg-violet-100 dark:bg-violet-950" />
                  </div>
                </div>
                <div className="h-6 w-6 animate-pulse rounded-full bg-violet-200 dark:bg-violet-900" />
              </div>

              {/* Email Skeleton */}
              <div className="flex items-center justify-between rounded-xl border border-orange-200 bg-orange-50 p-3 dark:border-orange-900 dark:bg-zinc-900">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-orange-200 dark:bg-orange-950" />
                  <div className="space-y-2">
                    <div className="h-4 w-16 animate-pulse rounded bg-orange-200 dark:bg-orange-900" />
                    <div className="h-3 w-24 animate-pulse rounded bg-orange-100 dark:bg-orange-950" />
                  </div>
                </div>
                <div className="h-6 w-6 animate-pulse rounded-full bg-orange-200 dark:bg-orange-900" />
              </div>

              {/* Hardware Skeleton */}
              <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-zinc-900">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-emerald-200 dark:bg-emerald-950" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded bg-emerald-200 dark:bg-emerald-900" />
                    <div className="h-3 w-20 animate-pulse rounded bg-emerald-100 dark:bg-emerald-950" />
                  </div>
                </div>
                <div className="h-6 w-6 animate-pulse rounded-full bg-emerald-200 dark:bg-emerald-900" />
              </div>

              {/* Security Skeleton */}
              <div className="flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 p-3 dark:border-rose-900 dark:bg-zinc-900">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-rose-200 dark:bg-rose-950" />
                  <div className="space-y-2">
                    <div className="h-4 w-20 animate-pulse rounded bg-rose-200 dark:bg-rose-900" />
                    <div className="h-3 w-24 animate-pulse rounded bg-rose-100 dark:bg-rose-950" />
                  </div>
                </div>
                <div className="h-6 w-6 animate-pulse rounded-full bg-rose-200 dark:bg-rose-900" />
              </div>

              {/* Other Skeleton */}
              <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-zinc-900">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-amber-200 dark:bg-amber-950" />
                  <div className="space-y-2">
                    <div className="h-4 w-16 animate-pulse rounded bg-amber-200 dark:bg-amber-900" />
                    <div className="h-3 w-24 animate-pulse rounded bg-amber-100 dark:bg-amber-950" />
                  </div>
                </div>
                <div className="h-6 w-6 animate-pulse rounded-full bg-amber-200 dark:bg-amber-900" />
              </div>
            </>
          ) : categoriesError ? (
            <div className="col-span-full rounded-xl border border-rose-200 bg-rose-50 p-5 text-center dark:border-rose-900 dark:bg-rose-950/20">
              <p className="font-semibold text-rose-700 dark:text-rose-300">
                Categories unavailable
              </p>
              <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">
                Unable to load categories. Please try again later.
              </p>
            </div>
          ) : (
            categoryData.map((category) => {
              const { icon: Icon, text, badge } = getCategoryStyle(category.icon);

              return (
                <div
                  onClick={() => setSelectedCategory(category.name)}
                  key={category._id}
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-300 bg-gray-100 p-3 transition-colors hover:border-gray-400 hover:bg-gray-200 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
                >
                  <div className="flex w-full items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-lg p-2 ${badge}`}>
                        <Icon size={24} strokeWidth={2} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {category.name}
                        </h3>

                        <p className={`text-sm font-semibold ${text}`}>
                          {category.count} Articles
                        </p>
                      </div>
                    </div>

                    <CircleArrowRight className={text} />
                  </div>
                </div>
              );
            })

          )}
        </div>
      </section>

      {/* Popular Articles */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Popular Articles
          </h2>
          <span className="text-xs font-medium text-gray-500 dark:text-zinc-400">
            Helpful guides
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {isLoading ? (
            <>
              {/* Skeleton Row 1 */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-sky-200 bg-sky-50 p-3 dark:border-sky-900 dark:bg-zinc-900">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-sky-200 dark:bg-sky-950" />

                  <div className="flex min-w-0 flex-1 flex-col gap-2 py-1">
                    <div className="h-4 w-3/5 animate-pulse rounded bg-sky-200 dark:bg-sky-950" />
                    <div className="h-3 w-full animate-pulse rounded bg-sky-100 dark:bg-zinc-800" />
                    <div className="h-3 w-4/5 animate-pulse rounded bg-sky-100 dark:bg-zinc-800" />
                  </div>
                </div>

                <div className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-indigo-200 dark:bg-indigo-950" />
              </div>

              {/* Skeleton Row 2 */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-violet-200 bg-violet-50 p-3 dark:border-violet-900 dark:bg-zinc-900">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-violet-200 dark:bg-violet-950" />

                  <div className="flex min-w-0 flex-1 flex-col gap-2 py-1">
                    <div className="h-4 w-2/5 animate-pulse rounded bg-violet-200 dark:bg-violet-950" />
                    <div className="h-3 w-full animate-pulse rounded bg-violet-100 dark:bg-zinc-800" />
                    <div className="h-3 w-3/4 animate-pulse rounded bg-violet-100 dark:bg-zinc-800" />
                  </div>
                </div>

                <div className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-indigo-200 dark:bg-indigo-950" />
              </div>

              {/* Skeleton Row 3 */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-zinc-900">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-amber-200 dark:bg-amber-950" />

                  <div className="flex min-w-0 flex-1 flex-col gap-2 py-1">
                    <div className="h-4 w-1/2 animate-pulse rounded bg-amber-200 dark:bg-amber-950" />
                    <div className="h-3 w-full animate-pulse rounded bg-amber-100 dark:bg-zinc-800" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-amber-100 dark:bg-zinc-800" />
                  </div>
                </div>

                <div className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-indigo-200 dark:bg-indigo-950" />
              </div>
            </>
          ) : isError ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-6 text-center dark:border-rose-900 dark:bg-rose-950/20">
              <p className="font-semibold text-rose-700 dark:text-rose-300">
                Articles unavailable
              </p>
              <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">
                Unable to load articles. Please try again later.
              </p>
            </div>
          ) : articleData.length > 0 ? (
            articleData.map((article) => {
              const categoryStyle = getCategoryStyleByName(
                categories,
                article.category
              );

              const CategoryIcon = categoryStyle.icon;
              // const category = categories.find(
              //   (item) => item.name === article.category
              // );

              return (
                <div
                  key={article._id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-gray-300 bg-gray-50 p-3 transition-all duration-300 ease-in-out hover:scale-[1.01] hover:border-indigo-300 hover:bg-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/10"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <span
                      className={`shrink-0 rounded-lg p-2 ${categoryStyle.badge}`}>
                      <CategoryIcon
                        size={21}
                        className={categoryStyle.text}
                      />
                    </span>

                    <div className="min-w-0">
                      <h3 className="wrap-break-word text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {article.title}
                      </h3>

                      <p className="mt-1 text-xs md:text-sm leading-5 text-gray-600 dark:text-zinc-400">
                        {article.description || article.content}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedArticle(article._id)}
                    type="button"
                    className="flex shrink-0 cursor-pointer items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-200 dark:text-indigo-300 dark:hover:bg-indigo-900"
                  >
                    <span className="hidden sm:inline">Read Article</span>
                    <ArrowRight size={19} />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-8 text-center dark:border-zinc-700 dark:bg-zinc-900">
              <Newspaper
                size={28}
                className="mx-auto mb-2 text-indigo-500"
              />
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                No articles found
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
                No articles are available in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Need Help */}
      <div className="flex flex-col gap-4 rounded-xl border border-violet-200 bg-linear-to-br from-violet-300 to-indigo-400 p-4 dark:border-violet-800 dark:from-violet-950 dark:to-indigo-950 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Headset
            size={42}
            className="shrink-0 rounded-lg bg-gray-200 p-2 text-indigo-700 dark:bg-zinc-800 dark:text-indigo-300"
          />
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Still need help?
            </h2>
            <p className="mt-1 text-xs md:text-sm text-gray-700 dark:text-zinc-300">
              Can't find what you are looking for?
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/user/create-ticket")}
          className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border hover:border-indigo-800 hover:bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 border-violet-800 bg-violet-700"
        >
          <CirclePlus size={19} />
          Create A Ticket
        </button>
      </div>

      {selectedArticle && (
        <ViewArticle
          articleId={selectedArticle}
          onClose={() => setSelectedArticle(null)}
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

export default knowledge;
