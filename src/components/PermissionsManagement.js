import React, { useState, useEffect } from "react";
import { fetchUsers, fetchRoles, fetchPermissions } from "../mock/api";
import { motion } from "framer-motion";

const PermissionsManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    const storedRoles = localStorage.getItem("roles");
    const storedPermissions = localStorage.getItem("permissions");

    if (storedUsers && storedRoles && storedPermissions) {
      setUsers(JSON.parse(storedUsers));
      setRoles(JSON.parse(storedRoles));
      setPermissions(JSON.parse(storedPermissions));
    } else {
      Promise.all([fetchUsers(), fetchRoles(), fetchPermissions()]).then(
        ([usersData, rolesData, permissionsData]) => {
          setUsers(usersData);
          setRoles(rolesData);
          setPermissions(permissionsData);
          localStorage.setItem("users", JSON.stringify(usersData));
          localStorage.setItem("roles", JSON.stringify(rolesData));
          localStorage.setItem("permissions", JSON.stringify(permissionsData));
        }
      );
    }
  }, []);

  const getRolePermissions = (roleName) => {
    const role = roles.find((role) => role.name === roleName);
    return role ? role.permissions : [];
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-100 mb-6">
        Permissions Management
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 shadow-lg rounded-lg p-6"
      >
        <h3 className="text-2xl font-semibold mb-4 text-gray-200">
          User Permissions Overview
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 bg-gray-900 rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                {permissions.map((perm) => (
                  <th
                    key={perm}
                    className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    {perm}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {users.map((user) => {
                const userPermissions = getRolePermissions(user.role);
                return (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-700 transition-all duration-300"
                  >
                    <td className="px-6 py-4 text-white">{user.name}</td>
                    <td className="px-6 py-4 text-gray-300">{user.role}</td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.status === "Active"
                            ? "bg-green-500 text-green-900"
                            : "bg-red-500 text-red-900"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    {permissions.map((perm) => (
                      <td key={perm} className="px-6 py-4 text-center">
                        {userPermissions.includes(perm) ? (
                          <span className="text-green-500 text-lg">✔</span>
                        ) : (
                          <span className="text-red-500 text-lg">✖</span>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default PermissionsManagement;
