import type { roleType } from "./user.type";

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";
export type LeadSource = "Website" | "Instagram" | "Referral";

export interface LeadDto {
  status: LeadStatus;
  source: LeadSource;
  _id: string;
  name: string;
  email: string;
}

export interface LeadAvailableDto {
  first: LeadDto;
  funnel: {
    NEW: number;
    CONTACTED: number;
    QUALIFIED: number;
    LOST: number;
  };
  source: {
    WEBSITE: number;
    REFERRAL: number;
    INSTAGRAM: number;
  };
}

export interface LeadDetailsDto {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  notes: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    role: roleType;
  };
  createdAt: Date;
  updatedAt: Date;
}
export interface AllLeadsDto {
  leads: LeadDetailsDto[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
