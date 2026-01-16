import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  let role = localStorage.getItem("role");

  if (!role) return <Navigate to="/" replace />;

  role = role.toUpperCase();

  const normalized = allowedRoles.map(r => r.toUpperCase());

  if (normalized.length > 0 && !normalized.includes(role)) {
    if (role === "ADMIN") return <Navigate to="/admin" replace />;
    if (role === "MANAGER") return <Navigate to="/manager" replace />;
    if (role === "VENDOR") return <Navigate to="/vendor" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
