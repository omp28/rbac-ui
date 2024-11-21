import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-8">Oops! Page Not Found</p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Go Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
