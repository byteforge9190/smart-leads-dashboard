import type { CreateLeadType } from "../validations/leads.validate";
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