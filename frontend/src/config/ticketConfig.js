import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  CheckCircle,
  CircleDot,
  Clock,
  Loader,
  Tickets,
} from "lucide-react";


export const statusConfig = {
  Total: {
    icon: Tickets,
    color: "text-violet-500",
  },

  Open: {
    icon: CircleDot,
    color: "text-orange-500",
  },

  "In Progress": {
    icon: Loader,
    color: "text-sky-600",
  },

  Pending: {
    icon: Clock,
    color: "text-red-600",
  },

  Resolved: {
    icon: CheckCircle,
    color: "text-green-600",
  },
};

export const priorityConfig = {
  Low: {
    icon: ArrowDownNarrowWide,
    color: "text-green-600",
  },

  Medium: {
    icon: ArrowUpNarrowWide,
    color: "text-yellow-500",
  },

  High: {
    icon: ArrowUpNarrowWide,
    color: "text-red-600",
  },
};
