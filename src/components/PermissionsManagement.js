import React from "react";

const PermissionsManagement = () => {
  const permissions = ["Read", "Write", "Delete", "Update"];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Permissions Management</h2>
      <ul className="list-disc list-inside">
        {permissions.map((perm, index) => (
          <li key={index} className="mb-2">
            {perm}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermissionsManagement;
