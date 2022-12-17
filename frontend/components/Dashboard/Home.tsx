import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col w-0 flex-1 overflow-hidden">
      <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden">
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="flex-1 px-4 flex justify-between">
          <div className="flex-1 flex">
            <form className="w-full flex md:ml-0" action="#" method="GET">
              <label htmlFor="search_field" className="sr-only">
                Search
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 14.707a1 1 0 010-1.414L10.586 10 6.293 5.707a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search_field"
                  name="search_field"
                  className="block w-full h-full pl-8 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-0 focus:border-gray-300 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </form>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <button className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 relative overflow-y-auto focus:outline-none">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
