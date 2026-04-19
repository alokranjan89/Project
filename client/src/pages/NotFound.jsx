import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[70vh] flex flex-col items-center justify-center text-center px-4">
      
      <h1 className="text-6xl font-bold text-pink-600 mb-4">
        404
      </h1>

      <p className="text-gray-600 mb-6 text-lg">
        😕 Oops! Page not found
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;