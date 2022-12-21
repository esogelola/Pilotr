import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";

type Props = {
  title: string;
  description: string;
  date: string;
  totalDataUsed: number;
};
const Card = ({ title, description, date, totalDataUsed }: Props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
    
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="font-bold text-xl mb-2">{title} </div>
          </div>
          <div className="flex flex-col">
            <button className="px-4 py-2  text-black rounded-full">
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
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>
        </div>

        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {date}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {totalDataUsed}%
        </span>
        <div className="relative rounded-full h-2 w-full bg-gray-300 mt-2">
          <div
            className={`absolute inset-0 rounded-full h-2 ${
              totalDataUsed > 50
                ? "bg-red-500"
                : totalDataUsed > 25
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{ width: `${totalDataUsed}%` }}
          />
        </div>
      </div>
      <div className="px-6 py-4 flex justify-between">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-full">
          View
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-full">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
