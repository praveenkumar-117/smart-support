import { CheckCircle, CircleAlert, X } from "lucide-react";

const MessagePopup = ({
  type = "success",
  title,
  message,
  onClose,
}) => {
  const isSuccess = type === "success";

  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-900">

        {/* Icon + Close */}
        <div className="flex items-start justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              isSuccess
                ? "bg-green-100 dark:bg-green-950"
                : "bg-red-100 dark:bg-red-950"
            }`}
          >
            {isSuccess ? (
              <CheckCircle
                size={26}
                className="text-green-600 dark:text-green-400"
              />
            ) : (
              <CircleAlert
                size={26}
                className="text-red-600 dark:text-red-400"
              />
            )}
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer rounded-md text-gray-400 hover:bg-red-600 hover:text-white dark:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Message */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {message}
          </p>
        </div>

        {/* Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className={`cursor-pointer rounded-lg px-5 py-2 text-sm font-medium text-white ${
              isSuccess
                ? "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                : "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
            }`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagePopup;