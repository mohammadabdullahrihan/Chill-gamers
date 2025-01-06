import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../AuthProvider";
import { Typewriter } from "react-simple-typewriter";
import logo from "/public/logo.png";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeContext } from "../Theme";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
  className="navbar pt-5 sticky top-0 z-50 px-6 shadow-md"
  style={{
    backgroundColor: "#f8f9fa", // Default light background
    margin: "0 auto",
    maxWidth: "1200px", // Optional: Width constraint for centered content
  }}
>
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        {user ? (
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 text-white text-sm font-semibold rounded-xl bg-black hover:bg-black hover:text-white hover:rounded-xl"
                : "px-4 py-2 text-sm font-semibold"
            }
          >
            Home
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 text-white text-sm font-semibold rounded-xl bg-black hover:bg-black hover:text-white hover:rounded-xl"
                : "px-4 py-2 text-sm font-semibold"
            }
          >
            Login
          </NavLink>
        )}
        {user ? (
          <NavLink
            to="/reviews"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 text-white text-sm font-semibold rounded-xl bg-black hover:bg-black hover:text-white hover:rounded-xl"
                : "px-4 py-2 text-sm font-semibold"
            }
          >
            All Review
          </NavLink>
        ) : (
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 text-white text-sm font-semibold rounded-xl bg-black hover:bg-black hover:text-white hover:rounded-xl"
                : "px-4 py-2 text-sm font-semibold"
            }
          >
            Register
          </NavLink>
        )}

        {user ? (
          <>
            <NavLink
              to="/addreview"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 text-white text-sm font-semibold rounded-xl bg-black hover:bg-black hover:text-white hover:rounded-xl"
                  : "px-4 py-2 text-sm font-semibold"
              }
            >
              Add Review
            </NavLink>

            <NavLink
              to="/myreviews"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 text-white font-semibold bg-black rounded-xl"
                  : "px-4 py-2 font-semibold"
              }
            >
              My Reviews
            </NavLink>
            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 text-white bg-black rounded-xl"
                  : "px-4 py-2 font-semibold"
              }
            >
              Wishlist
            </NavLink>
          </>
        ) : (
          []
        )}
      </ul>
    </div>

    <Link to="/" className="flex items-center space-x-2">
      <img src={logo} alt="Logo" className="h-10 w-8 rounded-full" />
      <div className="text-xl font-bold">
        <Typewriter words={["Chill Gamer"]} loop />
      </div>
    </Link>
  </div>

  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 space-x-5 text-lg font-medium">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "px-4 py-2 text-[#fa3d3d] rounded-xl" : "px-4 py-2"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/reviews"
        className={({ isActive }) =>
          isActive ? "px-4 py-2 text-[#fa3d3d] rounded-xl" : "px-4 py-2"
        }
      >
        All Reviews
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/addreview"
            className={({ isActive }) =>
              isActive ? "px-4 py-2 text-[#fa3d3d] rounded-xl" : "px-4 py-2"
            }
          >
            Add Review
          </NavLink>
          <NavLink
            to="/myreviews"
            className={({ isActive }) =>
              isActive ? "px-4 py-2 text-[#fa3d3d] rounded-xl" : "px-4 py-2"
            }
          >
            My Reviews
          </NavLink>
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              isActive ? "px-4 py-2 text-[#fa3d3d] rounded-xl" : "px-4 py-2"
            }
          >
            Wishlist
          </NavLink>
        </>
      )}
    </ul>
  </div>

  <div className="navbar-end flex items-center space-x-4">
    {user ? (
      <div className="flex items-center space-x-4">
        <DarkModeSwitch onClick={toggleTheme} size={30} />
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2"
        >
          <FaSignOutAlt />
          <span>Log Out</span>
        </button>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="avatar cursor-pointer">
            <div className="w-10 rounded-full">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="relative bg-gray-100 dropdown-content mt-3 p-4 shadow-lg rounded-box w-[200px] dark:bg-gray-800 dark:text-white"
          >
            <li>
              <span className="font-semibold text-xl">
                {user.displayName}
              </span>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <FaSignOutAlt />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    ) : (
      <div className="space-x-5">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "px-4 py-2 text-[#fa3d3d] rounded-xl" : "px-4 py-2"
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive ? "px-4 py-2 text-[#fa3d3d] rounded-xl" : "px-4 py-2"
          }
        >
          Register
        </NavLink>
      </div>
    )}
  </div>
</div>
  );
};

export default Navbar;
