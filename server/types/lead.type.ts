import { Types } from "mongoose";
import type { UserRequest } from "./auth.type.js";
export type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";
export type LeadSource = "Website" | "Instagram" | "Referral";
export type SortOrder = "latest" | "oldest";

export interface ILead {
  _id: Types.ObjectId;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  notes?: string | null;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLead {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  notes: string | null;
}
export interface UpdateLead {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
  notes?: string | null;
}
export interface AvailLead {
  _id: string;
  createdBy: string;
}
export interface CreateLeadRequest {
  type: 'CREATE',
  data: CreateLead
}
export interface UpdateLeadRequest {
  type: 'UPDATE',
  data: UpdateLead,
  lead: AvailLead,
}
export interface LeadIdRequest {
  type: 'AVAIL',
  lead: AvailLead,
}
export interface LeadRequest extends UserRequest {
  purpose: CreateLeadRequest | UpdateLeadRequest | LeadIdRequest
}
export interface LeadsQueryParams {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: SortOrder;
  page?: string;
  limit?: string;
}