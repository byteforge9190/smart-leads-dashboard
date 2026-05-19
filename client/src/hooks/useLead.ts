import { useMutation, useQuery } from "@tanstack/react-query"
import type { ErrorResponse, SuccessResponse } from "../utils/response"
import { CreateLead, GetLeadsAvailable } from "../service/lead"
import type { LeadAvailableDto } from "../types/lead.type"
import type { CreateLeadType } from "../validations/leads.validate"
import { queryKey } from "../utils/constants"

export const useLeadAvailable = (isEnabled: boolean) => {
    return useQuery<SuccessResponse<LeadAvailableDto>, ErrorResponse>({
        queryKey: [queryKey.LEAD, queryKey.LEAD_AVAILABLE],
        queryFn: () => GetLeadsAvailable(),
        enabled: isEnabled
    })
}

export const useLeadCreate = () => {
    return useMutation<SuccessResponse<null>,ErrorResponse,CreateLeadType>({
        mutationFn: (payload) => CreateLead(payload),
    })
}
