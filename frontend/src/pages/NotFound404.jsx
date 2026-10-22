
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotFound404 = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleBackToDashboard = () => {
    if (user?.role === "user") {
      navigate("/user/dashboard");
    } else if (user?.role === "support_admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col lg:flex-row
        items-center justify-center overflow-hidden
        bg-gray-100 text-gray-900
        dark:bg-zinc-900 dark:text-white
        px-4 py-8
        sm:px-6 sm:py-10
        md:px-8
        lg:px-10 lg:py-6"
    >
      {/* Left Content */}
      <div
        className="w-full lg:w-1/2 min-h-[45vh] lg:min-h-screen
          flex items-center justify-center
          py-6 sm:py-8 lg:py-10"
      >
        <div
          className="w-full max-w-2xl flex flex-col items-center
            text-center lg:items-end lg:text-right"
        >
          <h1
            className="text-7xl font-extrabold leading-none
              bg-linear-to-r from-violet-500 to-blue-600
              bg-clip-text text-transparent
              sm:text-8xl md:text-9xl"
          >
            404
          </h1>

          <h2
            className="mt-3 text-3xl font-bold
              sm:text-4xl md:text-5xl
              lg:text-5xl xl:text-6xl"
          >
            <span className="text-zinc-600 dark:text-zinc-300">
              Page
            </span>{" "}
            <span
              className="bg-linear-to-r from-blue-500 to-violet-600
                bg-clip-text text-transparent"
            >
              Not Found
            </span>
          </h2>

          <p
            className="mt-4 max-w-xl text-sm font-semibold
              leading-relaxed text-zinc-700
              dark:text-zinc-400
              sm:text-base md:text-lg"
          >
            Sorry, the page you are looking for doesn't exist
            or has been moved to another location.
          </p>

          <button
            onClick={handleBackToDashboard}
            className="mt-6 inline-flex items-center justify-center
              rounded-lg px-5 py-3
              text-sm font-semibold text-white
              bg-linear-to-r from-violet-600 to-blue-500
              hover:from-violet-700 hover:to-blue-600
              transition-all duration-300
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-violet-500
              focus-visible:ring-offset-2
              dark:focus-visible:ring-offset-black
              cursor-pointer
              sm:px-6 sm:text-base"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* Right Illustration */}
      <div
        className="w-full lg:w-1/2
          flex items-center justify-center
          px-2 py-4
          sm:px-4 sm:py-6
          lg:justify-start lg:px-0 lg:py-0"
      >
        <img
          src="/notFound.png"
          alt="Page not found illustration"
          className="w-full max-w-xs object-contain
            sm:max-w-sm
            md:max-w-md
            lg:max-w-lg
            xl:max-w-2xl"
        />
      </div>
    </div>
  );
};

export default NotFound404;
