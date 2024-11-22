import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { fetchUsers, fetchRoles } from "../mock/api";
import { motion } from "framer-motion";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      fetchUsers().then((users) => {
        setUsers(users);
        localStorage.setItem("users", JSON.stringify(users));
      });
    }

    const storedRoles = localStorage.getItem("roles");
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles));
    } else {
      fetchRoles().then((roles) => {
        setRoles(roles);
        localStorage.setItem("roles", JSON.stringify(roles));
      });
    }
  }, []);

  const handleSave = (updatedUser) => {
    let updatedUsers;
    if (updatedUser.id) {
      updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
    } else {
      updatedUser.id = users.length + 1;
      updatedUsers = [...users, updatedUser];
    }
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-100 mb-6">User Management</h2>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full max-w-sm px-4 py-2 border rounded-md bg-gray-700 text-gray-300"
        />
        <button
          onClick={() => {
            setCurrentUser({ name: "", role: "", status: "Active" });
            setShowModal(true);
          }}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add User
        </button>
      </div>
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-700 hover:border hover:border-gray-500 transition-all duration-300"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 mr-4"
                      onClick={() => {
                        setCurrentUser(user);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal
          user={currentUser}
          roles={roles}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default UserManagement;
