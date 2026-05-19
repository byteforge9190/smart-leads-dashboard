import { useUserMe } from "../hooks/useAuth";
import { useUser } from "../store/user.store";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useGetUserDetails = () => {
  const setUserId = useUser((state) => state.setUserId);
  const setEmail = useUser((state) => state.setEmail);
  const setName = useUser((state) => state.setName);
  const setRole = useUser((state) => state.setRole);
  const setLeads = useUser((state) => state.setLeads);
  const { isSuccess, isError, data, error } = useUserMe();

  useEffect(() => {
    if (isError) {
      window.localStorage.removeItem("token");
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