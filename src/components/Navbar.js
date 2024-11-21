import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between">
      <h1 className="text-lg font-bold">RBAC Dashboard</h1>
      <ul className="flex space-x-4">
        <li>
          <a href="/" className="hover:text-blue-400">
            Dashboard
          </a>
        </li>
        <li>
          <a href="/users" className="hover:text-blue-400">
            Users
          </a>
        </li>
        <li>
          <a href="/roles" className="hover:text-blue-400">
            Roles
          </a>
        </li>
        <li>
          <a href="/permissions" className="hover:text-blue-400">
            Permissions
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
