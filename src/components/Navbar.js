import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-800 text-white px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">RBAC Dashboard</h1>
        <ul className="flex space-x-6">
          {[
            { path: "/", label: "Dashboard" },
            { path: "/users", label: "Users" },
            { path: "/roles", label: "Roles" },
            { path: "/permissions", label: "Permissions" },
          ].map(({ path, label }) => (
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
    </nav>
  );
};

export default Navbar;
