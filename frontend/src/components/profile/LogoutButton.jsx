import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = ({ onClick, variant = "desktop" }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
    if (onClick) onClick();
  };

  if (variant === "mobile") {
    return (
      <button
        onClick={handleLogout}
        className="w-full border border-red-500 text-red-500 py-2 rounded-md hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <FaSignOutAlt className="text-sm" />
        Logout
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100 transition-all duration-200"
    >
      <FaSignOutAlt className="text-xs" />
      Logout
    </button>
  );
};

export default LogoutButton;
