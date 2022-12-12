import React, { useState } from "react";

export default function Sidebar() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col w-64 bg-gray-800">
      <div className="flex flex-col flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="flex flex-col flex-1">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              className="w-auto h-8"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
              alt="Workflow"
            />
          </div>
          <nav className="flex flex-col flex-1 mt-5 space-y-1">
            <a
              href="#"
              className="flex items-center px-2 py-2 text-sm font-medium text-white bg-gray-900 rounded-md group"
            >
              <svg
                className="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9zm3 0v10h14V9H6zm5 0h4m-4 4h4"
                />
              </svg>
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md group hover:text-white hover:bg-gray-700"
            >
              <svg
                className="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              Team
            </a>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md group hover:text-white hover:bg-gray-700"
            >
              <svg
                className="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 21v-6a3 3 0 016 0v6m-3-9a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Projects
            </a>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md group hover:text-white hover:bg-gray-700"
            >
              <svg
                className="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Calendar
            </a>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md group hover:text-white hover:bg-gray-700"
            >
              <svg
                className="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Documents
            </a>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md group hover:text-white hover:bg-gray-700"
            >
              <svg
                className="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Reports
            </a>
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
          <a href="#" className="flex-shrink-0 group block">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1517841900229-3a7e3c4d913c?ixlib=rb-1.2.1&ixqx=J2m4y0r0Jn&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Tom Cook</p>
                <p className="text-xs font-medium text-gray-400 group-hover:text-gray-300">
                  View profile
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
