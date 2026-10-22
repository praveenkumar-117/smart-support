import { X, TriangleAlert } from "lucide-react";

const ConfirmPopup = ({
  title = "Are you sure?",
  message = "Are you sure you want to continue?",
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
}) => {
  return (
   
<div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/50">
  <div className="w-full max-w-md rounded-xl bg-gray-200 p-6 shadow-xl dark:bg-zinc-900">

    {/* Header */}
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-200 dark:bg-red-950">
          <TriangleAlert
            size={22}
            className="text-red-600 dark:text-red-400"
          />
        </div>

        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h2>
      </div>

      <button
        title="Close"
        onClick={onCancel}
        className="cursor-pointer rounded-md text-gray-500 hover:bg-red-600 hover:text-white dark:text-zinc-400"
      >
        <X size={20} />
      </button>
    </div>

    {/* Message */}
    <p className="mt-4 text-sm text-gray-600 dark:text-zinc-300">
      {message}
    </p>

    {/* Buttons */}
    <div className="mt-6 flex justify-end gap-3">
      <button
        onClick={onCancel}
        className="cursor-pointer rounded-lg border border-gray-400 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
      >
        {cancelText}
      </button>

      <button
        onClick={onConfirm}
        className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        {confirmText}
      </button>
    </div>

  </div>
</div>

  );
};

export default ConfirmPopup;