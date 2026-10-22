import {
  Bell,
  Folder,
  Folders,
  Headset,
  Monitor,
  PencilLine,
  Settings,
  Shield,
  UserRound,
  Wrench,
} from "lucide-react";


const categoryIconMap = {
  Folders: {
    icon: Folders,
    text: "text-sky-600 dark:text-sky-400",
    badge: "bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400",
    bar: "bg-sky-600",
  },
  Settings: {
    icon: Settings,
    text: "text-indigo-600 dark:text-indigo-400",
    badge: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
    bar: "bg-indigo-600",
  },
  UserRound: {
    icon: UserRound,
    text: "text-violet-600 dark:text-violet-400",
    badge: "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
     bar: "bg-violet-600",
  },
  Shield: {
    icon: Shield,
    text: "text-green-600 dark:text-green-400",
    badge: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
     bar: "bg-green-600",
  },
  Wrench: {
    icon: Wrench,
    text: "text-orange-600 dark:text-orange-400",
    badge: "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
     bar: "bg-orange-600",
  },
  Headset: {
    icon: Headset,
    text: "text-red-600 dark:text-red-400",
    badge: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
     bar: "bg-red-600",
  },
  Bell: {
    icon: Bell,
    text: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
     bar: "bg-amber-600",
  },
  PencilLine: {
    icon: PencilLine,
    text: "text-gray-600 dark:text-gray-300",
    badge: "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-300",
     bar: "bg-gray-600",
  },
  Monitor: {
    icon: Monitor,
    text: "text-cyan-600 dark:text-cyan-400",
    badge: "bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400",
     bar: "bg-cyan-600",
  },
};

const fallbackStyle = {
  icon: Folder,
  text: "text-gray-500 dark:text-gray-400",
  badge: "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-400",
   bar: "bg-gray-500",
};

// getCategoryStyle("Shield") -> { icon, text, badge }
export const getCategoryStyle = (iconName) =>
  categoryIconMap[iconName] || fallbackStyle;

// findCategory(categories, "internet") -> category object (case-insensitive)
export const findCategory = (categories, name) =>
  categories.find(
    (category) =>
      category.name.toLowerCase() === String(name || "").toLowerCase(),
  );

// getCategoryStyleByName(categories, "Internet") -> { icon, text, badge }
export const getCategoryStyleByName = (categories, name) =>
  getCategoryStyle(findCategory(categories, name)?.icon);