export const fetchUsers = () => {
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    return Promise.resolve(JSON.parse(storedUsers));
  }
  const defaultUsers = [
    { id: 1, name: "John Doe", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Editor", status: "Inactive" },
    { id: 3, name: "Alice Johnson", role: "Viewer", status: "Active" },
    { id: 4, name: "Bob Williams", role: "Manager", status: "Active" },
  ];
  localStorage.setItem("users", JSON.stringify(defaultUsers));
  return Promise.resolve(defaultUsers);
};

export const fetchRoles = () => {
  const storedRoles = localStorage.getItem("roles");
  if (storedRoles) {
    return Promise.resolve(JSON.parse(storedRoles));
  }
  const defaultRoles = [
    {
      id: 1,
      name: "Admin",
      permissions: ["Read", "Write", "Delete", "Update"],
    },
    { id: 2, name: "Editor", permissions: ["Read", "Write", "Update"] },
    { id: 3, name: "Viewer", permissions: ["Read"] },
    { id: 4, name: "Manager", permissions: ["Read", "Write", "Update"] },
  ];
  localStorage.setItem("roles", JSON.stringify(defaultRoles));
  return Promise.resolve(defaultRoles);
};

export const fetchPermissions = () => {
  const storedPermissions = localStorage.getItem("permissions");
  if (storedPermissions) {
    return Promise.resolve(JSON.parse(storedPermissions));
  }
  const defaultPermissions = [
    "Read",
    "Write",
    "Delete",
    "Update",
    "Execute",
    "Modify",
  ];
  localStorage.setItem("permissions", JSON.stringify(defaultPermissions));
  return Promise.resolve(defaultPermissions);
};
