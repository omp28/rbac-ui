import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { fetchRoles } from "../mock/api";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  useEffect(() => {
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

  const handleSave = (updatedRole) => {
    const updatedRoles = roles.map((role) =>
      role.id === updatedRole.id ? updatedRole : role
    );
    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
    setShowModal(false);
  };

  const handleEdit = (role) => {
    setCurrentRole(role);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Role Management</h2>
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Role Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {roles.map((role) => (
              <tr
                key={role.id}
                className="hover:bg-gray-700 hover:border hover:border-gray-500 transition-all duration-300"
              >
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  {role.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {role.permissions.map((perm, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-800 text-blue-300 mr-2"
                    >
                      {perm}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-blue-400 hover:text-blue-500 transition-colors duration-200"
                    onClick={() => handleEdit(role)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && currentRole && (
        <Modal
          user={currentRole}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default RoleManagement;
