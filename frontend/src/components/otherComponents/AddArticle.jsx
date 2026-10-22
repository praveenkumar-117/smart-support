import {
  Bold,
  Eye,
  FileText,
  Folder,
  Image,
  Info,
  Italic,
  Link,
  List,
  ListOrdered,
  RemoveFormatting,
  Save,
  Tag,
  Underline,
  X
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MessagePopup from "../otherComponents/MessagePopup";
import api from "../../api/api"
import useCategories from "../../hooks/useCategories";
import { findCategory } from "../../config/categoryUtils";


const AddArticle = ({ onClose, selectedArticle }) => {
  const queryClient = useQueryClient();

  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [messagePopupData, setMessagePopupData] = useState({
    type: "success",
    title: "",
    message: "",
  });


  const [articleTitle, setArticleTitle] = useState("")
  const [articleCategory, setArticleCategory] = useState("")
  const [articleVisibility, setArticleVisibility] = useState("")
  const [articleContent, setArticleContent] = useState("")

  const {
    categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();


  const handleSubmit = (e) => {
    e.preventDefault()

    createArticleMutation.mutate({
      title: articleTitle,
      content: articleContent,
      category: articleCategory,
      visibility: articleVisibility
    });
  }


  const createArticleMutation = useMutation({
    mutationFn: async (articleData) => {
      const response = await api.post("/knowledge/createarticle", articleData)
      return response.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["backendArticle"],
      });

      setArticleTitle("");
      setArticleCategory("");
      setArticleVisibility("")
      setArticleContent("")

      setMessagePopupData({
        type: "success",
        title: "Article Created Successfully",
        message: data.message || "your Article created successfully"
      })
      setShowMessagePopup(true);
    },

    onError: (error) => {
      setMessagePopupData({
        type: "error",
        title: "Article Created  failed",
        message: error.message || "your Article cannot created."
      })
      setShowMessagePopup(true);
    }
  })



  const handleEdit = (id) => {


    editArticleMutation.mutate({
      _id: id,
      title: articleTitle,
      content: articleContent,
      category: articleCategory,
      visibility: articleVisibility
    });
  }


  const editArticleMutation = useMutation({
    mutationFn: async (articleData) => {
      const response = await api.patch(`/knowledge/updatearticle/${articleData._id}`, articleData)
      return response.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["backendArticle"],
      });

      setArticleTitle("");
      setArticleCategory("");
      setArticleVisibility("")
      setArticleContent("")

      setMessagePopupData({
        type: "success",
        title: "Article Edited Successfully",
        message: data.message || "your Article Edited successfully"
      })
      setShowMessagePopup(true);
    },

    onError: (error) => {
      setMessagePopupData({
        type: "error",
        title: "Article Edition  failed",
        message: error.message || "your Article cannot be Edited."
      })
      setShowMessagePopup(true);
    }
  })

  useEffect(() => {
    if (selectedArticle) {
      setArticleTitle(selectedArticle.title);
      setArticleCategory(selectedArticle.category);
      setArticleVisibility(selectedArticle.visibility);
      setArticleContent(selectedArticle.content);
    } else {
      setArticleTitle("");
      setArticleCategory("");
      setArticleVisibility("");
      setArticleContent("");
    }
  }, [selectedArticle]);


  useEffect(() => {
    if (selectedArticle && categories.length > 0) {
      const matchedCategory = findCategory(categories, selectedArticle.category);

      if (matchedCategory) {
        setArticleCategory(matchedCategory.name);
      }
    }
  }, [selectedArticle, categories]);

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3  sm:p-5">

      {/* Popup */}
      <div className="flex max-h-[85dvh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-xl dark:bg-zinc-900">

        {/* Header */}
        <div className="flex shrink-0 items-center gap-3 border-b border-gray-300 p-3 dark:border-zinc-700 sm:gap-4 sm:px-5">
          <span className="shrink-0 rounded-lg bg-violet-100 p-2 dark:bg-violet-950">
            <FileText size={22} className="text-violet-600 dark:text-violet-400" />
          </span>

          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <h1 className="text-base font-bold text-gray-900 dark:text-gray-100 sm:text-lg">
              {selectedArticle ? "Edit Article" : "Add Article"}
            </h1>

            <p className="text-xs text-gray-600 dark:text-gray-400">
              {selectedArticle
                ? "Edit knowledge base article."
                : "Create a new knowledge base article to help users find solutions."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="shrink-0 cursor-pointer rounded-md p-1.5 text-gray-500 hover:bg-red-500 hover:text-white dark:text-gray-400"
          >
            <X size={21} />
          </button>
        </div>

        {/* Form */}
        <div className="flex min-h-0 flex-col gap-4 overflow-y-auto p-3 sm:gap-5 sm:p-4">

          {/* Article Title */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="articleTitle"
              className="text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              Article Title
            </label>

            <div className="flex min-w-0 items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 dark:border-zinc-700">
              <FileText size={20} className="shrink-0 text-gray-400" />

              <input
                id="articleTitle"
                type="text"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                placeholder="Enter article title"
                className="w-full min-w-0 bg-transparent px-2 py-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Category & Visibility */}
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">

            {/* Category */}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <label
                htmlFor="category"
                className="text-sm font-semibold text-gray-900 dark:text-gray-100"
              >
                Category
              </label>

              <div className="flex min-w-0 items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 dark:border-zinc-700">
                <Folder size={20} className="shrink-0 text-gray-400" />

                <select
                  id="category"
                  value={articleCategory}
                  onChange={(e) => setArticleCategory(e.target.value)}
                  disabled={isCategoriesLoading || isCategoriesError}
                  className="w-full min-w-0 cursor-pointer bg-transparent px-1 py-1 text-sm text-gray-900 focus:outline-none disabled:cursor-not-allowed dark:text-gray-100"
                >
                  <option value="" disabled className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100">
                    {isCategoriesLoading
                      ? "Loading categories..."
                      : isCategoriesError
                        ? "Failed to load categories"
                        : "Select a category"}
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category._id}
                      value={category.name}
                      className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100"
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Visibility */}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <label
                htmlFor="visibility"
                className="text-sm font-semibold text-gray-900 dark:text-gray-100"
              >
                Visibility
              </label>

              <div className="flex min-w-0 items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 dark:border-zinc-700">
                <Eye size={20} className="shrink-0 text-gray-400" />

                <select
                  id="visibility"
                  value={articleVisibility}
                  onChange={(e) => setArticleVisibility(e.target.value)}
                  className="w-full min-w-0 cursor-pointer bg-transparent px-1 py-1 text-sm text-gray-900 focus:outline-none dark:text-gray-100"
                >
                  <option value="" disabled className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100">
                    Select visibility
                  </option>
                  <option value="Published" className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100">Published</option>
                  <option value="Draft" className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100">Draft</option>
                </select>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="content"
              className="text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              Content
            </label>

            <div className="overflow-hidden rounded-lg border border-gray-300 dark:border-zinc-700">
              <textarea
                id="content"
                rows={4}
                value={articleContent}
                onChange={(e) => setArticleContent(e.target.value)}
                placeholder="Write your article content here..."
                className="w-full resize-y bg-transparent px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-500"
              />
            </div>

            <div className="flex justify-end">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {articleContent.length}/5000 characters
              </span>
            </div>
          </div>

          {/* Tip */}
          <div className="flex items-start gap-3 rounded-lg border border-violet-200 bg-violet-100 p-3 dark:border-violet-900 dark:bg-violet-950">
            <Info
              className="mt-0.5 shrink-0 text-violet-600 dark:text-violet-400"
              size={22}
            />

            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                Tip:
              </h2>

              <p className="mt-0.5 text-xs leading-4 text-violet-700 dark:text-violet-300">
                Write clear, step-by-step instructions and include screenshots or examples whenever possible.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-gray-300 p-3 dark:border-zinc-700 sm:flex-row sm:justify-end sm:gap-3 sm:p-4">
          <button
            onClick={onClose}
            className="w-full cursor-pointer rounded-lg border border-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:border-zinc-600 dark:text-gray-200 dark:hover:bg-zinc-800 sm:w-auto"
          >
            Cancel
          </button>

          <button
            onClick={(e) =>
              selectedArticle
                ? handleEdit(selectedArticle._id)
                : handleSubmit(e)
            }
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-violet-600 bg-violet-600 px-4 py-2 text-white hover:bg-blue-600 sm:w-auto"
          >
            <Save size={17} />
            {selectedArticle ? "Save Changes" : "Save Article"}
          </button>
        </div>
      </div>

      {showMessagePopup && (
        <MessagePopup
          type={messagePopupData.type}
          title={messagePopupData.title}
          message={messagePopupData.message}
          onClose={() => {
            setShowMessagePopup(false);
            onClose();
          }}
        />
      )}
    </div>

  );
};

export default AddArticle;