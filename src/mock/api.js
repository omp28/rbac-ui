export const fetchUsers = () => {
  return Promise.resolve([
    { id: 1, name: "John Doe", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Editor", status: "Inactive" },
  ]);
};

export const fetchRoles = () => {
  return Promise.resolve([
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
  ]);
};

export const fetchPermissions = () => {
  return Promise.resolve(["Read", "Write", "Delete", "Update"]);
};
