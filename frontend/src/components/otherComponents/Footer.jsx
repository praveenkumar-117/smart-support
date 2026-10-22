import { FaGithub } from "react-icons/fa";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full shrink-0 bg-zinc-900">
      {/* Accent line */}
      <div className="h-0.5 w-full bg-linear-to-r from-violet-600 via-blue-500 to-violet-600" />

      <div className="flex flex-col items-center justify-between gap-2 px-4 py-3 text-center text-xs text-gray-400 sm:flex-row sm:px-6 sm:text-left sm:text-sm">
        <p className="min-w-0">
          © 2026{" "}
          <span className="font-semibold text-gray-200">Smart Support</span>.
          All rights reserved.
        </p>

        <div className="flex min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <p className="flex items-center gap-1.5">
            Built with
            <Heart size={14} className="fill-violet-500 text-violet-500 hover:fill-green-500" />
            by
            <span className="font-semibold text-violet-400 hover:text-green-400">Praveen Kumar</span>
          </p>

          <a
            href="https://github.com/praveenkumar-117"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            title="Visit GitHub"
            className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800 text-gray-300 transition hover:bg-violet-600 hover:text-white"
          >
            <FaGithub size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;