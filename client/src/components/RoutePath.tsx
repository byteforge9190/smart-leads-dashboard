import type React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutePath: React.FC = () => {
  const isToken = localStorage.getItem("token");
  return isToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoutePath: React.FC = () => {
  const isToken = localStorage.getItem("token");
  return !isToken ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
