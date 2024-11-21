import React, { useState, useEffect } from "react";
import { fetchUsers, fetchRoles, fetchPermissions } from "../mock/api";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const storedUsers = localStorage.getItem("users");
      const storedRoles = localStorage.getItem("roles");
      const storedPermissions = localStorage.getItem("permissions");

      if (storedUsers && storedRoles && storedPermissions) {
        setUsers(JSON.parse(storedUsers));
        setRoles(JSON.parse(storedRoles));
        setPermissions(JSON.parse(storedPermissions));
      } else {
        const [usersData, rolesData, permissionsData] = await Promise.all([
          fetchUsers(),
          fetchRoles(),
          fetchPermissions(),
        ]);
        setUsers(usersData);
        setRoles(rolesData);
        setPermissions(permissionsData);
        localStorage.setItem("users", JSON.stringify(usersData));
        localStorage.setItem("roles", JSON.stringify(rolesData));
        localStorage.setItem("permissions", JSON.stringify(permissionsData));
      }
    };
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-100">RBAC Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Users" count={users.length} />
        <DashboardCard title="Roles" count={roles.length} />
        <DashboardCard title="Permissions" count={permissions.length} />
      </div>
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">
          Recent Activity
        </h2>
        <ul className="space-y-2">
          <ActivityItem text="New user 'Alice' added" time="2 hours ago" />
          <ActivityItem text="Role 'Manager' updated" time="5 hours ago" />
          <ActivityItem
            text="Permission 'Delete' added to 'Admin' role"
            time="1 day ago"
          />
        </ul>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, count }) => (
  <div className="bg-gray-800 shadow-md rounded-lg p-6 transition-all duration-300 hover:shadow-xl border border-gray-700 hover:border-blue-500">
    <h2 className="text-xl font-semibold mb-2 text-gray-200">{title}</h2>
    <p className="text-3xl font-bold text-blue-400">{count}</p>
  </div>
);

const ActivityItem = ({ text, time }) => (
  <li className="flex justify-between items-center bg-gray-700 p-3 rounded-md hover:bg-gray-600 transition-colors duration-200">
    <span>{text}</span>
    <span className="text-sm text-gray-400">{time}</span>
  </li>
);

export default Dashboard;
