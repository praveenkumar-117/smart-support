import {
  Ticket, BookOpen, Users, ChartNoAxesCombined,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import React, { useState } from 'react'
import { FaGithub, FaJs, FaLinkedin, FaMapPin, FaRegEnvelope } from 'react-icons/fa';
import { FaBarsProgress, FaRegCircleCheck } from 'react-icons/fa6';
import { FiMonitor } from 'react-icons/fi';
import { IoIosArrowForward, IoMdCloudUpload } from 'react-icons/io';
import { LuShieldCheck, LuSquareChartGantt } from 'react-icons/lu';

import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiTailwindcss,
  SiRedux,
  SiTanstack,
  SiLucide,
  SiExpress,
  SiMongodb,
  SiJsonwebtokens,
  SiPostman,

} from "react-icons/si";
import { BsFillShieldLockFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const AboutProject = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: "Ticket Management",
      icon: Ticket,
      color: "text-green-600",
      description: "Users can create, track, and manage support tickets with priority and status updates. Admins can handle and resolve tickets efficiently, improving communication and speeding up issue resolution.",
      points: [
        "Create support tickets with details",
        "Set priority and track status",
        "Get real-time updates",
        "Faster issue resolution",
      ],
    },
    {
      title: "User & Role Management",
      icon: Users,
      color: "text-amber-500",
      description: "Manage user accounts and control access based on assigned roles and permissions.",
      points: [
        "Manage user accounts",
        "Assign roles and permissions",
        "Control access to features",
        "Keep user information organized",
      ],
    },
    {
      title: "Knowledge Base",
      icon: BookOpen,
      color: "text-blue-600",
      description: "Help users find articles and solutions to common problems without always creating a support ticket.",
      points: [
        "Access helpful articles and guides",
        "Find solutions to common issues",
        "Reduce repetitive support requests",
        "Improve self-service support",
      ],
    },
    {
      title: "Reports & Insights",
      icon: ChartNoAxesCombined,
      color: "text-orange-600",
      description: "Review ticket activity and support performance through organized reports and visual insights.",
      points: [
        "Monitor ticket statistics",
        "Track open and resolved tickets",
        "Analyze support performance",
        "Identify improvement opportunities",
      ],
    },
    {
      title: "Easy to Use",
      icon: Sparkles,
      color: "text-pink-600",
      description: "Navigate the support system through a clean, intuitive interface designed to make everyday tasks simple.",
      points: [
        "Clean and intuitive interface",
        "Simple ticket creation process",
        "Easy access to support features",
        "Clear ticket status tracking",
      ],
    },
    {
      title: "Security & Reliability",
      icon: ShieldCheck,
      color: "text-violet-600",
      description: "Protect the support system through authentication, role-based authorization, and secure handling of user information.",
      points: [
        "Secure user authentication",
        "Role-based access control",
        "Protected API endpoints",
        "Safer handling of user data",
      ],
    },
  ];


  const [activeFeature, setActiveFeature] = useState(features[0]);

  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  return (
    <>
      <nav className="w-full h-14 flex justify-between bg-gray-200">
        <div className="md:w-1/3 w-1/5 flex items-center justify-center">
          <img
            src="logo123.png"
            alt=""
            style={{ width: "80px", height: "60px" }}
            className="py-1"
          />
        </div>

        <div className=" w-full flex items-center justify-center gap-2">

          <button onClick={() => navigate("/")}
            className="font-medium cursor-pointer md:text-base text-xs hover:bg-violet-700 rounded-md px-2 py-1 hover:text-white">Login</button>
          <button className="font-medium cursor-pointer md:text-base text-xs hover:bg-violet-700 rounded-md px-2 py-1 hover:text-white">Contact</button>
        </div>
      </nav>

      <div className="w-full flex flex-col lg:flex-row items-center bg-[#eef4ff] px-5 md:px-10 lg:px-16 py-8 lg:py-2">

        {/* Left Content */}
        <div className="w-full lg:w-5/12 flex flex-col items-start gap-3">
          <p className="bg-indigo-100 text-indigo-950 rounded-full px-3 py-1 text-sm font-semibold">
            About Our Project
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950">
            Smart <span className="text-violet-600">Support</span>
          </h1>

          <h2 className="text-xl md:text-2xl font-bold text-slate-950">
            A Modern Helpdesk Ticket System
          </h2>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
            Smart Support is a full-stack web application designed to simplify
            issue reporting and support management for organizations. It helps
            users raise support tickets, track their status, and get timely
            resolutions while giving admins powerful tools to manage users,
            tickets, and knowledge resources.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <button className="bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg px-5 py-3">
              View Live Project →
            </button>

            <button onClick={() =>
              window.open("https://github.com/praveenkumar-117", "_blank", "noopener,noreferrer")
            } title="Visit Github"
              className="flex items-center gap-2 border border-slate-400  text-slate-900 font-semibold rounded-lg px-5 py-3 hover:bg-violet-700 hover:text-white cursor-pointer">
              <FaGithub /> View GitHub
            </button>
          </div>
        </div>

        {/* Right Laptop Image */}
        <div className="w-full lg:w-7/12 flex justify-center items-center">
          <img
            src="/laptop1.png"
            alt="Smart Support Dashboard"
            className="w-full max-w-175 h-auto object-contain"
          />
        </div>
      </div>



      <div className="w-full flex flex-col lg:flex-row  rounded-2xl p-4 md:p-6">

        {/* Left: Feature List */}
        <div className="w-full lg:w-1/3 flex flex-col gap-2 px-2 md:px-4 py-4 bg-gray-200 rounded-l-md">
          <button onClick={() => {
            setActiveFeature(features[0]);
            setActiveFeatureIndex(0);
          }}
            className={`flex items-center justify-between gap-4  hover:bg-transparent py-2 px-4 rounded-xl font-bold text-left transition-colors rounded-r-full cursor-pointer ${activeFeatureIndex === 0 ? "bg-transparent" : "bg-white"}`}>
            <span className="flex items-center gap-4">  <Ticket className="text-green-600 shrink-0" size={30} />
              Ticket Management</span>
            <IoIosArrowForward size={20} />
          </button>

          <button onClick={() => {
            setActiveFeature(features[1]);
            setActiveFeatureIndex(1);
          }}
            className={`flex items-center justify-between gap-4  hover:bg-transparent py-2 px-4 rounded-xl font-bold text-left transition-colors rounded-r-full cursor-pointer ${activeFeatureIndex === 1 ? "bg-transparent" : "bg-white"}`}>
            <span className="flex items-center gap-4">
              <Users className="text-yellow-500 shrink-0" size={30} />
              User & Role Management</span>
            <IoIosArrowForward size={20} />
          </button>

          <button onClick={() => {
            setActiveFeature(features[2]);
            setActiveFeatureIndex(2);
          }}
            className={`flex items-center justify-between gap-4  hover:bg-transparent py-2 px-4 rounded-xl font-bold text-left transition-colors rounded-r-full cursor-pointer ${activeFeatureIndex === 2 ? "bg-transparent" : "bg-white"}`}>
            <span className="flex items-center gap-4">
              <BookOpen className="text-blue-500 shrink-0" size={30} />
              Knowledge Base</span>
            <IoIosArrowForward size={20} />
          </button>

          <button onClick={() => {
            setActiveFeature(features[3]);
            setActiveFeatureIndex(3);
          }}
            className={`flex items-center justify-between gap-4  hover:bg-transparent py-2 px-4 rounded-xl font-bold text-left transition-colors rounded-r-full cursor-pointer ${activeFeatureIndex === 3 ? "bg-transparent" : "bg-white"}`}>
            <span className="flex items-center gap-4">
              < ChartNoAxesCombined className="text-orange-600 shrink-0" size={30} />
              Reports & Insights</span>
            <IoIosArrowForward size={20} />
          </button>

          <button onClick={() => {
            setActiveFeature(features[5]);
            setActiveFeatureIndex(5);
          }}
            className={`flex items-center justify-between gap-4  hover:bg-transparent py-2 px-4 rounded-xl font-bold text-left transition-colors rounded-r-full cursor-pointer ${activeFeatureIndex === 5 ? "bg-transparent" : "bg-white"}`}>
            <span className="flex items-center gap-4">
              <LuShieldCheck className="text-violet-600 shrink-0" size={30} />
              Security & Reliability</span>
            <IoIosArrowForward size={20} />
          </button>

          <button onClick={() => {
            setActiveFeature(features[4]);
            setActiveFeatureIndex(4);
          }}
            className={`flex items-center justify-between gap-4  hover:bg-transparent py-2 px-4 rounded-xl font-bold text-left transition-colors rounded-r-full cursor-pointer ${activeFeatureIndex === 4 ? "bg-transparent" : "bg-white"}`}>
            <span className="flex items-center gap-4">
              <Sparkles className="text-pink-600 shrink-0" size={30} />
              Easy to Use</span>
            <IoIosArrowForward size={20} />
          </button>
        </div>

        {/* Center: Feature Details */}
        <div className="w-full lg:w-1/3 flex gap-3 px-2 md:px-4 py-4 bg-gray-200">
          {(() => {
            const Icon = activeFeature.icon;

            return (
              <Icon
                className={`${activeFeature.color} shrink-0`}
                size={32}
              />
            );
          })()}

          <div className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {activeFeature.title}
            </h2>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              {activeFeature.description}
            </p>

            <ul className="flex flex-col gap-2 text-sm md:text-base text-slate-700">
              {activeFeature.points.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500  shrink-0"><FaRegCircleCheck /></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="w-full lg:w-1/3 flex items-center justify-center bg-gray-200 rounded-r-md">
          <img
            src="/friend.png"
            alt="Smart Support ticket management"
            className="w-full max-w-100 h-auto object-contain"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 px-4">
        <h1 className="font-extrabold text-4xl">
          Technologies <span className="text-violet-600">Used</span>
        </h1>
        <p className="text-gray-600">Built with modern and popular technologies</p>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Frontend Technologies */}
          <div className="w-full lg:w-1/2 flex items-start gap-2 bg-[#eef4ff] p-3 rounded-md">
            <FiMonitor className="bg-indigo-200 text-indigo-500 p-1.5 rounded-md shrink-0" size={40} />

            <div className="flex flex-col gap-3 min-w-0">
              <h2 className="text-xl font-bold">Frontend Technologies</h2>
              <p className="text-sm font-bold text-gray-600">
                Technologies used for client-side development
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                {/* React */}
                <div className="group flex items-center gap-2 bg-cyan-200 rounded-full p-1 w-10 hover:w-24 overflow-hidden transition-[width] duration-300 ease-in-out cursor-pointer">
                  <FaReact className="text-cyan-600 shrink-0" size={32} />
                  <span className="text-xs font-medium text-cyan-800 whitespace-nowrap hidden group-hover:block">
                    React
                  </span>
                </div>

                {/* JavaScript */}
                <div className="group flex items-center gap-2 bg-zinc-900 rounded-full p-1 w-10 hover:w-32 overflow-hidden transition-[width] duration-300 ease-in-out cursor-pointer">
                  <FaJs className="text-yellow-400 shrink-0" size={32} />
                  <span className="text-xs font-medium text-yellow-400 whitespace-nowrap hidden group-hover:block">
                    JavaScript
                  </span>
                </div>

                {/* Tailwind CSS */}
                <div className="group flex items-center gap-2 bg-sky-300 rounded-full p-1 w-10 hover:w-32 overflow-hidden transition-[width] duration-300 ease-in-out cursor-pointer">
                  <SiTailwindcss className="text-sky-800 shrink-0" size={32} />
                  <span className="text-xs font-medium text-sky-950 whitespace-nowrap hidden group-hover:block">
                    Tailwind CSS
                  </span>
                </div>

                {/* Redux Toolkit */}
                <div className="group flex items-center gap-2 bg-violet-300 rounded-full p-1 w-10 hover:w-32 overflow-hidden transition-[width] duration-300 ease-in-out cursor-pointer">
                  <SiRedux className="text-violet-800 shrink-0" size={32} />
                  <span className="text-xs font-medium text-violet-950 whitespace-nowrap hidden group-hover:block">
                    Redux Toolkit
                  </span>
                </div>

                {/* TanStack Query */}
                <div className="group flex items-center gap-2 bg-fuchsia-300 rounded-full p-1 w-10 hover:w-36 overflow-hidden transition-[width] duration-300 ease-in-out cursor-pointer">
                  <SiTanstack className="text-fuchsia-800 shrink-0" size={32} />
                  <span className="text-xs font-medium text-fuchsia-950 whitespace-nowrap hidden group-hover:block">
                    TanStack Query
                  </span>
                </div>

                {/* Recharts */}
                <div className="group flex items-center gap-2 bg-gray-300 rounded-full p-1 w-10 hover:w-28 overflow-hidden transition-[width] duration-300 ease-in-out cursor-pointer">
                  <LuSquareChartGantt className="text-gray-800 shrink-0" size={32} />
                  <span className="text-xs font-medium text-gray-950 whitespace-nowrap hidden group-hover:block">
                    Recharts
                  </span>
                </div>

                {/* Lucide */}
                <div className="group flex items-center gap-2 bg-rose-300 rounded-full p-1 w-10 hover:w-24 overflow-hidden transition-[width] duration-300 ease-in-out cursor-pointer">
                  <SiLucide className="text-rose-800 shrink-0" size={32} />
                  <span className="text-xs font-medium text-rose-950 whitespace-nowrap hidden group-hover:block">
                    Lucide
                  </span>
                </div>
              </div>
            </div>
          </div>

          <hr className="hidden lg:block" />

          {/* Backend Technologies */}
          <div className="w-full lg:w-1/2 flex items-start gap-2 bg-[#eef4ff] p-3 rounded-md">
            <FaBarsProgress className="bg-green-200 text-green-500 p-1.5 rounded-md shrink-0" size={40} />

            <div className="flex flex-col gap-3 min-w-0">
              <h2 className="text-xl font-bold">Backend Technologies</h2>
              <p className="text-sm font-bold text-gray-600">
                Technologies used for server-side development
              </p>

              <div className="flex flex-wrap gap-4 items-center ">
                {/* Node.js */}
                <div className="group flex items-center gap-2 bg-green-300 rounded-full p-1 w-10 hover:w-28 overflow-hidden transition-[width] duration-300 ease-in-out cursor-pointer">
                  <FaNodeJs className="text-green-800 shrink-0" size={32} />
                  <span className="text-xs font-medium text-green-950 whitespace-nowrap hidden group-hover:block">
                    Node.js
                  </span>
                </div>

                {/* Express */}
                <div className="group flex items-center gap-2 bg-gray-300 rounded-full p-1 w-10 hover:w-28 overflow-hidden transition-[width] duration-300 ease-in-out cursor-pointer">
                  <SiExpress className="text-gray-900 shrink-0" size={32} />
                  <span className="text-xs font-medium text-gray-900 whitespace-nowrap hidden group-hover:block">
                    Express
                  </span>
                </div>

                {/* MongoDB */}
                <div className="group flex items-center gap-2 bg-emerald-300 rounded-full p-1 w-10 hover:w-32 overflow-hidden transition-[width] duration-300 ease-in-out cursor-pointer">
                  <SiMongodb className="text-green-800 shrink-0" size={32} />
                  <span className="text-xs font-medium text-green-950 whitespace-nowrap hidden group-hover:block">
                    MongoDB
                  </span>
                </div>

                {/* JWT */}
                <div className="group flex items-center gap-2 bg-pink-300 rounded-full p-1 w-10 hover:w-24 overflow-hidden transition-[width] duration-300 ease-in-out cursor-pointer">
                  <SiJsonwebtokens className="text-pink-800 shrink-0" size={32} />
                  <span className="text-xs font-medium text-pink-950 whitespace-nowrap hidden group-hover:block">
                    JWT
                  </span>
                </div>

                {/* Postman */}
                <div className="group flex items-center gap-2 bg-orange-300 rounded-full p-1 w-10 hover:w-32 overflow-hidden transition-[width] duration-300 ease-in-out cursor-pointer">
                  <SiPostman className="text-orange-800 shrink-0" size={32} />
                  <span className="text-xs font-medium text-orange-950 whitespace-nowrap hidden group-hover:block">
                    Postman
                  </span>
                </div>

                {/* Bcrypt */}
                <div className="group flex items-center gap-2 bg-slate-300 rounded-full p-1 w-10 hover:w-28 overflow-hidden transition-[width] duration-300 ease-in-out cursor-pointer">
                  <BsFillShieldLockFill className="text-slate-800 shrink-0" size={32} />
                  <span className="text-xs font-medium text-slate-800 whitespace-nowrap hidden group-hover:block">
                    Bcrypt
                  </span>
                </div>

                {/* Cloudinary */}
                <div className="group flex items-center gap-2 bg-indigo-300 rounded-full p-1 w-10 hover:w-32 overflow-hidden transition-[width] duration-300 ease-in-out cursor-pointer">
                  <IoMdCloudUpload className="text-indigo-800 shrink-0" size={32} />
                  <span className="text-xs font-medium text-indigo-950 whitespace-nowrap hidden group-hover:block">
                    Cloudinary
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>



      <div className="w-full flex flex-col md:flex-row items-center gap-4 bg-[#eef4ff] mt-4 rounded-2xl p-4">

        {/* Developer Image */}
        <div className="w-full md:w-1/5 flex rounded-lg py-4 justify-center shrink-0">
          <img
            src="/prvn.png"
            alt="Developer"
            className="border-4 border-zinc-800 rounded-full w-28 h-28 object-cover"
          />
        </div>

        {/* Developer Introduction */}
        <div className="flex-1 min-w-0">
          <h1 className="font-extrabold text-xl md:text-2xl">
            About the <span className="text-violet-700">Developer</span>
          </h1>

          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
            Hi, I'm Praveen Kumar, a MERN stack developer passionate about
            building modern web applications. Smart Support is one of my
            personal projects to showcase my skills in full-stack development,
            clean UI design, and real-world problem solving.
          </p>

          <div className="flex flex-wrap justify-around gap-3 mt-4 text-center">
            <div>
              <h2 className="text-2xl font-extrabold text-violet-700">3+</h2>
              <p className="text-sm text-gray-600">Years of Learning</p>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-violet-700">10+</h2>
              <p className="text-sm text-gray-600">Projects Built</p>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-violet-700">MERN</h2>
              <p className="text-sm text-gray-600">Primary Stack</p>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-violet-700">Clean UI</h2>
              <p className="text-sm text-gray-600">Design Focus</p>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="w-full md:w-1/5 flex flex-col gap-3 bg-gray-300 rounded-xl p-4">
          <div>
            <h2 className="flex item-center  font-bold text-gray-800"><FaMapPin className="text-indigo-500  rounded-full" size={20} /> Jodhpur, India</h2>
            <p className="text-sm text-gray-600">Based in India</p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-gray-800">Get in touch</h2>
            <div className="flex gap-4">

              <FaRegEnvelope className="text-sky-500 bg-sky-200  rounded-lg p-1" size={30} />
              <FaLinkedin className="text-blue-700  bg-blue-200 rounded-lg p-1" size={30} />
              <FaGithub onClick={() =>
                window.open("https://github.com/praveenkumar-117", "_blank", "noopener,noreferrer")
              } title="Visit Github"
                className="text-black  bg-zinc-500 rounded-lg p-1 cursor-pointer" size={30} />
            </div>
          </div>
        </div>

      </div>


      <div className="w-full flex justify-center items-center bg-zinc-900 px-4 py-3 text-sm text-gray-200 text-center">
        © 2026 Smart Support. All rights reserved. Built with 💜 by Praveen Kumar.
      </div>
    </>
  )
}

export default AboutProject
