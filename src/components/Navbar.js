import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/users", label: "Users" },
    { path: "/roles", label: "Roles" },
    { path: "/permissions", label: "Permissions" },
  ];

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">RBAC Dashboard</h1>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
        <ul className="hidden md:flex space-x-6">
          {navItems.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`hover:text-blue-400 transition-colors duration-200 ${
                  isActive(path) ? "text-blue-400 font-semibold" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {isMenuOpen && (
        <motion.ul
          className="absolute top-0 left-0 w-full bg-gray-800 text-white flex flex-col items-start px-6 py-4 space-y-4 md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map(({ path, label }) => (
            <motion.li key={path} whileHover={{ scale: 1.05 }}>
              <Link
                to={path}
                className={`block hover:text-blue-400 transition-colors duration-200 ${
                  isActive(path) ? "text-blue-400 font-semibold" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </nav>
  );
};

export default Navbar;
