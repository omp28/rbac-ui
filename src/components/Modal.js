import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-100">
            {formData.permissions ? "Edit Role" : "Edit User"}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {formData.permissions ? "Role Name" : "Name"}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              />
            </div>
            {formData.permissions && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Permissions
                </label>
                <input
                  type="text"
                  name="permissions"
                  value={formData.permissions.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      permissions: e.target.value
                        .split(",")
                        .map((p) => p.trim()),
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-600 text-gray-100 rounded-md hover:bg-gray-700 transition-colors duration-200"
              onClick={onClose}
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              onClick={handleSubmit}
            >
              Save
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
