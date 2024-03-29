import { Outlet } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

import { MdAdminPanelSettings } from "react-icons/md";

import useAdmin from "../../../../Hook/useAdmin";
import { useEffect, useState } from "react";

const SidebarDeshboad = () => {
  const [isAdmin] = useAdmin();
  const [notificationData, setNotificationData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleNotificationClick = () => {
    // Show the notification modal
    setShowModal(true);
  };
  useEffect(() => {
    // Fetch dynamic notification data when component mounts
    fetchNotificationData();
  }, []);

  const fetchNotificationData = async () => {
    try {
      const response = await fetch("http://localhost:5000/notifications");
      if (response.ok) {
        const data = await response.json();
        setNotificationData(data);
      } else {
        console.error("Failed to fetch notification data");
      }
    } catch (error) {
      console.error("Error fetching notification data:", error);
    }
  };
  return (
    <div>
      <div>
        {/* ----------  sidebar  ----- */}

        <div className="flex ">
          <div className="w-64 min-h-screen text-2xl font-bold top-14 hover:w-64 md:w-64 bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
            <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
              <ul className="flex flex-col py-4 space-y-1">
                <li className="px-5 hidden md:block">
                  {/* ----------      Header      ------- */}
                  <div className="">
                    <div className="w-full  items-center jh-14 text-white z-10">
                      <div className="items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-blue-800 border-none">
                        <img
                          className="w-full h-14"
                          src="https://i.ibb.co/YT03y3K/DASHBOAD-best-1.gif"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </li>
                {/* -------------- Notifications----------*/}
                <li>
                  <button
                    onClick={handleNotificationClick}
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Notifications
                    </span>
                    <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                      1.2k
                    </span>
                  </button>
                </li>

                {/*------------- admin condition router -------- */}

                {isAdmin ? (
                  <>
                    {/* ----------------- normal user dashboad ------------------ */}

                    <li>
                      <NavLink
                        to=""
                        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            ></path>
                          </svg>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">
                          User-Home
                        </span>
                      </NavLink>
                    </li>

                    {/* ----------------profile-------- */}

                    <li>
                      <NavLink
                        to="/dashboad/userProfile"
                        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            ></path>
                          </svg>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">
                          Profile
                        </span>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    {/* ------------------ admin Home dashboad --------- */}
                    <li>
                      <NavLink
                        to="dashboard/manageitem"
                        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            ></path>
                          </svg>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">
                          DNS-Management
                        </span>
                      </NavLink>
                    </li>

                    {/* -------------admin pannel-------- */}
                    <li>
                      <NavLink
                        to="dashboard/addItems"
                        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <MdAdminPanelSettings className="w-5 h-5"></MdAdminPanelSettings>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">
                          ADD-Product
                        </span>
                        <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                          40+
                        </span>
                      </NavLink>
                    </li>
                  </>
                )}

                {/* --------------------shared content dashboad all user------------ */}

                <li className="px-5 hidden md:block">
                  <div className="flex flex-row items-center mt-5 h-8">
                    <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                      All users
                    </div>
                  </div>
                </li>

                {/* ---------Home PAGE---- */}
                <li>
                  <Link
                    to="/"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Home
                    </span>
                  </Link>
                </li>
              </ul>
              {/* <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
              Copyright @2024
            </p> */}
            </div>
          </div>

          {/*------------- dashboard content ------------------*/}

          <div className="flex-1  p-8">
            <Outlet></Outlet>
          </div>
        </div>
      </div>

      {/* Notification modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded-md z-10">
            <h2 className="text-lg font-semibold mb-2">Notifications</h2>
            <p>
              You have <span></span> {notificationData?.length} notifications.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarDeshboad;
