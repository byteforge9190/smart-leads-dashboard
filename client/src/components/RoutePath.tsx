import type React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserMe } from "../hooks/useAuth";
import { useUser } from "../store/user.store";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const ProtectedRoutePath: React.FC = () => {
  const isToken = localStorage.getItem("token");
  const userId = useUser((state) => state.userId);
  if (isToken && !userId) GetUserDetails();
  return isToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoutePath: React.FC = () => {
  const isToken = localStorage.getItem("token");
  const userId = useUser((state) => state.userId);
   if (isToken && !userId) GetUserDetails();
  return !isToken ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export const GetUserDetails = () => {
  const setUserId = useUser((state) => state.setUserId);
  const setEmail = useUser((state) => state.setEmail);
  const setName = useUser((state) => state.setName);
  const setRole = useUser((state) => state.setRole);
  const setLeads = useUser((state) => state.setLeads);
  const { isSuccess, isError, data, error } = useUserMe();

  useEffect(() => {
    if (isError) {
      window.localStorage.removeItem("token");
      //toast.error("Session expired. Please login again.")
      toast.error(error.message);
    }
    if (isSuccess) {
      setUserId(data.data.user._id);
      setEmail(data.data.user.email);
      setName(data.data.user.name);
      setRole(data.data.user.role);
      setLeads(data.data.leads);
    }
  }, [
    isSuccess,
    isError,
    data,
    error,
    setUserId,
    setEmail,
    setName,
    setRole,
    setLeads,
  ]);
};
