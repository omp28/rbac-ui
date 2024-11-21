import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import PermissionsManagement from "./components/PermissionsManagement";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/roles" element={<RoleManagement />} />
            <Route path="/permissions" element={<PermissionsManagement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
