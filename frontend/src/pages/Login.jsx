import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Zap,
  Users,
  Smile,
  Headset,
  Mail,
  Lock,
  Ticket,
  Bell,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import MessagePopup from "../components/otherComponents/MessagePopup";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      const result = await dispatch(loginUser(formData)).unwrap();

      if (result.user.role === "support_admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }

    } catch (error) {
      console.log("Login failed:", error);
      setErrorMessage(
        typeof error === "string"
          ? error
          : "Login failed. Please try again."
      );
    }
  };
  return (
   <div className="flex flex-col h-screen ">
      <nav className="w-full h-14 flex justify-between bg-gray-200">
        <div className="md:w-1/3 w-1/5 flex items-center justify-center">
          <img
            src="logo123.png"
            alt=""
            style={{ width: "80px", height: "60px" }}
            className="py-1"
          />
        </div>

        <div className=" w-full flex items-center justify-center">
         
          <button onClick={() => navigate("/about-project")}
           className="font-medium cursor-pointer md:text-base text-xs px-2 py-1 rounded-md hover:bg-violet-500 hover:text-white">About Project</button>
          <button className=" font-medium cursor-pointer md:text-base text-xs  px-2 py-1 rounded-md hover:bg-violet-500 hover:text-white">Contact</button>
        </div>
      </nav>

      <div className=" w-full flex-1 flex flex-col ">

        <div className="w-full lg:h-auto md:h-3/4 px-12 md:py-2.5 py-6 flex flex-col gap-4  md:flex-row bg-[url('/bg.png')]   bg-cover bg-top bg-no-repeat">

          <div className=" md:w-1/2 lg:w-1/2 h-full p-6 flex flex-col gap-4 rounded-2xl ">
            <div className="flex  flex-col items-start">
              <h1 className="text-white text-4xl font-bold">Smart Support</h1>
              <h1 className="text-4xl text-blue-600 font-bold">
                Better Solutions.
              </h1>
            </div>

            <div className="text-gray-200 text-xs">
              <p>
                Helpdesk Ticket System makes it easy to track, manage and
                resolve support tickets efficiently. Get faster responses and
                happier users.
              </p>
            </div>
            <div className="flex gap-2.5">
              <Ticket
                className="bg-blue-700 text-white p-2.5 rounded-md"
                size={40}
              />
              <div className="text-white">
                <h1 className=" text-white font-semibold">
                  Easy Ticket Management
                </h1>
                <p className="text-xs text-gray-300">
                  Create, track and manage tickets in one place.
                </p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <Users
                className="bg-green-700 text-white p-2.5 rounded-md"
                size={40}
              />
              <div className="text-white">
                <h1 className="text-white font-semibold">Team Collaboration</h1>
                <p className="text-xs text-gray-300">
                  Assign tickets, add comments and collaborate seamlessly.
                </p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <Bell className="bg-amber-600 p-2.5 rounded-md" size={40} />
              <div className="text-white">
                <h1 className="text-white font-semibold">Real-time Updates</h1>
                <p className="text-xs text-gray-300">
                  Stay updated with real-time notifications and ticket status.
                </p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <ChartNoAxesColumnIncreasing
                className="bg-red-500 text-white p-2.5 rounded-md"
                size={40}
              />
              <div className="text-white">
                <h1 className="text-white font-semibold">Powerful Dashboard</h1>
                <p className="text-xs text-gray-300">
                  Get insights with reports and analytics to improve support.
                </p>
              </div>
            </div>
          </div>

          <div className="md:hidden flex lg:flex md:w-1/3 h-full items-end justify-center">
            <img
              src="/hero.png"
              alt=""
              style={{ width: "325px", height: "225px" }}
            />
          </div>

          <div className="lg:w-1/2 md:w-1/2 h-full  rounded-4xl bg-gray-100 py-6">
            <div className="w-full  mt-2  flex flex-col items-center">
              <Headset size={55} className="bg-green-300 rounded-4xl p-2" />
              <h1 className="font-bold text-2xl">Welcome Back</h1>
              <p className="font-semibold text-gray-600">
                Login to continue to your account
              </p>
            </div>

            <div className="w-full flex flex-col gap-5 items-start justify-items-start mt-4 px-8 py-2">
              <div className="w-full flex flex-col gap-1">
                <h1 className="flex items-center gap-1">
                  <Mail size={20} className="text-blue-500" />
                  Email Address
                </h1>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-1"
                />
              </div>

              <div className="w-full flex flex-col gap-1">
                <h1 className="flex items-center gap-1">
                  {" "}
                  <Lock size={20} className="text-amber-500" />
                  Password
                </h1>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-1"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-0.75 bg-purple-400 font-semibold rounded-lg hover:bg-purple-600 hover:text-white disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Logging in..." : "Login"}
              </button>


            </div>
          </div>
        </div>

        <div className="w-full h-1/4  flex flex-col justify-end">

          <div className="w-full md:h-4/5 h-auto  flex  md:flex-nowrap flex-wrap md:flex-row md:gap-2 gap-2 md:p-3 p-3 bg-gray-200">

            <div className="md:w-1/4 w-[48%] md:h-full flex px-4 bg-purple-300 rounded-lg">
              <div className="flex items-center gap-3">
                <ShieldCheck size={55} className="text-purple-600 bg-purple-200 p-1 rounded-xl" />

                <div>
                  <h3 className="font-bold ">Secure & Reliable</h3>
                  <p className="md:text-sm text-xs py-1 text-gray-800">
                    Enterprise-grade security to keep your data safe.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-1/4 w-[48%]  md:h-full flex px-4 bg-green-300 rounded-lg">
              <div className="flex items-center gap-3">
                <Zap size={55} strokeWidth={1.5} className="text-green-500 p-1 rounded-xl bg-green-200" />

                <div>
                  <h3 className="font-bold md:text-base text-sm">Fast & Efficient</h3>
                  <p className=" text-gray-800 md:text-sm text-xs py-1">
                    Enterprise-grade security to keep your data safe.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-1/4 w-[48%]  md:h-full flex px-4 bg-yellow-300 rounded-lg">
              <div className="flex items-center gap-3">
                <Users
                  size={55}
                  strokeWidth={1.5}
                  className="text-orange-500 p-1 rounded-xl bg-yellow-200"
                />

                <div>
                  <h3 className="font-bold md:text-base text-sm">Team Productivity</h3>
                  <p className=" text-gray-800 md:text-sm text-xs py-1">
                    Enterprise-grade security to keep your data safe.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-1/4 w-[48%] md:h-full flex px-4 bg-rose-300 rounded-lg">
              <div className="flex items-center gap-3">
                <Smile size={55} strokeWidth={1.5} className="text-rose-500 p-1 rounded-xl bg-rose-200" />

                <div>
                  <h3 className="font-bold md:text-base text-sm">Happy Customers</h3>
                  <p className="md:text-sm text-xs py-1 text-gray-800">
                    Enterprise-grade security to keep your data safe.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-1/5 bg-gray-100 flex justify-center items-center">
            <h1 className="text-xs font-semibold">
              © 2026 Helpdesk Ticket System All Rights Reserved
            </h1>
          </div>
        </div>
      </div>
      {errorMessage && (
        <MessagePopup
          message={errorMessage}
          type="error"
          onClose={() => setErrorMessage("")}
        />
      )}
    </div>
  );
};

export default Login;
