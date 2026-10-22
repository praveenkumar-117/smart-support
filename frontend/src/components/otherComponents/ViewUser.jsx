
import {
  X,
  UserRound,
  Mail,
  Building2,
  ShieldCheck,
  CircleDot,
  Smartphone,
  MapPin,
  CalendarDays,
  Clock,
} from "lucide-react";

const ViewUser = ({ user, onClose }) => {
  if (!user) return null;

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString();
  };

  const isOnline = user.isOnline === true;

  const roleLabel =
    user.role === "support_admin" ? "Support Admin" : "User";

  const detailCards = [
    {
      title: "Status",
      value: isOnline ? "Online" : "Offline",
      Icon: CircleDot,
      iconBg: isOnline ? "bg-green-200" : "bg-gray-200",
      iconColor: isOnline ? "text-green-700" : "text-gray-600",
      valueColor: isOnline ? "text-green-700" : "text-gray-600",
    },
    {
      title: "Role",
      value: roleLabel,
      Icon: ShieldCheck,
      iconBg: "bg-indigo-200",
      iconColor: "text-indigo-700",
      valueColor: "text-indigo-700",
    },
    {
      title: "Department",
      value: user.department || "N/A",
      Icon: Building2,
      iconBg: "bg-orange-200",
      iconColor: "text-orange-700",
      valueColor: "text-gray-700",
    },
  ];

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-3">
  <div className="flex max-h-[calc(100dvh-1rem)] w-full max-w-2xl flex-col overflow-y-auto rounded-xl bg-gray-50 shadow-xl dark:bg-zinc-900 sm:max-h-[calc(100dvh-2rem)]">

    {/* Header */}
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-200 bg-gray-200 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800 sm:px-5">
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-200 dark:bg-blue-950/50">
          <UserRound size={21} className="text-blue-700 dark:text-blue-400" />
        </span>

        <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 sm:text-lg">
          User Details
        </h2>
      </div>

      <button
        onClick={onClose}
        className="shrink-0 cursor-pointer rounded-md p-1.5 text-gray-500 hover:bg-red-600 hover:text-white dark:text-gray-400"
        title="Close"
      >
        <X size={20} />
      </button>
    </div>

    {/* User Information */}
    <div className="flex flex-col gap-3 p-3 sm:gap-2.5 sm:p-4">

      {/* Profile */}
      <div className="flex min-w-0 items-center gap-3 rounded-lg border border-gray-200 bg-gray-100 p-3 dark:border-zinc-700 dark:bg-zinc-800">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-sky-200 dark:border-zinc-700 dark:bg-sky-950 sm:h-14 sm:w-14">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name || "User"}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound size={30} className="text-sky-700 dark:text-sky-400" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="wrap-break-words text-base font-semibold text-gray-800 dark:text-gray-100">
            {user.name || "Unknown User"}
          </h3>

          <div className="mt-1 flex min-w-0 items-start gap-1.5">
            <Mail size={14} className="mt-0.5 shrink-0 text-sky-700 dark:text-sky-400" />

            <p className="break-all text-sm text-gray-600 dark:text-gray-300">
              {user.email || "No email available"}
            </p>
          </div>
        </div>
      </div>

      {/* Status, Role and Department */}
      <div className="flex  flex-row gap-4">
        {detailCards.map(
          ({
            title,
            value,
            Icon,
            iconBg,
            iconColor,
            valueColor,
          }) => (
            <div
              key={title}
              className="w-[30%] md:w-full flex min-w-0 flex-col gap-1.5 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
            >
              <div className="flex min-w-0 items-center gap-1.5">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${iconBg}`}
                >
                  <Icon size={15} className={iconColor} />
                </span>

                <p className="wrap-break-words text-sm font-medium text-gray-500 dark:text-gray-400">
                  {title}
                </p>
              </div>

              <p className={`wrap-break-words pl-1 text-sm font-semibold ${valueColor}`}>
                {value}
              </p>
            </div>
          )
        )}
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="mb-1.5 text-sm font-semibold text-gray-800 dark:text-gray-100">
          Contact Information
        </h3>

        <div className="flex flex-row md:flex-col gap-2.5 sm:grid sm:grid-cols-2">
          {/* Personal Number */}
          <div className=" w-1/2 md:w-full flex min-w-0 items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 p-2.5 dark:border-zinc-700 dark:bg-zinc-800">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-green-200">
              <Smartphone size={16} className="text-green-700" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Personal Number
              </p>

              <p className="mt-0.5 wrap-break-words text-sm font-medium text-gray-700 dark:text-gray-200">
                {user.personalNumber || "N/A"}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="w-1/2 md:w-full flex min-w-0 items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 p-2.5 dark:border-zinc-700 dark:bg-zinc-800">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-orange-200">
              <MapPin size={16} className="text-orange-700" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Address
              </p>

              <p className="mt-0.5 wrap-break-words text-sm font-medium text-gray-700 dark:text-gray-200">
                {user.address || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Activity */}
      <div>
        <h3 className="mb-1.5 text-sm font-semibold text-gray-800 dark:text-gray-100">
          Account Activity
        </h3>

        <div className="flex md:flex-col gap-2.5 sm:grid sm:grid-cols-2">
          {/* Joined On */}
          <div className="w-1/2 md:w-full flex min-w-0 items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 p-2.5 dark:border-zinc-700 dark:bg-zinc-800">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-violet-200">
              <CalendarDays size={16} className="text-violet-700" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Joined On
              </p>

              <p className="mt-0.5 wrap-break-words text-sm font-medium text-gray-700 dark:text-gray-200">
                {formatDate(user.createdAt)}
              </p>
            </div>
          </div>

          {/* Last Login */}
          <div className="w-1/2 md:w-full flex min-w-0 items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 p-2.5 dark:border-zinc-700 dark:bg-zinc-800">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-yellow-200">
              <Clock size={16} className="text-yellow-700" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last Login
              </p>

              <p className="mt-0.5 wrap-break-words text-sm font-medium text-gray-700 dark:text-gray-200">
                {formatDate(user.lastLogin)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="flex shrink-0 justify-end border-t border-gray-200 bg-gray-200 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800 sm:px-4">
      <button
        onClick={onClose}
        className="w-full cursor-pointer rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600 sm:w-auto"
      >
        Close
      </button>
    </div>
  </div>
</div>
  );
};

export default ViewUser;
