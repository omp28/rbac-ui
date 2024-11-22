import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchRoles } from "../mock/api";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [editedRoleName, setEditedRoleName] = useState("");
  const [editedPermissions, setEditedPermissions] = useState([]);

  useEffect(() => {
    const storedRoles = localStorage.getItem("roles");
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles));
    } else {
      fetchRoles().then((fetchedRoles) => {
        setRoles(fetchedRoles);
        localStorage.setItem("roles", JSON.stringify(fetchedRoles));
      });
    }
  }, []);

  const handleEdit = (role) => {
    setEditingRole(role);
    setEditedRoleName(role.name);
    setEditedPermissions([...role.permissions]);
  };

  const handleSave = () => {
    const updatedRoles = roles.map((role) =>
      role.id === editingRole.id
        ? { ...role, name: editedRoleName, permissions: editedPermissions }
        : role
    );

    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
    setEditingRole(null);
  };

  const handleCancel = () => {
    setEditingRole(null);
  };

  const togglePermission = (permission) => {
    setEditedPermissions(
      editedPermissions.includes(permission)
        ? editedPermissions.filter((p) => p !== permission)
        : [...editedPermissions, permission]
    );
  };

  const availablePermissions = [
    "Read",
    "Write",
    "Delete",
    "Update",
    "Execute",
    "Modify",
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Role Management
      </h2>
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role Name
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {roles.map((role) => (
                <motion.tr
                  key={role.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-700 hover:border hover:border-gray-500 transition-all duration-300"
                >
                  {editingRole?.id === role.id ? (
                    <>
                      <td className="px-4 sm:px-6 py-4 w-1/3">
                        <input
                          type="text"
                          value={editedRoleName}
                          onChange={(e) => setEditedRoleName(e.target.value)}
                          className="w-full bg-gray-700 text-white px-2 py-1 rounded"
                        />
                      </td>
                      <td className="px-4 sm:px-6 py-4 w-1/2">
                        <div className="flex flex-wrap gap-2">
                          {availablePermissions.map((perm) => (
                            <label
                              key={perm}
                              className="inline-flex items-center"
                            >
                              <input
                                type="checkbox"
                                checked={editedPermissions.includes(perm)}
                                onChange={() => togglePermission(perm)}
                                className="mr-1 accent-blue-500"
                              />
                              <span className="text-white text-xs">{perm}</span>
                            </label>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 w-1/6 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                          <button
                            onClick={handleSave}
                            className="text-green-400 hover:text-green-300 text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white w-1/3">
                        {role.name}
                      </td>
                      <td className="px-4 sm:px-6 py-4 w-1/2">
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.map((perm, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-800 text-blue-300"
                            >
                              {perm}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium w-1/6">
                        <button
                          className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                          onClick={() => handleEdit(role)}
                        >
                          Edit
                        </button>
                      </td>
                    </>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
