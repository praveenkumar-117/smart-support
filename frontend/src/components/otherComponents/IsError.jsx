import { Rabbit } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const IsError = () => {
   const colors = [
    "text-green-700",
  "text-blue-700",
  "text-violet-700",
  "text-pink-700",
  "text-orange-700",
  "text-cyan-700",
  "text-fuchsia-700",
  "text-emerald-700",
  ];

  const [color, setColor] = useState(0);

  useEffect(() => {
    const interValidId = setInterval(() => {
      setColor(
        (prevIndex) => (prevIndex + 1) % colors.length
      );
    }, 1000);

    return () => {
      clearInterval(interValidId);
    };
  }, []);
  return (
     <div className="w-full h-screen p-6 font-semibold bg-sky-100  flex flex-col  items-center justify-center">
        <Rabbit size={80} className={`animate-pulse ${colors[color]}`}/>
        <h1 className=" mt-4 text-2xl">Unable to load dashboard. </h1>
      </div>
  )
}

export default IsError
