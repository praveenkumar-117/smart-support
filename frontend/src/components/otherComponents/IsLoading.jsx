
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

const IsLoading = () => {
  const colors = [
    "text-green-500",
    "text-blue-500",
    "text-violet-500",
    "text-pink-500",
    "text-orange-500",
    "text-cyan-500",
    "text-fuchsia-500",
    "text-emerald-500",
  ];

  const [color, setColor] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColor((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center
      px-4 py-6
      bg-gray-100 text-gray-900
      dark:bg-black dark:text-white
      sm:px-6 sm:py-8
      md:px-8
      lg:px-10">

      <Loader
        size={64}
        className={`animate-[spin_3s_linear_infinite] ${colors[color]}
          sm:h-20 sm:w-20
          md:h-24 md:w-24`}
      />

      <h1
        className="mt-4 text-center font-semibold animate-pulse
          text-lg sm:text-xl md:text-2xl lg:text-3xl"
      >
        Loading dashboard...
      </h1>

      <p className="mt-2 text-center text-sm text-gray-500
        dark:text-gray-400
        sm:text-base">
        Please wait while we prepare your dashboard.
      </p>
    </div>
  );
};

export default IsLoading;
