import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  useEffect(() => {
    const storedRoles = localStorage.getItem("roles");
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles));
    } else {
      const defaultRoles = [
        { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
        { id: 2, name: "Editor", permissions: ["Read", "Write"] },
      ];
      setRoles(defaultRoles);
      localStorage.setItem("roles", JSON.stringify(defaultRoles));
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Role Management</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Role Name</th>
            <th className="border px-4 py-2">Permissions</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="border px-4 py-2">{role.name}</td>
              <td className="border px-4 py-2">
                {role.permissions.join(", ")}
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleEdit(role)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
