import React, { useState, useEffect } from "react";
import { fetchPermissions } from "../mock/api";

const PermissionsManagement = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const storedPermissions = localStorage.getItem("permissions");
    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    } else {
      fetchPermissions().then((permissions) => {
        setPermissions(permissions);
        localStorage.setItem("permissions", JSON.stringify(permissions));
      });
    }
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Permissions Management
      </h2>
      <div className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {permissions.map((perm, index) => (
            <li key={index} className="flex items-center space-x-3">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-lg text-gray-700">{perm}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PermissionsManagement;
