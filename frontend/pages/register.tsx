import React from "react";
import CountryDropdown from "../components/Input/CountryDropdown";
import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";
import HomeNavbar from "../components/Home/HomeNavbar";

interface registerProps {
  name: string;
}

export default function Register({}: registerProps) {
  const [step, setStep] = React.useState(1);

  // User related states
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");

  // Company related states
  const [country, setCountry] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [companyAddress, setCompanyAddress] = React.useState("");
  const [employeeCount, setEmployeeCount] = React.useState("");

  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.MouseEvent) => {};

  return (
    // Background image and gradient
    <div>
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full">
          <div className="relative h-full max-w-screen-xl mx-auto">
            <svg
              className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="784"
                fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
              />
            </svg>
            <svg
              className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 lg:-translate-x-1/2"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="784"
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
            <svg
              className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="d3eb07ae-5182-43e6-857d-35c643af9034"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="784"
                fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
              />
            </svg>
          </div>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
              <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                  <div className="max-w-md mx-auto">
                    <div className="flex items-center space-x-5">
                      <div className="h-14 w-14 bg-gray-100 rounded-full flex justify-center items-center text-orange-500 text-2xl font-mono">
                        <Link href="/">P</Link>
                      </div>
                      <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                        <h2 className="leading-relaxed">Register</h2>
                        <p className="text-sm text-gray-500 font-normal leading-relaxed">
                          Register your company now, it&apos;s free!
                        </p>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                      <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                        <div className="flex flex-row space-x-4">
                          <div className="flex-1">
                            <label className="leading-loose">First Name</label>
                            <input
                              type="text"
                              id="first-name"
                              name="first-name"
                              placeholder="John"
                              onChange={(e) => setFirstName(e.target.value)}
                              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="leading-loose">Last Name</label>
                            <input
                              type="text"
                              id="last-name"
                              name="last-name"
                              placeholder="Doe"
                              onChange={(e) => setLastName(e.target.value)}
                              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <label className="leading-loose">Job Title</label>
                          <input
                            type="text"
                            id="job-title"
                            name="job-title"
                            placeholder="Software Engineer"
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="leading-loose">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder=""
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-2 border rounded-full border-gray-300 mt-1 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="leading-loose">Password</label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder=""
                            className="px-4 py-2 border rounded-full border-gray-300 mt-1 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          />
                        </div>

                        {/* Employee count drop down*/}
                        <div className="flex flex-col">
                          <label className="leading-loose">
                            Employee Count
                          </label>
                          <select
                            id="employee-count"
                            name="employee-count"
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
                          >
                            <option value="1-10">1-10</option>
                            <option value="11-50">11-50</option>
                            <option value="51-100">51-100</option>
                            <option value="101-500">101-500</option>
                            <option value="501-1000">501-1000</option>
                            <option value="1001-5000">1001-5000</option>
                            <option value="5001-10000">5001-10000</option>
                            <option value="10001+">10001+</option>
                          </select>
                        </div>

                        {/* Country drop down */}

                        <div className="flex flex-col">
                          <label className="leading-loose">
                            Country/Region
                          </label>
                          <CountryDropdown
                            id="country"
                            name="country"
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
                            value="US"
                            onChange={() => {}}
                          />
                        </div>

                        <div className="flex items-center space-x-4">
                          <input
                            id="remember_me"
                            name="remember_me"
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                          />
                          <label className="text-gray-700">
                            I agree to the{" "}
                            <a
                              href="#"
                              className="font-semibold text-blue-600 hover:text-blue-500"
                            >
                              privacy policy
                            </a>
                          </label>
                        </div>
                      </div>
                      <div className="pt-4 flex items-center space-x-4">
                        <button
                          className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                          style={{ backgroundColor: "#FFD700" }}
                          onClick={async (e) => await handleSubmit(e)}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
