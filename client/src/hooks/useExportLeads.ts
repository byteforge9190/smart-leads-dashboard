import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse, AxiosError } from "axios";
import { ExportLeads } from "../service/lead";
import type { QueryLeadType } from "../validations/leads.validate";
import { queryKey } from "../utils/constants";

export const useExportLeads = (filters?: Partial<QueryLeadType>, enabled = false) => {
    return useQuery<AxiosResponse<Blob>, AxiosError>({
        queryKey: [queryKey.EXPORT, filters || {}],
        enabled,
        retry: false,
        refetchOnWindowFocus: false,
        queryFn: () => ExportLeads((filters || {}) as QueryLeadType),
    });
};

export default useExportLeads;
