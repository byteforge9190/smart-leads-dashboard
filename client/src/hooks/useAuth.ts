import { useQuery } from "@tanstack/react-query";
import { GetMe } from "../service/auth";
import type { SuccessResponse, ErrorResponse } from "../utils/response";
import type { UseMeResponse } from "../types/user.type";

export const useUserMe = () => {
  return useQuery<SuccessResponse<UseMeResponse>,ErrorResponse>({
    queryKey: ["user", "me"],
    queryFn: () => GetMe(),
  });
};
