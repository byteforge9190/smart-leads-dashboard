import { useMutation, useQuery } from "@tanstack/react-query";
import { GetMe, Login, Register } from "../service/auth";
import type { SuccessResponse, ErrorResponse } from "../utils/response";
import type { UseMeResponse } from "../types/user.type";
import type { LoginType, RegisterType } from "../validations/auth.validate";

export const useUserMe = () => {
  return useQuery<SuccessResponse<UseMeResponse>,ErrorResponse>({
    queryKey: ["user", "me"],
    queryFn: () => GetMe(),
  });
};

export const useLogin = () => {
  return useMutation<SuccessResponse<{ token: string }>, ErrorResponse, LoginType>({
    mutationFn: (payload) => Login(payload),
  })
}
export const useRegister = () => {
  return useMutation<SuccessResponse<{ token: string }>, ErrorResponse, RegisterType>({
    mutationFn: (payload) => Register(payload),
  })
}