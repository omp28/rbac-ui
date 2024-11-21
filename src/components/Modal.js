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
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 max-w-full">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          {formData.permissions ? "Edit Role" : "Edit User"}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {formData.permissions ? "Role Name" : "Name"}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {formData.permissions && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Permissions
              </label>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
