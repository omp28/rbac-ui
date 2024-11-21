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
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Role Management</h2>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr
                key={role.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">{role.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {role.permissions.map((perm, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2"
                    >
                      {perm}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
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
