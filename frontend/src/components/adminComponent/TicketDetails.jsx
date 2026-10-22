import {
  ArrowUpNarrowWide,
  Calendar,
  CheckCheck,
  ChevronRight,
  Dot,

  Globe,
  LockKeyhole,
  Mail,
  PenLine,
  Phone,
  User,
  SquareDot,
  Trash2,

  WalletMinimal,
  Volleyball,
} from "lucide-react";
import React from "react";

const TicketDetails = () => {
  return (
    <div className="flex gap-2 p-2">

 <div className="flex flex-col gap-4 w-3/4">
        <div className="w-full p-2 flex flex-col gap-1">
          < div className="flex">
            <span>Dashboard</span>
            <span>
              <ChevronRight />
            </span>
            <span className="text-gray-700">Ticket details</span>
          </div>

          <h1 className="font-bold text-2xl">Ticket details</h1>
          <p className="text-sm text-gray-600">
            Find raised Tickets and solutions for your issues.
          </p>
        </div>


        <div className="flex p-4 border border-gray-400 rounded-lg">
          <div className=" flex flex-col gap-4 w-2/3  ">
            <div className="flex gap-4">
              <span>
                <Globe
                  size={70}
                  className="p-4 rounded-lg bg-sky-100 text-sky-700"
                />
              </span>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-2xl">#TK-1248</h1>
                <h1 className="font-semibold text-lg">
                  Unable to connect to VPN
                </h1>
                <div className="flex gap-4">
                  <button className="flex gap-0.5 text-red-500 text-xs font-semibold border border-red-500 rounded-md px-2 py-1 hover:text-white hover:bg-red-500 cursor-pointer">
                    <span>
                      <ArrowUpNarrowWide size={15} />
                    </span>
                    High
                  </button>

                  <button className="flex gap-0.5 items-center text-sky-600 text-xs font-semibold border border-sky-600 rounded-md px-2 py-1 hover:text-white hover:bg-sky-500 cursor-pointer">
                    <span>
                      <Globe size={15} />
                    </span>
                    Internet
                  </button>

                  <button className="flex gap-0.5 text-orange-500 text-xs font-semibold border border-orange-500 rounded-md px-2 py-1 hover:text-white hover:bg-orange-500 cursor-pointer">
                    <span>
                      <SquareDot size={15} />
                    </span>
                    Open
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="flex items-center gap-2 text-xs text-gray-500">
                <span>
                  <Calendar size={15} />
                </span>{" "}
                created on 19 Aug 2026, 10.30 AM
              </h1>
              <h1 className="flex items-center gap-2 text-xs text-gray-500">
                <span>
                  <Dot size={15} />
                </span>{" "}
                Last updated on 19 Aug 2026, 10.45 AM
              </h1>
            </div>
          </div>

          <div className="w-1/3 flex flex-col gap-2 items-end justify-end ">
            <span className="w-full flex justify-start ">
              <h1 className="font-semibold text-sm">Created By</h1>
            </span>
            <div className="w-full flex gap-2">
              <span className="w-10 h-10 text-sm flex items-center justify-center text-white bg-violet-600 p-1 rounded-full">
                DB
              </span>
              <span>
                <h1 className="font-bold text-sm">Debosmita Banik</h1>
                <h1 className="font-semibold text-sm text-gray-600">
                  debosmitabanik@hotmail.com
                </h1>
              </span>
            </div>
          </div>
        </div>

        {/* Ticket Message */}
        <div className="flex  flex-col gap-4">
          <div className="flex flex-col border border-gray-400 rounded-lg">
            <div className="p-4 w-full flex gap-2 font-semibold bg-blue-100 rounded-t-lg">
              <User className="text-sky-700 " size={25} />
              <h1>User Message</h1>
            </div>

            <div className="flex p-4 gap-4 ">
              <span className="w-10 h-10 text-sm flex items-center justify-center text-white bg-violet-600 p-1 rounded-full">
                DB
              </span>

              <div className="w-full flex flex-col gap-4">
                <h1 className="w-full flex items-center justify-between font-semibold"> <span>Debosmita Banik</span> <span className="text-gray-600 text-sm">19 Aug 2026, 10.30 AM</span></h1>
                <p className="text-sm font-semibold bg-gray-200 text-gray-800 p-3 rounded-lg text-justify">
                  I am unable to connect to the office VPN from my laptop. The VPN connection
                  keeps failing with a connection error, and I am unable to access the internal
                  company resources. I have already restarted my laptop and tried reconnecting,
                  but the issue still persists. Please check and help me resolve this issue.
                </p>

              </div>

            </div>



          </div>

          <div className="flex flex-col border border-gray-400 rounded-lg">
            <div className="p-4 w-full flex gap-2 font-semibold bg-blue-100 rounded-t-lg">
              <Volleyball className="text-green-700 " size={25} />
              <h1>Admin Resolution</h1>
            </div>

            <div className="flex p-4 gap-4 ">
              <span className="w-10 h-10 text-sm flex items-center justify-center text-white bg-green-600 p-1 rounded-full">
                PK
              </span>

              <div className="w-full flex flex-col gap-4">
                <h1 className="w-full flex items-center justify-between font-semibold"> <span>Praveen Kumar</span> <span className="text-gray-600 text-sm">19 Aug 2026, 10.30 AM</span></h1>
                <p className="text-sm font-semibold bg-green-200 text-gray-800 p-3 rounded-lg text-justify">
                  The VPN issue was caused by an outdated VPN profile on the user's laptop. I
                  updated the VPN configuration, reset the profile, and verified the
                  connection. The user is now able to connect to the office VPN and access the
                  required internal resources successfully.
                </p>

              </div>

            </div>



          </div>
        </div>




      </div>

      <div className="w-1/4 flex flex-col gap-2">
        <div className="flex flex-col gap-3  p-4 border border-gray-400 rounded-lg">
          <h1 className="font-bold text-xl">Take Actions</h1>

          <label htmlFor="" className="text-sm mt-4 font-semibold">
            Change Status
          </label>
          <select
            name="category"
            id=""
            placeholder="Select Category"
            className="text-sm  p-2 focus:outline-none focus:ring-0 cursor-pointer border border-gray-400 rounded-lg"
          >
            <option value="">All Status</option>
            <option value="">Open</option>
            <option value="">In Progress</option>
            <option value="">Pending</option>
            <option value="">Resolved</option>
          </select>

          <label htmlFor="Priority" className="font-semibold text-sm">
            All Priority
          </label>
          <select
            name="category"
            id=""
            placeholder="Select Priority"
            className="text-sm rounded-lg p-2 focus:outline-none focus:ring-0 cursor-pointer border border-gray-400
            </select>
"
          >
            <option value="">All Priority</option>
            <option value="">Low</option>
            <option value="">Medium</option>
            <option value="">High</option>
          </select>

          <div className="w-full flex justify-between text-sm mt-2">
            <button className="flex items-center gap-2 border font-semibold text-indigo-600 border-indigo-600 rounded-md py-1 px-2 hover:bg-blue-600 hover:border-white  hover:text-white cursor-pointer">
              <span>
                <PenLine size={15} />
              </span>
              Edit Ticket
            </button>

            <button className="flex items-center gap-2 border text-red-600 border-red-600 rounded-md py-1 px-2  font-semibold hover:bg-red-600 hover:border-white hover:text-white cursor-pointer">
              <span>
                <Trash2 size={15} />
              </span>
              Delete Ticket
            </button>
          </div>

          <button className="flex items-center justify-center gap-2 border hover:bg-white  hover:text-green-600 border-green-600 rounded-md py-1 px-2  font-semibold bg-green-600  text-white cursor-pointer">
            <span>
              <CheckCheck size={15} />
            </span>
            Mark as Resolved
          </button>

          <button className="flex items-center justify-center gap-2 border bg-white  hover:text-white border-black rounded-md py-1 px-2  font-semibold hover:bg-violet-600  hover:border-white cursor-pointer">
            <span>
              <LockKeyhole size={15} />
            </span>
            Close Ticket
          </button>
        </div>

        <div className="flex flex-col gap-3  p-4 border border-gray-400 rounded-lg">
          <h1 className="font-bold text-xl">Ticket Informations</h1>
          <span className="flex justify-between">
            {" "}
            <h1 className="font-semibold text-xs">Ticket Id</h1>
            <h1 className="font-semibold text-xs text-indigo-600">#TK-1248</h1>
          </span>


          <span className="flex justify-between">
            {" "}
            <h1 className="font-semibold text-xs">Category</h1>
            <h1 className="font-semibold text-xs text-sky-600 flex items-center gap-2"><span><Globe size={12} /></span>Internet</h1>
          </span>


          <span className="flex justify-between">
            {" "}
            <h1 className="font-semibold text-xs">Priority</h1>
            <h1 className="font-semibold text-xs text-red-600 flex items-center gap-2"><span><ArrowUpNarrowWide size={12} /></span>High</h1>
          </span>


          <span className="flex justify-between">
            {" "}
            <h1 className="font-semibold text-xs">Status</h1>
            <h1 className="font-semibold text-xs text-orange-600 flex items-center gap-2"><span><SquareDot size={12} /></span>Open</h1>
          </span>



          <span className="flex justify-between">
            {" "}
            <h1 className="font-semibold text-xs">Created On</h1>
            <h1 className="font-semibold text-xs text-gray-800">19 Aug 2026, 10.30 Am</h1>
          </span>


          <span className="flex justify-between">
            {" "}
            <h1 className="font-semibold text-xs">Last Updated On</h1>
            <h1 className="font-semibold text-xs text-gray-800">19 Aug 2026, 10.45 Am</h1>
          </span>
        </div>


        <div className="flex flex-col gap-3  p-4 border border-gray-400 rounded-lg">
          <h1 className="font-bold text-xl">User Informations</h1>
          <span className="flex gap-2 items-center text-sm"><User size={15} />Debosmita Banik</span>
          <span className="flex gap-2 items-center text-sm"><Mail size={15} />debosmitabanik@hotmail.com</span>
          <span className="flex gap-2 items-center text-sm"><Phone size={15} />987523541</span>
          <span className="flex gap-2 items-center text-sm"><WalletMinimal size={15} />Finance Department</span>

        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
