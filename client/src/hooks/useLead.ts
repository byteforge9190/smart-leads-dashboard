import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import type { ErrorResponse, SuccessResponse } from "../utils/response";
import { CreateLead, DeleteLead, GetAllLeads, GetLeadsAvailable, UpdateLead } from "../service/lead";
import type { AllLeadsDto, LeadAvailableDto } from "../types/lead.type";
import type {
  CreateLeadType,
  QueryLeadType,
  UpdateLeadType,
} from "../validations/leads.validate";
import { queryKey } from "../utils/constants";

export const useLeadAvailable = (isEnabled: boolean) => {
  return useQuery<SuccessResponse<LeadAvailableDto>, ErrorResponse>({
    queryKey: [queryKey.LEAD, queryKey.LEAD_AVAILABLE],
    queryFn: () => GetLeadsAvailable(),
    enabled: isEnabled,
  });
};

export const useLeadCreate = () => {
  return useMutation<SuccessResponse<null>, ErrorResponse, CreateLeadType>({
    mutationFn: (payload) => CreateLead(payload),
  });
};

export const useAllLeads = (isEnabled: boolean,payload:QueryLeadType ) => {
  return useInfiniteQuery<SuccessResponse<AllLeadsDto>, ErrorResponse>({
    queryKey: [queryKey.LEAD, payload],
    queryFn: ({ pageParam = 1 }) =>
      GetAllLeads({ ...payload, page: pageParam as number, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.pagination.hasNextPage) return undefined;
      return lastPage.data.pagination.page + 1;
    },
    enabled: isEnabled,
  });
};

export const useUpdateLead = () => {
  return useMutation<SuccessResponse<null>, ErrorResponse, {lead: UpdateLeadType,id: string}>({
    mutationFn: (payload) => UpdateLead(payload.lead,payload.id)
  })
}

export const useDeleteLead = () => {
  return useMutation<SuccessResponse<null>, ErrorResponse, string>({
    mutationFn: (payload) => DeleteLead(payload)
  })
}
