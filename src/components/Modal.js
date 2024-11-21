import React, { useState } from "react";

const Modal = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h3 className="text-xl font-bold mb-4">
          {formData.permissions ? "Edit Role" : "Edit User"}
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium">
            {formData.permissions ? "Role Name" : "Name"}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        {formData.permissions && (
          <div className="mb-4">
            <label className="block text-sm font-medium">Permissions</label>
            <input
              type="text"
              name="permissions"
              value={formData.permissions.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  permissions: e.target.value.split(",").map((p) => p.trim()),
                })
              }
              className="border px-3 py-2 rounded w-full"
            />
          </div>
        )}
        <div className="flex space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
