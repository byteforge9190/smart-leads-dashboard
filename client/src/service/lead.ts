import type { CreateLeadType, QueryLeadType } from "../validations/leads.validate";
import { request } from "./starter";

const postJson = async (url: string, data: unknown) => {
  return request(`/leads${url}`, "POST", data);
};
const getJson = async (url: string) => {
  return request(`/leads${url}`, "GET", undefined);
};

export const GetLeadsAvailable = () => {
    return getJson("/available");
}

export const CreateLead = (payload: CreateLeadType) => {
    return postJson("/create", payload);
}
export const GetAllLeads = (payload: QueryLeadType) => {
  return getJson(`/?${payload.page ? `page=${payload.page}&` : ""}${payload.limit ? `limit=${payload.limit}&` : ""}${payload.status ? `status=${payload.status}&` : ""}${payload.source ? `source=${payload.source}&` : ""}${payload.search ? `search=${payload.search}&` : ""}${payload.sort ? `sort=${payload.sort}` : ""}`);
}
