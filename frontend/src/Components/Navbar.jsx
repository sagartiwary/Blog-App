import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "./AuthContext";
import { BsMoon, BsSun } from "react-icons/bs";

export const Navbar = () => {
  const { userName, setUserName, } = useContext(Auth);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const handleLogout = () => {
    fetch(`https://witty-suit-tick.cyclic.cloud/blogs/logout`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserName(false);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleMode = () => {
    setToggle(!toggle);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div>
      <nav
        className={`bg-${
          toggle ? "gray-900" : "white"
        } border-gray-200 dark:bg-gray-900`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span
              className={`self-center text-2xl font-semibold whitespace-nowrap ${
                toggle ? "text-white" : "text-gray-900"
              } dark:text-white`}
            >
              Blog
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm ${
              toggle ? "text-gray-400" : "text-gray-500"
            } rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 ${
              toggle ? "focus:ring-gray-600" : "focus:ring-gray-200"
            } dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-5 h-5 ${toggle ? "text-white" : "text-black"}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke={toggle ? "white" : "black"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`hidden w-full md:block md:w-auto ${
              toggle ? "text-white" : "text-gray-900"
            } dark:text-white`}
            id="navbar-default"
          >
            <ul
              className={`font-medium flex flex-col p-4 md:p-0 mt-4 border ${
                toggle ? "border-gray-700" : "border-gray-100"
              } rounded-lg bg-${
                toggle ? "gray-800" : "gray-50"
              } md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-${
                toggle ? "gray-800" : "white"
              } dark:bg-gray-800 dark:border-gray-700 md:dark:bg-gray-900 md:dark:border-gray-700`}
            >
              <li>
                <Link
                  to={"/"}
                  className={`block py-2 pl-3 pr-4 ${
                    toggle ? "text-gray-200" : "text-gray-900"
                  } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              {userName ? (
                <>
                  <li>
                    <Link
                      to={"/create"}
                      className={`block py-2 pl-3 pr-4 ${
                        toggle ? "text-gray-200" : "text-gray-900"
                      } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                    >
                      Create User
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className={`block py-2 pl-3 pr-4 ${
                        toggle ? "text-gray-200" : "text-gray-900"
                      } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to={"/register"}
                      className={`block py-2 pl-3 pr-4 ${
                        toggle ? "text-gray-200" : "text-gray-900"
                      } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/login"}
                      href="#"
                      className={`block py-2 pl-3 pr-4 ${
                        toggle ? "text-gray-200" : "text-gray-900"
                      } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
              <li>
                {toggle ? (
                  <BsMoon onClick={toggleMode} className="w-[80px] h-[30px]" />
                ) : (
                  <BsSun onClick={toggleMode} className="w-[80px] h-[30px]" />
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
